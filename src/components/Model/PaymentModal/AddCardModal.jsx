import React, { useState, useEffect } from 'react'
import { Modal, Button, Row, Col } from 'react-bootstrap';
import AddCardModalSec from './AddCardModalSec';
import PaymentMethodCard from './PaymentMethodCard';
import { connect } from 'react-redux';
import { fetchCardDetailsStart } from '../../../store/actions/CardsAction';


const AddCardModal = (props) => {
  const nullData = ["", null, undefined, "light"];

  const [skipRender, setSkipRender] = useState(true);

  useEffect(() => {
    if (!skipRender && !props.addCard.loading && Object.keys(props.addCard.data).length > 0) {
      props.dispatch(fetchCardDetailsStart());
      props.closepaymentsModal()
    }
    setSkipRender(false);
  }, [props.addCard]);

  return (
    <>
      <div className="payment-modal-sec">
        <Modal
          className={`modal-dialog-center user-list-free-modal payment-modal-res ${nullData.includes(localStorage.getItem("theme")) ?
            "" : "dark-theme-modal"
            }`}
          size="xl"
          centered
          show={true}
          onHide={props.closepaymentsModal}
        >
          <Modal.Body className="wallet-card-body">
            <Button className="modal-close"
              onClick={() => props.closepaymentsModal()}>
              <i className="fa fa-times" />
            </Button>
            <div className="payment-modal-body">
              <Row className="justify-content-between">
                {/* <PaymentMethodCard
                  paymentType={paymentType}
                  setPaymentType={setPaymentType}
                  selectedCard={selectedCard}
                  setSelectedCard={setSelectedCard}
                  setShowAddCard={setShowAddCard}
                  showWallet={false}
                /> */}
                <Col md={12} xl={5}>
                  <AddCardModalSec />
                </Col>
              </Row>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
}

const mapStateToPros = (state) => ({
  addCard: state.cards.addCard,
});

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(
  mapStateToPros,
  mapDispatchToProps
)(AddCardModal);