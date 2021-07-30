const emailRegex = /[a-zA-z]*@[a-zA-z]*.com/;
export function validateSignup({ first, last, email, password }) {
  let status;
  let message = [];
  if (typeof first !== 'string') message.push('first name should be alphabets');
  if (typeof last !== 'string') message.push('last name should be alphabets');
  if (!emailRegex.test(email)) message.push('invalid email');
  if (password.length < 8) message.push('invalid password');
  status = message.length === 0;
  return { status, message };
}
export function validateLogin({ email, password }) {
  let status;
  let message = [];
  if (!emailRegex.test(email)) message.push('invalid email');
  if (password.length < 8) message.push('invalid password');
  status = message.length === 0;
  return { status, message };
}
export function validateProduct({ name, price, descriptio }) {
  let status;
  let message = [];
  if (name === null) message.push('invalid name');
  if (price === null) message.push('invalid price');
  if (descriptio === null) message.push('invalid descriptio');
  status = message.length === 0;
  return { status, message };
}
