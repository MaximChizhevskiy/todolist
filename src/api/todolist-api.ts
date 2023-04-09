import axios from 'axios'
import {FormDataType} from "features/Login/Login";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true
})

//auth
export const authAPI = {
    me() {
        return instance.get<TasksResponseType<{userId: number}>>(`auth/me`)
            .then(res => {
                return res.data
            })
    },
 logIn(data: FormDataType) {
     return instance.post<TasksResponseType<{userId: number}>>(`auth/login`, data)
         .then(res => {
             return res.data
         })
 },
    logOut() {
        return instance.delete<TasksResponseType>(`auth/login`)
            .then(res => {
                return res.data
            })
    }
}

//api
export const todolistAPI = {
    getTodolists() {
        return instance.get<Array<TodolistType>>('todo-lists')
    },
    createTodolist(title: string) {
        return instance.post<ResponseType<{item: TodolistType}>>('todo-lists', {title: title})
    },
    deleteTodolist(todoId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todoId}`)
    },
    updateTodolistTitle(todoId: string, title: string) {
        return instance.put<ResponseType>(`todo-lists/${todoId}`, {title: title})
    },
    getTasks(todoId: string) {
        return instance.get<GetTasksResponseType>(`todo-lists/${todoId}/tasks`)
    },
    createTask(todoId: string, title: string) {
        return instance.post<TasksResponseType<{item: TaskType}>>(`todo-lists/${todoId}/tasks`, {title: title})
    },
    updateTaskTitle(todoId: string, taskId: string, model: ChangeTaskModelType) {
        return instance.put<TasksResponseType<TaskType>>(`todo-lists/${todoId}/tasks/${taskId}`, model)
    },
    deleteTask(todoId: string, taskId: string) {
        return instance.delete<TasksResponseType>(`todo-lists/${todoId}/tasks/${taskId}`)
    },
    changeTaskStatus(todoId: string, taskId: string, model: ChangeTaskModelType) {
        return instance.put<TasksResponseType>(`todo-lists/${todoId}/tasks/${taskId}`, model)
    }
}

//types
export type TodolistType = {
    id: string
    addedDate: string
    order: number
    title: string
}
export type TaskType ={
    description: string
    title: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}
export type ResponseType<T = {}> = {
    fieldsErrors: string[]
    messages: string[]
    resultCode: number
    data: T
}
type GetTasksResponseType = {
    error: string | null
    totalCount: number
    items: TaskType[]
}
export type TasksResponseType<T = {}> = {
    resultCode: number
    messages: string[]
    data: T
}
export enum TaskStatuses {
    New,
    InProgress,
    Completed,
    Draft
}
export enum TaskPriorities {
    Low,
    Middle,
    Hi,
    Urgently,
    Later
}
export enum ResultCode {
    Ok,
    Error,
    Captcha
}
export type ChangeTaskModelType = {
    description?: string
    title?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}
