// src/components/RadarChart.js
import React from 'react';
import { Radar } from 'react-chartjs-2';
import { Box } from '@mui/material';
import { Chart, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js';

// Register Chart.js components (ensure this runs only once, typically at app root or here)
Chart.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const RadarChartComponent = ({ skills = [], scores = {} }) => {

  // Ensure data aligns with the skills array order
  const chartDataPoints = skills.map(skill => scores[skill] || 0);

  const data = {
    labels: skills, // Use the dynamically passed skills
    datasets: [
      {
        label: 'Skill Points', // Updated label
        data: chartDataPoints, // Use the ordered data points
        backgroundColor: 'rgba(25, 118, 210, 0.3)', // Primary color with transparency
        borderColor: 'rgba(25, 118, 210, 1)', // Solid primary color
        borderWidth: 2,
        pointBackgroundColor: 'rgba(25, 118, 210, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(25, 118, 210, 1)'
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Allow chart to fill container height/width
    scales: {
      r: {
        angleLines: { color: 'rgba(0, 0, 0, 0.1)' }, // Lighter grid lines
        grid: { color: 'rgba(0, 0, 0, 0.1)' }, // Lighter grid lines
        ticks: { 
            display: true, 
            stepSize: 2, // Adjust step size based on expected score range
            backdropColor: 'rgba(255, 255, 255, 0.75)', // Background for ticks
             color: '#666', // Tick label color
        },
        pointLabels: { 
            font: { size: 12, weight: '500' }, // Slightly smaller font
             color: '#333' 
        },
        suggestedMin: 0,
        suggestedMax: 10, // Adjust based on your max expected score
      },
    },
    plugins: {
      legend: { 
          display: true, // Keep legend
          position: 'bottom', // Move legend below chart
           labels: {
               color: '#333' // Legend text color
            }
      },
       tooltip: {
        enabled: true,
         backgroundColor: 'rgba(0,0,0,0.7)',
         titleFont: { size: 14 },
         bodyFont: { size: 12 },
      }
    },
     // Ensure chart animates smoothly
     animation: { duration: 500 },
  };

  return (
    // Adjust Box sizing to fit within its parent Paper component in App.js
    <Box sx={{ position: 'relative', width: '100%', height: 'calc(100% - 40px)' }}> {/* Adjust height calculation */}
      <Radar data={data} options={options} />
    </Box>
  );
};

export default RadarChartComponent;