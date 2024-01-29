import React from "react";
import { Image } from "react-bootstrap";
import configuration from "react-global-configuration";

const VerifiedBadge = (props) => {
  return (
    <span className="verified-badge-sec">
      <Image
        src={configuration.get('configData.verified_badge_file') ? configuration.get('configData.verified_badge_file') : ""}
        className="verified-dating"
        alt="verified-badge"
      />
      <span className="verified-info">{configuration.get('configData.verified_badge_text')}</span>
    </span>
  );
};

export default VerifiedBadge;
