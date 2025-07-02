// utils/errorUtils.js

export const handleAxiosError = error => {
  // console.log('Full error object:', error);
  // console.log('error.response:', error.response);

  if (error.response && error.response.data) {
    return {
      message: error.response.data.message || 'An error occurred',
      code: error.response.data.code || 'UNKNOWN',
      httpStatus: error.response.status,
      // serverTotal: error.response.data.serverTotal, // если нужно
    };
  }

  return {
    message: 'Network error or unexpected issue',
    code: 'NETWORK_ERROR',
  };
};

// export const handleAxiosError = error => {
//   console.log('handleAxiosError', error);
//   if (error.response) {
//     // Если ошибка от axios, возвращаем сообщение из response
//     return error.response.data.message || 'An error occurred';
//   }
//   // Если ошибка сети или другого типа, возвращаем общее сообщение
//   return 'Network error or unexpected issue';
// };

// export const handleAxiosError = error => {
//   console.error('Axios error caught:', error);

//   if (error.response) {
//     const { data, status } = error.response;

//     return {
//       message: data?.message || `Server responded with status ${status}`,
//       code: data?.code || `HTTP_${status}`,
//       status,
//       serverTotal: data?.serverTotal,
//     };
//   }

//   if (error.request) {
//     return {
//       message: 'No response received from server.',
//       code: 'NO_RESPONSE',
//     };
//   }

//   return {
//     message: error.message || 'Unexpected error',
//     code: 'UNEXPECTED_ERROR',
//   };
// };
