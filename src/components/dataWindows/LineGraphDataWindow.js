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
import { useTheme } from "@emotion/react";
import PropTypes from "prop-types";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function LineGraphDataWindow({ height, marginBottom }) {
  const theme = useTheme();

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "right",
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
      maxHeight={height}
      overflow={"auto"}
      border={1}
      borderColor={theme.palette.informationGrey.main}
      borderRadius={2}
      sx={{ marginBottom: `${marginBottom}px` }}
    >
      <Line height="55%" options={options} data={data} />
    </Box>
  );
}

LineGraphDataWindow.propTypes = {
  height: PropTypes.number,
  marginBottom: PropTypes.number,
};
