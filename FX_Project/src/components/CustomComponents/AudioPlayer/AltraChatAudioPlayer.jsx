import React, { useState, useEffect } from 'react';
import useAudioPlayer from '../../../hooks/useAudioPlayer';
import Pause from './Pause';
import Play from './Play';
import './ChatAudioPlayer.css';
import WaveProgressBar from './WaveProgressBar';
import { changeChatAudio } from '../../../store/actions/ChatAction';
import { connect } from 'react-redux';

const AltraChatAudioPlayer = (props) => {

  const { curTime, duration, playing, setPlaying, setClickedTime, changeSrc } = useAudioPlayer(props.src, false);

  const [skipRender, setSkipRender] = useState(true);

  useEffect(() => {
    changeSrc(props.src);
  }, [props.src]);

  function formatDuration(duration) {
    if (duration) {
      var date = new Date(null);
      date.setSeconds(duration);
      return date.toISOString().substr(14, 5);
    } else {
      return "00:00";
    }
  }

  return (
    <>
      <div className="altra_chat_audio_container">
        <WaveProgressBar curTime={curTime} duration={duration} onTimeUpdate={(time) => setClickedTime(time)} />
        <div>{formatDuration(duration - curTime)}</div>
        {playing ?
          <Pause handleClick={() => setPlaying(false)} className="altra_chat_audio_btn" /> :
          <Play handleClick={() => {
            props.dispatch(changeChatAudio({
              src: props.src
            }))
            setPlaying(true)
          }} className="altra_chat_audio_btn" />
        }
      </div>
      <div style={{}}></div>
    </>
  );
}

const mapStateToPros = (state) => ({
  currentAudio: state.chat.currentAudio,
});

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(
  mapStateToPros,
  mapDispatchToProps
)(AltraChatAudioPlayer);