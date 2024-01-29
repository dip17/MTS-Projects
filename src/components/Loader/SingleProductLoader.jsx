import React from "react"
import ContentLoader from "react-content-loader"

const SingleProductLoader = (props) => (
  <ContentLoader 
    speed={2}
    width={1200}
    height={500}
    viewBox="0 0 1200 500"
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
    <rect x="7" y="18" rx="0" ry="0" width="600" height="310" /> 
    <rect x="160" y="350" rx="0" ry="0" width="140" height="120" /> 
    <rect x="313" y="350" rx="0" ry="0" width="140" height="120" /> 
    <rect x="465" y="350" rx="0" ry="0" width="140" height="120" /> 
    <rect x="7" y="351" rx="0" ry="0" width="140" height="120" /> 
    <rect x="650" y="27" rx="0" ry="0" width="203" height="22" /> 
    <rect x="650" y="71" rx="0" ry="0" width="225" height="11" /> 
    <rect x="650" y="95" rx="0" ry="0" width="222" height="14" /> 
    <rect x="650" y="123" rx="0" ry="0" width="227" height="11" /> 
    <rect x="650" y="148" rx="0" ry="0" width="68" height="19" /> 
    <rect x="650" y="178" rx="0" ry="0" width="119" height="16" /> 
    <rect x="650" y="211" rx="0" ry="0" width="81" height="35" /> 
    <rect x="750" y="211" rx="0" ry="0" width="81" height="35" /> 
    <rect x="650" y="257" rx="0" ry="0" width="450" height="2" />
  </ContentLoader>
)

export default SingleProductLoader;