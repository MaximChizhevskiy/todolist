import React, {ChangeEvent} from "react";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditebleSpan";

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
    changeTitleTodolist: (todolistId: string, newTitle:string) => void
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
    const changeTitleTodolist = (newTitle:string) => {
        props.changeTitleTodolist(props.id, newTitle)
    }
    const addTask = (titleTask: string) => {
        props.addTask(titleTask, props.id)
    }
    return (
        <div className='App'>
            <div>
                <h3><EditableSpan titleTask={props.titleTodolist} OnChange={changeTitleTodolist}/>
                    <button onClick={removeTodolist}>✖️</button>
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
                        const onChangeEditTitleHandler = (newValue:string) => {
                         props.changeTaskTitle(task.id, newValue, props.id)
                        }
                        return (
                            <li key={task.id} className={task.isDone ? 'isDone' : 'notIsDone'}><input type={"checkbox"}
                                                                                                      checked={task.isDone}
                                                                                                      onChange={onChangeHandler}/>
                                <EditableSpan titleTask={task.titleTask} OnChange={onChangeEditTitleHandler}/>
                                <button onClick={onRemoveClickHandler}>✖️</button>
                                {/*кол бек функция удаления таски по кнопки*/}
                            </li>
                        )
                    })}
                </ul>
                <div>
                    {/*кнопки фильтрации тасок*/}
                    <button className={props.filter === 'all' ? 'activeFilter' : ''} onClick={onAllClickHandler}>All
                    </button>
                    <button className={props.filter === 'active' ? 'activeFilter' : ''}
                            onClick={onActiveClickHandler}>Active
                    </button>
                    <button className={props.filter === 'completed' ? 'activeFilter' : ''}
                            onClick={onCompletedClickHandler}>Completed
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Todolist