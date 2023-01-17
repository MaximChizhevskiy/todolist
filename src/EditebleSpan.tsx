import React, {ChangeEvent, useState} from "react";

type EditableSpanPropsType = {
    titleTask: string
    OnChange:(newValue: string) => void
}

// Функция редактирования тайтла
export function EditableSpan(props: EditableSpanPropsType) {
    let [editMode, setEditMode] = useState(false)
    let [editableTitleTask, setEditableTitleTask] = useState(props.titleTask)

    const activateEditMode = () => {
        setEditMode(true)
        setEditableTitleTask(props.titleTask)
    }
    const activateViewMode = () => {
        setEditMode(false)
        props.OnChange(editableTitleTask)
    }
    const onChangeTitleTask = (event:ChangeEvent<HTMLInputElement>) => {
      setEditableTitleTask(event.currentTarget.value)
    }

    return editMode
        ? <input value={editableTitleTask} onChange={onChangeTitleTask} onBlur={activateViewMode} autoFocus/>
        : <span onDoubleClick={activateEditMode}>{props.titleTask}</span>
}