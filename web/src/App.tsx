import type { Task } from './@types/taks'

const fakeTasks: Task[] = [
  { id: '1', name: 'Build a React App', status: 'Pending' },
  { id: '2', name: 'Write Unit Tests', status: 'In Progress' },
  { id: '3', name: 'Deploy to Production', status: 'Completed' },
]

const App = () => {
  return (
    <div className="h-screen w-screen bg-gray-800 p-8 text-gray-100">
      <div className="mx-auto flex w-full max-w-2xl flex-col gap-8">
        <h1 className="text-2xl font-bold">My Tasks</h1>

        <form>
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Task Name"
              className="flex-1 rounded border border-gray-300 bg-gray-50 p-2 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            />
            <button
              type="submit"
              className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
            >
              Add Task
            </button>
          </div>
        </form>

        <div className="relative overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
            <thead className="bg-gray-50 text-xs text-gray-700 uppercase dark:bg-gray-700 dark:text-gray-400">
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
                <tr
                  key={task.id}
                  className="border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 text-start font-medium whitespace-nowrap text-gray-900 dark:text-white"
                  >
                    {task.name}
                  </th>
                  <td className="px-6 py-4">Pending</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <button className="text-blue-600 hover:underline">
                        Edit
                      </button>
                      <button className="text-red-600 hover:underline">
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
