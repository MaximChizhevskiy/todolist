import React, {useCallback, useEffect} from "react";
import {useAppSelector} from "app/store";

import Todolist, {FilterValuesType, TasksStateType} from "./Todolist/Todolist";
import {tasksThunks} from "./tasks-reducer";
import {Grid, Paper} from "@mui/material";
import {Navigate} from "react-router-dom";
import {AddItemForm} from "common/components";
import {useAppDispatch} from "common/hooks/useAppDispatch";
import {TaskStatuses} from "common/enums/common-enums";
import {todolistActions, TodolistDomainType, todolistsThunks} from "./todolists-reducer";

const TodolistsList: React.FC = (props) => {
    const dispatch = useAppDispatch()
    const todolists = useAppSelector<Array<TodolistDomainType>>(state => state.todolists)
    const tasks = useAppSelector<TasksStateType>(state => state.tasks)
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)

    useEffect(() => {
        if (isLoggedIn) {
            dispatch(todolistsThunks.fetchTodolists())
        }
    }, [])

    // Удаление тасок
    const removeTask = useCallback((todolistId: string, taskId: string) => {
        dispatch(tasksThunks.removeTaskTC({todolistId, taskId}))
    }, [dispatch])

    // Фильтрация тасок со статусами на кнопках
    const changeFilter = useCallback((filter: FilterValuesType, id: string) => {
        dispatch(todolistActions.changeFilter({id, filter}))
    }, [dispatch])


    // Функция настройки добавления тасок
    const addTask = useCallback((title: string, todolistId: string) => {
        dispatch(tasksThunks.addTaskTC({title, todolistId}))
    }, [dispatch])

    // Функция изменения статуса таски (чекбокса)
    const changeTaskStatus = useCallback((taskId: string, status: TaskStatuses, todolistId: string) => {
        dispatch(tasksThunks.changeTaskTC({taskId, domainModel: {status}, todolistId}))
    }, [dispatch])

    // Функция изменения статуса тайтла таски
    const changeTaskTitle = useCallback((taskId: string, title: string, todolistId: string) => {
        dispatch(tasksThunks.changeTaskTC({taskId, domainModel: {title}, todolistId}))
    }, [dispatch])

    // Функция удаления тудулиста
    const removeTodolist = useCallback((todolistId: string) => {
        dispatch(todolistsThunks.removeTodolist(todolistId))
    }, [dispatch])

    // Функция добавления тудулиста
    const addTodolist = useCallback((title: string) => {
        dispatch(todolistsThunks.addTodolist(title))
    }, [dispatch])

    // Функция изменения тайтла тудулиста
    const changeTitleTodolist = useCallback((todolistId: string, title: string) => {
        dispatch(todolistsThunks.changeTodolistTitle({todolistId, title}))
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