'use client'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useForm } from "react-hook-form"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useTaskStore } from "@/store/tasks"
import { useEffect } from "react"

const taskFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  status: z.string().min(1, "Status is required"),
  priority: z.string().min(1, "Priority is required"),
  dueDate: z.string().min(1, "Due date is required"),
  assignee: z.string().min(1, "Assignee is required")
})

type TaskFormValues = z.infer<typeof taskFormSchema>

interface AddTaskProps {
  open: boolean;
  handleClose: (isOpen: boolean) => void;
  addTaskHandler: (task: TaskFormValues) => void;
  editTaskId:string
}


export function AddTask({open,handleClose,addTaskHandler,editTaskId}:AddTaskProps) {
    const { getTaskById } = useTaskStore();
  const form = useForm<TaskFormValues>({
    resolver: zodResolver(taskFormSchema),
    defaultValues: {
      title: "",
      description: "",
      status: "Todo",
      priority: "Medium",
      dueDate: "",
      assignee: ""
    }
  })

  const onSubmit = (values: TaskFormValues) => {
    const newTask = {
      ...values,
      id: Date.now().toString()
    }
    addTaskHandler(newTask)
    form.reset()
  }

  
  
  useEffect(() => {
    if (editTaskId) {
      const taskToEdit = getTaskById(editTaskId);
      if (taskToEdit) {
        form.reset({
          title: taskToEdit.title,
          description: taskToEdit.description,
          status: taskToEdit.status,
          priority: taskToEdit.priority,
          dueDate: taskToEdit.dueDate,
          assignee: taskToEdit.assignee
        });
      }
    } else {
      form.reset({
        title: "",
        description: "",
        status: "Todo",
        priority: "Medium",
        dueDate: "",
        assignee: ""
      });
    }
  }, [editTaskId, getTaskById, form]);

  return (
    <Dialog open={open} onOpenChange={handleClose} >
      <DialogContent className="w-[90vw] max-w-[425px] sm:w-full">
        <DialogHeader>
          <DialogTitle>{editTaskId ? 'Update' : "Add New" }  Task</DialogTitle>
          {/* <DialogDescription>
            Fill out the form to create a new task. Click save when you're done.
          </DialogDescription> */}
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Task title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Task description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Status</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="w-full">
                      <SelectItem value="Todo">Todo</SelectItem>
                      <SelectItem value="In Progress">In Progress</SelectItem>
                      <SelectItem value="Done">Done</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="priority"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Priority</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="w-full">
                      <SelectItem value="Low">Low</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="High">High</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dueDate"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Due Date</FormLabel>
                  <FormControl>
                    <Input type="date" className="w-full" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="assignee"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Assignee</FormLabel>
                  <FormControl>
                    <Input placeholder="Assignee name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">{editTaskId ? 'Update' : 'Add'} Task</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
