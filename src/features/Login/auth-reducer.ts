import {Dispatch} from 'redux'
import {SetErrorACType, setStatusAC, SetStatusACType} from "../../app/api-reducer";
import {authAPI, ResultCode} from "../../api/todolist-api";
import {FormDataType} from "./Login";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";

const initialState = {
    isLoggedIn: false,
    isInitialized: false
}
type InitialStateType = typeof initialState

export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.value}
        case 'login/SET-IS-INITIALIZED':
            return {...state, isInitialized: action.value}
        default:
            return state
    }
}
// actions
export const setIsLoggedInAC = (value: boolean) =>
    ({type: 'login/SET-IS-LOGGED-IN', value} as const)
export const setInitializedAC = (value: boolean) =>
    ({type: 'login/SET-IS-INITIALIZED', value} as const)

// thunks
export const meTC = () => async (dispatch: Dispatch<ActionsType>) => {
    dispatch(setStatusAC('loading'))

    try {
        const res = await authAPI.me()
        if (res.resultCode === ResultCode.Ok) {
            dispatch(setIsLoggedInAC(true))
            dispatch(setInitializedAC(true))
            dispatch(setStatusAC('succeeded'))
        } else {
            handleServerAppError(res, dispatch)
            dispatch(setInitializedAC(true))
        }
    } catch (err: any) {
        handleServerNetworkError(err, dispatch)
        dispatch(setInitializedAC(true))
    }
}

export const logInTC = (data: FormDataType) => async (dispatch: Dispatch<ActionsType>) => {
    dispatch(setStatusAC('loading'))

    try {
        const res = await authAPI.logIn(data)
        if (res.resultCode === ResultCode.Ok) {
            dispatch(setIsLoggedInAC(true))
            dispatch(setStatusAC('succeeded'))
        } else {
            handleServerAppError(res, dispatch)
        }
    } catch (err: any) {
        handleServerNetworkError(err, dispatch)
    }
}

export const logOut = () => async (dispatch: Dispatch<ActionsType>) => {
    dispatch(setStatusAC('loading'))

    try {
        const res = await authAPI.logOut()
        if (res.resultCode === ResultCode.Ok) {
            dispatch(setIsLoggedInAC(false))
            dispatch(setStatusAC('succeeded'))
        } else {
            handleServerAppError(res, dispatch)
        }
    } catch (err: any) {
        handleServerNetworkError(err, dispatch)
    }
}

// types
type ActionsType =
    ReturnType<typeof setIsLoggedInAC>
    | ReturnType<typeof setInitializedAC>
    | SetStatusACType
    | SetErrorACType

