import React from "react"
import ContentLoader from "react-content-loader"

const OrderTransactionLoader = (props) => (
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
    <rect x="4" y="20" rx="0" ry="0" width="1100" height="61" /> 
    <rect x="7" y="105" rx="0" ry="0" width="95" height="10" /> 
    <rect x="120" y="105" rx="0" ry="0" width="200" height="10" /> 
    <rect x="350" y="105" rx="0" ry="0" width="80" height="10" /> 
    <rect x="480" y="105" rx="0" ry="0" width="100" height="10" /> 
    <rect x="630" y="105" rx="0" ry="0" width="80" height="10" /> 
    <rect x="760" y="105" rx="0" ry="0" width="60" height="10" /> 
    <rect x="875" y="105" rx="0" ry="0" width="60" height="10" /> 
    <rect x="1000" y="99" rx="5" ry="5" width="100" height="25" /> 
    <rect x="4" y="138" rx="0" ry="0" width="1100" height="3" /> 
    <rect x="7" y="162" rx="0" ry="0" width="95" height="10" /> 
    <rect x="120" y="162" rx="0" ry="0" width="200" height="10" /> 
    <rect x="350" y="162" rx="0" ry="0" width="80" height="10" /> 
    <rect x="480" y="162" rx="0" ry="0" width="100" height="10" /> 
    <rect x="630" y="162" rx="0" ry="0" width="80" height="10" /> 
    <rect x="760" y="162" rx="0" ry="0" width="60" height="10" /> 
    <rect x="875" y="162" rx="0" ry="0" width="60" height="10" /> 
    <rect x="1000" y="156" rx="5" ry="5" width="100" height="25" /> 
    <rect x="4" y="195" rx="0" ry="0" width="1100" height="3" /> 
    <rect x="7" y="222" rx="0" ry="0" width="95" height="10" /> 
    <rect x="120" y="222" rx="0" ry="0" width="200" height="10" /> 
    <rect x="350" y="222" rx="0" ry="0" width="80" height="10" /> 
    <rect x="480" y="222" rx="0" ry="0" width="100" height="10" /> 
    <rect x="630" y="222" rx="0" ry="0" width="80" height="10" /> 
    <rect x="760" y="222" rx="0" ry="0" width="60" height="10" /> 
    <rect x="875" y="222" rx="0" ry="0" width="60" height="10" /> 
    <rect x="1000" y="216" rx="5" ry="5" width="100" height="25" /> 
    <rect x="4" y="255" rx="0" ry="0" width="1100" height="3" /> 
    <rect x="7" y="279" rx="0" ry="0" width="95" height="10" /> 
    <rect x="120" y="279" rx="0" ry="0" width="100" height="10" /> 
    <rect x="350" y="279" rx="0" ry="0" width="80" height="10" /> 
    <rect x="480" y="279" rx="0" ry="0" width="100" height="10" /> 
    <rect x="630" y="279" rx="0" ry="0" width="80" height="10" /> 
    <rect x="760" y="279" rx="0" ry="0" width="60" height="10" /> 
    <rect x="875" y="279" rx="0" ry="0" width="60" height="10" /> 
    <rect x="1000" y="273" rx="5" ry="5" width="100" height="25" /> 
    <rect x="4" y="312" rx="0" ry="0" width="1100" height="3" /> 
    <rect x="7" y="337" rx="0" ry="0" width="95" height="10" /> 
    <rect x="120" y="337" rx="0" ry="0" width="200" height="10" /> 
    <rect x="350" y="337" rx="0" ry="0" width="80" height="10" /> 
    <rect x="480" y="337" rx="0" ry="0" width="100" height="10" /> 
    <rect x="630" y="337" rx="0" ry="0" width="80" height="10" /> 
    <rect x="760" y="337" rx="0" ry="0" width="60" height="10" /> 
    <rect x="875" y="337" rx="0" ry="0" width="60" height="10" /> 
    <rect x="1000" y="331" rx="5" ry="5" width="100" height="25" /> 
    <rect x="4" y="370" rx="0" ry="0" width="1100" height="3" /> 
    <rect x="7" y="397" rx="0" ry="0" width="95" height="10" /> 
    <rect x="120" y="397" rx="0" ry="0" width="200" height="10" /> 
    <rect x="350" y="397" rx="0" ry="0" width="80" height="10" /> 
    <rect x="480" y="397" rx="0" ry="0" width="100" height="10" /> 
    <rect x="630" y="397" rx="0" ry="0" width="80" height="10" /> 
    <rect x="760" y="397" rx="0" ry="0" width="60" height="10" /> 
    <rect x="875" y="397" rx="0" ry="0" width="60" height="10" /> 
    <rect x="1000" y="391" rx="5" ry="5" width="100" height="25" /> 
    <rect x="4" y="430" rx="0" ry="0" width="1100" height="3" /> 
    <rect x="7" y="454" rx="0" ry="0" width="95" height="10" /> 
    <rect x="120" y="454" rx="0" ry="0" width="200" height="10" /> 
    <rect x="350" y="454" rx="0" ry="0" width="80" height="10" /> 
    <rect x="480" y="454" rx="0" ry="0" width="100" height="10" /> 
    <rect x="630" y="454" rx="0" ry="0" width="80" height="10" /> 
    <rect x="760" y="454" rx="0" ry="0" width="60" height="10" /> 
    <rect x="875" y="454" rx="0" ry="0" width="60" height="10" /> 
    <rect x="1000" y="448" rx="5" ry="5" width="100" height="25" /> 
    <rect x="4" y="487" rx="0" ry="0" width="1100" height="3" />
  </ContentLoader>
)

export default OrderTransactionLoader;