import { Grid, TextField, MenuItem } from "@mui/material";
import TagFilter from "./TagFilter";
import { VMTableFiltersProps } from "./VMTableFilters.types";


const statuses = ["", "running", "stopped", "paused"]; // Adjust as needed

export default function VMTableFilters({
  filters,
  onChange,
  availableTags,
}: VMTableFiltersProps) {
  return (
    <Grid container spacing={2} sx={{ marginBottom: 2 }}>
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <TextField
          label="Name"
          value={filters.name}
          onChange={(e) => onChange("name", e.target.value)}
          fullWidth
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <TagFilter
          availableTags={availableTags}
          selectedTags={filters.tags}
          onTagsChange={(tags) => onChange("tags", tags)}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <TextField
          select
          label="Status"
          value={filters.status}
          onChange={(e) => onChange("status", e.target.value)}
          fullWidth
        >
          {statuses.map((s) => (
            <MenuItem key={s} value={s}>
              {s || "Any"}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <TextField
          label="Node"
          value={filters.node}
          onChange={(e) => onChange("node", e.target.value)}
          fullWidth
        />
      </Grid>
    </Grid>
  );
}
