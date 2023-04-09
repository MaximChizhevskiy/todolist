import {Dispatch} from 'redux'
import {appActions} from "app/app-reducer";
import {TasksResponseType} from "api/todolist-api";


// generic function
export const handleServerAppError = <T>(data: TasksResponseType<T>, dispatch: Dispatch) => {
    if (data.messages.length) {
        dispatch(appActions.setAppError({error: data.messages[0]}))
    } else {
        dispatch(appActions.setAppError({error: 'Some error occurred'}))
    }
    dispatch(appActions.setAppStatus({status:'failed'}))
}

export const handleServerNetworkError = (error: string, dispatch: Dispatch) => {
    dispatch(appActions.setAppError({error}))
    dispatch(appActions.setAppStatus({status: 'failed'}))
}
