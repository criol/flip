import React, {useState} from 'react';
import './App.css';
// import { AnimatedBox} from './AnimatedBox'
import { AnimatedBox2} from './AnimatedBox2'
function App() {
  const [isAnimated, setIsAnimated] = useState(false)
  const [step, setStep] = useState(0)
  const getClassNames = (curstep: number, base: string) => {
    return `card ${base} ${step === curstep&&`open`} ${step > curstep&&`compact`} ${step < curstep&&`hidden`}`
  }

  return (
    <div className="App">
      <p>
        Min is osom
      </p>
      <header className={`App-header`}>
        <AnimatedBox2 name={`one`} className={getClassNames(0, `blue`)}>
          <div onClick={() => {setStep(step === 0?1:0); setTimeout(() => {let i = 5000; while(i--) {console.log(i)}}, 10)}}>
            {step === 0 ? <div>expand other</div>:<div>collapsed</div>}
            {step === 0 && <div>nice that you expanded this</div>}
          </div>
        </AnimatedBox2>
        <AnimatedBox2 className={getClassNames(1, `pink`)}>
          <div  onClick={() => {setStep(step === 1?2:1)}}>
          {step === 1 ? <div>expand other</div>:<div>collapsed</div>}
          {step === 1 && <div>nice that you expanded this</div>}
          </div>
        </AnimatedBox2>
        <AnimatedBox2 className={getClassNames(2, `green`)} >
          <div onClick={() => {setStep(0)}}>
          {step === 2 ? <div>expand other</div>:<div>collapsed</div>}
          {step === 2 && <div>nice that you expanded this</div>}

          </div>
        </AnimatedBox2>

      </header>
      <button type="button" onClick={() => {
        setIsAnimated(!isAnimated);
      }}>Make it biiig</button>
      <button onClick={() => alert('asd')}> alert</button>
    </div>
  );
}

export default App;
