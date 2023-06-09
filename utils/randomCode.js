const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

export const generateRandomCode =(length)=> {
  let code = '';
  
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    code += characters[randomIndex];
  }
  
  return code;
}
