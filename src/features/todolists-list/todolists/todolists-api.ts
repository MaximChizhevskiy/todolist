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

}

//types
export type TodolistType = {
    id: string
    addedDate: string
    order: number
    title: string
}

export type UpdateTodolistTitleArgType = {
    todolistId: string
    title: string
}

