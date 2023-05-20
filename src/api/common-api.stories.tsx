import React, { useEffect, useState } from "react"
import { todolistAPI } from "features/todolists-list/todolists/todolists-api"
import { tasksAPI } from "features/todolists-list/tasks/tasks-api"

export default {
  title: "API",
}

export const GetTodolists = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    // здесь мы будем делать запрос (вынесли в api ts) и ответ закидывать в стейт.
    // который в виде строки будем отображать в div-ке
    const promise = todolistAPI.getTodolists()

    promise.then((res) => {
      setState(res.data)
    })
  }, [])
  return <div>{JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {
  const [state, setState] = useState<any>(null)
  const [titleTodolist, setTitleTodolist] = useState<string>("")

  const createTodolist = () => {
    const promise = todolistAPI.createTodolist(titleTodolist)
    promise.then((res) => {
      setState(res.data)
    })
  }
  return (
    <div>
      {JSON.stringify(state)}
      <div>
        <input
          placeholder={"title Todolist"}
          value={titleTodolist}
          onChange={(e) => {
            setTitleTodolist(e.currentTarget.value)
          }}
        />
        <button onClick={createTodolist}>Create Todolist</button>
      </div>
    </div>
  )
}

export const DeleteTodolist = () => {
  const [state, setState] = useState<any>(null)
  const [todoId, setTodoId] = useState<string>("")

  const deleteTodolist = () => {
    const promise = todolistAPI.deleteTodolist(todoId)
    promise.then((res) => {
      setState(res.data)
    })
  }
  return (
    <div>
      {JSON.stringify(state)}
      <div>
        <input
          placeholder={"todoId"}
          value={todoId}
          onChange={(e) => {
            setTodoId(e.currentTarget.value)
          }}
        />
        <button onClick={deleteTodolist}>Delete Todolist</button>
      </div>
    </div>
  )
}

export const UpdateTodolistTitle = () => {
  const [state, setState] = useState<any>(null)
  const [todolistId, setTolistId] = useState<string>("")
  const [title, setNewTitleTodolist] = useState<string>("")

  const updateTodolistTitle = () => {
    const promise = todolistAPI.updateTodolistTitle({ todolistId, title })
    promise.then((res) => {
      setState(res.data)
    })
  }

  return (
    <div>
      {JSON.stringify(state)}
      <div>
        <input placeholder={"todoId"} value={todolistId} onChange={(e) => setTolistId(e.currentTarget.value)} />
        <input
          placeholder={"New title Todolist"}
          value={title}
          onChange={(e) => setNewTitleTodolist(e.currentTarget.value)}
        />
        <button onClick={updateTodolistTitle}>Update todolist title</button>
      </div>
    </div>
  )
}

export const GetTasks = () => {
  const [state, setState] = useState<any>(null)
  const [todoId, setTodoId] = useState<string>("")
  const getTasks = () => {
    const promise = tasksAPI.getTasks(todoId)
    promise.then((res) => {
      setState(res.data)
    })
  }
  return (
    <div>
      {JSON.stringify(state)}
      <div>
        <input
          placeholder={"todoId"}
          value={todoId}
          onChange={(e) => {
            setTodoId(e.currentTarget.value)
          }}
        />
        <button onClick={getTasks}>Get Tasks</button>
      </div>
    </div>
  )
}

export const CreateTask = () => {
  const [state, setState] = useState<any>(null)
  const [todolistId, setTodolistId] = useState<string>("")
  const [title, setTitleTask] = useState<string>("")

  const createTask = () => {
    const promise = tasksAPI.createTask({ todolistId, title })
    promise.then((res) => {
      setState(res.data)
    })
  }

  return (
    <div>
      {JSON.stringify(state)}
      <div>
        <input
          placeholder={"todoId"}
          value={todolistId}
          onChange={(e) => {
            setTodolistId(e.currentTarget.value)
          }}
        />
        <input
          placeholder={"Title task"}
          value={title}
          onChange={(e) => {
            setTitleTask(e.currentTarget.value)
          }}
        />
        <button onClick={createTask}>Create Task</button>
      </div>
    </div>
  )
}

export const DeleteTask = () => {
  const [state, setState] = useState<any>(null)
  const [todolistId, setTodoId] = useState<string>("")
  const [taskId, setTaskId] = useState<string>("")

  const deleteTask = () => {
    const promise = tasksAPI.deleteTask({ todolistId, taskId })

    promise.then((res) => {
      setState(res.data)
    })
  }
  return (
    <div>
      {JSON.stringify(state)}
      <div>
        <input
          placeholder={"todoId"}
          value={todolistId}
          onChange={(e) => {
            setTodoId(e.currentTarget.value)
          }}
        />
        <input
          placeholder={"taskId"}
          value={taskId}
          onChange={(e) => {
            setTaskId(e.currentTarget.value)
          }}
        />
        <button onClick={deleteTask}>Delete task</button>
      </div>
    </div>
  )
}

export const UpdateTask = () => {
  const [state, setState] = useState<any>(null)
  const [stateIDsTodolists, setStateIDsTodolists] = useState<any>(null)
  const [todolistId, setTodoId] = useState<string>("")
  const [taskId, setTaskId] = useState<string>("")
  const [newTitleTask, setNewTitleTask] = useState<string>("")
  useEffect(() => {
    todolistAPI.getTodolists().then((resp) => {
      setStateIDsTodolists(resp.data.map((el) => el.id))
    })
  }, [])
  useEffect(() => {
    if (todolistId) {
    }
  }, [todolistId])
  //get todolists => render

  //get tasks for Todolist => render

  //input new title

  const updateTask = () => {
    const promise = tasksAPI.changeTask(todolistId, taskId, {
      description: "string",
      title: "string",
      status: 0,
      priority: 0,
      startDate: "string",
      deadline: "string",
    })

    promise.then((res) => {
      setState(res.data)
    })
  }
  return (
    <div>
      {JSON.stringify(state)}
      <div>
        <input
          placeholder={"todoId"}
          value={todolistId}
          onChange={(e) => {
            setTodoId(e.currentTarget.value)
          }}
        />
        <input
          placeholder={"taskId"}
          value={taskId}
          onChange={(e) => {
            setTaskId(e.currentTarget.value)
          }}
        />
        <input
          placeholder={"newTitleTask"}
          value={newTitleTask}
          onChange={(e) => {
            setNewTitleTask(e.currentTarget.value)
          }}
        />
        <button onClick={updateTask}>Update Task</button>
      </div>
      {/*<div>
            {stateIDsTodolists.map((el: any) => <button onClick={() =>{
                setTodoId(el)
            } }>{el}</button>)}
        </div>*/}
    </div>
  )
}
