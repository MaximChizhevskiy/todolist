import React, {useState} from 'react';
import './App.css';
import Todolist from "./Todolist";
import {taskType} from "./Todolist";
import {v1} from "uuid"

export type FilteredValuesType = "all" | "completed" | "active"

function App() {
    const [tasks, setTasks] = useState<Array<taskType>>([
        {id: v1(), title: "HTML & CSS", isDone: true},
        {id: v1(), title: "ES6 & TS", isDone: true},
        {id: v1(), title: "React", isDone: false},
        {id: v1(), title: "Redux", isDone: false}
    ])
    const [filter, setFilter] = useState<FilteredValuesType>("all")

    function changeTodoListFilter(value: FilteredValuesType) {
        setFilter(value)
    }

    const addTask = (title: string) => {
        const newTask: taskType = {
            id: v1(),
            title: title,
            isDone: false
        }
        setTasks([newTask, ...tasks])
    }

    function removeTask(id: string) {
        let filteredTasks = tasks.filter(t => t.id !== id)
        setTasks(filteredTasks)
    }

    const changeTaskStatus = (taskId: string, isDone: boolean) => {
        setTasks(tasks.map(t => t.id === taskId ? {...t, isDone: isDone} : t))
    }
    const getFilteredTaskForRender = () => {
        switch (filter) {
            case "active":
                return tasks.filter(t => !t.isDone)
            case "completed":
                return tasks.filter(t => t.isDone)
            default:
                return tasks
        }
    }
    const filteredTasksForRender: Array<taskType> = getFilteredTaskForRender()
    return (
        <div className="App">
            <Todolist
                filter={filter}
                mainTitle={"What to learn"}
                tasks={filteredTasksForRender}
                addTask={addTask}
                removeTask={removeTask}
                changeTodoListFilter={changeTodoListFilter}
                changeTaskStatus={changeTaskStatus}/>

        </div>
    );
}

export default App;