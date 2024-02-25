import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import {
  lineGraphLabels,
  lineGraphData1,
  lineGraphTestDataName1,
  lineGraphTitle,
} from "../../data/mockData";
import { Box } from "@mui/material";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function LineGraphDataWindow({ height }) {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: lineGraphTitle,
      },
    },
  };

  const labels = lineGraphLabels;
  const data = {
    labels,
    datasets: [
      {
        label: lineGraphTestDataName1,
        data: lineGraphData1,
        borderColor: "#A2AD8D",
        backgroundColor: "#A2AD8D",
        borderWidth: 2,
      },
    ],
  };

  return (
    <Box
      alignContent={"center"}
      padding={0}
      maxHeight={height}
      overflow={"auto"}
      border={1}
    >
      <Line height="50%" options={options} data={data} />
    </Box>
  );
}
