import React, {useEffect} from "react";
import {useAppSelector} from "app/store";
import {TasksStateType, Todolist} from "./todolists/Todolist/Todolist";
import {Grid, Paper} from "@mui/material";
import {Navigate} from "react-router-dom";
import {AddItemForm} from "common/components";
import {TodolistDomainType, todolistsThunks} from "features/todolists-list/todolists/todolists-reducer";
import {useActions} from "common/hooks";
import {selectTasks} from "features/todolists-list/tasks/tasks-selectors";
import {selectIsLoggedIn} from "features/login/auth-selectors";
import {selectTodolists} from "features/todolists-list/todolists/todolists-selectors";

const TodolistsList: React.FC = () => {

    const todolists = useAppSelector<Array<TodolistDomainType>>(selectTodolists)
    const tasks = useAppSelector<TasksStateType>(selectTasks)
    const isLoggedIn = useAppSelector(selectIsLoggedIn)

    const {addTodolist: addTodolistThunk, fetchTodolists} = useActions(todolistsThunks)

    useEffect(() => {
        if (isLoggedIn) {
            fetchTodolists({})
        }
    }, [])

    // Функция добавления тудулиста
    const addTodolist = (title: string) => {
        return addTodolistThunk(title).unwrap()
    }

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
                                              tasks={tasksForTodolist}
                                              todolist={todolist}
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