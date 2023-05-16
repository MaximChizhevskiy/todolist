import React, {useReducer} from 'react'
import '../app/App.css'
import {FilterValuesType, Todolist} from "features/todolists-list/todolists/Todolist/Todolist";
import {v1} from "uuid";
import {AddItemForm} from "common/components/AddItemForm/AddItemForm";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {Container, Grid, Paper} from "@mui/material";
import {todolistActions, todolistsReducer} from "features/todolists-list/todolists/todolists-reducer";
import {tasksAction, tasksReducer} from "features/todolists-list/tasks/tasks-reducer";
import {TaskPriorities, TaskStatuses} from "common/enums/common-enums";

function AppWithReducers() {
    let todolistId1 = v1()
    let todolistId2 = v1()

    let [todolists, dispatchToTodolistsReducer] = useReducer(todolistsReducer,
        [
            {id: todolistId1, title: 'What to learn', filter: 'all', addedDate: '', order: 0, entityStatus: "idle"},
            {id: todolistId2, title: 'What to buy', filter: 'all', addedDate: '', order: 0, entityStatus: "idle"}
        ]
    )

    let [tasksObj, dispatchToTasksReducer] = useReducer(tasksReducer, {
        [todolistId1]: [
            {
                id: v1(), title: "HTML&CSS", status: TaskStatuses.Completed,
                todoListId: todolistId1,
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
                description: ''
            },
            {
                id: v1(), title: "JS", status: TaskStatuses.Completed,
                todoListId: todolistId1,
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
                description: ''
            },
            {
                id: v1(), title: "ReactJS", status: TaskStatuses.New,
                todoListId: todolistId1,
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
                description: ''
            }],
        [todolistId2]: [
            {
                id: v1(), title: "Laptop", status: TaskStatuses.Completed, todoListId: todolistId2,
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
                description: ''
            },
            {
                id: v1(), title: "Keyboard", status: TaskStatuses.New, todoListId: todolistId2,
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
                description: ''
            },
            {
                id: v1(), title: "Playstation 5", status: TaskStatuses.New, todoListId: todolistId2,
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
                description: ''
            }]
    })

    // Удаление тасок--------------------------
    function removeTask(taskId: string, todolistId: string) {
        const action = tasksAction.removeTask({taskId, todolistId})
        dispatchToTasksReducer(action)

    }

    //------------------------------------
    // Фильтрация тасок со статусами на кнопках
    function changeFilter(filter: FilterValuesType, todolistId: string) {
        dispatchToTodolistsReducer(todolistActions.changeFilter({filter, id: todolistId}))
    }

    //------------------------------------
    // Функция настройки добавления тасок
    function addTask(todolistId: string, title: string) {
        const action = tasksAction.addTask({
        task: {id: "id",
            title: title,
            status: TaskStatuses.New,
            todoListId: todolistId,
            startDate: '',
            deadline: '',
            addedDate: '',
            order: 0,
            priority: TaskPriorities.Low,
            description: ''}
        })
        dispatchToTasksReducer(action)
    }

    //------------------------------------
    // Функция изменения статуса таски (чекбокса)
    function changeTaskStatus(taskId: string, status: TaskStatuses, todolistId: string) {
        dispatchToTasksReducer(tasksAction.updateTask({taskId, model: {status}, todolistId}))
    }

    //------------------------------------
    // Функция изменения статуса тайтла таски
    function changeTaskTitle(taskId: string, title: string, todolistId: string) {
        const action = tasksAction.updateTask({taskId, model: {title}, todolistId})
        dispatchToTasksReducer(action)
    }

    //------------------------------------
    // Функция удаления тудулиста
    function removeTodolist(todolistId: string) {
        const action = todolistActions.removeTodolist({id: todolistId})
        dispatchToTodolistsReducer(action)
        dispatchToTasksReducer(action)
    }

    //----------------------------------
    // Функция добавления тудулиста
    function addTodolist(title: string) {
        const action = todolistActions.addTodolist({
        todolist: {id: v1(),
            addedDate: "",
            order: 0,
            title: title}
        })
        dispatchToTodolistsReducer(action)
        dispatchToTasksReducer(action)
    }

    //----------------------------------
    // Функция изменения тайтла тудулиста
    function changeTitleTodolist(todolistId: string, newTitle: string) {
        const action = todolistActions.changeTitleTodolist({id: todolistId, title: newTitle})
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
                                              tasks={tasksForTodolist}
                                              todolist={todolist}

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

