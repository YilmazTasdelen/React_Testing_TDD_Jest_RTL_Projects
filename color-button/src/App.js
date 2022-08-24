import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {
  const [buttonCollor, setButtonCollor] = useState('red');
  const [disabled, setDisabled] = useState(false);
  const newButtonColor = buttonCollor === 'red' ? 'blue' : 'red';
  return (
    <div className="App">

      <button
        style={{ backgroundColor: disabled ? 'gray' : buttonCollor }}
        onClick={() => setButtonCollor(newButtonColor)}
        disabled={disabled}
      ><span>Change to {newButtonColor}</span>
      </button>

      <input
        type="checkbox"
        id='disable-button-checkbox'
        defaultChecked={disabled}
        onChange={(e) => setDisabled(e.target.checked)}
      />
      <label htmlFor='disable-button-checkbox'>Disable button</label>
    </div>
  );
}

export default App;
