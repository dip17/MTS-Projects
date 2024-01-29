import React from "react"
import ContentLoader from "react-content-loader"

const EcomHomeFeaturesLoader = (props) => (
  <ContentLoader 
    speed={2}
    width={1200}
    height={700}
    viewBox="0 0 1200 700"
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
    <rect x="7" y="22" rx="5" ry="5" width="350" height="216" /> 
    <rect x="380" y="20" rx="5" ry="5" width="350" height="216" /> 
    <rect x="750" y="22" rx="5" ry="5" width="350" height="216" /> 
    <rect x="15" y="253" rx="0" ry="0" width="105" height="13" /> 
    <rect x="15" y="273" rx="0" ry="0" width="96" height="13" /> 
    <rect x="15" y="296" rx="0" ry="0" width="60" height="15" /> 
    <rect x="385" y="253" rx="0" ry="0" width="105" height="13" /> 
    <rect x="385" y="273" rx="0" ry="0" width="96" height="13" /> 
    <rect x="385" y="296" rx="0" ry="0" width="60" height="15" /> 
    <rect x="755" y="253" rx="0" ry="0" width="105" height="13" /> 
    <rect x="755" y="273" rx="0" ry="0" width="96" height="13" /> 
    <rect x="755" y="296" rx="0" ry="0" width="60" height="15" /> 
    <rect x="7" y="333" rx="5" ry="5" width="350" height="216" /> 
    <rect x="380" y="331" rx="5" ry="5" width="350" height="216" /> 
    <rect x="750" y="333" rx="5" ry="5" width="350" height="216" /> 
    <rect x="11" y="564" rx="0" ry="0" width="105" height="13" /> 
    <rect x="11" y="584" rx="0" ry="0" width="96" height="13" /> 
    <rect x="11" y="607" rx="0" ry="0" width="60" height="15" /> 
    <rect x="385" y="564" rx="0" ry="0" width="105" height="13" /> 
    <rect x="385" y="584" rx="0" ry="0" width="96" height="13" /> 
    <rect x="385" y="607" rx="0" ry="0" width="60" height="15" /> 
    <rect x="755" y="564" rx="0" ry="0" width="105" height="13" /> 
    <rect x="755" y="584" rx="0" ry="0" width="96" height="13" /> 
    <rect x="755" y="607" rx="0" ry="0" width="60" height="15" />
  </ContentLoader>
)

export default EcomHomeFeaturesLoader;