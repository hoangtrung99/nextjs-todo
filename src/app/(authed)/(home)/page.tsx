import { Button } from '@/components/ui/button'
import { Suspense } from 'react'
import { signOut } from './actions/sign-out'
import { TodoList } from './components/todo-list'

export default async function TodosPage() {
  return (
    <div className="flex flex-col items-center h-screen">
      <Button className="mt-4" onClick={signOut}>
        Sign out
      </Button>

      <div className="container py-8 ">
        <h1 className="text-2xl font-bold mb-8 text-center">
          Danh sách việc cần làm
        </h1>
        <Suspense fallback={<div>Loading...</div>}>
          <TodoList />
        </Suspense>
      </div>
    </div>
  )
}
