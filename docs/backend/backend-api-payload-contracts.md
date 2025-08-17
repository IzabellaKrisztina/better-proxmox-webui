Got it 👍 — let’s extend your current **endpoint design** into a **full payload contract specification** (request + response schemas) so you can hand this over to backend devs or generate OpenAPI/Swagger from it. I’ll structure it resource by resource, using **JSON schema–like notation** (concise, but precise).

---

# 📜 **API Payload Specification**

---

## **1. VM Resources**

### **List VMs**

**Request (query params):**

```
GET /api/v1/vms?node=node-1&status=running&tag=dev&limit=50&pageToken=abc
```

**Response:**

```json
{
  "items": [
    {
      "id": "vm-123",
      "name": "dev-vm",
      "node": "node-1",
      "status": "running",
      "uptime": "2d 3h",
      "tags": ["dev", "db"],
      "resources": {
        "cpu": 4,
        "ramMb": 8192,
        "diskGb": 100
      },
      "createdAt": "2025-08-17T12:00:00Z",
      "updatedAt": "2025-08-17T12:05:00Z"
    }
  ],
  "nextPageToken": "opaque-token"
}
```

---

### **Create VMs (bulk)**

**Request:**

```json
[
  {
    "name": "dev-vm-1",
    "nodeId": "node-1",
    "resources": {
      "cpu": 4,
      "ramMb": 4096,
      "diskGb": 50
    },
    "tags": ["dev"]
  },
  {
    "name": "dev-vm-2",
    "nodeId": "node-1",
    "resources": {
      "cpu": 2,
      "ramMb": 2048,
      "diskGb": 20
    }
  }
]
```

**Response:**

```json
{
  "jobId": "job-567"
}
```

---

### **Get VM**

**Response:**

```json
{
  "id": "vm-123",
  "name": "dev-vm",
  "nodeId": "node-1",
  "status": "running",
  "tags": ["dev"],
  "resources": {
    "cpu": 4,
    "ramMb": 8192,
    "diskGb": 100
  },
  "createdAt": "2025-08-17T12:00:00Z",
  "updatedAt": "2025-08-17T12:05:00Z"
}
```

---

### **Update VM (PATCH)**

**Request:**

```json
{
  "resources": {
    "cpu": 6,
    "ramMb": 16384
  },
  "tags": ["prod", "db"]
}
```

**Response:**

```json
{
  "jobId": "job-890"
}
```

---

### **Delete VMs (bulk)**

**Request:**

```json
{
  "vmIds": ["vm-123", "vm-124"]
}
```

**Response:**

```json
{
  "jobId": "job-891"
}
```

---

## **2. Templates**

### **List Templates**

**Response:**

```json
{
  "items": [
    {
      "id": "tpl-101",
      "name": "ubuntu-22.04",
      "os": "linux",
      "nodeId": "node-1",
      "sizeMb": 10240,
      "createdAt": "2025-08-01T10:00:00Z"
    }
  ],
  "nextPageToken": null
}
```

---

### **Create Template**

**Request:**

```json
{
  "name": "ubuntu-22.04",
  "os": "linux",
  "nodeId": "node-1",
  "sourceUrl": "http://mirror/ubuntu.img"
}
```

**Response:**

```json
{
  "jobId": "job-777"
}
```

---

### **Update Template**

**Request:**

```json
{
  "name": "ubuntu-22.04-lts"
}
```

**Response:**

```json
{
  "jobId": "job-778"
}
```

---

### **Delete Templates (bulk)**

**Request:**

```json
{
  "templateIds": ["tpl-101", "tpl-102"]
}
```

**Response:**

```json
{
  "jobId": "job-779"
}
```

---

## **3. Jobs**

### **List Jobs**

**Response:**

```json
{
  "items": [
    {
      "id": "job-123",
      "type": "vm-create",
      "state": "running",
      "progress": 45,
      "createdBy": "admin@pam",
      "createdAt": "2025-08-17T12:00:00Z",
      "updatedAt": "2025-08-17T12:01:00Z"
    }
  ],
  "nextPageToken": "opaque-token"
}
```

---

### **Job Details**

**Response:**

```json
{
  "id": "job-123",
  "type": "vm-delete",
  "state": "partial",
  "progress": 66,
  "createdBy": "admin@pam",
  "createdAt": "2025-08-17T12:00:00Z",
  "updatedAt": "2025-08-17T12:05:00Z",
  "tasks": [
    {
      "id": "task-1",
      "resourceId": "vm-101",
      "state": "succeeded",
      "startedAt": "2025-08-17T12:00:01Z",
      "finishedAt": "2025-08-17T12:00:10Z"
    },
    {
      "id": "task-2",
      "resourceId": "vm-102",
      "state": "failed",
      "error": "VM is locked",
      "startedAt": "2025-08-17T12:00:02Z",
      "finishedAt": "2025-08-17T12:00:08Z"
    }
  ]
}
```

---

### **Task Details**

**Response:**

```json
{
  "id": "task-2",
  "resourceId": "vm-102",
  "state": "failed",
  "error": "VM is locked",
  "log": [
    "2025-08-17T12:00:02Z: Starting delete",
    "2025-08-17T12:00:05Z: Error: VM is locked"
  ],
  "startedAt": "2025-08-17T12:00:02Z",
  "finishedAt": "2025-08-17T12:00:08Z"
}
```

---

## **4. Cluster Resources**

### **List Nodes**

**Response:**

```json
{
  "items": [
    {
      "id": "node-1",
      "hostname": "node1.cluster.local",
      "status": "online",
      "resources": {
        "cpuTotal": 32,
        "cpuUsed": 18,
        "ramMbTotal": 131072,
        "ramMbUsed": 98304,
        "diskGbTotal": 2000,
        "diskGbUsed": 800
      }
    }
  ],
  "nextPageToken": null
}
```

---

### **Node Resources**

**Response:**

```json
{
  "cpuTotal": 32,
  "cpuUsed": 18,
  "ramMbTotal": 131072,
  "ramMbUsed": 98304,
  "diskGbTotal": 2000,
  "diskGbUsed": 800
}
```

---

### **Cluster Wide Resources**

**Response:**

```json
{
  "cpuTotal": 128,
  "cpuUsed": 75,
  "ramMbTotal": 524288,
  "ramMbUsed": 342123,
  "diskGbTotal": 8000,
  "diskGbUsed": 4300
}
```

---

### **Cluster Details**

**Response:**

```json
{
  "id": "cluster-1",
  "name": "prod-cluster",
  "version": "1.0.0",
  "status": "healthy",
  "nodes": 4,
  "createdAt": "2025-01-01T00:00:00Z"
}
```

---

✅ This now gives you **request/response contracts** for every endpoint.

Would you like me to **convert this into a formal OpenAPI 3.1 YAML** (so it can generate Swagger UI + client SDKs), or keep it as this lighter JSON contract spec?
