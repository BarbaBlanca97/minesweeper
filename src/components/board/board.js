import React from 'react';
import Cell from './cell';

import BoardEngine from '../../classes/board';
import StatusBar from './status-bar';

import './styles.css';

class Board extends React.Component {
    rows        = 16;
    columns     = 16;
    mines       = 40;
    boardEngine;

    constructor(props) {
        super(props);

        this.boardEngine = new BoardEngine(
            this.rows, 
            this.columns,
            this.mines, 
            this.handleLose, 
            this.handleWin
        );

        this.state = {
            board: this.boardEngine.getBoard(),
            minesLeft: this.mines,
            gameOver: false
        }
    }

    handleRestart = () => {
        this.boardEngine = new BoardEngine(
            this.rows, 
            this.columns, 
            this.mines, 
            this.handleLose, 
            this.handleWin
        );

        this.setState({ 
            board: [ ...this.boardEngine.getBoard() ], 
            minesLeft: this.mines, 
            gameOver: false 
        });
    } 

    handleLose = () => {
        this.setState({ gameOver: true });

        alert('perdiste');
    }

    handleWin = () => {
        this.setState({ gameOver: true });
        
        alert('ganaste');
    }
    
    handleCellClick = (event, row, col) => {
        let hasChange = false;

        if (event.button === 0)
            hasChange = this.boardEngine.reveal(row, col);
        else if (event.button === 2) 
            hasChange = this.boardEngine.mark(row, col);

        if (hasChange)
            this.setState({ board: [ ...this.boardEngine.getBoard() ], minesLeft: this.mines - this.boardEngine.getMarked() });
    }

    handleOptionsChanged = ({ rows, columns, mines }) => {
        this.rows = rows;
        this.columns = columns;
        this.mines = mines;

        this.handleRestart();
    }

    render () { 
        return (
            <div
            className="complete-board">
                <StatusBar 
                minesLeft={ this.state.minesLeft }
                onRestart={ this.handleRestart }
                onOptionsChanged={ this.handleOptionsChanged }
                />
                <div 
                id="board"
                className={`${ this.state.gameOver ? 'no-pointer' : '' }`}
                >
                    { this.drawBoard(this.state.gameOver) }
                </div>
            </div>
        );
    }


    drawBoard = (revealMines) => {
        const cols = [];

        for (let i = 0; i < this.columns; i++) {

            const colCells = [];

            for (let j = 0; j < this.rows; j++) {
                const cell = this.state.board[j][i];
                
                colCells.push(
                    <Cell
                        key={ `cell-${j}-${i}` }
                        onClick={ event => this.handleCellClick(event, j, i) }
                        onContextMenu={ event => { this.handleCellClick(event, j, i); event.preventDefault(); }}
                        revealed={ revealMines ? cell.mine || cell.revealed : cell.revealed }
                        marked={ cell.marked }
                        adjacentMines={ cell.adjacents }
                        gameOver={ this.state.gameOver }
                    />
                );
            }

            cols.push(<div
                key={ `col-${i}` }
                className='col'
                >
                { colCells }
            </div>);
        }

        return cols;
    }
}
 
export default Board;