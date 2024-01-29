import React, { useState, useEffect } from "react";
import { Container, Row, Col, Image, Button, Media, Form } from "react-bootstrap";
import "./Ecom.css";
import { Link } from "react-router-dom";
import SingleDisplayCard from "./Product/SingleDisplayCard";
import { connect } from "react-redux";
import { fetchEcommHomeStart } from "../../store/actions/ProductsAction";
import NoDataFound from "../NoDataFound/NoDataFound";
import { translate, t } from "react-multi-lang";
import ProductHeader from "./Product/ProductHeader";

const EcomIndex = (props) => {

	const [searchKey, setSearchKey] = useState();

	const handleSubmit = (event) => {
		event.preventDefault();
		window.location.assign("/ecom-category/" + searchKey);
	}

	useEffect(() => {
		props.dispatch(fetchEcommHomeStart());
	}, []);

	return (
		<>
			<div className="ecom-sec">
				<Container>
					<div className="ecom-navbar">
						<ProductHeader />
					</div>
					<div className="banner-content-sec">
						<Row>
							<Col md={7}>
								<div className="banner-content">
									<h5>{t('new_brown_collection')}</h5>
									<h4>{t('summer_sale')}</h4>
									<h3>{t('30_off')}</h3>
									<p>{t('starting_at')} <span><sup>$</sup>39<sup>99</sup></span></p>
									{/* <div className="banner-btn-sec">
											<Button className="buy-now-btn">{t('get_yours')}</Button>
									</div> */}
								</div>
							</Col>
						</Row>
					</div>
				</Container>
			</div>
			<div className="ecom-featured-sec">
				<Container>
					<Row className="justify-content-md-center">
						<Col md={8} lg={9} xl={9} className="text-center">
							<h2 className="title-main"> {t("featured")} <span>{t("products")}</span></h2>
							<p className="desc">{t('amazing_products_added_recently')}</p>
						</Col>
					</Row>
					<Form onSubmit={handleSubmit} className="mt-3">
						<Row>
							<Col md={8}></Col>
							<Col md={4} className="text-right">
								<div className="form-group explore-location-dropdown ecom-category-sec d-flex">
									<Form.Group>
										<input
											type="text"
											placeholder={t("search")}
											className="form-control edit-reset" required
											value={searchKey}
											onChange={(event) => {
												setSearchKey(event.target.value);
											}}></input>
									</Form.Group>
									<Form.Group>
										<Button type="submit" className="submit-btn m-0"><i className="fa fa-search"></i></Button>
									</Form.Group>
								</div>
							</Col>
						</Row>
					</Form>
					<Row>
						<Col md={12}>
							{props.ecommHome.loading ? (
								t("loading")
							) : (
								<div className="ecom-featured-box">
									{props.ecommHome.data.user_products.length > 0 ? (
										props.ecommHome.data.user_products.map((product) => (
											<SingleDisplayCard product={product}></SingleDisplayCard>
										))) : (
										<NoDataFound></NoDataFound>
									)}

								</div>)}
						</Col>
					</Row>
				</Container>
			</div>
		</>
	);
};

const mapStateToPros = (state) => ({
	ecommHome: state.userProducts.ecommHome,
});

function mapDispatchToProps(dispatch) {
	return { dispatch };
}

export default connect(mapStateToPros, mapDispatchToProps)(translate(EcomIndex));
