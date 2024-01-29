import React, { useState } from 'react'
import { useEffect } from 'react';
import Stories  from 'react-insta-stories';
import {
  Form,
  Button,
  Image,
  Modal,
  Tab,
  Nav,
  Row,
  Col,
} from "react-bootstrap";

const StoriesSliderModal = (props) => {

  const [modalData , setModalData] = useState([])

  useEffect(() => {

    const dataArray = []

    props.sliderData.storyFiles.map((data) => {
      dataArray.push(
        {
          url:data.file,
          type:data.file_type,
          header: {
            heading: props.sliderData.name,
            subheading: data.updated,
            profileImage: props.sliderData.picture
          }
        }
      )
    })
    setModalData(dataArray)
  },[props.sliderData])

  return (
    <>
      <div class={`modal custom-modal fade`} id="storiesSliderModal" tabindex="-1" role="dialog" aria-labelledby="storiesSliderModal" aria-hidden="true" data-backdrop="static" data-keyboard="false"> 
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-hidden="true" onClick={() => props.SliderModalToggle(false)}>×</button>
            </div>
            <div className="modal-body">
              {modalData.length > 0 && (
                <Stories
                  // currentIndex={props.selectedSliderIndex == 0 ? null : props.selectedSliderIndex}
                  stories={modalData}
                  defaultInterval={3000}
                  width={"100%"}
                  // height={window.innerHeight - 100}
                  height={"100%"}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default StoriesSliderModal
