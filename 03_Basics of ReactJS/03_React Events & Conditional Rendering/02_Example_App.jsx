import {useState} from "react";

function Display({loggedIn}) {
  if (loggedIn) {
    return <h2>Welcome Back!</h2>;
  } else {
    return <h2>Please Log In</h2>;
  }
}

function ClickTracker({background, isVisible}) {
    const [clicks, setClicks] = useState(0);

    const componentStyling = {
        backgroundColor : background,
    };

    const increment = () => setClicks(clicks + 1)

    return (
        isVisible &&
        <>
            <p style={componentStyling}>You clicked {clicks} times</p>
            <button onClick={increment}>Click</button>
        </>
    );
}

function ToggleMessage() {
  const [isShown, setIsShown] = useState(true);

  return (
    <div>
      <button onClick={() => setIsShown(!isShown)}>
        {isShown ? "Hide" : "Show"} Message
      </button>
      {isShown && <p>Hello, this is a conditional message!</p>}
    </div>
  );
}


function App() {

    return (
        <>
            <ClickTracker background={"red"} isVisible={true}/>
            <ClickTracker background={"blue"} isVisible={true}/>

            <Display loggedIn={true}/>

            <ToggleMessage />
        </>
    )
}

export default App
