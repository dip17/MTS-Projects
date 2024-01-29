import React from "react";
import { Row, Col} from "react-bootstrap";
import { translate, t } from "react-multi-lang";

const BookmarkNoDataFound = () => {
  return (
    <>
      <div className="bookmark-no-data-found-sec">
        <Row>
          <Col sm="12" md="12">
            <div className="mb-2"> 
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="#8a96a3"
              viewBox="0 0 24 24"
            >
              <path d="M17.5 0h-11A5.507 5.507 0 001 5.5v14.972a3.5 3.5 0 006.044 2.4l4.912-5.2 5.013 5.25A3.5 3.5 0 0023 20.51V5.5A5.507 5.507 0 0017.5 0zM20 20.51a.5.5 0 01-.861.345l-6.1-6.391A1.5 1.5 0 0011.95 14a1.5 1.5 0 00-1.086.47l-6 6.345a.479.479 0 01-.549.122.471.471 0 01-.315-.465V5.5A2.5 2.5 0 016.5 3h11A2.5 2.5 0 0120 5.5z"></path>
            </svg>
            </div>
            <p className="desc">{t("no_bookmarks_yet")}</p>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default translate(BookmarkNoDataFound);
