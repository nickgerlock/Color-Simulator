<script lang="ts">
  // Default values.
  export let brightness: number = 0.5;
  export let colorTemperature: number = 4000;
  export let filterStrength: number = 1.0;

  import { scaleColor, filterColor, colorString } from './lib/color';
  import { temperatureToRGB } from './lib/color_temperature';
  import {
    White,
    Black,
    Red,
    Green,
    Blue,
    Yellow,
    Magenta,
    Cyan,
  } from './lib/colors';

  let canvas: HTMLCanvasElement;

  const CANVAS_HEIGHT = 200;
  const CANVAS_WIDTH = 1000;
  const BAR_HEIGHT = 100;
  const BAR_MARGIN = 25;

  $: draw(canvas, brightness, colorTemperature, filterStrength);

  function draw(canvas: HTMLCanvasElement, brightness: number, colorTemperature: number, filterStrength: number) {
    if (!canvas) return;
    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;

    const context = canvas.getContext("2d");
    if (!context) return;

    const pureColors = [
      White,
      Black,
      Red,
      Green,
      Blue,
      Yellow,
      Magenta,
      Cyan,
    ];
    const lightSource = scaleColor(temperatureToRGB(colorTemperature), brightness);
    const barWidth: number = (CANVAS_WIDTH - (BAR_MARGIN * pureColors.length)) / pureColors.length;
    const accentHeight = BAR_HEIGHT * 0.75;
    const accentWidth = barWidth * 0.75;
    const subAccentWidth = accentWidth / 2;
    const subAccentHeight = accentHeight / 2;
    const squareSizeWithMargin = barWidth + BAR_MARGIN;

    let x = BAR_MARGIN, y = 0;
    const colorRows = [pureColors];
    colorRows.forEach(colorList => {
      colorList.forEach(color => {
        const main = scaleColor(filterColor(lightSource, scaleColor(color, 1.5), filterStrength), 1.0);
        const brighter = scaleColor(filterColor(lightSource, scaleColor(color, 1.75), filterStrength * 0.7), 1.2);
        const brightest = scaleColor(filterColor(lightSource, scaleColor(color, 2.0), filterStrength * 0.2), 1.4);
        context.fillStyle = colorString(main);
        context.fillRect(x, y, barWidth, BAR_HEIGHT);
        context.fillStyle = colorString(brighter);
        context.fillRect(x + (0.5 * barWidth) - (0.5 * accentWidth), y + (0.5 * BAR_HEIGHT) - (accentHeight * 0.5), accentWidth, accentHeight);
        context.fillStyle = colorString(brightest);
        context.fillRect(x + (0.5 * barWidth) - (0.5 * accentWidth - (0.5 * subAccentWidth)), y + (0.5 * BAR_HEIGHT) - (accentHeight * 0.5 - (0.5 * subAccentHeight)), subAccentWidth, subAccentHeight);

        x += squareSizeWithMargin;
      });
      y += squareSizeWithMargin;
      x = BAR_MARGIN;
    });
  }
</script>

<div class="color_simulator">
  <canvas on:load={() => draw(canvas, brightness, colorTemperature, filterStrength)} id="canvas" width="{CANVAS_WIDTH}" height="{CANVAS_HEIGHT}" bind:this={canvas}></canvas>
</div>

<style>
  .color_simulator {
    animation: fadein 0.4s;
  }
  @keyframes fadein {
      from {
          opacity: 0;
      }
      to {
          opacity: 1;
      }
  }
  canvas {
    margin: auto;
    margin-top: 20em;
    display: block;
  }
</style>
