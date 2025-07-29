// TODO: make an arrow function named generateStory that takes in name, place, creature, and object as parameters.  It should return.  The following using template literals.

// [name] traveled to the mysterious land of [place] and encountered a wild [creature].
// Armed only with a magical [object], [name] had to think fast to survive the adventure! 🧙‍♂️✨`;

// TODO: note you should use template strings where I've placed the [].  Also I've deliberately not used the right way to make literal.  Review the notes.


const listener = () => {
    // TODO: use document.getElementById('name').value and assign to const name.
    // TODO: repeat for place, creature, and object on their own lines.

    // TODO: create a const story from generateStory() passing in name, place, creature, object.
    // TODO: use document.getElementById('storyOutput').textContent = story;  to set the resulting paragraph tag with id storyOutput
}

document.getElementById('generateBtn').addEventListener('click', listener);
