import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FlteredValuesType} from "./App";

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
    changeFilter: (value: FlteredValuesType) => void
}

function Todolist(props: propsType) {
    const [title, setTitle] = useState<string>("")
    const tasksItems = props.tasks.length
    ? props.tasks.map((t) => {
        const onClickRemoveTaskHandler = () => props.removeTask(t.id)
            return (
                <li key={t.id}>
                    <input type="checkbox" checked={t.isDone}/>
                    <span>{t.title}</span>
                    <button onClick={onClickRemoveTaskHandler}>✖️</button>
                </li>
            )
        })
        : <span>Tasks list is empty</span>

    const onClickAddTaskToTodolistHandler = () => {
        props.addTask(title)
        setTitle("")
    }
    const onChangeSetLocalTitleHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)
    const onKeyDownAddTaskToTodolistHandler = (e: KeyboardEvent<HTMLInputElement>) => {e.key === "Enter" && onClickAddTaskToTodolistHandler()}

    const getOnClickFilterHandler = (filter: FlteredValuesType) => () => props.changeFilter(filter)
        return (
            <div>
                <h3>{props.mainTitle}</h3>
                <div>
                    <input
                        value={title}
                        onChange={onChangeSetLocalTitleHandler}
                        onKeyDown={onKeyDownAddTaskToTodolistHandler}
                    />
                    <button onClick={onClickAddTaskToTodolistHandler}>➕</button>
                    <ul>
                        {tasksItems}
                    </ul>
                    <div>
                        <button onClick={getOnClickFilterHandler('all')}>All</button>
                        <button onClick={getOnClickFilterHandler('active')}>Active</button>
                        <button onClick={getOnClickFilterHandler('completed')}>Completed</button>
                    </div>
                </div>
            </div>
        )

    }

export default Todolist;
