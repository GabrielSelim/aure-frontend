# Contexto do Projeto - Sistema Aure Frontend

## 📋 Resumo do Projeto

Sistema de gestão empresarial completo desenvolvido em **Next.js 15** com **TypeScript** e **React**, integrado com API backend em **ASP.NET Core**.

## 🎯 Estado Atual (31/10/2025)

### ✅ Funcionalidades Implementadas

#### 1. Autenticação e Segurança
- Sistema de login com JWT Bearer tokens
- Refresh token automático
- Contexto de autenticação global (`useAuth`)
- Rotas protegidas por role
- Logout com limpeza de tokens
- **CORS resolvido**: Proxy Next.js (`/api/*` → `https://aureapi.gabrielsanztech.com.br/api/*`)

#### 2. Dashboard Personalizado por Role
- **DonoEmpresaPai (Role 1)**: Visão completa (financeiro, contratos, funcionários, relacionamentos)
- **Financeiro (Role 2)**: Gestão operacional (sem permissão para processar pagamentos)
- **Jurídico (Role 3)**: Foco em contratos e documentação
- **FuncionarioPJ (Role 5)**: Visão de próprios contratos e pagamentos
- **FuncionarioCLT (Role 4)**: Visão básica

Widgets implementados:
- `WidgetResumoFinanceiro` - Compromissos e receitas mensais
- `WidgetEstatisticasContratos` - Status de contratos (Ativos, Rascunho, Concluídos)
- `WidgetEstatisticasFuncionarios` - Total CLT, PJ e ativos

#### 3. Gestão de Funcionários
Página completa em `/funcionarios` com:
- Tabela paginada e responsiva
- Filtros: Role, Cargo, Status, Busca por nome/email
- Exportação de dados (CSV/Excel)
- Componentes criados:
  - `TabelaFuncionarios`
  - `FiltrosFuncionarios`
  - `BotaoExportar`
  - `Paginacao`

#### 4. Perfil de Usuário (Configurações)
Página em `/configuracoes` com 4 abas:

**Aba Perfil** - Totalmente integrada:
- Upload de avatar com crop e preview
- Dados pessoais: Nome, Email, CPF, RG, Data Nascimento, Cargo
- Contatos: Telefone Celular e Fixo
- Endereço completo: CEP, Rua, Número, Complemento, Bairro, Cidade, Estado
- **Endpoint**: GET `/api/UserProfile/perfil`
- **Atualização**: PUT `/api/UserProfile/perfil-completo`

**Aba Empresa**: Dados da empresa (a implementar completamente)

**Aba Segurança**: Alteração de senha

**Aba Sistema**: Preferências de notificação

#### 5. Componentes Reutilizáveis Criados

**Inputs Especializados**:
- `InputCPF` - Máscara e validação de CPF
- `InputCNPJ` - Máscara e validação de CNPJ
- `InputTelefone` - Máscara para telefone brasileiro
- `InputCEP` - Máscara de CEP (00000-000)
- `AvatarUpload` - Upload com preview e crop

**Layout**:
- `MenuLateral` - Navegação principal com itens por role
- `Cabecalho` - Header com informações do usuário
- Layout autenticado completo

**Utilitários**:
- `Paginacao` - Componente de paginação reutilizável
- `BotaoExportar` - Exportação de dados

## 🔧 Estrutura Técnica

### Configuração da API

```typescript
// Produção
API: https://aureapi.gabrielsanztech.com.br/api
Timeout: 30s

// Proxy Next.js (next.config.ts)
rewrites: /api/:path* → https://aureapi.gabrielsanztech.com.br/api/:path*
```

### Autenticação
```typescript
localStorage:
- accessToken: JWT Bearer token
- refreshToken: Token para renovação
- user: Dados do usuário (id, nome, email, role, empresa)
```

### Hierarquia de Roles (UserRole enum)
```
1 - DonoEmpresaPai (Todos os privilégios)
2 - Financeiro (Gestão operacional, sem pagamentos)
3 - Juridico (Contratos e documentação)
4 - FuncionarioCLT (Funcionário CLT)
5 - FuncionarioPJ (Funcionário PJ/Contratado)
```

## 📁 Estrutura de Pastas

```
aure-frontend/
├── src/
│   ├── app/
│   │   ├── (autenticado)/          # Layout com autenticação
│   │   │   ├── painel/             # Dashboard
│   │   │   ├── funcionarios/       # Gestão de funcionários
│   │   │   ├── configuracoes/      # Perfil e configurações
│   │   │   └── layout.tsx
│   │   ├── entrar/                 # Login
│   │   └── layout.tsx
│   ├── componentes/                # Componentes reutilizáveis
│   │   ├── AvatarUpload/
│   │   ├── Cabecalho/
│   │   ├── MenuLateral/
│   │   ├── Paginacao/
│   │   └── inputs/                 # InputCPF, InputCNPJ, etc
│   ├── contextos/
│   │   └── AutenticacaoContexto.tsx
│   ├── servicos/                   # Integração com API
│   │   ├── api.ts                  # Cliente Axios configurado
│   │   ├── autenticacao.ts
│   │   ├── usuarios.ts
│   │   ├── perfil-usuario.ts
│   │   └── contratos.ts
│   ├── tipos/
│   │   └── api.ts                  # TypeScript interfaces
│   └── utils/                      # Helpers e utilitários
├── next.config.ts                  # Configuração do proxy
└── package.json
```

## 🔑 Endpoints Principais da API

### Autenticação
- `POST /api/Auth/entrar` - Login
- `POST /api/Auth/renovar-token` - Refresh token
- `POST /api/Auth/sair` - Logout

