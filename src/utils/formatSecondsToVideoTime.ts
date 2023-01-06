export function formatSecondsToVideoTime(seconds: number) {
  const dateString = new Date(seconds * 1000).toISOString();

  const shouldDisplayHours = seconds >= 3600;

  return shouldDisplayHours
    ? dateString.slice(11, 19)
    : dateString.slice(14, 19);
}
