import React, {useReducer} from 'react'
import './App.css'
import Todolist, {FilterValuesType} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {Container, Grid, Paper} from "@mui/material";
import {
    addTodolistAC,
    changeFilterAC,
    changeTitleTodolistAC,
    removeTodolistAC,
    todolistsReducer
} from "./reducers/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./reducers/tasks-reducer";
import {TaskPriorities, TaskStatuses} from "./api/todolist-api";

function AppWithReducers() {
    let todolistId1 = v1()
    let todolistId2 = v1()

    let [todolists, dispatchToTodolistsReducer] = useReducer(todolistsReducer,
        [
            {id: todolistId1, titleTodolist: 'What to learn', filter: 'all', addedDate: '', order: 0},
            {id: todolistId2, titleTodolist: 'What to buy', filter: 'all', addedDate: '', order: 0}
        ]
    )

    let [tasksObj, dispatchToTasksReducer] = useReducer(tasksReducer, {
        [todolistId1]: [
            {
                id: v1(), titleTask: "HTML&CSS", status: TaskStatuses.Completed,
                todoListId: todolistId1,
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
                description: ''
            },
            {id: v1(), titleTask: "JS", status: TaskStatuses.Completed,
                todoListId: todolistId1,
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
                description: ''},
            {id: v1(), titleTask: "ReactJS", status: TaskStatuses.New,
                todoListId: todolistId1,
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
                description: ''}],
        [todolistId2]: [
            {id: v1(), titleTask: "Laptop", status: TaskStatuses.Completed, todoListId: todolistId2,
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
                description: ''},
            {id: v1(), titleTask: "Keyboard", status: TaskStatuses.New, todoListId: todolistId2,
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
                description: ''},
            {id: v1(), titleTask: "Playstation 5", status: TaskStatuses.New, todoListId: todolistId2,
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
                description: ''}]
    })

    // Удаление тасок--------------------------
    function removeTask(id: string, todolistId: string) {
        const action = removeTaskAC(id, todolistId)
        dispatchToTasksReducer(action)

    }

    //------------------------------------
    // Фильтрация тасок со статусами на кнопках
    function changeFilter(filter: FilterValuesType, todolistId: string) {
        const action = changeFilterAC(todolistId, filter)
        dispatchToTodolistsReducer(action)
    }

    //------------------------------------
    // Функция настройки добавления тасок
    function addTask(todolistId: string, titleTask: string) {
        const action = addTaskAC(todolistId, titleTask)
        dispatchToTasksReducer(action)
    }

    //------------------------------------
    // Функция изменения статуса таски (чекбокса)
    function changeTaskStatus(id: string, status: TaskStatuses, todolistId: string) {
        const action = changeTaskStatusAC(id, status, todolistId)
        dispatchToTasksReducer(action)
    }

    //------------------------------------
    // Функция изменения статуса тайтла таски
    function changeTaskTitle(id: string, newTitle: string, todolistId: string) {
        const action = changeTaskTitleAC(id, newTitle, todolistId)
        dispatchToTasksReducer(action)
    }

    //------------------------------------
    // Функция удаления тудулиста
    function removeTodolist(todolistId: string) {
        const action = removeTodolistAC(todolistId)
        dispatchToTodolistsReducer(action)
        dispatchToTasksReducer(action)
    }

    //----------------------------------
    // Функция добавления тудулиста
    function addTodolist(titleTodolist: string) {
        const action = addTodolistAC(titleTodolist)
        dispatchToTodolistsReducer(action)
        dispatchToTasksReducer(action)
    }

    //----------------------------------
    // Функция изменения тайтла тудулиста
    function changeTitleTodolist(todolistId: string, newTitle: string) {
        const action = changeTitleTodolistAC(todolistId, newTitle)
        dispatchToTodolistsReducer(action)
    }

    return (
        <div className={'App'}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="menu">
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6">
                        Todolist
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: '20px'}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {
                        todolists.map(todolist => {
                            let tasksForTodolist = tasksObj[todolist.id]

                            if (todolist.filter === 'active') {
                                tasksForTodolist = tasksForTodolist.filter(task => task.status === TaskStatuses.New)
                            }
                            if (todolist.filter === 'completed') {
                                tasksForTodolist = tasksForTodolist.filter(task => task.status === TaskStatuses.Completed)
                            }
                            return <Grid item>
                                <Paper style={{padding: '10px'}} elevation={4}>
                                    <Todolist key={todolist.id}
                                              id={todolist.id}
                                              tasks={tasksForTodolist}
                                              titleTodolist={todolist.titleTodolist}
                                              removeTask={removeTask}
                                              changeFilter={changeFilter}
                                              addTask={addTask}
                                              changeTaskStatus={changeTaskStatus}
                                              changeTaskTitle={changeTaskTitle}
                                              filter={todolist.filter}
                                              removeTodolist={removeTodolist}
                                              changeTitleTodolist={changeTitleTodolist}
                                    />
                                </Paper>
                            </Grid>
                        })
                    }
                </Grid>
            </Container>
        </div>
    )
}

export default AppWithReducers;

