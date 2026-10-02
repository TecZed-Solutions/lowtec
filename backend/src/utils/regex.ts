const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

const twoFactorRegex = /^\d{6}$/;

export function isValidEmail(email: string): boolean {
  return emailRegex.test(email.trim());
}

export function isValidPassword(password: string): boolean {
  return passwordRegex.test(password);
}

export function isValidTwoFactor(twoFactor: string): boolean {
  return twoFactorRegex.test(twoFactor);
}
