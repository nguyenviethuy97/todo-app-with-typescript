import React, { useState } from 'react';
import './App.css';
import InputField from './component/InputField';
import { Todo } from './model'
import TodoList from './component/TodoList';
import { DragDropContext, DropResult } from 'react-beautiful-dnd'

const App: React.FC = () => {
  const [todo, setTodo] = useState<string>('')
  const [todos, setTodos] = useState<Todo[]>([])
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([])

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault()
    if (todo) {
      setTodos([...todos, { id: Date.now(), todo, isDone: false }])
      setTodo("")
    }
  }

  //bat su kien sau khi drag xong
  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result
    if (!destination) return
    if (destination.droppableId === source.droppableId && destination.index === source.index) return

    let add,
      active = todos,
      complete = completedTodos

    if (source.droppableId === 'TodosList') {
      add = active[source.index]
      active.splice(source.index, 1)
    } else {
      add = complete[source.index]
      complete.splice(source.index, 1)
    }

    if (destination.droppableId === 'TodosList') {
      active.splice(destination.index, 0, add)
    } else {
      complete.splice(destination.index, 0, add)
    }

  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>

      <div className="App" >
        <div className="heading"> Taskify</div>
        <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
        <TodoList todos={todos} setTodos={setTodos} completedTodos={completedTodos} setCompletedTodos={setCompletedTodos} />
      </div>
    </DragDropContext>
  );
}

export default App;



// let n: any
// let name: string
// let age: number
// let isStudent: boolean
// let hobbies: string[]
// let role: [number, string]
// let pName: Function
// let prName: (name: string) => void
// let ppName: (name: string) => never
// let personName: unknown
// interface Person {
//   name: string,
//   age?: number
// }

// interface Guy extends Person {
//   prof: string
// }

// type X = {
//   a: string,
//   b: number
// }
// type Y = X & {
//   c: string,
//   d: number
// }

// // // let y: Y = {
// // //   c: "sdsd",
// // //   d: 34,
// // //   a: "sds"
// // // }
// // // type Person = {
// // //   name: string,
// // //   age?: number
// // // }
// // // let person: Person = {
// // //   name: "huy"
// // // }
// // // let people: Person[]
// // function printName(name: string) {
// //   console.log(name);
// // }