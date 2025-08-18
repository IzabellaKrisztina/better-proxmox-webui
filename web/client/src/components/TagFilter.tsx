import { Autocomplete, TextField, Chip } from "@mui/material";
import { TagFilterProps } from "./TagFilter.types";

export default function TagFilter({
  availableTags,
  selectedTags,
  onTagsChange,
}: TagFilterProps) {
  return (
    <Autocomplete
      multiple
      options={availableTags}
      value={selectedTags}
      onChange={(_, newValue) => onTagsChange(newValue)}
      renderInput={(params) => <TextField {...params} label="Tags" />}
      renderTags={(value: string[], getTagProps) =>
        value.map((option, index) => (
          <Chip label={option} {...getTagProps({ index })} />
        ))
      }
      filterSelectedOptions
      fullWidth
    />
  );
}
