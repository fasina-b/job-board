// src/app/utils/generateRandomString.ts

const generateUserId = (firstname: string, lastname: string): string => {
  const randomNumber = Math.floor(100000 + Math.random() * 900000);
  const firstInitial = firstname ? firstname.charAt(0).toUpperCase() : 'A';
  const lastInitial = lastname ? lastname.charAt(0).toUpperCase() : 'B';
  return `${randomNumber}${firstInitial}${lastInitial}`;
};

export default generateUserId;
