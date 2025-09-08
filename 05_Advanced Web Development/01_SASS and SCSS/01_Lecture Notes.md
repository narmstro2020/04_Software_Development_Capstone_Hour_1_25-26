# SASS and SCSS - Lecture Notes

<a id="top"></a>

## Table of Contents

| Topic | Description |
|-------|-------------|
| [Introduction](#introduction) | Overview of CSS preprocessors |
| [What is SASS/SCSS?](#what-is-sassscss) | Understanding SASS and SCSS syntax |
| [Installation and Setup](#installation-and-setup) | Setting up SASS in your development environment |
| [Variables](#variables) | Storing reusable values |
| [Nesting](#nesting) | Organizing CSS with nested selectors |
| [Partials and Imports](#partials-and-imports) | Modularizing your stylesheets |
| [Mixins](#mixins) | Creating reusable style blocks |
| [Functions](#functions) | Built-in and custom functions |
| [Control Directives](#control-directives) | @if, @for, @each, @while |
| [Operators](#operators) | Mathematical and logical operations |
| [Integration with React](#integration-with-react) | Using SASS in React projects |
| [Vocabulary](#vocabulary) | Key terms and definitions |
| [Summary](#summary) | Key takeaways |
| [Resources](#resources) | Additional learning materials |

---

## Introduction

CSS is powerful, but as your projects grow larger, you may find yourself repeating code, struggling with organization, or wishing for programming features like variables and functions. **SASS (Syntactically Awesome Style Sheets)** is a CSS preprocessor that extends CSS with features that don't exist in CSS yet like variables, nesting, mixins, inheritance, and other nifty goodies.

Since you've already worked with CSS and JavaScript, SASS will feel familiar while providing powerful tools to write more maintainable and organized styles.

[↑ Back to Top](#top)

---

## What is SASS/SCSS?

### SASS vs SCSS

SASS comes in two syntaxes:

1. **SASS (Indented Syntax)** - Uses indentation and newlines (like Python)
2. **SCSS (Sassy CSS)** - Uses braces and semicolons (like CSS)

**SCSS Example:**
```scss
$primary-color: #3498db;
$margin: 16px;

.header {
  background-color: $primary-color;
  margin: $margin;
  
  h1 {
    color: white;
    font-size: 2rem;
  }
}
```

**SASS Example:**
```sass
$primary-color: #3498db
$margin: 16px

.header
  background-color: $primary-color
  margin: $margin
  
  h1
    color: white
    font-size: 2rem
```

**Compiled CSS Output:**
```css
.header {
  background-color: #3498db;
  margin: 16px;
}

.header h1 {
  color: white;
  font-size: 2rem;
}
```

Since SCSS is more similar to CSS syntax you already know, we'll focus primarily on SCSS in this lesson.

[↑ Back to Top](#top)

---

## Installation and Setup

### Installing SASS

Since you're familiar with npm from your React projects, installing SASS is straightforward:

```bash
# Install globally
npm install -g sass

# Or install as a dev dependency in your project
npm install --save-dev sass
```

### Compiling SASS

```bash
# Compile a single file
sass input.scss output.css

# Watch for changes and compile automatically
sass --watch input.scss:output.css

# Watch entire directories
sass --watch scss/:css/
```

### File Extensions

- `.scss` files contain SCSS syntax
- `.sass` files contain SASS syntax
- Both compile to `.css` files

### Project Structure Example

```
project/
├── src/
│   ├── styles/
│   │   ├── main.scss
│   │   ├── _variables.scss
│   │   ├── _mixins.scss
│   │   └── components/
│   │       ├── _header.scss
│   │       └── _footer.scss
│   └── components/
└── dist/
    └── css/
        └── main.css
```

[↑ Back to Top](#top)

---

## Variables

Variables in SASS work similarly to JavaScript variables you've used, but for CSS values.

### Basic Variables

```scss
// Variables start with $
$primary-color: #3498db;
$secondary-color: #e74c3c;
$font-size-large: 24px;
$font-size-medium: 18px;
$font-size-small: 14px;
$border-radius: 4px;

.button {
  background-color: $primary-color;
  font-size: $font-size-medium;
  border-radius: $border-radius;
}

.alert {
  background-color: $secondary-color;
  font-size: $font-size-small;
  border-radius: $border-radius;
}
```

### Variable Scope

Like JavaScript, SASS variables have scope:

```scss
$global-color: blue; // Global variable

.component {
  $local-color: red; // Local variable
  color: $local-color;
  
  .nested {
    color: $global-color; // Can access global
    // color: $local-color; // Can also access parent's local
  }
}

// $local-color is not accessible here
```

### Default Values

```scss
$primary-color: #3498db !default;

// If $primary-color was already defined, this won't override it
// If not defined, it will use #3498db
```

### Variable Interpolation

```scss
$prefix: 'app';
$property: 'margin';

.#{$prefix}-header {
  #{$property}-bottom: 20px;
}

// Compiles to:
// .app-header {
//   margin-bottom: 20px;
// }
```

[↑ Back to Top](#top)

---

## Nesting

Nesting allows you to organize CSS similarly to HTML structure, but use it wisely!

### Basic Nesting

```scss
.navbar {
  background-color: #333;
  padding: 1rem;
  
  ul {
    list-style: none;
    margin: 0;
    
    li {
      display: inline-block;
      margin-right: 1rem;
      
      a {
        color: white;
        text-decoration: none;
        
        &:hover {
          color: #ccc;
        }
      }
    }
  }
}
```

### Parent Selector (&)

The `&` refers to the parent selector:

```scss
.button {
  background-color: blue;
  color: white;
  
  &:hover {
    background-color: darkblue;
  }
  
  &:active {
    background-color: navy;
  }
  
  &.disabled {
    background-color: gray;
    cursor: not-allowed;
  }
  
  &--large {
    font-size: 1.5rem;
    padding: 1rem 2rem;
  }
}
```

### Property Nesting

```scss
.text {
  font: {
    family: Arial, sans-serif;
    size: 16px;
    weight: bold;
  }
  
  margin: {
    top: 10px;
    bottom: 20px;
  }
}
```

### ⚠️ Nesting Best Practices

- **Limit nesting to 3-4 levels maximum**
- Don't mirror HTML structure exactly
- Use nesting for logical relationships, not just hierarchy

**Good:**
```scss
.card {
  border: 1px solid #ddd;
  
  &__header {
    background-color: #f5f5f5;
  }
  
  &__body {
    padding: 1rem;
  }
}
```

**Avoid:**
```scss
.main {
  .content {
    .section {
      .article {
        .paragraph {
          .text {
            // Too deeply nested!
          }
        }
      }
    }
  }
}
```

[↑ Back to Top](#top)

---

## Partials and Imports

Partials help organize your code into smaller, manageable files.

### Creating Partials

Partials start with underscore (`_`) and don't compile to separate CSS files:

**_variables.scss:**
```scss
$primary-color: #3498db;
$secondary-color: #e74c3c;
$font-stack: 'Helvetica Neue', Arial, sans-serif;
```

**_mixins.scss:**
```scss
@mixin button-style($bg-color, $text-color: white) {
  background-color: $bg-color;
  color: $text-color;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
```

**_base.scss:**
```scss
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: $font-stack;
}
```

### Importing Partials

**main.scss:**
```scss
@import 'variables';
@import 'mixins';
@import 'base';
@import 'components/header';
@import 'components/footer';

.app {
  min-height: 100vh;
  background-color: $primary-color;
}
```

### Modern @use Rule

SASS now recommends `@use` instead of `@import`:

```scss
@use 'variables' as vars;
@use 'mixins';

.header {
  background-color: vars.$primary-color;
  @include mixins.button-style(vars.$secondary-color);
}
```

[↑ Back to Top](#top)

---

## Mixins

Mixins are like JavaScript functions for CSS - they accept parameters and return CSS code.

### Basic Mixins

```scss
@mixin center-content {
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  @include center-content;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
```

### Mixins with Parameters

```scss
@mixin border-radius($radius: 4px) {
  -webkit-border-radius: $radius;
  -moz-border-radius: $radius;
  border-radius: $radius;
}

@mixin button($bg-color, $text-color: white, $size: medium) {
  background-color: $bg-color;
  color: $text-color;
  border: none;
  cursor: pointer;
  @include border-radius(4px);
  
  @if $size == small {
    padding: 0.25rem 0.5rem;
    font-size: 0.875rem;
  } @else if $size == large {
    padding: 0.75rem 1.5rem;
    font-size: 1.125rem;
  } @else {
    padding: 0.5rem 1rem;
    font-size: 1rem;
  }
}

.btn-primary {
  @include button(#007bff);
}

.btn-success {
  @include button(#28a745, white, large);
}
```

### Mixins with @content

```scss
@mixin mobile {
  @media (max-width: 768px) {
    @content;
  }
}

@mixin tablet {
  @media (min-width: 769px) and (max-width: 1024px) {
    @content;
  }
}

.sidebar {
  width: 300px;
  
  @include mobile {
    width: 100%;
  }
  
  @include tablet {
    width: 250px;
  }
}
```

[↑ Back to Top](#top)

---

## Functions

SASS provides built-in functions and allows custom functions.

### Built-in Color Functions

```scss
$base-color: #3498db;

.color-variations {
  background-color: $base-color;
  border-color: darken($base-color, 10%);
  color: lighten($base-color, 40%);
  
  &:hover {
    background-color: saturate($base-color, 20%);
  }
}
```

### Built-in Math Functions

```scss
.container {
  width: percentage(8/12); // 66.66667%
  margin: #{round(16.7px)}; // 17px
  padding: #{abs(-10px)}; // 10px
}
```

### Built-in String Functions

```scss
$font-family: 'Arial Black';

.text {
  font-family: unquote($font-family); // Arial Black (no quotes)
  content: quote(Hello); // "Hello"
}
```

### Custom Functions

```scss
@function calculate-rem($size) {
  @return #{$size / 16}rem;
}

@function power($base, $exponent) {
  $result: 1;
  @for $_ from 1 through $exponent {
    $result: $result * $base;
  }
  @return $result;
}

.title {
  font-size: calculate-rem(24); // 1.5rem
  line-height: power(1.2, 3); // 1.728
}
```

[↑ Back to Top](#top)

---

## Control Directives

SASS includes programming constructs similar to JavaScript.

### @if Directive

```scss
@mixin button-variant($type) {
  @if $type == primary {
    background-color: #007bff;
    color: white;
  } @else if $type == secondary {
    background-color: #6c757d;
    color: white;
  } @else if $type == danger {
    background-color: #dc3545;
    color: white;
  } @else {
    background-color: #f8f9fa;
    color: #212529;
  }
}

.btn-primary {
  @include button-variant(primary);
}
```

### @for Directive

```scss
// Create grid columns
@for $i from 1 through 12 {
  .col-#{$i} {
    width: percentage($i / 12);
  }
}

// Creates .col-1 through .col-12 with appropriate widths
```

### @each Directive

```scss
$sizes: small, medium, large;
$colors: red, green, blue;

@each $size in $sizes {
  .#{$size} {
    @if $size == small {
      font-size: 12px;
    } @else if $size == medium {
      font-size: 16px;
    } @else {
      font-size: 20px;
    }
  }
}

@each $color in $colors {
  .text-#{$color} {
    color: $color;
  }
}
```

### @while Directive

```scss
$i: 1;
@while $i <= 6 {
  .heading-#{$i} {
    font-size: #{7 - $i}rem;
  }
  $i: $i + 1;
}
```

[↑ Back to Top](#top)

---

## Operators

SASS supports mathematical and logical operators.

### Math Operators

```scss
$base-font-size: 16px;
$line-height-ratio: 1.5;

.text {
  font-size: $base-font-size;
  line-height: $base-font-size * $line-height-ratio; // 24px
  margin-bottom: $base-font-size / 2; // 8px
  padding: $base-font-size + 4px; // 20px
}

$container-width: 1200px;
$columns: 12;

.column {
  width: $container-width / $columns; // 100px
  width: percentage(1 / $columns); // 8.33333%
}
```

### Comparison Operators

```scss
@mixin responsive-text($size) {
  @if $size > 18px {
    font-weight: bold;
  }
  
  @if $size <= 14px {
    line-height: 1.6;
  } @else {
    line-height: 1.4;
  }
}
```

### String Operators

```scss
$prefix: 'app';
$suffix: 'container';

.#{$prefix + '-' + $suffix} {
  // .app-container
  width: 100%;
}
```

[↑ Back to Top](#top)

---

## Integration with React

Since you're familiar with React and Vite, here's how to use SASS in your React projects.

### Vite Setup

1. Install SASS:
```bash
npm install --save-dev sass
```

2. Rename your CSS files to `.scss`:
```
src/
├── App.scss
├── components/
│   ├── Header.scss
│   └── Button.scss
└── styles/
    ├── _variables.scss
    └── _mixins.scss
```

3. Import SCSS files in your components:
```jsx
import React from 'react';
import './App.scss';

function App() {
  return (
    <div className="app">
      <h1 className="app__title">My App</h1>
    </div>
  );
}

export default App;
```

### CSS Modules with SASS

**Button.module.scss:**
```scss
@import '../styles/variables';

.button {
  background-color: $primary-color;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  
  &:hover {
    background-color: darken($primary-color, 10%);
  }
  
  &.large {
    padding: 0.75rem 1.5rem;
    font-size: 1.125rem;
  }
}
```

**Button.jsx:**
```jsx
import React from 'react';
import styles from './Button.module.scss';

const Button = ({ children, size = 'medium', onClick }) => {
  const className = size === 'large' 
    ? `${styles.button} ${styles.large}` 
    : styles.button;
    
  return (
    <button className={className} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
```

### Global Styles Structure

**src/styles/_variables.scss:**
```scss
// Colors
$primary-color: #007bff;
$secondary-color: #6c757d;
$success-color: #28a745;
$danger-color: #dc3545;

// Typography
$font-family-base: 'Inter', system-ui, sans-serif;
$font-size-base: 1rem;
$line-height-base: 1.5;

// Spacing
$spacer: 1rem;
$spacers: (
  0: 0,
  1: $spacer * 0.25,
  2: $spacer * 0.5,
  3: $spacer,
  4: $spacer * 1.5,
  5: $spacer * 3
);

// Breakpoints
$breakpoints: (
  sm: 576px,
  md: 768px,
  lg: 992px,
  xl: 1200px
);
```

**src/styles/_mixins.scss:**
```scss
@use 'variables' as vars;

@mixin respond-to($breakpoint) {
  $size: map-get(vars.$breakpoints, $breakpoint);
  @media (min-width: $size) {
    @content;
  }
}

@mixin button-variant($bg-color, $border-color: $bg-color) {
  background-color: $bg-color;
  border-color: $border-color;
  
  &:hover {
    background-color: darken($bg-color, 7.5%);
    border-color: darken($border-color, 10%);
  }
}
```

**src/App.scss:**
```scss
@use 'styles/variables' as vars;
@use 'styles/mixins';

.app {
  font-family: vars.$font-family-base;
  
  &__container {
    max-width: 1200px;
    margin: 0 auto;
    padding: vars.$spacer;
    
    @include mixins.respond-to(md) {
      padding: vars.$spacer * 2;
    }
  }
}
```

[↑ Back to Top](#top)

---

## Vocabulary

| Term | Definition |
|------|------------|
| **Preprocessor** | A tool that extends CSS with programming features before compiling to standard CSS |
| **SASS** | Syntactically Awesome Style Sheets - the preprocessor itself |
| **SCSS** | Sassy CSS - CSS-like syntax for SASS |
| **Variable** | A storage location with a name that contains data (starts with $ in SASS) |
| **Nesting** | Writing CSS selectors inside other selectors to show hierarchy |
| **Partial** | A SASS file that starts with underscore and is imported into other files |
| **Mixin** | A reusable block of CSS declarations that can accept parameters |
| **Function** | A operation that returns a value, either built-in or custom |
| **Interpolation** | Including variable values inside selectors or property names using #{} |
| **Parent Selector** | The & symbol that refers to the parent selector in nested rules |
| **Compilation** | The process of converting SASS/SCSS to standard CSS |
| **Watch Mode** | Automatically recompiling SASS when files change |
| **Scope** | The area where a variable can be accessed (global vs local) |
| **Control Directive** | Programming constructs like @if, @for, @each, @while |
| **Import** | Including one SASS file in another using @import or @use |

[↑ Back to Top](#top)

---

## Summary

In this lesson, you learned:

### Key Concepts
- **SASS vs SCSS**: Two syntaxes for the same preprocessor, with SCSS being more CSS-like
- **Variables**: Store reusable values with $ prefix, similar to JavaScript variables
- **Nesting**: Organize CSS hierarchically, but limit depth to 3-4 levels
- **Partials**: Modularize styles using underscore-prefixed files
- **Mixins**: Create reusable CSS blocks with parameters, like functions
- **Functions**: Use built-in functions or create custom ones for calculations
- **Control Directives**: Programming constructs (@if, @for, @each, @while) for dynamic CSS

### Best Practices
- Keep nesting shallow (3-4 levels max)
- Use meaningful variable names
- Organize code with partials
- Create mixins for repeated patterns
- Use functions for calculations
- Follow consistent naming conventions

### React Integration
- Install SASS as dev dependency
- Import .scss files directly in components
- Use CSS modules for component-specific styles
- Structure global styles with variables and mixins
- Leverage existing JavaScript knowledge for SASS programming features

### Benefits over Standard CSS
- **Variables**: Centralized value management
- **Nesting**: Better organization and readability  
- **Mixins**: Reduced code duplication
- **Functions**: Dynamic value generation
- **Modularity**: Better file organization
- **Programming Features**: Loops, conditions, and calculations

SASS bridges the gap between CSS and programming, making stylesheets more maintainable and powerful while building on the CSS knowledge you already have.

[↑ Back to Top](#top)

---

## Resources

### Official Documentation
- [SASS Official Documentation](https://sass-lang.com/documentation)
- [SASS Guide](https://sass-lang.com/guide)

### W3Schools
- [W3Schools SASS Tutorial](https://www.w3schools.com/sass/)

### Tools and Setup
- [Vite SASS Documentation](https://vitejs.dev/guide/features.html#css-pre-processors)
- [Create React App SASS Setup](https://create-react-app.dev/docs/adding-a-sass-stylesheet/)

### Best Practices
- [SASS Guidelines](https://sass-guidelin.es/)
- [Architecture for SASS Projects](https://www.sitepoint.com/architecture-sass-project/)

### Visual Tools
- [SassMeister](https://www.sassmeister.com/) - Online SASS playground
- [CodePen](https://codepen.io/) - Test SASS/SCSS online

[↑ Back to Top](#top)