import React, { ChangeEvent, KeyboardEvent, useState } from "react"
import { TextField } from "@mui/material"

type EditableSpanPropsType = {
  titleTask: string
  onChange: (newValue: string) => void
  disabled?: boolean
}

// Функция редактирования тайтла
export const EditableSpan = React.memo((props: EditableSpanPropsType) => {
  let [editMode, setEditMode] = useState(false)
  let [editableTitleTask, setEditableTitleTask] = useState(props.titleTask)

  const activateEditMode = () => {
    setEditMode(true)
    setEditableTitleTask(props.titleTask)
  }
  const activateViewMode = () => {
    setEditMode(false)
    props.onChange(editableTitleTask)
  }
  const onChangeTitleTask = (event: ChangeEvent<HTMLInputElement>) => {
    setEditableTitleTask(event.currentTarget.value)
  }

  const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      activateViewMode()
    }
  }
  return editMode ? (
    <TextField
      variant={"outlined"}
      value={editableTitleTask}
      onChange={onChangeTitleTask}
      onBlur={activateViewMode}
      disabled={props.disabled}
      onKeyDown={onKeyPressHandler}
      autoFocus
    />
  ) : (
    <span onDoubleClick={activateEditMode}>{props.titleTask}</span>
  )
})
