import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button, IconButton, TextField} from "@mui/material";
import {AddBox} from "@mui/icons-material";

type AddItemFormPropsType = {
    addItem: (titleTodolist: string) => void
}

const addButtonStyles = {
    maxWidth: '30px',
    maxHeight: '30px',
    minWidth: '30px',
    minHeight: '30px'
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
            <TextField variant={'outlined'}
                       value={titleTask}
                       onChange={onChangeHandler}
                       onKeyDown={onKeyPressHandler}
                       error={!!error}
                       label={error ? 'Title is required' : 'Please type you title'}
                       />
            {/* Добавления таски */}
            <IconButton onClick={addItem} color={"primary"}
                        style={addButtonStyles}><AddBox/></IconButton>
        </div>
    )
}