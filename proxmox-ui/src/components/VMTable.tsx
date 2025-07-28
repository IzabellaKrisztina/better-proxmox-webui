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
  Checkbox,
} from "@mui/material";

type Order = "asc" | "desc";

interface Props {
  data: VM[];
  selectedVMIds: number[];
  onToggleSelect: (vmid: number) => void;
  onToggleSelectAll: (checked: boolean) => void;
}

export default function VMTable({
  data,
  selectedVMIds,
  onToggleSelect,
  onToggleSelectAll,
}: Props) {
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

  const allSelected =
    data.length > 0 && data.every((vm) => selectedVMIds.includes(vm.vmid));
  const isIndeterminate = selectedVMIds.length > 0 && !allSelected;

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox">
              <Checkbox
                checked={allSelected}
                indeterminate={isIndeterminate}
                onChange={(e) => onToggleSelectAll(e.target.checked)}
              />
            </TableCell>
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
              <TableCell padding="checkbox">
                <Checkbox
                  checked={selectedVMIds.includes(vm.vmid)}
                  onChange={() => onToggleSelect(vm.vmid)}
                />
              </TableCell>
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
