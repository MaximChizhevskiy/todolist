import React from "react";

export type taskType = {
    id: number
    title: string
    isDone: boolean
}

type propsType = {
    mainTitle: string
    tasks: Array<taskType>
    removeTask: Function
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
                            <button onClick ={ () => {props.removeTask(t.id)} } >✖️</button>
                        </li>
                    )}
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