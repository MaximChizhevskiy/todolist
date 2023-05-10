import {FilterValuesType} from "features/todolists-list/todolists/Todolist/Todolist";
import {appActions, RequestStatusType} from "app/app-reducer";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {clearTasksAndTodolists} from "common/action/common-actions";
import {todolistAPI, TodolistType, UpdateTodolistTitleArgType} from "features/todolists-list/todolists/todolists-api";
import {ResultCode} from "common/enums";
import {createAppAsyncThunk, handleServerAppError} from "common/utils";
import {thunkTryCatch} from "common/utils/thunk-try-catch";

const fetchTodolists = createAppAsyncThunk<{ todolists: TodolistType[] }, void>
('Todolist/fetchTodolists', async (_, thunkAPI) => {
    const {dispatch} = thunkAPI
    return thunkTryCatch(thunkAPI, async () => {
        dispatch(appActions.setAppStatus({status: 'loading'}))
        const res = await todolistAPI.getTodolists()
        dispatch(appActions.setAppStatus({status: 'succeeded'}))
        return {todolists: res.data}
    })
})

const addTodolist = createAppAsyncThunk<{ todolist: TodolistType }, string>
('todo/addTodolist', async (title, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI
    return thunkTryCatch(thunkAPI, async () => {
        const res = await todolistAPI.createTodolist(title)
        if (res.data.resultCode === ResultCode.Success) {
            dispatch(appActions.setAppStatus({status: 'succeeded'}))
            return {todolist: res.data.data.item}
        } else {
            handleServerAppError(res.data, dispatch);
            return rejectWithValue(null)
        }
    })
})

const removeTodolist = createAppAsyncThunk<{ id: string }, string>
('todo/removeTodolist', async (id, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI
    return thunkTryCatch(thunkAPI, async () => {
        dispatch(appActions.setAppStatus({status: 'loading'}))
        dispatch(todolistActions.changeEntityStatus({id, entityStatus: 'loading'}))
        const res = await todolistAPI.deleteTodolist(id)
        if (res.data.resultCode === ResultCode.Success) {
            dispatch(appActions.setAppStatus({status: 'succeeded'}))
            return {id}
        } else {
            handleServerAppError(res.data, dispatch);
            return rejectWithValue(null)
        }
    })
})

const changeTodolistTitle = createAppAsyncThunk<UpdateTodolistTitleArgType, UpdateTodolistTitleArgType>
('todo/changeTodolistTitle', async (arg, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI
    return thunkTryCatch(thunkAPI, async () => {
        dispatch(appActions.setAppStatus({status: 'loading'}))
        const res = await todolistAPI.updateTodolistTitle(arg)
        if (res.data.resultCode === ResultCode.Success) {
            dispatch(appActions.setAppStatus({status: 'succeeded'}))
            return arg
        } else {
            handleServerAppError(res.data, dispatch);
            return rejectWithValue(null)
        }
    })
})

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
            .addCase(fetchTodolists.fulfilled, (state, action) => {
                return action.payload.todolists.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}))
            })
            .addCase(addTodolist.fulfilled, (state, action) => {
                const newTodolist: TodolistDomainType = {
                    ...action.payload.todolist,
                    filter: 'all',
                    entityStatus: 'idle'
                }
                state.unshift(newTodolist)
            })
            .addCase(removeTodolist.fulfilled, (state, action) => {
                const index = state.findIndex(todo => todo.id === action.payload.id)
                if (index !== -1) state.splice(index, 1)
            })
            .addCase(changeTodolistTitle.fulfilled, (state, action) => {
                const todo = state.find(todo => todo.id === action.payload.todolistId)
                if (todo) {
                    todo.title = action.payload.title
                }
            })
            .addCase(clearTasksAndTodolists, () => {
                return []
            })
    }
})

export const todolistsReducer = slice.reducer
export const todolistActions = slice.actions
export const todolistsThunks = {fetchTodolists, addTodolist, removeTodolist, changeTodolistTitle}

//types
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}


