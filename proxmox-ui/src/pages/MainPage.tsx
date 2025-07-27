import React, { useEffect, useState } from "react";
import { loadMockVMs } from "../utils/loadVMs";
import { VM } from "../types/vm";
import VMTable from "../components/VMTable";
import { CircularProgress, Container, Typography } from "@mui/material";

export default function MainPage() {
  const [vms, setVMs] = useState<VM[] | null>(null);

  useEffect(() => {
    loadMockVMs().then(setVMs);
  }, []);

  return (
    <Container sx={{ paddingTop: 4 }}>
      <Typography variant="h4" gutterBottom>
        Proxmox VM Dashboard
      </Typography>
      {!vms ? <CircularProgress /> : <VMTable data={vms} />}
    </Container>
  );
}
