import React, { useCallback, useEffect, useState } from 'react';
import './styles.css';

import { completeTaskAPI, deleteTaskAPI, getAllTasks, addTaskAPI } from '../../services/tasks';

import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import {  faPlusCircle as adicionarTarefa, faTrashAlt as lixeira } from '@fortawesome/free-solid-svg-icons';
import { faCircle as tarefaPendente, faCheckCircle as tarefaConcluida} from '@fortawesome/free-regular-svg-icons';

const Home = props => {

    const [tasks, setTasks] = useState([]);
    const [valueInput, setValueInput] = useState('');

    const loadTasks = useCallback(async () => {
        
        // const res = fetch('http://localhost:5050/tasks')
        //     .then((ress) => {
        //         return ress.json();
        //     }).then(data => console.log(data));
        // const res = axios.get('http://localhost:5050/tasks').then(response => {return response.data});
        // const response = await axios.get('http://localhost:5050/tasks');
        // console.log(response.data);

        const tasksAPI = await getAllTasks();
        setTasks([...tasksAPI]);
    }, []);

    useEffect(() => {
        loadTasks();
    }, [loadTasks]);

    const completeTask = async (task) => {
        // const tasksTemp = [...tasks];
        // // metodo com filter
        // // const [taskUpdate] = tasksTemp.filter(t => {
        // //     return t.id === task.id;
        // // });
        // const taskUpdate = tasksTemp.find(t => {
        //     return t.id === task.id;
        // });
        // taskUpdate.state = !taskUpdate.state;
        const taskToComplete = await completeTaskAPI(task);

        setTasks([...taskToComplete]);
    }

    const addTask = async (e) => {
        if(e){
            e.preventDefault();
        }
        if (valueInput.length > 0) {
            const newTask = {
                description: valueInput.toUpperCase()
            }
            
            const addedTasks = await addTaskAPI(newTask)

            setTasks(addedTasks);
            setValueInput('');
        } else {
            alert('Digite a descricao da tarefa')
        }

    }

    const deleteTask = async (task) => {
        const tasksTemp = await deleteTaskAPI(task);
        setTasks(tasksTemp);
    }

    const renderTarefas = () => {
        return (
            tasks.map((task) => {
                return (
                    <li key={task._id}> 
                    <div className="task">

                        {task.state && <div className="state ok" onClick={() => completeTask(task)} ><Icon icon={tarefaConcluida}/></div>}
                        {!task.state &&
                            <div 
                                className="state" 
                                onClick={() => completeTask(task)}
                            >
                                <Icon icon={tarefaPendente}/>
                            </div>
                        }
                        
                        <div className="description">{task.description} </div>
                    </div>
                    <div onClick={() => deleteTask(task)} className="delete">
                        <Icon icon={lixeira}/> 
                    </div>
                </li>
                )
            })
        );
    }

    return(
        <div className="TodoApp">
            <div className="titles">To do - App</div>
            <div className="todos">
                <div className="newTodo">
                    <form onSubmit={addTask}>
                        <input 
                            type="text" 
                            placeholder="Tarefa..." 
                            value={valueInput}
                            onChange={(event) => setValueInput(event.target.value)}
                        />
                        <button type="button" onClick={() => addTask()}><Icon icon={adicionarTarefa}/></button>
                    </form>
                </div>

                <div className="list">
                    <ul>
                        {tasks.length < 0 ? 
                            <li>Não há tarefas</li>:
                            renderTarefas()}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Home;