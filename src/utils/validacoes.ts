export const validarCPF = (cpf: string): boolean => {
  const cpfLimpo = cpf.replace(/[^\d]+/g, '');
  
  if (cpfLimpo.length !== 11) return false;
  if (/^(\d)\1+$/.test(cpfLimpo)) return false;
  
  let soma = 0;
  let resto;
  
  for (let i = 1; i <= 9; i++) {
    soma += parseInt(cpfLimpo.substring(i - 1, i)) * (11 - i);
  }
  
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpfLimpo.substring(9, 10))) return false;
  
  soma = 0;
  for (let i = 1; i <= 10; i++) {
    soma += parseInt(cpfLimpo.substring(i - 1, i)) * (12 - i);
  }
  
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpfLimpo.substring(10, 11))) return false;
  
  return true;
};

export const validarCNPJ = (cnpj: string): boolean => {
  const cnpjLimpo = cnpj.replace(/[^\d]+/g, '');
  
  if (cnpjLimpo.length !== 14) return false;
  if (/^(\d)\1+$/.test(cnpjLimpo)) return false;
  
  let tamanho = cnpjLimpo.length - 2;
  let numeros = cnpjLimpo.substring(0, tamanho);
  const digitos = cnpjLimpo.substring(tamanho);
  let soma = 0;
  let pos = tamanho - 7;
  
  for (let i = tamanho; i >= 1; i--) {
    soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
    if (pos < 2) pos = 9;
  }
  
  let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  if (resultado !== parseInt(digitos.charAt(0))) return false;
  
  tamanho = tamanho + 1;
  numeros = cnpjLimpo.substring(0, tamanho);
  soma = 0;
  pos = tamanho - 7;
  
  for (let i = tamanho; i >= 1; i--) {
    soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
    if (pos < 2) pos = 9;
  }
  
  resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  return resultado === parseInt(digitos.charAt(1));
};

export const validarEmail = (email: string): boolean => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const validarTelefone = (telefone: string): boolean => {
  const telefoneLimpo = telefone.replace(/[^\d]+/g, '');
  return telefoneLimpo.length === 10 || telefoneLimpo.length === 11;
};

export const validarCEP = (cep: string): boolean => {
  const cepLimpo = cep.replace(/[^\d]+/g, '');
  return cepLimpo.length === 8;
};

export const validarSenha = (senha: string): {
  valida: boolean;
  erros: string[];
} => {
  const erros: string[] = [];
  
  if (senha.length < 8) {
    erros.push('A senha deve ter pelo menos 8 caracteres');
  }
  
  if (!/[A-Z]/.test(senha)) {
    erros.push('A senha deve conter pelo menos uma letra maiúscula');
  }
  
  if (!/[a-z]/.test(senha)) {
    erros.push('A senha deve conter pelo menos uma letra minúscula');
  }
  
  if (!/[0-9]/.test(senha)) {
    erros.push('A senha deve conter pelo menos um número');
  }
  
  if (!/[^A-Za-z0-9]/.test(senha)) {
    erros.push('A senha deve conter pelo menos um caractere especial');
  }
  
  return {
    valida: erros.length === 0,
    erros
  };
};

export const validarData = (data: string): boolean => {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  if (!regex.test(data)) return false;
  
  const dataObj = new Date(data);
  return dataObj instanceof Date && !isNaN(dataObj.getTime());
};

export const validarValorMonetario = (valor: number): boolean => {
  return valor > 0 && Number.isFinite(valor);
};
