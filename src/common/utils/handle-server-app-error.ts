import {Dispatch} from "redux";
import {appActions} from "app/app-reducer";
import {TasksResponseType} from "features/TodolistsList/todolists-api";

export const handleServerAppError = <T>(data: TasksResponseType<T>, dispatch: Dispatch) => {
    if (data.messages.length) {
        dispatch(appActions.setAppError({error: data.messages[0]}))
    } else {
        dispatch(appActions.setAppError({error: 'Some error occurred'}))
    }
    dispatch(appActions.setAppStatus({status:'failed'}))
}