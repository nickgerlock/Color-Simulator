<h1>Color Simulator</h1>

<script lang="ts">
  import ColorSimulator from '../color_simulator.svelte';
  import { BrightnessRange, ColorTemperatureRange, FilterStrengthRange } from '../lib/defaults';

  let brightness: number = BrightnessRange.default;
  let colorTemperature: number = ColorTemperatureRange.default;
  let filterStrength: number = FilterStrengthRange.default;
</script>

<ColorSimulator brightness={brightness} colorTemperature={colorTemperature} filterStrength={filterStrength}></ColorSimulator>

<div class="controls">
  <div class="brightness control">
    <label for="brightness">Brightness</label>
    <input bind:value={brightness} type="range" id="brightness" name="brightness" min="{BrightnessRange.min}" max="{BrightnessRange.max}" step="{BrightnessRange.step}"/>
  </div>

  <div class="color_temperature control">
    <label for="color_temperature">Color Temperature</label>
    <input bind:value={colorTemperature} type="range" id="color_temperature" name="color_temperature" min="{ColorTemperatureRange.min}" max="{ColorTemperatureRange.max}" step="{ColorTemperatureRange.step}" list="temperature_values" />
  </div>
  <datalist id="temperature_values">
    {#each (ColorTemperatureRange.list || []) as colorTemperature}
      <option value="{colorTemperature.value}">{colorTemperature.label}</option>
    {/each}
  </datalist>

  <div class="filter_strength_container control">
    <label for="filter_strength">Filter Strength</label>
    <input bind:value={filterStrength} type="range" id="filter_strength" name="filter_strength" min="{FilterStrengthRange.min}" max="{FilterStrengthRange.max}" step="{FilterStrengthRange.step}" />
  </div>
</div>

<style>

  datalist {
    display: flex;
    justify-content: space-between;
    font-size: small;
    width: 400px;
    margin: auto;
  }

  option {
    padding: 0;
  }

  .controls {
    width: 400px;
    margin: auto;
    font-size: larger;
  }

  .controls label {
    display: block;
    text-align: center;
  }

  .controls input {
    display: block;
    margin: auto;
    width: 400px;
  }

  .controls .control {
    margin-top: 1em;
  }

</style>
