import React, { useCallback, useEffect, useState } from 'react';
import './styles.css';

import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import {  faPlusCircle as adicionarTarefa, faTrashAlt as lixeira } from '@fortawesome/free-solid-svg-icons';
import { faCircle as tarefaPendente, faCheckCircle as tarefaConcluida} from '@fortawesome/free-regular-svg-icons';

const Home = props => {

    const [tasks, setTasks] = useState([]);
    const [valueInput, setValueInput] = useState('');

    const loadTasks = useCallback(() => {
        const initialTasks = [
            {
                state: false,
                description: 'JOGAR',
                id: 1
            },
            {
                state: false,
                description: 'COMER',
                id: 2
            },
            {
                state: true,
                description: 'LAVAR LOUCA',
                id: 3
            },
            {
                state: true,
                description: 'COZINHAR',
                id: 4
            },
        ];
        setTasks([...initialTasks]);
    }, []);

    useEffect(() => {
        loadTasks();
    }, [loadTasks]);

    const completeTask = (task) => {
        const tasksTemp = [...tasks];
        // metodo com filter
        // const [taskUpdate] = tasksTemp.filter(t => {
        //     return t.id === task.id;
        // });
        const taskUpdate = tasksTemp.find(t => {
            return t.id === task.id;
        });
        taskUpdate.state = !taskUpdate.state;
        setTasks(tasksTemp);
    }

    const addTask = (e) => {
        if (valueInput.length > 0) {
            const newTask = {
                id: Date.now(),
                description: valueInput.toUpperCase(),
                state: false
            }

            const taskTemp = [...tasks];
            taskTemp.push(newTask);
            setTasks(taskTemp);
            setValueInput('');
        } else {
            alert('Digite a descricao da tarefa')
        }
        e.preventDefault();
    }

    const deleteTask = (task) => {
        const tasksTemp = [...tasks];
        // const taskDelete = tasksTemp.find(t => {
        //     return t.id === task.id;
        // });
        const indexofTask = tasksTemp.findIndex((t) => t.id === task.id);
        tasksTemp.splice(indexofTask, 1);
        setTasks(tasksTemp);
        console.log(tasksTemp);
    }

    const renderTarefas = () => {
        return (
            tasks.map((task) => {
                return (
                    <li key={task.id}> 
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
                        {renderTarefas()}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Home;