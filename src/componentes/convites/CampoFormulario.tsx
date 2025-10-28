import { Label } from '../ui/label';
import estilos from './estilos.module.css';

interface CampoFormularioProps {
  label: string;
  htmlFor: string;
  erro?: string;
  children: React.ReactNode;
}

export function CampoFormulario({ label, htmlFor, erro, children }: CampoFormularioProps) {
  return (
    <div className={estilos.campo}>
      <Label htmlFor={htmlFor} className={estilos.label}>
        {label}
      </Label>
      {children}
      {erro && <p className={estilos.erro}>{erro}</p>}
    </div>
  );
}
