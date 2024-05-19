import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { selectTableInfo } from "../../redux/slices/LayoutSlice";

const TableDataWindow = ({ headers, data }) => {
  const layoutInfo = useSelector(selectTableInfo);

  return (
    <div>
      <TableContainer
        component={Paper}
        style={{
          height: `${layoutInfo.height}px`,
          overflow: "auto",
          marginBottom: `${layoutInfo.bottomMargin}px`,
        }}
      >
        <Table size="small" stickyHeader>
          <TableHead>
            <TableRow className="dialog-table-head">
              <TableCell align="left">{headers[0]}</TableCell>
              <TableCell align="left">{headers[1]}</TableCell>
              <TableCell align="left">{headers[2]}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="left">{row.name}</TableCell>
                <TableCell align="right">
                  {row.population.toLocaleString()}
                </TableCell>
                <TableCell align="right">
                  {row.area.toLocaleString()} km2
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default TableDataWindow;

TableDataWindow.propTypes = {
  headers: PropTypes.array,
  data: PropTypes.array,
};
