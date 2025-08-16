## **1. POST /vms** → Create VM(s)

### **Request**

```json
{
  "vms": [
    {
      "name": "dev-001",
      "nodeId": "node-a",
      "templateId": "tpl-ubuntu-20",
      "cpu": 4,
      "memoryMB": 8192,
      "diskGB": 50,
      "network": [
        { "bridge": "vmbr0", "type": "virtio" }
      ]
    },
    {
      "name": "dev-002",
      "nodeId": "node-b",
      "templateId": "tpl-ubuntu-20",
      "cpu": 2,
      "memoryMB": 4096,
      "diskGB": 30
    }
  ]
}
```

* **Single create** = just pass an array with 1 item.
* **Bulk create** = pass multiple.

### **Response (201)**

```json
{
  "jobId": "job-1234",
  "submitted": 2,
  "status": "queued"
}
```

---

## **2. DELETE /vms** → Delete VM(s)

### **Request**

```json
{
  "vmIds": ["vm-101", "vm-102", "vm-103"]
}
```

* Accepts single or multiple IDs.
* Destructive, so require confirmation flag if desired:

```json
{
  "vmIds": ["vm-101"],
  "confirm": true
}
```

### **Response**

```json
{
  "jobId": "job-5678",
  "deleted": 3,
  "status": "queued"
}
```

---

## **3. PATCH /vms/{vm-id}** → Update One VM

✅ This stays one-at-a-time because updates are usually per-VM config changes.

---

## **4. PATCH /vms** → Bulk Update Multiple VMs

### **Request**

```json
{
  "updates": [
    {
      "vmId": "vm-101",
      "cpu": 8
    },
    {
      "vmId": "vm-102",
      "memoryMB": 16384
    }
  ]
}
```

* Lets you update multiple VMs in one call.

---

## **5. POST /jobs** → Generic Bulk Job Creation

Even though bulk create/delete go through `/vms`, this generic endpoint is helpful for things like **power operations**:

```json
{
  "type": "shutdown",
  "targets": ["vm-101", "vm-102"]
}
```

---

## **Design Benefits**

* **No special bulk endpoints** → simplicity.
* **Same URL for single or bulk** → intuitive for devs.
* **Jobs are always returned** for async operations.
* **Hierarchical relationships** still possible (e.g., `/nodes/{node-id}/vms`).

---

If we adopt this, the **frontend** could hit `/vms` for **everything** related to creation/deletion/update in bulk, while `/jobs` becomes a universal “progress tracker” endpoint.

---

If you want, I can now draw you the **full backend request/response flow diagram** showing how `/vms` calls turn into Proxmox API operations via the job queue — so you can see the real execution pipeline. That would make the architecture obvious to your devs.

Do you want me to draw that?
