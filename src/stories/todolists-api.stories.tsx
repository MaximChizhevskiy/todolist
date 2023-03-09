import React, {useEffect, useState} from 'react';
import {todolistAPI} from "../api/todolist-api";

export default {
    title: 'API'
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
    const [titleTodolist, setTitleTodolist] = useState<string>('')

    const createTodolist = () => {
        const promise = todolistAPI.createTodolist(titleTodolist)
        promise.then((res) => {
            setState(res.data)
        })
    }
    return <div>{JSON.stringify(state)}
        <div>
            <input placeholder={"title Todolist"} value={titleTodolist} onChange={(e) => {
                setTitleTodolist(e.currentTarget.value)
            }}/>
            <button onClick={createTodolist}>Create Todolist</button>
        </div>
    </div>
}

export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [todoId, setTodoId] = useState<string>('')

    const deleteTodolist = () => {
        const promise = todolistAPI.deleteTodolist(todoId)
        promise.then((res) => {
            setState(res.data)
        })
    }
    return <div>{JSON.stringify(state)}
        <div>
            <input placeholder={"todoId"} value={todoId} onChange={(e) => {
                setTodoId(e.currentTarget.value)
            }}/>
            <button onClick={deleteTodolist}>Delete Todolist</button>
        </div>
    </div>
}

export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    const [todoId, setTodoId] = useState<string>('')
    const [newTitleTodolist, setNewTitleTodolist] = useState<string>('')

    const updateTodolistTitle = () => {
        const promise = todolistAPI.updateTodolistTitle(todoId, newTitleTodolist)
        promise.then((res) => {
            setState(res.data)
        })
    }

    return <div>{JSON.stringify(state)}
        <div>
            <input placeholder={"todoId"} value={todoId} onChange={e => setTodoId(e.currentTarget.value)}/>
            <input placeholder={"New title todolist"} value={newTitleTodolist}
                   onChange={e => setNewTitleTodolist(e.currentTarget.value)}/>
            <button onClick={updateTodolistTitle}>Update todolist title</button>
        </div>
    </div>
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    const [todoId, setTodoId] = useState<string>('')
    const getTasks = () => {
        const promise = todolistAPI.getTasks(todoId)
        promise.then((res) => {
            setState(res.data)
        })
    }
    return <div>{JSON.stringify(state)}
        <div>
            <input placeholder={"todoId"} value={todoId} onChange={(e) => {
                setTodoId(e.currentTarget.value)
            }}/>
            <button onClick={getTasks}>Get Tasks</button>
        </div>

    </div>
}

export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    const [todoId, setTodoId] = useState<string>('')
    const [titleTask, setTitleTask] = useState<string>('')

    const createTask = () => {
        const promise = todolistAPI.createTask(todoId, titleTask)
        promise.then((res) => {
            setState(res.data)
        })
    }

    return <div>{JSON.stringify(state)}
        <div>
            <input placeholder={"todoId"} value={todoId} onChange={(e) => {
                setTodoId(e.currentTarget.value)
            }}/>
            <input placeholder={"Title task"} value={titleTask} onChange={(e) => {
                setTitleTask(e.currentTarget.value)
            }}/>
            <button onClick={createTask}>Create Task</button>
        </div>

    </div>
}

export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    const [todoId, setTodoId] = useState<string>('')
    const [taskId, setTaskId] = useState<string>('')

    const deleteTask = () => {
        const promise = todolistAPI.deleteTask(todoId, taskId)

        promise.then((res) => {
            setState(res.data)
        })
    }
    return <div>{JSON.stringify(state)}
        <div>
            <input placeholder={"todoId"} value={todoId} onChange={(e) => {
                setTodoId(e.currentTarget.value)
            }}/>
            <input placeholder={"taskId"} value={taskId} onChange={(e) => {
                setTaskId(e.currentTarget.value)
            }}/>
            <button onClick={deleteTask}>Delete task</button>
        </div>

    </div>

}

export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)
    const [todoId, setTodoId] = useState<string>('')
    const [taskId, setTaskId] = useState<string>('')
    const [newTitleTask, setNewTitleTask] = useState<string>('')

    const updateTask = () => {
        const promise = todolistAPI.updateTaskTitle(todoId, taskId, newTitleTask)

        promise.then((res) => {
            setState(res.data)
        })
    }
    return <div>{JSON.stringify(state)}
        <div>
            <input placeholder={"todoId"} value={todoId} onChange={(e) => {
                setTodoId(e.currentTarget.value)
            }}/>
            <input placeholder={"taskId"} value={taskId} onChange={(e) => {
                setTaskId(e.currentTarget.value)
            }}/>
            <input placeholder={"newTitleTask"} value={newTitleTask} onChange={(e) => {
                setNewTitleTask(e.currentTarget.value)
            }}/>
            <button onClick={updateTask}>Update Task</button>
        </div>
    </div>
}

