import React from 'react';
import ReactDOM from 'react-dom';

import Board from './components/board';

import './styles.css';

const App = function () {
    
    return (<>
        <h1> Minesweeper </h1>

        <Board></Board>
    </>);
};

ReactDOM.render(<App />, document.getElementById("app-root"));