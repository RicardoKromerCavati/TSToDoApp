export interface AppProperties {
    title: string
  }
  
export interface Name {
first: string;
last: string;
}

export interface Login {
uuid: string;
}

export interface User {
name: Name;
login: Login;
email: string;
}

export interface BusinessToDo{
  id: string;
  description: string;
  deleteAction: () => void;
  isDone: boolean;
}

export interface ToDoModel{
  id: string;
  description: string;
}

export interface BackendToDoModel{
  value: ToDoModel;
}

export interface DefaultResponse{
  isSuccessful : boolean;
  message : string;
}

export interface BackendDefaultResponse{
  value: DefaultResponse;
}

export interface ToDoDto{
  description: string;
}

export interface DeleteToDoDto{
  id: string;
}