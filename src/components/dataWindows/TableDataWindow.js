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
    <div style={{ display: "flex", flexDirection: "column", flex: "1 1 auto" }}>
      <TableContainer component={Paper} style={{ flex: "1 1 auto" }}>
        <Table sx={{ minWidth: 180 }} size="small">
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
}

TableDataWindow.propTypes = {
  headers: PropTypes.array,
  data: PropTypes.array,
};
