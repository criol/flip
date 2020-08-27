import React, {useState} from 'react';
import './App.css';
import {AnimatedBox, SizeEnum} from './AnimatedBox'
function App() {
  const [size, setSize] = useState(SizeEnum.small)
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Min is osom
        </p>
        <AnimatedBox size={size}/>
        <button type="button" onClick={() => {
          setSize(SizeEnum.big);
        }}>Make it biiig</button>
      </header>
    </div>
  );
}

export default App;
