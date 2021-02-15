import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import './styles.css';

import { completeTaskAPI, deleteTaskAPI, getAllTasks, addTaskAPI, updateTaskAPI } from '../../services/tasks';

import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faCheck as tarefaConfirmar, faTimes as tarefaCancelar, faPlusCircle as adicionarTarefa, faTrashAlt as lixeira } from '@fortawesome/free-solid-svg-icons';
import { faCircle as tarefaPendente, faCheckCircle as tarefaConcluida, faEdit as Editar } from '@fortawesome/free-regular-svg-icons';
import { ID_TOKEN } from './../../constants/services'

const Home = props => {

    const [tasks, setTasks] = useState([]);
    const [valueAddInput, setValueAddInput] = useState('');
    const [valueEditInput, setValueEditInput] = useState('');
    const [editItem, setEditItem] = useState('');
    const history = useHistory();

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
        if (e) {
            e.preventDefault();
        }
        if (valueAddInput.length > 0) {
            const newTask = {
                description: valueAddInput.toUpperCase()
            }

            const res = await addTaskAPI(newTask);
            
            if (res.status) {
                loadTasks();
            } else {
                alert(res.message);
            }
            setValueAddInput('');
        } else {
            alert('Digite a descricao da tarefa')
        }
    }

    const deleteTask = async (task) => {
        const res = await deleteTaskAPI(task);
        if (res.status) {
            loadTasks();
        } else {
            alert(res.message);
        }
    }

    const updateTask = async (task) => {
        if (valueEditInput.length > 0) {
            const taskUpdated = {
                description: valueEditInput.toUpperCase()
            }
            task.description = taskUpdated.description;
            const res = await updateTaskAPI(task);

            if (res.status) {
                loadTasks();
            } else {
                alert(res.message);
            }
            setEditItem('');
            setValueEditInput('');
        } else {
            alert('Digite a descricao da tarefa para atualizar')
        }
    }

    const logout = () => {
        localStorage.removeItem(ID_TOKEN);
        history.push('/');
    }

    const renderTarefas = () => {

        return (
            tasks.map((task) => {
                return (
                    <li key={task._id}>
                        <div className="task">
                            {task.state && <div className="state ok" onClick={() => completeTask(task)} ><Icon icon={tarefaConcluida} /></div>}
                            {!task.state &&
                                <div
                                    className="state"
                                    onClick={() => completeTask(task)}
                                >
                                    <Icon icon={tarefaPendente} />
                                </div>
                            }
                            {editItem !== task._id &&
                                <div className="description">
                                    {task.description}
                                </div>
                            }
                            
                            

                            {editItem === task._id && 
                                <form className="updateForm">
                                    <input
                                        autoFocus
                                        type="text"
                                        value={valueEditInput}
                                        onChange={(e) => { setValueEditInput(e.target.value) }}
                                    />
                                    <div className="editActions">
                                        <button
                                            type="button"
                                            onClick={() => updateTask(task)}>
                                            <Icon icon={tarefaConfirmar} />
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() => {
                                                setEditItem('');
                                            }}>
                                            <Icon icon={tarefaCancelar} />
                                        </button>
                                    </div>
                                </form>
                            }
                        </div>

                        <div className="actions">
                            <div onClick={() => {
                                setEditItem(task._id)
                                setValueEditInput(task.description);
                            }} className="edit">
                                <Icon icon={Editar} />
                            </div>
                            <div onClick={() => deleteTask(task)} className="delete">
                                <Icon icon={lixeira} />
                            </div>
                        </div>

                    </li>
                )
            })
        );
    }


    return (
        <div className="TodoApp">
            <div className="titles">
                To do - App
                <button onClick={() => { logout()}}> Logout </button>
            </div>
            <div className="todos">
                <div className="newTodo">
                    <form onSubmit={addTask}>
                        <input
                            type="text"
                            placeholder="Tarefa..."
                            value={valueAddInput}
                            onChange={(event) => setValueAddInput(event.target.value)}
                        />
                        <button type="button" onClick={() => addTask()}><Icon icon={adicionarTarefa} /></button>
                    </form>
                </div>

                <div className="list">
                    <ul>
                        {tasks.length < 0 ?
                            <li>Não há tarefas</li> :
                            renderTarefas()}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Home;