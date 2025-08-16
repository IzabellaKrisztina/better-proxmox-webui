Backend was designed using these REST design principles:

* **No trailing slash** ✅
* **Hierarchical relationships** ✅
* **Use hyphens, not underscores** ✅
* **No verbs/actions in the URL** (actions expressed via HTTP method) ✅
* **Use plurals** ✅
* **Avoid unnecessary nesting/complexity** ✅



## **1. VM Resources**

| Method   | Endpoint                 | Purpose                                                                         |
| -------- | ------------------------ | ------------------------------------------------------------------------------- |
| `GET`    | `/vms`                   | List all VMs (filters via query params: `?node=node-1&status=running&tag=dev`). |
| `POST`   | `/vms`                   | Create multiple VMs (bulk create supported by sending array). Returns `job-id`. |
| `GET`    | `/vms/{vm-id}`           | Get VM details.                                                                 |
| `GET`    | `/vms/{vm-id}/resources` | Get VM resource details (cpu, ram, disk).                                       |
| `PATCH`  | `/vms/{vm-id}`           | Update VM config. Returns `job-id`.                                             |
| `DELETE` | `/vms/{vm-id}`           | Delete VM. Always returns a `job-id`.                                           |
| `DELETE` | `/vms`                   | Delete multiple VMs by passing `{ vmIds: [...] }` in body. Returns `job-id`.    |

---

## **2. Templates**

| Method   | Endpoint                   | Purpose                                                                                  |
| -------- | -------------------------- | ---------------------------------------------------------------------------------------- |
| `GET`    | `/templates`               | List templates.                                                                          |
| `POST`   | `/templates`               | Create a new template. Returns `job-id`.                                                 |
| `GET`    | `/templates/{template-id}` | Get template details.                                                                    |
| `PATCH`  | `/templates/{template-id}` | Update template. Returns `job-id`.                                                       |
| `DELETE` | `/templates/{template-id}` | Delete template. Returns `job-id`.                                                       |
| `DELETE` | `/templates`               | Delete multiple templates by passing `{ templateIds: [...] }` in body. Returns `job-id`. |

---

## **3. Jobs**

| Method   | Endpoint                         | Purpose                                                                        |
| -------- | -------------------------------- | ------------------------------------------------------------------------------ |
| `GET`    | `/jobs`                          | List jobs.                                                                     |
| `POST`   | `/jobs`                          | Create a new bulk operation job (create/update/delete). Returns `job-id`.      |
| `GET`    | `/jobs/{job-id}`                 | Get details, progress, and logs for a job.                                     |
| `DELETE` | `/jobs/{job-id}`                 | Cancel a job. Returns `job-id`.                                                |
| `DELETE` | `/jobs`                          | Cancel multiple jobs by passing `{ jobIds: [...] }` in body. Returns `job-id`. |
| `GET`    | `/jobs/{job-id}/tasks`           | List tasks, progress (with pagination, filtering).                             |
| `GET`    | `/jobs/{job-id}/tasks/{task-id}` | Get details, drill into logs / errors for one task.                            |

---

## **4. Cluster Resources**

| Method | Endpoint                     | Purpose                                |
| ------ | ---------------------------- | -------------------------------------- |
| `GET`  | `/nodes`                     | List cluster nodes.                    |
| `GET`  | `/nodes/{node-id}`           | Node details.                          |
| `GET`  | `/nodes/{node-id}/resources` | Node resources usage (cpu, ram, disk). |

