import React from 'react'
import './App.css'
import Todolist, {FilterValuesType, TasksStateType, TodolistsType} from "./Todolist";
import {AddItemForm} from "./AddItemForm";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {Container, Grid, Paper} from "@mui/material";
import {addTodolistAC, changeFilterAC, changeTitleTodolistAC, removeTodolistAC} from "./reducers/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./reducers/tasks-reducer";

import {AppRootStateType} from "./reducers/store";
import {useDispatch, useSelector} from "react-redux";

function AppWithRedux() {

    const dispatch = useDispatch()
    let todolists = useSelector<AppRootStateType, Array<TodolistsType>>(state => state.todolists)
    let tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)


    // Удаление тасок--------------------------
    function removeTask(id: string, todolistId: string) {
        const action = removeTaskAC(id, todolistId)
        dispatch(action)

    }

    //------------------------------------
    // Фильтрация тасок со статусами на кнопках
    function changeFilter(filter: FilterValuesType, todolistId: string) {
        const action = changeFilterAC(todolistId, filter)
        dispatch(action)
    }

    //------------------------------------
    // Функция настройки добавления тасок
    function addTask(todolistId: string, titleTask: string) {
        const action = addTaskAC(todolistId, titleTask)
        dispatch(action)
    }

    //------------------------------------
    // Функция изменения статуса таски (чекбокса)
    function changeTaskStatus(id: string, isDone: boolean, todolistId: string) {
        const action = changeTaskStatusAC(id, isDone, todolistId)
        dispatch(action)
    }

    //------------------------------------
    // Функция изменения статуса тайтла таски
    function changeTaskTitle(id: string, newTitle: string, todolistId: string) {
        const action = changeTaskTitleAC(id, newTitle, todolistId)
        dispatch(action)
    }

    //------------------------------------
    // Функция удаления тудулиста
    function removeTodolist(todolistId: string) {
        const action = removeTodolistAC(todolistId)
        dispatch(action)
    }

    //----------------------------------
    // Функция добавления тудулиста
    function addTodolist(titleTodolist: string) {
        const action = addTodolistAC(titleTodolist)
        dispatch(action)
    }

    //----------------------------------
    // Функция изменения тайтла тудулиста
    function changeTitleTodolist(todolistId: string, newTitle: string) {
        const action = changeTitleTodolistAC(todolistId, newTitle)
        dispatch(action)
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
                            let tasksForTodolist = tasks[todolist.id]

                            if (todolist.filter === 'active') {
                                tasksForTodolist = tasksForTodolist.filter(task => !task.isDone)
                            }
                            if (todolist.filter === 'completed') {
                                tasksForTodolist = tasksForTodolist.filter(task => task.isDone)
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

export default AppWithRedux;

