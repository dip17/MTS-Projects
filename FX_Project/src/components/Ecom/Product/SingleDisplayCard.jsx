import React, { useState, useEffect } from "react";
import { Image, Button, Media} from "react-bootstrap";
import "../Ecom.css";
import { Link } from "react-router-dom";
import QuickViewModal from "../QuickViewModal";
import { connect } from "react-redux";
import { translate, t } from "react-multi-lang";

const SingleDisplayCard = (props) => {

	const { product } = props;

	const [quickViewModal, setQuickViewModal] = useState(false);

	const closeQuickViewModal = () => {
		setQuickViewModal(false);
	};

	return (
		<>		
			<div className="ecom-featured-card">
				<div className="ecom-featured-product-item">
						<div className="ecom-featured-img-sec">
              {product.is_outofstock == 0 ? (
								<div className="sold-tag-sec">
									<Image
											className="sold-tag-img"
											src={
													window.location.origin + "/assets/images/ecom/sold-out-tag.svg"
											}
									/>
								</div>
              ) : null }
								<Link to="#" onClick={() => setQuickViewModal(true)}>
										{/* <div className="ecom-featured-labels">
												<div className="onsale">-17%</div>
										</div> */}
										<Image
												className="ecom-featured-img"
												src={product.picture}
										/>
								</Link>
								<div className="links-on-image">
										<div className="ecom-featured-cart-icon-sec">
												<Link to="#" onClick={() => setQuickViewModal(true)}>
														<Image
																className="ecom-featured-cart-icon"
																src={
																		window.location.origin + "/assets/images/new-home/icon/cart-icon.svg"
																}
														/>
												</Link>
										</div>
								</div>
								{/* <div className="links-on-action-btn-sec">
									<Button className="quick-view-btn" onClick={() => setQuickViewModal(true)}>
										{t('quick_view')}
									</Button>
								</div> */}
						</div>
						<div className="ecom-featured-info">
								<div className="ecom-features-info-type">
										{/* <span className="category-list">
												<Link to="#">FASHION</Link>,&nbsp;
												<Link to="#">FEATURED PRODUCTS</Link>
										</span> */}
										{/* <div className="ecom-featured-wishlist">
												<i className="far fa-heart"></i>
										</div> */}
								</div>
								<div className="new-product-details-card">
									<div className="new-product-info-card">
										<h3 className="product-title">{product.name}</h3>
										<div className="ecom-featured-price-sec">
												{/* <del>
														<span>$59.00</span>
												</del> */}
												<ins>
														<span>{product.user_product_price_formatted}</span>
												</ins>
										</div>
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
								</div>
								{/* <div className="ecom-featured-review">
									<p>{product.description}</p>
								</div> */}
						</div>
				</div>
			</div>	
			<QuickViewModal
				product={product}
				quickViewModal={quickViewModal}
				closeQuickViewModal={closeQuickViewModal}
        type={props.type}
				otherUserUniquId={props.otherUserUniquId}
			/>			
		</>
	);
};

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(null, mapDispatchToProps)(translate(SingleDisplayCard));
