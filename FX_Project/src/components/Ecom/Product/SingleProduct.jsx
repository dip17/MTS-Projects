import React, { useState, useEffect } from "react";
import { Modal, Container, Row, Col, InputGroup, FormControl, Button, Media, Image } from "react-bootstrap";
import "./Product.css";
import "../Ecom.css";
import { Link } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { connect } from "react-redux";
import {
	userProductViewForOthersStart,
	saveCartDetailsStart
} from "../../../store/actions/ProductsAction";
import { translate, t } from "react-multi-lang";
import ProductHeader from "./ProductHeader";

const SingleProduct = (props) => {

	// Set the initial count state to zero, 0
	const [count, setCount] = useState(1);

	// Create handleIncrement event handler
	const handleIncrement = () => {
		if (props.productView.data.user_product.quantity > count)
			setCount(prevCount => prevCount + 1);
	};

	//Create handleDecrement event handler
	const handleDecrement = () => {
		if (count > 1)
			setCount(prevCount => prevCount - 1);
	};

	const handleSubmit = () => {
		props.dispatch(saveCartDetailsStart({ user_product_id: props.productView.data.user_product.user_product_id, quantity: count }));
	}

	useEffect(() => {
		props.dispatch(
			userProductViewForOthersStart({
				user_products_unique_id: props.match.params.product_unique_id,
			})
		);
	}, []);

	useEffect(() => {
		if (props.cartSave.data)
			props.dispatch(
				userProductViewForOthersStart({
					user_products_unique_id: props.match.params.product_unique_id,
				})
			);
	}, [props.cartSave.data]);

	return (
		<>
			{props.productView.loading ? 'Loading...' : (
				<div className="ecom-single-product-sec">
					<Container>
						<div className="ecom-navbar">
							<ProductHeader />
						</div>
						<Row className="mt-5">
							<Col md={6}>
								<Carousel showStatus={false}>
									<div>
										{props.productView.data.user_product.is_outofstock == 0 ? (
											<div className="sold-tag-sec">
												<Image
													className="sold-tag-img"
													src={
														window.location.origin + "/assets/images/ecom/sold-out-tag.svg"
													}
												/>
											</div>
										) : null}

										<img
											className="quick-view-modal-img"
											src={props.productView.data.user_product.picture}
										/>
									</div>
									{props.productView.data.user_product.userProductFiles.map((product_picture) => (
										<div>
											<img
												className="quick-view-modal-img"
												src={product_picture.picture}
											/>
										</div>
									))}
								</Carousel>
							</Col>
							<Col md={6}>
								<div className="quick-view-modal-info">
									<Link to="#">
										<h4>{props.productView.data.user_product.name}</h4>
									</Link>
									<div className="border-line">
									</div>
									<p className="quick-view-modal-desc">
										<p dangerouslySetInnerHTML={{
											__html: props.productView.data.user_product.description,
										}}></p>
									</p>
									<div className="quick-view-modal-price-sec">
										{/* <del>
												<span>$59.00</span>
										</del> */}
										<ins>
											<span>{props.productView.data.user_product.user_product_price_formatted}</span>
										</ins>
									</div>
									<div className="availability-sec">
										<h5>{t('availability')}: <span>{props.productView.data.user_product.is_outofstock == 0 ? t('out_of_stock') : t('in_stock')}</span></h5>
									</div>
									<div className="availability-sec">
										<h5>{t('quantity')}: <span>{props.productView.data.user_product.quantity}</span></h5>
									</div>
									<div className="availability-sec">
										<h5>
											{t('seller')}:
											<span className="pro-user-name text-nowrap">
												<Link to={`/${props.productView.data.user_product.user.user_unique_id}`}>
													@{props.productView.data.user_product.user.name}
												</Link>
											</span>
										</h5>
									</div>
									<div className="rating-star-card">
										<ul className="rating-star-sec">
											<Media as="li">
												<i className="fas fa-star"></i>
											</Media>
											<Media as="li">
												<i className="fas fa-star"></i>
											</Media>
											<Media as="li">
												<i className="fas fa-star"></i>
											</Media>
											<Media as="li">
												<i className="fas fa-star"></i>
											</Media>
											<Media as="li">
												<i className="fas fa-star"></i>
											</Media>
										</ul>
									</div>

									<div className="ecom-featured-review">
										<p>{t("very_nice_product_para")}</p>
									</div>
									{props.productView.data.user_product.add_to_cart == 1 ? (
										<div className="quick-view-modal-add-to-cart">
											<InputGroup>
												<InputGroup.Prepend>
													<InputGroup.Text onClick={handleDecrement}><i className="fas fa-minus"></i></InputGroup.Text>
												</InputGroup.Prepend>
												<FormControl placeholder={count}></FormControl>
												<InputGroup.Append>
													<InputGroup.Text onClick={handleIncrement}><i className="fas fa-plus"></i></InputGroup.Text>
												</InputGroup.Append>
											</InputGroup>
											<div className="banner-btn-sec">
												<Button onClick={handleSubmit} className="quick-view-modal">{t('add_to_cart')}</Button>
											</div>
										</div>
									) : (
										<div className="quick-view-modal-add-to-cart">
											<div className="banner-btn-sec">
												<Button href="/ecom-cart" className="quick-view-modal">{t('view_cart')}</Button>
											</div>
										</div>
									)}
								</div>
							</Col>
						</Row>
					</Container>
				</div>
			)}

		</>
	);
};

const mapStateToPros = (state) => ({
	productView: state.userProducts.productViewForOthers,
	cartSave: state.userProducts.cartSave,
});

function mapDispatchToProps(dispatch) {
	return { dispatch };
}

export default connect(mapStateToPros, mapDispatchToProps)(translate(SingleProduct));
