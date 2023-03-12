import React, {useCallback} from 'react'
import './App.css'
import Todolist, {FilterValuesType, TasksStateType} from "./Todolist";
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
    TodolistDomainType
} from "./reducers/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./reducers/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./reducers/store";
import {TaskStatuses, TodolistType} from "./api/todolist-api";

function AppWithRedux() {

    const dispatch = useDispatch()
    let todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists)
    let tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)

    // Удаление тасок--------------------------
    const removeTask = useCallback((id: string, todolistId: string) => {
        const action = removeTaskAC(id, todolistId)
        dispatch(action)
    }, [dispatch])

    //------------------------------------
    // Фильтрация тасок со статусами на кнопках
    const changeFilter = useCallback((filter: FilterValuesType, todolistId: string) => {
        const action = changeFilterAC(todolistId, filter)
        dispatch(action)
    }, [dispatch])

    //------------------------------------
    // Функция настройки добавления тасок

    const addTask = useCallback((todolistId: string, titleTask: string) => {
        const action = addTaskAC(todolistId, titleTask)
        dispatch(action)
    }, [dispatch])

    //------------------------------------
    // Функция изменения статуса таски (чекбокса)

    const changeTaskStatus = useCallback((id: string, status: TaskStatuses, todolistId: string) => {
        const action = changeTaskStatusAC(id, status, todolistId)
        dispatch(action)
    }, [dispatch])

    //------------------------------------
    // Функция изменения статуса тайтла таски

    const changeTaskTitle = useCallback((id: string, newTitle: string, todolistId: string) => {
        const action = changeTaskTitleAC(id, newTitle, todolistId)
        dispatch(action)
    }, [dispatch])

    //------------------------------------
    // Функция удаления тудулиста

    const removeTodolist = useCallback((todolistId: string) => {
        const action = removeTodolistAC(todolistId)
        dispatch(action)
    }, [dispatch])

    //----------------------------------
    // Функция добавления тудулиста

    const addTodolist = useCallback((titleTodolist: string) => {
        const action = addTodolistAC(titleTodolist)
        dispatch(action)
    }, [dispatch])

    //----------------------------------
    // Функция изменения тайтла тудулиста

    const changeTitleTodolist = useCallback((todolistId: string, newTitle: string) => {
        const action = changeTitleTodolistAC(todolistId, newTitle)
        dispatch(action)
    }, [dispatch])

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

