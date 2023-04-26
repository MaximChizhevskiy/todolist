import {FormDataType} from "features/Login/Login";
import {instance} from "api/common-api";
import {TasksResponseType} from "features/TodolistsList/todolists-api";

export const authAPI = {
    me() {
        return instance.get<TasksResponseType<{userId: number}>>(`auth/me`)
            .then(res => {
                return res.data
            })
    },
    logIn(data: FormDataType) {
        return instance.post<TasksResponseType<{userId: number}>>(`auth/login`, data)
            .then(res => {
                return res.data
            })
    },
    logOut() {
        return instance.delete<TasksResponseType>(`auth/login`)
            .then(res => {
                return res.data
            })
    }
}