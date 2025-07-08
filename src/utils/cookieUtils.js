// utils/cookieUtils.js

export const clearAllCookies = () => {
    const cookies = document.cookie.split(';');
    const domain = window.location.hostname;
    
    cookies.forEach(cookie => {
      const [name] = cookie.split('=');
      const cookieName = name.trim();
      document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${domain};`;
    });
  };
  
 
  export const clearCookie = (name) => {
    const domain = window.location.hostname;
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${domain};`;
  };