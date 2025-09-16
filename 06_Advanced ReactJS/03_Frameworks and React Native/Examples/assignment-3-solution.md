# Assignment 3 Solution: React Native Component Conversion

## Part A: Component Conversion Solutions

### Task 1: Simple Card Component - Solution

```javascript
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Card = ({ title, description }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    margin: 10,
    backgroundColor: '#fff',
    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    // Shadow for Android
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  description: {
    fontSize: 16,
    color: '#666',
    lineHeight: 22,
  }
});

export default Card;
```

### Task 2: Interactive Counter Component - Solution

```javascript
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Counter = () => {
  const [count, setCount] = useState(0);
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Count: {count}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={[styles.button, styles.incrementButton]}
          onPress={() => setCount(count + 1)}
        >
          <Text style={styles.buttonText}>Increment</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.button, styles.decrementButton]}
          onPress={() => setCount(count - 1)}
        >
          <Text style={styles.buttonText}>Decrement</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    margin: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 10, // Note: gap works in React Native 0.71+
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    minWidth: 120,
    alignItems: 'center',
  },
  incrementButton: {
    backgroundColor: '#4CAF50',
    marginRight: 10,
  },
  decrementButton: {
    backgroundColor: '#f44336',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  }
});

export default Counter;
```

### Task 3: Form Input Component - Solution

```javascript
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

const ContactForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  
  const handleSubmit = () => {
    if (name && email) {
      Alert.alert(
        'Form Submitted',
        `Name: ${name}\nEmail: ${email}`,
        [{ text: 'OK', onPress: () => console.log('Submitted:', { name, email }) }]
      );
      // Clear form
      setName('');
      setEmail('');
    } else {
      Alert.alert('Error', 'Please fill in all fields');
    }
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Contact Us</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Your Name"
        placeholderTextColor="#999"
        value={name}
        onChangeText={setName}
        autoCapitalize="words"
      />
      
      <TextInput
        style={styles.input}
        placeholder="Your Email"
        placeholderTextColor="#999"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />
      
      <View style={styles.buttonContainer}>
        <Button 
          title="Submit" 
          onPress={handleSubmit}
          color="#007AFF"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    margin: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  buttonContainer: {
    marginTop: 10,
  }
});

export default ContactForm;
```

## Part B: List Component - Solution

```javascript
import React from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  TouchableOpacity, 
  StyleSheet, 
  Alert 
} from 'react-native';

const ProductList = () => {
  const products = [
    { id: '1', name: 'Laptop', price: 999 },
    { id: '2', name: 'Phone', price: 699 },
    { id: '3', name: 'Tablet', price: 399 },
    { id: '4', name: 'Watch', price: 299 },
    { id: '5', name: 'Headphones', price: 199 }
  ];
  
  const handlePress = (item) => {
    Alert.alert(
      item.name,
      `Price: $${item.price}\nProduct ID: ${item.id}`,
      [
        { text: 'Add to Cart', onPress: () => console.log('Added to cart:', item) },
        { text: 'Cancel', style: 'cancel' }
      ]
    );
  };
  
  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity 
        style={styles.item}
        onPress={() => handlePress(item)}
        activeOpacity={0.7}
      >
        <View style={styles.itemContent}>
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.itemPrice}>${item.price}</Text>
        </View>
        <Text style={styles.arrow}>›</Text>
      </TouchableOpacity>
    );
  };
  
  const ItemSeparator = () => {
    return <View style={styles.separator} />;
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Our Products</Text>
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={ItemSeparator}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: '#333',
  },
  listContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  itemContent: {
    flex: 1,
  },
  itemName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '500',
  },
  arrow: {
    fontSize: 24,
    color: '#999',
  },
  separator: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginHorizontal: 16,
  }
});

export default ProductList;
```

## Part C: Complete App - Solution

```javascript
import React from 'react';
import { 
  ScrollView, 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView,
  StatusBar 
} from 'react-native';

// Import all components (in a real app, these would be separate files)
import Card from './Card';
import Counter from './Counter';
import ContactForm from './ContactForm';
import ProductList from './ProductList';

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>React Native Demo App</Text>
          <Text style={styles.headerSubtitle}>
            Converted from React Web Components
          </Text>
        </View>
        
        {/* Card Component Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Card Component</Text>
          <Card 
            title="Welcome Card"
            description="This is a card component converted from React web to React Native. Notice how we use View instead of div and Text instead of p tags."
          />
          <Card 
            title="Another Card"
            description="Cards are great for displaying grouped information with consistent styling."
          />
        </View>
        
        {/* Counter Component Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Counter Component</Text>
          <Counter />
        </View>
        
        {/* Contact Form Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact Form</Text>
          <ContactForm />
        </View>
        
        {/* Product List Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Product List</Text>
          <View style={styles.productListContainer}>
            <ProductList />
          </View>
        </View>
        
        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Built with React Native
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  scrollContent: {
    paddingBottom: 20,
  },
  header: {
    backgroundColor: '#007AFF',
    padding: 20,
    paddingTop: 40,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#rgba(255,255,255,0.9)',
  },
  section: {
    marginTop: 20,
    paddingHorizontal: 10,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#333',
    marginBottom: 15,
    marginLeft: 10,
  },
  productListContainer: {
    height: 400, // Fixed height for FlatList
    marginBottom: 20,
  },
  footer: {
    marginTop: 30,
    padding: 20,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  footerText: {
    fontSize: 14,
    color: '#999',
  }
});

export default App;
```

## Key Conversion Points Explained

### 1. Component Mapping
- **HTML elements → Native components**: Every HTML element needs to be replaced with its React Native equivalent
- **Text must be wrapped**: All text content must be inside `<Text>` components

### 2. Styling Differences
- **No CSS files**: Styles are JavaScript objects using `StyleSheet.create()`
- **camelCase properties**: `background-color` becomes `backgroundColor`
- **No units for most values**: `padding: 20` not `padding: '20px'`
- **Flexbox by default**: All Views use flexbox layout

### 3. Event Handling
- **Different event names**: `onClick` → `onPress`, `onChange` → `onChangeText`
- **No event object for text inputs**: `onChangeText` receives the text directly

### 4. Platform-Specific Features
- **Shadows**: Different for iOS (shadowColor, shadowOffset) and Android (elevation)
- **Keyboard types**: Can specify keyboard type for inputs (`keyboardType="email-address"`)
- **Alert API**: Native alerts instead of browser alerts

### 5. List Rendering
- **FlatList over map**: More performant for long lists
- **Required props**: `data`, `renderItem`, and `keyExtractor`
- **Separators**: Built-in separator support

## Testing the Complete App

1. **Setup React Native environment** (using Expo for simplicity):
   ```bash
   npx create-expo-app MyApp
   cd MyApp
   ```

2. **Copy the solution code** into App.js

3. **Run the app**:
   ```bash
   npm start
   ```

4. **Test on device/simulator**:
   - Press 'a' for Android emulator
   - Press 'i' for iOS simulator
   - Scan QR code with Expo Go app on physical device

## Common Issues and Solutions

- **Text not showing**: Make sure all text is wrapped in `<Text>` components
- **Styles not applying**: Check for typos in camelCase property names
- **Touch not working**: Ensure using TouchableOpacity/TouchableHighlight, not View
- **Keyboard covering input**: Use `KeyboardAvoidingView` wrapper
- **List not scrolling**: Check if FlatList is inside a ScrollView (avoid this)