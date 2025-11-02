'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { Eye, EyeOff, UserCheck, AlertTriangle, Phone, MapPin, Search } from 'lucide-react';
import { Button } from '../../../componentes/ui/button';
import { Input } from '../../../componentes/ui/input';
import { Label } from '../../../componentes/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../componentes/ui/card';
import { Carregando } from '../../../componentes/comum/Carregando';
import { MensagemErro } from '../../../componentes/comum/MensagemErro';
import { MensagemSucesso } from '../../../componentes/comum/MensagemSucesso';
import { esquemaAceitarConvite, type DadosAceitarConvite } from '../../../validacoes/esquema-convite';
import * as convites from '../../../servicos/convites';
import { obterDados } from '../../../servicos/api';
import { buscarEnderecoPorCEP } from '../../../servicos/viacep';

function ConteudoAceitarConvite() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const [sucesso, setSucesso] = useState<string | null>(null);
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mostrarConfirmacao, setMostrarConfirmacao] = useState(false);
  const [buscandoCEP, setBuscandoCEP] = useState(false);

  const token = searchParams.get('token');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue
  } = useForm<DadosAceitarConvite>({
    resolver: zodResolver(esquemaAceitarConvite),
    defaultValues: {
      pais: 'Brasil'
    }
  });

  const buscarCEP = async (cep: string) => {
    const cepLimpo = cep.replace(/\D/g, '');
    
    if (cepLimpo.length !== 8) {
      return;
    }

    setBuscandoCEP(true);
    try {
      const endereco = await buscarEnderecoPorCEP(cepLimpo);
      
      if (endereco) {
        setValue('rua', endereco.logradouro);
        setValue('bairro', endereco.bairro);
        setValue('cidade', endereco.localidade);
        setValue('estado', endereco.uf);
        setValue('pais', 'Brasil');
        setErro(null);
      }
    } catch (error) {
      setErro(null);
    } finally {
      setBuscandoCEP(false);
    }
  };

  const aoSubmeter = async (dados: DadosAceitarConvite) => {
    if (!token) {
      setErro('Token de convite não fornecido');
      return;
    }

    try {
      setCarregando(true);
      setErro(null);
      setSucesso(null);

      const dadosApi = {
        password: dados.senha,
        cpf: dados.cpf.replace(/\D/g, ''),
        rg: dados.rg || undefined,
        dataNascimento: dados.dataNascimento,
        telefoneCelular: dados.telefoneCelular.replace(/\D/g, ''),
        telefoneFixo: dados.telefoneFixo ? dados.telefoneFixo.replace(/\D/g, '') : undefined,
        cep: dados.cep.replace(/\D/g, ''),
        rua: dados.rua,
        numero: dados.numero,
        complemento: dados.complemento || undefined,
        bairro: dados.bairro,
        cidade: dados.cidade,
        estado: dados.estado,
        pais: dados.pais,
        aceitouTermosUso: true,
        versaoTermosUsoAceita: '1.0',
        aceitouPoliticaPrivacidade: true,
        versaoPoliticaPrivacidadeAceita: '1.0'
      };

      await convites.aceitarConvite(token, dadosApi);
      
      setSucesso('Convite aceito com sucesso! Você será redirecionado para o login.');
      reset();
      
      setTimeout(() => {
        router.push('/entrar');
      }, 2000);
    } catch (error: any) {
      setErro(error.message || 'Erro ao aceitar convite. Verifique se o convite ainda é válido.');
    } finally {
      setCarregando(false);
    }
  };

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-linear-to-br from-blue-50 to-indigo-100">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="flex items-center justify-center w-12 h-12 bg-red-600 rounded-lg">
                <AlertTriangle className="h-6 w-6 text-white" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold">Convite Inválido</CardTitle>
            <CardDescription>
              O link de convite é inválido ou expirou
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <MensagemErro descricao={erro || 'Token de convite não fornecido'} />
            <div className="mt-6">
              <Link href="/entrar">
                <Button>Voltar ao Login</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-linear-to-br from-blue-50 to-indigo-100">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-4">
            <div className="flex items-center justify-center w-12 h-12 bg-green-600 rounded-lg">
              <UserCheck className="h-6 w-6 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">Aceitar Convite</CardTitle>
          <CardDescription>
            Complete seu cadastro para acessar o sistema
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-sm text-blue-800 text-center font-medium">
              Complete seu cadastro preenchendo os dados abaixo
            </p>
          </div>

          <form onSubmit={handleSubmit(aoSubmeter)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="cpf">CPF *</Label>
                <Input
                  id="cpf"
                  type="text"
                  placeholder="000.000.000-00"
                  maxLength={14}
                  {...register('cpf')}
                  disabled={carregando}
                />
                {errors.cpf && (
                  <p className="text-sm text-red-600">{errors.cpf.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="rg">RG</Label>
                <Input
                  id="rg"
                  type="text"
                  placeholder="00.000.000-0"
                  {...register('rg')}
                  disabled={carregando}
                />
                {errors.rg && (
                  <p className="text-sm text-red-600">{errors.rg.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="dataNascimento">Data de Nascimento *</Label>
              <Input
                id="dataNascimento"
                type="date"
                max={new Date(new Date().setFullYear(new Date().getFullYear() - 18)).toISOString().split('T')[0]}
                min={new Date(new Date().setFullYear(new Date().getFullYear() - 120)).toISOString().split('T')[0]}
                {...register('dataNascimento')}
                disabled={carregando}
              />
              {errors.dataNascimento && (
                <p className="text-sm text-red-600">{errors.dataNascimento.message}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="telefoneCelular">
                  <Phone className="inline h-4 w-4 mr-1" />
                  Celular *
                </Label>
                <Input
                  id="telefoneCelular"
                  type="tel"
                  placeholder="(11) 99999-9999"
                  {...register('telefoneCelular')}
                  disabled={carregando}
                />
                {errors.telefoneCelular && (
                  <p className="text-sm text-red-600">{errors.telefoneCelular.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="telefoneFixo">
                  <Phone className="inline h-4 w-4 mr-1" />
                  Telefone Fixo
                </Label>
                <Input
                  id="telefoneFixo"
                  type="tel"
                  placeholder="(11) 3333-3333"
                  {...register('telefoneFixo')}
                  disabled={carregando}
                />
                {errors.telefoneFixo && (
                  <p className="text-sm text-red-600">{errors.telefoneFixo.message}</p>
                )}
              </div>
            </div>

            <div className="border rounded-lg p-4 space-y-4 bg-gray-50">
              <h3 className="text-sm font-semibold flex items-center">
                <MapPin className="h-4 w-4 mr-2" />
                Endereço
              </h3>

              <div className="space-y-2">
                <Label htmlFor="cep">CEP *</Label>
                <div className="relative">
                  <Input
                    id="cep"
                    type="text"
                    placeholder="00000-000"
                    {...register('cep')}
                    disabled={carregando || buscandoCEP}
                    onBlur={(e) => buscarCEP(e.target.value)}
                  />
                  {buscandoCEP ? (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      <div className="animate-spin h-4 w-4 border-2 border-blue-600 border-t-transparent rounded-full"></div>
                    </div>
                  ) : (
                    <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  )}
                </div>
                {errors.cep && (
                  <p className="text-sm text-red-600">{errors.cep.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="rua">Rua / Logradouro *</Label>
                <Input
                  id="rua"
                  type="text"
                  placeholder="Nome da rua"
                  {...register('rua')}
                  disabled={carregando || buscandoCEP}
                />
                {errors.rua && (
                  <p className="text-sm text-red-600">{errors.rua.message}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="numero">Número *</Label>
                  <Input
                    id="numero"
                    type="text"
                    placeholder="123"
                    {...register('numero')}
                    disabled={carregando}
                  />
                  {errors.numero && (
                    <p className="text-sm text-red-600">{errors.numero.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="complemento">Complemento</Label>
                  <Input
                    id="complemento"
                    type="text"
                    placeholder="Apto, Sala"
                    {...register('complemento')}
                    disabled={carregando}
                  />
                  {errors.complemento && (
                    <p className="text-sm text-red-600">{errors.complemento.message}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bairro">Bairro *</Label>
                <Input
                  id="bairro"
                  type="text"
                  placeholder="Nome do bairro"
                  {...register('bairro')}
                  disabled={carregando || buscandoCEP}
                />
                {errors.bairro && (
                  <p className="text-sm text-red-600">{errors.bairro.message}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="cidade">Cidade *</Label>
                  <Input
                    id="cidade"
                    type="text"
                    placeholder="Nome da cidade"
                    {...register('cidade')}
                    disabled={carregando || buscandoCEP}
                  />
                  {errors.cidade && (
                    <p className="text-sm text-red-600">{errors.cidade.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="estado">Estado (UF) *</Label>
                  <Input
                    id="estado"
                    type="text"
                    placeholder="SP"
                    maxLength={2}
                    {...register('estado')}
                    disabled={carregando || buscandoCEP}
                    className="uppercase"
                  />
                  {errors.estado && (
                    <p className="text-sm text-red-600">{errors.estado.message}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="pais">País *</Label>
                <Input
                  id="pais"
                  type="text"
                  placeholder="Brasil"
                  {...register('pais')}
                  disabled={carregando || buscandoCEP}
                />
                {errors.pais && (
                  <p className="text-sm text-red-600">{errors.pais.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="senha">Senha *</Label>
              <div className="relative">
                <Input
                  id="senha"
                  type={mostrarSenha ? 'text' : 'password'}
                  placeholder="Digite sua senha"
                  {...register('senha')}
                  disabled={carregando}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                  onClick={() => setMostrarSenha(!mostrarSenha)}
                  disabled={carregando}
                >
                  {mostrarSenha ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
              <p className="text-xs text-gray-600">
                Mínimo 8 caracteres com maiúscula, minúscula, número e caractere especial
              </p>
              {errors.senha && (
                <p className="text-sm text-red-600">{errors.senha.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmarSenha">Confirmar Senha *</Label>
              <div className="relative">
                <Input
                  id="confirmarSenha"
                  type={mostrarConfirmacao ? 'text' : 'password'}
                  placeholder="Confirme sua senha"
                  {...register('confirmarSenha')}
                  disabled={carregando}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                  onClick={() => setMostrarConfirmacao(!mostrarConfirmacao)}
                  disabled={carregando}
                >
                  {mostrarConfirmacao ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
              {errors.confirmarSenha && (
                <p className="text-sm text-red-600">{errors.confirmarSenha.message}</p>
              )}
            </div>

            <div className="flex items-start gap-2">
              <input
                id="termosAceitos"
                type="checkbox"
                {...register('termosAceitos')}
                disabled={carregando}
                className="mt-1 h-4 w-4"
              />
              <Label htmlFor="termosAceitos" className="text-sm cursor-pointer">
                Aceito os{' '}
                <Link href="/termos" className="text-blue-600 hover:underline">
                  termos de uso
                </Link>{' '}
                e{' '}
                <Link href="/privacidade" className="text-blue-600 hover:underline">
                  política de privacidade
                </Link>
              </Label>
            </div>
            {errors.termosAceitos && (
              <p className="text-sm text-red-600">{errors.termosAceitos.message}</p>
            )}

            {erro && <MensagemErro descricao={erro} />}
            {sucesso && <MensagemSucesso descricao={sucesso} />}

            <Button 
              type="submit" 
              className="w-full" 
              disabled={carregando}
            >
              {carregando ? (
                <Carregando tamanho="sm" />
              ) : (
                <>
                  <UserCheck className="mr-2 h-4 w-4" />
                  Aceitar Convite
                </>
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Já tem uma conta?{' '}
              <Link 
                href="/entrar" 
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Fazer login
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function PaginaAceitarConvite() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    }>
      <ConteudoAceitarConvite />
    </Suspense>
  );
}