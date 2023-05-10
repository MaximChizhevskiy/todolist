import React, {useCallback, useEffect} from "react";
import {AddItemForm} from "common/components/AddItemForm/AddItemForm";
import {EditableSpan} from "common/components/EditableSpan/EditableSpan";
import {Button, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {Task} from "features/todolists-list/tasks/Task/Task";
import {RequestStatusType} from "app/app-reducer";
import {tasksThunks} from "features/todolists-list/tasks/tasks-reducer";
import {TaskStatuses} from "common/enums/common-enums";
import {useAppDispatch} from "common/hooks/useAppDispatch";
import {TaskType} from "features/todolists-list/todolists/todolists-api";

export type FilterValuesType = 'all' | 'active' | 'completed'
export type TasksStateType = {
    [key: string]: Array<TaskType>
}

type TodolistPropsType = {
    id: string
    titleTodolist: string,
    entityStatus: RequestStatusType
    tasks: Array<TaskType>
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (titleTask: string, todolistId: string) => void
    changeTaskStatus: (id: string, status: TaskStatuses, todolistId: string) => void
    changeTaskTitle: (id: string, newTitleTask: string, todolistId: string) => void
    removeTask: (id: string, todolistId: string) => void
    filter: FilterValuesType
    removeTodolist: (todolistId: string) => void
    changeTitleTodolist: (todolistId: string, newTitle: string) => void
}

const Todolist = React.memo((props: TodolistPropsType) => {
    console.log("Todolist called")

    const dispatch = useAppDispatch()

       useEffect(() => {
        dispatch(tasksThunks.fetchTasks(props.id))
    },[props.id])

    const onAllClickHandler = useCallback(() => {
        props.changeFilter('all', props.id)
    },[props.changeFilter, props.id])
    const onActiveClickHandler = useCallback(() => {
        props.changeFilter('active', props.id)
    },[props.changeFilter, props.id])
    const onCompletedClickHandler = useCallback(() => {
        props.changeFilter('completed', props.id)
    },[props.changeFilter, props.id])

    const removeTodolist = () => {
        props.removeTodolist(props.id)
    }
    const changeTitleTodolist = useCallback((newTitle: string) => {
        props.changeTitleTodolist(props.id, newTitle)
    },[props.id, props.changeTitleTodolist])

    const addTask = useCallback((titleTask: string) => {
        props.addTask(titleTask, props.id)
    },[props.addTask, props.id])

    let tasksForTodolist = [] as Array<TaskType>
    if (props.tasks) {
        tasksForTodolist = props.tasks
    }

    if (props.filter === 'active') {
        tasksForTodolist = props.tasks.filter(task => task.status === TaskStatuses.New)
    }
    if (props.filter === 'completed') {
        tasksForTodolist = props.tasks.filter(task => task.status === TaskStatuses.Completed)
    }
    return (
        <div className='App'>
            <div>
                <h3><EditableSpan titleTask={props.titleTodolist} onChange={changeTitleTodolist} disabled={props.entityStatus === 'loading'}/>
                    <IconButton onClick={removeTodolist} disabled={props.entityStatus === 'loading'}><Delete
                        color={"disabled"}/></IconButton>
                </h3>
                <AddItemForm addItem={addTask} disabled={props.entityStatus === 'loading'}/>
                <ul>
                    {/* мапим таски с кнопками, чтобы не зависеть от количества приходящих тасок*/}
                    {tasksForTodolist.map((task) =>
                        <Task
                            task={task}
                            removeTask={props.removeTask}
                            changeTaskStatus={props.changeTaskStatus}
                            changeTaskTitle={props.changeTaskTitle}
                            todolistId={props.id}
                            key={task.id}
                            entityStatus={props.entityStatus}
                            />
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