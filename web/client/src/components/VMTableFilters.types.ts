export interface VMTableFiltersProps {
  filters: {
    name: string;
    tags: string[];
    status: string;
    node: string;
  };
  onChange: (field: string, value: any) => void;
  availableTags: string[];
}