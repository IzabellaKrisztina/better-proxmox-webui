import React, { useEffect, useState } from "react";
import { loadMockVMs } from "../utils/loadVMs";
import { VM } from "../types/vm";
import VMTable from "../components/VMTable";
import VMTableFilters from "../components/VMTableFilters";
import { getAllTagsFromVMs } from "../utils/getAllTags";
import { CircularProgress, Container, Typography } from "@mui/material";

export default function MainPage() {
  const [allVMs, setAllVMs] = useState<VM[] | null>(null);
  const [filters, setFilters] = useState({
    name: "",
    tags: [] as string[],
    status: "",
    node: "",
  });

  useEffect(() => {
    loadMockVMs().then(setAllVMs);
  }, []);

  const allTags = getAllTagsFromVMs(allVMs ?? []);

  const handleFilterChange = (field: string, value: string) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
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
          <VMTable data={filteredVMs} />
        </>
      )}
    </Container>
  );
}
