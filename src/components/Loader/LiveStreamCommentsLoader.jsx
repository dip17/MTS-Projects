import React from 'react'
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const LiveStreamCommentsLoader = ({count}) => {
  return (
    <SkeletonTheme baseColor="#dee2e6" highlightColor="#ced4da">
    {[...Array(count).keys()].map((index) => {
      return (
        <div
          className="d-flex justify-content-start align-items-center gap-3 mb-3"
          key={index}
        >
          <Skeleton circle height={56} width={56}></Skeleton>
          <Skeleton height={24} width={100} borderRadius={8}></Skeleton>
        </div>
      );
    })}
  </SkeletonTheme>
  )
}

export default LiveStreamCommentsLoader