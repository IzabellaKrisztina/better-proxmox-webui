import React from "react";
import { Autocomplete, TextField, Chip } from "@mui/material";

interface Props {
  availableTags: string[];
  selectedTags: string[];
  onTagsChange: (tags: string[]) => void;
}

export default function TagFilter({
  availableTags,
  selectedTags,
  onTagsChange,
}: Props) {
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
