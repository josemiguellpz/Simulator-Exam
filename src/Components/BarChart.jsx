/* eslint-disable no-unused-vars */
import React from  'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS } from "chart.js/auto";

export default function BarChart({ data }){
  return(
    <Bar data={data} />
  );
}