export function generateCNPJ(): string {
  const randomDigits = (): number => Math.floor(Math.random() * 10);

  const cnpj: number[] = Array.from({ length: 12 }, randomDigits);

  const mult1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  const mult2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

  const calculateDigit = (digits: number[], multipliers: number[]): number => {
    const sum = digits.reduce((acc, digit, index) => {
      return acc + digit * multipliers[index];
    }, 0);

    const remainder = sum % 11;
    return remainder < 2 ? 0 : 11 - remainder;
  };

  const firstDigit = calculateDigit(cnpj, mult1);
  cnpj.push(firstDigit);

  const secondDigit = calculateDigit(cnpj, mult2);
  cnpj.push(secondDigit);

  return cnpj.join('');
}

export function formatCNPJ(cnpj: string): string {
  return cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
}

export function validateCNPJ(cnpj: string): boolean {
  const cleanCNPJ = cnpj.replace(/\D/g, '');

  if (cleanCNPJ.length !== 14) return false;

  if (/^(\d)\1+$/.test(cleanCNPJ)) return false;

  const mult1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  const mult2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

  const calculateDigit = (digits: string, multipliers: number[]): number => {
    const sum = digits.split('').reduce((acc, digit, index) => {
      return acc + parseInt(digit) * multipliers[index];
    }, 0);

    const remainder = sum % 11;
    return remainder < 2 ? 0 : 11 - remainder;
  };

  const numbers = cleanCNPJ.slice(0, 12);
  const digits = cleanCNPJ.slice(12);

  const digit1 = calculateDigit(numbers, mult1);
  const digit2 = calculateDigit(numbers + digit1, mult2);

  return digits === `${digit1}${digit2}`;
}