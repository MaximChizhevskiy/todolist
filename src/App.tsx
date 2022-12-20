import React, {useState} from 'react';
import './App.css';
import Todolist from "./Todolist";
import {taskType} from "./Todolist";
import {v1} from "uuid"

export type FlteredValuesType = "all" | "completed" | "active"

function App() {
    let [tasks, setTasks] = useState<Array<taskType>>([
        {id: v1(), title: "HTML & CSS", isDone: true},
        {id: v1(), title: "ES6 & TS", isDone: true},
        {id: v1(), title: "React", isDone: false},
        {id: v1(), title: "Redux", isDone: false}
    ])
    let [filter, setFilter] = useState<FlteredValuesType>("all")

    function changeFilter(value: FlteredValuesType) {
        setFilter(value)
    }

    const addTask = (title:string) => {
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

    let tasksForTodolist = tasks
    if (filter === "completed") {
        tasksForTodolist = tasks.filter(t => t.isDone);
    }

    if (filter === "active") {
        tasksForTodolist = tasks.filter(t => !t.isDone);
    }
    return (
        <div className="App">
            <Todolist mainTitle={"What to learn"}
                      addTask={addTask}
                      tasks={tasksForTodolist}
                      removeTask={removeTask}
                      changeFilter={changeFilter}/>
        </div>
    );
}

export default App;