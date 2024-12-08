export interface Event {
    id: number;
    title: string;
    startTime: string;
    endTime: string;
  }

export interface CreateEventRequest {
    title: string;
    startTime: string;
    endTime: string;
  }
  