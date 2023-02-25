import React from 'react';
import {Provider} from "react-redux";
import {AppRootStateType, store} from "./store";
import {combineReducers, createStore, legacy_createStore} from 'redux'
import { v1 } from 'uuid'
import {tasksReducer} from "./tasks-reducer";
import {todolistsReducer} from "./todolists-reducer";



const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
})

const initialGlobalState = {
    todolists: [
        {id: 'todolistId1', titleTodolist: 'What to learn', filter: 'all'},
        {id: 'todolistId2', titleTodolist: 'What to buy', filter: 'all'}
    ],
    tasks: {
        ['todolistId1']: [
            {id: v1(), titleTask: 'HTML&CSS', isDone: true},
            {id: v1(), titleTask: 'JS', isDone: true}
        ],
        ['todolistId2']: [
            {id: v1(), titleTask: 'Milk', isDone: true},
            {id: v1(), titleTask: 'React Book', isDone: true}
        ]
    }
}

export const storyBookStore = legacy_createStore(rootReducer, initialGlobalState as AppRootStateType)

export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => {
    return <Provider store={store}>{storyFn()}</Provider>
};

