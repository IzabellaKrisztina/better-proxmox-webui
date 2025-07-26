import json

MOCK_FILE = "mock-data/mock_vms.json"

with open(MOCK_FILE, "r") as file:
    vms = json.load(file)

print(f"Loaded {len(vms)} mock VMs:")
for vm in vms:
    print(f"  - {vm['vmid']} | {vm['name']} | Status: {vm['status']} | Tags: {vm['tags']}")
