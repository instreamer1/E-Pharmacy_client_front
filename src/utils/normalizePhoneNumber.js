export const normalizePhoneNumber = phone => {
  if (!phone) return '';
  const digits = phone.replace(/\D/g, '');

  
  if (digits.startsWith('38')) {
    return `+${digits}`;
  }


  if (digits.startsWith('0')) {
    return `+38${digits}`;
  }

  return `+${digits}`; 
};
