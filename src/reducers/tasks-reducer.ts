import {TasksStateType} from "../Todolist";
import {v1} from "uuid";
import {addTodolistACType, removeTodolistACType, todolistId1, todolistId2} from "./todolists-reducer";
import {TaskPriorities, TaskStatuses} from "../api/todolist-api";

const initialState: TasksStateType = {
    [todolistId1]: [
        {
            id: v1(), titleTask: "HTML&CSS", status: TaskStatuses.Completed,
            todoListId: todolistId1,
            startDate: '',
            deadline: '',
            addedDate: '',
            order: 0,
            priority: TaskPriorities.Low,
            description: ''
        },
        {id: v1(), titleTask: "JS", status: TaskStatuses.Completed,
            todoListId: todolistId1,
            startDate: '',
            deadline: '',
            addedDate: '',
            order: 0,
            priority: TaskPriorities.Low,
            description: ''},
        {id: v1(), titleTask: "ReactJS", status: TaskStatuses.New,
            todoListId: todolistId1,
            startDate: '',
            deadline: '',
            addedDate: '',
            order: 0,
            priority: TaskPriorities.Low,
            description: ''}],
    [todolistId2]: [
        {id: v1(), titleTask: "Laptop", status: TaskStatuses.Completed, todoListId: todolistId2,
            startDate: '',
            deadline: '',
            addedDate: '',
            order: 0,
            priority: TaskPriorities.Low,
            description: ''},
        {id: v1(), titleTask: "Keyboard", status: TaskStatuses.New, todoListId: todolistId2,
            startDate: '',
            deadline: '',
            addedDate: '',
            order: 0,
            priority: TaskPriorities.Low,
            description: ''},
        {id: v1(), titleTask: "Playstation 5", status: TaskStatuses.New, todoListId: todolistId2,
            startDate: '',
            deadline: '',
            addedDate: '',
            order: 0,
            priority: TaskPriorities.Low,
            description: ''}]
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
            let task = {id: v1(), titleTask: action.payload.titleTask, status: TaskStatuses.New, startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
                description: '',
                todoListId: action.payload.todolistId}

            let stateCopy = {...state}
            let tasks = stateCopy[action.payload.todolistId]
            stateCopy[action.payload.todolistId] = [task, ...tasks]
            return stateCopy
        }
        case "CHANGE-TASK-STATUS": {

        return {
            ...state,
            [action.payload.todolistId]: state[action.payload.todolistId].map(task=>task.id===action.payload.taskId ? {...task, status: action.payload.status} : task)
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
export const changeTaskStatusAC = (taskId: string, status: TaskStatuses, todolistId: string) => {
    return {
        type: 'CHANGE-TASK-STATUS',
        payload: {taskId, status, todolistId}
    } as const
}

type changeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>
export const changeTaskTitleAC = (taskId: string, newTitle: string, todolistId: string) => {
    return {
        type: 'CHANGE-TASK-TITLE',
        payload: {taskId, newTitle, todolistId}
    } as const
}
