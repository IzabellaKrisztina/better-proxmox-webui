import React, { useState } from "react";
import { VM } from "../types/vm";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableSortLabel,
} from "@mui/material";

type Order = "asc" | "desc";

interface Props {
  data: VM[];
}

export default function VMTable({ data }: Props) {
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<keyof VM>("name");

  const columns: (keyof VM)[] = [
    "vmid",
    "name",
    "status",
    "tags",
    "maxcpu",
    "maxmem",
    "disk",
    "node",
  ];

  const handleSort = (property: keyof VM) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const sortedData = [...data].sort((a, b) => {
    const valA = a[orderBy];
    const valB = b[orderBy];
    if (valA < valB) return order === "asc" ? -1 : 1;
    if (valA > valB) return order === "asc" ? 1 : -1;
    return 0;
  });

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((key) => (
              <TableCell key={key}>
                <TableSortLabel
                  active={orderBy === key}
                  direction={orderBy === key ? order : "asc"}
                  onClick={() => handleSort(key)}
                >
                  {key.toUpperCase()}
                </TableSortLabel>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedData.map((vm) => (
            <TableRow key={vm.vmid}>
              <TableCell>{vm.vmid}</TableCell>
              <TableCell>{vm.name}</TableCell>
              <TableCell>{vm.status}</TableCell>
              <TableCell>{vm.tags}</TableCell>
              <TableCell>{vm.maxcpu}</TableCell>
              <TableCell>{(vm.maxmem / 1024 ** 3).toFixed(1)} GB</TableCell>
              <TableCell>{(vm.disk / 1024 ** 3).toFixed(1)} GB</TableCell>
              <TableCell>{vm.node}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
