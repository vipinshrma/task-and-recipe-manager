'use client'
import { TaskList } from "@/components/task-manager/task-list"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { useTaskStore } from "@/store/tasks";
import { AddTask } from "./add-task";
import { useState } from "react";
import { toast } from 'sonner';


interface Task {
    id: string;
    title: string;
    description: string;
    status: string;
    priority: string;
    dueDate: string;
    assignee: string;
}

interface TaskListProps {
    tasks: Task[];
}

export default function TasksView() {
    const tasks = useTaskStore((state) => state.getAllTasks());
    const { updateTask, deleteTask, addTask } = useTaskStore();
    const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
    const [editTaskId, setEditTaskId] = useState<string | null>(null);

    const handleEdit = (taskId: string) => {
        setEditTaskId(taskId);
        setIsTaskModalOpen(true);
    };

    const toggleTaskModal = (isOpen: boolean) => {
        setIsTaskModalOpen(isOpen);
        if (!isOpen) {
            setEditTaskId('')
        }
    };


    const handleDelete = (taskId: string) => {
        deleteTask(taskId);
        toast.success('Task deleted successfully');
    };
    const handleAddTask = (newTask: Task) => {
        if (editTaskId) {
            updateTask(editTaskId, newTask);
            toast.success('Task updated successfully');
        } else {
            const taskWithId = {
                ...newTask,
                id: Date.now().toString()
            };
            addTask(taskWithId);
            toast.success('Task added successfully');
        }
        toggleTaskModal(false);
    };
    return (
        <div className="flex flex-col w-full">
            <div className="flex items-center justify-between px-6 pt-6">
                <h1 className="text-2xl font-bold">Task Manager</h1>
                <Button onClick={()=>toggleTaskModal(true)} className="gap-2">
                    <Plus className="h-4 w-4" />
                    Add Task
                </Button>
            </div>
            <div className="mt-6 w-full">
                <TaskList tasks={tasks} handleEdit={handleEdit} handleDelete={handleDelete} />
            </div>
            <AddTask
                addTaskHandler={handleAddTask}
                open={isTaskModalOpen}
                handleClose={toggleTaskModal}
                editTaskId={editTaskId}
            />
        </div>
    )
}