interface SeletorProps {
  valor: string;
  aoMudar: (valor: string) => void;
  opcoes: { valor: string; texto: string }[];
  placeholder?: string;
  desabilitado?: boolean;
}

export function Seletor({ valor, aoMudar, opcoes, placeholder, desabilitado }: SeletorProps) {
  return (
    <select
      value={valor}
      onChange={(e) => aoMudar(e.target.value)}
      disabled={desabilitado}
      style={{
        width: '100%',
        height: '2.75rem',
        padding: '0.75rem',
        border: '1px solid #d1d5db',
        borderRadius: '0.5rem',
        fontSize: '0.875rem',
        backgroundColor: desabilitado ? '#f9fafb' : 'white',
        outline: 'none',
        cursor: desabilitado ? 'not-allowed' : 'pointer'
      }}
      onFocus={(e) => e.target.style.borderColor = '#2563eb'}
      onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
    >
      {placeholder && (
        <option value="" disabled>
          {placeholder}
        </option>
      )}
      {opcoes.map((opcao) => (
        <option key={opcao.valor} value={opcao.valor}>
          {opcao.texto}
        </option>
      ))}
    </select>
  );
}