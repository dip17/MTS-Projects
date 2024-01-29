import React from 'react';
import Skeleton from "react-loading-skeleton";

const LiveStreamingLoader = () => {
  return (
    <>
      <div className="most-popular-live-box">
        {[...Array(8)].map(() => <Skeleton className="live-streaming-loader" />)}
      </div>
    </>
  )
}

export default LiveStreamingLoader;