import {Dispatch} from 'redux'

import {authAPI, ResultCode} from "api/todolist-api";
import {FormDataType} from "./Login";
import {handleServerAppError, handleServerNetworkError} from "utils/error-utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {appActions} from "app/app-reducer";
import {clearTasksAndTodolists} from "common/action/common.action";

const initialState = {
    isLoggedIn: false,
    isInitialized: false
}

const slice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setIsLoggedIn: (state, action: PayloadAction<{ isLoggedIn: boolean }>) => {
            return {...state, isLoggedIn: action.payload.isLoggedIn}
        },
        setInitialized: (state, action: PayloadAction<{ isInitialized: boolean }>) => {
            return {...state, isInitialized: action.payload.isInitialized}
        }
    }
})

export const authReducer = slice.reducer
export const authActions = slice.actions

// thunks
export const meTC = () => async (dispatch: Dispatch) => {
    dispatch(appActions.setAppStatus({status: 'loading'}))

    try {
        const res = await authAPI.me()
        if (res.resultCode === ResultCode.Ok) {
            dispatch(authActions.setIsLoggedIn({isLoggedIn:true}))
            dispatch(authActions.setInitialized({isInitialized: true}))
            dispatch(appActions.setAppStatus({status: 'succeeded'}))
        } else {
            handleServerAppError(res, dispatch)
            dispatch(authActions.setInitialized({isInitialized: true}))
        }
    } catch (err: any) {
        handleServerNetworkError(err, dispatch)
        dispatch(authActions.setInitialized({isInitialized: true}))
    }
}

export const logInTC = (data: FormDataType) => async (dispatch: Dispatch) => {
    dispatch(appActions.setAppStatus({status: 'loading'}))

    try {
        const res = await authAPI.logIn(data)
        if (res.resultCode === ResultCode.Ok) {
            dispatch(authActions.setIsLoggedIn({isLoggedIn:true}))
            dispatch(appActions.setAppStatus({status: 'succeeded'}))
        } else {
            handleServerAppError(res, dispatch)
        }
    } catch (err: any) {
        handleServerNetworkError(err, dispatch)
    }
}

export const logOut = () => async (dispatch: Dispatch) => {
    dispatch(appActions.setAppStatus({status: 'loading'}))

    try {
        const res = await authAPI.logOut()
        if (res.resultCode === ResultCode.Ok) {
            dispatch(authActions.setIsLoggedIn({isLoggedIn: false}))
            dispatch(clearTasksAndTodolists())
            dispatch(appActions.setAppStatus({status: 'succeeded'}))
        } else {
            handleServerAppError(res, dispatch)
        }
    } catch (err: any) {
        handleServerNetworkError(err, dispatch)
    }
}
