// Control Panel Toggle
const settingsBtn = document.getElementById('settingsBtn');
const controlsOverlay = document.getElementById('controlsOverlay');
const closeControls = document.getElementById('closeControls');

if (settingsBtn) {
  settingsBtn.addEventListener('click', () => {
    controlsOverlay.classList.toggle('active');
  });
}

// Hero Export Button
const heroExportBtn = document.getElementById('exportBtn');
if (heroExportBtn) {
  heroExportBtn.addEventListener('click', async () => {
    await exportAnimation();
  });
}

// Accordion functionality
document.addEventListener('DOMContentLoaded', () => {
  const accordionHeaders = document.querySelectorAll('.accordion-header');
  
  accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const section = header.closest('.control-section');
      section.classList.toggle('collapsed');
    });
  });
  
  // Optionally, collapse all sections by default except the first one
  const sections = document.querySelectorAll('.control-section');
  sections.forEach((section, index) => {
    if (index > 0) {
      section.classList.add('collapsed');
    }
  });
});

closeControls.addEventListener('click', () => {
  controlsOverlay.classList.remove('active');
});

// Get elements
const canvas = document.getElementById('gradientCanvas');
const bgWrapper = document.querySelector('.background-gradient-wrapper');

// Default values
const defaults = {
  videoOpacity: 100,
  videoBlur: 0,
  brightness: 100,
  contrast: 100,
  saturation: 100,
  hue: 0,
  videoScale: 100,
  positionX: 50,
  positionY: 50,
  blendMode: 'normal',
  canvasBgColor: '#000000',
  gradientFade: 50,
  gradientCount: 5,
  animationSpeed: 50,
  fadeoutMode: 'none',
  fadeoutTime: 10,
  hueStart: 200,
  hueEnd: 280,
  saturationMin: 60,
  saturationMax: 100,
  lightnessMin: 20,
  lightnessMax: 50,
  colorMode: 'hue-range',
  paletteColor1: '#4a90e2',
  paletteColor2: '#5ba3f5',
  paletteColor3: '#6bb6ff',
  paletteColor4: '#7bc9ff',
  paletteColor5: '#8bdaff',
  bgColor: '#000000',
  gradientOverlay: false,
  gradientStart: '#000000',
  gradientEnd: '#000000',
  gradientAngle: 180,
  svgEnabled: true,
  svgOpacity: 15,
  svgSize: 100,
  svgStrokeWidth: 1,
  svgPattern: 'grid',
  svgColor: '#ffffff',
  svgBlendMode: 'normal'
};

