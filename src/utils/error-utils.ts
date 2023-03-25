import {Dispatch} from 'redux'
import {setErrorAC, SetErrorACType, setStatusAC, SetStatusACType} from "../app/api-reducer";
import {TasksResponseType} from "../api/todolist-api";


// generic function
export const handleServerAppError = <T>(data: TasksResponseType<T>, dispatch: ErrorUtilsDispatchType) => {
    if (data.messages.length) {
        dispatch(setErrorAC(data.messages[0]))
    } else {
        dispatch(setErrorAC('Some error occurred'))
    }
    dispatch(setStatusAC('failed'))
}

export const handleServerNetworkError = (error: string, dispatch: ErrorUtilsDispatchType) => {
    dispatch(setErrorAC(error))
    dispatch(setStatusAC('failed'))
}


type ErrorUtilsDispatchType = Dispatch<SetErrorACType | SetStatusACType>
