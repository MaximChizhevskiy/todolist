import {tasksAction, tasksReducer} from './tasks-reducer'
import {TaskPriorities, TaskStatuses} from "api/todolist-api";
import {TasksStateType} from "./Todolist/Todolist";
import {v1} from "uuid";
import {todolistActions} from "features/TodolistsList/todolists-reducer";

let startState: TasksStateType = {}

beforeEach(() => {
    startState = {
        'todolistId1': [
            {id: '1', title: 'CSS', status: TaskStatuses.New,
                todoListId: "todolistId1",
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
                description: ''},
            {id: '2', title: 'JS', status: TaskStatuses.Completed,
                todoListId: "todolistId1",
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
                description: ''},
            {id: '3', title: 'React', status: TaskStatuses.New,
                todoListId: "todolistId1",
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
                description: ''}
        ],
        'todolistId2': [
            {id: '1', title: 'bread', status: TaskStatuses.New,
                todoListId: "todolistId2",
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
                description: ''},
            {id: '2', title: 'milk', status: TaskStatuses.Completed,
                todoListId: "todolistId2",
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
                description: ''},
            {id: '3', title: 'tea', status: TaskStatuses.New,
                todoListId: "todolistId2",
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
                description: ''}
        ]
    }
})

test('correct task should be deleted from correct array', () => {
    const action = tasksAction.removeTask({taskId: '2', todolistId: 'todolistId2'})
    const endState = tasksReducer(startState, action)

    expect(endState).toEqual({
        'todolistId1': [
            {id: '1', title: 'CSS', status: TaskStatuses.New,
                todoListId: "todolistId1",
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
                description: ''},
            {id: '2', title: 'JS', status: TaskStatuses.Completed,
                todoListId: "todolistId1",
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
                description: ''},
            {id: '3', title: 'React', status: TaskStatuses.New,
                todoListId: "todolistId1",
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
                description: ''}
        ],
        'todolistId2': [
            {id: '1', title: 'bread', status: TaskStatuses.New,
                todoListId: "todolistId2",
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
                description: ''},
            {id: '3', title: 'tea', status: TaskStatuses.New,
                todoListId: "todolistId2",
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
                description: ''}
        ]
    })
})

test('correct task should be added to correct array', () => {
    const action = tasksAction.addTask({
    task: {id: "id", title: "juice", status: TaskStatuses.New,
        todoListId: "todolistId2",
        startDate: '',
        deadline: '',
        addedDate: '',
        order: 0,
        priority: TaskPriorities.Low,
        description: ''}
    })

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId2'].length).toBe(4)
    expect(endState['todolistId2'][0].id).toBeDefined()
    expect(endState['todolistId2'][0].title).toBe('juice')
    expect(endState['todolistId2'][0].status).toBe(TaskStatuses.New)
})


test('status of specified task should be changed', () => {
    const action = tasksAction.updateTask(
        {taskId: '2', model: {status: TaskStatuses.New}, todolistId:'todolistId2'})
    const endState = tasksReducer(startState, action)

    expect(endState['todolistId2'][1].status).toBe(TaskStatuses.New)
    expect(endState['todolistId1'][1].status).toBe(TaskStatuses.Completed)
})

test('Title of title task should be changed', () => {
    const action = tasksAction.updateTask({taskId: '1', model: {title: 'eggs'}, todolistId: 'todolistId2'})
    const endState = tasksReducer(startState, action)

    expect(endState['todolistId2'][0].title).toBe('eggs')
    expect(endState['todolistId1'][0].title).toBe('CSS')
})

test('new array should be added when new todolist is added', () => {
    const action = todolistActions.addTodolist({
    todolist: {id: v1(),
        addedDate: "",
        order: 0,
        title: "New Todolist"}
    })

    const endState = tasksReducer(startState, action)
    const keys = Object.keys(endState)
    const newKey = keys.find(k => k !== 'todolistId1' && k !== 'todolistId2')
    if (!newKey) {
        throw Error('new key should be added')
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})

test('property with todolistId should be deleted', () => {
    const action = todolistActions.removeTodolist({id: 'todolistId2'})
    const endState = tasksReducer(startState, action)
    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState['todolistId2']).not.toBeDefined()
})
