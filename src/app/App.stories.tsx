import React from "react"
import { Meta, StoryFn } from "@storybook/react"
import App from "./App"
import { ReduxStoreProviderDecorator } from "stories/decorators/ReduxStoreProviderDecorator"

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "TODOLISTS/App",
  component: App,
  decorators: [ReduxStoreProviderDecorator],
} as Meta<typeof App>

const Template: StoryFn<typeof App> = () => <App />

export const AppBaseExample = Template.bind({})
