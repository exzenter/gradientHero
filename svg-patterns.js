// SVG Pattern Generator
class SVGPatternGenerator {
  constructor(container) {
    this.container = container;
    this.currentPattern = 'grid';
    this.size = 100;
    this.opacity = 0.15;
    this.strokeWidth = 1;
  }

  generatePattern(patternType, size = 100, color = '#ffffff', strokeWidth = 1) {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');
    svg.setAttribute('preserveAspectRatio', 'none');
    
    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    const pattern = document.createElementNS('http://www.w3.org/2000/svg', 'pattern');
    pattern.setAttribute('id', 'svg-pattern');
    pattern.setAttribute('width', size);
    pattern.setAttribute('height', size);
    pattern.setAttribute('patternUnits', 'userSpaceOnUse');

    // Convert hex color to rgba with better visibility
    // Use higher opacity for pattern elements so they're visible even with low overlay opacity
    const rgb = this.hexToRgb(color);
    const rgbaColor = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.5)`;

    switch(patternType) {
      case 'grid':
        this.createGrid(pattern, size, rgbaColor, strokeWidth);
        break;
      case 'dots':
        this.createDots(pattern, size, rgbaColor, strokeWidth);
        break;
      case 'lines-horizontal':
        this.createHorizontalLines(pattern, size, rgbaColor, strokeWidth);
        break;
      case 'lines-vertical':
        this.createVerticalLines(pattern, size, rgbaColor, strokeWidth);
        break;
      case 'diagonal':
        this.createDiagonal(pattern, size, rgbaColor, strokeWidth);
        break;
      case 'crosshatch':
        this.createCrosshatch(pattern, size, rgbaColor, strokeWidth);
        break;
      case 'hexagon':
        this.createHexagon(pattern, size, rgbaColor, strokeWidth);
        break;
      case 'circles':
        this.createCircles(pattern, size, rgbaColor, strokeWidth);
        break;
      case 'waves':
        this.createWaves(pattern, size, rgbaColor, strokeWidth);
        break;
      case 'mesh':
        this.createMesh(pattern, size, rgbaColor, strokeWidth);
        break;
      case 'noise':
        this.createNoise(pattern, size, rgbaColor, strokeWidth);
        break;
      case 'circuit':
        this.createCircuit(pattern, size, rgbaColor, strokeWidth);
        break;
      case 'scanlines':
        this.createScanlines(pattern, size, rgbaColor, strokeWidth);
        break;
      case 'dots-grid':
        this.createDotsGrid(pattern, size, rgbaColor, strokeWidth);
        break;
      case 'radial':
        this.createRadial(pattern, size, rgbaColor, strokeWidth);
        break;
    }

    defs.appendChild(pattern);
    svg.appendChild(defs);
    
    const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    rect.setAttribute('width', '100%');
    rect.setAttribute('height', '100%');
    rect.setAttribute('fill', 'url(#svg-pattern)');
    svg.appendChild(rect);

    return svg;
  }

  hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 255, g: 255, b: 255 };
  }

  createGrid(pattern, size, color, strokeWidth = 1) {
    const line1 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line1.setAttribute('x1', '0');
    line1.setAttribute('y1', '0');
    line1.setAttribute('x2', size);
    line1.setAttribute('y2', '0');
    line1.setAttribute('stroke', color);
    line1.setAttribute('stroke-width', strokeWidth);
    pattern.appendChild(line1);

    const line2 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line2.setAttribute('x1', '0');
    line2.setAttribute('y1', '0');
    line2.setAttribute('x2', '0');
    line2.setAttribute('y2', size);
    line2.setAttribute('stroke', color);
    line2.setAttribute('stroke-width', strokeWidth);
    pattern.appendChild(line2);
  }

  createDots(pattern, size, color) {
    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('cx', size / 2);
    circle.setAttribute('cy', size / 2);
    circle.setAttribute('r', '2');
    circle.setAttribute('fill', color);
    pattern.appendChild(circle);
  }

  createHorizontalLines(pattern, size, color, strokeWidth = 1) {
    for (let i = 0; i <= size; i += size / 10) {
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('x1', '0');
      line.setAttribute('y1', i);
      line.setAttribute('x2', size);
      line.setAttribute('y2', i);
      line.setAttribute('stroke', color);
      line.setAttribute('stroke-width', strokeWidth);
      pattern.appendChild(line);
    }
  }

  createVerticalLines(pattern, size, color, strokeWidth = 1) {
    for (let i = 0; i <= size; i += size / 10) {
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('x1', i);
      line.setAttribute('y1', '0');
      line.setAttribute('x2', i);
      line.setAttribute('y2', size);
      line.setAttribute('stroke', color);
      line.setAttribute('stroke-width', strokeWidth);
      pattern.appendChild(line);
    }
  }

  createDiagonal(pattern, size, color, strokeWidth = 1) {
    const line1 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line1.setAttribute('x1', '0');
    line1.setAttribute('y1', '0');
    line1.setAttribute('x2', size);
    line1.setAttribute('y2', size);
    line1.setAttribute('stroke', color);
    line1.setAttribute('stroke-width', strokeWidth);
    pattern.appendChild(line1);
  }

  createCrosshatch(pattern, size, color, strokeWidth = 1) {
    // Diagonal lines
    const line1 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line1.setAttribute('x1', '0');
    line1.setAttribute('y1', '0');
    line1.setAttribute('x2', size);
    line1.setAttribute('y2', size);
    line1.setAttribute('stroke', color);
    line1.setAttribute('stroke-width', strokeWidth);
    pattern.appendChild(line1);

    const line2 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line2.setAttribute('x1', size);
    line2.setAttribute('y1', '0');
    line2.setAttribute('x2', '0');
    line2.setAttribute('y2', size);
    line2.setAttribute('stroke', color);
    line2.setAttribute('stroke-width', strokeWidth);
    pattern.appendChild(line2);
  }

  createHexagon(pattern, size, color, strokeWidth = 1) {
    const hexSize = size / 2;
    const points = [];
    for (let i = 0; i < 6; i++) {
      const angle = (Math.PI / 3) * i;
      const x = hexSize + hexSize * 0.5 * Math.cos(angle);
      const y = hexSize + hexSize * 0.5 * Math.sin(angle);
      points.push(`${x},${y}`);
    }
    const polygon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
    polygon.setAttribute('points', points.join(' '));
    polygon.setAttribute('fill', 'none');
    polygon.setAttribute('stroke', color);
    polygon.setAttribute('stroke-width', strokeWidth);
    pattern.appendChild(polygon);
  }

  createCircles(pattern, size, color, strokeWidth = 1) {
    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('cx', size / 2);
    circle.setAttribute('cy', size / 2);
    circle.setAttribute('r', size / 3);
    circle.setAttribute('fill', 'none');
    circle.setAttribute('stroke', color);
    circle.setAttribute('stroke-width', strokeWidth);
    pattern.appendChild(circle);
  }

  createWaves(pattern, size, color, strokeWidth = 1) {
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    const waveHeight = size / 4;
    const d = `M 0 ${size / 2} Q ${size / 4} ${size / 2 - waveHeight} ${size / 2} ${size / 2} T ${size} ${size / 2}`;
    path.setAttribute('d', d);
    path.setAttribute('fill', 'none');
    path.setAttribute('stroke', color);
    path.setAttribute('stroke-width', strokeWidth);
    pattern.appendChild(path);
  }

  createMesh(pattern, size, color, strokeWidth = 1) {
    // Horizontal lines
    for (let i = 0; i <= size; i += size / 5) {
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('x1', '0');
      line.setAttribute('y1', i);
      line.setAttribute('x2', size);
      line.setAttribute('y2', i);
      line.setAttribute('stroke', color);
      line.setAttribute('stroke-width', strokeWidth);
      pattern.appendChild(line);
    }
    // Vertical lines
    for (let i = 0; i <= size; i += size / 5) {
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('x1', i);
      line.setAttribute('y1', '0');
      line.setAttribute('x2', i);
      line.setAttribute('y2', size);
      line.setAttribute('stroke', color);
      line.setAttribute('stroke-width', strokeWidth);
      pattern.appendChild(line);
    }
  }

  createNoise(pattern, size, color) {
    for (let i = 0; i < 50; i++) {
      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      circle.setAttribute('cx', Math.random() * size);
      circle.setAttribute('cy', Math.random() * size);
      circle.setAttribute('r', Math.random() * 2 + 0.5);
      circle.setAttribute('fill', color);
      pattern.appendChild(circle);
    }
  }

  createCircuit(pattern, size, color, strokeWidth = 1) {
    // Create circuit-like pattern
    const paths = [
      `M 0 ${size / 2} L ${size / 2} ${size / 2} L ${size / 2} 0`,
      `M ${size / 2} ${size / 2} L ${size} ${size / 2} L ${size} ${size}`,
      `M ${size / 4} ${size / 4} L ${size * 3 / 4} ${size / 4}`,
      `M ${size / 4} ${size * 3 / 4} L ${size * 3 / 4} ${size * 3 / 4}`
    ];
    
    paths.forEach(d => {
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('d', d);
      path.setAttribute('fill', 'none');
      path.setAttribute('stroke', color);
      path.setAttribute('stroke-width', strokeWidth);
      pattern.appendChild(path);
    });

    // Add nodes - use slightly brighter color
    // Extract RGB from rgba string
    const rgbMatch = color.match(/rgba\((\d+),\s*(\d+),\s*(\d+)/);
    const rgb = rgbMatch ? { r: parseInt(rgbMatch[1]), g: parseInt(rgbMatch[2]), b: parseInt(rgbMatch[3]) } : { r: 255, g: 255, b: 255 };
    const nodeColor = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.2)`;
    const nodes = [
      [size / 2, size / 2],
      [size / 4, size / 4],
      [size * 3 / 4, size / 4],
      [size / 4, size * 3 / 4],
      [size * 3 / 4, size * 3 / 4]
    ];

