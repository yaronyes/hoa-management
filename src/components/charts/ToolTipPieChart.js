import React, { useState } from "react";
import { MDBContainer } from "mdbreact";
import { PieChart } from "react-minimal-pie-chart";
import ReactTooltip from "react-tooltip";

const defaultLabelStyle = {
  fontSize: "10px",
  fontFamily: "sans-serif",
};

const ToolTipPieChart = ({ data, isPercentage=false, header }) => {
  const [hovered, setHovered] = useState(null);

  const makeTooltipContent = (entry) => {
    return `${entry.title}`;
  };

  if(data.length === 0) {
    return <div style={{width: '100%'}}>
              <img src="dont_know.png" className="img-fluid" alt=""/>
          </div>
  }

  return (
    <div data-tip="" data-for="chart">
      <h6>{header}</h6>
      <PieChart
        data={data}
        // style={{ height: "100px" }}        
        label={({ dataEntry }) => isPercentage ? Math.round(dataEntry.percentage) + '%' : dataEntry.value}
        labelStyle={defaultLabelStyle}
        onMouseOver={(_, index) => {
          setHovered(index);
        }}
        onMouseOut={() => {
          setHovered(null);
        }}
      />
      <ReactTooltip
        id="chart"
        getContent={() =>
          typeof hovered === "number" ? makeTooltipContent(data[hovered]) : null
        }
      />
    </div>
  );
};

export default ToolTipPieChart;
