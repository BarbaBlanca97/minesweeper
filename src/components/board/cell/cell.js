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

    return (
        <div
        className={ `cell${ revealed ? ' revealed' : '' }${ marked ? ' marked' : '' }${ gameOver && mine && !marked ? ' mine' : '' }` }
        { ...otherProps }
        >
            {  display() }
        </div>
    );
}