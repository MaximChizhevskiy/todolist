import React from "react"
import { Meta, StoryFn } from "@storybook/react"
import { Login } from "features/login/Login"
import { ReduxStoreProviderDecorator } from "stories/decorators/ReduxStoreProviderDecorator"

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "TODOLISTS/Login",
  component: Login,
  decorators: [ReduxStoreProviderDecorator],
} as Meta<typeof Login>

const Template: StoryFn<typeof Login> = (args) => <Login {...args} />

export const LoginStory = Template.bind({})

LoginStory.args = {}
