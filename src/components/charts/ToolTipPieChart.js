import React, { useState, useEffect } from "react";
import { MDBContainer } from "mdbreact";
import { Pie } from "react-chartjs-2";
import { PieChart } from "react-minimal-pie-chart";
import ReactTooltip from "react-tooltip";
import zeroPercentImage from '../../assets/zero-percent.jpg';
import zeroVotingImage from '../../assets/zero-voting.jpg';

const defaultLabelStyle = {
  fontSize: "10px",
  fontFamily: "sans-serif",
};

const ToolTipPieChart = ({ chartData, isPercentage=false, header, useSmallChart=true }) => {
  const [hovered, setHovered] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(useSmallChart ? chartData : createDataForLargeChart(chartData));
  }, []);
  
  const createDataForLargeChart = (data) => {
    if(data.length === 0) {
      return [];
    }
    else {
      const total = data.reduce( ( sum, { value } ) => sum + value , 0);
      return {        
        labels: data.map(dataEntry => isPercentage ? `${dataEntry.title} in %`: dataEntry.title),
        datasets: [
          {
            data: data.map(dataEntry => isPercentage ? Math.round(dataEntry.value * 100 / total)  : dataEntry.value),
            backgroundColor: data.map(dataEntry => dataEntry.color),
            hoverBackgroundColor: data.map(dataEntry => dataEntry.color)
          }
        ]
      }      
    }
  };

  const makeTooltipContent = (entry) => {
    return `${entry.title}`;
  };

  if(data.length === 0) {    
    return <div className="text-center" style={{ marginTop: "10px",  maxWidth: '265px' }}>  
              <h6>No Voting</h6>               
              <img src={isPercentage ? zeroPercentImage : zeroVotingImage} alt="" className="img-fluid" />              
          </div>
  };

  return (
    <div>
    { useSmallChart
      ? <div data-tip="" data-for="chart">
        <h6>{header}</h6>
        <PieChart
          data={data}                  
          label={({ dataEntry }) => isPercentage ? Math.round(dataEntry.percentage) + '%' : dataEntry.value}
          labelStyle={defaultLabelStyle}
          onMouseOver={(_, index) => {
            setHovered(index);
          }}
          onMouseOut={() => {
            setHovered(null);
          }}
        />
        {/* { data.filter(item => item.label === "None Voted" && item) 
        ?<h6>No Voting</h6>
        : null} */}
        <ReactTooltip
          id="chart"
          getContent={() =>
            typeof hovered === "number" ? makeTooltipContent(data[hovered]) : null
          }
        />
      </div> 
      : <div>
           <MDBContainer>
            <h6>{header}</h6>
            {/* <h3 className="mt-5">Pie chart</h3> */}
            <Pie data={data} options={{ responsive: true }} />
          </MDBContainer>
        </div>
        }
    </div>
  );
};

export default ToolTipPieChart;
