import React from "react";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

const ToolTip = (props) => {
  const renderTooltip = (toolTipprops) => (
    <Tooltip id="button-tooltip" {...toolTipprops}>
      <h4> {props.title}</h4>
    </Tooltip>
  );

  return (
    <OverlayTrigger
      placement={props.placement}
      delay={{ show: 250, hide: 250 }}
      overlay={renderTooltip}
    >
      {props.children}
    </OverlayTrigger>
  );
};

export default ToolTip;
