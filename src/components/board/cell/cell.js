import React from 'react';
import './styles.css';

export default function (props) {
    const { marked, revealed, adjacentMines, gameOver, ...otherProps } = props;
    const mine = adjacentMines === -1;
    
    const display = function () {
        if (gameOver && marked && !mine)
            return 'X';
        else if (marked)
            return;
        else if (revealed) {
            if (mine)
                if (!marked)
                    return 'M';
                else
                    return;
            else if (adjacentMines === 0)
                return;
            else
                return adjacentMines;
        }
    }

    let color = '#000000';
    /*
    if  (revealed && adjacentMines > 0 && !mine) {
        switch (adjacentMines) {
            case 1: color = '#54ff71'; break;
            case 2: color = '#ffabeb'; break;
            case 3: color = '#1cb3ff'; break;
            case 4: color = '#ff6836'; break;
            case 5: color = '#731111'; break;
            case 6: color = '#000000'; break;
            case 7: color = '#000000'; break;
            case 8: color = '#000000'; break;
        }
    }
    */

    return (
        <div
        style={ { color: color } }
        className={ `cell${ revealed ? ' revealed' : '' }${ marked ? ' marked' : '' }${ gameOver && mine && !marked ? ' mine' : '' }` }
        { ...otherProps }
        >
            {  display() }
        </div>
    );
}