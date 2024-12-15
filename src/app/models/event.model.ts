export interface Event {
    id: number;
    title: string;
    startTime: string;
    endTime: string;
}

export interface EventDetails {
  id: number;
  title: string;
  startTime: string;
  endTime: string;
  description: string;
}

export interface CreateEventRequest {
    title: string;
    startTime: string;
    endTime: string;
    description: string;
}
  