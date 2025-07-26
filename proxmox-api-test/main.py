import requests
import urllib3
from dotenv import load_dotenv
import os

# Disable SSL warnings
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

# Load environment variables from .env
load_dotenv()

API_TOKEN_ID = os.getenv("PVE_API_TOKEN_ID")
API_TOKEN_SECRET = os.getenv("PVE_API_TOKEN_SECRET")
HOST = os.getenv("PVE_HOST")

# Prepare headers
headers = {
    "Authorization": f"PVEAPIToken={API_TOKEN_ID}={API_TOKEN_SECRET}"
}

# Step 1: Get the list of nodes
nodes_url = f"https://{HOST}:8006/api2/json/nodes"
nodes_response = requests.get(nodes_url, headers=headers, verify=False)

if nodes_response.status_code == 200:
    nodes = nodes_response.json()['data']
    for node in nodes:
        node_name = node['node']
        print(f"\n📦 Node: {node_name}")

        # Step 2: List VMs on the node
        vms_url = f"https://{HOST}:8006/api2/json/nodes/{node_name}/qemu"
        vms_response = requests.get(vms_url, headers=headers, verify=False)

        if vms_response.status_code == 200:
            vms = vms_response.json()['data']
            if vms:
                for vm in vms:
                    print(f"  - VM ID: {vm['vmid']}, Name: {vm.get('name', 'N/A')}")
            else:
                print("  (No VMs found on this node)")
        else:
            print(f"  ❌ Failed to list VMs on node {node_name}: {vms_response.text}")
else:
    print(f"❌ Failed to connect to Proxmox API: {nodes_response.text}")
