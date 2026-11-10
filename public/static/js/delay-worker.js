self.addEventListener("message", ({ data }) => {
  const { id, milliseconds } = data;
  setTimeout(() => self.postMessage({ id }), milliseconds);
});
