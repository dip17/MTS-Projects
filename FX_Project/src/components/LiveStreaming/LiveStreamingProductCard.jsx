import React , {useState} from "react";
import { Media , Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import QuickViewModal from "../Ecom/QuickViewModal";
import { translate, t } from "react-multi-lang";

const LiveStreamingProductCard = ({ product }) => {
  const [quickViewModal, setQuickViewModal] = useState(false);

  const closeQuickViewModal = () => {
    setQuickViewModal(false);
  };

  return (
    <>
      <div
        className="live-streaming-store-product-item"
        onClick={() => setQuickViewModal(true)}
      >
        <div className="live-streaming-store-product-img-bg-sec">
          <Image
            className="live-streaming-store-product-img"
            src={product.picture}
          />
        </div>
        {product.is_outofstock === 0 && (
          <div className="live-streaming-store-add-cart-link">
            <div className="live-streaming-store-cart-icon-sec">
              <Link to="#" onClick={() => setQuickViewModal(true)}>
                <Image
                  className="live-streaming-store-cart-icon"
                  src={
                    window.location.origin +
                    "/assets/images/new-home/icon/cart-icon.svg"
                  }
                />
              </Link>
            </div>
          </div>
        )}

        <div className="live-streaming-store-product-info-sec">
          <div className="live-streaming-store-product-info-card">
            <div className="live-streaming-store-product-details">
              <h3>{product.name}</h3>
              <p>{product.user_product_price_formatted}</p>
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
        </div>
        <div className="live-streaming-stock-sec">
          {product.is_outofstock === 0 ? (
            <p className="text-danger">{t("out_of_stock")}</p>
          ) : (
            <p>{t("in_stock")}</p>
          )}
        </div>
      </div>
      <QuickViewModal
        product={product}
        quickViewModal={quickViewModal}
        closeQuickViewModal={closeQuickViewModal}
      />
    </>
  );
};

export default (translate(LiveStreamingProductCard));
