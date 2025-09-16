# Assignment 3: React Native Component Conversion

## Objective
Practice converting React web components to React Native mobile components, understanding the differences in components, styling, and event handling.

## Part A: Component Conversion

Convert the following React web components to React Native components.

### Task 1: Simple Card Component

**React Web Version:**
```javascript
// Web version
const Card = ({ title, description }) => {
  return (
    <div className="card">
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
};

// CSS
.card {
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  margin: 10px;
}
```

**Convert to React Native:**
```javascript
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Card = ({ title, description }) => {
  // TODO: Convert the div to View
  // TODO: Convert h2 and p to Text components
  // TODO: Apply styles using StyleSheet
  
  return (
    // Your code here
  );
};

const styles = StyleSheet.create({
  // TODO: Convert CSS to React Native styles
  card: {
    // padding: 20,
    // borderWidth: 1,
    // borderColor: '#ccc',
    // etc.
  }
});

export default Card;
```

### Task 2: Interactive Counter Component

**React Web Version:**
```javascript
// Web version
const Counter = () => {
  const [count, setCount] = useState(0);
  
  return (
    <div className="counter">
      <h1>Count: {count}</h1>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
      <button onClick={() => setCount(count - 1)}>
        Decrement
      </button>
    </div>
  );
};
```

**Convert to React Native:**
```javascript
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Counter = () => {
  const [count, setCount] = useState(0);
  
  return (
    // TODO: Convert div to View
    // TODO: Convert h1 to Text
    // TODO: Convert buttons to TouchableOpacity with Text inside
    // TODO: Change onClick to onPress
  );
};

const styles = StyleSheet.create({
  container: {
    // TODO: Add styles
  },
  title: {
    // TODO: Add text styles
  },
  button: {
    // TODO: Add button styles
  }
});

export default Counter;
```

### Task 3: Form Input Component

**React Web Version:**
```javascript
// Web version
const ContactForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  
  const handleSubmit = () => {
    console.log('Submitted:', { name, email });
  };
  
  return (
    <div>
      <h2>Contact Us</h2>
      <input
        type="text"
        placeholder="Your Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Your Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};
```

**Convert to React Native:**
```javascript
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const ContactForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  
  const handleSubmit = () => {
    console.log('Submitted:', { name, email });
  };
  
  return (
    // TODO: Convert input to TextInput
    // TODO: Change onChange to onChangeText
    // TODO: Remove e.target.value pattern
    // TODO: Use Button component with title prop
  );
};

const styles = StyleSheet.create({
  // TODO: Add appropriate styles
});

export default ContactForm;
```

## Part B: List Component

Create a React Native component that displays a list of items using FlatList.

### Requirements:
1. Display a list of products (use the same data from Assignment 2)
2. Each item should show name and price
3. Include a separator between items
4. Handle item press to show an alert with product details

**Starter Template:**
```javascript
import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const ProductList = () => {
  const products = [
    { id: '1', name: 'Laptop', price: 999 },
    { id: '2', name: 'Phone', price: 699 },
    { id: '3', name: 'Tablet', price: 399 },
    { id: '4', name: 'Watch', price: 299 },
    { id: '5', name: 'Headphones', price: 199 }
  ];
  
  const handlePress = (item) => {
    // TODO: Show an alert with product details
  };
  
  const renderItem = ({ item }) => {
    // TODO: Return a TouchableOpacity with product info
  };
  
  const ItemSeparator = () => {
    // TODO: Return a View with separator styling
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Our Products</Text>
      {/* TODO: Add FlatList with:
          - data prop
          - renderItem prop
          - keyExtractor prop
          - ItemSeparatorComponent prop
      */}
    </View>
  );
};

const styles = StyleSheet.create({
  // TODO: Add all necessary styles
});

export default ProductList;
```

## Part C: Complete App

Combine all the components you've created into a complete React Native app.

**Requirements:**
1. Create an App component that includes all your converted components
2. Add a ScrollView to make content scrollable
3. Style the app with a consistent theme

**Template:**
```javascript
import React from 'react';
import { ScrollView, View, Text, StyleSheet, SafeAreaView } from 'react-native';
// Import your components

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* TODO: Add a header */}
        {/* TODO: Include your Card component */}
        {/* TODO: Include your Counter component */}
        {/* TODO: Include your ContactForm component */}
        {/* TODO: Include your ProductList component */}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  // TODO: Add app-wide styles
});

export default App;
```

## Conversion Reference Guide

Use this table to help with conversions:

| React Web | React Native | Notes |
|-----------|--------------|-------|
| `<div>` | `<View>` | Container component |
| `<p>`, `<h1>`, `<span>` | `<Text>` | All text must be in Text component |
| `<button>` | `<Button>` or `<TouchableOpacity>` | Button is simpler, TouchableOpacity is more customizable |
| `<input>` | `<TextInput>` | Different props and events |
| `<img>` | `<Image>` | Requires source prop with uri or require() |
| `onClick` | `onPress` | Event name change |
| `onChange` | `onChangeText` | Direct text value, no event object |
| `className` | `style` | Uses StyleSheet objects |
| `ul/ol` with `li` | `<FlatList>` | Optimized list rendering |

## Testing Checklist

- [ ] Card component displays title and description with proper styling
- [ ] Counter increments and decrements correctly
- [ ] Form accepts input and logs on submit
- [ ] Product list displays all items
- [ ] Tapping product shows alert
- [ ] Complete app is scrollable
- [ ] All components are properly styled

## Grading Criteria

- Task 1 (Card): 15%
- Task 2 (Counter): 20%
- Task 3 (Form): 20%
- Part B (List): 25%
- Part C (Complete App): 15%
- Code quality and styling: 5%