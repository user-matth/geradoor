interface CardBrand {
  name: string;
  prefixes: number[];
  lengths: number[];
  securityCode: {
    name: string;  // 'CVV' ou 'CVC'
    length: number;
  };
}

interface CreditCard {
  number: string;
  formattedNumber: string;
  expirationDate: string;
  securityCode: string;
  brand: string;
  securityCodeName: string;
}

const CARD_BRANDS: CardBrand[] = [
  {
    name: "Visa",
    prefixes: [4],
    lengths: [13, 16],
    securityCode: { name: "CVV", length: 3 }
  },
  {
    name: "Mastercard",
    prefixes: [51, 52, 53, 54, 55],
    lengths: [16],
    securityCode: { name: "CVC", length: 3 }
  },
  {
    name: "American Express",
    prefixes: [34, 37],
    lengths: [15],
    securityCode: { name: "CID", length: 4 }
  },
  {
    name: "Diners Club",
    prefixes: [300, 301, 302, 303, 304, 305, 36, 38],
    lengths: [14, 16],
    securityCode: { name: "CVV", length: 3 }
  },
  {
    name: "Discover",
    prefixes: [6011, 644, 645, 646, 647, 648, 649, 65],
    lengths: [16],
    securityCode: { name: "CID", length: 3 }
  },
  {
    name: "JCB",
    prefixes: [35],
    lengths: [16],
    securityCode: { name: "CVV", length: 3 }
  },
  {
    name: "HiperCard",
    prefixes: [384100, 384140, 384160, 606282],
    lengths: [16],
    securityCode: { name: "CVC", length: 3 }
  },
  {
    name: "Aura",
    prefixes: [50],
    lengths: [16],
    securityCode: { name: "CVV", length: 3 }
  }
];

function generateRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateExpirationDate(): string {
  const today = new Date();
  const month = generateRandomNumber(1, 12);
  const year = today.getFullYear() + generateRandomNumber(1, 5);
  return `${month.toString().padStart(2, '0')}/${year}`;
}

function generateSecurityCode(length: number): string {
  return Array.from({ length }, () => generateRandomNumber(0, 9)).join('');
}

function calculateLuhnChecksum(number: string): number {
  const digits = number.split('').map(Number);
  let sum = 0;
  let isEven = false;

  for (let i = digits.length - 1; i >= 0; i--) {
    let digit = digits[i];

    if (isEven) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }

    sum += digit;
    isEven = !isEven;
  }

  return (sum * 9) % 10;
}

function formatCardNumber(number: string, brand: string): string {
  if (brand === "American Express") {
    return number.replace(/(\d{4})(\d{6})(\d{5})/, "$1 $2 $3");
  }
  return number.replace(/(\d{4})/g, "$1 ").trim();
}

export function generateCreditCard(brandName?: string): CreditCard {
  // Filtra a marca específica ou escolhe uma aleatória
  const availableBrands = brandName 
    ? CARD_BRANDS.filter(b => b.name.toLowerCase() === brandName.toLowerCase())
    : CARD_BRANDS;

  if (availableBrands.length === 0) {
    throw new Error(`Invalid brand name: ${brandName}`);
  }

  const brand = availableBrands[Math.floor(Math.random() * availableBrands.length)];
  
  // Escolhe um prefixo e comprimento aleatório para a marca
  const prefix = brand.prefixes[Math.floor(Math.random() * brand.prefixes.length)];
  const length = brand.lengths[Math.floor(Math.random() * brand.lengths.length)];
  
  // Gera os dígitos restantes
  const remainingLength = length - prefix.toString().length - 1; // -1 para o dígito verificador
  const randomDigits = Array.from({ length: remainingLength }, 
    () => generateRandomNumber(0, 9)).join('');
  
  // Combina prefixo e dígitos aleatórios
  const numberWithoutChecksum = `${prefix}${randomDigits}`;
  
  // Calcula e adiciona o dígito verificador
  const checksum = calculateLuhnChecksum(numberWithoutChecksum);
  const fullNumber = `${numberWithoutChecksum}${checksum}`;

  return {
    number: fullNumber,
    formattedNumber: formatCardNumber(fullNumber, brand.name),
    expirationDate: generateExpirationDate(),
    securityCode: generateSecurityCode(brand.securityCode.length),
    brand: brand.name,
    securityCodeName: brand.securityCode.name
  };
}

// Função auxiliar para validar números de cartão
export function validateCreditCard(number: string): boolean {
  const cleanNumber = number.replace(/\D/g, '');
  if (!/^\d+$/.test(cleanNumber)) return false;
  
  const digits = cleanNumber.split('').map(Number);
  let sum = 0;
  let isEven = false;

  for (let i = digits.length - 2; i >= 0; i--) {
    let digit = digits[i];

    if (isEven) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }

    sum += digit;
    isEven = !isEven;
  }

  const checksum = (10 - (sum % 10)) % 10;
  return checksum === digits[digits.length - 1];
}