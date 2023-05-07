import React, {ChangeEvent, useCallback, useState} from "react";
import {Checkbox, IconButton} from "@mui/material";
import {EditableSpan} from "common/components/EditableSpan/EditableSpan";
import {Delete} from "@mui/icons-material";

import {RequestStatusType} from "app/app-reducer";
import {TaskStatuses} from "common/enums/common-enums";
import {TaskType} from "features/TodolistsList/todolists-api";

type TaskPropsType = {
    changeTaskStatus: (id: string, status: TaskStatuses, todolistId: string) => void
    changeTaskTitle: (id: string, newTitleTask: string, todolistId: string) => void
    removeTask: (id: string, todolistId: string) => void
    task: TaskType
    todolistId: string
    entityStatus: RequestStatusType
}

export const Task = (props: TaskPropsType) => {
    const [isDisabled, setIsDisable] =useState(false)

      const onRemoveClickHandler = () => {
        setIsDisable(true)
        props.removeTask( props.todolistId,props.task.id)
    }
    // Изменение статуса таски
    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = event.currentTarget.checked
        props.changeTaskStatus(props.task.id, newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New, props.todolistId)
    }
    const onChangeEditTitleHandler = useCallback((newValue: string) => {
        props.changeTaskTitle(props.task.id, newValue, props.todolistId)
    },[props.task.id, props.changeTaskTitle, props.todolistId])

    return (
        <li key={props.task.id} className={props.task.status === TaskStatuses.Completed ? 'isDone' : 'notIsDone'}>
            <Checkbox
                disabled={isDisabled}
                color={'primary'}
                checked={props.task.status === TaskStatuses.Completed}
                onChange={onChangeHandler}/>
            <EditableSpan disabled={isDisabled} titleTask={props.task.title} onChange={onChangeEditTitleHandler}/>
            <IconButton onClick={onRemoveClickHandler} disabled={isDisabled}><Delete color={"disabled"}/></IconButton>
            {/*кол бек функция удаления таски по кнопки*/}
        </li>
    )
}