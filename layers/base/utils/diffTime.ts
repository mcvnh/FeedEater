export const diffTime = (date: Date) => {
  const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
  const diff = date.getTime() - (new Date()).getTime();
  const diffInSeconds = Math.ceil(diff / 1000);
  const diffInMinutes = Math.ceil(diff / (1000 * 60));
  const diffInHours = Math.ceil(diff / (1000 * 60 * 60));
  const diffInDays = Math.ceil(diff / (1000 * 60 * 60 * 24));

  if (diffInDays < 0) {
    return rtf.format(diffInDays, 'day');
  } else if (diffInHours < 0) {
    return rtf.format(diffInHours, 'hour');
  } else if (diffInMinutes < 0) {
    return rtf.format(diffInMinutes, 'minute');
  } else if (diffInSeconds < 0) {
    return rtf.format(diffInSeconds, 'second');
  }
}