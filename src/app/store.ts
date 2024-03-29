import { tasksReducer } from "features/todolists-list/tasks/tasks-reducer"
import { todolistsReducer } from "features/todolists-list/todolists/todolists-reducer"
import { AnyAction, applyMiddleware, combineReducers, legacy_createStore } from "redux"
import thunk, { ThunkDispatch } from "redux-thunk"
import { TypedUseSelectorHook, useSelector } from "react-redux"
import { appReducer } from "app/app-reducer"
import { authReducer } from "features/login/auth-reducer"
import { configureStore } from "@reduxjs/toolkit"

// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
const rootReducer = combineReducers({
  tasks: tasksReducer,
  todolists: todolistsReducer,
  app: appReducer,
  auth: authReducer,
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunk),
})
// непосредственно создаём store
export const _store = legacy_createStore(rootReducer, applyMiddleware(thunk))
// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof rootReducer>
export type AppThunkDispatch = ThunkDispatch<AppRootStateType, any, AnyAction>

export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector

// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store
