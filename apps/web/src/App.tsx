import type { Task } from './shared/@types/taks'

const fakeTasks: Task[] = [
  { id: '1', name: 'Build a React App', status: 'Pending' },
  { id: '2', name: 'Write Unit Tests', status: 'In Progress' },
  { id: '3', name: 'Deploy to Production', status: 'Completed' },
]

const App = () => {
  return (
    <div className="h-screen w-screen">
      <div className="mx-auto flex w-full max-w-2xl flex-col gap-8">
        <h1 className="text-2xl font-bold">My Tasks</h1>

        <form>
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Task Name"
              className="border-primary/40 bg-accent text-muted flex-1 rounded border p-2"
            />
            <button
              type="submit"
              className="bg-primary rounded px-4 py-2 text-white"
            >
              Add Task
            </button>
          </div>
        </form>

        <div className="relative overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-muted-foreground text-accent text-xs">
              <tr>
                <th scope="col" className="w-full px-6 py-3 text-start">
                  Task Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {fakeTasks.map((task) => (
                <tr key={task.id} className="border-muted border-b">
                  <th
                    scope="row"
                    className="text-muted-foreground px-6 py-4 text-start font-medium whitespace-nowrap"
                  >
                    {task.name}
                  </th>
                  <td className="px-6 py-4">Pending</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <button className="text-primary hover:underline">
                        Edit
                      </button>
                      <button className="text-destructive hover:underline">
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export { App }
