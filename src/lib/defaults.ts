type RangeParameters = {
  min: number
  max: number
  default: number
  step: number
  list?: { value: number, label: string }[]
}

export const BrightnessRange: RangeParameters = {
  min: 0,
  max: 2,
  step: 0.05,
  default: 0.8,
}

export const ColorTemperatureRange: RangeParameters = {
  min: 1_000,
  max: 10_000,
  step: 1,
  default: 4_000,
  list: [
    {
      value: 1_000, label: "1000k",
    },
    {
      value: 3_250, label: "3250k",
    },
    {
      value: 6_000, label: "6000k",
    },
    {
      value: 8_250, label: "8250k",
    },
    {
      value: 10_000, label: "10000k",
    },
  ],
}

export const FilterStrengthRange: RangeParameters = {
  min: 0,
  max: 1,
  step: 0.01,
  default: 1.0,
}
