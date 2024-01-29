import React, { useState, useEffect } from "react";
import {
  Modal,
  Container,
  Row,
  Col,
  Button,
  Form,
  Image,
  Media,
} from "react-bootstrap";
import "./Product.css";
import { Link, useParams } from "react-router-dom";
import { connect } from "react-redux";
import { translate, t } from "react-multi-lang";
import ProductHeader from "./ProductHeader";
import {
  fetchUserProductPicturesStart,
  userProductPicturesSaveStart,
  userProductPicturesDeleteStart
} from "../../../store/actions/ProductsAction";
import NoDataFound from "../../NoDataFound/NoDataFound";

const ProductGallery = (props) => {
  const { id } = useParams();

  const [galleryImages, setGalleryImages] = useState(null);

  const [skipInitialRender, setSkipInitialRender] = useState(false);

  const handleChange = (event) => {
    const fileReader = new FileReader();

    let file = event.currentTarget.files[0];

    fileReader.onloadend = () => {
      setGalleryImages({
        ...galleryImages,
        picture: file,
        previewImage: fileReader.result,
      });
    };
    if (file) {
      fileReader.readAsDataURL(file);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.dispatch(
      userProductPicturesSaveStart({
        user_product_id: id,
        picture: galleryImages.picture,
      })
    );
  };

  useEffect(() => {
    props.dispatch(fetchUserProductPicturesStart({ user_product_id: id }));
    setSkipInitialRender(true)
  }, []);

  useEffect(() => {
    if (!props.productPicturesSave.loading && skipInitialRender) {
      setGalleryImages(null);
      props.dispatch(fetchUserProductPicturesStart({ user_product_id: id }));
    }
  }, [props.productPicturesSave.data]);

  const deleteGalleryImage = (id) => {
    props.dispatch(userProductPicturesDeleteStart({user_product_picture_id : id}))
  }

  useEffect(() => {
    if (!props.productPicturesDelete.loading && skipInitialRender) {
      props.dispatch(fetchUserProductPicturesStart({ user_product_id: id }));
    }
  }, [props.productPicturesDelete.data]);

  return (
    <>
      <div className="add-product-sec">
        <Container>
          <div className="ecom-navbar">
            <ProductHeader />
          </div>
          <h2>{t("add_product")}</h2>
          <Form
            onSubmit={(event) => handleSubmit(event)}
            className="add-product-form"
          >
            <Row>
              <Col md={6}>
                <div className="add-product-upload-file-sec border-right-divider">
                  <Form.Label>{t("select_image")}</Form.Label>
                  <Form.Group id="file-upload-form" className="uploader">
                    <Form.File
                      id="file-upload"
                      name="picture"
                      accept="image/*"
                      onChange={(event) => {
                        handleChange(event);
                      }}
                    />
                    <label for="file-upload" id="file-drag">
                      <div id="start">
                        <i className="fa fa-download" aria-hidden="true"></i>
                        <div>{t("select_a_image")}</div>
                      </div>
                    </label>
                  </Form.Group>
                  {galleryImages != null && galleryImages.previewImage && (
                    <div>
                      <img
                        src={galleryImages.previewImage}
                        className="gallery-preview-image"
                        alt=""
                      />
                    </div>
                  )}
                  <div className="text-center">
                    <Button
                      type="submit"
                      className="add-product-btn"
                      disabled={
                        props.productPicturesSave.buttonDisable
                          ? true
                          : galleryImages != null
                          ? false
                          : true
                      }
                    >
                      {props.productPicturesSave.loadingButtonContent != null
                        ? props.productPicturesSave.loadingButtonContent
                        : `${t("submit")}`}
                    </Button>
                  </div>
                </div>
              </Col>
              <Col md={6}>
                {props.productPictures.loading ? (
                  t("loading")
                ) : props.productPictures.data.user_product_pictures.length >
                  0 ? (
                  <>
                    <div className="product-gallery-grid">
                      {props.productPictures.data.user_product_pictures.map(
                        (image, index) => (
                          <>
                            <div className="image-wrapper" key={index}>
                              <img src={image.picture} alt="" />
                              <Button
                                type="button"
                                className="gallery-delete text-danger"
                                onClick={() => deleteGalleryImage(image.user_product_picture_id)}
                              >
                                <span>
                                <i className="fas fa-trash"></i>
                                </span>
                              </Button>
                            </div>
                          </>
                        )
                      )}
                    </div>
                  </>
                ) : (
                  <div>
                    <NoDataFound></NoDataFound>
                  </div>
                )}
              </Col>
            </Row>
          </Form>
        </Container>
      </div>
    </>
  );
};

const mapStateToPros = (state) => ({
  productPictures: state.userProducts.productPictures,
  productPicturesSave: state.userProducts.productPicturesSave,
  productPicturesDelete : state.userProducts.productPicturesDelete
});

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(
  mapStateToPros,
  mapDispatchToProps
)(translate(ProductGallery));
