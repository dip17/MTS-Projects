import React from "react";
import { Image } from "react-bootstrap";
import configuration from "react-global-configuration";

const VerifiedBadgeNoShadow = (props) => {
  return (
    <span className="verified-badge-sec no-shadow">
      <Image
        src={configuration.get('configData.verified_badge_file') ? configuration.get('configData.verified_badge_file') : ""}
        className="verified-dating"
        alt="verified-badge"
      />
      <span className="verified-info"></span>
    </span>
  );
};

export default VerifiedBadgeNoShadow;
