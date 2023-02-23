export default function (seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);

  return {
    mins,
    secs,
  };
}
