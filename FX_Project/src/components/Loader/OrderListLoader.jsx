import React from "react"
import ContentLoader from "react-content-loader"

const OrderListLoader = (props) => (
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
    <rect x="6" y="13" rx="0" ry="0" width="1100" height="49" /> 
    <rect x="20" y="91" rx="0" ry="0" width="150" height="81" /> 
    <rect x="200" y="121" rx="0" ry="0" width="150" height="11" /> 
    <rect x="200" y="140" rx="0" ry="0" width="100" height="8" /> 
    <rect x="430" y="99" rx="0" ry="0" width="200" height="9" /> 
    <rect x="430" y="121" rx="0" ry="0" width="200" height="9" /> 
    <rect x="430" y="142" rx="0" ry="0" width="200" height="9" /> 
    <rect x="430" y="160" rx="0" ry="0" width="200" height="9" /> 
    <rect x="700" y="118" rx="0" ry="0" width="80" height="11" /> 
    <rect x="850" y="118" rx="0" ry="0" width="26" height="17" /> 
    <rect x="950" y="118" rx="0" ry="0" width="26" height="18" /> 
    <rect x="1050" y="115" rx="0" ry="0" width="41" height="23" /> 
    <rect x="7" y="200" rx="0" ry="0" width="1100" height="3" /> 
    <rect x="20" y="231" rx="0" ry="0" width="150" height="81" /> 
    <rect x="200" y="261" rx="0" ry="0" width="150" height="11" /> 
    <rect x="200" y="280" rx="0" ry="0" width="150" height="8" /> 
    <rect x="430" y="239" rx="0" ry="0" width="200" height="9" /> 
    <rect x="430" y="261" rx="0" ry="0" width="200" height="9" /> 
    <rect x="430" y="282" rx="0" ry="0" width="200" height="9" /> 
    <rect x="430" y="300" rx="0" ry="0" width="200" height="9" /> 
    <rect x="700" y="258" rx="0" ry="0" width="80" height="11" /> 
    <rect x="850" y="257" rx="0" ry="0" width="26" height="17" /> 
    <rect x="950" y="258" rx="0" ry="0" width="26" height="18" /> 
    <rect x="1050" y="255" rx="0" ry="0" width="41" height="23" /> 
    <rect x="7" y="340" rx="0" ry="0" width="1100" height="3" /> 
    <rect x="20" y="365" rx="0" ry="0" width="150" height="81" /> 
    <rect x="200" y="395" rx="0" ry="0" width="150" height="11" /> 
    <rect x="200" y="414" rx="0" ry="0" width="150" height="8" /> 
    <rect x="430" y="373" rx="0" ry="0" width="200" height="9" /> 
    <rect x="430" y="395" rx="0" ry="0" width="200" height="9" /> 
    <rect x="430" y="416" rx="0" ry="0" width="200" height="9" /> 
    <rect x="430" y="434" rx="0" ry="0" width="200" height="9" /> 
    <rect x="700" y="392" rx="0" ry="0" width="80" height="11" /> 
    <rect x="850" y="391" rx="0" ry="0" width="26" height="17" /> 
    <rect x="950" y="392" rx="0" ry="0" width="26" height="18" /> 
    <rect x="1050" y="389" rx="0" ry="0" width="41" height="23" /> 
    <rect x="7" y="474" rx="0" ry="0" width="1100" height="3" /> 
    <rect x="20" y="505" rx="0" ry="0" width="150" height="81" /> 
    <rect x="200" y="535" rx="0" ry="0" width="150" height="11" /> 
    <rect x="200" y="554" rx="0" ry="0" width="150" height="8" /> 
    <rect x="430" y="513" rx="0" ry="0" width="200" height="9" /> 
    <rect x="430" y="535" rx="0" ry="0" width="200" height="9" /> 
    <rect x="430" y="556" rx="0" ry="0" width="200" height="9" /> 
    <rect x="430" y="574" rx="0" ry="0" width="200" height="9" /> 
    <rect x="700" y="532" rx="0" ry="0" width="80" height="11" /> 
    <rect x="850" y="531" rx="0" ry="0" width="26" height="17" /> 
    <rect x="950" y="532" rx="0" ry="0" width="26" height="18" /> 
    <rect x="1050" y="529" rx="0" ry="0" width="41" height="23" /> 
    <rect x="7" y="614" rx="0" ry="0" width="1100" height="3" />
  </ContentLoader>
)

export default OrderListLoader;