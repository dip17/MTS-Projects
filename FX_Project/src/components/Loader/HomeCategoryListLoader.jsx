import React from "react"
import ContentLoader from "react-content-loader"

const HomeCategoryListLoader = (props) => (
  <ContentLoader 
    speed={2}
    width={1200}
    height={150}
    viewBox="0 0 1200 150"
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
    <rect x="30" y="41" rx="5" ry="5" width="157" height="73" /> 
    <rect x="205" y="41" rx="5" ry="5" width="157" height="73" /> 
    <rect x="380" y="41" rx="5" ry="5" width="157" height="73" />
    <rect x="560" y="41" rx="5" ry="5" width="157" height="73" />
    <rect x="740" y="41" rx="5" ry="5" width="157" height="73" />
    <rect x="920" y="41" rx="5" ry="5" width="157" height="73" />
  </ContentLoader>
)

export default HomeCategoryListLoader;