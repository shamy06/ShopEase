import React from "react";
import {
  Box,
  Card,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";

const useSpecificationStyle = makeStyles({
  card: {
    border: "2px solid #ddd",
    marginTop: '32px',
    boxShadow: "2px 2px 4px 2px #999",
  },
  heading: {
    marginLeft: "24px !important",
    marginTop: "8px !important",
    padding: "20px 24px 10px 4px",
    fontWeight: '550 !important',
    fontSize: '20px !important'
  },
  box: {
    borderTop: "2px solid whitesmoke !important",
    padding: "10px 24px 15px 24px !important",
  },
  tableCellKey: {
    paddingLeft: '4px !important',
    border: '0 !important',
    paddingTop: '0 !important',
    width: "17% !important",
    fontSize: "15px !important",
  },
  tableCellValue: {
    align: "left",
    border: '0 !important',
    paddingTop: '0 !important',
    fontSize: "15px !important"
  }
})

const Specification = ({ specifications, brand }) => {
  const { modelNumber, color, os, memory } = specifications;
  const classes = useSpecificationStyle();

  return (
    <Card
      variant="outlined"
      className={classes.card}
    >
      <Typography className={classes.heading} data-Testid="specification">
        Specifications
      </Typography>
      <Box
        className={classes.box}
      >
        <TableContainer>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell
                  className={classes.tableCellKey}
                >
                  Model Number
                </TableCell>
                <TableCell className={classes.tableCellValue}>
                  {modelNumber}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell
                  className={classes.tableCellKey}
                >
                  Color
                </TableCell>
                <TableCell
                  className={classes.tableCellValue}
                >
                  {color}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell
                  className={classes.tableCellKey}
                >
                  OS
                </TableCell>
                <TableCell
                  className={classes.tableCellValue}
                >
                  {os}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell
                  className={classes.tableCellKey}
                >
                  Memory
                </TableCell>
                <TableCell
                  className={classes.tableCellValue}
                >
                  {memory}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell
                  className={classes.tableCellKey}
                >
                  Brand
                </TableCell>
                <TableCell
                  className={classes.tableCellValue}
                >
                  {brand}
                </TableCell>
              </TableRow>
            </TableHead>
          </Table>
        </TableContainer>
      </Box>
    </Card>
  );
};

export default Specification;