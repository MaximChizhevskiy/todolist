import React, {ChangeEvent} from "react";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditebleSpan";
import {Button, Checkbox, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";

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
    removeTask: (id: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (titleTask: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    changeTaskTitle: (id: string, newTitleTask: string, todolistId: string) => void
    filter: string
    removeTodolist: (todolistId: string) => void
    changeTitleTodolist: (todolistId: string, newTitle: string) => void
}

function Todolist(props: TodolistPropsType) {

    const onAllClickHandler = () => {
        props.changeFilter('all', props.id)
    }
    const onActiveClickHandler = () => {
        props.changeFilter('active', props.id)
    }
    const onCompletedClickHandler = () => {
        props.changeFilter('completed', props.id)
    }
    const removeTodolist = () => {
        props.removeTodolist(props.id)
    }
    const changeTitleTodolist = (newTitle: string) => {
        props.changeTitleTodolist(props.id, newTitle)
    }
    const addTask = (titleTask: string) => {
        props.addTask(titleTask, props.id)
    }
    return (
        <div className='App'>
            <div>
                <h3><EditableSpan titleTask={props.titleTodolist} OnChange={changeTitleTodolist}/>
                    <IconButton onClick={removeTodolist}><Delete color={"disabled"}/></IconButton>
                </h3>
                <AddItemForm addItem={addTask}/>
                <ul>
                    {/* мапим таски с кнопками, чтобы не зависеть от количества приходящих тасок*/}
                    {props.tasks.map((task) => {
                        const onRemoveClickHandler = () => {
                            props.removeTask(task.id, props.id)
                        }
                        // Изменение статуса таски
                        const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
                            let newIsDoneValue = event.currentTarget.checked
                            props.changeTaskStatus(task.id, newIsDoneValue, props.id)
                        }
                        const onChangeEditTitleHandler = (newValue: string) => {
                            props.changeTaskTitle(task.id, newValue, props.id)
                        }
                        return (
                            <li key={task.id} className={task.isDone ? 'isDone' : 'notIsDone'}><Checkbox color={'primary'}
                                                                                                      checked={task.isDone}
                                                                                                      onChange={onChangeHandler}/>
                                <EditableSpan titleTask={task.titleTask} OnChange={onChangeEditTitleHandler}/>
                                <IconButton onClick={onRemoveClickHandler}><Delete color={"disabled"}/></IconButton>
                                {/*кол бек функция удаления таски по кнопки*/}
                            </li>
                        )
                    })}
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
}

export default Todolist