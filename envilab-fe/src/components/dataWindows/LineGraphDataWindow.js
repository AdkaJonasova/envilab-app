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
import { useSelector } from "react-redux";
import { selectGraphInfo } from "../../redux/slices/LayoutSlice";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineGraphDataWindow = () => {
  const layoutInfo = useSelector(selectGraphInfo);

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
      height={layoutInfo.height}
      overflow={"auto"}
      border={1}
      borderColor={theme.palette.informationGrey.main}
      borderRadius={2}
      sx={{ marginBottom: `${layoutInfo.bottomMargin}px` }}
    >
      <Line height="55%" options={options} data={data} />
    </Box>
  );
};

export default LineGraphDataWindow;
