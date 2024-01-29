import React, { useState } from 'react';

const DurationTimer = (props) => {
  const [duration, setDuration] = useState("00.00");

  const setTime = () => {
    let startTime = new Date(props.time);
    let currentTime = new Date();
    let diff = (currentTime.getTime() - startTime.getTime());
    var hours = Math.floor(diff / 1000 / 60 / 60);
    diff -= hours * 1000 * 60 * 60;
    var minutes = Math.floor(diff / 1000 / 60);
    diff -= minutes * 1000 * 60;
    var seconds = Math.floor(diff / 1000);
    setDuration((hours <= 9 ? "0" : "") + hours + ":" + (minutes <= 9 ? "0" : "") + minutes + ":" +(seconds <= 9 ? "0" : "") + seconds);
  }

  useState(() => {
    setTime();
    setInterval(() => {
      setTime();
    }, 1000);
  }, []);

  return duration;
}

export default DurationTimer;