import {
    todolistActions,
    TodolistDomainType,
    todolistsReducer, todolistsThunks
} from './todolists-reducer'
import {v1} from 'uuid'
import {FilterValuesType} from "./Todolist/Todolist";
import {TodolistType} from "features/TodolistsList/todolists-api";
import { RequestStatusType } from 'app/app-reducer';

let todolistId1: string
let todolistId2: string
let startState: Array<TodolistDomainType>

beforeEach(() => {
     todolistId1 = v1()
     todolistId2 = v1()
     startState = [
        {id: todolistId1, title: 'What to learn', filter: 'all', addedDate: '', order: 0, entityStatus: "idle"},
        {id: todolistId2, title: 'What to buy', filter: 'all', addedDate: '', order: 0, entityStatus: "idle"}
    ]
})

test('correct todolist should be removed', () => {
    const endState = todolistsReducer(startState, todolistsThunks.removeTodolist.fulfilled(
        {id: todolistId1},'requestId', todolistId1))
    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId2)
})

test('correct todolist should be added', () => {
    let todolist: TodolistType = {
        id: 'any id',
        title: 'New Todolist',
        order: 0,
        addedDate: ''
    }

   const endState = todolistsReducer(startState, todolistsThunks.addTodolist.fulfilled(
       {todolist}, 'requiredId', todolist.title))

    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe(todolist.title)
})


test('correct todolist should change its name', () => {
    let newTodolistTitle = 'New Todolist'

    const args = {todolistId: todolistId2, title: newTodolistTitle}

    const action = todolistsThunks.changeTodolistTitle.fulfilled(args, 'requestId', args)

    const endState = todolistsReducer(startState, action)

    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe(newTodolistTitle)
})

test('correct filter of todolist should be changed', () => {
    let newFilter: FilterValuesType = 'completed'

    const action = todolistActions.changeFilter({id: todolistId2, filter: newFilter})

    const endState = todolistsReducer(startState, action)

    expect(endState[0].filter).toBe('all')
    expect(endState[1].filter).toBe(newFilter)
})

test('correct entity status of todolist should be changed', () => {
    let newStatus: RequestStatusType = 'loading'

    const action = todolistActions.changeEntityStatus({id: todolistId2, entityStatus: newStatus})

    const endState = todolistsReducer(startState, action)

    expect(endState[0].entityStatus).toBe('idle')
    expect(endState[1].entityStatus).toBe(newStatus)
})
