import React, {ChangeEvent, KeyboardEvent, useState} from "react";

type AddItemFormPropsType = {
    addItem: (titleTodolist: string) => void
}

//Функция добавления тудулиста
export function AddItemForm(props: AddItemFormPropsType) {
    let [titleTask, setTitleTask] = useState('')
    let [error, setError] = useState<string | null>(null)
    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitleTask(event.currentTarget.value)
    }
    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (event.key === 'Enter') {
            addItem()
        }
    }
    const addItem = () => {
        if (titleTask.trim() !== '') {
            props.addItem(titleTask.trim())
            setTitleTask('')
        } else {
            setError('Title is required')
        }
    }
    return (
        <div>
            {/*Считываем значение с инпута и делаем его заголовком таски*/}
            <input value={titleTask} onChange={onChangeHandler} onKeyDown={onKeyPressHandler}
                   className={error ? 'inputError' : ''}/>
            {/* Добавления таски */}
            <button onClick={addItem}>+</button>
            {error && <div className={'errorMessage'}>{error}</div>}
        </div>
    )
}