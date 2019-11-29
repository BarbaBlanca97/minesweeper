import React, { useState } from 'react';
import Options from './options-bar';

import './styles.css';

export default function (props) {
    const [ optionsOpen, setOptionsOpen ] = useState(false);

    const handleConfirmation = function (settings) {
        setOptionsOpen(false);
        props.onOptionsChanged(settings);
    }

    return (
        <div className="status-bar">
                { !optionsOpen ?
                    <>
                        <div className="mines-left">
                            Minas restantes: { props.minesLeft }
                        </div>
                        <button 
                        className="reset-button"
                        onClick={ props.onRestart }
                        >
                            Reiniciar
                        </button>
                        <button 
                        onClick={ _ => { setOptionsOpen(true) } }
                        >
                            Opciones
                        </button>
                    </>
                    :
                    <Options  onConfirmation={ handleConfirmation } />
                }
        </div>
    );
}