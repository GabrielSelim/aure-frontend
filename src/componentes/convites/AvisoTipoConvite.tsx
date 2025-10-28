import estilos from './estilos.module.css';

interface AvisoTipoConviteProps {
  tipo: 'interno' | 'contratado';
}

export function AvisoTipoConvite({ tipo }: AvisoTipoConviteProps) {
  const mensagens = {
    interno: {
      titulo: 'Usuário Interno:',
      descricao: 'Funcionário da sua empresa. Pode ter perfil Financeiro, Jurídico ou CLT.'
    },
    contratado: {
      titulo: 'Funcionário PJ:',
      descricao: 'Prestador de serviço que será contratado. Você deve informar a Razão Social e CNPJ da empresa dele.'
    }
  };

  const mensagem = mensagens[tipo];

  return (
    <div className={estilos.avisoTipo}>
      <strong>{mensagem.titulo}</strong> {mensagem.descricao}
    </div>
  );
}
