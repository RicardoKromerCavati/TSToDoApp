import axios from 'axios';
import { FC, useState, useRef } from 'react';
import { AppProperties, ToDoModel, ToDoDto, BackendToDoModel, BackendDefaultResponse, DeleteToDoDto } from './App.types';
import TodoComponent from './components/TodoComponent';
import { v4 as uuid } from 'uuid';

const AppRandomPeopleList: FC<AppProperties> = ({ title }) => {

  const ref = useRef<HTMLInputElement>(null);
  const messageDivRef = useRef<HTMLDivElement>(null);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [errorMessage, setErrorMessage] = useState<string>('');
  const [input, setInput] = useState('');

  const [todos, updateTodoList] = useState<ToDoModel[]>([])

  const warningMessage: string = "Your task needs to have a description!";

  const showWarning = (message: string) => {
    setErrorMessage(message);
    messageDivRef.current?.classList.add("warningMessageDiv");
  }

  const showError = (message: string) => {
    setErrorMessage(message);
    messageDivRef.current?.classList.add("errorMessageDiv");
  }

  const isInputValid = (sample: string): boolean => !sample || sample === "" ? false : true;

  const clearMessage = () => {
    setErrorMessage('');
    messageDivRef.current?.classList.remove("errorMessageDiv");
    messageDivRef.current?.classList.remove("warningMessageDiv");
  }

  const getAllToDos = async () => {
    try {
      setIsLoading(true);
      clearMessage();

      const { data } = await axios.get<ToDoModel[]>('https://localhost:5295/getTodos');

      if (data.length === 0) {
        showWarning("There are no tasks to do, you are all done :)");
        return;
      }

      updateTodoList(data);
    } catch (error) {
      showError("There was an error while trying to obtain your tasks");
      console.log(error);
    }
    finally {
      setIsLoading(false);
    }
  }

  const handleAddTodoClick = async () => {
    try {
      setIsLoading(true);
      clearMessage();

      if (!isInputValid(input)) {
        showWarning(warningMessage);
        return;
      }

      let todoDto: ToDoDto = { description: input }
      await axios.post<BackendToDoModel>("https://localhost:5295/createToDo", todoDto);

      //const result = await axios.post<BackendToDoModel>("https://localhost:5295/createToDo", todoDto);
      //let createdToDo: ToDoModel = result.data.value;
      //updateTodoList([...todos, {id: createdToDo.id, description: createdToDo.description}]); --> This only should only be called if the getAllToDos method is not invoked

      getAllToDos();

      setInput('');
      ref.current?.focus();
    } catch (error) {
      showError("There was an error while trying to create a new task");
      console.log(error);
    }
    finally {
      setIsLoading(false);
    }
  }  

  const handleDelete = async (identifier: string) => {
    try {
      setIsLoading(true);
      clearMessage();

      let deleteToDoDto : DeleteToDoDto = {id : identifier};
      let backendDefaultResponse = await axios.post<BackendDefaultResponse>("https://localhost:5295/deleteToDo", deleteToDoDto);

      let defaultResponse = backendDefaultResponse.data.value;

      if (defaultResponse.isSuccessful) {
        //updateTodoList(todos.filter(t => t.id !== identifier));
        getAllToDos();
        return;
      }

      showError(defaultResponse.message);
    }
    catch (error) {
      showError("There was an error while trying to delete a task");
      console.log(error);
    }
    finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => setInput(event.target.value);

  return (
    <div>
      <div className="mainDiv">
        {<div ref={messageDivRef}>{errorMessage}</div>}
        <h1>{title}</h1>
        {isLoading && <p>Loading...</p>}
        <input type='text' ref={ref} onChange={handleInputChange} value={input} />
        <button className='default_button' onClick={getAllToDos}>Load ToDos</button>
        <button className='default_button' onClick={handleAddTodoClick}>Add</button>
      </div>
      <div className="todosDiv">
        <ul>
          {
            todos.map((todoItem) => {
              return <TodoComponent key={uuid()} id={todoItem.id} description={todoItem.description} deleteAction={() => { handleDelete(todoItem.id) }} isDone={true} />
            })
          }
        </ul>
      </div>
    </div>
  );
};

export default AppRandomPeopleList;