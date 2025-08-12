// TODO: src/App.jsx
import {useState} from 'react';

function ToggleViewer() {
    // TODO: create an isVisible and setIsVisible with the useState hook.  Default value is true

    // TODO: create an arrow function called toggle that called setIsVisible to the opposite of isVisible

    const divStyle = {
        textAlign: "center",
        marginTop: "2rem"
    };

    // TODO: make an innerDivStyle object with the following key value pairs:
    // marginTop of 1rem, padding of 1rem, border of 1px solid and #ccc for the color


    return (
        <div style={divStyle}>
            // TODO: create a button component with an on click attribute that calls toggle
            // TODO: The inner html of button should check isVisible and show Hide Message if true and Show Message if false.
            // You can do this without an if statement.

            // TODO:  Not really a todo, but a note.  This is the short-circuit way to render from previous lesson.
            // This will only render the stuff in () if isVisible is true.
            {isVisible && (
                // TODO: create a div component with a style of innerDivStyle that you created above.
                // TODO: nested in the div component should be a p component.
                // TODO: nested in the p component should be the text.  "This message is conditionally rendered."
            )}
        </div>
    );
}

function App() {
    return (
        <div>
            // TODO: make an h1 component with inner text Toggle App Viewer
            // TODO: add a ToggleViewer component here.
        </div>
    );
}

export default App;
