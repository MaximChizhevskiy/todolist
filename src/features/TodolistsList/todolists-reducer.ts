import {FilterValuesType} from "./Todolist/Todolist";
import {ResultCode, todolistAPI, TodolistType} from "api/todolist-api";
import {Dispatch} from "redux";
import {appActions, RequestStatusType} from "app/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "utils/error-utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {clearTasksAndTodolists} from "common/action/common.action";

const initialState: Array<TodolistDomainType> = []

const slice = createSlice({
    name: 'todolist',
    initialState,
    reducers:{
        removeTodolist: (state, action: PayloadAction<{ id: string }>) => {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            if (index !== -1) state.splice(index, 1)
        },
        addTodolist:(state, action: PayloadAction<{todolist: TodolistType}>) => {
            const newTodolist: TodolistDomainType = {...action.payload.todolist, filter: 'all', entityStatus: 'idle'}
            state.unshift(newTodolist)
        },
        changeTitleTodolist:(state, action: PayloadAction<{id: string, title: string}>) => {
            const todolist = state.find(tl => tl.id === action.payload.id)
            if (todolist) {
                todolist.title = action.payload.title
            }
        },
        changeFilter:(state, action: PayloadAction<{id: string, filter: FilterValuesType}>) => {
            const todolist = state.find(tl => tl.id === action.payload.id)
            if (todolist) {
                todolist.filter = action.payload.filter
            }
        },
        changeEntityStatus:(state, action: PayloadAction<{id: string, entityStatus: RequestStatusType}>) => {
            const todolist = state.find(tl => tl.id === action.payload.id)
            if (todolist) {
                todolist.entityStatus = action.payload.entityStatus
            }
        },
        setTodolists: (state, action: PayloadAction<{todolists: Array<TodolistType>}>) => {
            return action.payload.todolists.map(tl => ({...tl, filter: "all", entityStatus: 'idle'}))
        }
    },
    extraReducers: builder => {
        builder
            .addCase(clearTasksAndTodolists, () => {
                return []
            })
    }
})

export const todolistsReducer = slice.reducer
export const todolistActions = slice.actions

// thunks
export const fetchTodolistTC = () => (dispatch: Dispatch) => {
    dispatch(appActions.setAppStatus({status: 'loading'}))
    todolistAPI.getTodolists()
        .then((res) => {
                dispatch(todolistActions.setTodolists({todolists: res.data}))
                dispatch(appActions.setAppStatus({status: 'succeeded'}))
            })
}
export const removeTodolistTC = (todolistId: string) => (dispatch: Dispatch) => {
    dispatch(appActions.setAppStatus({status: 'loading'}))
    dispatch(todolistActions.changeEntityStatus({id: todolistId, entityStatus:'loading'}))
    todolistAPI.deleteTodolist(todolistId)
        .then((res) => {
            if (res.data.resultCode === ResultCode.Ok) {
                dispatch(todolistActions.removeTodolist({id: todolistId}))
                dispatch(appActions.setAppStatus({status: 'succeeded'}))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            dispatch(todolistActions.changeEntityStatus({id: todolistId, entityStatus: 'failed'}))
            handleServerNetworkError(error, dispatch)
        })
}
export const addTodolistTC = (title: string) => (dispatch: Dispatch) => {
    dispatch(appActions.setAppStatus({status: 'loading'}))
    todolistAPI.createTodolist(title)
        .then(res => {
            if (res.data.resultCode === ResultCode.Ok) {
                dispatch(todolistActions.addTodolist({todolist: res.data.data.item}))
                dispatch(appActions.setAppStatus({status: 'succeeded'}))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch(err => {
            handleServerNetworkError(err, dispatch)
        })
}

export const changeTodolistTitleTC = (todolistId: string, title: string) => (dispatch: Dispatch) => {
    dispatch(appActions.setAppStatus({status: 'loading'}))
    todolistAPI.updateTodolistTitle(todolistId, title)
        .then((res) => {
            if (res.data.resultCode === ResultCode.Ok) {
                dispatch(todolistActions.changeTitleTodolist({id: todolistId, title: title}))
                dispatch(appActions.setAppStatus({status: 'succeeded'}))
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


