import React from 'react';
import { Image } from 'react-bootstrap';


const ChatDocument = (props) => {

  return (
    <div className="chat-document-container">
      <svg viewBox="0 0 16 16" className="chat-document-icon">
        <path d="M4 0h5.293A1 1 0 0 1 10 .293L13.707 4a1 1 0 0 1 .293.707V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2zm5.5 1.5v2a1 1 0 0 0 1 1h2l-3-3z" />
      </svg>
      <div className="w-100">{
        props.chatAsset.file_name.length < 21
          ? props.chatAsset.file_name
          : `${props.chatAsset.file_name.substring(0, 15)}...
          ${props.chatAsset.file_name.substring(
            props.chatAsset.file_name.lastIndexOf('.') > 0
              ? props.chatAsset.file_name.lastIndexOf('.')
              : props.chatAsset.file_name.length,
            props.chatAsset.file_name.length
          )}
          `
      }</div>
      <a className="chat-document-download" href={props.chatAsset.asset_file} download target="_blank">
        <svg class="bi bi-arrow-down-circle-fill" viewBox="0 0 16 16">
          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V4.5z" />
        </svg>
      </a>
    </div>
  );
}

export default ChatDocument;