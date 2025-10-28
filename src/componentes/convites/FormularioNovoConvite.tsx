'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Plus } from 'lucide-react';
import * as convites from '../../servicos/convites';
import { PerfilUsuarioNumerico, TipoConviteNumerico } from '../../tipos/entidades';
import estilos from './estilos.module.css';
import { CampoFormulario } from './CampoFormulario';
import { AcoesFormulario } from './AcoesFormulario';
import { MensagemErroFormulario } from './MensagemErroFormulario';
import { AvisoTipoConvite } from './AvisoTipoConvite';

const esquemaConvite = z.object({
  email: z.string().email('Email inválido'),
  nome: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres'),
  role: z.number(),
  inviteType: z.number(),
  razaoSocial: z.string().optional(),
  cnpj: z.string().optional(),
  businessModel: z.number().optional(),
  companyType: z.number().optional(),
});

type DadosConvite = z.infer<typeof esquemaConvite>;

interface FormularioNovoConviteProps {
  aoSucesso?: () => void;
}

export function FormularioNovoConvite({ aoSucesso }: FormularioNovoConviteProps) {
  const [aberto, setAberto] = useState(false);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const [tipoSelecionado, setTipoSelecionado] = useState<number>(0);
  const [perfilSelecionado, setPerfilSelecionado] = useState<number>(2);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch
  } = useForm<DadosConvite>({
    resolver: zodResolver(esquemaConvite),
    defaultValues: {
      inviteType: 0,
      role: 2,
      businessModel: 1,
      companyType: 1
    }
  });

  const aoSubmeter = async (dados: DadosConvite) => {
    try {
      setCarregando(true);
      setErro(null);

      await convites.convidarUsuario(dados);
      
      reset();
      setAberto(false);
      aoSucesso?.();
    } catch (error: any) {
      let mensagemErro = 'Erro ao enviar convite';
      
      if (error.response?.data) {
        const apiError = error.response.data;
        
        if (apiError.errors) {
          const primeiroErro = Object.values(apiError.errors)[0];
          if (Array.isArray(primeiroErro) && primeiroErro.length > 0) {
            mensagemErro = primeiroErro[0];
          }
        } else if (apiError.title) {
          mensagemErro = apiError.title;
        } else if (apiError.message) {
          mensagemErro = apiError.message;
        } else if (typeof apiError === 'string') {
          mensagemErro = apiError;
        }
      } else if (error.message) {
        mensagemErro = error.message;
      }

      if (mensagemErro.toLowerCase().includes('cnpj')) {
        mensagemErro = 'CNPJ inválido ou não corresponde à Razão Social. Verifique os dados e tente novamente.';
      }

      setErro(mensagemErro);
    } finally {
      setCarregando(false);
    }
  };

  const aoMudarTipo = (valor: string) => {
    const tipo = Number(valor);
    setTipoSelecionado(tipo);
    setValue('inviteType', tipo);

    if (tipo === TipoConviteNumerico.Internal) {
      setValue('role', PerfilUsuarioNumerico.Financeiro);
      setPerfilSelecionado(PerfilUsuarioNumerico.Financeiro);
      setValue('businessModel', undefined);
      setValue('companyType', undefined);
      setValue('razaoSocial', undefined);
      setValue('cnpj', undefined);
    } else if (tipo === TipoConviteNumerico.ContractedPJ) {
      setValue('role', PerfilUsuarioNumerico.FuncionarioPJ);
      setValue('businessModel', 3);
      setValue('companyType', 2);
      setPerfilSelecionado(PerfilUsuarioNumerico.FuncionarioPJ);
    }
  };

  const aoMudarPerfil = (valor: string) => {
    const perfil = Number(valor);
    setPerfilSelecionado(perfil);
    setValue('role', perfil);
  };

  const precisaDadosEmpresa = tipoSelecionado === TipoConviteNumerico.ContractedPJ;
  const mostrarCampoPerfil = tipoSelecionado === TipoConviteNumerico.Internal;

  return (
    <Dialog open={aberto} onOpenChange={setAberto}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Novo Convite
        </Button>
      </DialogTrigger>
      <DialogContent className={estilos.dialogContent}>
        <DialogHeader className={estilos.dialogHeader}>
          <DialogTitle className={estilos.dialogTitulo}>Convidar Usuário</DialogTitle>
          <DialogDescription className={estilos.dialogDescricao}>
            Preencha os dados para enviar um convite
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(aoSubmeter)} className={estilos.container}>
          <CampoFormulario label="Tipo de Convite" htmlFor="tipo">
            <Select onValueChange={aoMudarTipo} defaultValue="0">
              <SelectTrigger>
                <SelectValue placeholder="Selecione o tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">Usuário Interno</SelectItem>
                <SelectItem value="1">Funcionário PJ</SelectItem>
              </SelectContent>
            </Select>
          </CampoFormulario>

          {tipoSelecionado === TipoConviteNumerico.Internal && (
            <AvisoTipoConvite tipo="interno" />
          )}

          {tipoSelecionado === TipoConviteNumerico.ContractedPJ && (
            <AvisoTipoConvite tipo="contratado" />
          )}

          {mostrarCampoPerfil && (
            <CampoFormulario label="Perfil" htmlFor="perfil">
              <Select onValueChange={aoMudarPerfil} value={String(perfilSelecionado)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecione o perfil" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2">Financeiro</SelectItem>
                  <SelectItem value="3">Jurídico</SelectItem>
                  <SelectItem value="4">Funcionário CLT</SelectItem>
                </SelectContent>
              </Select>
            </CampoFormulario>
          )}

          <CampoFormulario label="Nome Completo" htmlFor="nome" erro={errors.nome?.message}>
            <Input
              id="nome"
              {...register('nome')}
              placeholder="Digite o nome completo"
              disabled={carregando}
            />
          </CampoFormulario>

          <CampoFormulario label="Email" htmlFor="email" erro={errors.email?.message}>
            <Input
              id="email"
              type="email"
              {...register('email')}
              placeholder="Digite o email"
              disabled={carregando}
            />
          </CampoFormulario>

          {precisaDadosEmpresa && (
            <div className={estilos.camposEmpresa}>
              <div className={estilos.camposEmpresaTitulo}>Dados da Empresa PJ</div>
              
              <CampoFormulario label="Razão Social" htmlFor="razaoSocial" erro={errors.razaoSocial?.message}>
                <Input
                  id="razaoSocial"
                  {...register('razaoSocial')}
                  placeholder="Digite a razão social da empresa"
                  disabled={carregando}
                />
              </CampoFormulario>

              <CampoFormulario label="CNPJ" htmlFor="cnpj" erro={errors.cnpj?.message}>
                <Input
                  id="cnpj"
                  {...register('cnpj')}
                  placeholder="00.000.000/0000-00"
                  disabled={carregando}
                  maxLength={18}
                />
                <div className={estilos.dicaCnpj}>
                  ⚠️ O CNPJ deve corresponder à Razão Social informada
                </div>
              </CampoFormulario>
            </div>
          )}

          {erro && <MensagemErroFormulario mensagem={erro} />}

          <AcoesFormulario
            carregando={carregando}
            textoBotaoPrincipal="Enviar Convite"
            aoClicarCancelar={() => setAberto(false)}
          />
        </form>
      </DialogContent>
    </Dialog>
  );
}
