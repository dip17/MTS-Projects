import React from "react";
// import { PlayCircleFilled } from "@material-ui/icons";

export default function Play(props) {
    const { duration, curTime, onTimeUpdate } = props;

    const curPercentage = (curTime / duration) * 100;

    function formatDuration(duration) {
        if (duration) {
            var date = new Date(null);
            date.setSeconds(duration);
            return date.toISOString().substr(14, 5);
        } else {
            return "00:00";
        }
    }

    function calcClickedTime(e) {
        const clickPositionInPage = e.pageX;
        const bar = document.querySelector(".bar__progress");
        const barStart = bar.getBoundingClientRect().left + window.scrollX;
        const barWidth = bar.offsetWidth;
        const clickPositionInBar = clickPositionInPage - barStart;
        const timePerPixel = duration / barWidth;
        return timePerPixel * clickPositionInBar;
    }

    function handleTimeDrag(e) {
        onTimeUpdate(calcClickedTime(e));

        const updateTimeOnMove = eMove => {
            onTimeUpdate(calcClickedTime(eMove));
        };

        document.addEventListener("mousemove", updateTimeOnMove);

        document.addEventListener("mouseup", () => {
            document.removeEventListener("mousemove", updateTimeOnMove);
        });
    }

    return (
        <div className="bar">
            <div className="timer-sec">
                <span className="bar__time">{formatDuration(curTime)}</span>
                <div
                    className="bar__progress"
                    style={{
                        background: `linear-gradient(to right, #6661e7 ${curPercentage}%, white 0)`
                    }}
                    onMouseDown={e => handleTimeDrag(e)}
                >
                    <span
                        className="bar__progress__knob"
                        style={{ left: `${curPercentage - 2}%` }}
                    />
                </div>
                <span className="bar__time">{formatDuration(duration)}</span>
            </div>
        </div>
    );
}
