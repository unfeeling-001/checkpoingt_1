import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { createStore } from 'redux';

const initialState = [
    {
        text: 'react',
        done: false
    },
    {
        text: 'html',
        done: true
    },
    {
        text: 'css',
        done: false
    }
];

const reducer = (state = initialState, action) => {
    console.log(action.type);

    switch (action.type) {
        case 'DELETE':
            return state.filter((item, index) => {
                return index !== action.payload;
            });

        case 'ADD_TASK':
            return [...state, action.payload];

        case 'TOGGLE_DONE':
            return state.map((item, index) => {
                if (index === action.payload) {
                    return {
                        ...item,
                        done: !item.done
                    };
                }
                return item;
            });

        default:
            return state;
    }
};

const store = createStore(reducer);

const addTask = (task) => {
    return {
        type: 'ADD_TASK',
        payload: task
    };
};

function App() {
    const todos = useSelector((state) => state);
    const dispatch = useDispatch();
    const [newTask, setNewTask] = useState('');

    const handleAddTask = () => {
        const newTaskObj = {
            text: newTask,
            done: false
        };
        dispatch(addTask(newTaskObj));
        setNewTask('');
    };

    const handleInputChange = (e) => {
        setNewTask(e.target.value);
    };

    const handleToggleDone = (index) => {
        dispatch({
            type: 'TOGGLE_DONE',
            payload: index
        });
    };

    const handleDeleteTodo = (index) => {
        dispatch({
            type: 'DELETE',
            payload: index
        });
    };

    return (
        <div className="container">
            {todos.map((item, index) => (
                <div key={index} className="todo">
                    <div>
                        <input
                            type="checkbox"
                            checked={item.done}
                            onChange={() => handleToggleDone(index)}
                        />
                    </div>
                    <div>{item.text}</div>
                    <div>
                        <button onClick={() => handleDeleteTodo(index)}
                            className="delete-btn"
                        >
                            X
                        </button>
                    </div>
                </div>
            ))}
            <input
                type="text"
                placeholder="Add Task..."
                value={newTask}
                onChange={handleInputChange}
            />
            <button onClick={handleAddTask}>send</button>
        </div>
    );
}

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
export default App;

