import React from "react"
import { ComponentMeta, ComponentStory } from "@storybook/react"
import App from "./App"
import { ReduxStoreProviderDecorator } from "stories/decorators/ReduxStoreProviderDecorator"

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "TODOLISTS/App",
  component: App,
  decorators: [ReduxStoreProviderDecorator],
} as ComponentMeta<typeof App>

const Template: ComponentStory<typeof App> = (args) => <App />

export const AppBaseExample = Template.bind({})
