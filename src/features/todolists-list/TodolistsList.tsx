import React, {useCallback, useEffect} from "react";
import {useAppSelector} from "app/store";
import Todolist, {FilterValuesType, TasksStateType} from "./todolists/Todolist/Todolist";
import {tasksThunks} from "features/todolists-list/tasks/tasks-reducer";
import {Grid, Paper} from "@mui/material";
import {Navigate} from "react-router-dom";
import {AddItemForm} from "common/components";
import {
    todolistActions,
    TodolistDomainType,
    todolistsThunks
} from "features/todolists-list/todolists/todolists-reducer";
import {useActions} from "common/hooks";
import {selectTasks} from "features/todolists-list/tasks/tasks-selectors";
import {selectIsLoggedIn} from "features/login/auth-selectors";
import {selectTodolists} from "features/todolists-list/todolists/todolists-selectors";

const TodolistsList: React.FC = () => {

    const todolists = useAppSelector<Array<TodolistDomainType>>(selectTodolists)
    const tasks = useAppSelector<TasksStateType>(selectTasks)
    const isLoggedIn = useAppSelector(selectIsLoggedIn)

    const {removeTodolist: removeTodolistThunk, addTodolist: addTodolistThunk, fetchTodolists,
        changeTodolistTitle: changeTodolistTitleThunk} = useActions(todolistsThunks)

    const {addTaskTC: addTaskThunk} = useActions(tasksThunks)
    const {changeFilter: changeFilterThunk} = useActions(todolistActions)

    useEffect(() => {
        if (isLoggedIn) {
            fetchTodolists({})
        }
    }, [])

    // Фильтрация тасок со статусами на кнопках
    const changeFilter = useCallback((filter: FilterValuesType, id: string) => {
        changeFilterThunk({id, filter})
    }, [])

    // Функция настройки добавления тасок
    const addTask = useCallback((title: string, todolistId: string) => {
        addTaskThunk({title, todolistId})
    }, [])

    // Функция удаления тудулиста
    const removeTodolist = useCallback((todolistId: string) => {
        removeTodolistThunk(todolistId)
    }, [])

    // Функция добавления тудулиста
    const addTodolist = useCallback((title: string) => {
        addTodolistThunk(title)
    }, [])

    // Функция изменения тайтла тудулиста
    const changeTitleTodolist = useCallback((todolistId: string, title: string) => {
        changeTodolistTitleThunk({todolistId, title})
    }, [])

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
                                              changeFilter={changeFilter}
                                              addTask={addTask}
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