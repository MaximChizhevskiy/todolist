import {FilterValuesType, TodolistsType} from "../Todolist";
import {v1} from "uuid";

export let todolistId1 = v1()
export let todolistId2 = v1()

const initialState: Array<TodolistsType> = [
    {id: todolistId1, titleTodolist: 'What to learn', filter: 'all'},
    {id: todolistId2, titleTodolist: 'What to buy', filter: 'all'},
]

type ActionTodolistACType = removeTodolistACType | addTodolistACType | changeTitleTodolistACType | changeFilterACType
export const todolistsReducer = (state: Array<TodolistsType> = initialState, action: ActionTodolistACType):Array<TodolistsType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(el => el.id !== action.payload.id)
        }
        case "ADD-TODOLIST": {
            let newTodolistId = v1()
            let newTodolist: TodolistsType = {
                id: action.payload.todolistId,
                filter: "all",
                titleTodolist: action.payload.titleTodolist
            }
            return [newTodolist, ...state]
        }
        case "CHANGE-TODOLIST-TITLE": {
            const todolist = state.find(todolist => todolist.id === action.payload.id)
            if (todolist) {
                todolist.titleTodolist = action.payload.titleTodolist
            }
            return [...state]
        }
        case "CHANGE-TODOLIST-FILTER": {
            let todolist = state.find(todolist => todolist.id === action.payload.id)
            if (todolist) {
                todolist.filter = action.payload.filter
            }
            return [...state]
        }
        default:
            return state
    }
}

export type removeTodolistACType = ReturnType<typeof removeTodolistAC>
export const removeTodolistAC = (id: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {id}
    } as const
}

export type addTodolistACType = ReturnType<typeof addTodolistAC>
export const addTodolistAC = (titleTodolist: string) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {
            titleTodolist,
            todolistId: v1()
        }
    } as const
}

type changeTitleTodolistACType = ReturnType<typeof changeTitleTodolistAC>
export const changeTitleTodolistAC = (id: string, titleTodolist: string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        payload: {
            id,
            titleTodolist
        }
    } as const
}

type changeFilterACType = ReturnType<typeof changeFilterAC>
export const changeFilterAC = (id: string, filter: FilterValuesType) => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        payload: {
            id,
            filter
        }
    } as const
}

