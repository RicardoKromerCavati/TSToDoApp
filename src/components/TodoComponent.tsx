import { FC, useRef } from 'react';
import { BusinessToDo } from '../App.types'


const TodoComponent : FC<BusinessToDo> = ({id, description, deleteAction, isDone}) => {
    const labelReference = useRef<HTMLLabelElement>(null);
    //const crossLine = (event : React.MouseEvent<HTMLButtonElement, MouseEvent>) => labelReference.current?.classList.toggle("crossed-line");
    
    if (isDone) {
        labelReference.current?.classList.add("crossed-line");
        //FIND A WAY TO TOGGLE THIS IN REAL TIME SYNCHRONIZED WITH API
        console.log('entrei no if');
    }

    const todoId = id;
    return (
        <li>
            <div className='todoBase'>
                <div>
                    <label ref={labelReference}>{description}</label>
                </div>
                <div>
                    {/* <button onClick={crossLine} className="default_button">Finish task</button> */}
                    <button onClick={deleteAction} className="default_button">Delete</button>
                </div>
            </div>
            <hr />
        </li>
    );
};

export default TodoComponent;