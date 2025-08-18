import { VM } from "@/types/vm";

export function getAllTagsFromVMs(vms: VM[]): string[] {
  const allTags = vms.flatMap(vm =>
    vm.tags?.split(",").map(tag => tag.trim()) || []
  );
  return Array.from(new Set(allTags));
}
