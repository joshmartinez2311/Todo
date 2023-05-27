// import necessary hooks and components from react and CustomList.modules.css 
import React, {useState, useEffect} from 'react'
import styles from './CustomList.module.css'
const AddToDo = (props) => {
    //read "toDos" and "completedToDos" from local storage or use an empty array as default
    const initialToDos = JSON.parse(localStorage.getItem('toDos')) || [];
    const initialCompletedToDos = JSON.parse(localStorage.getItem('completedToDos')) || [];
    
    // create state variables for toDos, newToDos and completedToDos
    const [toDos, setToDos] = useState(initialToDos)
    const [newToDo, setNewToDo] = useState("");
    const [completedToDo, setCompletedToDos] = useState(initialCompletedToDos)

    // use useEffect to store  the "toDos" state variables in localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('toDos', JSON.stringify(toDos));
    }, [toDos]);

    // use useEffect to store  the "completedToDos" state variables in localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('completedToDos', JSON.stringify(completedToDo))
    }, [completedToDo]);

    // event handler for the toDo input
    const handleToDoInput = (e) => {
    setNewToDo( e.target.value);
    };
    
    // event handler for creating a new toDo
    const handleCreateToDo = (e) =>{
        e.preventDefault();
        
        // only creates a new toDo if input is not empty
        if(newToDo.trim() !== "") {
        
        // adds the new toDo to the "toDos" state variable and sets it to completed = false
        setToDos([...toDos, { text: newToDo, completed: false}]);
        
        // resets the "newToDo" state variable
        setNewToDo("")
        console.log(toDos)
        }
    };

    // event handler for marking a toDo as completed
    const handleCompleted = (index) => {
        // creates a copy of "toDos"
        const newToDos = [...toDos]
        
        // toggles the "completed" property of the toDo at "index"
        newToDos[index].completed = !newToDos[index].completed
        
        // if the toDo is completed, add it to the "completedToDo" and remove it from the "toDos"
        if (newToDos[index].completed) {
        setCompletedToDos([...completedToDo, newToDos[index]])
        newToDos.splice(index, 1)
        }
        // update the "toDos" state variable
        setToDos(newToDos)
    };

    // event handler for deleting a completed toDo
    const handleCompletedDelete = (completedIndex) => {
        
        // creates a new array without the completed toDo at "completedIndex"
        const newCompletedToDos = completedToDo.filter((_, index) => index !== completedIndex);
        
        // updates the "completedToDo" state variable
        setCompletedToDos(newCompletedToDos)
    };

    // event handler for deleting a "toDo"
    const handleDelete = (toDoIndex)  => {
        // creates a new array without the toDo at "toDoIndex"
        const newToDos = toDos.filter((_, index) => index !== toDoIndex);
        // updates the "toDos" state variable
        setToDos(newToDos)
    };
    
return(
    <div className="container col-3">
        <form className="form" onSubmit={ handleCreateToDo }>
            <h1>Add A ToDo</h1>
            <div className="form-group">
                <label type="text" htmlFor="toDo">add a task</label>
                <input type="text" className="form-control" value={newToDo} onChange={ handleToDoInput} />
                <input type="submit" className="btn btn-success mt-3" />
            </div>
        </form>
        <div className='container'>
            <ul className={styles.customList}>
                
                {toDos.map((todo, index) => (
                    <li className={styles.customList} key={index}>
                        <div className='d-flex align-items-center'>
                            <input type="checkbox"
                            className='form-check-input'
                            checked={todo.completed}
                            onChange={() => handleCompleted(index)} />
                            {todo.text}
                            <button className="btn btn-danger btn-sm mt-3 ml-3" onClick={() => handleDelete(index)}>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
            <h2>Completed Tasks</h2>
            <ul className={styles.customList}>
                {completedToDo.map((todo, index) =>(
                    <div className='d-flex align-items-center'>
                    <li key={index}>
                        {todo.text} 
                        <button className="btn btn-danger btn-sm mt-3 ml-3" onClick={() => handleCompletedDelete(index)}>Delete</button>
                    </li>
                </div>
                ))} 
            </ul>
        </div>
    </div>
    );
};
export default AddToDo;