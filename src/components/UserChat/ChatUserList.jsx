import React from "react";
import { Button, Col, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { translate, t } from "react-multi-lang";

const ChatUserList = (props) => {
  const { chatUsers } = props;
  return (
    <>
			{chatUsers.users.map((chatUser, index) => (
				<div key={index}>
					<Link
						to="#"
						className="user-chat-msg"
						onClick={(event) =>
							props.changeUser(event, chatUser, index)
						}
					>
					<div className={
						props.activeChat === index
							? "user-list-card active"
							: "user-list-card"
					}>
						<div className="user-list-body">
								<div className="user-list-img-sec">
										<Image
												src={chatUser.to_userpicture}
												alt={chatUser.to_displayname}
												className="user-list-img"
										/>
								</div>
								<div className="user-list-info">
										<h6>{chatUser.to_displayname}</h6>
										<p>{chatUser.message}</p>
								</div>
						</div>
						<div className="user-list-time">
								<p>{chatUser.time_formatted}</p>
						</div>
				</div>
				</Link>
			</div>
			))}
		</>
  );
};

export default translate(ChatUserList);
