import {FilterValuesType} from "./Todolist/Todolist";
import {ResultCode, todolistAPI, TodolistType} from "../../api/todolist-api";
import {Dispatch} from "redux";
import {RequestStatusType, SetErrorACType, setStatusAC, SetStatusACType} from "../../app/api-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";

const initialState: Array<TodolistDomainType> = []

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionsType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.payload.id)
        case "ADD-TODOLIST":
            return [{...action.payload.todolist, filter: "all", entityStatus: "idle"}, ...state]
        case "CHANGE-TODOLIST-TITLE":
            return state.map(tl => tl.id === action.payload.id ? {...tl, title: action.payload.title} : tl)
        case "CHANGE-TODOLIST-FILTER":
            return state.map(tl => tl.id === action.payload.id ? {...tl, filter: action.payload.filter} : tl)
        case "SET-TODOLISTS":
            return action.payload.todolists.map(tl => ({...tl, filter: "all", entityStatus: 'idle'}))
        case "CHANGE-ENTITY-STATUS":
            return state.map(tl => tl.id === action.payload.id ? {...tl, entityStatus: action.payload.status} : tl)
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
export const changeEntityStatusAC = (id: string, status: RequestStatusType) =>
    ({type: 'CHANGE-ENTITY-STATUS', payload: {id, status}}) as const

// thunks
export const fetchTodolistTC = () => (dispatch: Dispatch) => {
    dispatch(setStatusAC('loading'))
    todolistAPI.getTodolists()
        .then((res) => {
                dispatch(setTodolistsAC(res.data))
                dispatch(setStatusAC("succeeded"))
            })
}
export const removeTodolistTC = (todolistId: string) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setStatusAC('loading'))
    dispatch(changeEntityStatusAC(todolistId, "loading"))
    todolistAPI.deleteTodolist(todolistId)
        .then((res) => {
            if (res.data.resultCode === ResultCode.Ok) {
                dispatch(removeTodolistAC(todolistId))
                dispatch(setStatusAC('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            dispatch(changeEntityStatusAC(todolistId, "failed"))
            handleServerNetworkError(error, dispatch)
        })
}
export const addTodolistTC = (title: string) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setStatusAC('loading'))
    todolistAPI.createTodolist(title)
        .then(res => {
            if (res.data.resultCode === ResultCode.Ok) {
                dispatch(addTodolistAC(res.data.data.item))
                dispatch(setStatusAC('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch(err => {
            handleServerNetworkError(err, dispatch)
        })
}

export const changeTodolistTitleTC = (todolistId: string, title: string) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setStatusAC('loading'))
    todolistAPI.updateTodolistTitle(todolistId, title)
        .then((res) => {
            if (res.data.resultCode === ResultCode.Ok) {
                dispatch(changeTitleTodolistAC(todolistId, title))
                dispatch(setStatusAC('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((err) => {
            handleServerNetworkError(err, dispatch)
        })
}

//types
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}
export type removeTodolistACType = ReturnType<typeof removeTodolistAC>
export type addTodolistACType = ReturnType<typeof addTodolistAC>
export type setTodolistsACType = ReturnType<typeof setTodolistsAC>
type ActionsType =
    | ReturnType<typeof changeTitleTodolistAC>
    | ReturnType<typeof changeFilterAC>
    | ReturnType<typeof changeEntityStatusAC>
    | removeTodolistACType
    | addTodolistACType
    | setTodolistsACType
    | SetStatusACType
    | SetErrorACType
