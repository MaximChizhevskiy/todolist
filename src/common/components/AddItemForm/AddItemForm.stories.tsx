import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {AddItemForm} from "common/components/AddItemForm/AddItemForm";
import {action} from "@storybook/addon-actions";
import {IconButton, TextField} from "@mui/material";
import {AddBox} from "@mui/icons-material";

export default {
  title: 'TODOLISTS/AddItemForm',
  component: AddItemForm,
  argTypes: {
    addItem: { description: 'Button inside from clicked' },
  },
} as ComponentMeta<typeof AddItemForm>;

const Template: ComponentStory<typeof AddItemForm> = (args) => <AddItemForm {...args} />;

export const AddItemFormStory = Template.bind({});

AddItemFormStory.args = {
  addItem: action('Button inside from clicked')
}

const Template1: ComponentStory<typeof AddItemForm> = (args) => {

  let [titleTask, setTitleTask] = useState('')
  let [error, setError] = useState<string | null>('Title is required')
  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setTitleTask(event.currentTarget.value)
  }
  const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if (error !== null){
      setError(null)
    }
    if (event.key === 'Enter') {
      addItem()
    }
  }
  const addItem = () => {
    if (titleTask.trim() !== '') {
      args.addItem(titleTask.trim())
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
        <IconButton onClick={addItem} color={"primary"}><AddBox/></IconButton>
      </div>
  )
};

export const AddItemFormStoryError = Template1.bind({});

AddItemFormStoryError.args = {
  addItem: action('Button inside from clicked')
}