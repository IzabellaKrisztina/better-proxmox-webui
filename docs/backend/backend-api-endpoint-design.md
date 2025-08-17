Backend was designed using these REST design principles:

* **No trailing slash** ✅
* **Hierarchical relationships** ✅
* **Use hyphens, not underscores** ✅
* **No verbs/actions in the URL** (actions expressed via HTTP method) ✅
* **Use plurals** ✅
* **Avoid unnecessary nesting/complexity** ✅

Pagination parameters (uniform across **list** endpoints):
- `limit`: max number of items per page (default 50, max 200).
- `pageToken`: opaque string returned by previous request for cursor-based pagination.

## **1. VM Resources**

| Method   | Endpoint                        | Purpose                                                                         |
| -------- | ------------------------------- | ------------------------------------------------------------------------------- |
| `GET`    | `/api/v1/vms`                   | **List** all VMs (filters via query params: `?node=node-1&status=running&tag=dev`). |
| `POST`   | `/api/v1/vms`                   | Create multiple VMs (bulk create supported by sending array). Returns `job-id`. |
| `GET`    | `/api/v1/vms/{vm-id}`           | Get VM details.                                                                 |
| `GET`    | `/api/v1/vms/{vm-id}/resources` | Get VM resource details (cpu, ram, disk).                                       |
| `PATCH`  | `/api/v1/vms/{vm-id}`           | Update VM config. Returns `job-id`.                                             |
| `DELETE` | `/api/v1/vms/{vm-id}`           | Delete VM. Always returns a `job-id`.                                           |
| `DELETE` | `/api/v1/vms`                   | Delete multiple VMs by passing `{ vmIds: [...] }` in body. Returns `job-id`.    |


## **2. Templates**

| Method   | Endpoint                          | Purpose                                                                                  |
| -------- | --------------------------------- | ---------------------------------------------------------------------------------------- |
| `GET`    | `/api/v1/templates`               | **List** templates.                                                                          |
| `POST`   | `/api/v1/templates`               | Create a new template. Returns `job-id`.                                                 |
| `GET`    | `/api/v1/templates/{template-id}` | Get template details.                                                                    |
| `PATCH`  | `/api/v1/templates/{template-id}` | Update template. Returns `job-id`.                                                       |
| `DELETE` | `/api/v1/templates/{template-id}` | Delete template. Returns `job-id`.                                                       |
| `DELETE` | `/api/v1/templates`               | Delete multiple templates by passing `{ templateIds: [...] }` in body. Returns `job-id`. |


## **3. Jobs**

| Method   | Endpoint                                | Purpose                                                                        |
| -------- | --------------------------------------- | ------------------------------------------------------------------------------ |
| `GET`    | `/api/v1/jobs`                          | **List** jobs.                                                                     |
| `POST`   | `/api/v1/jobs`                          | Create a new bulk operation job (create/update/delete). Returns `job-id`.      |
| `GET`    | `/api/v1/jobs/{job-id}`                 | Get details, progress, and logs for a job.                                     |
| `DELETE` | `/api/v1/jobs/{job-id}`                 | Cancel a job. Returns `job-id`.                                                |
| `DELETE` | `/api/v1/jobs`                          | Cancel multiple jobs by passing `{ jobIds: [...] }` in body. Returns `job-id`. |
| `GET`    | `/api/v1/jobs/{job-id}/tasks`           | **List** tasks, progress (with pagination, filtering).                             |
| `GET`    | `/api/v1/jobs/{job-id}/tasks/{task-id}` | Get details, drill into logs / errors for one task.                            |


## **4. Cluster Resources**

| Method | Endpoint                            | Purpose                                        |
| ------ | ----------------------------------- | ---------------------------------------------- |
| `GET`  | `/api/v1/nodes`                     | **List** cluster nodes.                            |
| `GET`  | `/api/v1/nodes/{node-id}`           | Node details.                                  |
| `GET`  | `/api/v1/nodes/{node-id}/resources` | Node resources usage (cpu, ram, disk).         |
| `GET`  | `/api/v1/resources`                 | Cluster wide resources usage (cpu, ram, disk). |
| `GET`  | `/api/v1/cluster`                   | Cluster details.                               |

