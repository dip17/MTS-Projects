import React from "react"
import ContentLoader from "react-content-loader"

const ReferralsLoader = (props) => (
  <ContentLoader 
    speed={2}
    width={1340}
    height={520}
    viewBox="0 0 1100 520"
    // backgroundColor="#f3f3f3"
    // foregroundColor="#ecebeb"
    backgroundColor={
      localStorage.getItem("theme") === "dark" ? "#090909" : "#f3f3f3"
    }
    foregroundColor={
      localStorage.getItem("theme") === "dark" ? "#151515" : "#ecebeb"
    }
    {...props}
  >
    <rect x="31" y="130" rx="0" ry="0" width="0" height="9" /> 
    <rect x="5" y="2" rx="0" ry="0" width="8" height="376" /> 
    <rect x="6" y="0" rx="0" ry="0" width="1100" height="8" /> 
    <rect x="1092" y="2" rx="0" ry="0" width="8" height="376" /> 
    <rect x="7" y="369" rx="0" ry="0" width="1100" height="10" /> 
    <rect x="25" y="20" rx="0" ry="0" width="186" height="9" /> 
    <rect x="25" y="47" rx="0" ry="0" width="500" height="32" /> 
    <rect x="550" y="34" rx="5" ry="5" width="80" height="80" /> 
    <rect x="665" y="35" rx="5" ry="5" width="80" height="80" /> 
    <rect x="780" y="36" rx="5" ry="5" width="80" height="80" /> 
    <rect x="890" y="35" rx="5" ry="5" width="80" height="80" /> 
    <rect x="1000" y="36" rx="5" ry="5" width="80" height="80" /> 
    <rect x="29" y="100" rx="5" ry="5" width="500" height="256" /> 
    <rect x="6" y="400" rx="0" ry="0" width="185" height="10" /> 
    <rect x="4" y="425" rx="5" ry="5" width="350" height="74" /> 
    <rect x="378" y="425" rx="5" ry="5" width="350" height="74" /> 
    <rect x="750" y="425" rx="5" ry="5" width="350" height="74" />
  </ContentLoader>
)

export default ReferralsLoader;