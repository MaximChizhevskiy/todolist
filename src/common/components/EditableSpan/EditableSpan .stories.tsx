import React from "react"
import { ComponentMeta, ComponentStory } from "@storybook/react"
import { action } from "@storybook/addon-actions"
import { EditableSpan } from "common/components/EditableSpan/EditableSpan"

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "TODOLISTS/EditableSpan ",
  component: EditableSpan,
  argTypes: {
    onClick: { description: "Button inside from clicked" },
  },
} as ComponentMeta<typeof EditableSpan>

const Template: ComponentStory<typeof EditableSpan> = (args) => <EditableSpan {...args} />

export const EditableSpanStory = Template.bind({})

EditableSpanStory.args = {
  onChange: action("EditableSpan value changed"),
  titleTask: "JavaScript",
}
