import React from "react"
import { Meta, StoryFn } from "@storybook/react"
import { Task } from "features/todolists-list/todolists/Todolist/Tasks/Task/Task"
import { TaskPriorities, TaskStatuses } from "common/enums/common-enums"
import { ReduxStoreProviderDecorator } from "stories/decorators/ReduxStoreProviderDecorator"

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "TODOLISTS/Task",
  component: Task,
  decorators: [ReduxStoreProviderDecorator],
  tags: ["autodocs"],
} as Meta<typeof Task>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<typeof Task> = (args) => <Task {...args} />

export const TaskIsNotDoneStory = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
TaskIsNotDoneStory.args = {
  task: {
    title: "Next JS",
    status: TaskStatuses.New,
    id: "",
    todoListId: "todolistId1",
    startDate: "",
    deadline: "",
    addedDate: "",
    order: 0,
    priority: TaskPriorities.Low,
    description: "",
  },
}

export const TaskIsDoneStory = Template.bind({})
TaskIsDoneStory.args = {
  task: {
    title: "HTML",
    status: TaskStatuses.Completed,
    id: "",
    todoListId: "todolistId1",
    startDate: "",
    deadline: "",
    addedDate: "",
    order: 0,
    priority: TaskPriorities.Low,
    description: "",
  },
}
