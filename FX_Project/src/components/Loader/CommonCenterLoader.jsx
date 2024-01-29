import React from "react"

const CommonCenterLoader = () => (
    <div className="text-center">
        <img style={{width: "5em", height: "5em"}} src={window.location.origin+"/assets/images/small-loader.svg"}/>
    </div>
)

export default CommonCenterLoader;
