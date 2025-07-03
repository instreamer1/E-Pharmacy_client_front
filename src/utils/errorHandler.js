// utils/errorHandler.js

export const normalizeError = error => {
  if (error?.isAxiosError) {
    const data = error.response?.data;
    return {
      message: data?.message || 'Server error',
      code: data?.code || error.response?.status?.toString() || 'UNKNOWN',
      httpStatus: error.response?.status,
      serverTotal: data?.serverTotal,
    };
  }

  if (typeof error === 'object' && error?.message) {
    return {
      message: error.message,
      code: error.code || 'CUSTOM',
      httpStatus: error.response?.status,
      serverTotal: error.serverTotal,
    };
  }

  if (error instanceof Error) {
    return {
      message: error.message,
      code: 'JS_ERROR',
    };
  }

  return {
    message: 'Unknown error occurred',
    code: 'UNEXPECTED',
  };
};

