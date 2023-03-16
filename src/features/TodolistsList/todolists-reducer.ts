import {FilterValuesType} from "./Todolist/Todolist";
import {todolistAPI, TodolistType} from "../../api/todolist-api";
import {Dispatch} from "redux";

export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
}

const initialState: Array<TodolistDomainType> = []

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionsType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.payload.id)
        case "ADD-TODOLIST":
            return [{...action.payload.todolist, filter: "all"}, ...state]
        case "CHANGE-TODOLIST-TITLE":
            return state.map(tl => tl.id === action.payload.id ? {...tl, title: action.payload.title} : tl)
        case "CHANGE-TODOLIST-FILTER":
            return state.map(tl => tl.id === action.payload.id ? {...tl, filter: action.payload.filter} : tl)
        case "SET-TODOLISTS":
            return action.payload.todolists.map(tl => ({...tl, filter: "all"}))
        default:
            return state
    }
}

// actions
export const setTodolistsAC = (todolists: Array<TodolistType>) =>
    ({type: 'SET-TODOLISTS', payload: {todolists}}) as const
export const removeTodolistAC = (id: string) =>
    ({type: 'REMOVE-TODOLIST', payload: {id}}) as const
export const addTodolistAC = (todolist: TodolistType) =>
    ({type: 'ADD-TODOLIST', payload: {todolist}}) as const
export const changeTitleTodolistAC = (id: string, title: string) =>
    ({type: 'CHANGE-TODOLIST-TITLE', payload: {id, title}}) as const
export const changeFilterAC = (id: string, filter: FilterValuesType) =>
    ({type: 'CHANGE-TODOLIST-FILTER', payload: {id, filter}}) as const

// thunks
export const fetchTodolistTC = () => (dispatch: Dispatch) => {
    todolistAPI.getTodolists()
        .then((res) => {
                dispatch(setTodolistsAC(res.data))
            }
        )
}
export const removeTodolistTC = (todolistId: string) => (dispatch: Dispatch<ActionsType>) => {
    todolistAPI.deleteTodolist(todolistId)
        .then((res) => {
                dispatch(removeTodolistAC(todolistId))
            }
        )
}
export const addTodolistTC = (title: string) => (dispatch: Dispatch<ActionsType>) => {
    todolistAPI.createTodolist(title)
        .then((res) => {
                dispatch(addTodolistAC(res.data.data.item))
            }
        )
}
export const changeTodolistTitleTC = (todolistId: string, title: string) => (dispatch: Dispatch<ActionsType>) => {
    todolistAPI.updateTodolistTitle(todolistId, title)
        .then((res) => {
                dispatch(changeTitleTodolistAC(todolistId, title))
            }
        )
}

//types
export type removeTodolistACType = ReturnType<typeof removeTodolistAC>
export type addTodolistACType = ReturnType<typeof addTodolistAC>
export type setTodolistsACType = ReturnType<typeof setTodolistsAC>
type ActionsType =
    | ReturnType<typeof changeTitleTodolistAC>
    | ReturnType<typeof changeFilterAC>
    | removeTodolistACType
    | addTodolistACType
    | setTodolistsACType
