import React from 'react';
import {Provider} from "react-redux";
import {AppRootStateType, store} from "./store";
import {combineReducers, legacy_createStore} from 'redux'
import {v1} from 'uuid'
import {tasksReducer} from "./tasks-reducer";
import {todolistId1, todolistId2, todolistsReducer} from "./todolists-reducer";
import {TaskPriorities, TaskStatuses} from "../api/todolist-api";


const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
})

const initialGlobalState = {
    todolists: [
        {id: 'todolistId1', titleTodolist: 'What to learn', filter: 'all', addedDate: '', order: 0},
        {id: 'todolistId2', titleTodolist: 'What to buy', filter: 'all', addedDate: '', order: 0}
    ],
    tasks: {
        ['todolistId1']: [
            {id: v1(), titleTask: 'HTML&CSS',status: TaskStatuses.Completed,
                todoListId: "todolistId1",
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
                description: ''},
            {id: v1(), titleTask: 'JS', status: TaskStatuses.Completed,
                todoListId: "todolistId1",
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
                description: ''}
        ],
        ['todolistId2']: [
            {id: v1(), titleTask: 'Milk', status: TaskStatuses.Completed,
                todoListId: "todolistId2",
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
                description: ''},
            {id: v1(), titleTask: 'React Book', status: TaskStatuses.Completed,
                todoListId: "todolistId2",
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
                description: ''}
        ]
    }
}

export const storyBookStore = legacy_createStore(rootReducer, initialGlobalState as AppRootStateType)

export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => {
    return <Provider store={store}>{storyFn()}</Provider>
};

