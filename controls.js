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
  gradientSize: 100,
  gradientSizeMode: 'base',
  positionX: 50,
  positionY: 50,
  blendMode: 'normal',
  canvasBgColor: '#000000',
  gradientFade: 0,
  gradientCount: 5,
  animationSpeed: 50,
  fadeoutMode: 'none',
  fadeoutTime: 10,
  hueStart: 200,
  hueEnd: 280,
  hueSeparation: 100,
  evenlySpacedColors: true,
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
  textColor: '#ffffff',
  textBlendMode: 'normal',
  textMarkerEnabled: false,
  textMarkerColor: '#b60011',
  svgEnabled: true,
  svgOpacity: 15,
  svgSize: 100,
  svgStrokeWidth: 1,
  svgPattern: 'grid',
  svgColor: '#ffffff',
  svgBlendMode: 'normal',
  radialGradientsEnabled: true,
  lineGradientsEnabled: false,
  lineGradientAngle: 0,
  lineGradientLength: 200,
  lineGradientWidth: 100
};

// Initialize controls
function initControls() {
  // Canvas Opacity
  // Helper function to sync value input with slider
  function setupValueInput(valueInput, slider, unit, updateCallback, parseValue = (v) => parseFloat(v)) {
    // Update input from slider
    slider.addEventListener('input', (e) => {
      const value = e.target.value;
      valueInput.value = value + unit;
      if (updateCallback) {
        updateCallback(parseValue(value));
      }
    });

    // Update slider from input (allow any value, not just slider range)
    valueInput.addEventListener('input', (e) => {
      let inputValue = e.target.value;
      // Remove unit if present
      if (unit) {
        inputValue = inputValue.replace(unit, '').trim();
      }
      const numValue = parseFloat(inputValue);
      if (!isNaN(numValue)) {
        // Update slider if within range, but still apply the value
        const sliderMin = parseFloat(slider.min) || 0;
        const sliderMax = parseFloat(slider.max) || 100;
        if (numValue >= sliderMin && numValue <= sliderMax) {
          slider.value = numValue;
        }
        // Always update the actual setting, even if outside slider range
        if (updateCallback) {
          updateCallback(parseValue(numValue));
        }
      }
    });

    // Format on blur
    valueInput.addEventListener('blur', (e) => {
      let inputValue = e.target.value;
      if (unit) {
        inputValue = inputValue.replace(unit, '').trim();
      }
      const numValue = parseFloat(inputValue);
      if (!isNaN(numValue)) {
        e.target.value = numValue + unit;
      }
    });
  }

  const videoOpacity = document.getElementById('videoOpacity');
  const videoOpacityValue = document.getElementById('videoOpacityValue');
  setupValueInput(videoOpacityValue, videoOpacity, '%', (value) => {
    if (gradientAnimation) {
      gradientAnimation.updateSetting('opacity', value / 100);
    }
  });

  // Canvas Blur
  const videoBlur = document.getElementById('videoBlur');
  const videoBlurValue = document.getElementById('videoBlurValue');
  setupValueInput(videoBlurValue, videoBlur, 'px', (value) => {
    if (gradientAnimation) {
      gradientAnimation.updateSetting('blur', value);
    }
  });

  // Brightness
  const brightness = document.getElementById('brightness');
  const brightnessValue = document.getElementById('brightnessValue');
  setupValueInput(brightnessValue, brightness, '%', (value) => {
    if (gradientAnimation) {
      gradientAnimation.updateSetting('brightness', value);
    }
  });

  // Contrast
  const contrast = document.getElementById('contrast');
  const contrastValue = document.getElementById('contrastValue');
  setupValueInput(contrastValue, contrast, '%', (value) => {
    if (gradientAnimation) {
      gradientAnimation.updateSetting('contrast', value);
    }
  });

  // Saturation
  const saturation = document.getElementById('saturation');
  const saturationValue = document.getElementById('saturationValue');
  setupValueInput(saturationValue, saturation, '%', (value) => {
    if (gradientAnimation) {
      gradientAnimation.updateSetting('saturation', value);
    }
  });

  // Hue
  const hue = document.getElementById('hue');
  const hueValue = document.getElementById('hueValue');
  setupValueInput(hueValue, hue, 'deg', (value) => {
    if (gradientAnimation) {
      gradientAnimation.updateSetting('hue', value);
    }
  });

  // Canvas Scale
  const videoScale = document.getElementById('videoScale');
  const videoScaleValue = document.getElementById('videoScaleValue');
  setupValueInput(videoScaleValue, videoScale, '%', (value) => {
    if (gradientAnimation) {
      gradientAnimation.updateSetting('scale', value / 100);
      canvas.style.transform = `scale(${value / 100})`;
    }
  });

  // Gradient Size
  const gradientSize = document.getElementById('gradientSize');
  const gradientSizeValue = document.getElementById('gradientSizeValue');
  setupValueInput(gradientSizeValue, gradientSize, '%', (value) => {
    if (gradientAnimation) {
      gradientAnimation.updateSetting('gradientSizeMultiplier', value / 100);
    }
  });

  // Gradient Size Mode (Radio buttons)
  const gradientSizeModeBase = document.getElementById('gradientSizeModeBase');
  const gradientSizeModeDrawing = document.getElementById('gradientSizeModeDrawing');
  
  function updateGradientSizeMode() {
    if (gradientAnimation) {
      const mode = gradientSizeModeBase.checked ? 'base' : 'drawing';
      gradientAnimation.updateSetting('gradientSizeMode', mode);
    }
  }

  if (gradientSizeModeBase && gradientSizeModeDrawing) {
    gradientSizeModeBase.addEventListener('change', updateGradientSizeMode);
    gradientSizeModeDrawing.addEventListener('change', updateGradientSizeMode);
  }

  // Position X
  const positionX = document.getElementById('positionX');
  const positionXValue = document.getElementById('positionXValue');
  setupValueInput(positionXValue, positionX, '%', (value) => {
    if (gradientAnimation) {
      gradientAnimation.updateSetting('positionX', value / 100);
    }
  });

  // Position Y
  const positionY = document.getElementById('positionY');
  const positionYValue = document.getElementById('positionYValue');
  setupValueInput(positionYValue, positionY, '%', (value) => {
    if (gradientAnimation) {
      gradientAnimation.updateSetting('positionY', value / 100);
    }
  });

  // Radial Gradients Enabled
  const radialGradientsEnabled = document.getElementById('radialGradientsEnabled');
  if (radialGradientsEnabled) {
    radialGradientsEnabled.addEventListener('change', (e) => {
      if (gradientAnimation) {
        gradientAnimation.updateSetting('radialGradientsEnabled', e.target.checked);
      }
    });
  }

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

  // Fadeout Time (already declared above, just setup the input)
  setupValueInput(fadeoutTimeValue, fadeoutTime, 's', (value) => {
    if (gradientAnimation) {
      gradientAnimation.updateSetting('fadeoutTime', value);
    }
  });

  // Gradient Count
  const gradientCount = document.getElementById('gradientCount');
  const gradientCountValue = document.getElementById('gradientCountValue');
  setupValueInput(gradientCountValue, gradientCount, '', (value) => {
    if (gradientAnimation) {
      gradientAnimation.updateSetting('gradientCount', parseInt(value));
    }
  }, (v) => parseInt(v));

  // Animation Speed
  const animationSpeed = document.getElementById('animationSpeed');
  const animationSpeedValue = document.getElementById('animationSpeedValue');
  // Custom handler for animation speed (displays as decimal)
  animationSpeed.addEventListener('input', (e) => {
    const value = e.target.value;
    animationSpeedValue.value = (value / 100).toFixed(2);
    if (gradientAnimation) {
      gradientAnimation.updateSetting('gradientSpeed', value / 100);
    }
  });
  animationSpeedValue.addEventListener('input', (e) => {
    let inputValue = parseFloat(e.target.value);
    if (!isNaN(inputValue)) {
      const sliderValue = inputValue * 100;
      const sliderMin = parseFloat(animationSpeed.min) || 0;
      const sliderMax = parseFloat(animationSpeed.max) || 1000;
      if (sliderValue >= sliderMin && sliderValue <= sliderMax) {
        animationSpeed.value = sliderValue;
      }
      if (gradientAnimation) {
        gradientAnimation.updateSetting('gradientSpeed', inputValue);
      }
    }
  });
  animationSpeedValue.addEventListener('blur', (e) => {
    const numValue = parseFloat(e.target.value);
    if (!isNaN(numValue)) {
      e.target.value = numValue.toFixed(2);
    }
  });

  // Gradient Fade (Hue Rotation Animation Speed)
  const gradientFade = document.getElementById('gradientFade');
  const gradientFadeValue = document.getElementById('gradientFadeValue');
  // Custom handler for gradient fade (displays as decimal, controls hue rotation speed)
  gradientFade.addEventListener('input', (e) => {
    const value = e.target.value;
    gradientFadeValue.value = parseFloat(value).toFixed(1);
    if (gradientAnimation) {
      gradientAnimation.updateSetting('hueRotationSpeed', parseFloat(value));
    }
  });
  gradientFadeValue.addEventListener('input', (e) => {
    let inputValue = parseFloat(e.target.value);
    if (!isNaN(inputValue)) {
      const sliderMin = parseFloat(gradientFade.min) || 0;
      const sliderMax = parseFloat(gradientFade.max) || 10;
      if (inputValue >= sliderMin && inputValue <= sliderMax) {
        gradientFade.value = inputValue;
      }
      if (gradientAnimation) {
        gradientAnimation.updateSetting('hueRotationSpeed', inputValue);
      }
    }
  });
  gradientFadeValue.addEventListener('blur', (e) => {
    const numValue = parseFloat(e.target.value);
    if (!isNaN(numValue)) {
      e.target.value = numValue.toFixed(1);
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
  setupValueInput(hueStartValue, hueStart, '°', (value) => {
    if (gradientAnimation) {
      gradientAnimation.updateSetting('hueStart', value);
    }
  });

  const hueEnd = document.getElementById('hueEnd');
  const hueEndValue = document.getElementById('hueEndValue');
  setupValueInput(hueEndValue, hueEnd, '°', (value) => {
    if (gradientAnimation) {
      gradientAnimation.updateSetting('hueEnd', value);
    }
  });

  // Hue Separation Controls
  const evenlySpacedColors = document.getElementById('evenlySpacedColors');
  const hueSeparation = document.getElementById('hueSeparation');
  const hueSeparationValue = document.getElementById('hueSeparationValue');
  const hueSeparationControls = document.getElementById('hueSeparationControls');
  const hueSeparationSliderControl = document.getElementById('hueSeparationSliderControl');

  if (evenlySpacedColors) {
    evenlySpacedColors.addEventListener('change', (e) => {
      if (gradientAnimation) {
        gradientAnimation.updateSetting('evenlySpacedColors', e.target.checked);
      }
    });
  }

  setupValueInput(hueSeparationValue, hueSeparation, '%', (value) => {
    if (gradientAnimation) {
      gradientAnimation.updateSetting('hueSeparation', value);
    }
  });

  const saturationMin = document.getElementById('saturationMin');
  const saturationMinValue = document.getElementById('saturationMinValue');
  setupValueInput(saturationMinValue, saturationMin, '%', (value) => {
    if (gradientAnimation) {
      gradientAnimation.updateSetting('saturationMin', value);
    }
  });

  const saturationMax = document.getElementById('saturationMax');
  const saturationMaxValue = document.getElementById('saturationMaxValue');
  setupValueInput(saturationMaxValue, saturationMax, '%', (value) => {
    if (gradientAnimation) {
      gradientAnimation.updateSetting('saturationMax', value);
    }
  });

  const lightnessMin = document.getElementById('lightnessMin');
  const lightnessMinValue = document.getElementById('lightnessMinValue');
  setupValueInput(lightnessMinValue, lightnessMin, '%', (value) => {
    if (gradientAnimation) {
      gradientAnimation.updateSetting('lightnessMin', value);
    }
  });

  const lightnessMax = document.getElementById('lightnessMax');
  const lightnessMaxValue = document.getElementById('lightnessMaxValue');
  setupValueInput(lightnessMaxValue, lightnessMax, '%', (value) => {
    if (gradientAnimation) {
      gradientAnimation.updateSetting('lightnessMax', value);
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
      if (hueSeparationControls) hueSeparationControls.style.display = 'none';
      if (hueSeparationSliderControl) hueSeparationSliderControl.style.display = 'none';
    } else {
      paletteControls.style.display = 'none';
      paletteControls2.style.display = 'none';
      paletteControls3.style.display = 'none';
      paletteControls4.style.display = 'none';
      paletteControls5.style.display = 'none';
      if (hueSeparationControls) hueSeparationControls.style.display = 'block';
      if (hueSeparationSliderControl) hueSeparationSliderControl.style.display = 'block';
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
      // Parse values from inputs, handling units from text inputs
      let opacity = parseFloat(svgOpacity.value);
      let size = parseFloat(svgSize.value);
      let strokeWidth = parseFloat(svgStrokeWidth.value);
      
      // If values come from text inputs, extract numbers
      if (svgOpacityValue && svgOpacityValue.value) {
        const opacityStr = svgOpacityValue.value.replace('%', '').trim();
        const opacityNum = parseFloat(opacityStr);
        if (!isNaN(opacityNum)) opacity = opacityNum;
      }
      if (svgSizeValue && svgSizeValue.value) {
        const sizeStr = svgSizeValue.value.replace('px', '').trim();
        const sizeNum = parseFloat(sizeStr);
        if (!isNaN(sizeNum)) size = sizeNum;
      }
      if (svgStrokeWidthValue && svgStrokeWidthValue.value) {
        const strokeStr = svgStrokeWidthValue.value.replace('px', '').trim();
        const strokeNum = parseFloat(strokeStr);
        if (!isNaN(strokeNum)) strokeWidth = strokeNum;
      }
      
      const pattern = svgPattern.value;
      const color = svgColor.value;
      const blendMode = svgBlendMode.value;

      // Update container opacity to match the setting
      const svgOverlayContainer = document.getElementById('svgOverlay');
      if (svgOverlayContainer) {
        svgOverlayContainer.style.opacity = opacity / 100;
        svgOverlayContainer.style.mixBlendMode = blendMode;
      }

      svgPatternGenerator.setEnabled(enabled);
      svgPatternGenerator.updatePattern(pattern, size, opacity, color, blendMode, strokeWidth);
    }
  }

  svgEnabled.addEventListener('change', updateSVGOverlay);
  setupValueInput(svgOpacityValue, svgOpacity, '%', () => {
    updateSVGOverlay();
  });
  setupValueInput(svgSizeValue, svgSize, 'px', () => {
    updateSVGOverlay();
  });
  // Custom handler for stroke width (displays with 1 decimal)
  svgStrokeWidth.addEventListener('input', (e) => {
    const value = e.target.value;
    svgStrokeWidthValue.value = parseFloat(value).toFixed(1) + 'px';
    updateSVGOverlay();
  });
  svgStrokeWidthValue.addEventListener('input', (e) => {
    let inputValue = e.target.value;
    inputValue = inputValue.replace('px', '').trim();
    const numValue = parseFloat(inputValue);
    if (!isNaN(numValue)) {
      const sliderMin = parseFloat(svgStrokeWidth.min) || 0.1;
      const sliderMax = parseFloat(svgStrokeWidth.max) || 5;
      if (numValue >= sliderMin && numValue <= sliderMax) {
        svgStrokeWidth.value = numValue;
      }
      updateSVGOverlay();
    }
  });
  svgStrokeWidthValue.addEventListener('blur', (e) => {
    let inputValue = e.target.value;
    inputValue = inputValue.replace('px', '').trim();
    const numValue = parseFloat(inputValue);
    if (!isNaN(numValue)) {
      e.target.value = numValue.toFixed(1) + 'px';
    }
  });
  svgPattern.addEventListener('change', updateSVGOverlay);
  svgColor.addEventListener('input', updateSVGOverlay);
  svgBlendMode.addEventListener('change', updateSVGOverlay);

  // Line Gradients Controls
  const lineGradientsEnabled = document.getElementById('lineGradientsEnabled');
  const lineGradientAngle = document.getElementById('lineGradientAngle');
  const lineGradientAngleValue = document.getElementById('lineGradientAngleValue');
  const lineGradientLength = document.getElementById('lineGradientLength');
  const lineGradientLengthValue = document.getElementById('lineGradientLengthValue');
  const lineGradientWidth = document.getElementById('lineGradientWidth');
  const lineGradientWidthValue = document.getElementById('lineGradientWidthValue');

  if (lineGradientsEnabled) {
    lineGradientsEnabled.addEventListener('change', (e) => {
      if (gradientAnimation) {
        gradientAnimation.updateSetting('lineGradientsEnabled', e.target.checked);
      }
    });
  }

  if (lineGradientAngle && lineGradientAngleValue) {
    setupValueInput(lineGradientAngleValue, lineGradientAngle, '°', (value) => {
      if (gradientAnimation) {
        gradientAnimation.updateSetting('lineGradientAngle', value);
      }
    });
  }

  if (lineGradientLength && lineGradientLengthValue) {
    setupValueInput(lineGradientLengthValue, lineGradientLength, 'px', (value) => {
      if (gradientAnimation) {
        gradientAnimation.updateSetting('lineGradientLength', value);
      }
    });
  }

  if (lineGradientWidth && lineGradientWidthValue) {
    setupValueInput(lineGradientWidthValue, lineGradientWidth, 'px', (value) => {
      if (gradientAnimation) {
        gradientAnimation.updateSetting('lineGradientWidth', value);
      }
    });
  }

  // Text Controls
  const heroContent = document.querySelector('.hero-content');
  const heroH1 = heroContent ? heroContent.querySelector('h1') : null;
  const textColor = document.getElementById('textColor');
  const textBlendMode = document.getElementById('textBlendMode');
  const textMarkerEnabled = document.getElementById('textMarkerEnabled');
  const textMarkerColor = document.getElementById('textMarkerColor');
  const textMarkerColorControl = document.getElementById('textMarkerColorControl');

  if (textColor && heroContent) {
    // Set initial value
    heroContent.style.color = textColor.value;
    textColor.addEventListener('input', (e) => {
      heroContent.style.color = e.target.value;
    });
  }

  if (textBlendMode && heroContent) {
    // Set initial value
    heroContent.style.mixBlendMode = textBlendMode.value;
    textBlendMode.addEventListener('change', (e) => {
      heroContent.style.mixBlendMode = e.target.value;
    });
  }

  // Text Marker Background
  function updateTextMarker() {
    if (!heroH1) return;
    
    const enabled = textMarkerEnabled.checked;
    
    if (enabled) {
      const markerColor = textMarkerColor.value;
      
      // Wrap text in span for line-by-line marker effect
      let wrapper = heroH1.querySelector('.text-marker-wrapper');
      if (!wrapper) {
        // Store original text if not already stored
        if (!heroH1.dataset.originalText) {
          heroH1.dataset.originalText = heroH1.textContent;
        }
        const text = heroH1.dataset.originalText || heroH1.textContent;
        wrapper = document.createElement('span');
        wrapper.className = 'text-marker-wrapper';
        wrapper.textContent = text;
        heroH1.textContent = '';
        heroH1.appendChild(wrapper);
      }
      
      // Apply marker styles to wrapper
      wrapper.style.display = 'inline';
      wrapper.style.padding = '10px 20px';
      wrapper.style.backgroundColor = markerColor;
      wrapper.style.color = '#fff';
      wrapper.style.webkitBoxDecorationBreak = 'clone';
      wrapper.style.boxDecorationBreak = 'clone';
      wrapper.style.marginBottom = '0';
    } else {
      // Remove wrapper and restore original text
      const wrapper = heroH1.querySelector('.text-marker-wrapper');
      if (wrapper) {
        const originalText = heroH1.dataset.originalText || wrapper.textContent;
        heroH1.textContent = originalText;
        heroH1.removeAttribute('data-original-text');
      }
      
      // Reset styles
      heroH1.style.padding = '';
      heroH1.style.backgroundColor = '';
      heroH1.style.color = '';
      heroH1.style.webkitBoxDecorationBreak = '';
      heroH1.style.boxDecorationBreak = '';
      heroH1.style.marginBottom = '';
      
      // Restore text color from textColor picker
      if (textColor) {
        heroContent.style.color = textColor.value;
      }
    }
  }

  if (textMarkerEnabled && textMarkerColor && textMarkerColorControl) {
    // Show/hide color picker based on checkbox
    textMarkerEnabled.addEventListener('change', (e) => {
      textMarkerColorControl.style.display = e.target.checked ? 'block' : 'none';
      updateTextMarker();
    });

    // Update marker when color changes
    textMarkerColor.addEventListener('input', () => {
      if (textMarkerEnabled.checked) {
        updateTextMarker();
      }
    });

    // Initial update
    updateTextMarker();
  }

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

// Helper function to get actual value from text input or slider
function getActualValue(textInputId, sliderId, unit = '') {
  const textInput = document.getElementById(textInputId);
  const slider = document.getElementById(sliderId);
  
  if (textInput && textInput.value) {
    let value = textInput.value;
    if (unit) {
      value = value.replace(unit, '').trim();
    }
    const numValue = parseFloat(value);
    if (!isNaN(numValue)) {
      return numValue;
    }
  }
  
  // Fallback to slider
  if (slider) {
    return parseFloat(slider.value);
  }
  
  return 0;
}

// Export function to create standalone HTML file
async function exportAnimation() {
  const exportBtn = document.getElementById('exportAnimation');
  try {
    // Collect all current settings - use text inputs when available (they reflect actual values)
    const settings = {
      // Canvas settings
      opacity: getActualValue('videoOpacityValue', 'videoOpacity', '%') / 100,
      blur: getActualValue('videoBlurValue', 'videoBlur', 'px'),
      brightness: getActualValue('brightnessValue', 'brightness', '%'),
      contrast: getActualValue('contrastValue', 'contrast', '%'),
      saturation: getActualValue('saturationValue', 'saturation', '%'),
      hue: getActualValue('hueValue', 'hue', 'deg'),
      scale: getActualValue('videoScaleValue', 'videoScale', '%') / 100,
      gradientSizeMultiplier: getActualValue('gradientSizeValue', 'gradientSize', '%') / 100,
      gradientSizeMode: (() => {
        const baseRadio = document.getElementById('gradientSizeModeBase');
        return baseRadio && baseRadio.checked ? 'base' : 'drawing';
      })(),
      positionX: getActualValue('positionXValue', 'positionX', '%') / 100,
      positionY: getActualValue('positionYValue', 'positionY', '%') / 100,
      blendMode: document.getElementById('blendMode').value,
      backgroundColor: document.getElementById('canvasBgColor').value,
      hueRotationSpeed: (() => {
        const el = document.getElementById('gradientFadeValue');
        if (el && el.value) {
          const val = parseFloat(el.value);
          if (!isNaN(val)) return val;
        }
        const slider = document.getElementById('gradientFade');
        return slider ? parseFloat(slider.value) : 0;
      })(),
      gradientCount: getActualValue('gradientCountValue', 'gradientCount', ''),
      gradientSpeed: (() => {
        const el = document.getElementById('animationSpeedValue');
        if (el && el.value) {
          const val = parseFloat(el.value);
          if (!isNaN(val)) return val;
        }
        const slider = document.getElementById('animationSpeed');
        return slider ? parseFloat(slider.value) / 100 : 0.5;
      })(),
      fadeoutMode: document.getElementById('fadeoutMode').value,
      fadeoutTime: getActualValue('fadeoutTimeValue', 'fadeoutTime', 's'),
      gradientFade: (() => {
        // gradientFade is not directly controlled, but we can get it from the animation instance
        // or use default value. The control labeled "Gradient Color Fade" actually controls hueRotationSpeed
        if (gradientAnimation && gradientAnimation.settings.gradientFade !== undefined) {
          return gradientAnimation.settings.gradientFade;
        }
        return 0.5; // default value
      })(),
      animatedHue: (() => {
        // Capture current animated hue rotation to preserve color state
        if (gradientAnimation && gradientAnimation.settings.animatedHue !== undefined) {
          return gradientAnimation.settings.animatedHue;
        }
        return 0;
      })(),
      radialGradientsEnabled: document.getElementById('radialGradientsEnabled') ? document.getElementById('radialGradientsEnabled').checked : true,
      lineGradientsEnabled: document.getElementById('lineGradientsEnabled') ? document.getElementById('lineGradientsEnabled').checked : false,
      lineGradientAngle: getActualValue('lineGradientAngleValue', 'lineGradientAngle', '°'),
      lineGradientLength: getActualValue('lineGradientLengthValue', 'lineGradientLength', 'px'),
      lineGradientWidth: getActualValue('lineGradientWidthValue', 'lineGradientWidth', 'px'),
      
      // Color settings
      hueStart: getActualValue('hueStartValue', 'hueStart', '°'),
      hueEnd: getActualValue('hueEndValue', 'hueEnd', '°'),
      hueSeparation: getActualValue('hueSeparationValue', 'hueSeparation', '%'),
      evenlySpacedColors: document.getElementById('evenlySpacedColors').checked,
      saturationMin: getActualValue('saturationMinValue', 'saturationMin', '%'),
      saturationMax: getActualValue('saturationMaxValue', 'saturationMax', '%'),
      lightnessMin: getActualValue('lightnessMinValue', 'lightnessMin', '%'),
      lightnessMax: getActualValue('lightnessMaxValue', 'lightnessMax', '%'),
      colorMode: document.getElementById('colorMode').value,
      paletteColors: [
        document.getElementById('paletteColor1').value,
        document.getElementById('paletteColor2').value,
        document.getElementById('paletteColor3').value,
        document.getElementById('paletteColor4').value,
        document.getElementById('paletteColor5').value
      ],
      
      // SVG settings - read from text inputs to get actual values
      svgEnabled: document.getElementById('svgEnabled').checked,
      svgOpacity: getActualValue('svgOpacityValue', 'svgOpacity', '%'),
      svgSize: getActualValue('svgSizeValue', 'svgSize', 'px'),
      svgStrokeWidth: (() => {
        const el = document.getElementById('svgStrokeWidthValue');
        if (el && el.value) {
          const val = el.value.replace('px', '').trim();
          const numVal = parseFloat(val);
          if (!isNaN(numVal)) return numVal;
        }
        const slider = document.getElementById('svgStrokeWidth');
        return slider ? parseFloat(slider.value) : 1;
      })(),
      svgPattern: document.getElementById('svgPattern').value,
      svgColor: document.getElementById('svgColor').value,
      svgBlendMode: document.getElementById('svgBlendMode').value,
      
      // Text settings
      textColor: document.getElementById('textColor').value,
      textBlendMode: document.getElementById('textBlendMode').value,
      textMarkerEnabled: document.getElementById('textMarkerEnabled').checked,
      textMarkerColor: document.getElementById('textMarkerColor').value,
      
      // Animation state (to preserve colors)
      initialTime: gradientAnimation ? gradientAnimation.time : 0
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
      scale: 1, gradientSizeMultiplier: 1.0, gradientSizeMode: 'base', positionX: 0.5, positionY: 0.5, blendMode: 'normal',
      gradientCount: 5, gradientSpeed: 0.5, colorIntensity: 0.6, backgroundColor: '#000000',
      gradientFade: 0.5, hueStart: 200, hueEnd: 280, hueSeparation: 100, evenlySpacedColors: true,
      saturationMin: 60, saturationMax: 100, lightnessMin: 20, lightnessMax: 50, colorMode: 'hue-range',
      paletteColors: ['#4a90e2', '#5ba3f5', '#6bb6ff', '#7bc9ff', '#8bdaff'],
      fadeoutMode: 'none', fadeoutTime: 10,
      hueRotationSpeed: 0, animatedHue: 0,
      radialGradientsEnabled: true, lineGradientsEnabled: false,
      lineGradientAngle: 0, lineGradientLength: 200, lineGradientWidth: 100
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
    const baseRadiusMultiplier = this.settings.gradientSizeMode === 'base' ? this.settings.gradientSizeMultiplier : 1.0;
    for (let i = 0; i < count; i++) {
      this.gradients.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        radius: (200 + Math.random() * 400) * baseRadiusMultiplier,
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
      const separationRange = hueRange * (this.settings.hueSeparation / 100);
      let hue;
      if (this.settings.evenlySpacedColors && index !== null && this.settings.gradientCount > 1) {
        const spacing = separationRange / (this.settings.gradientCount - 1);
        hue = this.settings.hueStart + (index * spacing);
      } else {
        hue = this.settings.hueStart + (Math.random() * separationRange);
      }
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
        const hueRange = this.settings.hueEnd - this.settings.hueStart;
        const separationRange = hueRange * (this.settings.hueSeparation / 100);
        let baseHue;
        if (this.settings.evenlySpacedColors && this.settings.gradientCount > 1) {
          const spacing = separationRange / (this.settings.gradientCount - 1);
          const baseHueValue = this.settings.hueStart + (gradient.baseIndex * spacing);
          const hueShift = Math.sin(this.time * 0.3 + i) * 20 + this.settings.hue;
          baseHue = baseHueValue + hueShift;
        } else {
          const hueShift = Math.sin(this.time * 0.3 + i) * 20 + this.settings.hue;
          const randomOffset = (gradient.baseIndex * 0.1) % 1;
          baseHue = this.settings.hueStart + (randomOffset * separationRange) + hueShift;
        }
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
    const drawingMultiplier = this.settings.gradientSizeMode === 'drawing' ? this.settings.gradientSizeMultiplier : 1.0;
    this.gradients.forEach(gradient => {
      // Draw radial gradients if enabled
      if (this.settings.radialGradientsEnabled) {
        const scaledRadius = gradient.radius * this.settings.scale * drawingMultiplier;
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
      }
      
      // Draw line gradients if enabled
      if (this.settings.lineGradientsEnabled) {
        const angle = (this.settings.lineGradientAngle * Math.PI) / 180;
        const length = this.settings.lineGradientLength * drawingMultiplier;
        const lineWidth = this.settings.lineGradientWidth * drawingMultiplier;
        const halfLength = length / 2;
        const halfWidth = lineWidth / 2;
        const centerX = gradient.x;
        const centerY = gradient.y;
        const colorMatch = gradient.color.match(/hsl\\((\\d+),\\s*(\\d+)%,\\s*(\\d+)%\\)/);
        const fadePoint = this.settings.gradientFade;
        const maxRadius = Math.max(halfLength, halfWidth);
        const scaleX = halfLength / maxRadius;
        const scaleY = halfWidth / maxRadius;
        this.ctx.save();
        this.ctx.translate(centerX, centerY);
        this.ctx.rotate(angle);
        this.ctx.scale(scaleX, scaleY);
        const lineGrad = this.ctx.createRadialGradient(0, 0, 0, 0, 0, maxRadius);
        if (colorMatch) {
          const [, h, s, l] = colorMatch;
          lineGrad.addColorStop(0, \`hsla(\${h}, \${s}%, \${l}%, \${gradient.opacity})\`);
          lineGrad.addColorStop(fadePoint, \`hsla(\${h}, \${s}%, \${l}%, \${gradient.opacity * (1 - fadePoint)})\`);
          lineGrad.addColorStop(1, \`hsla(\${h}, \${s}%, \${l}%, 0)\`);
        } else {
          lineGrad.addColorStop(0, gradient.color);
          lineGrad.addColorStop(1, 'transparent');
        }
        this.ctx.fillStyle = lineGrad;
        this.ctx.fillRect(-maxRadius, -maxRadius, maxRadius * 2, maxRadius * 2);
        this.ctx.restore();
      }
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
    const totalHue = this.settings.hue + this.settings.animatedHue;
    if (totalHue !== 0) filter.push(\`hue-rotate(\${totalHue}deg)\`);
    this.canvas.style.filter = filter.join(' ') || 'none';
  }
  animate() {
    this.time += this.speed;
    if (this.settings.hueRotationSpeed > 0) {
      const hueRotationPerFrame = (this.settings.hueRotationSpeed * 360) / 60;
      this.settings.animatedHue = (this.settings.animatedHue + hueRotationPerFrame) % 360;
    }
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
    } else if (key === 'hueSeparation' || key === 'evenlySpacedColors') {
      this.createGradients();
    } else if (key === 'gradientSizeMultiplier' || key === 'gradientSizeMode') {
      if (key === 'gradientSizeMode' || (key === 'gradientSizeMultiplier' && this.settings.gradientSizeMode === 'base')) {
        this.createGradients();
      }
    } else if (key === 'fadeoutMode' || key === 'fadeoutTime') {
      this.fadeoutLastTime = Date.now();
    } else if (key === 'hueRotationSpeed') {
      if (value === 0) {
        this.settings.animatedHue = 0;
      }
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
  <div class="background-gradient-wrapper">
    <canvas id="gradientCanvas"></canvas>
    <!-- SVG Overlay -->
    <div class="svg-overlay" id="svgOverlay" style="display: ${settings.svgEnabled ? 'block' : 'none'}; opacity: ${settings.svgOpacity / 100}; mix-blend-mode: ${settings.svgBlendMode};">
${svgHTML}
    </div>
  </div>

  <!-- Sample Hero Content -->
  <main class="hero-content" style="color: ${settings.textColor}; mix-blend-mode: ${settings.textBlendMode};">
    <h1>${settings.textMarkerEnabled ? `<span style="display: inline; padding: 10px 20px; background-color: ${settings.textMarkerColor}; color: #fff; -webkit-box-decoration-break: clone; box-decoration-break: clone; margin-bottom: 0;">The backend to build the modern web.</span>` : 'The backend to build the modern web.'}</h1>
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
        'scale', 'gradientSizeMultiplier', 'gradientSizeMode', 'positionX', 'positionY', 'blendMode', 'backgroundColor', 'gradientFade', 
        'gradientCount', 'gradientSpeed', 'fadeoutMode', 'fadeoutTime', 'hueStart', 'hueEnd', 
        'hueSeparation', 'evenlySpacedColors', 'saturationMin', 'saturationMax', 'lightnessMin', 'lightnessMax', 'colorMode', 'paletteColors',
        'hueRotationSpeed', 'animatedHue', 'radialGradientsEnabled', 'lineGradientsEnabled', 
        'lineGradientAngle', 'lineGradientLength', 'lineGradientWidth'];
      
      canvasSettings.forEach(key => {
        if (settings[key] !== undefined) {
          animation.updateSetting(key, settings[key]);
        }
      });
      
      // Set initial time and animatedHue to preserve color state
      if (settings.initialTime !== undefined) {
        animation.time = settings.initialTime;
      }
      if (settings.animatedHue !== undefined) {
        animation.settings.animatedHue = settings.animatedHue;
      }
    }
    
    // Initialize SVG pattern generator with exported settings
    const svgOverlay = document.getElementById('svgOverlay');
    if (svgOverlay && typeof SVGPatternGenerator !== 'undefined') {
      const svgPatternGenerator = new SVGPatternGenerator(svgOverlay);
      svgPatternGenerator.setEnabled(settings.svgEnabled);
      svgPatternGenerator.updatePattern(
        settings.svgPattern,
        settings.svgSize,
        settings.svgOpacity,
        settings.svgColor,
        settings.svgBlendMode,
        settings.svgStrokeWidth
      );
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
      
      const hueSeparationControls = document.getElementById('hueSeparationControls');
      const hueSeparationSliderControl = document.getElementById('hueSeparationSliderControl');
      
      if (mode === 'palette') {
        if (paletteControls) paletteControls.style.display = 'block';
        if (paletteControls2) paletteControls2.style.display = 'block';
        if (paletteControls3) paletteControls3.style.display = 'block';
        if (paletteControls4) paletteControls4.style.display = 'block';
        if (paletteControls5) paletteControls5.style.display = 'block';
        if (hueSeparationControls) hueSeparationControls.style.display = 'none';
        if (hueSeparationSliderControl) hueSeparationSliderControl.style.display = 'none';
      } else {
        if (hueSeparationControls) hueSeparationControls.style.display = 'block';
        if (hueSeparationSliderControl) hueSeparationSliderControl.style.display = 'block';
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

  // Initialize text marker visibility
  setTimeout(() => {
    const textMarkerEnabled = document.getElementById('textMarkerEnabled');
    const textMarkerColorControl = document.getElementById('textMarkerColorControl');
    if (textMarkerEnabled && textMarkerColorControl) {
      textMarkerColorControl.style.display = textMarkerEnabled.checked ? 'block' : 'none';
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

