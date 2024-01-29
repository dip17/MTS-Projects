import React from 'react';

const NextBtn = (props) => {
    const { handleClick, disabled } = props;
    return (
        <button className="player__button_sub" onClick={handleClick} disabled={disabled}>
            <svg width="494" height="494" viewBox="0 0 494 494" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_345_15)">
                    <path d="M355.938 200.956L81.4136 12.128C70.1336 4.35205 58.4015 0.248047 48.3575 0.248047C26.3055 0.248047 11.6855 18.744 11.6855 48.508V445.544C11.6855 460.084 15.9135 472.232 22.1815 480.688C28.5455 489.26 38.5015 493.796 49.2575 493.796C59.2975 493.796 70.5656 489.684 81.8416 481.92L356.118 293.092C373.75 280.94 383.418 264.584 383.414 247.016C383.414 229.456 373.594 213.1 355.938 200.956Z" fill="current" />
                    <path d="M456.446 493.672L456.153 493.668C456.105 493.668 456.058 493.672 456.01 493.672H456.446Z" fill="current" />
                    <path d="M455.638 0L444.29 0.032C429.43 0.032 416.566 12.144 416.566 27.024V466.392C416.566 481.288 429.218 493.516 444.098 493.516L456.153 493.668C470.958 493.589 482.11 481.256 482.11 466.416V26.996C482.11 12.116 470.51 0 455.638 0Z" fill="current" />
                </g>
                <defs>
                    <clipPath id="clip0_345_15">
                        <rect width="493.796" height="493.796" fill="current" />
                    </clipPath>
                </defs>
            </svg>
        </button>
    );
}

export default NextBtn;