import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {IconButton, TextField} from "@mui/material";
import {AddBox} from "@mui/icons-material";
import {RejectValueType} from "common/utils/create-app-async-thunk";

type Props = {
    addItem: (titleTodolist: string) => any //Promise<any>
    disabled?: boolean
}

const addButtonStyles = {
    maxWidth: '30px',
    maxHeight: '30px',
    minWidth: '30px',
    minHeight: '30px'
}

//Функция добавления тудулиста
export const AddItemForm = React.memo((props: Props) => {

    let [titleTask, setTitleTask] = useState('')
    let [error, setError] = useState<string | null>(null)

    const addItemHandler = () => {
        if (titleTask.trim() !== '') {
            props.addItem(titleTask.trim())
                .then(() => {
                    setTitleTask('')
                })
                .catch((err: RejectValueType) => {
                    if (err.data) {
                        const messages = err.data.messages
                        setError(messages.length ? messages[0] : 'Some error occurred')
                    }
                })
        } else {
            setError('Title is required')
        }
    }

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitleTask(event.currentTarget.value)
    }

    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null){
        setError(null)
        }
        if (event.key === 'Enter') {
            addItemHandler()
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
                       disabled={props.disabled}
                       helperText={error}
                       />
            {/* Добавления таски */}
            <IconButton onClick={addItemHandler}
                        color={"primary"}
                        style={addButtonStyles}
                        disabled={props.disabled}
            ><AddBox/>
            </IconButton>
        </div>
    )
})
