import React, { useState } from "react";
import { InputGroup, FormControl, Image } from "react-bootstrap";
import "./NewHome.css";
import { Link } from "react-router-dom";
import NewFeedSuggestionCard from "./NewFeedSuggestionCard";
import NewFeedTrendingCard from "./NewFeedTrendingCard";
import NewHomeSearch from "./NewSingleView/NewHomeSearch";

const NewFeedRightIndex = (props) => {
  return (
    <>
      <div className="new-feed-right-sec">
        <NewHomeSearch desktop/>
        <div className="new-feed-suggestions-trending-sec">
          <NewFeedSuggestionCard />
          <NewFeedTrendingCard />
        </div>
      </div>
    </>
  );
};

export default NewFeedRightIndex;
