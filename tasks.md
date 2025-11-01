# ✅ API Execution Checklist

### 🔐 Auth Endpoints
- [x] **POST /api/auth/register** — register a new user  
- [x] **POST /api/auth/login** — authenticate user and receive tokens  
- [x] **POST /api/auth/refresh** — refresh the access token  
- [x] **GET /api/auth/me** — get logged-in user data  

---

### 📝 Tasks Endpoints
- [ ] **GET /api/tasks?page=&size=** — list tasks with pagination  
- [ ] **POST /api/tasks** — create task and publish `task.created`  
- [ ] **GET /api/tasks/:id** — get task details by ID  
- [ ] **PUT /api/tasks/:id** — update task and publish `task.updated`  
- [ ] **DELETE /api/tasks/:id** — delete task by ID  

---

### 💬 Comments Endpoints
- [ ] **POST /api/tasks/:id/comments** — create comment and publish `task.comment.created`  
- [ ] **GET /api/tasks/:id/comments?page=&size=** — list comments with pagination  

---

### 🔔 WebSocket Events
- [ ] **task:created** — triggered when a task is created  
- [ ] **task:updated** — triggered when a task is updated  
- [ ] **comment:new** — triggered when a new comment is added  



# Turbo commands

