// src/App.jsx
import {useState} from 'react';

function Greeting(props) {
    //   TODO: Return an h2 component that has Hello, [name]! using proper JSX.  (I didn't in my example here :)  )
    return <h2>Hello, {props.name}!</h2>;
}

function Counter() {
    // TODO: create a const [count, setCount] and extract from useState with initial state of 0

    // TODO: create an arrow function called increment that takes no arguments and calls setCount passing in count + 1
    // TODO: create an arrow function called reset that takes no arguments and calls setCount passing in 0.


    return (
        <div>
           // TODO:  p component with the following: Current count: [value of count variable]
           // TODO:  button component with onClick attribute that calls increment:  Inner text is the word: Increase
            // TODO: button component with onClick attribute that calls reset:  Innert text is the word: Reset
        </div>
    );
}

function App() {
    return (
        <div style={{textAlign: 'center', marginTop: '2rem'}}>
            <Greeting name="React Learner"/>
            <Counter/>
        </div>
    );
}

export default App;
