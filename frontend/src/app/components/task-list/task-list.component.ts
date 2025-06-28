import { Component, OnInit } from '@angular/core';
import { Task } from '../../models/task.model';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  newTask: Task = { title: '', description: '', completed: false };
  editingTask: Task | null = null;
  loading = false;

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.loading = true;
    this.taskService.getAllTasks().subscribe({
      next: (tasks) => {
        this.tasks = tasks;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading tasks:', error);
        this.loading = false;
      }
    });
  }

  createTask(): void {
    if (this.newTask.title.trim()) {
      this.taskService.createTask(this.newTask).subscribe({
        next: (task) => {
          this.tasks.push(task);
          this.newTask = { title: '', description: '', completed: false };
        },
        error: (error) => console.error('Error creating task:', error)
      });
    }
  }

  startEdit(task: Task): void {
    this.editingTask = { ...task };
  }

  cancelEdit(): void {
    this.editingTask = null;
  }

  updateTask(): void {
    if (this.editingTask && this.editingTask.id) {
      this.taskService.updateTask(this.editingTask.id, this.editingTask).subscribe({
        next: (updatedTask) => {
          const index = this.tasks.findIndex(t => t.id === updatedTask.id);
          if (index !== -1) {
            this.tasks[index] = updatedTask;
          }
          this.editingTask = null;
        },
        error: (error) => console.error('Error updating task:', error)
      });
    }
  }

  deleteTask(id: number): void {
    if (confirm('Are you sure you want to delete this task?')) {
      this.taskService.deleteTask(id).subscribe({
        next: () => {
          this.tasks = this.tasks.filter(t => t.id !== id);
        },
        error: (error) => console.error('Error deleting task:', error)
      });
    }
  }

  toggleComplete(task: Task): void {
    if (task.id) {
      const updatedTask = { ...task, completed: !task.completed };
      this.taskService.updateTask(task.id, updatedTask).subscribe({
        next: (updated) => {
          const index = this.tasks.findIndex(t => t.id === updated.id);
          if (index !== -1) {
            this.tasks[index] = updated;
          }
        },
        error: (error) => console.error('Error toggling task:', error)
      });
    }
  }
}