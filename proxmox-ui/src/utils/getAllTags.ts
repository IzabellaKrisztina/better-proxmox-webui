export function getAllTagsFromVMs(vms: { tags?: string }[]): string[] {
  const allTags = vms.flatMap(vm =>
    vm.tags?.split(",").map(tag => tag.trim()) || []
  );
  return Array.from(new Set(allTags));
}
