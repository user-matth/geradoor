export function generateCPF(): string {
  const randomDigits = (): number => Math.floor(Math.random() * 9);

  const cpf: number[] = Array.from({ length: 9 }, randomDigits);

  const calculateDigit = (cpfArray: number[]): number => {
    const sum = cpfArray.reduce((total, num, index) => {
      return total + num * (cpfArray.length + 1 - index);
    }, 0);
    const remainder = sum % 11;
    return remainder < 2 ? 0 : 11 - remainder;
  };

  cpf.push(calculateDigit(cpf));
  cpf.push(calculateDigit(cpf));

  return cpf.join('');
}

export function formatCPF(cpf: string): string {
  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
}
