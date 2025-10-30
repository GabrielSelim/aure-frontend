export const formatarCPF = (cpf: string): string => {
  const cpfLimpo = cpf.replace(/[^\d]+/g, '');
  return cpfLimpo.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
};

export const formatarCNPJ = (cnpj: string): string => {
  const cnpjLimpo = cnpj.replace(/[^\d]+/g, '');
  return cnpjLimpo.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
};

export const formatarTelefone = (telefone: string): string => {
  const telefoneLimpo = telefone.replace(/[^\d]+/g, '');
  
  if (telefoneLimpo.length === 10) {
    return telefoneLimpo.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
  }
  
  if (telefoneLimpo.length === 11) {
    return telefoneLimpo.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  }
  
  return telefone;
};

export const formatarCEP = (cep: string): string => {
  const cepLimpo = cep.replace(/[^\d]+/g, '');
  return cepLimpo.replace(/(\d{5})(\d{3})/, '$1-$2');
};

export const formatarMoeda = (valor: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(valor);
};

export const formatarData = (data: string): string => {
  return new Date(data).toLocaleDateString('pt-BR');
};

export const formatarDataHora = (data: string): string => {
  return new Date(data).toLocaleString('pt-BR');
};

export const formatarDataISO = (data: Date): string => {
  return data.toISOString().split('T')[0];
};

export const formatarPorcentagem = (valor: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'percent',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(valor / 100);
};

export const formatarNumero = (numero: number): string => {
  return new Intl.NumberFormat('pt-BR').format(numero);
};

export const limparFormatacao = (texto: string): string => {
  return texto.replace(/[^\d]+/g, '');
};

export const truncarTexto = (texto: string, tamanho: number): string => {
  if (texto.length <= tamanho) return texto;
  return texto.substring(0, tamanho) + '...';
};

export const obterIniciais = (nome: string): string => {
  const partes = nome.trim().split(' ');
  if (partes.length === 1) return partes[0].substring(0, 2).toUpperCase();
  return (partes[0].charAt(0) + partes[partes.length - 1].charAt(0)).toUpperCase();
};

export const capitalizar = (texto: string): string => {
  return texto.charAt(0).toUpperCase() + texto.slice(1).toLowerCase();
};

export const capitalizarPalavras = (texto: string): string => {
  return texto
    .split(' ')
    .map(palavra => capitalizar(palavra))
    .join(' ');
};
