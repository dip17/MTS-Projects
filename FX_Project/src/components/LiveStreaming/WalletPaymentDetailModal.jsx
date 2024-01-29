import React, { useState } from "react";
import {
  InputGroup,
  FormControl,
  Image,
  Modal,
  Media,
  Row,
  Col,
  Form,
  Button,
} from "react-bootstrap";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";

const WalletPaymentDetailModal = () => {
  const [checked, setChecked] = useState(false);
  const [radioValue, setRadioValue] = useState("1");

  const radios = [
    { name: "+10$", value: "1" },
    { name: "+20$", value: "2" },
    { name: "+50$", value: "3" },
    { name: "+100$", value: "4" },
  ];
  return (
    <>
      <div className="wallet-modal-details">
        <h4 className="payment-modal-title">Payment Details</h4>
        <p>
          Looking Beatiful In the Picture and all the best!!!..In publishing and
          graphic design, Lorem ipsum is a placeholder text com!!!
        </p>
        <Form>
          <Form.Group className="mb-3">
            <Form.Control type="text" placeholder="10" />
          </Form.Group>
          <div className="tips-list">
            <ButtonGroup>
              {radios.map((radio, idx) => (
                <ToggleButton
                  key={idx}
                  id={`radio-${idx}`}
                  type="radio"
                  variant="btn-tips"
                  name="radio"
                  value={radio.value}
                  checked={radioValue === radio.value}
                  onChange={(e) => setRadioValue(e.currentTarget.value)}
                >
                  {radio.name}
                </ToggleButton>
              ))}
            </ButtonGroup>
          </div>
          <div className="wallet-account-balance">933.00$</div>
          <div className="add-card-btn">
            <Button type="submit">SEND TIP</Button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default WalletPaymentDetailModal;
