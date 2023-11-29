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

export default function TableDataWindow({ headers, data }) {
  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 180 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow className="dialog-table-head">
              <TableCell align="center">{headers[0]}</TableCell>
              <TableCell align="center">{headers[1]}</TableCell>
              <TableCell align="center">{headers[2]}</TableCell>
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
}

TableDataWindow.propTypes = {
  headers: PropTypes.array,
  data: PropTypes.array,
};
