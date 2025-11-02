---
applyTo: '**'
---

# Instruções de Integração Frontend - Sistema Aure

## URL Base da API
- Desenvolvimento: `http://localhost:5203/api`

## Autenticação
- Todas as requisições protegidas devem incluir: `Authorization: Bearer {accessToken}`
- Salvar tokens no localStorage: `accessToken`, `refreshToken`, `user`
- Implementar renovação automática de token quando expirar

## Estrutura de Hierarquia
```
Empresa Pai (Principal)
├── Dono da Empresa Pai (Role: 1) - Acesso Total
├── Financeiro (Role: 2) - Gestão Operacional
├── Jurídico (Role: 3) - Contratos e Documentação
└── Funcionários
    ├── CLT (Role: 4)
    └── PJ (Role: 5)
```

## Enums Principais

### UserRole
- 1: DonoEmpresaPai (Todos os privilégios)
- 2: Financeiro (Gestão operacional, sem pagamentos)
- 3: Juridico (Contratos e docs)
- 4: FuncionarioCLT
- 5: FuncionarioPJ

### CompanyType
- 1: Client
- 2: Provider
- 3: Both

### BusinessModel
- 1: Standard
- 2: MainCompany
- 3: ContractedPJ
- 4: Freelancer

### InviteType
- 0: Internal
- 1: ContractedPJ
- 2: ExternalUser

### ContractStatus
- 1: Draft
- 2: Active
- 3: Completed
- 4: Cancelled

### PaymentStatus
- 1: Pending
- 2: Completed
- 3: Failed
- 4: Cancelled

### PaymentMethod
- 1: PIX
- 2: TED
- 3: CreditCard
- 4: Boleto

### SignatureMethod
- 1: Digital
- 2: Electronic
- 3: Manual

### InvoiceStatus
- 1: Draft
- 2: Issued
- 3: Sent
- 4: Cancelled
- 5: Error

## Endpoints Principais

### Autenticação
- `POST /api/Auth/entrar` - Login (sem auth)
- `POST /api/Auth/renovar-token` - Refresh token (sem auth)
- `POST /api/Auth/sair` - Logout (com auth)

### Registro
- `POST /api/Registration/admin-empresa` - Registrar primeira empresa (sem auth)
- `POST /api/Registration/convidar-usuario` - Convidar usuário (Roles: 1, 2, 3)
- `POST /api/Registration/aceitar-convite/{token}` - Aceitar convite (sem auth)
- `GET /api/Registration/convites` - Listar convites pendentes (Roles: 1, 2, 3)
- `DELETE /api/Registration/cancelar-convite/{inviteId}` - Cancelar convite (Roles: 1, 2, 3)
- `POST /api/Registration/reenviar-convite/{inviteId}` - Reenviar convite (Roles: 1, 2, 3)

### Usuários
- `GET /api/Users` - Listar usuários paginados (Roles: 1, 2, 3)
- `GET /api/Users/{id}` - Buscar usuário por ID
- `PUT /api/Users/perfil` - Atualizar perfil (todos autenticados)
- `DELETE /api/Users/{id}` - Deletar usuário (Role: 1)

### Contratos
- `GET /api/Contracts` - Listar contratos paginados (Roles: 1, 2, 3, 5)
- `GET /api/Contracts/{id}` - Buscar contrato por ID
- `POST /api/Contracts` - Criar contrato (Roles: 1, 2, 3)
- `POST /api/Contracts/{id}/assinar` - Assinar contrato (Role: 5, apenas próprios)

### Pagamentos
- `GET /api/Payments` - Listar pagamentos (Roles: 1, 2 veem todos; Role: 5 vê próprios)
- `POST /api/Payments/processar` - Processar pagamento (Role: 1 apenas)

### Notas Fiscais
- `GET /api/Invoices` - Listar notas fiscais (Roles: 1, 2, 3)
- `POST /api/Invoices/emitir` - Emitir nota fiscal (Roles: 1, 2)

### Relacionamentos
- `GET /api/CompanyRelationships` - Listar relacionamentos entre empresas (Roles: 1, 2, 3)

## Validações Obrigatórias

### Email
- Formato válido
- Único no sistema

### Senha
- Mínimo: 8 caracteres
- Deve conter: letra maiúscula, minúscula, número, caractere especial

