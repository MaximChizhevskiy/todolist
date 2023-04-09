import {TasksStateType} from "./Todolist/Todolist";
import {ChangeTaskModelType, ResultCode, TaskStatuses, TaskType, todolistAPI} from "api/todolist-api";
import {Dispatch} from "redux";
import {AppRootStateType} from "app/store";
import {handleServerAppError, handleServerNetworkError} from "utils/error-utils";
import axios, {AxiosError} from "axios";
import {appActions} from "app/app-reducer";
import {todolistActions} from "features/TodolistsList/todolists-reducer";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState: TasksStateType = {}

const slice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        removeTask: (state, action: PayloadAction<{ taskId: string, todolistId: string }>) => {
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex(t => t.id === action.payload.taskId)
            if (index !== -1) tasks.splice(index, 1)
        },
        addTask: (state, action: PayloadAction<{ task: TaskType }>) => {
            const tasks = state[action.payload.task.todoListId]
            tasks.unshift(action.payload.task)
        },
        updateTask: (state, action: PayloadAction<{
            taskId: string,
            model: ChangeTaskModelType,
            todolistId: string
        }>) => {
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex(t => t.id === action.payload.taskId)
            if (index !== -1) {
                tasks[index] = {...tasks[index], ...action.payload.model}
            }
        },
        setTasks: (state, action: PayloadAction<{ tasks: Array<TaskType>, todolistId: string }>) => {
            state[action.payload.todolistId] = action.payload.tasks
        },

    },
    extraReducers: builder => {
        builder.addCase(todolistActions.addTodolist, (state, action) => {
            state[action.payload.todolist.id] = []
        })
            .addCase(todolistActions.removeTodolist, (state, action) => {
                delete state[action.payload.id]
            })
            .addCase(todolistActions.setTodolists, (state, action) => {
                action.payload.todolists.forEach((tl) => {
                    state[tl.id] = []
                })
            })
    }
})

export const tasksReducer = slice.reducer
export const tasksAction = slice.actions


// actions


// thunks
export const fetchTasksTC = (todolistId: string) => (dispatch: Dispatch) => {
    dispatch(appActions.setAppStatus({status: 'loading'}))
    todolistAPI.getTasks(todolistId)
        .then((res) => {
                dispatch(tasksAction.setTasks({tasks: res.data.items, todolistId}))
                dispatch(appActions.setAppStatus({status: 'succeeded'}))
            }
        )
}
export const removeTaskTC = (taskId: string, todolistId: string, cb?: () => void) => (dispatch: Dispatch) => {
    dispatch(appActions.setAppStatus({status: 'loading'}))
    todolistAPI.deleteTask(todolistId, taskId)
        .then(res => {
            if (res.data.resultCode === ResultCode.Ok) {
                dispatch(tasksAction.removeTask({taskId, todolistId}))
                dispatch(appActions.setAppStatus({status: 'succeeded'}))
                cb && cb()
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((err) => {
            handleServerNetworkError(err, dispatch)
        })
}
export const addTaskTC = (title: string, todolistId: string) => async (dispatch: Dispatch) => {
    dispatch(appActions.setAppStatus({status: 'loading'}))
    try {
        const res = await todolistAPI.createTask(todolistId, title)
        if (res.data.resultCode === ResultCode.Ok) {
            const task = res.data.data.item
            const action = tasksAction.addTask({task})
            dispatch(action)
            dispatch(appActions.setAppStatus({status: 'succeeded'}))
        } else {
            handleServerAppError(res.data, dispatch)
        }
    } catch (err) {
        if (axios.isAxiosError<{ message: string }>(err)) {
            const error = err.response ? err.response.data.message : err.message
            handleServerNetworkError(error, dispatch)
        }
    }
}
export const changeTaskStatusTC = (taskId: string, status: TaskStatuses, todolistId: string) =>
    (dispatch: Dispatch, getState: () => AppRootStateType) => {
        const state = getState()
        const task = state.tasks[todolistId].find((t) => t.id === taskId)
        if (task) {
            let model: ChangeTaskModelType = {
                title: task.title,
                deadline: task.deadline,
                description: task.description,
                startDate: task.startDate,
                priority: task.priority,
                status: status
            }
            dispatch(appActions.setAppStatus({status: 'loading'}))
            todolistAPI.changeTaskStatus(todolistId, taskId, model)
                .then((res) => {
                    if (res.data.resultCode === ResultCode.Ok) {
                        const action = tasksAction.updateTask({taskId, model, todolistId})
                        dispatch(action)
                        dispatch(appActions.setAppStatus({status: 'succeeded'}))
                    } else {
                        handleServerAppError(res.data, dispatch)
                    }
                })
                .catch((error) => {
                    handleServerNetworkError(error, dispatch)
                })

        }
    }
export const changeTaskTitleTC = (todolistId: string, taskId: string, newTitle: string) =>
    (dispatch: Dispatch, getState: () => AppRootStateType) => {
        const state = getState()
        const task = state.tasks[todolistId].find((t) => t.id === taskId)
        if (task) {
            let model: ChangeTaskModelType = {
                title: newTitle,
                deadline: task.deadline,
                description: task.description,
                startDate: task.startDate,
                priority: task.priority,
                status: task.status
            }
            dispatch(appActions.setAppStatus({status: 'loading'}))
            todolistAPI.updateTaskTitle(todolistId, taskId, model)
                .then((res) => {
                    if (res.data.resultCode === ResultCode.Ok) {
                        const action = tasksAction.updateTask({taskId, model, todolistId})
                        dispatch(action)
                        dispatch(appActions.setAppStatus({status: 'succeeded'}))
                    } else {
                        handleServerAppError(res.data, dispatch)
                    }
                })
                .catch((err: AxiosError<{ test: string, message: string }>) => {
                    const error = err.response?.data ? err.response.data.message : err.message
                    handleServerNetworkError(error, dispatch)
                })

        }
    }


