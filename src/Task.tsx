import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@mui/material";
import {EditableSpan} from "./EditebleSpan";
import {Delete} from "@mui/icons-material";

import {TaskStatuses, TaskType} from "./api/todolist-api";

type TaskPropsType = {
    changeTaskStatus: (id: string, status: TaskStatuses, todolistId: string) => void
    changeTaskTitle: (id: string, newTitleTask: string, todolistId: string) => void
    removeTask: (id: string, todolistId: string) => void
    task: TaskType
    todolistId: string
}
export const Task = (props: TaskPropsType) => {
    const onRemoveClickHandler = () => {
        props.removeTask(props.task.id, props.todolistId)
    }
    // Изменение статуса таски
    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = event.currentTarget.checked
        props.changeTaskStatus(props.task.id, newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New, props.todolistId)
    }
    const onChangeEditTitleHandler = useCallback((newValue: string) => {
        props.changeTaskTitle(props.task.id, newValue, props.todolistId)
    }, [props.task.id, props.changeTaskTitle, props.todolistId])

    return (
        <li key={props.task.id} className={props.task.status === TaskStatuses.Completed ? 'isDone' : 'notIsDone'}>
            <Checkbox
                color={'primary'}
                checked={props.task.status === TaskStatuses.Completed}
                onChange={onChangeHandler}/>
            <EditableSpan titleTask={props.task.titleTask} onChange={onChangeEditTitleHandler}/>
            <IconButton onClick={onRemoveClickHandler}><Delete color={"disabled"}/></IconButton>
            {/*кол бек функция удаления таски по кнопки*/}
        </li>
    )
}