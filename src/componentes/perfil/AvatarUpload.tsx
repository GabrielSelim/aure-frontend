'use client';

import { useState, useRef } from 'react';
import { Upload, X, User } from 'lucide-react';
import { uploadAvatar, removerAvatar } from '../../servicos/perfil-usuario';
import { obterIniciais } from '../../utils/formatacao';

interface AvatarUploadProps {
  avatarAtual?: string;
  nomeUsuario: string;
  aoSucesso?: (avatarUrl: string) => void;
}

export function AvatarUpload({ avatarAtual, nomeUsuario, aoSucesso }: AvatarUploadProps) {
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | undefined>(avatarAtual);
  const [arrastando, setArrastando] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const validarArquivo = (arquivo: File): string | null => {
    if (!arquivo.type.startsWith('image/')) {
      return 'Apenas imagens são permitidas';
    }

    if (arquivo.size > 5 * 1024 * 1024) {
      return 'Imagem deve ter no máximo 5MB';
    }

    return null;
  };

  const processarArquivo = async (arquivo: File) => {
    const erroValidacao = validarArquivo(arquivo);
    if (erroValidacao) {
      setErro(erroValidacao);
      return;
    }

    try {
      setCarregando(true);
      setErro(null);

      const leitor = new FileReader();
      leitor.onloadend = () => {
        setPreview(leitor.result as string);
      };
      leitor.readAsDataURL(arquivo);

      const resultado = await uploadAvatar(arquivo);
      
      if (aoSucesso) {
        aoSucesso(resultado.avatarUrl);
      }
    } catch (error: any) {
      setErro(error.message || 'Erro ao fazer upload do avatar');
      setPreview(avatarAtual);
    } finally {
      setCarregando(false);
    }
  };

  const aoSelecionarArquivo = (evento: React.ChangeEvent<HTMLInputElement>) => {
    const arquivo = evento.target.files?.[0];
    if (arquivo) {
      processarArquivo(arquivo);
    }
  };

  const aoSoltar = (evento: React.DragEvent<HTMLDivElement>) => {
    evento.preventDefault();
    setArrastando(false);

    const arquivo = evento.dataTransfer.files[0];
    if (arquivo) {
      processarArquivo(arquivo);
    }
  };

  const aoArrastarSobre = (evento: React.DragEvent<HTMLDivElement>) => {
    evento.preventDefault();
    setArrastando(true);
  };

  const aoRemover = async () => {
    try {
      setCarregando(true);
      setErro(null);
      await removerAvatar();
      setPreview(undefined);
      
      if (aoSucesso) {
        aoSucesso('');
      }
    } catch (error: any) {
      setErro(error.message || 'Erro ao remover avatar');
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
      <div
        onDrop={aoSoltar}
        onDragOver={aoArrastarSobre}
        onDragLeave={() => setArrastando(false)}
        style={{
          position: 'relative',
          width: '8rem',
          height: '8rem',
          borderRadius: '50%',
          overflow: 'hidden',
          border: arrastando ? '2px dashed #2563eb' : '2px solid #e5e7eb',
          backgroundColor: preview ? 'transparent' : '#f3f4f6',
          cursor: 'pointer',
          transition: 'all 0.2s'
        }}
        onClick={() => inputRef.current?.click()}
      >
        {preview ? (
          <img
            src={preview}
            alt={nomeUsuario}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
          />
        ) : (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
            fontSize: '2rem',
            fontWeight: 'bold',
            color: '#6b7280',
            backgroundColor: '#e5e7eb'
          }}>
            {obterIniciais(nomeUsuario)}
          </div>
        )}

        {carregando && (
          <div style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)'
          }}>
            <div style={{
              width: '2rem',
              height: '2rem',
              border: '3px solid #ffffff',
              borderTop: '3px solid transparent',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite'
            }} />
          </div>
        )}

        {!carregando && (
          <div style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            opacity: 0,
            transition: 'opacity 0.2s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
          onMouseLeave={(e) => e.currentTarget.style.opacity = '0'}>
            <Upload style={{ width: '1.5rem', height: '1.5rem', color: '#ffffff' }} />
          </div>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={aoSelecionarArquivo}
        style={{ display: 'none' }}
      />

      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <button
          onClick={() => inputRef.current?.click()}
          disabled={carregando}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#2563eb',
            color: '#ffffff',
            border: 'none',
            borderRadius: '0.375rem',
            fontSize: '0.875rem',
            cursor: carregando ? 'not-allowed' : 'pointer',
            opacity: carregando ? 0.5 : 1
          }}
        >
          <Upload style={{ width: '1rem', height: '1rem', display: 'inline', marginRight: '0.5rem' }} />
          Alterar Foto
        </button>

        {preview && (
          <button
            onClick={aoRemover}
            disabled={carregando}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: '#ef4444',
              color: '#ffffff',
              border: 'none',
              borderRadius: '0.375rem',
              fontSize: '0.875rem',
              cursor: carregando ? 'not-allowed' : 'pointer',
              opacity: carregando ? 0.5 : 1
            }}
          >
            <X style={{ width: '1rem', height: '1rem', display: 'inline', marginRight: '0.5rem' }} />
            Remover
          </button>
        )}
      </div>

      {erro && (
        <div style={{
          padding: '0.5rem',
          backgroundColor: '#fef2f2',
          border: '1px solid #fecaca',
          borderRadius: '0.375rem',
          color: '#dc2626',
          fontSize: '0.875rem',
          textAlign: 'center'
        }}>
          {erro}
        </div>
      )}

      <p style={{ fontSize: '0.75rem', color: '#6b7280', textAlign: 'center' }}>
        Arraste uma imagem ou clique para selecionar<br />
        JPG, PNG ou GIF até 5MB
      </p>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
