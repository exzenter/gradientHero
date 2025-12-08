# gradientHero

An animated, customizable gradient hero background built with HTML5 Canvas. Features real-time controls for colors, effects, SVG patterns, and blend modes.

## Features

- 🎨 **Animated Canvas Gradients** - Smooth, fluid gradient animations with customizable colors and movement
- 🎛️ **Real-time Controls** - Extensive control panel for live customization
- 🎭 **Blend Modes** - Multiple CSS blend modes (multiply, screen, overlay, soft-light, etc.)
- 🖼️ **SVG Pattern Overlays** - 14+ pattern types (grid, dots, lines, hexagon, waves, mesh, etc.)
- 🎨 **Color Customization** - Hue range or custom palette modes
- ⚡ **Performance Optimized** - Smooth 60fps animations with efficient canvas rendering
- 📱 **Responsive** - Works on all screen sizes
- 💾 **Export Functionality** - Export your custom animations

## Quick Start

1. Clone the repository:
```bash
git clone https://github.com/exzenter/gradientHero.git
```

2. Open `index.html` in your web browser

3. Click the control panel button (top-right) to customize the gradient

## Controls

### Canvas Gradient Settings
- **Gradient Opacity** - Control overall transparency
- **Blur** - Apply blur effects to gradients
- **Brightness, Contrast, Saturation** - Fine-tune appearance
- **Hue Rotation** - Shift color hues
- **Gradient Scale** - Adjust gradient size
- **Center Position** - Control X/Y positioning
- **Mix Blend Mode** - Choose from 12+ blend modes
- **Gradient Count** - Number of animated gradients (2-10)
- **Animation Speed** - Control animation velocity
- **Gradient Color Fade** - Adjust fade point in gradients

### Color Settings
- **Hue Range Mode** - Auto-generate colors from hue range
- **Custom Palette Mode** - Use your own color palette
- **Saturation & Lightness** - Fine-tune color properties

### SVG Pattern Overlay
- **14+ Pattern Types** - Grid, dots, lines, hexagon, waves, mesh, circuit, and more
- **Opacity & Size** - Customize pattern appearance
- **Stroke Width** - Adjust pattern line thickness
- **Pattern Color** - Choose overlay color
- **Blend Modes** - Apply blend modes to patterns

### Background
- **Background Color** - Set base background color
- **Gradient Overlay** - Optional gradient overlay with angle control

## Usage

Simply include the files in your project and customize the hero content in `index.html`:

```html
<main class="hero-content">
  <h1>Your Hero Title</h1>
  <!-- Your content here -->
</main>
```

The gradient animation will automatically fill the viewport behind your content.

## Files

- `index.html` - Main HTML structure
- `canvas-animation.js` - Core gradient animation engine
- `controls.js` - Control panel functionality
- `styles.css` - Styling and layout
- `svg-patterns.js` - SVG pattern generation

## Browser Support

Works in all modern browsers that support:
- HTML5 Canvas
- CSS Blend Modes
- ES6 JavaScript

## License

MIT License

## Author

**Mitch**

---

Made with ❤️ for beautiful web experiences

