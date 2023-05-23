import React, { ChangeEvent, KeyboardEvent, useState } from "react"
import { Meta, StoryFn } from "@storybook/react"
import { AddItemForm } from "common/components/AddItemForm/AddItemForm"
import { action } from "@storybook/addon-actions"
import { IconButton, TextField } from "@mui/material"
import { AddBox } from "@mui/icons-material"

export default {
  title: "TODOLISTS/AddItemForm",
  tags: ["autodocs"],
  component: AddItemForm,
} as Meta<typeof AddItemForm>

//const Template: StoryFn<typeof AddItemForm> = (args) => <AddItemForm {...args} />
const Template: StoryFn<typeof AddItemForm> = (args) => {
  let [titleTask, setTitleTask] = useState("")
  let [error, setError] = useState<string | null>(null)
  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setTitleTask(event.currentTarget.value)
  }
  const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if (error !== null) {
      setError(null)
    }
    if (event.key === "Enter") {
      addItem()
    }
  }
  const addItem = () => {
    if (titleTask.trim() !== "") {
      args.addItem(titleTask.trim())
      setTitleTask("")
    } else {
      setError("Title is required")
    }
  }
  return (
    <div>
      {/*Считываем значение с инпута и делаем его заголовком таски*/}
      <TextField
        variant={"outlined"}
        value={titleTask}
        onChange={onChangeHandler}
        onKeyDown={onKeyPressHandler}
        error={!!error}
        label={error ? "Title is required" : "Please type you title"}
      />
      {/* Добавления таски */}
      <IconButton onClick={addItem} color={"primary"}>
        <AddBox />
      </IconButton>
    </div>
  )
}
export const AddItemFormStory = Template.bind({})

AddItemFormStory.args = {
  addItem: () =>
    new Promise((res) => {
      action("New Todolist with title")(res)
    }),
}

const Template1: StoryFn<typeof AddItemForm> = (args) => {
  let [titleTask, setTitleTask] = useState("")
  let [error, setError] = useState<string | null>("Title is required")
  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setTitleTask(event.currentTarget.value)
  }
  const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if (error !== null) {
      setError(null)
    }
    if (event.key === "Enter") {
      addItem()
    }
  }
  const addItem = () => {
    if (titleTask.trim() !== "") {
      args.addItem(titleTask.trim())
      setTitleTask("")
    } else {
      setError("Title is required")
    }
  }
  return (
    <div>
      {/*Считываем значение с инпута и делаем его заголовком таски*/}
      <TextField
        variant={"outlined"}
        value={titleTask}
        onChange={onChangeHandler}
        onKeyDown={onKeyPressHandler}
        error={!!error}
        label={error ? "Title is required" : "Please type you title"}
      />
      {/* Добавления таски */}
      <IconButton onClick={addItem} color={"primary"}>
        <AddBox />
      </IconButton>
    </div>
  )
}

export const AddItemFormStoryError = Template1.bind({})

AddItemFormStoryError.args = {
  addItem: () =>
    new Promise((res) => {
      action("New Todolist with title")(res)
    }),
}
