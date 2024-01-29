import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Form, InputGroup, Image, Button, FormControl } from "react-bootstrap";
import { translate, t } from "react-multi-lang";
import NoDataFound from "../NoDataFound/NoDataFound";
import "../Ecom/Ecom.css";
import SingleDisplayCard from "../Ecom/Product/SingleDisplayCard";
import { fetchOtherModelProductListStart } from "../../store/actions/ProductsAction";
import Skeleton from "react-loading-skeleton";

const ModelProfileStoreSec = (props) => {
  const [skip, setSkip] = useState({
    skip: 0,
    take: 12,
  });

  const [search, setSearch] = useState("");

  const sortOptions = [
    { name: "Latest", value: "Latest" },
    { name: "Price - Low to High", value: "price_lh" },
    { name: "Price - High to Low", value: "price_hl" },
  ];
  const [sort, setSort] = useState({
    name: "Latest",
    value: "Latest",
  });

  useEffect(() => {
    fetchData();
  }, [sort]);

  const fetchData = () => {
    let data = {
      user_unique_id: props.otherUserUniquId,
      skip: 0,
      take: skip.take,
      search_key: search,
    }
    if (sort.name !== "Latest")
      data = { ...data, sort_by: sort.value, };
    props.dispatch(
      fetchOtherModelProductListStart(data)
    );
    setSkip({
      ...skip,
      skip: skip.take,
    })
  };

  const searchStore = (e) => {
    e.preventDefault();
    fetchData();
  }

  return (
    <div
      role="tabpanel"
      className={
        props.activeSec === "store"
          ? "tab-pane fade in active"
          : "tab-pane fade"
      }
      id="Section4"
    >
      <div className="new-profile-store-header-sec">

        <h4>{!props.products.loading && <>Total Products - <span>{props.products.data.total}</span></>}</h4>
        <div className="new-profile-store-btn-sec">
          {/* <select>
            <option value="Latest">Latest</option>
            <option value="price_lh">Price - Low to High</option>
            <option value="price_hl">Price - High to Low</option>
          </select> */}
          <div class="dropdown">
            <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              {sort.name}
              <span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#6661e7" class="bi bi-funnel" viewBox="0 0 16 16">
  <path d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5v-2zm1 .5v1.308l4.372 4.858A.5.5 0 0 1 7 8.5v5.306l2-.666V8.5a.5.5 0 0 1 .128-.334L13.5 3.308V2h-11z"/>
</svg></span>
            </button>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
              {sortOptions.map((option) =>
                <h4 class="dropdown-item"
                  onClick={() => setSort({ name: option.name, value: option.value })}>{option.name}</h4>
              )}
            </div>
          </div>
          <div className="new-explore-search-sec">
            <div className="new-explore-search-card">
              <Form onSubmit={searchStore}>
                <InputGroup className="mb-0">
                  <InputGroup.Text>
                    <Image
                      className="new-explore-search-icon"
                      src={
                        window.location.origin + "/assets/images/new-home/icon/search.svg"
                      }
                    />
                  </InputGroup.Text>
                  <FormControl placeholder={t("search_product")} value={search} onChange={e => setSearch(e.target.value)} />
                  <InputGroup.Text className="padding-zero">
                    <Button className="search-go-btn" type="submit">
                      Go
                    </Button>
                  </InputGroup.Text>
                </InputGroup>
              </Form>
            </div>
          </div>
        </div>
      </div>

      {props.products && props.products.loading ? (
        <div className="profile-all-post-box">
          {[...Array(8)].map(() =>
            <Skeleton
              className="profile-post-card-loader" />
          )}
        </div>
      ) : props.products.data.user_products && props.products.data.user_products.length > 0 ? (

        <div className="ecom-featured-box ecom-features-box-1">
          {props.products.data.user_products.map((product) =>
            <SingleDisplayCard product={product} type="userProfile" otherUserUniquId={props.otherUserUniquId}></SingleDisplayCard>
          )}
        </div>
      ) : (
        <NoDataFound />
      )}
      {props.noMoreData !== true ? (
        <>{props.isFetching && "Fetching more list items..."}</>
      ) : (
        t("no_more_data")
      )}
    </div >
  );
};

const mapStateToPros = (state) => ({
  comments: state.comment.comments,
  chat: state.chat,
  userDetails: state.otherUser.userDetails,
  userPosts: state.otherUser.userPosts,
});

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(mapStateToPros, mapDispatchToProps)(translate(ModelProfileStoreSec));
