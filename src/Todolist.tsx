import React from "react";
import {FlteredValuesType} from "./App";

export type taskType = {
    id: number
    title: string
    isDone: boolean
}

type propsType = {
    mainTitle: string
    tasks: Array<taskType>
    removeTask: (id: number) => void
    changeFilter: (value: FlteredValuesType) => void
}

function Todolist(props: propsType) {
    return (
        <div>
            <h3>{props.mainTitle}</h3>
            <div>
                <input/>
                <button>+</button>
                <ul>
                    {props.tasks.map(t => <li><input type="checkbox" checked={t.isDone}/>
                            <span>{t.title}</span>
                            <button onClick={() => {
                                props.removeTask(t.id)
                            }}>✖️
                            </button>
                        </li>
                    )}
                </ul>
                <div>
                    <button onClick={() => {
                        props.changeFilter("all")
                    }}>All
                    </button>
                    <button onClick={() => {
                        props.changeFilter("active")
                    }}>Active
                    </button>
                    <button onClick={() => {
                        props.changeFilter("completed")
                    }}>Completed
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Todolist;