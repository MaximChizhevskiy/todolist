import React, {FC, memo, useEffect} from "react";
import {AddItemForm} from "common/components/AddItemForm/AddItemForm";
import {tasksThunks} from "features/todolists-list/tasks/tasks-reducer";
import {TaskType} from "features/todolists-list/tasks/tasks-api";
import {useActions} from "common/hooks";
import {TodolistDomainType} from "features/todolists-list/todolists/todolists-reducer";
import {FilterTasksButtons} from "features/todolists-list/todolists/Todolist/FilterTasksButtons";
import {Tasks} from "features/todolists-list/todolists/Todolist/Tasks/Tasks";
import {TodolistTitle} from "features/todolists-list/todolists/Todolist/TodolistTitle/TodolistTitle";

export const Todolist: FC<Props> = memo(({todolist, tasks}) => {

    const {fetchTasks, addTaskTC} = useActions(tasksThunks)

    useEffect(() => {
        fetchTasks(todolist.id)
    }, [])

    const addTaskCallback = (title: string) => {
        return addTaskTC({title, todolistId: todolist.id}).unwrap()
    }

    return (
        <div className='App'>
            <div>
                <TodolistTitle todolist={todolist}/>
                <AddItemForm
                    addItem={addTaskCallback}
                    disabled={todolist.entityStatus === 'loading'}/>
                <ul>
                    <Tasks
                        todolist={todolist}
                        tasks={tasks}/>
                </ul>
                <div>
                    <FilterTasksButtons todolist={todolist}/>
                </div>
            </div>
        </div>
    )
})

//types
export type FilterValuesType = 'all' | 'active' | 'completed'
export type TasksStateType = {
    [key: string]: Array<TaskType>
}

type Props = {
    todolist: TodolistDomainType
    tasks: Array<TaskType>
}
