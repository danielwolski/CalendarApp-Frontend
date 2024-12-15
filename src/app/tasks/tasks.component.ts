import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CreateTaskRequest, Task } from '../models/task.model';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-tasks',
  imports: [CommonModule, FormsModule],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent implements OnInit {

  tasks: Task[] = [];

  taskRequest: CreateTaskRequest = {
    description: ''
  };

  constructor(private taskService: TaskService
  ) {}

  ngOnInit(): void {
    this.loadTasks();

    this.taskService.tasksUpdated$.subscribe(() => {
      this.loadTasks();
    });
  }

  removeTask(taskId: number) {
    this.taskService.removeTask(taskId).subscribe(() => {});
  }

  toggleIsDone(taskId: number) {
    this.taskService.toggleIsDone(taskId).subscribe(() => {});
  }

  loadTasks(): void {
    this.taskService.getTasks().subscribe((data: Task[]) => {
      this.tasks = data;
    });
  }
  
  confirmCreateTask(): void {
    console.log(this.taskRequest)
    this.taskService.addTask(this.taskRequest).subscribe({
      next: (response) => {
        console.log('Task created:', response);
      },
      error: (err) => {
        console.error('Error during creating task:', err);
      },
    });
  }
}
