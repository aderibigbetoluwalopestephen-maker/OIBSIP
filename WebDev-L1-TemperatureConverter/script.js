const form = document.getElementById("converterForm");
const input = document.getElementById("temperature");
const fromUnit = document.getElementById("fromUnit");
const toUnit = document.getElementById("toUnit");
const message = document.getElementById("message");
const resultValue = document.getElementById("resultValue");
const resultUnit = document.getElementById("resultUnit");

const unitNames = {
  C: "Celsius (°C)",
  F: "Fahrenheit (°F)",
  K: "Kelvin (K)"
};

function toCelsius(value, unit) {
  if (unit === "C") return value;
  if (unit === "F") return (value - 32) * 5 / 9;
  return value - 273.15;
}

function fromCelsius(value, unit) {
  if (unit === "C") return value;
  if (unit === "F") return value * 9 / 5 + 32;
  return value + 273.15;
}

function convert(value, from, to) {
  return fromCelsius(toCelsius(value, from), to);
}

function absoluteZero(unit) {
  return unit === "C" ? -273.15 : unit === "F" ? -459.67 : 0;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  message.textContent = "";

  const value = Number(input.value);
  const from = fromUnit.value;
  const to = toUnit.value;

  if (input.value.trim() === "" || !Number.isFinite(value)) {
    message.textContent = "Please enter a valid numeric temperature.";
    resultValue.textContent = "—";
    resultUnit.textContent = "Waiting for a valid value";
    return;
  }

  if (value < absoluteZero(from)) {
    message.textContent = `Invalid temperature: ${unitNames[from]} cannot be below absolute zero.`;
    resultValue.textContent = "—";
    resultUnit.textContent = "Check the input and try again";
    return;
  }

  const converted = convert(value, from, to);
  const rounded = Math.abs(converted) < 0.000001 ? 0 : Number(converted.toFixed(2));

  resultValue.textContent = `${rounded}°`;
  resultUnit.textContent = unitNames[to];
});

input.addEventListener("input", () => {
  message.textContent = "";
});
