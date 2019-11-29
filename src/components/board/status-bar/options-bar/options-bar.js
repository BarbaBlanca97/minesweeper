import React from 'react';

import './styles.css';

class OptionsBar extends React.Component {
    state = {
        dificulty: 'medium'
    }

    handleChecked = (event) => {
        this.setState({ dificulty: event.target.value });
    }

    handleConfirm = () => {
        let settings;

        switch (this.state.dificulty) {
            case 'easy':
                settings = { rows: 9, columns: 9, mines: 10 }; break;
            case 'medium':
                settings = { rows: 16, columns: 16, mines: 40 }; break;
            case 'hard':
                settings = { rows: 16, columns: 30, mines: 99 }; break;
            default: break;
        }

        this.props.onConfirmation(settings);
    }

    render() { 
        return (
            <div className="options-bar">
                <label>
                    <input type="radio" name="dificulty" value="easy" 
                        checked={ this.state.dificulty === 'easy' }
                        onChange={ this.handleChecked }
                    />
                    Facil
                </label>

                <label>
                    <input type="radio" name="dificulty" value="medium" 
                        checked={ this.state.dificulty === 'medium' } 
                        onChange={ this.handleChecked }
                    />
                    Medio
                </label>

                <label>
                    <input type="radio" name="dificulty" value="hard"                         
                        checked={ this.state.dificulty === 'hard' } 
                        onChange={ this.handleChecked }
                    />
                    Dificil
                </label>

                <button className="confirm-button"
                onClick={ this.handleConfirm }> Confirmar </button>
            </div>
        );
    }
}
 
export default OptionsBar;