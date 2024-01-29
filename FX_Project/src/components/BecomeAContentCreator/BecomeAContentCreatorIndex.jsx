import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Image,
  Button,
  Media,
  Form,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import "./BecomeAContentCreator.css";
import { Link } from "react-router-dom";
import BecomeAContentCreatorLoader from "../Loader/BecomeAContentCreatorLoader";
import { connect } from "react-redux";
import { fetchUserDetailsStart } from "../../store/actions/UserAction";
import { translate, t } from "react-multi-lang";
import StepZilla from "react-stepzilla";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";
import Step5 from "./Step5";
import Step6 from "./Step6";

const BecomeAContentCreator = (props) => {
  const [stepsNavigation, setStepsNavigation] = useState(true);

  const [initalStep, setInitalStep] = useState("");

  useEffect(() => {
    props.dispatch(fetchUserDetailsStart());
  }, []);

  useEffect(() => {
    if (props.user.data.content_creator_step === 0) {
      setInitalStep(0);
    } else if (props.user.data.content_creator_step == 1) {
      setInitalStep(2);
    } else if (props.user.data.content_creator_step == 2) {
      setInitalStep(3);
    } else if (props.user.data.content_creator_step == 3) {
      setInitalStep(4);
    } else if (props.user.data.content_creator_step == 4) {
      setInitalStep(5);
    } else {
      setInitalStep("");
    }
  }, [props.user.data]);

  const steps = [
    { name: "Upload Documents", component: <Step1 user={props.user} /> },
    {
      name: "Admin approve the document",
      component: <Step2 user={props.user} />,
    },
    { name: "Pending Validation", component: <Step3 user={props.user} /> },
    { name: "Update billing details", component: <Step4 user={props.user} /> },
    {
      name: "Update Plans",
      component: <Step5 user={props.user} />,
    },
    { name: "Finish", component: <Step6 user={props.user} /> },
  ];

  useEffect(() => {
    !props.user.loading && props.dispatch(fetchUserDetailsStart());
  }, [props.addKycDocInput.data]);

  return (
    <>
      <div className="become-content-creator-sec">
        <Container>
          {/**<BecomeAContentCreatorLoader/> **/}

          {initalStep === "" ? null : (
            <div className="become-content-creator-box">
              <div className="step-progress">
                <StepZilla
                  steps={steps}
                  preventEnterSubmission={true}
                  stepsNavigation={stepsNavigation}
                  startAtStep={initalStep}
                />
              </div>
            </div>
          )}
          {props.user.loading ? (
            ""
          ) : props.user.data.is_content_creator == 2 ? (
            <div className="text-center">
              <h2 className="text-center text-success">
                {t("you_became_a_creator_now")}
              </h2>
              <Link
                to="/add-post"
                className="btn gradient-btn gradientcolor addBank"
              >
                {t("click_here_to_add_post")}
              </Link>
            </div>
          ) : (
            ""
          )}
        </Container>
      </div>
    </>
  );
};

const mapStateToPros = (state) => ({
  user: state.users.profile,
  addKycDocInput: state.kycDocument.addKycDocInput,
});

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(
  mapStateToPros,
  mapDispatchToProps
)(translate(BecomeAContentCreator));
