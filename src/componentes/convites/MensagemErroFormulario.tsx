import estilos from './estilos.module.css';

interface MensagemErroFormularioProps {
  mensagem: string;
}

export function MensagemErroFormulario({ mensagem }: MensagemErroFormularioProps) {
  return (
    <div className={estilos.mensagemErro}>
      {mensagem}
    </div>
  );
}
