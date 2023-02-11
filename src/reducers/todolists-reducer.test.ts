import {
    addTodolistAC,
    changeFilterAC,
    changeTitleTodolistAC,
    removeTodolistAC,
    todolistsReducer
} from './todolists-reducer'
import { v1 } from 'uuid'
import {FilterValuesType, TodolistsType} from "../Todolist";


let todolistId1: string
let todolistId2: string
let startState: Array<TodolistsType>

beforeEach(() => {
     todolistId1 = v1()
     todolistId2 = v1()
     startState = [
        {id: todolistId1, titleTodolist: 'What to learn', filter: 'all'},
        {id: todolistId2, titleTodolist: 'What to buy', filter: 'all'}
    ]
})

test('correct todolist should be removed', () => {
    const endState = todolistsReducer(startState, removeTodolistAC(todolistId1))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId2)
})

test('correct todolist should be added', () => {
    let newTodolistTitle = 'New Todolist'

   const endState = todolistsReducer(startState, addTodolistAC(newTodolistTitle))

    expect(endState.length).toBe(3)
    expect(endState[0].titleTodolist).toBe(newTodolistTitle)
})


test('correct todolist should change its name', () => {
    let newTodolistTitle = 'New Todolist'

    const action = {
        type: 'CHANGE-TODOLIST-TITLE',
        id: todolistId2,
        titleTodolist: newTodolistTitle
    }

    const endState = todolistsReducer(startState, changeTitleTodolistAC(todolistId2, newTodolistTitle))

    expect(endState[0].titleTodolist).toBe('What to learn')
    expect(endState[1].titleTodolist).toBe(newTodolistTitle)
})

test('correct filter of todolist should be changed', () => {
    let newFilter: FilterValuesType = 'completed'

    const action = {
        type: 'CHANGE-TODOLIST-FILTER',
        id: todolistId2,
        filter: newFilter
    }

    const endState = todolistsReducer(startState, changeFilterAC(todolistId2, newFilter))

    expect(endState[0].filter).toBe('all')
    expect(endState[1].filter).toBe(newFilter)
})
