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

export function slugify(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Remove acentos
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-") // Substitui espaços e caracteres especiais
    .replace(/^-+|-+$/g, ""); // Remove hífens nas extremidades
}
