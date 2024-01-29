import React from 'react';

const PrevBtn = (props) => {
    const { handleClick, disabled } = props;
    return (
        <button className="player__button_sub" onClick={handleClick} disabled={disabled}>
            <svg width="408.221px" height="408.221px" viewBox="0 0 408.221 408.221" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_345_39)">
                    <path d="M137.859 200.956L412.383 12.128C423.663 4.35205 435.395 0.248047 445.439 0.248047C467.491 0.248047 482.111 18.744 482.111 48.508V445.544C482.111 460.084 477.883 472.232 471.615 480.688C465.251 489.26 455.295 493.796 444.539 493.796C434.499 493.796 423.231 489.684 411.955 481.92L137.679 293.092C120.047 280.94 110.379 264.584 110.383 247.016C110.383 229.456 120.203 213.1 137.859 200.956Z" fill="current" />
                    <path d="M37.3511 493.672L37.6441 493.668C37.6921 493.668 37.7391 493.672 37.7871 493.672H37.3511Z" fill="current" />
                    <path d="M38.1585 0L49.5065 0.032C64.3665 0.032 77.2305 12.144 77.2305 27.024V466.392C77.2305 481.288 64.5785 493.516 49.6985 493.516L37.6435 493.668C22.8385 493.589 11.6865 481.256 11.6865 466.416V26.996C11.6865 12.116 23.2865 0 38.1585 0Z" fill="current" />
                </g>
                <defs>
                    <clipPath id="clip0_345_39">
                        <rect width="493.796" height="493.796" fill="current" transform="matrix(-1 0 0 1 493.797 0)" />
                    </clipPath>
                </defs>
            </svg>
        </button>
    );
}

export default PrevBtn;