import React, {useState} from 'react'
import './App.css'
import Todolist, {FilterValuesType, TasksStateType} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {Container, Grid, Paper} from "@mui/material";
import {TodolistDomainType} from "./reducers/todolists-reducer";
import {TaskPriorities, TaskStatuses} from "./api/todolist-api";

function App() {
    let todolistId1 = v1()
    let todolistId2 = v1()

    let [todolists, setTodolists] = useState<Array<TodolistDomainType>>(
        [
            {id: todolistId1, titleTodolist: 'What to learn', filter: 'all', addedDate: '', order: 0},
            {id: todolistId2, titleTodolist: 'What to buy', filter: 'all', addedDate: '', order: 0},
        ]
    )

    let [tasksObj, setTasks] = useState<TasksStateType>({
        [todolistId1]: [
            {
                id: v1(),
                titleTask: "HTML&CSS",
                status: TaskStatuses.Completed,
                todoListId: todolistId1,
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
                description: ''
            },
            {
                id: v1(), titleTask: "JS", status: TaskStatuses.Completed,
                todoListId: todolistId1,
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
                description: ''
            },
            {
                id: v1(), titleTask: "ReactJS", status: TaskStatuses.New, todoListId: todolistId1,
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
                description: ''
            }],
        [todolistId2]: [
            {id: v1(), titleTask: "Laptop", status: TaskStatuses.Completed, todoListId: todolistId2,
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
                description: ''},
            {id: v1(), titleTask: "Keyboard", status: TaskStatuses.Completed, todoListId: todolistId2,
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
        let tasks = tasksObj[todolistId]
        tasksObj[todolistId] = tasks.filter(task => task.id !== id)
        setTasks({...tasksObj})
    }

    //------------------------------------
    // Фильтрация тасок со статусами на кнопках
    function changeFilter(filter: FilterValuesType, todolistId: string) {
        let todolist = todolists.find(todolist => todolist.id === todolistId)
        if (todolist) {
            todolist.filter = filter
            setTodolists([...todolists])
        }
    }

    //------------------------------------
    // Функция настройки добавления тасок
    function addTask(titleTask: string, todolistId: string) {
        let task = {id: v1(), titleTask: titleTask, status: TaskStatuses.New, todoListId: todolistId,
            startDate: '',
            deadline: '',
            addedDate: '',
            order: 0,
            priority: TaskPriorities.Low,
            description: ''}

        let tasks = tasksObj[todolistId]
        tasksObj[todolistId] = [task, ...tasks]
        setTasks({...tasksObj})
    }

    //------------------------------------
    // Функция изменения статуса таски (чекбокса)
    function changeTaskStatus(id: string, status: TaskStatuses, todolistId: string) {
        let tasks = tasksObj[todolistId]
        let task = tasks.find(task => task.id === id)
        if (task) {
            task.status = status;
            setTasks({...tasksObj})
        }
    }

    //------------------------------------
    // Функция изменения статуса тайтла таски
    function changeTaskTitle(id: string, newTitle: string, todolistId: string) {
        let tasks = tasksObj[todolistId]
        let task = tasks.find(task => task.id === id)
        if (task) {
            task.titleTask = newTitle
            setTasks({...tasksObj})
        }
    }

    //------------------------------------
    // Функция удаления тудулиста
    function removeTodolist(todolistId: string) {
        let filteredTodolist = todolists.filter(todolist => todolist.id !== todolistId)
        setTodolists(filteredTodolist)
        delete tasksObj[todolistId]
        setTasks({...tasksObj})
    }

    //----------------------------------
    // Функция добавления тудулиста
    function addTodolist(titleTodolist: string) {
        let newTodolist: TodolistDomainType = {
            id: v1(),
            filter: "all",
            titleTodolist: titleTodolist,
            addedDate: '',
            order:0
        }
        setTodolists([newTodolist, ...todolists])
        setTasks({...tasksObj, [newTodolist.id]: []})
    }

    //----------------------------------
    // Функция изменения тайтла тудулиста
    function changeTitleTodolist(todolistId: string, newTitle: string) {
        const todolist = todolists.find(todolist => todolist.id === todolistId)
        if (todolist) {
            todolist.titleTodolist = newTitle
            setTodolists([...todolists])
        }
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

export default App;

