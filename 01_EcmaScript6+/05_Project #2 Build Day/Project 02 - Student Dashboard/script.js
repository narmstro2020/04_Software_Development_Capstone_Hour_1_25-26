const students = [
    {name: 'Alice', grade: 85},
    {name: 'Bob', grade: 58},
    {name: 'Charlie', grade: 95},
    {name: 'Diana', grade: 72},
    {name: 'Eli', grade: 66}
];

// TODO: store the length of the array in a const variable named total

// TODO: create a const value called average and assign it to
//  students.reduce
//  taking in an arrow function
//  with sum, and s as inputs
//  s is one of the students in the students array
//  don't forget to divide by total after the call to reduce.

// TODO: create a const array called passing and assign it to
//  student.filter
//  taking in an arrow function
//  with s as input.
//  s is one of the students in the students array.
//  the arrow function should return true when s is >= 70

// TODO: create a const array called labels and assign it to
//  student.map
//  taking in an arrow function
//  with s as input.
//  s is one of the students in the students array.
//  the arrow function should do the following.  HINT (you'll need curly brackets
//  because you'll need more than one line of code and you'll need to explicity use return.)
//  1. assign a const value called status with the ternary conditional operator acting on s.grade
//  if >= 70 store 'Pass' else 'Fail'
//  2. return an object with name from s.name and grade from s.grade, and status

// Render to dashboard
const dashboard = document.getElementById('dashboard');

// Clear dashboard in case of re-renders
dashboard.innerHTML = '';

// Create Total Stats Section
const statsSection = document.createElement('section');
statsSection.innerHTML = `
  <p><strong>Total Students:</strong> ${total}</p>
  <p><strong>Class Average:</strong> ${average.toFixed(2)}</p>
  <p><strong>Passing Students:</strong> ${passing.map(student => student.name).join(', ')}</p>
`;
dashboard.appendChild(statsSection);

// Create Student Grades Section
const gradesSection = document.createElement('section');
const gradesHeading = document.createElement('h3');
gradesHeading.textContent = 'Student Grades';
gradesSection.appendChild(gradesHeading);

// Create Student List
const ul = document.createElement('ul');

labels.forEach(label => {
    const li = document.createElement('li');
    li.className = label.status === 'Pass' ? 'pass' : 'fail';
    li.textContent = `${label.name} - ${label.grade} (${label.status})`;
    ul.appendChild(li);
});

gradesSection.appendChild(ul);
dashboard.appendChild(gradesSection);