### CNPJ
- Exatamente 14 dígitos numéricos
- Validação de dígitos verificadores
- Único no sistema

### CPF
- Exatamente 11 dígitos numéricos
- Validação de dígitos verificadores

### Valores Monetários
- Sempre > 0
- Máximo 2 casas decimais

### Datas
- Formato ISO 8601: `YYYY-MM-DDTHH:mm:ss.sssZ`
- Data de início < Data de fim

### Telefone
- Formato: `(XX) XXXXX-XXXX` ou `(XX) XXXX-XXXX`
- Apenas números ao enviar

### CEP
- Formato: `XXXXX-XXX`
- 8 dígitos numéricos

## Tratamento de Erros

### Códigos HTTP
- 200: OK (GET, PUT)
- 201: Created (POST)
- 204: No Content (DELETE)
- 400: Bad Request (validação falhou)
- 401: Unauthorized (não autenticado)
- 403: Forbidden (sem permissão)
- 404: Not Found
- 409: Conflict (dados duplicados)
- 500: Internal Server Error

### Estrutura de Erro
```typescript
interface ApiError {
  status: number;
  title: string;
  detail: string;
  errors?: Record<string, string[]>;
}
```

## Notificações Automáticas

O sistema envia emails automáticos para:
1. Pagamento processado → Funcionário PJ
2. Novo contrato criado → Funcionário PJ
3. Contrato assinado → Gestores
4. Convite enviado → Convidado
5. Novo funcionário cadastrado → Gestores
6. Alerta de vencimento de contrato (30, 15, 7 dias)

## Fluxos Importantes

### Convidar Funcionário PJ
1. Gestor convida com role=5, inviteType=1
2. Informar: email, name, companyName, cnpj, businessModel=3, companyType=2
3. Sistema cria convite e envia email
4. PJ aceita convite com senha
5. Sistema cria empresa PJ + usuário + relacionamento

### Criar e Assinar Contrato
1. Gestor cria contrato (status=Draft)
2. Sistema envia email para PJ
3. PJ assina contrato
4. Status muda para Active
5. Gestores recebem notificação

### Processar Pagamento
1. DonoEmpresaPai processa pagamento
2. Sistema cria pagamento (status=Completed)
3. Sistema envia email AUTOMATICAMENTE para PJ
4. PJ vê notificação

## Permissões por Role

### DonoEmpresaPai (1)
- ✅ Todos os privilégios
- ✅ Processar pagamentos
- ✅ Deletar usuários
- ✅ Gerenciar contratos
- ✅ Convidar usuários

### Financeiro (2)
- ✅ Gestão operacional
- ✅ Gerenciar contratos
- ✅ Convidar usuários
- ✅ Ver pagamentos (sem autorizar)
- ❌ Processar pagamentos
- ❌ Deletar usuários

### Juridico (3)
- ✅ Gerenciar contratos
- ✅ Convidar usuários
- ✅ Ver documentos
- ❌ Ver dados financeiros sensíveis
- ❌ Processar pagamentos

### FuncionarioPJ (5)
- ✅ Ver próprios contratos
- ✅ Assinar próprios contratos
- ✅ Ver próprios pagamentos
- ❌ Ver dados de outros funcionários

## Paginação

Query Parameters padrão:
- `pageNumber` (default: 1)
- `pageSize` (default: 10)

Response:
```typescript
interface PaginatedResponse<T> {
  items: T[];
  pageNumber: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}
```

## Formatação

### Moeda
```typescript
new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL'
}).format(value)
```

### Data
```typescript
new Date(dateStr).toLocaleDateString('pt-BR')
```

## Cores de Status

### Contratos
- Draft: cinza (#718096)
- Active: verde (#48BB78)
- Completed: azul (#4299E1)
- Cancelled: vermelho (#F56565)

### Pagamentos
- Pending: laranja (#ED8936)
- Completed: verde (#48BB78)
- Failed: vermelho (#F56565)
- Cancelled: cinza (#718096)

## Implementação Obrigatória

1. Criar serviço de API com headers de autenticação
2. Implementar contexto de autenticação (useAuth)
3. Criar componente de rota protegida
4. Implementar interceptor para refresh token
5. Criar tipos TypeScript para todos os DTOs
6. Criar enums TypeScript com labels e cores
7. Implementar tratamento de erros padronizado
8. Criar helpers de permissão por role
