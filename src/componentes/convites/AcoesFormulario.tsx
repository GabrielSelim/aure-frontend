import { Button } from '../ui/button';
import estilos from './estilos.module.css';

interface AcoesFormularioProps {
  carregando: boolean;
  textoBotaoPrincipal: string;
  aoClicarCancelar: () => void;
}

export function AcoesFormulario({ carregando, textoBotaoPrincipal, aoClicarCancelar }: AcoesFormularioProps) {
  return (
    <div className={estilos.acoes}>
      <Button
        type="button"
        variant="outline"
        onClick={aoClicarCancelar}
        disabled={carregando}
      >
        Cancelar
      </Button>
      <Button type="submit" disabled={carregando}>
        {carregando ? 'Enviando...' : textoBotaoPrincipal}
      </Button>
    </div>
  );
}
