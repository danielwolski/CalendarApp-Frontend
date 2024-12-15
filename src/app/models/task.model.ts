export interface Task {
    id: number;
    done: boolean;
    description: string;
}

export interface CreateTaskRequest {
    description: string;
}
  