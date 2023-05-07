import {TaskPriorities, TaskStatuses} from "common/enums/common-enums";
import {instance} from "api/common-api";
import {ResponseType} from "common/types/common-types"

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
    updateTodolistTitle(arg: UpdateTodolistTitleArgType) {
        return instance.put<ResponseType>(`todo-lists/${arg.todolistId}`, {title: arg.title})
    },
    getTasks(todoId: string) {
        return instance.get<GetTasksResponseType>(`todo-lists/${todoId}/tasks`)
    },
    createTask(arg:AddTaskArgType) {
        return instance.post<ResponseType<{item: TaskType}>>(`todo-lists/${arg.todolistId}/tasks`, {title: arg.title})
    },
    changeTask(todoId: string, taskId: string, model: ChangeTaskModelType) {
        return instance.put<ResponseType<TaskType>>(`todo-lists/${todoId}/tasks/${taskId}`, model)
    },
    deleteTask(arg: RemoveTaskArgType) {
        return instance.delete<ResponseType>(`todo-lists/${arg.todolistId}/tasks/${arg.taskId}`)
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

export type GetTasksResponseType = {
    error: string | null
    totalCount: number
    items: TaskType[]
}
export type ChangeTaskModelType = {
    description?: string
    title?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}

export type AddTaskArgType = {
    todolistId: string,
    title: string
}

export type ChangeTaskType = {
    taskId: string,
    domainModel: ChangeTaskModelType,
    todolistId: string
}

export type RemoveTaskArgType = {
    todolistId: string,
    taskId: string,
}

export type UpdateTodolistTitleArgType = {
    todolistId: string
    title: string
}

