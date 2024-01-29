import React, { useState } from "react";
import EditProfileCard from "./EditProfileCard";
import OldDeleteAccountCard from "./OldDeleteAccountCard";
import OldChangePasswordCard from "./OldChangePasswordCard";
import EditProfileTabSec from "./EditProfileTabSec";
import { connect } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";
import OldAvailabitityStatusCard from "./OldAvailabitityStatusCard";
import OldTwoStepAuthentication from "./OldTwoStepAuthentication";
import OldSessionManagement from "./OldSessionManagement";

const OldEditProfile = (props) => {
  const [activeSec, setActiveSec] = useState("profile-card");

  return (
    <div className="edit-profile">
      <Container>
        <Row>
          <Col sm={12} md={4}>
            <div className="vertical-menu edit-p">
              <div className="tab" role="tabpanel">
                <EditProfileTabSec
                  activeSec={activeSec}
                  setActiveSec={setActiveSec}
                  location={props.location}
                />
              </div>
            </div>
          </Col>
          <Col md={8} sm={12}>
            <div className="tab-content tabs">
              <EditProfileCard
                activeSec={activeSec}
                setActiveSec={setActiveSec}
              />

              <OldChangePasswordCard
                activeSec={activeSec}
                setActiveSec={setActiveSec}
              />

              <OldDeleteAccountCard
                activeSec={activeSec}
                setActiveSec={setActiveSec}
              />

              <OldAvailabitityStatusCard
                activeSec={activeSec}
                setActiveSec={setActiveSec}
              />

              <OldTwoStepAuthentication
                activeSec={activeSec}
                setActiveSec={setActiveSec}
              />

              <OldSessionManagement
                activeSec={activeSec}
                setActiveSec={setActiveSec}
              />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

const mapStateToPros = (state) => ({
  userData: state.users,
});

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(mapStateToPros, mapDispatchToProps)(OldEditProfile);
