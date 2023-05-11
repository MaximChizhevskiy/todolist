import React, {ChangeEvent, FC, useState} from "react";
import {Checkbox, IconButton} from "@mui/material";
import {EditableSpan} from "common/components/EditableSpan/EditableSpan";
import {Delete} from "@mui/icons-material";
import {RequestStatusType} from "app/app-reducer";
import {TaskStatuses} from "common/enums/common-enums";
import {TaskType} from "features/todolists-list/tasks/tasks-api";
import {useActions} from "common/hooks";
import {tasksThunks} from "features/todolists-list/tasks/tasks-reducer";
import s from './styles.module.css'

type Props = {
    task: TaskType
    todolistId: string
    entityStatus: RequestStatusType
}

export const Task: FC<Props> = ({todolistId, task}) => {
    const [isDisabled, setIsDisable] =useState(false)
    const {removeTaskTC: removeTask, changeTaskTC: changeTask} = useActions(tasksThunks)
        // Удаление таски
      const onRemoveClickHandler = () => {
        setIsDisable(true)
        removeTask({todolistId, taskId: task.id})
    }

    const onChangeTaskStatusHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const status = event.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New
        changeTask({taskId: task.id, domainModel: {status}, todolistId})
    }

    const onChangeTitleHandler = (title: string) => {
        changeTask({taskId: task.id, domainModel: {title}, todolistId})
    }
    return (
        <li key={task.id}
            className={task.status === TaskStatuses.Completed ? s.isDone : 'notIsDone'}>

            <Checkbox
                disabled={isDisabled}
                color={'primary'}
                checked={task.status === TaskStatuses.Completed}
                onChange={onChangeTaskStatusHandler}/>

            <EditableSpan
                disabled={isDisabled}
                titleTask={task.title}
                onChange={onChangeTitleHandler}/>

            <IconButton
                onClick={onRemoveClickHandler}
                disabled={isDisabled}>

                <Delete
                    color={"disabled"}/></IconButton>
        </li>
    )
}