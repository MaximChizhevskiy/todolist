import {FormDataType} from "./Login";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {appActions} from "app/app-reducer";
import {clearTasksAndTodolists} from "common/action/common-actions";
import {createAppAsyncThunk, handleServerAppError, handleServerNetworkError} from "common/utils";
import {authAPI} from "features/login/auth-api";
import {ResultCode} from "common/enums";
import {thunkTryCatch} from "common/utils/thunk-try-catch";

const initialState = {
    isLoggedIn: false,
    isInitialized: false
}

export const logIn = createAppAsyncThunk<{ isLoggedIn: boolean }, FormDataType>
('auth/login', async (arg, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI
    return thunkTryCatch(thunkAPI, async () => {
        dispatch(appActions.setAppStatus({status: 'loading'}))
        const res = await authAPI.logIn(arg)
        if (res.resultCode === ResultCode.Success) {
            return {isLoggedIn: true}
        } else {
            const isShowAppError = !res.fieldsErrors.length
            handleServerAppError(res, dispatch, isShowAppError)
            return rejectWithValue(res)
        }
    })
})

export const logOut = createAppAsyncThunk<{ isLoggedIn: boolean }, void>
('auth/logout', async (_, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI
    return thunkTryCatch(thunkAPI, async () => {
        const res = await authAPI.logOut()
        if (res.resultCode === ResultCode.Success) {
            dispatch(clearTasksAndTodolists())
            return {isLoggedIn: false}
        } else {
            handleServerAppError(res, dispatch)
            return rejectWithValue(null)
        }
    })
})

export const initializeApp = createAppAsyncThunk<{ isLoggedIn: boolean }, void>
('auth/initializeApp', async (_, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI
    try {
        const res = await authAPI.me()
        if (res.resultCode === ResultCode.Success) {
            return {isLoggedIn: true}
        } else {
            return rejectWithValue(null)
        }
    } catch (e) {
        handleServerNetworkError(e, dispatch)
        return rejectWithValue(null)
    } finally {
        dispatch(appActions.setAppStatus({status: 'succeeded'}))
        dispatch(authActions.setInitialized({isInitialized: true}))
    }
})

const slice = createSlice({
        name: 'auth',
        initialState,
        reducers: {
            setInitialized: (state, action: PayloadAction<{ isInitialized: boolean }>) => {
                return {...state, isInitialized: action.payload.isInitialized}
        }
    },
    extraReducers: builder => {
    builder
        .addCase(logIn.fulfilled, (state, action) => {
            state.isLoggedIn = action.payload.isLoggedIn
        })
        .addCase(logOut.fulfilled, (state, action) => {
            state.isLoggedIn = action.payload.isLoggedIn
        })
        .addCase(initializeApp.fulfilled, (state, action) => {
            state.isLoggedIn = action.payload.isLoggedIn
        })
}
})

export const authReducer = slice.reducer
export const authActions = slice.actions
export const authThunks = {logIn, logOut, initializeApp}