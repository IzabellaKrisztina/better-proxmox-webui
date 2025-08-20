export interface VM {
  vmid: number;
  name: string;
  status: string;
  tags: string;
  maxcpu: number;
  maxmem: number;
  disk: number;
  node: string;
}
