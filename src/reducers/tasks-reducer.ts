import {TasksStateType} from "../Todolist";
import {v1} from "uuid";
import {addTodolistACType, removeTodolistACType, todolistId1, todolistId2} from "./todolists-reducer";

const initialState: TasksStateType = {
    [todolistId1]: [
    {id: v1(), titleTask: "HTML&CSS", isDone: true},
    {id: v1(), titleTask: "JS", isDone: true},
    {id: v1(), titleTask: "ReactJS", isDone: false}],
    [todolistId2]: [
    {id: v1(), titleTask: "Laptop", isDone: true},
    {id: v1(), titleTask: "Keyboard", isDone: false},
    {id: v1(), titleTask: "Playstation 5", isDone: false}]
}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionTasksACType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            let stateCopy = {...state}
            let tasks = stateCopy[action.payload.todolistId]
            let filteredTasks = tasks.filter(t => t.id !== action.payload.taskId)
            stateCopy[action.payload.todolistId] = filteredTasks
            return stateCopy
        }
        case 'ADD-TASK': {
            let task = {id: v1(), titleTask: action.payload.titleTask, isDone: false}

            let stateCopy = {...state}
            let tasks = stateCopy[action.payload.todolistId]
            stateCopy[action.payload.todolistId] = [task, ...tasks]
            return stateCopy
        }
        case "CHANGE-TASK-STATUS": {

        return {
            ...state,
            [action.payload.todolistId]: state[action.payload.todolistId].map(task=>task.id===action.payload.taskId ? {...task, isDone: action.payload.isDone} : task)
        }

        }
        case "CHANGE-TASK-TITLE":{
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId]
                    .map(task => task.id === action.payload.taskId ? {...task, titleTask: action.payload.newTitle}: task)
            }
        }
        case 'ADD-TODOLIST':{
            let stateCopy = {...state}
            stateCopy[action.payload.todolistId] = []
            return stateCopy
        }
        case 'REMOVE-TODOLIST':{
            let stateCopy = {...state}
            delete stateCopy[action.payload.id]
            return stateCopy
        }
        default:
           return state
    }
}

export type ActionTasksACType = removeTaskACType | addTaskACType | changeTaskStatusACType | changeTaskTitleACType | addTodolistACType | removeTodolistACType

type removeTaskACType = ReturnType<typeof removeTaskAC>
export const removeTaskAC = (taskId: string, todolistId: string) => {
    return {
        type: 'REMOVE-TASK',
        payload: {taskId, todolistId}
    } as const
}

type addTaskACType = ReturnType<typeof addTaskAC>
export const addTaskAC = (titleTask: string, todolistId: string) => {
    return {
        type: 'ADD-TASK',
        payload: {titleTask, todolistId}
    } as const
}

type changeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>
export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string) => {
    return {
        type: 'CHANGE-TASK-STATUS',
        payload: {taskId, isDone, todolistId}
    } as const
}

type changeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>
export const changeTaskTitleAC = (taskId: string, newTitle: string, todolistId: string) => {
    return {
        type: 'CHANGE-TASK-TITLE',
        payload: {taskId, newTitle, todolistId}
    } as const
}
