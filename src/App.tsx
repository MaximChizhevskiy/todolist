import React from 'react';
import './App.css';
import Todolist from "./Todolist";
import {taskType} from "./Todolist";

function App() {
    const todoListTitle_1: string = "What to learn";
    const todoListTitle_2: string = "What to buy";
    const tasks_1: Array<taskType> = [
        {id: 1, title: "HTML & CSS", isDone: true},
        {id: 2, title: "ES6 & TS", isDone: true},
        {id: 3, title: "React", isDone: false}
    ]
    const tasks_2: Array<taskType> = [
        {id: 1, title: "Books", isDone: true},
        {id: 2, title: "Laptop", isDone: true},
        {id: 3, title: "Course", isDone: true}
    ]
    return (
        <div className="App">
            <Todolist mainTitle={todoListTitle_1} tasks={tasks_1} />
            <Todolist mainTitle={todoListTitle_2} tasks={tasks_2} />
        </div>


    );
}

export default App;
