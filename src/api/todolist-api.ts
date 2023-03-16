import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true
})

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
    addedDate: string
    id: string
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
type ResponseType<T = {}> = {
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
type TasksResponseType<T = {}> = {
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
export type ChangeTaskModelType = {
    description: string
    title: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
}
