# 🐳 Docker - Aure Frontend

Configuração Docker para o projeto Aure Frontend (Next.js 15)

## 📋 Pré-requisitos

- Docker instalado (versão 20.10+)
- Docker Compose instalado (versão 2.0+)

## 🚀 Como usar

### Produção

1. **Build e iniciar o container:**
```bash
docker-compose up -d --build
```

2. **Verificar status:**
```bash
docker-compose ps
```

3. **Ver logs:**
```bash
docker-compose logs -f aure-frontend
```

4. **Parar o container:**
```bash
docker-compose down
```

### Desenvolvimento

1. **Descomentar o serviço `aure-frontend-dev` no `docker-compose.yml`**

2. **Comentar o serviço `aure-frontend`**

3. **Iniciar em modo desenvolvimento:**
```bash
docker-compose up -d --build
```

O projeto estará disponível com hot-reload em: http://localhost:3000

## 🔧 Configuração

### Variáveis de Ambiente

Edite o `docker-compose.yml` para ajustar as variáveis:

```yaml
environment:
  - NODE_ENV=production
  - NEXT_PUBLIC_API_URL=https://aureapi.gabrielsanztech.com.br/api
```

### Portas

Por padrão, o frontend roda na porta **3000**. Para alterar:

```yaml
ports:
  - "8080:3000"  # Acesse em localhost:8080
```

## 📦 Estrutura dos Arquivos

```
.
├── Dockerfile           # Build otimizado para produção (multi-stage)
├── Dockerfile.dev       # Build para desenvolvimento com hot-reload
├── docker-compose.yml   # Orquestração dos containers
└── .dockerignore       # Arquivos ignorados no build
```

## 🏗️ Build Manual

Se preferir fazer o build manual:

```bash
# Produção
docker build -t aure-frontend:latest .

# Desenvolvimento
docker build -f Dockerfile.dev -t aure-frontend:dev .

# Executar
docker run -p 3000:3000 aure-frontend:latest
```

## 🔍 Health Check

O container possui health check automático que verifica a cada 30s se a aplicação está respondendo.

Verificar status:
```bash
docker inspect --format='{{.State.Health.Status}}' aure-frontend
```

## 🌐 Rede

O container está conectado à rede `aure-network`, facilitando a comunicação com outros serviços (backend, banco de dados, etc).

## 💾 Volumes (Desenvolvimento)

No modo desenvolvimento, o código é montado como volume:
```yaml
volumes:
  - .:/app
  - /app/node_modules
  - /app/.next
```

Isso permite que as alterações no código sejam refletidas imediatamente.

## 🐛 Troubleshooting

### Container não inicia

```bash
# Ver logs detalhados
docker-compose logs aure-frontend

# Verificar se a porta 3000 está livre
netstat -an | findstr :3000
```

### Rebuild completo

```bash
# Limpar tudo e rebuildar
docker-compose down -v
docker-compose build --no-cache
docker-compose up -d
```

### Acessar o container

```bash
docker exec -it aure-frontend sh
```

## 📊 Otimizações

O Dockerfile usa:
- ✅ **Multi-stage build** (reduz tamanho final em ~70%)
- ✅ **Alpine Linux** (imagem base leve)
- ✅ **Output standalone** do Next.js
- ✅ **User não-root** para segurança
- ✅ **Health check** integrado
- ✅ **Cache de dependências** otimizado

## 🔐 Segurança

- Container roda com usuário `nextjs` (UID 1001)
- Não expõe informações sensíveis
- Usa imagem oficial do Node.js
- Minimiza superfície de ataque com Alpine

## 📈 Performance

Tamanho aproximado das imagens:
- **Produção**: ~150MB (com Next.js standalone)
- **Desenvolvimento**: ~350MB (com node_modules completo)

## 🚢 Deploy

Para deploy em produção, considere usar:
- Docker Swarm
- Kubernetes
- Azure Container Apps
- AWS ECS/Fargate
- Google Cloud Run

Exemplo para Azure Container Apps:
```bash
az containerapp up --name aure-frontend --source .
```

## 📝 Notas

- O output standalone do Next.js está habilitado no `next.config.ts`
- A aplicação reinicia automaticamente em caso de falha
- Logs são enviados para stdout/stderr (boas práticas Docker)
