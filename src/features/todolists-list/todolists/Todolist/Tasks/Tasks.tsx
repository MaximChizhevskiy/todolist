import React, {FC} from 'react';
import {Task} from "features/todolists-list/todolists/Todolist/Tasks/Task/Task";
import {TaskType} from "features/todolists-list/tasks/tasks-api";
import {TaskStatuses} from "common/enums";
import {TodolistDomainType} from "features/todolists-list/todolists/todolists-reducer";

export const Tasks: FC<Props> = ({todolist, tasks}) => {

    let tasksForTodolist = [] as Array<TaskType>
    if (tasks) {
        tasksForTodolist = tasks
    }

    if (todolist.filter === 'active') {
        tasksForTodolist = tasks.filter(task => task.status === TaskStatuses.New)
    }
    if (todolist.filter === 'completed') {
        tasksForTodolist = tasks.filter(task => task.status === TaskStatuses.Completed)
    }

    return (
        <div>
            {tasksForTodolist.map((task) =>
                <Task
                    key={task.id}
                    task={task}
                    todolistId={todolist.id}
                    entityStatus={todolist.entityStatus}
                />
            )}
        </div>
    );
};

//types
type Props = {
    todolist: TodolistDomainType
    tasks: Array<TaskType>
}