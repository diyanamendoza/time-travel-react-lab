import './App.css'
import { useState } from 'react';
import { useTimeTravel } from './useTimeTravel';

function App() {
  const [inputVal, setInputVal] = useState('')
  const [save, undo, redo, currentVal] = useTimeTravel()

  const handleSubmit = (e) => {
    e.preventDefault()
    save(inputVal)
  }

  return (
    <div className='App'>

      <div className='buttons-container'>
        <button onClick={undo}>Undo</button>
        <button onClick={redo}>Redo</button> 
      </div>

      <form onSubmit={handleSubmit}>
        <label htmlFor='dateInput'>Date Picker</label>
      <input type='date' name='dateInput' id='dateInput' value={inputVal} onChange={(event) => setInputVal(event.target.value)} />
      <button type='submit'>Save</button>
      </form>

      <div className='date-display' data-testid='date-display'>
      {currentVal ? <h2>{currentVal}</h2> : <p>Choose a date!</p> }
      </div>
    </div>
  );
}

export default App;
