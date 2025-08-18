# Assignment 1: Personal Portfolio Card

## Objective
Create a personal portfolio card component that showcases different CSS styling approaches in React. The card will display personal information and demonstrate inline styles, external CSS, and conditional styling.

## Requirements

### Part A: Basic Portfolio Card (Inline Styles)
Create a `PortfolioCard` component that uses inline styles and displays:
- Profile picture placeholder (colored rectangle)
- Name
- Job title
- Brief description
- Skills list
- Contact button

**Props to accept:**
- `name` (string)
- `jobTitle` (string) 
- `description` (string)
- `skills` (array of strings)
- `profileColor` (string) - for profile picture background
- `isOnline` (boolean) - shows online status

### Part B: Interactive Features
Add the following interactive features using state and conditional styling:
- Hover effect that slightly scales the card
- Click the contact button to toggle between "Contact Me" and "Message Sent!"
- Online/offline status indicator (green dot when online, gray when offline)

### Part C: Theme Variations
Create a `theme` prop that accepts "light" or "dark" and changes:
- Background color
- Text color
- Button styling
- Border color

## Specifications

### Styling Requirements
- Card should be 300px wide with rounded corners
- Use inline styles for all styling in this assignment
- Profile picture placeholder should be 80px x 80px circle
- Skills should be displayed as small badges
- Include smooth transitions for hover effects
- Use conditional styling for theme variations

### Code Structure
```jsx
// Your component should follow this structure:
function PortfolioCard({ name, jobTitle, description, skills, profileColor, isOnline, theme }) {
  // State for interactive features
  // Style objects with conditional logic
  // Return JSX with inline styles
}
```

## Sample Usage
```jsx
<PortfolioCard 
  name="Jane Doe"
  jobTitle="Frontend Developer"
  description="Passionate developer with 3 years of experience in React and JavaScript."
  skills={["React", "JavaScript", "CSS", "Node.js"]}
  profileColor="#4A90E2"
  isOnline={true}
  theme="light"
/>
```

