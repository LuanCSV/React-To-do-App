import React from 'react';
import './styles.css';

const Home = props => {
    return(
        <div className="TodoApp">
            <div className="titles">To do - App</div>
            <div className="todos">
                <div className="newTodo">
                    <form onSubmit={false}>
                        <input type="text" placeholder="Tarefa..."/>
                        <button type="button">+</button>
                    </form>
                </div>

                <div className="list">
                    <ul>
                        <li>Tarefa 1</li>
                        <li>Tarefa 2</li>
                        <li>Tarefa 3</li>
                        <li>Tarefa 4</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Home;