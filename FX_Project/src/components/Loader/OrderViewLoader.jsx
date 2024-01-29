import React from "react"
import ContentLoader from "react-content-loader"

const OrderViewLoader = (props) => (
  <ContentLoader 
    speed={2}
    width={1200}
    height={550}
    viewBox="0 0 1200 550"
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
    <rect x="7" y="20" rx="5" ry="5" width="550" height="517" /> 
    <rect x="600" y="26" rx="5" ry="5" width="500" height="238" /> 
    <rect x="600" y="318" rx="5" ry="5" width="500" height="61" /> 
    <circle cx="650" cy="316" r="18" /> 
    <circle cx="780" cy="315" r="18" /> 
    <circle cx="910" cy="316" r="18" /> 
    <circle cx="1050" cy="315" r="18" />
  </ContentLoader>
)

export default OrderViewLoader;