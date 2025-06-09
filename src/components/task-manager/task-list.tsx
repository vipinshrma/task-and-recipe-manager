import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pencil, Trash } from "lucide-react";

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
  handleEdit?: (taskId: string) => void;
  handleDelete?: (taskId: string) => void;
}

export function TaskList({tasks, handleDelete, handleEdit}: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <div className="w-full p-6 text-center text-muted-foreground">
        No tasks found. Add a new task to get started.
      </div>
    );
  }

  

  return (
    <div className="w-full p-6">
      <Table className="w-full">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead>Due Date</TableHead>
            <TableHead>Assignee</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks.map((task: Task) => (
            <TableRow key={task.id} className="hover:bg-gray-50">
              <TableCell className="font-medium py-4">{task.id}</TableCell>
              <TableCell className="py-4">{task.title}</TableCell>
              <TableCell className="py-4">{task.description}</TableCell>
              <TableCell className="py-4">
                <span className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${
                  task.status === 'Todo' ? 'bg-gray-100 text-gray-800' :
                  task.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {task.status}
                </span>
              </TableCell>
              <TableCell className="py-4">{task.priority}</TableCell>
              <TableCell className="py-4">{task.dueDate}</TableCell>
              <TableCell className="py-4">{task.assignee}</TableCell>
              <TableCell className="py-4 flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleEdit?.(task.id)}
                  aria-label="Edit task"
                  className="text-blue-600 hover:text-blue-700"
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDelete?.(task.id)}
                  aria-label="Delete task"
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
