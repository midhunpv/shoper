export const phoneNumber = (value) =>
  value && !/^(0|[1-9][0-9]{9})$/i.test(value)
    ? "Invalid phone number, must be 10 digits"
    : undefined;
 export const required = (value) =>
  value || typeof value === "number" ? undefined : "Required";
const maxLength = (max) => (value) =>
  value && value.length > max ? `Must be ${max} characters or less` : undefined;
export const maxLengthFifteen = maxLength(15);
const minLength = (min) => (value) =>
  value && value.length < min ? `Must be ${min} characters or more` : undefined;
export const minLengthEight = minLength(8);
export const number = (value) =>
  value && isNaN(Number(value)) ? "Must be a number" : undefined;
export const alphaNumeric = (value) =>
  value && /[^a-zA-Z0-9 ]/i.test(value)
    ? "Only alphanumeric characters"
    : undefined;
