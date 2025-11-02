# 🚀 Teste Rápido - Registro de Empresa

## ✅ Dados para Teste Imediato

Use estes dados para um teste rápido sem conflitos:

### Dados da Empresa
```
Nome da Empresa: EMPRESA TESTE LTDA
CNPJ: 12345678000195 (CNPJ de teste - não existe na Receita)
```

⚠️ **IMPORTANTE:** Como este CNPJ não existe na Receita Federal, o backend provavelmente vai rejeitar.

---

## 🎯 Teste Alternativo - Sem Validação Receita

Se o backend permitir, use dados fictícios:

### Opção 1: Empresa Fictícia
```json
{
  "companyName": "MINHA EMPRESA TESTE LTDA",
  "companyCnpj": "00000000000191",
  "companyType": "Client",
  "businessModel": "MainCompany",
  "name": "Seu Nome Completo",
  "cpf": "CPF_UNICO_AQUI",
  "email": "email_unico_teste@example.com",
  "password": "SenhaForte@2024",
  "telefoneCelular": "67998887777",
  "cep": "79041490",
  "rua": "Rua Teste",
  "numero": "100",
  "bairro": "Centro",
  "cidade": "Campo Grande",
  "estado": "MS",
  "pais": "Brasil",
  "versaoTermosUsoAceita": "1.0",
  "versaoPoliticaPrivacidadeAceita": "1.0"
}
```

---

## 🔧 Solução para seu Caso (Erro 500)

### Problema Identificado:
O erro 500 geralmente acontece quando:

1. ✅ Email `gsystemster@gmail.com` já existe no banco
2. ✅ CPF `018.636.251-00` já existe no banco
3. ✅ CNPJ `00000000000191` já está cadastrado
4. ✅ Backend teve erro ao validar na Receita Federal

### Solução:
**Use um email e CPF completamente novos:**

```json
{
  "companyName": "BANCO DO BRASIL SA",
  "companyCnpj": "00000000000191",
  "companyType": "Client",
  "businessModel": "MainCompany",
  "name": "Gabriel Sales",
  "cpf": "52998224725",  // ✅ CPF válido diferente
  "email": "gabriel.teste2024@tempmail.com",  // ✅ Email novo
  "password": "Ga123456",
  "telefoneCelular": "67998231019",
  "cep": "79041490",
  "rua": "Rua Dona Ziza",
  "numero": "354",
  "bairro": "Tiradentes",
  "cidade": "Campo Grande",
  "estado": "MS",
  "pais": "Brasil",
  "versaoTermosUsoAceita": "1.0",
  "versaoPoliticaPrivacidadeAceita": "1.0"
}
```

---

## 🐛 Como Verificar o Erro Real

### No Console do Navegador (F12):
1. Abra as **DevTools** (F12)
2. Vá na aba **Network**
3. Tente fazer o registro
4. Clique na requisição `admin-empresa`
5. Veja a aba **Response** para o erro detalhado

### Ou veja os Logs do Backend:
O backend deve estar logando o erro completo no console do servidor.

---

## ✅ CPFs Válidos para Teste (use um diferente a cada teste)

- `52998224725` - CPF válido 1
- `34608514300` - CPF válido 2
- `18379192703` - CPF válido 3
- `89024217803` - CPF válido 4
- `42856268880` - CPF válido 5

---

## 📧 Emails para Teste (use um diferente a cada teste)

- `teste1@tempmail.com`
- `teste2@tempmail.com`
- `usuario.teste@example.com`
- `demo.sistema@test.io`
- `novousuario2024@example.org`

---

## 🎯 Checklist Antes de Testar

- [ ] Email é único (nunca usado antes)?
- [ ] CPF é único (nunca usado antes)?
- [ ] CNPJ é válido e corresponde ao nome oficial?
- [ ] Senha tem 8+ caracteres, maiúscula, minúscula, número?
- [ ] Backend está rodando?
- [ ] API da Receita Federal está acessível?

---

## 💡 Dica de Debugging

Se continuar dando erro 500, adicione um `console.log` no catch do registro para ver o erro completo:

```typescript
} catch (error: any) {
  console.log('Erro completo:', error);
  console.log('Resposta da API:', error.response?.data);
  const mensagemErro = tratarErroApi(error);
  setErro(mensagemErro);
}
```
