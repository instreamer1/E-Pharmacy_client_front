export const isStoreOpen = () => {
  const now = new Date();
  const utcHours = now.getUTCHours();
  const utcMinutes = now.getUTCMinutes();


  const localHours = (utcHours + 3) % 24;
  const currentMinutes = localHours * 60 + utcMinutes;

  const openMinutes = 9 * 60;
  const closeMinutes = 18 * 60;

  return currentMinutes >= openMinutes && currentMinutes < closeMinutes;
};
