import React, {useState} from 'react';
import './App.css';
import Todolist from "./Todolist";
import {taskType} from "./Todolist";

export type FlteredValuesType = "all" | "completed" | "active"

function App() {
    let [tasks, setTasks] = useState<Array<taskType>>([
        {id: 1, title: "HTML & CSS", isDone: true},
        {id: 2, title: "ES6 & TS", isDone: true},
        {id: 3, title: "React", isDone: false},
        {id: 4, title: "Redux", isDone: false}
    ])
    let [filter, setFilter] = useState<FlteredValuesType>("all")

    function changeFilter(value: FlteredValuesType) {
        setFilter(value)
    }

    function removeTask(id: number) {
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
                      tasks={tasksForTodolist}
                      removeTask={removeTask}
                      changeFilter={changeFilter}/>
        </div>
    );
}

export default App;