### Perfil de Usuário
- `GET /api/UserProfile/perfil` - Obter perfil completo
- `PUT /api/UserProfile/perfil-completo` - Atualizar perfil
- `POST /api/UserProfile/avatar` - Upload de avatar
- `DELETE /api/UserProfile/avatar` - Remover avatar

### Usuários
- `GET /api/Users/funcionarios` - Listar funcionários (paginado)
- `PUT /api/Users/perfil` - Atualizar perfil básico
- `PATCH /api/Users/senha` - Alterar senha

### Contratos
- `GET /api/Contracts` - Listar contratos
- `POST /api/Contracts` - Criar contrato
- `POST /api/Contracts/{id}/assinar` - Assinar contrato

### Pagamentos
- `GET /api/Payments` - Listar pagamentos
- `POST /api/Payments/processar` - Processar pagamento (Role 1 apenas)

## 🎨 Padrões de Código

### Instruções Obrigatórias
1. ❌ Não criar arquivos mock ou dados fictícios
2. ❌ Não usar console.log
3. ❌ Não escrever comentários no código
4. ❌ Não criar arquivos de instruções
5. ✅ Manter código limpo e organizado
6. ✅ Usar nomes em português
7. ✅ Componentes em pastas separadas
8. ✅ Máxima reutilização de componentes
9. ✅ Evitar repetição de código

### Executar o Projeto
```powershell
cd .\aure-frontend\
npm run dev
# Servidor: http://localhost:3000
```

## 🚀 Últimas Alterações (31/10/2025)

### Correção de Endpoints
- ✅ Corrigido `obterPerfilCompleto()`: GET `/UserProfile/perfil`
- ✅ Corrigido `atualizarPerfilCompleto()`: PUT `/UserProfile/perfil-completo`
- ✅ Página de configurações agora carrega todos os dados do perfil

### Interface UserProfileResponse
Atualizada com 20+ campos em português:
```typescript
{
  id, nome, email, role, roleDescricao, avatarUrl,
  dataNascimento, cpfMascarado, cpf, rg, cargo,
  telefoneCelular, telefoneFixo,
  enderecoRua, enderecoNumero, enderecoComplemento,
  enderecoBairro, enderecoCidade, enderecoEstado,
  enderecoPais, enderecoCep, enderecoCompleto,
  aceitouTermosUso, dataAceiteTermosUso, versaoTermosUsoAceita,
  aceitouPoliticaPrivacidade, dataAceitePoliticaPrivacidade,
  versaoPoliticaPrivacidadeAceita
}
```

## 📝 Próximos Passos Sugeridos

### Alta Prioridade
1. **Aba Empresa** - Integrar completamente com endpoint `/api/Companies/empresa-pai`
2. **Gestão de Contratos** - Página completa de contratos com filtros
3. **Gestão de Pagamentos** - Interface para processar e visualizar pagamentos
4. **Convites** - Sistema completo de convites (listar, criar, cancelar, reenviar)

### Média Prioridade
5. **Dashboard Detalhado** - Gráficos e relatórios financeiros
6. **Notificações** - Sistema de notificações em tempo real
7. **Relacionamentos** - Visualização de empresas cliente/fornecedor
8. **Notas Fiscais** - Gestão de NF-e

### Melhorias
9. **Validações** - Adicionar mais validações client-side
10. **Feedback Visual** - Melhorar mensagens de erro/sucesso
11. **Loading States** - Skeleton loaders para melhor UX
12. **Responsividade** - Testar e ajustar em mobile

## 🔐 Credenciais de Teste
```
Email: eng.gabrielsanz@hotmail.com
Senha: 123456
```

## 📚 Documentação Adicional

### Arquivos Importantes
- `.github/instructions/FrontendIntegration.instructions.md` - Integração completa com API
- `.github/instructions/TesteInstructions.instructions.md` - Padrões de código
- `json_api.md` - Documentação OpenAPI completa da API

### Enums Principais
```typescript
UserRole: 1=DonoEmpresaPai, 2=Financeiro, 3=Juridico, 4=FuncionarioCLT, 5=FuncionarioPJ
CompanyType: 1=Client, 2=Provider, 3=Both
BusinessModel: 1=Standard, 2=MainCompany, 3=ContractedPJ, 4=Freelancer
ContractStatus: 1=Draft, 2=Active, 3=Completed, 4=Cancelled
PaymentStatus: 1=Pending, 2=Completed, 3=Failed, 4=Cancelled
PaymentMethod: 1=PIX, 2=TED, 3=CreditCard, 4=Boleto
InvoiceStatus: 1=Draft, 2=Issued, 3=Sent, 4=Cancelled, 5=Error
```

## 🐛 Problemas Conhecidos Resolvidos

1. ✅ **CORS**: Resolvido com proxy Next.js
2. ✅ **Login não funcionava**: Token extraído com flexibilidade
3. ✅ **Perfil incompleto**: Agora carrega todos os 20+ campos
4. ✅ **Endpoint errado**: Corrigido GET `/perfil` e PUT `/perfil-completo`

## 💡 Boas Práticas Implementadas

- ✅ Componentização máxima
- ✅ TypeScript strict mode
- ✅ Contextos para estado global
- ✅ Serviços separados por domínio
- ✅ Tratamento de erros padronizado
- ✅ Validações de formulário
- ✅ Máscaras em inputs
- ✅ Feedback visual (loading, erros, sucesso)
- ✅ Paginação server-side
- ✅ Filtros e busca
- ✅ Exportação de dados

---

**Última atualização**: 31/10/2025
**Versão**: 1.0.0
**Status**: Em desenvolvimento ativo
