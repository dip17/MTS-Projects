import React, { useState, useEffect, useRef } from "react";
import useAudioPlayer from "../../hooks/useAudioPlayer";
import Play from "./Play";
import Pause from "./Pause";
import Bar from "./Bar";
import './player.css';
import { Button, Image, Modal } from "react-bootstrap";
import PrevBtn from "./PrevBtn";
import NextBtn from "./NextBtn";


const AltraAudioPlayer = ({
  src,
  srcKey = "file",
  initialIndex = 0,
  imageKey = "image",
  repeat = false,
  listLoop = false,
  autoPlay = true,
  autoNext = false,
  ...props
}) => {

  const audioref = useRef;
  const [image, setImage] = useState();
  const [bg, setBg] = useState(0);
  const [audioIndex, setAudioIndex] = useState(initialIndex);

  const prev = () => {
    if (audioIndex != 0) {
      setAudioIndex(audioIndex - 1);
    } else if (listLoop) {
      setAudioIndex(src.length - 1);
    }
  }

  const next = () => {
    if (audioIndex != src.length - 1) {
      setAudioIndex(audioIndex + 1);
    } else if (listLoop) {
      setAudioIndex(0);
    }
  }

  const {
    curTime,
    duration,
    playing,
    setPlaying,
    setClickedTime,
    changeSrc,
    isBuffering
  } = useAudioPlayer(src[audioIndex][srcKey], repeat, next, autoNext);

  const gradients = [
    "linear-gradient(0deg, rgba(34, 193, 195, 1) 0%, rgba(253, 187, 45, 1) 100%)",
    "linear-gradient(0deg, rgba(34, 193, 195, 1) 0%, rgba(252,70,107,1) 100%)",
    "linear-gradient(0deg, rgba(253,29,29,1) 0%, rgba(252,70,107,1) 100%)",
    "linear-gradient(0deg, rgba(63,94,251,1) 0%, rgba(252,70,107,1) 100%)",
    "linear-gradient(0deg, rgba(131,58,180,1) 0%, rgba(253,29,29,1) 100%)",
    "linear-gradient(0deg, rgba(34, 193, 195, 1) 0%, rgba(252,176,69,1) 100%)",
    "linear-gradient(0deg, rgba(252,176,69,1) 0%, rgba(252,70,107,1) 100%)",
  ];


  useEffect(() => {
    changeSrc(src[audioIndex][srcKey]);
    // setBg(Math.floor(Math.random() * gradients.length));
    setBg(audioIndex % gradients.length);
    if (autoPlay) {
      setPlaying(true);
    } else {
      setPlaying(false);
    }
    if (imageKey && src[audioIndex][imageKey]) {
      setImage(src[audioIndex][imageKey]);
    } else {
      setImage(null);
    }
  }, [audioIndex]);

  return (
    <Modal
      centered
      size="md"
      className="modal-dialog-center sent-tip-modal"
      show={true}
      onHide={() => {
        setPlaying(false);
        setTimeout(() => {
          props.closeAudioPlayer();
        }, [50]);
      }}
    >
      <Button className="modal-close" onClick={() => {
        setPlaying(false);
        setTimeout(() => {
          props.closeAudioPlayer();
        }, [50]);
      }}>
        <Image
          className="close-icon"
          src={
            window.location.origin + "/assets/images/new-chat/modal-close.svg"
          }
        />
      </Button>
      <Modal.Body>
        <div className="player" style={image ? {
          backgroundImage: `url(${image})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          height: "250px"
        } : { background: gradients[bg] }}>
          <div className="controls">
            <div className="basic-controls">
              <PrevBtn handleClick={() => prev()} disabled={audioIndex === 0 && !listLoop} />
              {playing ?
                <Pause handleClick={() => setPlaying(false)} /> :
                <Play handleClick={() => setPlaying(true)} />
              }
              <NextBtn handleClick={() => next()} disabled={(audioIndex === src.length - 1) && !listLoop} />
            </div>
            <Bar curTime={curTime} duration={duration} onTimeUpdate={(time) => setClickedTime(time)} />
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );

}

export default AltraAudioPlayer;