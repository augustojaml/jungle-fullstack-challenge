import { createFileRoute, Link } from '@tanstack/react-router'

const Route = createFileRoute('/task/task-detail')({
  component: () => (
    <div>
      <h2 style={{ margin: 0 }}>detalhe da task</h2>
      <p>conteúdo simples da task…</p>
      <Link to="/task">voltar para lista</Link>
    </div>
  ),
})

export { Route }