    nodes.forEach(([x, y]) => {
      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      circle.setAttribute('cx', x);
      circle.setAttribute('cy', y);
      circle.setAttribute('r', '2');
      circle.setAttribute('fill', nodeColor);
      pattern.appendChild(circle);
    });
  }

  createScanlines(pattern, size, color, strokeWidth = 1) {
    // Use slightly more transparent for scanlines
    const scanColor = color.replace('0.1', '0.05');
    for (let i = 0; i <= size; i += 2) {
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('x1', '0');
      line.setAttribute('y1', i);
      line.setAttribute('x2', size);
      line.setAttribute('y2', i);
      line.setAttribute('stroke', scanColor);
      line.setAttribute('stroke-width', strokeWidth);
      pattern.appendChild(line);
    }
  }

  createDotsGrid(pattern, size, color) {
    const spacing = size / 5;
    for (let x = spacing; x < size; x += spacing) {
      for (let y = spacing; y < size; y += spacing) {
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', x);
        circle.setAttribute('cy', y);
        circle.setAttribute('r', '1.5');
        circle.setAttribute('fill', color);
        pattern.appendChild(circle);
      }
    }
  }

  createRadial(pattern, size, color, strokeWidth = 1) {
    const center = size / 2;
    for (let i = 1; i <= 5; i++) {
      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      circle.setAttribute('cx', center);
      circle.setAttribute('cy', center);
      circle.setAttribute('r', (size / 6) * i);
      circle.setAttribute('fill', 'none');
      circle.setAttribute('stroke', color);
      circle.setAttribute('stroke-width', strokeWidth);
      pattern.appendChild(circle);
    }
  }

  updatePattern(patternType, size, opacity, color = '#ffffff', blendMode = 'normal', strokeWidth = 1) {
    this.currentPattern = patternType;
    this.size = size;
    this.opacity = opacity;
    this.color = color;
    this.blendMode = blendMode;
    this.strokeWidth = strokeWidth;
    
    // Clear container
    this.container.innerHTML = '';
    
    // Generate and add new pattern
    const svg = this.generatePattern(patternType, size, color, strokeWidth);
    svg.style.opacity = opacity / 100;
    svg.style.mixBlendMode = blendMode;
    this.container.appendChild(svg);
  }

  setEnabled(enabled) {
    this.container.style.display = enabled ? 'block' : 'none';
  }
}

// Initialize SVG pattern generator
let svgPatternGenerator;

document.addEventListener('DOMContentLoaded', () => {
  const svgOverlay = document.getElementById('svgOverlay');
  if (svgOverlay) {
    svgPatternGenerator = new SVGPatternGenerator(svgOverlay);
    // Initialize with proper defaults: pattern, size, opacity, color, blendMode, strokeWidth
    svgPatternGenerator.updatePattern('grid', 100, 15, '#ffffff', 'normal', 1);
  }
});

