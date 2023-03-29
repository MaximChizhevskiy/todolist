import React, {useCallback, useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../app/store";
import {
    addTodolistTC,
    changeFilterAC, changeTodolistTitleTC,
    fetchTodolistTC,
    removeTodolistTC,
    TodolistDomainType
} from "./todolists-reducer";
import Todolist, {FilterValuesType, TasksStateType} from "./Todolist/Todolist";
import {addTaskTC, changeTaskStatusTC, changeTaskTitleTC, removeTaskTC} from "./tasks-reducer";
import {TaskStatuses} from "../../api/todolist-api";
import {Grid, Paper} from "@mui/material";
import {AddItemForm} from "../../components/AddItemForm/AddItemForm";
import {Navigate} from "react-router-dom";

const TodolistsList: React.FC = (props) => {
    const dispatch = useAppDispatch()
    const todolists = useAppSelector<Array<TodolistDomainType>>(state => state.todolists)
    const tasks = useAppSelector<TasksStateType>(state => state.tasks)
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)

    useEffect(() => {
        if (isLoggedIn) {
            dispatch(fetchTodolistTC())
        }
    }, [])

    // Удаление тасок
    const removeTask = useCallback((todolistId: string, id: string, cb?: () => void) => {
        const thunk = removeTaskTC(todolistId, id, cb)
        dispatch(thunk)
    }, [dispatch])

    // Фильтрация тасок со статусами на кнопках
    const changeFilter = useCallback((filter: FilterValuesType, todolistId: string) => {
        const action = changeFilterAC(todolistId, filter)
        dispatch(action)
    }, [dispatch])


    // Функция настройки добавления тасок
    const addTask = useCallback((title: string, todolistId: string) => {
        const thunk = addTaskTC(title, todolistId)
        dispatch(thunk)
    }, [dispatch])

    // Функция изменения статуса таски (чекбокса)
    const changeTaskStatus = useCallback((taskId: string, status: TaskStatuses, todolistId: string) => {
        const thunk = changeTaskStatusTC(taskId, status, todolistId)
        dispatch(thunk)
    }, [dispatch])

    // Функция изменения статуса тайтла таски
    const changeTaskTitle = useCallback((id: string, newTitle: string, todolistId: string) => {
        const thunk = changeTaskTitleTC(todolistId, id, newTitle)
        dispatch(thunk)
    }, [dispatch])

    // Функция удаления тудулиста
    const removeTodolist = useCallback((todolistId: string) => {
        const thunk = removeTodolistTC(todolistId)
        dispatch(thunk)
    }, [dispatch])

    // Функция добавления тудулиста
    const addTodolist = useCallback((title: string) => {
        const action = addTodolistTC(title)
        dispatch(action)
    }, [dispatch])

    // Функция изменения тайтла тудулиста
    const changeTitleTodolist = useCallback((todolistId: string, newTitle: string) => {
        const thunk = changeTodolistTitleTC(todolistId, newTitle)
        dispatch(thunk)
    }, [dispatch])

    if (!isLoggedIn) {
        return <Navigate to={'/login'}/>
    }

    return (
        <>
            <Grid container style={{padding: '20px'}}>
                <AddItemForm addItem={addTodolist}/>
            </Grid>
            <Grid container spacing={3}>
                {
                    todolists.map(todolist => {
                        let tasksForTodolist = tasks[todolist.id]

                        return (
                            <Grid item key={todolist.id}>
                                <Paper style={{padding: '10px'}} elevation={4}>
                                    <Todolist key={todolist.id}
                                              id={todolist.id}
                                              tasks={tasksForTodolist}
                                              titleTodolist={todolist.title}
                                              entityStatus={todolist.entityStatus}
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
                            </Grid>)
                    })
                }
            </Grid>
        </>
    )
}

export default TodolistsList