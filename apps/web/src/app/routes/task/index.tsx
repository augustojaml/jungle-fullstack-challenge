import { createFileRoute, Link } from '@tanstack/react-router'

const Route = createFileRoute('/task/')({
  component: () => (
    <div>
      <div>task 1</div>
      <div>task 2</div>
      <Link to="/task/task-detail">abrir detalhe</Link>
    </div>
  ),
})

export { Route }
