import { useState } from 'react';

function PortfolioCard({ 
  name, 
  jobTitle, 
  description, 
  skills, 
  profileColor, 
  isOnline, 
  theme 
}) {
  // TODO: Create state for hover effect (track if card is being hovered)
  const [isHovered, setIsHovered] = useState(false);
  
  // TODO: Create state for contact button (track if it was clicked)
  const [isContactClicked, setIsContactClicked] = useState(false);

  // TODO: Create theme objects with color schemes for 'light' and 'dark' themes
  // Each theme should include: background, text, textSecondary, border, buttonBg, buttonText
  const themes = {
    light: {
      // TODO: Add light theme colors
      // background: '#ffffff',
      // text: '#333333',
      // textSecondary: '#666666',
      // border: '#e0e0e0',
      // buttonBg: '#007bff',
      // buttonText: '#ffffff'
    },
    dark: {
      // TODO: Add dark theme colors
      // background: '#2d2d2d',
      // text: '#ffffff',
      // textSecondary: '#b0b0b0',
      // border: '#555555',
      // buttonBg: '#4dabf7',
      // buttonText: '#ffffff'
    }
  };

  // TODO: Select current theme based on the theme prop (default to light if invalid)
  const currentTheme = themes.light; // TODO: Fix this to use the theme prop

  // TODO: Create cardStyle object with:
  // - Fixed width of 300px
  // - Padding (24px), border radius (12px), border (1px solid)
  // - Background color from current theme
  // - Conditional shadow based on hover state (larger shadow when hovered)
  // - Conditional scale transform based on hover state (scale(1.02) when hovered)
  // - Smooth transitions (all 0.3s ease)
  const cardStyle = {
    // TODO: Add all card styling properties
    // width: '300px',
    // padding: '24px',
    // borderRadius: '12px',
    // border: `1px solid ${currentTheme.border}`,
    // backgroundColor: currentTheme.background,
    // etc...
  };

  // TODO: Create profileStyle object for the profile picture circle
  // Should be 80x80px, circular, centered, with profileColor background
  // Position relative for status indicator
  const profileStyle = {
    // TODO: Add profile picture styling
    // width: '80px',
    // height: '80px',
    // borderRadius: '50%',
    // backgroundColor: profileColor,
    // etc...
  };

  // TODO: Create statusStyle object for online/offline indicator
  // Should be positioned absolute, bottom-right of profile picture
  // Green (#28a745) when online, gray (#6c757d) when offline
  const statusStyle = {
    // TODO: Add status indicator styling
    // position: 'absolute',
    // bottom: '5px',
    // right: '5px',
    // width: '16px',
    // height: '16px',
    // etc...
  };

  // TODO: Create styles for name (24px, bold, centered)
  const nameStyle = {
    // TODO: Add name styling
  };

  // TODO: Create styles for job title (16px, secondary color, centered)
  const jobTitleStyle = {
    // TODO: Add job title styling
  };

  // TODO: Create styles for description (14px, line height 1.5, centered)
  const descriptionStyle = {
    // TODO: Add description styling
  };

  // TODO: Create styles for skills container (flex, wrap, centered, gap)
  const skillsContainerStyle = {
    // TODO: Add skills container styling
    // display: 'flex',
    // flexWrap: 'wrap',
    // gap: '6px',
    // justifyContent: 'center',
    // marginBottom: '20px'
  };

  // TODO: Create styles for individual skill badges
  // Should have theme-based colors, padding (4px 8px), border radius (12px)
  const skillBadgeStyle = {
    // TODO: Add skill badge styling
  };

  // TODO: Create styles for contact button
  // Full width, padding (12px), theme-based colors
  // Background changes to green (#28a745) when clicked
  const buttonStyle = {
    // TODO: Add button styling with conditional styles based on isContactClicked
    // width: '100%',
    // padding: '12px',
    // backgroundColor: isContactClicked ? '#28a745' : currentTheme.buttonBg,
    // etc...
  };

  // TODO: Create handler for contact button click
  // Should set isContactClicked to true, then reset after 2 seconds
  const handleContactClick = () => {
    // TODO: Implement contact click handler
    // Hint: Use setTimeout to reset the state after 2000ms
  };

  return (
    <div 
      style={cardStyle}
      onMouseEnter={() => {/* TODO: Set hover state to true */}}
      onMouseLeave={() => {/* TODO: Set hover state to false */}}
    >
      {/* Profile Picture with Online Status */}
      <div style={profileStyle}>
        {/* TODO: Display first letter of name in uppercase */}
        {/* Hint: name.charAt(0).toUpperCase() */}
        
        {/* TODO: Add status indicator div with statusStyle */}
      </div>

      {/* Name and Job Title */}
      {/* TODO: Add h2 element for name with nameStyle */}
      {/* TODO: Add p element for job title with jobTitleStyle */}

      {/* Description */}
      {/* TODO: Add p element for description with descriptionStyle */}

      {/* Skills */}
      <div style={skillsContainerStyle}>
        {/* TODO: Map through skills array and render each skill as a span with skillBadgeStyle */}
        {/* Hint: skills.map((skill, index) => ( ... )) */}
      </div>

      {/* Contact Button */}
      {/* TODO: Add button with buttonStyle and click handler */}
      {/* TODO: Button text should change based on isContactClicked state */}
      {/* Text when clicked: "Message Sent!", Default text: "Contact Me" */}
    </div>
  );
}

// Demo App Component - Use this to test your PortfolioCard implementation
function App() {
  return (
    <div style={{ 
      padding: '40px', 
      backgroundColor: '#f5f5f5', 
      minHeight: '100vh',
      display: 'flex',
      gap: '20px',
      flexWrap: 'wrap',
      justifyContent: 'center'
    }}>
      <PortfolioCard 
        name="Jane Doe"
        jobTitle="Frontend Developer"
        description="Passionate developer with 3 years of experience in React and JavaScript."
        skills={["React", "JavaScript", "CSS", "Node.js"]}
        profileColor="#4A90E2"
        isOnline={true}
        theme="light"
      />
      
      <PortfolioCard 
        name="John Smith"
        jobTitle="UI/UX Designer"
        description="Creative designer focused on user-centered design and modern interfaces."
        skills={["Figma", "Adobe XD", "Prototyping", "User Research"]}
        profileColor="#E24A4A"
        isOnline={false}
        theme="dark"
      />
    </div>
  );
}

export default App;