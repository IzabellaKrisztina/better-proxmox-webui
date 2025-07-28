import React, { useEffect, useState } from "react";
import { loadMockVMs } from "../utils/loadVMs";
import { VM } from "../types/vm";
import VMTable from "../components/VMTable";
import VMTableFilters from "../components/VMTableFilters";
import { getAllTagsFromVMs } from "../utils/getAllTags";
import { CircularProgress, Container, Typography, Button } from "@mui/material";

export default function MainPage() {
  const [allVMs, setAllVMs] = useState<VM[] | null>(null);
  const [filters, setFilters] = useState({
    name: "",
    tags: [] as string[],
    status: "",
    node: "",
  });
  const [selectedVMIds, setSelectedVMIds] = useState<number[]>([]);

  const allTags = getAllTagsFromVMs(allVMs ?? []);

  useEffect(() => {
    loadMockVMs().then(setAllVMs);
  }, []);

  const handleFilterChange = (field: string, value: string) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const handleToggleSelect = (vmid: number) => {
    setSelectedVMIds((prev) =>
      prev.includes(vmid) ? prev.filter((id) => id !== vmid) : [...prev, vmid]
    );
  };

  const handleToggleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedVMIds(filteredVMs.map((vm) => vm.vmid));
    } else {
      setSelectedVMIds([]);
    }
  };

  const handleStopVMs = () => {
    const selectedVMs = filteredVMs.filter((vm) =>
      selectedVMIds.includes(vm.vmid)
    );
    console.log(
      "Stopping VMs:",
      selectedVMs.map((vm) => vm.name)
    );
  };

  const filteredVMs =
    allVMs?.filter((vm) => {
      const vmTagList = vm.tags?.split(",").map((t) => t.trim()) || [];

      const matchesTags = filters.tags.every((tag) => vmTagList.includes(tag));

      return (
        vm.name.toLowerCase().includes(filters.name.toLowerCase()) &&
        matchesTags &&
        (filters.status === "" || vm.status === filters.status) &&
        vm.node.toLowerCase().includes(filters.node.toLowerCase())
      );
    }) || [];

  return (
    <Container sx={{ paddingTop: 4 }}>
      <Typography variant="h4" gutterBottom>
        Proxmox VM Dashboard
      </Typography>

      {!allVMs ? (
        <CircularProgress />
      ) : (
        <>
          <VMTableFilters
            filters={filters}
            onChange={handleFilterChange}
            availableTags={allTags}
          />
          <Button
            variant="contained"
            color="error"
            onClick={handleStopVMs}
            disabled={selectedVMIds.length === 0}
            sx={{ mb: 2 }}
          >
            Stop VMs
          </Button>

          <VMTable
            data={filteredVMs}
            selectedVMIds={selectedVMIds}
            onToggleSelect={handleToggleSelect}
            onToggleSelectAll={handleToggleSelectAll}
          />
        </>
      )}
    </Container>
  );
}
