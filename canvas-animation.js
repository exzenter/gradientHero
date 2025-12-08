// Canvas Gradient Animation
class GradientAnimation {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.animationId = null;
    
    // Animation properties
    this.gradients = [];
    this.time = 0;
    this.speed = 0.0005;
    
    // Settings
    this.settings = {
      opacity: 1,
      blur: 0,
      brightness: 100,
      contrast: 100,
      saturation: 100,
      hue: 0,
      scale: 1,
      positionX: 0.5,
      positionY: 0.5,
      blendMode: 'normal',
      gradientCount: 5,
      gradientSpeed: 0.5,
      colorIntensity: 0.6,
      backgroundColor: '#000000',
      gradientFade: 0.5,
      hueStart: 200,
      hueEnd: 280,
      saturationMin: 60,
      saturationMax: 100,
      lightnessMin: 20,
      lightnessMax: 50,
      colorMode: 'hue-range',
      paletteColors: ['#4a90e2', '#5ba3f5', '#6bb6ff', '#7bc9ff', '#8bdaff'],
      fadeoutMode: 'none',
      fadeoutTime: 10
    };
    
    // Fadeout tracking
    this.fadeoutLastTime = Date.now();
    this.accumulatingBlendModes = ['lighten', 'screen', 'color-dodge', 'overlay', 'soft-light'];
    
