import { VM } from "@/types/vm";

export interface VMTableProps {
  data: VM[];
  selectedVMIds: number[];
  onToggleSelect: (vmid: number) => void;
  onToggleSelectAll: (checked: boolean) => void;
}