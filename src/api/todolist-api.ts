import axios from 'axios'

export type TodolistType = {
    addedDate: string
    id: string
    order: number
    titleTodolist: string
}

export type TaskType ={
    description: string
    titleTask: string
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

type GetTasksResponse = {
    error: string | null
    totalCount: number
    items: TaskType[]
}

type CreateTaskResponse<T = {}> = {
    resultCode: number
    messages: string[]
    data: T
}

type UpdateTasksResponse<T = {}> = {
    resultCode: number
    messages: string[]
    data: T
}

type DeleteTasksResponse<T = {}> = {
    resultCode: number
    messages: string[]
    data: T
}

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true
})


export const todolistAPI = {
    getTodolists() {
        return instance.get<Array<TodolistType>>('todo-lists')
    },
    createTodolist(titleTodolist: string) {
        return instance.post<ResponseType>('todo-lists', {title: titleTodolist})
    },
    deleteTodolist(todoId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todoId}`)
    },
    updateTodolistTitle(todoId: string, newTitleTodolist: string) {
        return instance.put<ResponseType>(`todo-lists/${todoId}`, {title: newTitleTodolist})
    },
    getTasks(todoId: string) {
        return instance.get<GetTasksResponse>(`todo-lists/${todoId}/tasks`)
    },
    createTask(todoId: string, titleTask: string) {
        return instance.post<CreateTaskResponse>(`todo-lists/${todoId}/tasks`, {title: titleTask})
    },
    updateTaskTitle(todoId: string, taskId: string, newTitleTask: string) {
        return instance.put<UpdateTasksResponse>(`todo-lists/${todoId}/tasks/${taskId}`, {title: newTitleTask})
    },
    deleteTask(todoId: string, taskId: string) {
        return instance.delete<DeleteTasksResponse>(`todo-lists/${todoId}/tasks/${taskId}`)
    }
}