// Initialize controls
function initControls() {
  // Canvas Opacity
  const videoOpacity = document.getElementById('videoOpacity');
  const videoOpacityValue = document.getElementById('videoOpacityValue');
  videoOpacity.addEventListener('input', (e) => {
    const value = e.target.value;
    videoOpacityValue.textContent = value + '%';
    if (gradientAnimation) {
      gradientAnimation.updateSetting('opacity', value / 100);
    }
  });

  // Canvas Blur
  const videoBlur = document.getElementById('videoBlur');
  const videoBlurValue = document.getElementById('videoBlurValue');
  videoBlur.addEventListener('input', (e) => {
    const value = e.target.value;
    videoBlurValue.textContent = value + 'px';
    if (gradientAnimation) {
      gradientAnimation.updateSetting('blur', parseFloat(value));
    }
  });

  // Brightness
  const brightness = document.getElementById('brightness');
  const brightnessValue = document.getElementById('brightnessValue');
  brightness.addEventListener('input', (e) => {
    const value = e.target.value;
    brightnessValue.textContent = value + '%';
    if (gradientAnimation) {
      gradientAnimation.updateSetting('brightness', parseFloat(value));
    }
  });

  // Contrast
  const contrast = document.getElementById('contrast');
  const contrastValue = document.getElementById('contrastValue');
  contrast.addEventListener('input', (e) => {
    const value = e.target.value;
    contrastValue.textContent = value + '%';
    if (gradientAnimation) {
      gradientAnimation.updateSetting('contrast', parseFloat(value));
    }
  });

  // Saturation
  const saturation = document.getElementById('saturation');
  const saturationValue = document.getElementById('saturationValue');
  saturation.addEventListener('input', (e) => {
    const value = e.target.value;
    saturationValue.textContent = value + '%';
    if (gradientAnimation) {
      gradientAnimation.updateSetting('saturation', parseFloat(value));
    }
  });

  // Hue
  const hue = document.getElementById('hue');
  const hueValue = document.getElementById('hueValue');
  hue.addEventListener('input', (e) => {
    const value = e.target.value;
    hueValue.textContent = value + 'deg';
    if (gradientAnimation) {
      gradientAnimation.updateSetting('hue', parseFloat(value));
    }
  });

  // Canvas Scale
  const videoScale = document.getElementById('videoScale');
  const videoScaleValue = document.getElementById('videoScaleValue');
  videoScale.addEventListener('input', (e) => {
    const value = e.target.value;
    videoScaleValue.textContent = value + '%';
    if (gradientAnimation) {
      gradientAnimation.updateSetting('scale', value / 100);
      canvas.style.transform = `scale(${value / 100})`;
    }
  });

  // Position X
  const positionX = document.getElementById('positionX');
  const positionXValue = document.getElementById('positionXValue');
  positionX.addEventListener('input', (e) => {
    const value = e.target.value;
    positionXValue.textContent = value + '%';
    if (gradientAnimation) {
      gradientAnimation.updateSetting('positionX', value / 100);
    }
  });

  // Position Y
  const positionY = document.getElementById('positionY');
  const positionYValue = document.getElementById('positionYValue');
  positionY.addEventListener('input', (e) => {
    const value = e.target.value;
    positionYValue.textContent = value + '%';
    if (gradientAnimation) {
      gradientAnimation.updateSetting('positionY', value / 100);
    }
  });

  // Blend Mode
  const blendMode = document.getElementById('blendMode');
  blendMode.addEventListener('change', (e) => {
    if (gradientAnimation) {
      gradientAnimation.updateSetting('blendMode', e.target.value);
      // Reset fadeout timer when blend mode changes
      gradientAnimation.fadeoutLastTime = Date.now();
    }
  });

  // Fadeout Mode
  const fadeoutMode = document.getElementById('fadeoutMode');
  const fadeoutTimeControl = document.getElementById('fadeoutTimeControl');
  const fadeoutTime = document.getElementById('fadeoutTime');
  const fadeoutTimeValue = document.getElementById('fadeoutTimeValue');

  function updateFadeoutMode() {
    const mode = fadeoutMode.value;
    if (gradientAnimation) {
      gradientAnimation.updateSetting('fadeoutMode', mode);
    }
    
    // Show/hide fadeout time control
    if (mode === 'custom') {
      fadeoutTimeControl.style.display = 'block';
    } else {
      fadeoutTimeControl.style.display = 'none';
    }
  }

  fadeoutMode.addEventListener('change', updateFadeoutMode);

  // Fadeout Time
  fadeoutTime.addEventListener('input', (e) => {
    const value = e.target.value;
    fadeoutTimeValue.textContent = value + 's';
    if (gradientAnimation) {
      gradientAnimation.updateSetting('fadeoutTime', parseFloat(value));
    }
  });

  // Gradient Count
  const gradientCount = document.getElementById('gradientCount');
  const gradientCountValue = document.getElementById('gradientCountValue');
  gradientCount.addEventListener('input', (e) => {
    const value = e.target.value;
    gradientCountValue.textContent = value;
    if (gradientAnimation) {
      gradientAnimation.updateSetting('gradientCount', parseInt(value));
    }
  });

  // Animation Speed
  const animationSpeed = document.getElementById('animationSpeed');
  const animationSpeedValue = document.getElementById('animationSpeedValue');
  animationSpeed.addEventListener('input', (e) => {
    const value = e.target.value;
    animationSpeedValue.textContent = (value / 100).toFixed(2);
    if (gradientAnimation) {
      gradientAnimation.updateSetting('gradientSpeed', value / 100);
    }
  });

  // Gradient Fade
  const gradientFade = document.getElementById('gradientFade');
  const gradientFadeValue = document.getElementById('gradientFadeValue');
  gradientFade.addEventListener('input', (e) => {
    const value = e.target.value;
    gradientFadeValue.textContent = value + '%';
    if (gradientAnimation) {
      gradientAnimation.updateSetting('gradientFade', value / 100);
    }
  });

  // Canvas Background Color
  const canvasBgColor = document.getElementById('canvasBgColor');
  canvasBgColor.addEventListener('input', (e) => {
    if (gradientAnimation) {
      gradientAnimation.updateSetting('backgroundColor', e.target.value);
    }
  });

  // Gradient Color Controls
  const hueStart = document.getElementById('hueStart');
  const hueStartValue = document.getElementById('hueStartValue');
  hueStart.addEventListener('input', (e) => {
    const value = e.target.value;
    hueStartValue.textContent = value + '°';
    if (gradientAnimation) {
      gradientAnimation.updateSetting('hueStart', parseFloat(value));
    }
  });

  const hueEnd = document.getElementById('hueEnd');
  const hueEndValue = document.getElementById('hueEndValue');
  hueEnd.addEventListener('input', (e) => {
    const value = e.target.value;
    hueEndValue.textContent = value + '°';
    if (gradientAnimation) {
      gradientAnimation.updateSetting('hueEnd', parseFloat(value));
    }
  });

  const saturationMin = document.getElementById('saturationMin');
  const saturationMinValue = document.getElementById('saturationMinValue');
  saturationMin.addEventListener('input', (e) => {
    const value = e.target.value;
    saturationMinValue.textContent = value + '%';
    if (gradientAnimation) {
      gradientAnimation.updateSetting('saturationMin', parseFloat(value));
    }
  });

  const saturationMax = document.getElementById('saturationMax');
  const saturationMaxValue = document.getElementById('saturationMaxValue');
  saturationMax.addEventListener('input', (e) => {
    const value = e.target.value;
    saturationMaxValue.textContent = value + '%';
    if (gradientAnimation) {
      gradientAnimation.updateSetting('saturationMax', parseFloat(value));
    }
  });

  const lightnessMin = document.getElementById('lightnessMin');
  const lightnessMinValue = document.getElementById('lightnessMinValue');
  lightnessMin.addEventListener('input', (e) => {
    const value = e.target.value;
    lightnessMinValue.textContent = value + '%';
    if (gradientAnimation) {
      gradientAnimation.updateSetting('lightnessMin', parseFloat(value));
    }
  });

  const lightnessMax = document.getElementById('lightnessMax');
  const lightnessMaxValue = document.getElementById('lightnessMaxValue');
  lightnessMax.addEventListener('input', (e) => {
    const value = e.target.value;
    lightnessMaxValue.textContent = value + '%';
    if (gradientAnimation) {
      gradientAnimation.updateSetting('lightnessMax', parseFloat(value));
    }
  });

  // Color Mode
  const colorMode = document.getElementById('colorMode');
  const paletteControls = document.getElementById('paletteControls');
  const paletteControls2 = document.getElementById('paletteControls2');
  const paletteControls3 = document.getElementById('paletteControls3');
  const paletteControls4 = document.getElementById('paletteControls4');
  const paletteControls5 = document.getElementById('paletteControls5');

  function updateColorMode() {
    const mode = colorMode.value;
    if (gradientAnimation) {
      gradientAnimation.updateSetting('colorMode', mode);
    }
    
    if (mode === 'palette') {
      paletteControls.style.display = 'block';
      paletteControls2.style.display = 'block';
      paletteControls3.style.display = 'block';
      paletteControls4.style.display = 'block';
      paletteControls5.style.display = 'block';
    } else {
      paletteControls.style.display = 'none';
      paletteControls2.style.display = 'none';
      paletteControls3.style.display = 'none';
      paletteControls4.style.display = 'none';
      paletteControls5.style.display = 'none';
    }
  }

  colorMode.addEventListener('change', updateColorMode);

  // Palette Colors
  const paletteColor1 = document.getElementById('paletteColor1');
  const paletteColor2 = document.getElementById('paletteColor2');
  const paletteColor3 = document.getElementById('paletteColor3');
  const paletteColor4 = document.getElementById('paletteColor4');
  const paletteColor5 = document.getElementById('paletteColor5');

  function updatePalette() {
    if (gradientAnimation) {
      const colors = [
        paletteColor1.value,
        paletteColor2.value,
        paletteColor3.value,
        paletteColor4.value,
        paletteColor5.value
      ];
      gradientAnimation.updateSetting('paletteColors', colors);
    }
  }

  paletteColor1.addEventListener('input', updatePalette);
  paletteColor2.addEventListener('input', updatePalette);
  paletteColor3.addEventListener('input', updatePalette);
  paletteColor4.addEventListener('input', updatePalette);
  paletteColor5.addEventListener('input', updatePalette);

  // SVG Overlay Controls
  const svgEnabled = document.getElementById('svgEnabled');
  const svgOpacity = document.getElementById('svgOpacity');
  const svgOpacityValue = document.getElementById('svgOpacityValue');
  const svgSize = document.getElementById('svgSize');
  const svgSizeValue = document.getElementById('svgSizeValue');
  const svgStrokeWidth = document.getElementById('svgStrokeWidth');
  const svgStrokeWidthValue = document.getElementById('svgStrokeWidthValue');
  const svgPattern = document.getElementById('svgPattern');

  const svgColor = document.getElementById('svgColor');
  const svgBlendMode = document.getElementById('svgBlendMode');

  function updateSVGOverlay() {
    if (svgPatternGenerator) {
      const enabled = svgEnabled.checked;
      const opacity = parseFloat(svgOpacity.value);
      const size = parseFloat(svgSize.value);
      const strokeWidth = parseFloat(svgStrokeWidth.value);
      const pattern = svgPattern.value;
      const color = svgColor.value;
      const blendMode = svgBlendMode.value;

      svgPatternGenerator.setEnabled(enabled);
      svgPatternGenerator.updatePattern(pattern, size, opacity, color, blendMode, strokeWidth);
    }
  }

  svgEnabled.addEventListener('change', updateSVGOverlay);
  svgOpacity.addEventListener('input', (e) => {
    const value = e.target.value;
    svgOpacityValue.textContent = value + '%';
    updateSVGOverlay();
  });
  svgSize.addEventListener('input', (e) => {
    const value = e.target.value;
    svgSizeValue.textContent = value + 'px';
    updateSVGOverlay();
  });
  svgStrokeWidth.addEventListener('input', (e) => {
    const value = e.target.value;
    svgStrokeWidthValue.textContent = parseFloat(value).toFixed(1) + 'px';
    updateSVGOverlay();
  });
  svgPattern.addEventListener('change', updateSVGOverlay);
  svgColor.addEventListener('input', updateSVGOverlay);
  svgBlendMode.addEventListener('change', updateSVGOverlay);

  // Background Color
  const bgColor = document.getElementById('bgColor');
  bgColor.addEventListener('input', (e) => {
    bgWrapper.style.backgroundColor = e.target.value;
  });

  // Gradient Overlay
  const gradientOverlay = document.getElementById('gradientOverlay');
  const gradientControls = document.getElementById('gradientControls');
  const gradientControls2 = document.getElementById('gradientControls2');
  const gradientControls3 = document.getElementById('gradientControls3');
  
  gradientOverlay.addEventListener('change', (e) => {
    if (e.target.checked) {
      gradientControls.style.display = 'block';
      gradientControls2.style.display = 'block';
      gradientControls3.style.display = 'block';
      updateGradient();
    } else {
      gradientControls.style.display = 'none';
      gradientControls2.style.display = 'none';
      gradientControls3.style.display = 'none';
      bgWrapper.style.backgroundImage = '';
    }
  });

  // Gradient Colors and Angle
  const gradientStart = document.getElementById('gradientStart');
  const gradientEnd = document.getElementById('gradientEnd');
  const gradientAngle = document.getElementById('gradientAngle');
  const gradientAngleValue = document.getElementById('gradientAngleValue');

  function updateGradient() {
    if (gradientOverlay.checked) {
      const start = gradientStart.value;
      const end = gradientEnd.value;
      const angle = gradientAngle.value;
      bgWrapper.style.backgroundImage = `linear-gradient(${angle}deg, ${start}, ${end})`;
    }
  }

  gradientStart.addEventListener('input', updateGradient);
  gradientEnd.addEventListener('input', updateGradient);
  gradientAngle.addEventListener('input', (e) => {
    const value = e.target.value;
    gradientAngleValue.textContent = value + 'deg';
    updateGradient();
  });

  // Reset Button
  const resetBtn = document.getElementById('resetControls');
  resetBtn.addEventListener('click', () => {
    resetToDefaults();
  });

  // Export Button
  const exportBtn = document.getElementById('exportAnimation');
  exportBtn.addEventListener('click', async () => {
    await exportAnimation();
  });
}

