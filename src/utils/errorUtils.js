// utils/errorUtils.js
export const handleAxiosError = error => {
  console.log('handleAxiosError', error);
  if (error.response) {
    // Если ошибка от axios, возвращаем сообщение из response
    return error.response.data.message || 'An error occurred';
  }
  // Если ошибка сети или другого типа, возвращаем общее сообщение
  return 'Network error or unexpected issue';
};