    this.init();
  }
  
  init() {
    this.resize();
    window.addEventListener('resize', () => this.resize());
    this.createGradients();
    this.animate();
  }
  
  resize() {
    const dpr = window.devicePixelRatio || 1;
    // Use viewport dimensions (100vw/100vh)
    const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
    
    this.canvas.width = vw * dpr;
    this.canvas.height = vh * dpr;
    this.ctx.scale(dpr, dpr);
    this.canvas.style.width = vw + 'px';
    this.canvas.style.height = vh + 'px';
  }
  
  createGradients() {
    this.gradients = [];
    const count = this.settings.gradientCount;
    
    for (let i = 0; i < count; i++) {
      this.gradients.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        radius: 200 + Math.random() * 400,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        color: this.generateColor(i),
        opacity: 0.3 + Math.random() * 0.4,
        phase: Math.random() * Math.PI * 2,
        baseIndex: i // Store index for palette mode
      });
    }
  }
  
  generateColor(index = null) {
    if (this.settings.colorMode === 'palette' && this.settings.paletteColors.length > 0) {
      // Use custom palette colors
      const paletteIndex = index !== null ? index % this.settings.paletteColors.length : Math.floor(Math.random() * this.settings.paletteColors.length);
      return this.settings.paletteColors[paletteIndex];
    } else {
      // Generate colors from hue range
      const hueRange = this.settings.hueEnd - this.settings.hueStart;
      const hue = this.settings.hueStart + (Math.random() * hueRange);
      const saturation = this.settings.saturationMin + Math.random() * (this.settings.saturationMax - this.settings.saturationMin);
      const lightness = this.settings.lightnessMin + Math.random() * (this.settings.lightnessMax - this.settings.lightnessMin);
      return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    }
  }
  
  updateGradients() {
    const width = this.canvas.width / (window.devicePixelRatio || 1);
    const height = this.canvas.height / (window.devicePixelRatio || 1);
    
    // Calculate center offset based on position settings
    const centerX = width * this.settings.positionX;
    const centerY = height * this.settings.positionY;
    
    // First, calculate base positions
    this.gradients.forEach((gradient, i) => {
      // Animated movement with sine waves, relative to center
      const baseX = centerX + Math.sin(this.time * this.settings.gradientSpeed + gradient.phase) * width * 0.3;
      const baseY = centerY + Math.cos(this.time * this.settings.gradientSpeed + gradient.phase * 1.3) * height * 0.3;
      
      gradient.x = baseX;
      gradient.y = baseY;
      
      // Update color based on mode
      if (this.settings.colorMode === 'palette' && this.settings.paletteColors.length > 0) {
        // In palette mode, use the palette color but allow slight variation
        const paletteIndex = gradient.baseIndex % this.settings.paletteColors.length;
        gradient.color = this.settings.paletteColors[paletteIndex];
      } else {
        // In hue-range mode, animate color with hue rotation
        const hueShift = Math.sin(this.time * 0.3 + i) * 20 + this.settings.hue;
        const hueRange = this.settings.hueEnd - this.settings.hueStart;
        const baseHue = this.settings.hueStart + (hueRange / 2) + hueShift;
        const sat = Math.max(
          this.settings.saturationMin, 
          Math.min(this.settings.saturationMax, 
            (this.settings.saturationMin + this.settings.saturationMax) / 2 + Math.sin(this.time + i) * ((this.settings.saturationMax - this.settings.saturationMin) / 2)
          )
        );
        const light = Math.max(
          this.settings.lightnessMin,
          Math.min(this.settings.lightnessMax,
            (this.settings.lightnessMin + this.settings.lightnessMax) / 2 + Math.sin(this.time * 0.5 + i) * ((this.settings.lightnessMax - this.settings.lightnessMin) / 2)
          )
        );
        gradient.color = `hsl(${baseHue % 360}, ${sat}%, ${light}%)`;
      }
      
      // Pulsing opacity
      gradient.opacity = (0.3 + Math.sin(this.time * 0.4 + gradient.phase) * 0.2) * this.settings.opacity;
    });
    
    // Apply repulsion forces to prevent grouping
    this.applyRepulsion();
    
    // Wrap around edges after repulsion
    this.gradients.forEach((gradient) => {
      if (gradient.x < -gradient.radius) gradient.x = width + gradient.radius;
      if (gradient.x > width + gradient.radius) gradient.x = -gradient.radius;
      if (gradient.y < -gradient.radius) gradient.y = height + gradient.radius;
      if (gradient.y > height + gradient.radius) gradient.y = -gradient.radius;
    });
  }
  
  applyRepulsion() {
    const minDistance = 150; // Minimum distance between gradients
    const repulsionStrength = 0.15; // How strong the repulsion is
    const overlapThreshold = 0.6; // Consider overlapping if centers are within 60% of average radius
    
    for (let i = 0; i < this.gradients.length; i++) {
      const gradient1 = this.gradients[i];
      const overlappingIndices = [];
      
      // Find all overlapping gradients
      for (let j = 0; j < this.gradients.length; j++) {
        if (i === j) continue;
        
        const gradient2 = this.gradients[j];
        const dx = gradient1.x - gradient2.x;
        const dy = gradient1.y - gradient2.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Calculate average radius
        const avgRadius = (gradient1.radius + gradient2.radius) / 2;
        const threshold = avgRadius * overlapThreshold;
        
        // If too close, mark as overlapping
        if (distance < threshold) {
          overlappingIndices.push(j);
        }
      }
      
      // If 3 or more gradients are overlapping (including this one), apply stronger repulsion
      if (overlappingIndices.length >= 2) {
        // This is the 3rd+ overlapping blob, apply stronger repulsion
        const forceMultiplier = 1 + (overlappingIndices.length - 1) * 0.5; // Stronger force for more overlaps
        
        let totalForceX = 0;
        let totalForceY = 0;
        
        overlappingIndices.forEach(j => {
          const gradient2 = this.gradients[j];
          const dx = gradient1.x - gradient2.x;
          const dy = gradient1.y - gradient2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance > 0 && distance < minDistance) {
            // Normalize direction
            const nx = dx / distance;
            const ny = dy / distance;
            
            // Calculate repulsion force (stronger when closer)
            const force = (minDistance - distance) / minDistance;
            totalForceX += nx * force * repulsionStrength * forceMultiplier;
            totalForceY += ny * force * repulsionStrength * forceMultiplier;
          }
        });
        
        // Apply the repulsion force
        gradient1.x += totalForceX;
        gradient1.y += totalForceY;
      } else {
        // Normal repulsion for non-overlapping cases
        overlappingIndices.forEach(j => {
          const gradient2 = this.gradients[j];
          const dx = gradient1.x - gradient2.x;
          const dy = gradient1.y - gradient2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance > 0 && distance < minDistance) {
            const nx = dx / distance;
            const ny = dy / distance;
            const force = (minDistance - distance) / minDistance;
            
            gradient1.x += nx * force * repulsionStrength * 0.5;
            gradient1.y += ny * force * repulsionStrength * 0.5;
          }
        });
      }
    }
  }
  
  draw() {
    const dpr = window.devicePixelRatio || 1;
    const width = this.canvas.width / dpr;
    const height = this.canvas.height / dpr;
    
    // Handle fadeout for accumulating blend modes
    const shouldFadeout = this.settings.fadeoutMode !== 'none' && 
                         this.accumulatingBlendModes.includes(this.settings.blendMode);
    
    // Clear canvas with background color
    this.ctx.globalCompositeOperation = 'source-over';
    this.ctx.fillStyle = this.settings.backgroundColor;
    this.ctx.fillRect(0, 0, width, height);
    
    // Apply global settings
    this.ctx.globalCompositeOperation = this.settings.blendMode;
    
    // Apply blur filter to context (only affects drawn content, not canvas edges)
    if (this.settings.blur > 0) {
      this.ctx.filter = `blur(${this.settings.blur}px)`;
    } else {
      this.ctx.filter = 'none';
    }
    
    // Draw gradients
    this.gradients.forEach(gradient => {
      const scaledRadius = gradient.radius * this.settings.scale;
      const grad = this.ctx.createRadialGradient(
        gradient.x, gradient.y, 0,
        gradient.x, gradient.y, scaledRadius
      );
      
      // Convert HSL to HSLA for opacity
      const colorMatch = gradient.color.match(/hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)/);
      if (colorMatch) {
        const [, h, s, l] = colorMatch;
        const fadePoint = this.settings.gradientFade; // 0-1, controls where the fade happens
        
        grad.addColorStop(0, `hsla(${h}, ${s}%, ${l}%, ${gradient.opacity})`);
        grad.addColorStop(fadePoint, `hsla(${h}, ${s}%, ${l}%, ${gradient.opacity * (1 - fadePoint)})`);
        grad.addColorStop(1, `hsla(${h}, ${s}%, ${l}%, 0)`);
      } else {
        grad.addColorStop(0, gradient.color);
        grad.addColorStop(1, 'transparent');
      }
      
      this.ctx.fillStyle = grad;
      this.ctx.fillRect(0, 0, width, height);
    });
    
    // Reset filter after drawing
    this.ctx.filter = 'none';
    
    // Apply fadeout AFTER drawing (to fade accumulated brightness)
    if (shouldFadeout) {
      const fadeoutInterval = this.settings.fadeoutMode === 'auto' ? 10 : this.settings.fadeoutTime;
      const fadePerSecond = 1 / fadeoutInterval; // How much to fade per second
      const fadePerFrame = fadePerSecond / 60; // Assuming ~60fps
      const fadeAmount = Math.min(0.03, fadePerFrame * 0.8); // Cap at 3% per frame
      
      // Use multiply blend to darken the accumulated bright content
      this.ctx.globalCompositeOperation = 'multiply';
      this.ctx.fillStyle = `rgba(255, 255, 255, ${1 - fadeAmount})`; // Multiply with slightly darker white
      this.ctx.fillRect(0, 0, width, height);
    }
    
    // Apply other filters via CSS (brightness, contrast, saturation, hue)
    this.applyFilters();
  }
  
  applyFilters() {
    // Apply CSS filters for brightness, contrast, saturation, and hue
    // Blur is now handled via canvas context filter to avoid edge blurring
    const filter = [];
    if (this.settings.brightness !== 100) filter.push(`brightness(${this.settings.brightness}%)`);
    if (this.settings.contrast !== 100) filter.push(`contrast(${this.settings.contrast}%)`);
    if (this.settings.saturation !== 100) filter.push(`saturate(${this.settings.saturation}%)`);
    if (this.settings.hue !== 0) filter.push(`hue-rotate(${this.settings.hue}deg)`);
    
    this.canvas.style.filter = filter.join(' ') || 'none';
  }
  
  animate() {
    this.time += this.speed;
    this.updateGradients();
    this.draw();
    this.animationId = requestAnimationFrame(() => this.animate());
  }
  
  updateSetting(key, value) {
    this.settings[key] = value;
    if (key === 'gradientCount') {
      this.createGradients();
    } else if (key === 'colorMode' || key === 'paletteColors') {
      // Regenerate gradients when color mode or palette changes
      this.createGradients();
    } else if (key.startsWith('hue') || key.startsWith('saturation') || key.startsWith('lightness')) {
      // Colors will update on next frame, no need to recreate
    } else if (key === 'fadeoutMode' || key === 'fadeoutTime') {
      // Reset fadeout timer when settings change
      this.fadeoutLastTime = Date.now();
    }
  }
  
  destroy() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
  }
}

// Initialize animation
let gradientAnimation;

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('gradientCanvas');
  if (canvas) {
    gradientAnimation = new GradientAnimation(canvas);
  }
});

