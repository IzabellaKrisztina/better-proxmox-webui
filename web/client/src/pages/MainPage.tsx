import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Container, Typography, Button } from "@mui/material";
import { loadMockVMs } from "@/utils/loadVMs";
import { getAllTagsFromVMs } from "@/utils/getAllTags";
import type { VM } from "@shared/types/vm";
import VMTable from "@/components/VMTable";
import VMTableFilters from "@/components/VMTableFilters";

export default function MainPage() {
  const [filters, setFilters] = useState({
    name: "",
    tags: [] as string[],
    status: "",
    node: "",
  });
  const [selectedVMIds, setSelectedVMIds] = useState<number[]>([]);

  const { data: allVMs } = useQuery<VM[]>({
    queryKey: ["vms"],
    queryFn: () => loadMockVMs(), // keep your mock for now; swap to RPC when you have a /vms route
    staleTime: 60_000,
  });

  const allTags = useMemo(() => getAllTagsFromVMs(allVMs ?? []), [allVMs]);

  const filteredVMs = useMemo(() => {
    const vms = allVMs ?? [];
    return vms.filter((vm) => {
      const vmTagList = vm.tags?.split(",").map((t) => t.trim()) || [];
      const matchesTags = filters.tags.every((tag) => vmTagList.includes(tag));
      return (
        vm.name.toLowerCase().includes(filters.name.toLowerCase()) &&
        matchesTags &&
        (filters.status === "" || vm.status === filters.status) &&
        vm.node.toLowerCase().includes(filters.node.toLowerCase())
      );
    });
  }, [allVMs, filters]);

  // ---- Handlers ----
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

  return (
    <Container sx={{ paddingTop: 4 }}>
      <Typography variant="h4" sx={{ flex: 1 }}>
        Proxmox VM Dashboard
      </Typography>
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
    </Container>
  );
}
