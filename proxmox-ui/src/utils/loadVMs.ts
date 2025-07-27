import { VM } from "../types/vm";

export async function loadMockVMs(): Promise<VM[]> {
  const response = await fetch("/mock_vms.json");
  const data = await response.json();
  return data as VM[];
}
