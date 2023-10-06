import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

const root = ReactDOM.createRoot(document.getElementById('root'));

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
    switch (action.type) {
        case 'DELETE':
            return state.filter((item, index) => index !== action.payload);

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

root.render(
    <Provider store={store}>
        <App addTask={addTask} />
    </Provider>
);