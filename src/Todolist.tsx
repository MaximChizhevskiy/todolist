import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilteredValuesType} from "./App";

export type taskType = {
    id: string
    title: string
    isDone: boolean
}

type propsType = {
    mainTitle: string
    tasks: Array<taskType>
    removeTask: (id: string) => void
    addTask: (title: string) => void
    changeTodoListFilter: (value: FilteredValuesType) => void
    changeTaskStatus: (taskId: string, isDone: boolean) => void
    filter: FilteredValuesType

}

function Todolist(props: propsType) {
    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<boolean>(false)
    const tasksItems = props.tasks.length
        ? props.tasks.map((t) => {
            const onClickRemoveTaskHandler = () => props.removeTask(t.id)
            const onChangeSetTaskStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(t.id, e.currentTarget.checked)
            const isDoneClasses = t.isDone ? "isDone" : "notIsDone"
            return (
                <li key={t.id}>
                    <input type="checkbox"
                           checked={t.isDone}
                           onChange={onChangeSetTaskStatus}/>
                    <span className={isDoneClasses}>{t.title}</span>
                    <button onClick={onClickRemoveTaskHandler}>✖️</button>
                </li>
            )
        })
        : <span>Tasks list is empty</span>

    const onClickAddTaskToTodolistHandler = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.addTask(trimmedTitle)
        } else {
            setError(true)
        }

        setTitle("")
    }
    const onChangeSetLocalTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError(false)
        setTitle(e.currentTarget.value)
    }
    const onKeyDownAddTaskToTodolistHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        e.key === "Enter" && onClickAddTaskToTodolistHandler()
    }
    const getOnClickFilterHandler = (filter: FilteredValuesType) => () => props.changeTodoListFilter(filter)
    const errorMessageStyles = {color: "orangered", margin: "0px"}
    const inputClasses = error ? "inputError" : undefined
    const errorMessage = error && <p style={errorMessageStyles}>Please, enter tak title</p>
    return (
        <div>
            <h3>{props.mainTitle}</h3>
            <div>
                <input
                    value={title}
                    onChange={onChangeSetLocalTitleHandler}
                    onKeyDown={onKeyDownAddTaskToTodolistHandler}
                    className={inputClasses}
                />
                <button onClick={onClickAddTaskToTodolistHandler}>➕</button>
                {errorMessage}
            </div>
            <ul>
                {tasksItems}
            </ul>
            <div>
                <button className={props.filter === "all" ? "activeFilter" : ""}
                        onClick={getOnClickFilterHandler('all')}>All
                </button>
                <button className={props.filter === "active" ? "activeFilter" : ""}
                        onClick={getOnClickFilterHandler('active')}>Active
                </button>
                <button className={props.filter === "completed" ? "activeFilter" : ""}
                        onClick={getOnClickFilterHandler('completed')}>Completed
                </button>
            </div>
        </div>

)

}

export default Todolist;
