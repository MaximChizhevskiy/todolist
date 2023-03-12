import React, {useState} from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {Task} from "../Task";
import {action} from "@storybook/addon-actions";
import {TaskPriorities, TaskStatuses} from "../api/todolist-api";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'TODOLISTS/Task',
    args: {
        changeTaskStatus: action('changeTaskStatus'),
        changeTaskTitle: action('changeTaskTitle'),
        removeTask: action('removeTask'),
        todolistId: 'to1234',
        task: {id: '', titleTask: 'JS', status: TaskStatuses.New}
    },
    component: Task,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes

} as ComponentMeta<typeof Task>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Task> = (args) => <Task {...args} />;

export const TaskIsNotDoneStory = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
TaskIsNotDoneStory.args = {}
export const TaskIsDoneStory = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
TaskIsDoneStory.args = {
    task: {
        id: '', titleTask: 'HTML', status: TaskStatuses.Completed, todoListId: "todolistId1",
        startDate: '',
        deadline: '',
        addedDate: '',
        order: 0,
        priority: TaskPriorities.Low,
        description: ''
    }
}

const Template1: ComponentStory<typeof Task> = (args) => {
    const [task, setTask] = useState({
        id: 'id', titleTask: 'JS', status: TaskStatuses.New, todoListId: "todolistId1",
        startDate: '',
        deadline: '',
        addedDate: '',
        order: 0,
        priority: TaskPriorities.Low,
        description: ''
    })

    function changeTaskStatus(id: string, status: TaskStatuses, todolistId: string) {
        setTask({id: 'id', titleTask: 'JS', status: TaskStatuses.Completed, todoListId: "todolistId1",
            startDate: '',
            deadline: '',
            addedDate: '',
            order: 0,
            priority: TaskPriorities.Low,
            description: ''})
    }

    function changeTaskTitle(id: string, newTitle: string) {
        setTask({id: 'id', titleTask: newTitle, status: TaskStatuses.New, todoListId: "todolistId1",
            startDate: '',
            deadline: '',
            addedDate: '',
            order: 0,
            priority: TaskPriorities.Low,
            description: ''})
    }

    function removeTask() {
        console.log('removeTask')
    }

    return <Task changeTaskStatus={changeTaskStatus} changeTaskTitle={changeTaskTitle}
                 removeTask={args.removeTask} task={task} todolistId={'todolistId'}/>
};

export const TaskStory = Template1.bind({});
TaskStory.args = {
    removeTask: action('removeTask')
}