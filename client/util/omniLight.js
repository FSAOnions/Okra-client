export default [
  [0, 3, 1],
  [0, -3, 1],
  [3, 0, 1],
  [-3, 0, 1],
].map((xyz) => {
  return {
    color: "#ffffff",
    attenuationStartDistance: 2,
    attenuationEndDistance: 6,
    position: xyz,
    intensity: 2500,
  };
});