// Export function to create standalone HTML file
async function exportAnimation() {
  const exportBtn = document.getElementById('exportAnimation');
  try {
    // Collect all current settings
    const settings = {
      // Canvas settings
      opacity: parseFloat(document.getElementById('videoOpacity').value) / 100,
      blur: parseFloat(document.getElementById('videoBlur').value),
      brightness: parseFloat(document.getElementById('brightness').value),
      contrast: parseFloat(document.getElementById('contrast').value),
      saturation: parseFloat(document.getElementById('saturation').value),
      hue: parseFloat(document.getElementById('hue').value),
      scale: parseFloat(document.getElementById('videoScale').value) / 100,
      positionX: parseFloat(document.getElementById('positionX').value) / 100,
      positionY: parseFloat(document.getElementById('positionY').value) / 100,
      blendMode: document.getElementById('blendMode').value,
      backgroundColor: document.getElementById('canvasBgColor').value,
      gradientFade: parseFloat(document.getElementById('gradientFade').value) / 100,
      gradientCount: parseInt(document.getElementById('gradientCount').value),
      gradientSpeed: parseFloat(document.getElementById('animationSpeed').value) / 100,
      fadeoutMode: document.getElementById('fadeoutMode').value,
      fadeoutTime: (() => {
        const el = document.getElementById('fadeoutTime');
        return el ? parseFloat(el.value) : 10;
      })(),
      
      // Color settings
      hueStart: parseFloat(document.getElementById('hueStart').value),
      hueEnd: parseFloat(document.getElementById('hueEnd').value),
      saturationMin: parseFloat(document.getElementById('saturationMin').value),
      saturationMax: parseFloat(document.getElementById('saturationMax').value),
      lightnessMin: parseFloat(document.getElementById('lightnessMin').value),
      lightnessMax: parseFloat(document.getElementById('lightnessMax').value),
      colorMode: document.getElementById('colorMode').value,
      paletteColors: [
        document.getElementById('paletteColor1').value,
        document.getElementById('paletteColor2').value,
        document.getElementById('paletteColor3').value,
        document.getElementById('paletteColor4').value,
        document.getElementById('paletteColor5').value
      ],
      
      // SVG settings
      svgEnabled: document.getElementById('svgEnabled').checked,
      svgOpacity: parseFloat(document.getElementById('svgOpacity').value),
      svgSize: parseFloat(document.getElementById('svgSize').value),
      svgStrokeWidth: parseFloat(document.getElementById('svgStrokeWidth').value),
      svgPattern: document.getElementById('svgPattern').value,
      svgColor: document.getElementById('svgColor').value,
      svgBlendMode: document.getElementById('svgBlendMode').value,
      
      // Background settings
      bgColor: document.getElementById('bgColor').value,
      gradientOverlay: document.getElementById('gradientOverlay').checked,
      gradientStart: document.getElementById('gradientStart').value,
      gradientEnd: document.getElementById('gradientEnd').value,
      gradientAngle: parseFloat(document.getElementById('gradientAngle').value)
    };

    // Get SVG overlay HTML
    const svgOverlay = document.getElementById('svgOverlay');
    const svgHTML = svgOverlay.innerHTML;

    // Get CSS from loaded stylesheet
    let cssContent = '';
    try {
      for (let i = 0; i < document.styleSheets.length; i++) {
        const sheet = document.styleSheets[i];
        try {
          if (sheet.href && sheet.href.includes('styles.css')) {
            // Try to fetch if possible (works on http/https)
            if (sheet.href.startsWith('http://') || sheet.href.startsWith('https://')) {
              const response = await fetch(sheet.href);
              cssContent = await response.text();
              break;
            } else {
              // For file:// protocol, extract from styleSheet rules
              for (let j = 0; j < sheet.cssRules.length; j++) {
                cssContent += sheet.cssRules[j].cssText + '\n';
              }
              break;
            }
          }
        } catch (e) {
          // CORS error, try to get from rules
          try {
            for (let j = 0; j < sheet.cssRules.length; j++) {
              cssContent += sheet.cssRules[j].cssText + '\n';
            }
            break;
          } catch (e2) {
            // Skip this stylesheet
          }
        }
      }
    } catch (e) {
      console.warn('Could not extract CSS from stylesheet:', e);
    }

    // If CSS extraction failed, use a minimal version
    if (!cssContent) {
      cssContent = `/* Minimal CSS - extracted styles */
* { margin: 0; padding: 0; box-sizing: border-box; }
html, body { height: 100%; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #000; color: #fff; overflow-x: hidden; }
.background-gradient-wrapper { position: fixed; top: 0; left: 0; right: 0; bottom: 0; width: 100%; height: 100%; background-color: #000; z-index: 0; overflow: hidden; }
.background-gradient-wrapper canvas { width: 100vw; height: 100vh; display: block; }
.svg-overlay { position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 2; pointer-events: none; }
.svg-overlay svg { width: 100%; height: 100%; display: block; }
.hero-content { position: relative; z-index: 10; min-height: 100vh; display: flex; flex-direction: column; justify-content: center; padding: 2rem 4rem; max-width: 600px; }
.hero-content h1 { font-size: clamp(2.5rem, 5vw, 4rem); font-weight: 600; line-height: 1.1; margin-bottom: 2rem; letter-spacing: -0.02em; }
.button-group { display: flex; flex-wrap: wrap; gap: 1rem; }
.primary-btn { position: relative; display: inline-flex; align-items: center; padding: 0; border: 1px solid rgba(255, 255, 255, 0.2); background: transparent; color: #fff; font-family: 'JetBrains Mono', 'Fira Code', monospace; font-size: 0.95rem; cursor: pointer; overflow: hidden; height: 56px; }
.primary-btn .default-label, .primary-btn .hover-label { display: flex; align-items: center; padding: 1rem 1.5rem; transition: transform 450ms cubic-bezier(0.165, 0.84, 0.44, 1); }
.primary-btn .hover-label { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background-color: #fff; color: #000; transform: translateY(100%); }
.primary-btn:hover .default-label { transform: translateY(-100%); }
.primary-btn:hover .hover-label { transform: translateY(0); }
.secondary-btn { display: inline-flex; align-items: center; padding: 1rem 1.5rem; border: 1px solid rgba(255, 255, 255, 0.2); background: transparent; color: #fff; text-decoration: none; font-size: 0.95rem; transition: all 300ms ease; }
.secondary-btn:hover { background: #fff; color: #000; }`;
    }

    // Embed JS code directly (canvas-animation.js content)
    const jsContent = `// Canvas Gradient Animation
class GradientAnimation {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.animationId = null;
    this.gradients = [];
    this.time = 0;
    this.speed = 0.0005;
    this.settings = {
      opacity: 1, blur: 0, brightness: 100, contrast: 100, saturation: 100, hue: 0,
      scale: 1, positionX: 0.5, positionY: 0.5, blendMode: 'normal',
      gradientCount: 5, gradientSpeed: 0.5, colorIntensity: 0.6, backgroundColor: '#000000',
      gradientFade: 0.5, hueStart: 200, hueEnd: 280, saturationMin: 60, saturationMax: 100,
      lightnessMin: 20, lightnessMax: 50, colorMode: 'hue-range',
      paletteColors: ['#4a90e2', '#5ba3f5', '#6bb6ff', '#7bc9ff', '#8bdaff'],
      fadeoutMode: 'none', fadeoutTime: 10
    };
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
        baseIndex: i
      });
    }
  }
  generateColor(index = null) {
    if (this.settings.colorMode === 'palette' && this.settings.paletteColors.length > 0) {
      const paletteIndex = index !== null ? index % this.settings.paletteColors.length : Math.floor(Math.random() * this.settings.paletteColors.length);
      return this.settings.paletteColors[paletteIndex];
    } else {
      const hueRange = this.settings.hueEnd - this.settings.hueStart;
      const hue = this.settings.hueStart + (Math.random() * hueRange);
      const saturation = this.settings.saturationMin + Math.random() * (this.settings.saturationMax - this.settings.saturationMin);
      const lightness = this.settings.lightnessMin + Math.random() * (this.settings.lightnessMax - this.settings.lightnessMin);
      return \`hsl(\${hue}, \${saturation}%, \${lightness}%)\`;
    }
  }
  updateGradients() {
    const width = this.canvas.width / (window.devicePixelRatio || 1);
    const height = this.canvas.height / (window.devicePixelRatio || 1);
    const centerX = width * this.settings.positionX;
    const centerY = height * this.settings.positionY;
    this.gradients.forEach((gradient, i) => {
      const baseX = centerX + Math.sin(this.time * this.settings.gradientSpeed + gradient.phase) * width * 0.3;
      const baseY = centerY + Math.cos(this.time * this.settings.gradientSpeed + gradient.phase * 1.3) * height * 0.3;
      gradient.x = baseX;
      gradient.y = baseY;
      if (this.settings.colorMode === 'palette' && this.settings.paletteColors.length > 0) {
        const paletteIndex = gradient.baseIndex % this.settings.paletteColors.length;
        gradient.color = this.settings.paletteColors[paletteIndex];
      } else {
        const hueShift = Math.sin(this.time * 0.3 + i) * 20 + this.settings.hue;
        const hueRange = this.settings.hueEnd - this.settings.hueStart;
        const baseHue = this.settings.hueStart + (hueRange / 2) + hueShift;
        const sat = Math.max(this.settings.saturationMin, Math.min(this.settings.saturationMax, (this.settings.saturationMin + this.settings.saturationMax) / 2 + Math.sin(this.time + i) * ((this.settings.saturationMax - this.settings.saturationMin) / 2)));
        const light = Math.max(this.settings.lightnessMin, Math.min(this.settings.lightnessMax, (this.settings.lightnessMin + this.settings.lightnessMax) / 2 + Math.sin(this.time * 0.5 + i) * ((this.settings.lightnessMax - this.settings.lightnessMin) / 2)));
        gradient.color = \`hsl(\${baseHue % 360}, \${sat}%, \${light}%)\`;
      }
      gradient.opacity = (0.3 + Math.sin(this.time * 0.4 + gradient.phase) * 0.2) * this.settings.opacity;
    });
    this.applyRepulsion();
    this.gradients.forEach((gradient) => {
      if (gradient.x < -gradient.radius) gradient.x = width + gradient.radius;
      if (gradient.x > width + gradient.radius) gradient.x = -gradient.radius;
      if (gradient.y < -gradient.radius) gradient.y = height + gradient.radius;
      if (gradient.y > height + gradient.radius) gradient.y = -gradient.radius;
    });
  }
  applyRepulsion() {
    const minDistance = 150;
    const repulsionStrength = 0.15;
    const overlapThreshold = 0.6;
    for (let i = 0; i < this.gradients.length; i++) {
      const gradient1 = this.gradients[i];
      const overlappingIndices = [];
      for (let j = 0; j < this.gradients.length; j++) {
        if (i === j) continue;
        const gradient2 = this.gradients[j];
        const dx = gradient1.x - gradient2.x;
        const dy = gradient1.y - gradient2.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const avgRadius = (gradient1.radius + gradient2.radius) / 2;
        const threshold = avgRadius * overlapThreshold;
        if (distance < threshold) overlappingIndices.push(j);
      }
      if (overlappingIndices.length >= 2) {
        const forceMultiplier = 1 + (overlappingIndices.length - 1) * 0.5;
        let totalForceX = 0, totalForceY = 0;
        overlappingIndices.forEach(j => {
          const gradient2 = this.gradients[j];
          const dx = gradient1.x - gradient2.x;
          const dy = gradient1.y - gradient2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance > 0 && distance < minDistance) {
            const nx = dx / distance, ny = dy / distance;
            const force = (minDistance - distance) / minDistance;
            totalForceX += nx * force * repulsionStrength * forceMultiplier;
            totalForceY += ny * force * repulsionStrength * forceMultiplier;
          }
        });
        gradient1.x += totalForceX;
        gradient1.y += totalForceY;
      } else {
        overlappingIndices.forEach(j => {
          const gradient2 = this.gradients[j];
          const dx = gradient1.x - gradient2.x;
          const dy = gradient1.y - gradient2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance > 0 && distance < minDistance) {
            const nx = dx / distance, ny = dy / distance;
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
    const shouldFadeout = this.settings.fadeoutMode !== 'none' && this.accumulatingBlendModes.includes(this.settings.blendMode);
    this.ctx.globalCompositeOperation = 'source-over';
    this.ctx.fillStyle = this.settings.backgroundColor;
    this.ctx.fillRect(0, 0, width, height);
    this.ctx.globalCompositeOperation = this.settings.blendMode;
    if (this.settings.blur > 0) {
      this.ctx.filter = \`blur(\${this.settings.blur}px)\`;
    } else {
      this.ctx.filter = 'none';
    }
    this.gradients.forEach(gradient => {
      const scaledRadius = gradient.radius * this.settings.scale;
      const grad = this.ctx.createRadialGradient(gradient.x, gradient.y, 0, gradient.x, gradient.y, scaledRadius);
      const colorMatch = gradient.color.match(/hsl\\((\\d+),\\s*(\\d+)%,\\s*(\\d+)%\\)/);
      if (colorMatch) {
        const [, h, s, l] = colorMatch;
        const fadePoint = this.settings.gradientFade;
        grad.addColorStop(0, \`hsla(\${h}, \${s}%, \${l}%, \${gradient.opacity})\`);
        grad.addColorStop(fadePoint, \`hsla(\${h}, \${s}%, \${l}%, \${gradient.opacity * (1 - fadePoint)})\`);
        grad.addColorStop(1, \`hsla(\${h}, \${s}%, \${l}%, 0)\`);
      } else {
        grad.addColorStop(0, gradient.color);
        grad.addColorStop(1, 'transparent');
      }
      this.ctx.fillStyle = grad;
      this.ctx.fillRect(0, 0, width, height);
    });
    this.ctx.filter = 'none';
    if (shouldFadeout) {
      const fadeoutInterval = this.settings.fadeoutMode === 'auto' ? 10 : this.settings.fadeoutTime;
      const fadePerSecond = 1 / fadeoutInterval;
      const fadePerFrame = fadePerSecond / 60;
      const fadeAmount = Math.min(0.03, fadePerFrame * 0.8);
      this.ctx.globalCompositeOperation = 'multiply';
      this.ctx.fillStyle = \`rgba(255, 255, 255, \${1 - fadeAmount})\`;
      this.ctx.fillRect(0, 0, width, height);
    }
    this.applyFilters();
  }
  applyFilters() {
    const filter = [];
    if (this.settings.brightness !== 100) filter.push(\`brightness(\${this.settings.brightness}%)\`);
    if (this.settings.contrast !== 100) filter.push(\`contrast(\${this.settings.contrast}%)\`);
    if (this.settings.saturation !== 100) filter.push(\`saturate(\${this.settings.saturation}%)\`);
    if (this.settings.hue !== 0) filter.push(\`hue-rotate(\${this.settings.hue}deg)\`);
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
      this.createGradients();
    } else if (key === 'fadeoutMode' || key === 'fadeoutTime') {
      this.fadeoutLastTime = Date.now();
    }
  }
  destroy() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
  }
}`;

    // Prepare settings for embedding
    const settingsJSON = JSON.stringify(settings, null, 2);
    const gradientOverlayStyle = settings.gradientOverlay 
      ? `background-image: linear-gradient(${settings.gradientAngle}deg, ${settings.gradientStart}, ${settings.gradientEnd});` 
      : '';

    // Generate standalone HTML
    const standaloneHTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Payload CMS Hero Animation</title>
  <style>
${cssContent}
  </style>
</head>
<body>
  <!-- Background Animation Container -->
  <div class="background-gradient-wrapper" style="background-color: ${settings.bgColor};${gradientOverlayStyle}">
    <canvas id="gradientCanvas"></canvas>
    <!-- SVG Overlay -->
    <div class="svg-overlay" id="svgOverlay" style="display: ${settings.svgEnabled ? 'block' : 'none'}; opacity: ${settings.svgOpacity / 100}; mix-blend-mode: ${settings.svgBlendMode};">
${svgHTML}
    </div>
  </div>

  <!-- Sample Hero Content -->
  <main class="hero-content">
    <h1>The backend to build the modern web.</h1>
    <div class="button-group">
      <button class="primary-btn">
        <span class="default-label">$ npx create-payload-app</span>
        <span class="hover-label">$ npx create-payload-app</span>
      </button>
      <a href="#" class="secondary-btn">Get a Demo</a>
    </div>
  </main>

  <script>
${jsContent}

// Initialize with exported settings
(function() {
  const settings = ${settingsJSON};
  document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('gradientCanvas');
    if (canvas) {
      const animation = new GradientAnimation(canvas);
      // Apply all canvas settings
      const canvasSettings = ['opacity', 'blur', 'brightness', 'contrast', 'saturation', 'hue', 
        'scale', 'positionX', 'positionY', 'blendMode', 'backgroundColor', 'gradientFade', 
        'gradientCount', 'gradientSpeed', 'fadeoutMode', 'fadeoutTime', 'hueStart', 'hueEnd', 
        'saturationMin', 'saturationMax', 'lightnessMin', 'lightnessMax', 'colorMode', 'paletteColors'];
      
      canvasSettings.forEach(key => {
        if (settings[key] !== undefined) {
          animation.updateSetting(key, settings[key]);
        }
      });
    }
  });
})();
  </script>
