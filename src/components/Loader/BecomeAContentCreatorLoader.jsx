import React from "react"
import ContentLoader from "react-content-loader"

const BecomeAContentCreatorLoader = (props) => (
  <ContentLoader 
    speed={2}
    width={1200}
    height={350}
    viewBox="0 0 1200 300"
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
    <rect x="5" y="23" rx="5" ry="5" width="1100" height="600" />
  </ContentLoader>
)

export default BecomeAContentCreatorLoader;