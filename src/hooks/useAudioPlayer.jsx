import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";

function useAudioPlayer(src, loop, next, autoNext, props) {
  const [duration, setDuration] = useState();
  const [curTime, setCurTime] = useState();
  const [playing, setPlaying] = useState(false);
  const [isBuffering, setIsBuffering] = useState(false);
  const [clickedTime, setClickedTime] = useState();
  const audio = useRef(new Audio(src));

  const changeSrc = (newSrc) => {
    audio.current.src = newSrc;
    // audio.current.currentTime = 0;
  }

  useEffect(() => {
    // const audio = document.getElementById("audio");

    // state setters wrappers
    const setAudioData = () => {
      setDuration(audio.current.duration);
      setCurTime(audio.current.currentTime);
    }

    const setAudioTime = () => setCurTime(audio.current.currentTime);

    // DOM listeners: update React state on DOM events
    audio.current.addEventListener("loadeddata", setAudioData);

    audio.current.addEventListener("timeupdate", setAudioTime);

    audio.current.addEventListener('ended', function () {
      if (!loop) {
        // audio.current.currentTime = 0;
        if (next && autoNext) {
          next();
        } else {
          setPlaying(false);
          setCurTime(0);
        }
      }
    }, false);

    // audio.current.addEventListener('waiting', function () {
    //   // window.alert('Waiting');
    //   console.log("waiting");
    //   setIsBuffering(true);
    // });

    // audio.current.addEventListener('loadstart', function () {
    //   // window.alert("Loading");
    //   console.log("Loading");
    //   setIsBuffering(true);
    // });

    // audio.current.addEventListener('progress', function () {
    //   // do something, eg:
    //   var timeRanges = audio.current.buffered;
    //   if (timeRanges && timeRanges.length > 0) {
    //     console.log(timeRanges);
    //     setIsBuffering(false);
    //     // do something with the TimeRanges object
    //   }
    // });

    // React state listeners: update DOM on React state changes
    playing ? audio.current.play() : audio.current.pause();

    if (clickedTime && clickedTime !== curTime) {
      audio.current.currentTime = clickedTime;
      setClickedTime(null);
    }

    // effect cleanup
    return () => {
      audio.current.removeEventListener("loadeddata", setAudioData);
      audio.current.removeEventListener("timeupdate", setAudioTime);
      audio.current.removeEventListener("ended", setAudioTime);
      audio.current.pause();
    }
  });

  const currentAudio = useSelector(state => state.chat.currentAudio);

  useEffect(() => {
    if (currentAudio.src !== src) {
      setPlaying(false);
    }
  }, [currentAudio.src]);

  return {
    curTime,
    duration,
    playing,
    setPlaying,
    setClickedTime,
    changeSrc,
    isBuffering,
  }
}

const mapStateToPros = (state) => ({
  currentAudio: state.chat.currentAudio,
});

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default useAudioPlayer;