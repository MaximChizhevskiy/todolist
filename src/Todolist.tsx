import React, {useCallback} from "react";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditebleSpan";
import {Button, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {Task} from "./Task";

export type FilterValuesType = 'all' | 'active' | 'completed'
export type TasksStateType = {
    [key: string]: Array<TasksPropsType>
}

export type TasksPropsType = {
    id: string
    titleTask: string
    isDone: boolean
}

export type TodolistsType = {
    id: string
    titleTodolist: string
    filter: FilterValuesType
}

type TodolistPropsType = {
    id: string
    titleTodolist: string,
    tasks: Array<TasksPropsType>
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (titleTask: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    changeTaskTitle: (id: string, newTitleTask: string, todolistId: string) => void
    removeTask: (id: string, todolistId: string) => void
    filter: string
    removeTodolist: (todolistId: string) => void
    changeTitleTodolist: (todolistId: string, newTitle: string) => void
}

const Todolist = React.memo((props: TodolistPropsType) => {
    console.log("Todolist called")

    const onAllClickHandler = useCallback(() => {
        props.changeFilter('all', props.id)
    }, [props.changeFilter, props.id])
    const onActiveClickHandler = useCallback(() => {
        props.changeFilter('active', props.id)
    }, [props.changeFilter, props.id])
    const onCompletedClickHandler = useCallback(() => {
        props.changeFilter('completed', props.id)
    }, [props.changeFilter, props.id])

    const removeTodolist = () => {
        props.removeTodolist(props.id)
    }
    const changeTitleTodolist = useCallback((newTitle: string) => {
        props.changeTitleTodolist(props.id, newTitle)
    }, [props.id, props.changeTitleTodolist])

    const addTask = useCallback((titleTask: string) => {
        props.addTask(titleTask, props.id)
    }, [props.addTask, props.id])
    let tasksForTodolist = props.tasks

    if (props.filter === 'active') {
        tasksForTodolist = props.tasks.filter(task => !task.isDone)
    }
    if (props.filter === 'completed') {
        tasksForTodolist = props.tasks.filter(task => task.isDone)
    }
    return (
        <div className='App'>
            <div>
                <h3><EditableSpan titleTask={props.titleTodolist} onChange={changeTitleTodolist}/>
                    <IconButton onClick={removeTodolist}><Delete color={"disabled"}/></IconButton>
                </h3>
                <AddItemForm addItem={addTask}/>
                <ul>
                    {/* мапим таски с кнопками, чтобы не зависеть от количества приходящих тасок*/}
                    {tasksForTodolist.map((task) =>
                        <Task task={task} removeTask={props.removeTask} changeTaskStatus={props.changeTaskStatus}
                              changeTaskTitle={props.changeTaskTitle} todolistId={props.id} key={task.id}/>
                    )}
                </ul>
                <div>
                    {/*кнопки фильтрации тасок*/}
                    <Button variant={props.filter === 'all' ? 'outlined' : 'text'} onClick={onAllClickHandler}
                            color={"inherit"}>All
                    </Button>
                    <Button variant={props.filter === 'active' ? 'outlined' : 'text'}
                            onClick={onActiveClickHandler} color={'primary'}>Active
                    </Button>
                    <Button variant={props.filter === 'completed' ? 'outlined' : 'text'}
                            onClick={onCompletedClickHandler} color={'secondary'}>Completed
                    </Button>
                </div>
            </div>
        </div>
    )
})

export default Todolist