</body>
</html>`;

    // Create download
    const blob = new Blob([standaloneHTML], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'payload-animation.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    // Show success message
    exportBtn.textContent = '✓ Exported!';
    setTimeout(() => {
      exportBtn.textContent = 'Export Animation';
    }, 2000);
  } catch (error) {
    console.error('Export failed:', error);
    exportBtn.textContent = '✗ Export Failed';
    setTimeout(() => {
      exportBtn.textContent = 'Export Animation';
    }, 2000);
  }
}

// Set control values
function setValues(values) {
  Object.keys(values).forEach(key => {
    const element = document.getElementById(key);
    if (element) {
      if (element.type === 'checkbox') {
        element.checked = values[key];
        element.dispatchEvent(new Event('change'));
      } else {
        element.value = values[key];
        element.dispatchEvent(new Event('input'));
      }
    }
  });
}

// Reset to defaults
function resetToDefaults() {
  setValues(defaults);
}

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
  initControls();

  // Initialize color mode display and palette
  setTimeout(() => {
    const colorMode = document.getElementById('colorMode');
    if (colorMode) {
      const mode = colorMode.value;
      const paletteControls = document.getElementById('paletteControls');
      const paletteControls2 = document.getElementById('paletteControls2');
      const paletteControls3 = document.getElementById('paletteControls3');
      const paletteControls4 = document.getElementById('paletteControls4');
      const paletteControls5 = document.getElementById('paletteControls5');
      
      if (mode === 'palette') {
        if (paletteControls) paletteControls.style.display = 'block';
        if (paletteControls2) paletteControls2.style.display = 'block';
        if (paletteControls3) paletteControls3.style.display = 'block';
        if (paletteControls4) paletteControls4.style.display = 'block';
        if (paletteControls5) paletteControls5.style.display = 'block';
      }
      
      // Initialize palette colors in gradientAnimation
      if (gradientAnimation) {
        const pc1 = document.getElementById('paletteColor1');
        const pc2 = document.getElementById('paletteColor2');
        const pc3 = document.getElementById('paletteColor3');
        const pc4 = document.getElementById('paletteColor4');
        const pc5 = document.getElementById('paletteColor5');
        
        if (pc1 && pc2 && pc3 && pc4 && pc5) {
          const colors = [
            pc1.value,
            pc2.value,
            pc3.value,
            pc4.value,
            pc5.value
          ];
          gradientAnimation.updateSetting('paletteColors', colors);
          gradientAnimation.updateSetting('colorMode', mode);
        }
      }
    }

    // Initialize fadeout mode display
    const fadeoutMode = document.getElementById('fadeoutMode');
    const fadeoutTimeControl = document.getElementById('fadeoutTimeControl');
    if (fadeoutMode && fadeoutTimeControl) {
      const mode = fadeoutMode.value;
      if (mode === 'custom') {
        fadeoutTimeControl.style.display = 'block';
      } else {
        fadeoutTimeControl.style.display = 'none';
      }
      
      if (gradientAnimation) {
        gradientAnimation.updateSetting('fadeoutMode', mode);
        const fadeoutTime = document.getElementById('fadeoutTime');
        if (fadeoutTime) {
          gradientAnimation.updateSetting('fadeoutTime', parseFloat(fadeoutTime.value));
        }
      }
    }
  }, 50);

  // Initialize SVG overlay after a short delay to ensure svgPatternGenerator is ready
  setTimeout(() => {
    if (svgPatternGenerator) {
      const svgEnabled = document.getElementById('svgEnabled');
      const svgOpacity = document.getElementById('svgOpacity');
      const svgSize = document.getElementById('svgSize');
      const svgStrokeWidth = document.getElementById('svgStrokeWidth');
      const svgPattern = document.getElementById('svgPattern');
      
      const svgColor = document.getElementById('svgColor');
      const svgBlendMode = document.getElementById('svgBlendMode');
      
      if (svgEnabled && svgOpacity && svgSize && svgStrokeWidth && svgPattern && svgColor && svgBlendMode) {
        svgPatternGenerator.updatePattern(
          svgPattern.value,
          parseFloat(svgSize.value),
          parseFloat(svgOpacity.value),
          svgColor.value,
          svgBlendMode.value,
          parseFloat(svgStrokeWidth.value)
        );
        svgPatternGenerator.setEnabled(svgEnabled.checked);
      }
    }
  }, 100);
});

