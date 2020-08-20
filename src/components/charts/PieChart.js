import React, { useState } from 'react';
import { Pie } from "react-chartjs-2";
import { MDBContainer } from "mdbreact";

const PieChart = ({ data }) => {
    const dataPie = {        
            // labels: ["Red", "Green", "Yellow", "Grey", "Dark Grey"],
            datasets: [
              {
                data,
                backgroundColor: [
                  "#F7464A",
                  "#46BFBD",
                  "#FDB45C",
                  "#949FB1",
                  "#4D5360",
                  "#AC64AD"
                ],
                hoverBackgroundColor: [
                  "#FF5A5E",
                  "#5AD3D1",
                  "#FFC870",
                  "#A8B3C5",
                  "#616774",
                  "#DA92DB"
                ]
              }
            ]
    }

    return (
        <div className="pie-chart">
           <MDBContainer>
                <h3 className="mt-5">Pie chart</h3>
                <Pie data={dataPie} options={{ responsive: true }} />
            </MDBContainer> 
        </div>
    );
};

export default PieChart;