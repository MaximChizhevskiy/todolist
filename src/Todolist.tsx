import React from "react";

export type taskType = {
    id: number
    title: string
    isDone: boolean
}

type propsType = {
    mainTitle: string
    tasks: Array<taskType>
}

function Todolist(props: propsType) {
    return (
        <div>
            <h3>{props.mainTitle}</h3>
            <div>
                <input/>
                <button>+</button>
                <ul>
                    <li><input type="checkbox" checked={props.tasks[0].isDone}/><span>{props.tasks[0].title}</span></li>
                    <li><input type="checkbox" checked={props.tasks[1].isDone}/><span>{props.tasks[1].title}</span></li>
                    <li><input type="checkbox" checked={props.tasks[2].isDone}/><span>{props.tasks[2].title}</span></li>

                </ul>
                <div>
                    <button>All</button>
                    <button>Active</button>
                    <button>Completed</button>
                </div>
            </div>
        </div>
    )
}
export default Todolist;