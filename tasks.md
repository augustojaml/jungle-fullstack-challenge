# USERS CASES

- [x] POST   /api/auth/register
- [x] POST   /api/auth/login
- [x] POST   /api/auth/refresh

- [x] GET    /api/tasks?page=&size=               # lista de tarefas com paginação
- [x] POST   /api/tasks                           # cria e publica `task.created`
- [x] GET    /api/tasks/:id
- [x] PUT    /api/tasks/:id                       # atualiza e publica `task.updated`
- [x] DELETE /api/tasks/:id

- [x] POST   /api/tasks/:id/comments              # publica `task.comment.created`
- [x] GET    /api/tasks/:id/comments?page=&size   # lista de comentários com paginação

# CONTROLLERS WITH DATABASE/TYPEORM/MIGRATIONS

- [x] POST   /api/auth/register
- [x] POST   /api/auth/login
- [x] POST   /api/auth/refresh

- [x] POST   /api/tasks                           # cria e publica `task.created`
- [x] GET    /api/tasks?page=&size=               # lista de tarefas com paginação
- [x] GET    /api/tasks/:id
- [x] PUT    /api/tasks/:id                       # atualiza e publica `task.updated`
- [x] DELETE /api/tasks/:id

- [x] POST   /api/tasks/:id/comments              # publica `task.comment.created`
- [x] GET    /api/tasks/:id/comments?page=&size   # lista de comentários com paginação

# CONTROLLERS WITH SWAGGER

- [x] POST   /api/auth/register
- [x] POST   /api/auth/login
- [x] POST   /api/auth/refresh

- [x] GET    /api/tasks?page=&size=               # lista de tarefas com paginação
- [x] POST   /api/tasks                           # cria e publica `task.created`
- [x] GET    /api/tasks/:id
- [x] PUT    /api/tasks/:id                       # atualiza e publica `task.updated`
- [x] DELETE /api/tasks/:id

- [x] POST   /api/tasks/:id/comments              # publica `task.comment.created`
- [x] GET    /api/tasks/:id/comments?page=&size   # lista de comentários com paginação

# INTERFACES UI

= [x] auth/login
= [x] auth/register
= [x] auth/refresh
= [x] tasks/list
= [x] tasks/details


# PENDENCIES

 - [x] web: Delete Tasks
 - [x] api: Tasks assigns | Check not include relations
 - [x] web: Validate refresh token
 - [x] web: Task Details | get and add comments
 - [x] web: Scroll task details
 - [x] api: Adjust endpoint task to get for creator or assignee
 - [x] web: Adjust background input, textarea and select

 - [x] api-gateway: adjust routes and test swagger

# IF THERE IS TIME

- [x] web: Paginate Tasks
- [x] web: Paginate Comments

# OTHERS

- [ ] Filter task for name
- 





