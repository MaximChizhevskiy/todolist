import React from "react"
import { Meta, StoryFn } from "@storybook/react"
import { ReduxStoreProviderDecorator } from "stories/decorators/ReduxStoreProviderDecorator"
import { FilterTasksButtons } from "features/todolists-list/todolists/Todolist/FilterTasksButtons/FilterTasksButtons"

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "TODOLISTS/FilterTasksButtons",
  component: FilterTasksButtons,
  decorators: [ReduxStoreProviderDecorator],
  tags: ["autodocs"],
  args: {
    todolist: { id: "1", addedDate: "", order: 0, title: "Todo", filter: "all", entityStatus: "idle" },
  },
} as Meta<typeof FilterTasksButtons>

const Template: StoryFn<typeof FilterTasksButtons> = (args) => <FilterTasksButtons {...args} />

export const FilterButtonAll = Template.bind({})
FilterButtonAll.args = {
  todolist: { id: "1", addedDate: "", order: 0, title: "Todo", filter: "all", entityStatus: "idle" },
}

export const FilterButtonActive = Template.bind({})
FilterButtonActive.args = {
  todolist: { id: "1", addedDate: "", order: 0, title: "Todo", filter: "active", entityStatus: "idle" },
}

export const FilterButtonCompleted = Template.bind({})
FilterButtonCompleted.args = {
  todolist: { id: "1", addedDate: "", order: 0, title: "Todo", filter: "completed", entityStatus: "idle" },
}
