import {TasksStateType} from "./Todolist/Todolist";
import {addTodolistACType, removeTodolistACType, setTodolistsACType} from "./todolists-reducer";
import {ChangeTaskModelType, TaskStatuses, TaskType, todolistAPI} from "../../api/todolist-api";
import {Dispatch} from "redux";
import {AppRootStateType} from "../../app/store";

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
        return {...state,
            [action.payload.todolistId]: state[action.payload.todolistId].filter(t => t.id !== action.payload.taskId)}
        case 'ADD-TASK':
            return {...state,
                [action.payload.task.todoListId]: [action.payload.task, ...state[action.payload.task.todoListId]]}
        case "CHANGE-TASK-STATUS":
            return {...state,
                [action.payload.todolistId]: state[action.payload.todolistId]
                    .map(t => t.id === action.payload.taskId ? {...t, status: action.payload.status} : t)}
        case "CHANGE-TASK-TITLE":
            return {...state,
                [action.payload.todolistId]: state[action.payload.todolistId]
                    .map(t => t.id === action.payload.taskId ? {...t, title: action.payload.newTitle} : t)}
        case 'ADD-TODOLIST':
            return {...state, [action.payload.todolist.id]: []}
        case 'REMOVE-TODOLIST': {
            const stateCopy = {...state}
            delete stateCopy[action.payload.id]
            return stateCopy
        }
        case "SET-TODOLISTS": {
            const stateCopy = {...state}
            action.payload.todolists.forEach((tl) => {
                stateCopy[tl.id] = []
            })
            return stateCopy
        }
        case "SET-TASKS":
            return {...state, [action.payload.todolistId]: action.payload.tasks}
        default:
            return state
    }
}

// actions
export const removeTaskAC = (taskId: string, todolistId: string) =>
    ({type: 'REMOVE-TASK', payload: {taskId, todolistId}}) as const
export const addTaskAC = (task: TaskType) =>
    ({type: 'ADD-TASK', payload: {task}}) as const
export const changeTaskStatusAC = (taskId: string, status: TaskStatuses, todolistId: string) =>
    ({type: 'CHANGE-TASK-STATUS', payload: {taskId, status, todolistId}}) as const
export const changeTaskTitleAC = (taskId: string, newTitle: string, todolistId: string) =>
    ({type: 'CHANGE-TASK-TITLE', payload: {taskId, newTitle, todolistId}}) as const
export const setTasksAC = (tasks: Array<TaskType>, todolistId: string) =>
    ({type: 'SET-TASKS', payload: {tasks, todolistId}}) as const

// thunks
export const fetchTasksTC = (todolistId: string) => (dispatch: Dispatch<ActionsType>) => {
        todolistAPI.getTasks(todolistId)
            .then((res) => {
                    dispatch(setTasksAC(res.data.items, todolistId))
                }
            )
    }
export const removeTaskTC = (taskId: string, todolistId: string) => (dispatch: Dispatch<ActionsType>) => {
    todolistAPI.deleteTask(todolistId, taskId)
        .then(res => {
            const action = removeTaskAC(taskId, todolistId)
            dispatch(action)
        })
}
export const addTaskTC = (title: string, todolistId: string) => (dispatch: Dispatch<ActionsType>) => {
        todolistAPI.createTask(todolistId, title)
            .then(res => {
                const task = res.data.data.item
                const action = addTaskAC(task)
                dispatch(action)
            })
    }
export const changeTaskStatusTC = (taskId: string, status: TaskStatuses, todolistId: string) =>
    (dispatch: Dispatch<ActionsType>, getState: () => AppRootStateType) => {
        const state = getState()
        const task = state.tasks[todolistId].find((t) => t.id === taskId)
        if (task) {
            let model: ChangeTaskModelType = {
                title: task.title,
                deadline: task.deadline,
                description: task.description,
                startDate: task.startDate,
                priority: task.priority,
                status: status
            }
            todolistAPI.changeTaskStatus(todolistId, taskId, model)
                .then((res) => {
                 const action = changeTaskStatusAC(taskId, status, todolistId)
                    dispatch(action)
                })

        }
    }
export const changeTaskTitleTC = (todolistId: string, taskId: string, newTitle: string) =>
    (dispatch: Dispatch<ActionsType>, getState: () => AppRootStateType) => {
        const state = getState()
        const task = state.tasks[todolistId].find((t) => t.id === taskId)
        if (task) {
            let model: ChangeTaskModelType = {
                title: newTitle,
                deadline: task.deadline,
                description: task.description,
                startDate: task.startDate,
                priority: task.priority,
                status: task.status
            }
            todolistAPI.updateTaskTitle(todolistId, taskId, model)
                .then((res) => {
                    const action = changeTaskTitleAC(taskId, newTitle, todolistId)
                    dispatch(action)
                })

        }
    }

//types
type ActionsType =
    ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof changeTaskStatusAC>
    | ReturnType<typeof changeTaskTitleAC>
    | ReturnType<typeof setTasksAC>
    | addTodolistACType
    | removeTodolistACType
    | setTodolistsACType

