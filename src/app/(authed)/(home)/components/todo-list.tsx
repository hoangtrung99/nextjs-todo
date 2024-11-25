import { getTodos } from '../actions/todo'
import { CreateTodoForm } from './create-todo-form'
import { TodoItem } from './todo-item'

export async function TodoList() {
  const todos = await getTodos()

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-4">
      <CreateTodoForm />

      <div className="space-y-2">
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            id={todo.id}
            title={todo.title}
            completed={todo.completed}
          />
        ))}
      </div>
    </div>
  )
}
