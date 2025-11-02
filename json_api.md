{
  "openapi": "3.0.1",
  "info": {
    "title": "Aure API",
    "description": "Api para o sistema Aure!",
    "version": "v1"
  },
  "paths": {
    "/api/Audit/logs": {
      "get": {
        "tags": [
          "Audit"
        ],
        "parameters": [
          {
            "name": "startDate",
            "in": "query",
            "schema": {
              "type": "string",
              "format": "date-time"
            }
          },
          {
            "name": "endDate",
            "in": "query",
            "schema": {
              "type": "string",
              "format": "date-time"
            }
          },
          {
            "name": "entityName",
            "in": "query",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "action",
            "in": "query",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "userId",
            "in": "query",
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/api/Audit/kyc": {
      "get": {
        "tags": [
          "Audit"
        ],
        "parameters": [
          {
            "name": "status",
            "in": "query",
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/api/Audit/relatorio-compliance": {
      "get": {
        "tags": [
          "Audit"
        ],
        "parameters": [
          {
            "name": "startDate",
            "in": "query",
            "schema": {
              "type": "string",
              "format": "date-time"
            }
          },
          {
            "name": "endDate",
            "in": "query",
            "schema": {
              "type": "string",
              "format": "date-time"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/api/Audit/notificacoes": {
      "get": {
        "tags": [
          "Audit"
        ],
        "parameters": [
          {
            "name": "type",
            "in": "query",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "status",
            "in": "query",
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/api/Auth/entrar": {
      "post": {
        "tags": [
          "Auth"
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/LoginRequest"
              }
            },
            "text/json": {
              "schema": {
                "$ref": "#/components/schemas/LoginRequest"
              }
            },
            "application/*+json": {
              "schema": {
                "$ref": "#/components/schemas/LoginRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/api/Auth/sair": {
      "post": {
        "tags": [
          "Auth"
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/LogoutRequest"
              }
            },
            "text/json": {
              "schema": {
                "$ref": "#/components/schemas/LogoutRequest"
              }
            },
            "application/*+json": {
              "schema": {
                "$ref": "#/components/schemas/LogoutRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/api/Auth/perfil": {
      "get": {
        "tags": [
          "Auth"
        ],
        "responses": {
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/api/Auth/renovar-token": {
      "post": {
        "tags": [
          "Auth"
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/RefreshTokenRequest"
              }
            },
            "text/json": {
              "schema": {
                "$ref": "#/components/schemas/RefreshTokenRequest"
              }
            },
            "application/*+json": {
              "schema": {
                "$ref": "#/components/schemas/RefreshTokenRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/api/Auth/solicitar-recuperacao-senha": {
      "post": {
        "tags": [
          "Auth"
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/RequestPasswordResetRequest"
              }
            },
            "text/json": {
              "schema": {
                "$ref": "#/components/schemas/RequestPasswordResetRequest"
              }
            },
            "application/*+json": {
              "schema": {
                "$ref": "#/components/schemas/RequestPasswordResetRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "OK"
          },
          "400": {
            "description": "Bad Request",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/ProblemDetails"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ProblemDetails"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/ProblemDetails"
                }
              }
            }
          }
        }
      }
    },
    "/api/Auth/redefinir-senha": {
      "post": {
        "tags": [
          "Auth"
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/ResetPasswordRequest"
              }
            },
            "text/json": {
              "schema": {
                "$ref": "#/components/schemas/ResetPasswordRequest"
              }
            },
            "application/*+json": {
              "schema": {
                "$ref": "#/components/schemas/ResetPasswordRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "OK",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/PasswordResetResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/PasswordResetResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/PasswordResetResponse"
                }
              }
            }
          },
          "400": {
            "description": "Bad Request",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/ProblemDetails"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ProblemDetails"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/ProblemDetails"
                }
              }
            }
          }
        }
      }
    },
    "/api/Companies/empresa-pai": {
      "get": {
        "tags": [
          "Companies"
        ],
        "summary": "Visualizar dados da empresa pai",
        "description": "Retorna informações completas da empresa pai vinculada ao usuário autenticado.\n\n**Visível para:**\n- DonoEmpresaPai\n- Financeiro\n- Jurídico\n- Funcionários CLT e PJ (dados limitados)\n\n**Informações Retornadas:**\n- Razão Social e CNPJ\n- Tipo da empresa e modelo de negócio\n- Endereço completo (sincronizado com endereço do DonoEmpresaPai)\n- Estatísticas: Total de funcionários, contratos ativos\n- Data de cadastro\n\n**Sincronização de Endereço:**\n- Para DonoEmpresaPai: Endereço pessoal = Endereço da empresa (sincronização automática)\n- Ao atualizar endereço do perfil do Dono, atualiza empresa também\n- Ao atualizar endereço da empresa, atualiza perfil do Dono também",
        "responses": {
          "200": {
            "description": "Dados da empresa pai",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/CompanyInfoResponse"
                }
              }
            }
          },
          "401": {
            "description": "Não autenticado"
          },
          "404": {
            "description": "Empresa não encontrada ou usuário sem empresa vinculada"
          }
        }
      },
      "put": {
        "tags": [
          "Companies"
        ],
        "summary": "Atualizar empresa pai (SOMENTE DonoEmpresaPai)",
        "description": "Permite que o DonoEmpresaPai atualize dados da empresa pai.\n\n**Restrições:**\n- Apenas DonoEmpresaPai pode executar\n- Validação via JWT (usuário só edita própria empresa)\n\n**Sincronização Bidirecional de Endereço:**\n- ✅ Ao atualizar endereço da empresa aqui, atualiza também o endereço pessoal do DonoEmpresaPai\n- ✅ Ao atualizar endereço no perfil pessoal, também atualiza endereço da empresa\n- ⚠️ Isso garante que empresa e dono sempre tenham mesmo endereço\n\n**Campos Editáveis:**\n- Razão Social\n- CNPJ (com validação na Receita Federal e fluxo de divergência)\n- Endereço completo (Rua, Número, Complemento, Bairro, Cidade, Estado, País, CEP)\n\n**Validação de CNPJ:**\n- Se o CNPJ for alterado, será validado na Receita Federal\n- Se a Razão Social divergir (similaridade < 85%), será solicitada confirmação\n- Use `ConfirmarDivergenciaRazaoSocial = true` para confirmar alteração mesmo com divergência\n\n**Campos NÃO Editáveis:**\n- CompanyType (imutável - definido na criação)\n- BusinessModel (imutável - definido na criação)\n- Estatísticas (calculadas automaticamente)",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/UpdateCompanyParentRequest"
              }
            },
            "text/json": {
              "schema": {
                "$ref": "#/components/schemas/UpdateCompanyParentRequest"
              }
            },
            "application/*+json": {
              "schema": {
                "$ref": "#/components/schemas/UpdateCompanyParentRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Empresa pai atualizada com sucesso",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/UpdateCompanyParentResponse"
                }
              }
            }
          },
          "400": {
            "description": "Dados inválidos ou divergência de Razão Social",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/UpdateCompanyParentResponse"
                }
              }
            }
          },
          "401": {
            "description": "Não autenticado"
          },
          "403": {
            "description": "Apenas DonoEmpresaPai pode atualizar empresa pai"
          },
          "404": {
            "description": "Empresa não encontrada"
          }
        }
      }
    },
    "/api/CompanyRelationships": {
      "get": {
        "tags": [
          "CompanyRelationships"
        ],
        "parameters": [
          {
            "name": "status",
            "in": "query",
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/api/CompanyRelationships/compromissos-mensais": {
      "get": {
        "tags": [
          "CompanyRelationships"
        ],
        "responses": {
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/api/CompanyRelationships/receitas-mensais": {
      "get": {
        "tags": [
          "CompanyRelationships"
        ],
        "responses": {
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/api/CompanyRelationships/como-cliente": {
      "get": {
        "tags": [
          "CompanyRelationships"
        ],
        "responses": {
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/api/CompanyRelationships/como-fornecedor": {
      "get": {
        "tags": [
          "CompanyRelationships"
        ],
        "responses": {
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/api/CompanyRelationships/{relationshipId}/ativar": {
      "put": {
        "tags": [
          "CompanyRelationships"
        ],
        "parameters": [
          {
            "name": "relationshipId",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/api/CompanyRelationships/{relationshipId}/desativar": {
      "put": {
        "tags": [
          "CompanyRelationships"
        ],
        "parameters": [
          {
            "name": "relationshipId",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/api/CompanyRelationships/{relationshipId}/usuarios": {
      "get": {
        "tags": [
          "CompanyRelationships"
        ],
        "parameters": [
          {
            "name": "relationshipId",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/api/Contracts": {
      "get": {
        "tags": [
          "Contracts"
        ],
        "parameters": [
          {
            "name": "status",
            "in": "query",
            "schema": {
              "$ref": "#/components/schemas/ContractStatus"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "OK"
          }
        }
      },
      "post": {
        "tags": [
          "Contracts"
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/CreateContractRequest"
              }
            },
            "text/json": {
              "schema": {
                "$ref": "#/components/schemas/CreateContractRequest"
              }
            },
            "application/*+json": {
              "schema": {
                "$ref": "#/components/schemas/CreateContractRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/api/Contracts/pagamentos-mensais": {
      "get": {
        "tags": [
          "Contracts"
        ],
        "responses": {
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/api/Contracts/receitas-mensais": {
      "get": {
        "tags": [
          "Contracts"
        ],
        "responses": {
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/api/Contracts/{id}": {
      "get": {
        "tags": [
          "Contracts"
        ],
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/api/Contracts/{id}/assinar": {
      "post": {
        "tags": [
          "Contracts"
        ],
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/SignContractRequest"
              }
            },
            "text/json": {
              "schema": {
                "$ref": "#/components/schemas/SignContractRequest"
              }
            },
            "application/*+json": {
              "schema": {
                "$ref": "#/components/schemas/SignContractRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/api/Invitations": {
      "get": {
        "tags": [
          "Invitations"
        ],
        "summary": "Listar todos os convites da empresa",
        "description": "Lista todos os convites (pendentes, aceitos, expirados, cancelados) da empresa do usuário logado.\n\n**Permissões:**\n- DonoEmpresaPai: Visualiza todos os convites\n- Financeiro: Visualiza todos os convites\n- Juridico: Visualiza todos os convites\n\n**Informações Retornadas:**\n- Nome e email do convidado\n- Role e cargo\n- Status do convite (Pending, Accepted, Expired, Cancelled)\n- Datas de criação, expiração e aceitação\n- Nome de quem convidou e quem aceitou\n- Flag indicando se está expirado\n- Flag indicando se pode ser editado",
        "responses": {
          "200": {
            "description": "Lista de convites",
            "content": {
              "text/plain": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/UserInvitationListResponse"
                  }
                }
              },
              "application/json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/UserInvitationListResponse"
                  }
                }
              },
              "text/json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/UserInvitationListResponse"
                  }
                }
              }
            }
          },
          "401": {
            "description": "Não autenticado"
          },
          "403": {
            "description": "Sem permissão para visualizar convites"
          }
        }
      }
    },
    "/api/Invitations/{id}": {
      "get": {
        "tags": [
          "Invitations"
        ],
        "summary": "Obter detalhes de um convite específico",
        "description": "Retorna os detalhes completos de um convite específico.\n\n**Validações:**\n- Convite deve pertencer à empresa do usuário logado\n- Usuário deve ter permissão para visualizar convites",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Detalhes do convite",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/UserInvitationListResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/UserInvitationListResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/UserInvitationListResponse"
                }
              }
            }
          },
          "401": {
            "description": "Não autenticado"
          },
          "403": {
            "description": "Convite não pertence à sua empresa"
          },
          "404": {
            "description": "Convite não encontrado"
          }
        }
      },
      "put": {
        "tags": [
          "Invitations"
        ],
        "summary": "Editar um convite pendente",
        "description": "Permite editar os dados de um convite que ainda está pendente.\n\n**Permissões:**\n- Apenas DonoEmpresaPai e Financeiro podem editar\n\n**Campos Editáveis:**\n- Nome do convidado\n- Email do convidado\n- Role (tipo de usuário)\n- Cargo\n\n**Regras:**\n- Apenas convites com status 'Pending' podem ser editados\n- Convites expirados não podem ser editados\n- Convites já aceitos não podem ser editados\n- Novo email não pode estar cadastrado no sistema\n- Novo email não pode ter outro convite pendente\n\n**Caso de Uso:**\nÚtil quando você digitou o email errado, escreveu o nome incorreto ou precisa alterar o cargo/role antes da pessoa aceitar o convite.",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/UpdateInvitationRequest"
              }
            },
            "text/json": {
              "schema": {
                "$ref": "#/components/schemas/UpdateInvitationRequest"
              }
            },
            "application/*+json": {
              "schema": {
                "$ref": "#/components/schemas/UpdateInvitationRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Convite atualizado com sucesso",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/UpdateInvitationResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/UpdateInvitationResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/UpdateInvitationResponse"
                }
              }
            }
          },
          "400": {
            "description": "Dados inválidos ou convite não pode ser editado"
          },
          "401": {
            "description": "Não autenticado"
          },
          "403": {
            "description": "Sem permissão para editar convites"
          },
          "404": {
            "description": "Convite não encontrado"
          }
        }
      },
      "delete": {
        "tags": [
          "Invitations"
        ],
        "summary": "Cancelar um convite pendente",
        "description": "Cancela um convite que ainda está pendente.\n\n**Permissões:**\n- Apenas DonoEmpresaPai e Financeiro podem cancelar\n\n**Regras:**\n- Apenas convites com status 'Pending' podem ser cancelados\n- Convite cancelado muda para status 'Cancelled' (não é deletado)\n- Histórico do convite é mantido para auditoria\n\n**Caso de Uso:**\nÚtil quando o convite foi enviado por engano ou a pessoa não vai mais trabalhar na empresa.",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Convite cancelado com sucesso",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/CancelInvitationResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/CancelInvitationResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/CancelInvitationResponse"
                }
              }
            }
          },
          "400": {
            "description": "Convite não pode ser cancelado"
          },
          "401": {
            "description": "Não autenticado"
          },
          "403": {
            "description": "Sem permissão para cancelar convites"
          },
          "404": {
            "description": "Convite não encontrado"
          }
        }
      }
    },
    "/api/Invitations/{id}/reenviar": {
      "post": {
        "tags": [
          "Invitations"
        ],
        "summary": "Reenviar email de convite pendente",
        "description": "Reenvia o email de convite para um convite que ainda está pendente.\n\n**Permissões:**\n- Apenas DonoEmpresaPai e Financeiro podem reenviar\n\n**Regras:**\n- Apenas convites com status 'Pending' podem ser reenviados\n- Gera um novo token de convite válido\n- Email é enviado novamente para o convidado\n- Mantém todas as informações originais do convite\n\n**Caso de Uso:**\nÚtil quando:\n- A pessoa não recebeu o email\n- O token expirou\n- O email foi para spam\n- A pessoa perdeu o link do convite",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Email reenviado com sucesso",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/ResendInvitationResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ResendInvitationResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/ResendInvitationResponse"
                }
              }
            }
          },
          "400": {
            "description": "Convite não pode ser reenviado"
          },
          "401": {
            "description": "Não autenticado"
          },
          "403": {
            "description": "Sem permissão para reenviar convites"
          },
          "404": {
            "description": "Convite não encontrado"
          }
        }
      }
    },
    "/api/Invoices/listar": {
      "get": {
        "tags": [
          "Invoices"
        ],
        "parameters": [
          {
            "name": "status",
            "in": "query",
            "schema": {
              "$ref": "#/components/schemas/InvoiceStatus"
            }
          },
          {
            "name": "contractId",
            "in": "query",
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/api/Invoices": {
      "get": {
        "tags": [
          "Invoices"
        ],
        "parameters": [
          {
            "name": "status",
            "in": "query",
            "schema": {
              "$ref": "#/components/schemas/InvoiceStatus"
            }
          },
          {
            "name": "contractId",
            "in": "query",
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "OK"
          }
        }
      },
      "post": {
        "tags": [
          "Invoices"
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/CreateInvoiceRequest"
              }
            },
            "text/json": {
              "schema": {
                "$ref": "#/components/schemas/CreateInvoiceRequest"
              }
            },
            "application/*+json": {
              "schema": {
                "$ref": "#/components/schemas/CreateInvoiceRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/api/Invoices/{id}": {
      "get": {
        "tags": [
          "Invoices"
        ],
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/api/Invoices/detalhes/{id}": {
      "get": {
        "tags": [
          "Invoices"
        ],
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/api/Invoices/criar": {
      "post": {
        "tags": [
          "Invoices"
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/CreateInvoiceRequest"
              }
            },
            "text/json": {
              "schema": {
                "$ref": "#/components/schemas/CreateInvoiceRequest"
              }
            },
            "application/*+json": {
              "schema": {
                "$ref": "#/components/schemas/CreateInvoiceRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/api/Invoices/{id}/emitir": {
      "put": {
        "tags": [
          "Invoices"
        ],
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/api/Invoices/{id}/cancelar": {
      "post": {
        "tags": [
          "Invoices"
        ],
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/CancelInvoiceRequest"
              }
            },
            "text/json": {
              "schema": {
                "$ref": "#/components/schemas/CancelInvoiceRequest"
              }
            },
            "application/*+json": {
              "schema": {
                "$ref": "#/components/schemas/CancelInvoiceRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/api/Invoices/{id}/xml-nota": {
      "get": {
        "tags": [
          "Invoices"
        ],
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/api/Invoices/{id}/emitir-sefaz": {
      "post": {
        "tags": [
          "Invoices"
        ],
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/api/Invoices/{id}/cancelar-sefaz": {
      "post": {
        "tags": [
          "Invoices"
        ],
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/CancelInvoiceRequest"
              }
            },
            "text/json": {
              "schema": {
                "$ref": "#/components/schemas/CancelInvoiceRequest"
              }
            },
            "application/*+json": {
              "schema": {
                "$ref": "#/components/schemas/CancelInvoiceRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/api/Invoices/{id}/status-sefaz": {
      "get": {
        "tags": [
          "Invoices"
        ],
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/api/Invoices/validar-certificado-sefaz": {
      "get": {
        "tags": [
          "Invoices"
        ],
        "responses": {
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/api/Ledger/extratos": {
      "get": {
        "tags": [
          "Ledger"
        ],
        "parameters": [
          {
            "name": "startDate",
            "in": "query",
            "schema": {
              "type": "string",
              "format": "date-time"
            }
          },
          {
            "name": "endDate",
            "in": "query",
            "schema": {
              "type": "string",
              "format": "date-time"
            }
          },
          {
            "name": "contractId",
            "in": "query",
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          },
          {
            "name": "paymentId",
            "in": "query",
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/api/Ledger/balanco": {
      "get": {
        "tags": [
          "Ledger"
        ],
        "parameters": [
          {
            "name": "asOfDate",
            "in": "query",
            "schema": {
              "type": "string",
              "format": "date-time"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/api/Ledger/relatorio-financeiro": {
      "get": {
        "tags": [
          "Ledger"
        ],
        "parameters": [
          {
            "name": "startDate",
            "in": "query",
            "schema": {
              "type": "string",
              "format": "date-time"
            }
          },
          {
            "name": "endDate",
            "in": "query",
            "schema": {
              "type": "string",
              "format": "date-time"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/api/Payments": {
      "get": {
        "tags": [
          "Payments"
        ],
        "parameters": [
          {
            "name": "status",
            "in": "query",
            "schema": {
              "$ref": "#/components/schemas/PaymentStatus"
            }
          },
          {
            "name": "contractId",
            "in": "query",
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "OK"
          }
        }
      },
      "post": {
        "tags": [
          "Payments"
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/CreatePaymentRequest"
              }
            },
            "text/json": {
              "schema": {
                "$ref": "#/components/schemas/CreatePaymentRequest"
              }
            },
            "application/*+json": {
              "schema": {
                "$ref": "#/components/schemas/CreatePaymentRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/api/Payments/{id}": {
      "get": {
        "tags": [
          "Payments"
        ],
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/api/Payments/resumo-financeiro": {
      "get": {
        "tags": [
          "Payments"
        ],
        "responses": {
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/api/Payments/{id}/processar": {
      "put": {
        "tags": [
          "Payments"
        ],
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/api/Payments/{id}/cancelar": {
      "put": {
        "tags": [
          "Payments"
        ],
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/api/Registration/admin-empresa": {
      "post": {
        "tags": [
          "Registration"
        ],
        "summary": "Registrar primeiro usuário (Dono da Empresa Pai)",
        "description": "Cria a primeira conta da empresa, que será automaticamente o Dono da Empresa Pai com todos os privilégios administrativos.",
        "requestBody": {
          "description": "Dados para registro da empresa e primeiro usuário",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/RegisterCompanyAdminRequest"
              }
            },
            "text/json": {
              "schema": {
                "$ref": "#/components/schemas/RegisterCompanyAdminRequest"
              }
            },
            "application/*+json": {
              "schema": {
                "$ref": "#/components/schemas/RegisterCompanyAdminRequest"
              }
            }
          },
          "required": true
        },
        "responses": {
          "200": {
            "description": "Empresa e usuário criados com sucesso",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/UserResponse"
                }
              }
            }
          },
          "400": {
            "description": "Dados inválidos ou CNPJ já cadastrado"
          }
        }
      }
    },
    "/api/Registration/convidar-usuario": {
      "post": {
        "tags": [
          "Registration"
        ],
        "summary": "Convidar usuário interno ou funcionário PJ",
        "description": "Permite ao Dono da Empresa Pai convidar:\n        \n**Usuários Internos (InviteType: Internal):**\n- Role: Financeiro ou Juridico\n- Não requer dados de empresa PJ\n        \n**Funcionários PJ (InviteType: ContractedPJ):**\n- Role: Automaticamente será FuncionarioPJ\n- Requer: companyName, cnpj, companyType (Provider), businessModel (ContractedPJ)\n- Criará uma empresa PJ vinculada à empresa pai",
        "requestBody": {
          "description": "Exemplo para Funcionário PJ:\n{\n  \"name\": \"João Silva\",\n  \"email\": \"joao.silva@empresa.com\",\n  \"role\": \"FuncionarioPJ\",\n  \"inviteType\": \"ContractedPJ\",\n  \"companyName\": \"João Silva Consultoria ME\",\n  \"cnpj\": \"12345678000190\",\n  \"companyType\": \"Provider\",\n  \"businessModel\": \"ContractedPJ\"\n}\n\nExemplo para Usuário Interno (Financeiro):\n{\n  \"name\": \"Maria Financeira\",\n  \"email\": \"maria@empresa.com\",\n  \"role\": \"Financeiro\",\n  \"inviteType\": \"Internal\"\n}",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/InviteUserRequest"
              }
            },
            "text/json": {
              "schema": {
                "$ref": "#/components/schemas/InviteUserRequest"
              }
            },
            "application/*+json": {
              "schema": {
                "$ref": "#/components/schemas/InviteUserRequest"
              }
            }
          },
          "required": true
        },
        "responses": {
          "200": {
            "description": "Convite enviado com sucesso",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/UserResponse"
                }
              }
            }
          },
          "400": {
            "description": "Dados inválidos ou usuário já cadastrado"
          },
          "401": {
            "description": "Não autenticado"
          },
          "403": {
            "description": "Apenas Dono da Empresa Pai pode convidar usuários"
          }
        }
      }
    },
    "/api/Registration/aceitar-convite/{inviteToken}": {
      "post": {
        "tags": [
          "Registration"
        ],
        "summary": "Aceitar convite e definir senha",
        "description": "Permite que o usuário convidado aceite o convite e defina sua senha. O token é enviado por email.",
        "parameters": [
          {
            "name": "inviteToken",
            "in": "path",
            "description": "Token de convite recebido por email",
            "required": true,
            "schema": {
              "type": "string"
            }
          }
        ],
        "requestBody": {
          "description": "Exemplo:\n{\n  \"password\": \"SenhaSegura@123\"\n}",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/AcceptInviteRequest"
              }
            },
            "text/json": {
              "schema": {
                "$ref": "#/components/schemas/AcceptInviteRequest"
              }
            },
            "application/*+json": {
              "schema": {
                "$ref": "#/components/schemas/AcceptInviteRequest"
              }
            }
          },
          "required": true
        },
        "responses": {
          "200": {
            "description": "Convite aceito e usuário ativado",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/UserResponse"
                }
              }
            }
          },
          "400": {
            "description": "Token inválido ou expirado"
          }
        }
      }
    },
    "/api/Registration/convites": {
      "get": {
        "tags": [
          "Registration"
        ],
        "summary": "Listar convites pendentes",
        "description": "Retorna todos os convites pendentes enviados pela empresa. Apenas Dono da Empresa Pai tem acesso.",
        "responses": {
          "200": {
            "description": "Lista de convites pendentes"
          },
          "401": {
            "description": "Não autenticado"
          },
          "403": {
            "description": "Acesso negado"
          }
        }
      }
    },
    "/api/Registration/cancelar-convite/{inviteId}": {
      "post": {
        "tags": [
          "Registration"
        ],
        "parameters": [
          {
            "name": "inviteId",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/api/Registration/reenviar-convite/{inviteId}": {
      "post": {
        "tags": [
          "Registration"
        ],
        "summary": "Reenviar convite pendente",
        "description": "Reenvia o email de convite para um convite pendente que ainda não foi aceito. Gera novo token e estende validade por 7 dias.",
        "parameters": [
          {
            "name": "inviteId",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Convite reenviado com sucesso",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/InviteResponse"
                }
              }
            }
          },
          "400": {
            "description": "Convite já aceito ou inválido"
          },
          "404": {
            "description": "Convite não encontrado"
          },
          "401": {
            "description": "Não autenticado"
          },
          "403": {
            "description": "Acesso negado"
          }
        }
      }
    },
    "/api/TaxReports/impostos": {
      "get": {
        "tags": [
          "TaxReports"
        ],
        "parameters": [
          {
            "name": "startDate",
            "in": "query",
            "schema": {
              "type": "string",
              "format": "date-time"
            }
          },
          {
            "name": "endDate",
            "in": "query",
            "schema": {
              "type": "string",
              "format": "date-time"
            }
          },
          {
            "name": "taxType",
            "in": "query",
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/api/TaxReports/livro-saidas": {
      "get": {
        "tags": [
          "TaxReports"
        ],
        "parameters": [
          {
            "name": "startDate",
            "in": "query",
            "schema": {
              "type": "string",
              "format": "date-time"
            }
          },
          {
            "name": "endDate",
            "in": "query",
            "schema": {
              "type": "string",
              "format": "date-time"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/api/TaxReports/sped-fiscal": {
      "get": {
        "tags": [
          "TaxReports"
        ],
        "parameters": [
          {
            "name": "startDate",
            "in": "query",
            "schema": {
              "type": "string",
              "format": "date-time"
            }
          },
          {
            "name": "endDate",
            "in": "query",
            "schema": {
              "type": "string",
              "format": "date-time"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/api/TaxReports/conciliacao-contabil": {
      "get": {
        "tags": [
          "TaxReports"
        ],
        "parameters": [
          {
            "name": "startDate",
            "in": "query",
            "schema": {
              "type": "string",
              "format": "date-time"
            }
          },
          {
            "name": "endDate",
            "in": "query",
            "schema": {
              "type": "string",
              "format": "date-time"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/api/TokenizedAssets/tokenizar": {
      "post": {
        "tags": [
          "TokenizedAssets"
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/TokenizeContractRequest"
              }
            },
            "text/json": {
              "schema": {
                "$ref": "#/components/schemas/TokenizeContractRequest"
              }
            },
            "application/*+json": {
              "schema": {
                "$ref": "#/components/schemas/TokenizeContractRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/api/TokenizedAssets/contrato/{contractId}": {
      "get": {
        "tags": [
          "TokenizedAssets"
        ],
        "parameters": [
          {
            "name": "contractId",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/api/TokenizedAssets/listar": {
      "get": {
        "tags": [
          "TokenizedAssets"
        ],
        "parameters": [
          {
            "name": "chainId",
            "in": "query",
            "schema": {
              "type": "integer",
              "format": "int32"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/api/TokenizedAssets/{id}": {
      "put": {
        "tags": [
          "TokenizedAssets"
        ],
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/UpdateTokenizedAssetRequest"
              }
            },
            "text/json": {
              "schema": {
                "$ref": "#/components/schemas/UpdateTokenizedAssetRequest"
              }
            },
            "application/*+json": {
              "schema": {
                "$ref": "#/components/schemas/UpdateTokenizedAssetRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/api/TokenizedAssets/{id}/atualizar": {
      "put": {
        "tags": [
          "TokenizedAssets"
        ],
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/UpdateTokenizedAssetRequest"
              }
            },
            "text/json": {
              "schema": {
                "$ref": "#/components/schemas/UpdateTokenizedAssetRequest"
              }
            },
            "application/*+json": {
              "schema": {
                "$ref": "#/components/schemas/UpdateTokenizedAssetRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/api/UserProfile/perfil": {
      "get": {
        "tags": [
          "UserProfile"
        ],
        "summary": "Obter perfil do usuário autenticado",
        "description": "Retorna os dados completos do perfil do usuário logado",
        "responses": {
          "200": {
            "description": "Perfil retornado com sucesso",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/UserProfileResponse"
                }
              }
            }
          },
          "401": {
            "description": "Não autenticado"
          },
          "404": {
            "description": "Usuário não encontrado"
          }
        }
      }
    },
    "/api/UserProfile/perfil-completo": {
      "put": {
        "tags": [
          "UserProfile"
        ],
        "summary": "Atualizar perfil completo do usuário autenticado",
        "description": "Permite usuário atualizar seu próprio perfil com todos os campos disponíveis.\n\n**Campos Editáveis por TODOS os usuários:**\n- Nome, email, telefones (celular e fixo)\n- Data de nascimento\n- Endereço completo (8 campos)\n- Senha (requer senhaAtual para validação)\n\n**Campos Específicos por Role:**\n- **Cargo**: Apenas FuncionarioCLT (role 4) e FuncionarioPJ (role 5)\n- **CPF/RG**: Todos podem editar (serão criptografados automaticamente)\n\n**Validações:**\n- Email único no sistema\n- CPF único no sistema\n- Data nascimento: Idade entre 16 e 100 anos\n- Senha: Requer senhaAtual correta para alteração",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/UpdateFullProfileRequest"
              }
            },
            "text/json": {
              "schema": {
                "$ref": "#/components/schemas/UpdateFullProfileRequest"
              }
            },
            "application/*+json": {
              "schema": {
                "$ref": "#/components/schemas/UpdateFullProfileRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Perfil atualizado com sucesso",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/UserProfileResponse"
                }
              }
            }
          },
          "400": {
            "description": "Dados inválidos"
          },
          "401": {
            "description": "Não autenticado"
          }
        }
      }
    },
    "/api/UserProfile/notificacoes/preferencias": {
      "get": {
        "tags": [
          "UserProfile"
        ],
        "summary": "Obter preferências de notificação",
        "description": "Retorna as preferências de notificação por email do usuário",
        "responses": {
          "200": {
            "description": "Preferências retornadas com sucesso",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/NotificationPreferencesDTO"
                }
              }
            }
          },
          "401": {
            "description": "Não autenticado"
          }
        }
      },
      "put": {
        "tags": [
          "UserProfile"
        ],
        "summary": "Atualizar preferências de notificação por email",
        "description": "Define quais tipos de email o usuário deseja receber.\n\n**Preferências Disponíveis por Role:**\n\n**DonoEmpresaPai (role 1):**\n- Contratos (novo, assinado, vencendo)\n- Pagamentos (processado, alertas financeiros)\n- Operações (novos funcionários)\n- Sistema (atualizações)\n\n**Financeiro (role 2):**\n- Contratos (novo, assinado, vencendo)\n- Pagamentos (processado - notificação interna)\n- Operações (novos funcionários)\n- Sistema\n\n**Juridico (role 3):**\n- Contratos (novo, assinado, vencendo)\n- Operações (novos funcionários)\n- Sistema\n\n**FuncionarioPJ (role 5):**\n- Contratos (vencendo - próprios contratos)\n- Pagamentos (recebido)\n- Sistema\n\n**FuncionarioCLT (role 4):**\n- Sistema\n\n**Padrão:** Todas as preferências iniciam como `true`",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/NotificationPreferencesDTO"
              }
            },
            "text/json": {
              "schema": {
                "$ref": "#/components/schemas/NotificationPreferencesDTO"
              }
            },
            "application/*+json": {
              "schema": {
                "$ref": "#/components/schemas/NotificationPreferencesDTO"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Preferências atualizadas com sucesso",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/NotificationPreferencesDTO"
                }
              }
            }
          },
          "401": {
            "description": "Não autenticado"
          }
        }
      }
    },
    "/api/UserProfile/aceitar-termos": {
      "post": {
        "tags": [
          "UserProfile"
        ],
        "summary": "Aceitar termos de uso e política de privacidade",
        "description": "Registra aceite dos termos de uso e política de privacidade (separados).\n\n**Validações:**\n- Ambos documentos podem ser aceitos em requisições separadas\n- Sistema registra data/hora e versão de cada aceite\n- Auditoria completa de aceites",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/AcceptTermsRequest"
              }
            },
            "text/json": {
              "schema": {
                "$ref": "#/components/schemas/AcceptTermsRequest"
              }
            },
            "application/*+json": {
              "schema": {
                "$ref": "#/components/schemas/AcceptTermsRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Termos aceitos com sucesso"
          },
          "400": {
            "description": "Dados inválidos"
          },
          "401": {
            "description": "Não autenticado"
          }
        }
      }
    },
    "/api/UserProfile/termos/versoes": {
      "get": {
        "tags": [
          "UserProfile"
        ],
        "summary": "Obter versões atuais dos termos",
        "description": "Retorna versões atuais de termos de uso e política de privacidade, e se usuário precisa aceitar",
        "responses": {
          "200": {
            "description": "Versões retornadas com sucesso",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/TermsVersionsResponse"
                }
              }
            }
          },
          "401": {
            "description": "Não autenticado"
          }
        }
      }
    },
    "/api/UserProfile/avatar": {
      "post": {
        "tags": [
          "UserProfile"
        ],
        "summary": "Upload de avatar/foto de perfil",
        "description": "Faz upload de uma imagem de avatar para o usuário autenticado.\n\n**Formatos Aceitos:** JPG, JPEG, PNG\n**Tamanho Máximo:** 5MB\n\n**Processamento Automático:**\n- Crop quadrado (1:1)\n- Resize para 400x400px (original)\n- Resize para 80x80px (thumbnail)\n- Compressão automática (JPEG com qualidade 85%)\n\n**Storage:** Local filesystem em `/wwwroot/uploads/avatars/`\n**Fallback:** Se não houver avatar, sistema usa iniciais do nome",
        "requestBody": {
          "content": {
            "multipart/form-data": {
              "schema": {
                "required": [
                  "file"
                ],
                "type": "object",
                "properties": {
                  "file": {
                    "type": "string",
                    "format": "binary"
                  }
                }
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Avatar enviado com sucesso",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/AvatarUploadResponse"
                }
              }
            }
          },
          "400": {
            "description": "Arquivo inválido ou muito grande"
          },
          "401": {
            "description": "Não autenticado"
          }
        }
      },
      "delete": {
        "tags": [
          "UserProfile"
        ],
        "summary": "Remover avatar/foto de perfil",
        "description": "Remove o avatar do usuário autenticado.\n\n**Comportamento:**\n- Deleta arquivo original (400x400px)\n- Deleta thumbnail (80x80px)\n- Sistema volta a usar iniciais do nome como fallback\n\n**Nota:** Operação permanente - avatar não pode ser recuperado",
        "responses": {
          "200": {
            "description": "Avatar removido com sucesso"
          },
          "401": {
            "description": "Não autenticado"
          }
        }
      }
    },
    "/api/UserProfile/empresa": {
      "get": {
        "tags": [
          "UserProfile"
        ],
        "summary": "Obter dados da empresa do usuário autenticado",
        "description": "Retorna os dados da empresa em que o usuário trabalha.\n\n**Disponível para todos os usuários autenticados:**\n- DonoEmpresaPai: Visualiza dados da empresa pai\n- Financeiro: Visualiza dados da empresa pai\n- Jurídico: Visualiza dados da empresa pai\n- FuncionarioCLT: Visualiza dados da empresa pai\n- FuncionarioPJ: Visualiza dados da empresa pai (não confundir com empresa PJ do funcionário)\n\n**Dados Retornados:**\n- Nome da empresa\n- CNPJ (normal e formatado)\n- Tipo de empresa\n- Modelo de negócio\n- Telefones (celular e fixo)\n- Endereço completo",
        "responses": {
          "200": {
            "description": "Dados da empresa retornados com sucesso",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/UserCompanyInfoResponse"
                }
              }
            }
          },
          "401": {
            "description": "Não autenticado"
          },
          "404": {
            "description": "Empresa não encontrada"
          }
        }
      },
      "put": {
        "tags": [
          "UserProfile"
        ],
        "summary": "Atualizar dados da empresa (SOMENTE DonoEmpresaPai)",
        "description": "Permite que o dono da empresa atualize os dados cadastrais da empresa pai.\n\n**Restrição de Acesso:**\n- Apenas usuários com role DonoEmpresaPai (role 1)\n- Só pode atualizar a própria empresa (validação via JWT)\n\n**Campos Editáveis:**\n- Nome da empresa (razão social)\n- Telefone celular (obrigatório - 10 ou 11 dígitos)\n- Telefone fixo (opcional - 10 dígitos)\n- Endereço completo (rua, número, complemento, bairro, cidade, estado, país, CEP)\n\n**Campos NÃO Editáveis:**\n- CNPJ (imutável)\n- Tipo de empresa (imutável)\n- Modelo de negócio (imutável)\n\n**Validações:**\n- Estado: Deve ter exatamente 2 caracteres (sigla)\n- CEP: Deve ter exatamente 8 dígitos\n- Telefones: Apenas números, sem formatação",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/UpdateUserCompanyInfoRequest"
              }
            },
            "text/json": {
              "schema": {
                "$ref": "#/components/schemas/UpdateUserCompanyInfoRequest"
              }
            },
            "application/*+json": {
              "schema": {
                "$ref": "#/components/schemas/UpdateUserCompanyInfoRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Empresa atualizada com sucesso",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/UserCompanyInfoResponse"
                }
              }
            }
          },
          "400": {
            "description": "Dados inválidos"
          },
          "401": {
            "description": "Não autenticado"
          },
          "403": {
            "description": "Apenas DonoEmpresaPai pode atualizar a empresa"
          },
          "404": {
            "description": "Empresa não encontrada"
          }
        }
      }
    },
    "/api/UserProfile/empresa-pj": {
      "put": {
        "tags": [
          "UserProfile"
        ],
        "summary": "Atualizar empresa PJ (SOMENTE FuncionarioPJ)",
        "description": "Permite que um funcionário PJ atualize os dados da própria empresa.\n\n**Validações Implementadas:**\n1. **Formato CNPJ**: Valida se tem 14 dígitos\n2. **Unicidade**: Verifica se CNPJ já está cadastrado\n3. **Receita Federal**: Consulta API da Receita para validar CNPJ\n4. **Divergência de Razão Social**: \n   - Compara Razão Social informada com a registrada na Receita\n   - Usa algoritmo de similaridade (Levenshtein)\n   - Se similaridade < 85%, requer confirmação do usuário\n   - Frontend deve mostrar modal com as duas razões sociais\n\n**Fluxo de Divergência:**\n1. Usuário envia CNPJ + Razão Social\n2. Sistema detecta divergência\n3. Retorna `DivergenciaRazaoSocial = true` com ambas as razões sociais\n4. Frontend mostra modal de confirmação\n5. Usuário reenvia com `ConfirmarDivergenciaRazaoSocial = true`\n6. Sistema aceita e registra na auditoria\n\n**Restrições:**\n- Apenas FuncionarioPJ pode executar\n- Só pode atualizar própria empresa (validação via JWT)\n- Endereço da empresa é independente do endereço pessoal do usuário",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/UpdateCompanyPJRequest"
              }
            },
            "text/json": {
              "schema": {
                "$ref": "#/components/schemas/UpdateCompanyPJRequest"
              }
            },
            "application/*+json": {
              "schema": {
                "$ref": "#/components/schemas/UpdateCompanyPJRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Empresa PJ atualizada com sucesso",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/UpdateCompanyPJResponse"
                }
              }
            }
          },
          "400": {
            "description": "Dados inválidos ou CNPJ duplicado"
          },
          "401": {
            "description": "Não autenticado"
          },
          "403": {
            "description": "Apenas FuncionarioPJ pode atualizar empresa PJ"
          }
        }
      }
    },
    "/api/Users/perfil": {
      "put": {
        "tags": [
          "Users"
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/UpdateUserRequest"
              }
            },
            "text/json": {
              "schema": {
                "$ref": "#/components/schemas/UpdateUserRequest"
              }
            },
            "application/*+json": {
              "schema": {
                "$ref": "#/components/schemas/UpdateUserRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/api/Users/senha": {
      "patch": {
        "tags": [
          "Users"
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/ChangePasswordRequest"
              }
            },
            "text/json": {
              "schema": {
                "$ref": "#/components/schemas/ChangePasswordRequest"
              }
            },
            "application/*+json": {
              "schema": {
                "$ref": "#/components/schemas/ChangePasswordRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/api/Users/funcionarios": {
      "get": {
        "tags": [
          "Users"
        ],
        "summary": "Listar funcionários da empresa",
        "description": "Retorna lista paginada de funcionários da empresa com filtros.\n\n**Permissões por Role:**\n- **DonoEmpresaPai**: Vê TODOS os funcionários (CLT, PJ, Financeiro, Jurídico)\n- **Financeiro/Jurídico**: Vê apenas funcionários CLT e PJ (não vê outros Financeiro/Jurídico)\n- **Outros roles**: Não têm acesso\n\n**Filtros Disponíveis:**\n- `role`: Filtrar por tipo de funcionário (FuncionarioCLT, FuncionarioPJ, etc)\n- `cargo`: Filtrar por cargo (ex: 'Desenvolvedor', 'Designer')\n- `status`: Filtrar por status ('Ativo', 'Inativo')\n- `busca`: Buscar por nome ou email\n\n**Paginação:**\n- `pageNumber`: Número da página (padrão: 1)\n- `pageSize`: Itens por página (padrão: 20, máx: 100)\n\n**Informações Retornadas:**\n- Nome, Email, Role, Cargo\n- Status (Ativo/Inativo)\n- Data de entrada\n- Telefone celular\n- Nome da empresa PJ (se FuncionarioPJ)\n\n**Observações:**\n- CPF é mascarado em listagens (***.***.123-45)\n- Dados sensíveis completos apenas em visualização individual\n- Lista ordenada por nome (A-Z)",
        "parameters": [
          {
            "name": "pageNumber",
            "in": "query",
            "schema": {
              "type": "integer",
              "format": "int32",
              "default": 1
            }
          },
          {
            "name": "pageSize",
            "in": "query",
            "schema": {
              "type": "integer",
              "format": "int32",
              "default": 20
            }
          },
          {
            "name": "role",
            "in": "query",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "cargo",
            "in": "query",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "status",
            "in": "query",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "busca",
            "in": "query",
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Lista de funcionários",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/EmployeeListItemResponsePagedResult"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/EmployeeListItemResponsePagedResult"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/EmployeeListItemResponsePagedResult"
                }
              }
            }
          },
          "401": {
            "description": "Não autenticado"
          },
          "403": {
            "description": "Sem permissão para listar funcionários"
          }
        }
      }
    },
    "/api/Users/exportar-dados": {
      "get": {
        "tags": [
          "Users"
        ],
        "summary": "Exportar dados do usuário (LGPD Art. 18, IV)",
        "description": "Exporta todos os dados pessoais do usuário conforme LGPD.\n\n**Dados Exportados:**\n- **Dados Pessoais**: Nome, Email, CPF (descriptografado), RG, Data Nascimento, Telefones, Endereço completo, Cargo, Avatar\n- **Dados da Empresa**: Razão Social, CNPJ, Tipo (se aplicável)\n- **Histórico de Contratos**: Todos os contratos vinculados (ativos, finalizados, cancelados)\n- **Histórico de Pagamentos**: Todos os pagamentos recebidos (apenas para FuncionarioPJ)\n- **Preferências de Notificação**: Configurações de email\n- **Aceites de Termos**: Datas e versões aceitas\n- **Metadata**: Data da exportação\n\n**Conformidade LGPD:**\n- Art. 18, IV: Portabilidade dos dados a outro fornecedor de serviço\n- Dados entregues em formato estruturado (JSON)\n- Inclui CPF/RG descriptografados para portabilidade completa\n\n**Segurança:**\n- Apenas o próprio usuário pode exportar seus dados\n- Endpoint requer autenticação\n- Ação é logada para auditoria\n\n**Formato:** JSON estruturado",
        "responses": {
          "200": {
            "description": "Dados exportados com sucesso",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/UserDataExportResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/UserDataExportResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/UserDataExportResponse"
                }
              }
            }
          },
          "401": {
            "description": "Não autenticado"
          },
          "404": {
            "description": "Usuário não encontrado"
          }
        }
      }
    },
    "/api/Users/solicitar-exclusao": {
      "delete": {
        "tags": [
          "Users"
        ],
        "summary": "Solicitar exclusão de conta (LGPD Art. 18, VI)",
        "description": "Anonimiza a conta do usuário conforme LGPD e legislação fiscal brasileira.\n\n**Processo de Anonimização:**\n- ✅ Nome → \"Usuário Removido {ID}\"\n- ✅ Email → \"removed_{ID}@aure.deleted\"\n- ✅ Telefones → NULL\n- ✅ Endereço completo → NULL\n- ✅ Avatar → NULL\n- ✅ Cargo → NULL\n- ✅ IsDeleted → TRUE\n- ⚠️ CPF/RG → **MANTIDOS CRIPTOGRAFADOS** (auditoria fiscal)\n\n**Dados Mantidos (Legislação Fiscal):**\n- Contratos e documentos contratuais (5 anos - Lei 8.934/94)\n- Notas Fiscais e documentos fiscais (5 anos - Código Civil)\n- Pagamentos e registros financeiros (5 anos)\n- CPF e RG criptografados (apenas para auditoria)\n\n**Validações:**\n- ❌ Não pode ter contratos ativos\n- ❌ Conta já excluída\n- ✅ Encerrar ou transferir contratos antes\n\n**Conformidade LGPD:**\n- Art. 18, VI: Eliminação dos dados pessoais tratados com consentimento\n- Balanceamento entre LGPD e obrigações fiscais\n- Mantém apenas dados necessários para compliance fiscal\n\n**⚠️ Ação Irreversível:**\nEsta ação não pode ser desfeita. Após anonimização, você não poderá mais acessar o sistema com esta conta.",
        "responses": {
          "200": {
            "description": "Conta anonimizada com sucesso",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/AccountDeletionResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/AccountDeletionResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/AccountDeletionResponse"
                }
              }
            }
          },
          "400": {
            "description": "Não é possível excluir conta (contratos ativos ou já excluída)"
          },
          "401": {
            "description": "Não autenticado"
          },
          "404": {
            "description": "Usuário não encontrado"
          }
        }
      }
    },
    "/api/Users/{employeeId}/cargo": {
      "put": {
        "tags": [
          "Users"
        ],
        "summary": "Atualizar cargo de funcionário",
        "description": "Permite que o dono da empresa altere o cargo de um funcionário.\n\n**Permissões:**\n- Apenas DonoEmpresaPai pode alterar cargos\n- Não é possível alterar o cargo do proprietário\n- Funcionário deve pertencer à mesma empresa\n\n**Validações:**\n- Cargo não pode ser vazio\n- Cargo deve ter no máximo 100 caracteres",
        "parameters": [
          {
            "name": "employeeId",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/UpdateEmployeePositionRequest"
              }
            },
            "text/json": {
              "schema": {
                "$ref": "#/components/schemas/UpdateEmployeePositionRequest"
              }
            },
            "application/*+json": {
              "schema": {
                "$ref": "#/components/schemas/UpdateEmployeePositionRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Cargo atualizado com sucesso",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/UserResponse"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/UserResponse"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/UserResponse"
                }
              }
            }
          },
          "400": {
            "description": "Requisição inválida",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/ProblemDetails"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ProblemDetails"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/ProblemDetails"
                }
              }
            }
          },
          "401": {
            "description": "Não autenticado ou sem permissão",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/ProblemDetails"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ProblemDetails"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/ProblemDetails"
                }
              }
            }
          },
          "404": {
            "description": "Funcionário não encontrado",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/ProblemDetails"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ProblemDetails"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/ProblemDetails"
                }
              }
            }
          }
        }
      }
    },
    "/api/UsersExtended/rede": {
      "get": {
        "tags": [
          "UsersExtended"
        ],
        "responses": {
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/api/UsersExtended/pjs-contratados": {
      "get": {
        "tags": [
          "UsersExtended"
        ],
        "responses": {
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/api/UsersExtended/contratado-por": {
      "get": {
        "tags": [
          "UsersExtended"
        ],
        "responses": {
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/api/UsersExtended/rede/{userId}": {
      "get": {
        "tags": [
          "UsersExtended"
        ],
        "parameters": [
          {
            "name": "userId",
            "in": "path",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "OK"
          }
        }
      }
    }
  },
  "components": {
    "schemas": {
      "AcceptInviteRequest": {
        "type": "object",
        "properties": {
          "password": {
            "type": "string",
            "nullable": true
          },
          "telefoneCelular": {
            "type": "string",
            "nullable": true
          },
          "rua": {
            "type": "string",
            "nullable": true
          },
          "cidade": {
            "type": "string",
            "nullable": true
          },
          "estado": {
            "type": "string",
            "nullable": true
          },
          "pais": {
            "type": "string",
            "nullable": true
          },
          "cep": {
            "type": "string",
            "nullable": true
          },
          "telefoneFixo": {
            "type": "string",
            "nullable": true
          },
          "cpf": {
            "type": "string",
            "nullable": true
          },
          "rg": {
            "type": "string",
            "nullable": true
          },
          "dataNascimento": {
            "type": "string",
            "format": "date-time"
          },
          "numero": {
            "type": "string",
            "nullable": true
          },
          "complemento": {
            "type": "string",
            "nullable": true
          },
          "bairro": {
            "type": "string",
            "nullable": true
          },
          "aceitouTermosUso": {
            "type": "boolean"
          },
          "versaoTermosUsoAceita": {
            "type": "string",
            "nullable": true
          },
          "aceitouPoliticaPrivacidade": {
            "type": "boolean"
          },
          "versaoPoliticaPrivacidadeAceita": {
            "type": "string",
            "nullable": true
          }
        },
        "additionalProperties": false
      },
      "AcceptTermsRequest": {
        "type": "object",
        "properties": {
          "versaoTermosUso": {
            "type": "string",
            "nullable": true
          },
          "versaoPoliticaPrivacidade": {
            "type": "string",
            "nullable": true
          },
          "aceitouTermosUso": {
            "type": "boolean"
          },
          "aceitouPoliticaPrivacidade": {
            "type": "boolean"
          }
        },
        "additionalProperties": false
      },
      "AccountDeletionResponse": {
        "type": "object",
        "properties": {
          "sucesso": {
            "type": "boolean"
          },
          "mensagem": {
            "type": "string",
            "nullable": true
          },
          "aviso": {
            "type": "string",
            "nullable": true
          }
        },
        "additionalProperties": false
      },
      "AvatarUploadResponse": {
        "type": "object",
        "properties": {
          "avatarUrl": {
            "type": "string",
            "nullable": true
          },
          "thumbnailUrl": {
            "type": "string",
            "nullable": true
          }
        },
        "additionalProperties": false
      },
      "BusinessModel": {
        "enum": [
          "Standard",
          "MainCompany",
          "ContractedPJ",
          "Freelancer"
        ],
        "type": "string"
      },
      "CancelInvitationResponse": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          },
          "message": {
            "type": "string",
            "nullable": true
          }
        },
        "additionalProperties": false
      },
      "CancelInvoiceRequest": {
        "type": "object",
        "properties": {
          "reason": {
            "type": "string",
            "nullable": true
          }
        },
        "additionalProperties": false
      },
      "ChangePasswordRequest": {
        "type": "object",
        "properties": {
          "currentPassword": {
            "type": "string",
            "nullable": true
          },
          "newPassword": {
            "type": "string",
            "nullable": true
          }
        },
        "additionalProperties": false
      },
      "CompanyInfoResponse": {
        "type": "object",
        "properties": {
          "id": {
            "type": "string",
            "format": "uuid"
          },
          "razaoSocial": {
            "type": "string",
            "nullable": true
          },
          "cnpj": {
            "type": "string",
            "nullable": true
          },
          "companyType": {
            "$ref": "#/components/schemas/CompanyType"
          },
          "businessModel": {
            "$ref": "#/components/schemas/BusinessModel"
          },
          "enderecoCompleto": {
            "type": "string",
            "nullable": true
          },
          "totalFuncionarios": {
            "type": "integer",
            "format": "int32"
          },
          "contratosAtivos": {
            "type": "integer",
            "format": "int32"
          },
          "dataCadastro": {
            "type": "string",
            "format": "date-time"
          }
        },
        "additionalProperties": false
      },
      "CompanyPJData": {
        "type": "object",
        "properties": {
          "id": {
            "type": "string",
            "format": "uuid"
          },
          "razaoSocial": {
            "type": "string",
            "nullable": true
          },
          "cnpj": {
            "type": "string",
            "nullable": true
          },
          "enderecoRua": {
            "type": "string",
            "nullable": true
          },
          "enderecoNumero": {
            "type": "string",
            "nullable": true
          },
          "enderecoComplemento": {
            "type": "string",
            "nullable": true
          },
          "enderecoBairro": {
            "type": "string",
            "nullable": true
          },
          "enderecoCidade": {
            "type": "string",
            "nullable": true
          },
          "enderecoEstado": {
            "type": "string",
            "nullable": true
          },
          "enderecoPais": {
            "type": "string",
            "nullable": true
          },
          "enderecoCep": {
            "type": "string",
            "nullable": true
          },
          "companyType": {
            "$ref": "#/components/schemas/CompanyType"
          }
        },
        "additionalProperties": false
      },
      "CompanyType": {
        "enum": [
          "Client",
          "Provider",
          "Both"
        ],
        "type": "string"
      },
      "ContractStatus": {
        "enum": [
          "Draft",
          "Active",
          "Completed",
          "Cancelled"
        ],
        "type": "string"
      },
      "ContratoInfo": {
        "type": "object",
        "properties": {
          "id": {
            "type": "string",
            "format": "uuid"
          },
          "titulo": {
            "type": "string",
            "nullable": true
          },
          "valorTotal": {
            "type": "number",
            "format": "double"
          },
          "valorMensal": {
            "type": "number",
            "format": "double",
            "nullable": true
          },
          "dataInicio": {
            "type": "string",
            "format": "date-time"
          },
          "dataExpiracao": {
            "type": "string",
            "format": "date-time",
            "nullable": true
          },
          "dataAssinatura": {
            "type": "string",
            "format": "date-time",
            "nullable": true
          },
          "status": {
            "type": "string",
            "nullable": true
          }
        },
        "additionalProperties": false
      },
      "CreateContractRequest": {
        "type": "object",
        "properties": {
          "providerId": {
            "type": "string",
            "format": "uuid"
          },
          "title": {
            "type": "string",
            "nullable": true
          },
          "description": {
            "type": "string",
            "nullable": true
          },
          "valueTotal": {
            "type": "number",
            "format": "double"
          },
          "monthlyValue": {
            "type": "number",
            "format": "double",
            "nullable": true
          },
          "startDate": {
            "type": "string",
            "format": "date-time"
          },
          "expirationDate": {
            "type": "string",
            "format": "date-time",
            "nullable": true
          }
        },
        "additionalProperties": false
      },
      "CreateInvoiceRequest": {
        "type": "object",
        "properties": {
          "contractId": {
            "type": "string",
            "format": "uuid"
          },
          "paymentId": {
            "type": "string",
            "format": "uuid",
            "nullable": true
          },
          "series": {
            "type": "string",
            "nullable": true
          },
          "dueDate": {
            "type": "string",
            "format": "date-time",
            "nullable": true
          },
          "totalAmount": {
            "type": "number",
            "format": "double"
          },
          "taxAmount": {
            "type": "number",
            "format": "double"
          }
        },
        "additionalProperties": false
      },
      "CreatePaymentRequest": {
        "type": "object",
        "properties": {
          "contratoId": {
            "type": "string",
            "format": "uuid"
          },
          "valor": {
            "type": "number",
            "format": "double"
          },
          "metodo": {
            "$ref": "#/components/schemas/PaymentMethod"
          }
        },
        "additionalProperties": false
      },
      "DadosEmpresa": {
        "type": "object",
        "properties": {
          "id": {
            "type": "string",
            "format": "uuid"
          },
          "razaoSocial": {
            "type": "string",
            "nullable": true
          },
          "cnpj": {
            "type": "string",
            "nullable": true
          },
          "tipo": {
            "type": "string",
            "nullable": true
          }
        },
        "additionalProperties": false
      },
      "DadosPessoais": {
        "type": "object",
        "properties": {
          "id": {
            "type": "string",
            "format": "uuid"
          },
          "nome": {
            "type": "string",
            "nullable": true
          },
          "email": {
            "type": "string",
            "nullable": true
          },
          "role": {
            "type": "string",
            "nullable": true
          },
          "telefoneCelular": {
            "type": "string",
            "nullable": true
          },
          "telefoneFixo": {
            "type": "string",
            "nullable": true
          },
          "cpf": {
            "type": "string",
            "nullable": true
          },
          "rg": {
            "type": "string",
            "nullable": true
          },
          "dataNascimento": {
            "type": "string",
            "format": "date-time",
            "nullable": true
          },
          "cargo": {
            "type": "string",
            "nullable": true
          },
          "endereco": {
            "$ref": "#/components/schemas/EnderecoInfo"
          },
          "avatarUrl": {
            "type": "string",
            "nullable": true
          },
          "dataCriacao": {
            "type": "string",
            "format": "date-time"
          },
          "aceitouTermosUso": {
            "type": "boolean"
          },
          "dataAceiteTermosUso": {
            "type": "string",
            "format": "date-time",
            "nullable": true
          },
          "aceitouPoliticaPrivacidade": {
            "type": "boolean"
          },
          "dataAceitePoliticaPrivacidade": {
            "type": "string",
            "format": "date-time",
            "nullable": true
          }
        },
        "additionalProperties": false
      },
      "EmployeeListItemResponse": {
        "type": "object",
        "properties": {
          "id": {
            "type": "string",
            "format": "uuid"
          },
          "nome": {
            "type": "string",
            "nullable": true
          },
          "email": {
            "type": "string",
            "nullable": true
          },
          "role": {
            "type": "string",
            "nullable": true
          },
          "cargo": {
            "type": "string",
            "nullable": true
          },
          "status": {
            "type": "string",
            "nullable": true
          },
          "dataEntrada": {
            "type": "string",
            "format": "date-time"
          },
          "telefoneCelular": {
            "type": "string",
            "nullable": true
          },
          "empresaPJ": {
            "type": "string",
            "nullable": true
          }
        },
        "additionalProperties": false
      },
      "EmployeeListItemResponsePagedResult": {
        "type": "object",
        "properties": {
          "items": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/EmployeeListItemResponse"
            },
            "nullable": true
          },
          "totalCount": {
            "type": "integer",
            "format": "int32"
          },
          "pageNumber": {
            "type": "integer",
            "format": "int32"
          },
          "pageSize": {
            "type": "integer",
            "format": "int32"
          },
          "totalPages": {
            "type": "integer",
            "format": "int32",
            "readOnly": true
          },
          "hasPreviousPage": {
            "type": "boolean",
            "readOnly": true
          },
          "hasNextPage": {
            "type": "boolean",
            "readOnly": true
          }
        },
        "additionalProperties": false
      },
      "EnderecoEmpresaDto": {
        "type": "object",
        "properties": {
          "rua": {
            "type": "string",
            "nullable": true
          },
          "numero": {
            "type": "string",
            "nullable": true
          },
          "complemento": {
            "type": "string",
            "nullable": true
          },
          "bairro": {
            "type": "string",
            "nullable": true
          },
          "cidade": {
            "type": "string",
            "nullable": true
          },
          "estado": {
            "type": "string",
            "nullable": true
          },
          "pais": {
            "type": "string",
            "nullable": true
          },
          "cep": {
            "type": "string",
            "nullable": true
          },
          "enderecoCompleto": {
            "type": "string",
            "nullable": true
          }
        },
        "additionalProperties": false
      },
      "EnderecoInfo": {
        "type": "object",
        "properties": {
          "rua": {
            "type": "string",
            "nullable": true
          },
          "numero": {
            "type": "string",
            "nullable": true
          },
          "complemento": {
            "type": "string",
            "nullable": true
          },
          "bairro": {
            "type": "string",
            "nullable": true
          },
          "cidade": {
            "type": "string",
            "nullable": true
          },
          "estado": {
            "type": "string",
            "nullable": true
          },
          "pais": {
            "type": "string",
            "nullable": true
          },
          "cep": {
            "type": "string",
            "nullable": true
          }
        },
        "additionalProperties": false
      },
      "InvitationStatus": {
        "enum": [
          "Pending",
          "Accepted",
          "Expired",
          "Cancelled"
        ],
        "type": "string"
      },
      "InviteResponse": {
        "type": "object",
        "properties": {
          "id": {
            "type": "string",
            "format": "uuid"
          },
          "inviterName": {
            "type": "string",
            "nullable": true
          },
          "inviteeEmail": {
            "type": "string",
            "nullable": true
          },
          "inviteeName": {
            "type": "string",
            "nullable": true
          },
          "role": {
            "$ref": "#/components/schemas/UserRole"
          },
          "companyId": {
            "type": "string",
            "format": "uuid"
          },
          "invitedByUserId": {
            "type": "string",
            "format": "uuid"
          },
          "token": {
            "type": "string",
            "nullable": true
          },
          "expiresAt": {
            "type": "string",
            "format": "date-time"
          },
          "isAccepted": {
            "type": "boolean"
          },
          "inviteType": {
            "$ref": "#/components/schemas/InviteType"
          },
          "businessModel": {
            "$ref": "#/components/schemas/BusinessModel"
          },
          "companyName": {
            "type": "string",
            "nullable": true
          },
          "cnpj": {
            "type": "string",
            "nullable": true
          },
          "companyType": {
            "$ref": "#/components/schemas/CompanyType"
          }
        },
        "additionalProperties": false
      },
      "InviteType": {
        "enum": [
          "Internal",
          "ContractedPJ",
          "ExternalUser"
        ],
        "type": "string"
      },
      "InviteUserRequest": {
        "type": "object",
        "properties": {
          "name": {
            "type": "string",
            "nullable": true
          },
          "email": {
            "type": "string",
            "nullable": true
          },
          "role": {
            "$ref": "#/components/schemas/UserRole"
          },
          "inviteType": {
            "$ref": "#/components/schemas/InviteType"
          },
          "cargo": {
            "type": "string",
            "nullable": true
          },
          "companyName": {
            "type": "string",
            "nullable": true
          },
          "cnpj": {
            "type": "string",
            "nullable": true
          },
          "companyType": {
            "$ref": "#/components/schemas/CompanyType"
          },
          "businessModel": {
            "$ref": "#/components/schemas/BusinessModel"
          }
        },
        "additionalProperties": false,
        "example": {
          "name": "João Silva",
          "email": "joao.silva@empresa.com",
          "role": "Provider",
          "inviteType": "ContractedPJ",
          "companyName": "João Silva Consultoria ME",
          "cnpj": "12345678000190",
          "companyType": "Provider",
          "businessModel": "ContractedPJ"
        }
      },
      "InvoiceStatus": {
        "enum": [
          "Draft",
          "Issued",
          "Sent",
          "Cancelled",
          "Error"
        ],
        "type": "string"
      },
      "LoginRequest": {
        "type": "object",
        "properties": {
          "email": {
            "type": "string",
            "nullable": true
          },
          "password": {
            "type": "string",
            "nullable": true
          }
        },
        "additionalProperties": false
      },
      "LogoutRequest": {
        "type": "object",
        "properties": {
          "userId": {
            "type": "string",
            "format": "uuid"
          }
        },
        "additionalProperties": false
      },
      "NotificationPreferencesDTO": {
        "type": "object",
        "properties": {
          "receberEmailNovoContrato": {
            "type": "boolean"
          },
          "receberEmailContratoAssinado": {
            "type": "boolean"
          },
          "receberEmailContratoVencendo": {
            "type": "boolean"
          },
          "receberEmailPagamentoProcessado": {
            "type": "boolean"
          },
          "receberEmailPagamentoRecebido": {
            "type": "boolean"
          },
          "receberEmailNovoFuncionario": {
            "type": "boolean"
          },
          "receberEmailAlertasFinanceiros": {
            "type": "boolean"
          },
          "receberEmailAtualizacoesSistema": {
            "type": "boolean"
          }
        },
        "additionalProperties": false
      },
      "PagamentoInfo": {
        "type": "object",
        "properties": {
          "id": {
            "type": "string",
            "format": "uuid"
          },
          "valor": {
            "type": "number",
            "format": "double"
          },
          "dataPagamento": {
            "type": "string",
            "format": "date-time"
          },
          "status": {
            "type": "string",
            "nullable": true
          },
          "descricao": {
            "type": "string",
            "nullable": true
          }
        },
        "additionalProperties": false
      },
      "PasswordResetResponse": {
        "type": "object",
        "properties": {
          "sucesso": {
            "type": "boolean"
          },
          "mensagem": {
            "type": "string",
            "nullable": true
          }
        },
        "additionalProperties": false
      },
      "PaymentMethod": {
        "enum": [
          "PIX",
          "TED",
          "CreditCard",
          "Boleto"
        ],
        "type": "string"
      },
      "PaymentStatus": {
        "enum": [
          "Pending",
          "Completed",
          "Failed",
          "Cancelled"
        ],
        "type": "string"
      },
      "ProblemDetails": {
        "type": "object",
        "properties": {
          "type": {
            "type": "string",
            "nullable": true
          },
          "title": {
            "type": "string",
            "nullable": true
          },
          "status": {
            "type": "integer",
            "format": "int32",
            "nullable": true
          },
          "detail": {
            "type": "string",
            "nullable": true
          },
          "instance": {
            "type": "string",
            "nullable": true
          }
        },
        "additionalProperties": { }
      },
      "RefreshTokenRequest": {
        "type": "object",
        "properties": {
          "refreshToken": {
            "type": "string",
            "nullable": true
          }
        },
        "additionalProperties": false
      },
      "RegisterCompanyAdminRequest": {
        "type": "object",
        "properties": {
          "companyName": {
            "type": "string",
            "nullable": true
          },
          "companyCnpj": {
            "type": "string",
            "nullable": true
          },
          "companyType": {
            "$ref": "#/components/schemas/CompanyType"
          },
          "businessModel": {
            "$ref": "#/components/schemas/BusinessModel"
          },
          "name": {
            "type": "string",
            "nullable": true
          },
          "email": {
            "type": "string",
            "nullable": true
          },
          "password": {
            "type": "string",
            "nullable": true
          },
          "telefoneCelular": {
            "type": "string",
            "nullable": true
          },
          "rua": {
            "type": "string",
            "nullable": true
          },
          "cidade": {
            "type": "string",
            "nullable": true
          },
          "estado": {
            "type": "string",
            "nullable": true
          },
          "pais": {
            "type": "string",
            "nullable": true
          },
          "cep": {
            "type": "string",
            "nullable": true
          },
          "telefoneFixo": {
            "type": "string",
            "nullable": true
          },
          "cpf": {
            "type": "string",
            "nullable": true
          },
          "rg": {
            "type": "string",
            "nullable": true
          },
          "dataNascimento": {
            "type": "string",
            "format": "date-time"
          },
          "numero": {
            "type": "string",
            "nullable": true
          },
          "complemento": {
            "type": "string",
            "nullable": true
          },
          "bairro": {
            "type": "string",
            "nullable": true
          },
          "aceitouTermosUso": {
            "type": "boolean"
          },
          "versaoTermosUsoAceita": {
            "type": "string",
            "nullable": true
          },
          "aceitouPoliticaPrivacidade": {
            "type": "boolean"
          },
          "versaoPoliticaPrivacidadeAceita": {
            "type": "string",
            "nullable": true
          }
        },
        "additionalProperties": false
      },
      "RequestPasswordResetRequest": {
        "required": [
          "email"
        ],
        "type": "object",
        "properties": {
          "email": {
            "minLength": 1,
            "type": "string",
            "format": "email"
          }
        },
        "additionalProperties": false
      },
      "ResendInvitationResponse": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          },
          "message": {
            "type": "string",
            "nullable": true
          },
          "newExpirationDate": {
            "type": "string",
            "format": "date-time",
            "nullable": true
          }
        },
        "additionalProperties": false
      },
      "ResetPasswordRequest": {
        "required": [
          "confirmacaoSenha",
          "novaSenha",
          "token"
        ],
        "type": "object",
        "properties": {
          "token": {
            "minLength": 1,
            "type": "string"
          },
          "novaSenha": {
            "minLength": 8,
            "pattern": "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]",
            "type": "string"
          },
          "confirmacaoSenha": {
            "minLength": 1,
            "type": "string"
          }
        },
        "additionalProperties": false
      },
      "SignContractRequest": {
        "type": "object",
        "properties": {
          "method": {
            "$ref": "#/components/schemas/SignatureMethod"
          },
          "signatureHash": {
            "type": "string",
            "nullable": true
          }
        },
        "additionalProperties": false
      },
      "SignatureMethod": {
        "enum": [
          "Digital",
          "Electronic",
          "Manual"
        ],
        "type": "string"
      },
      "TermsVersionsResponse": {
        "type": "object",
        "properties": {
          "versaoTermosUsoAtual": {
            "type": "string",
            "nullable": true
          },
          "versaoPoliticaPrivacidadeAtual": {
            "type": "string",
            "nullable": true
          },
          "usuarioPrecisaAceitar": {
            "type": "boolean"
          }
        },
        "additionalProperties": false
      },
      "TokenizeContractRequest": {
        "type": "object",
        "properties": {
          "contractId": {
            "type": "string",
            "format": "uuid"
          },
          "tokenAddress": {
            "type": "string",
            "nullable": true
          },
          "chainId": {
            "type": "integer",
            "format": "int32"
          },
          "transactionHash": {
            "type": "string",
            "nullable": true
          }
        },
        "additionalProperties": false
      },
      "UpdateCompanyPJRequest": {
        "type": "object",
        "properties": {
          "razaoSocial": {
            "type": "string",
            "nullable": true
          },
          "cnpj": {
            "type": "string",
            "nullable": true
          },
          "enderecoRua": {
            "type": "string",
            "nullable": true
          },
          "enderecoNumero": {
            "type": "string",
            "nullable": true
          },
          "enderecoComplemento": {
            "type": "string",
            "nullable": true
          },
          "enderecoBairro": {
            "type": "string",
            "nullable": true
          },
          "enderecoCidade": {
            "type": "string",
            "nullable": true
          },
          "enderecoEstado": {
            "type": "string",
            "nullable": true
          },
          "enderecoPais": {
            "type": "string",
            "nullable": true
          },
          "enderecoCep": {
            "type": "string",
            "nullable": true
          },
          "companyType": {
            "$ref": "#/components/schemas/CompanyType"
          },
          "confirmarDivergenciaRazaoSocial": {
            "type": "boolean"
          }
        },
        "additionalProperties": false
      },
      "UpdateCompanyPJResponse": {
        "type": "object",
        "properties": {
          "sucesso": {
            "type": "boolean"
          },
          "mensagem": {
            "type": "string",
            "nullable": true
          },
          "empresa": {
            "$ref": "#/components/schemas/CompanyPJData"
          },
          "divergenciaRazaoSocial": {
            "type": "boolean"
          },
          "razaoSocialReceita": {
            "type": "string",
            "nullable": true
          },
          "razaoSocialInformada": {
            "type": "string",
            "nullable": true
          },
          "requerConfirmacao": {
            "type": "boolean"
          }
        },
        "additionalProperties": false
      },
      "UpdateCompanyParentRequest": {
        "type": "object",
        "properties": {
          "razaoSocial": {
            "type": "string",
            "nullable": true
          },
          "cnpj": {
            "type": "string",
            "nullable": true
          },
          "confirmarDivergenciaRazaoSocial": {
            "type": "boolean"
          },
          "enderecoRua": {
            "type": "string",
            "nullable": true
          },
          "enderecoNumero": {
            "type": "string",
            "nullable": true
          },
          "enderecoComplemento": {
            "type": "string",
            "nullable": true
          },
          "enderecoBairro": {
            "type": "string",
            "nullable": true
          },
          "enderecoCidade": {
            "type": "string",
            "nullable": true
          },
          "enderecoEstado": {
            "type": "string",
            "nullable": true
          },
          "enderecoPais": {
            "type": "string",
            "nullable": true
          },
          "enderecoCep": {
            "type": "string",
            "nullable": true
          }
        },
        "additionalProperties": false
      },
      "UpdateCompanyParentResponse": {
        "type": "object",
        "properties": {
          "sucesso": {
            "type": "boolean"
          },
          "mensagem": {
            "type": "string",
            "nullable": true
          },
          "empresa": {
            "$ref": "#/components/schemas/CompanyInfoResponse"
          },
          "divergenciaRazaoSocial": {
            "type": "boolean"
          },
          "razaoSocialReceita": {
            "type": "string",
            "nullable": true
          },
          "razaoSocialInformada": {
            "type": "string",
            "nullable": true
          },
          "requerConfirmacao": {
            "type": "boolean"
          }
        },
        "additionalProperties": false
      },
      "UpdateEmployeePositionRequest": {
        "type": "object",
        "properties": {
          "cargo": {
            "type": "string",
            "nullable": true
          }
        },
        "additionalProperties": false
      },
      "UpdateFullProfileRequest": {
        "type": "object",
        "properties": {
          "nome": {
            "type": "string",
            "nullable": true
          },
          "email": {
            "type": "string",
            "nullable": true
          },
          "dataNascimento": {
            "type": "string",
            "format": "date-time",
            "nullable": true
          },
          "cpf": {
            "type": "string",
            "nullable": true
          },
          "rg": {
            "type": "string",
            "nullable": true
          },
          "cargo": {
            "type": "string",
            "nullable": true
          },
          "telefoneCelular": {
            "type": "string",
            "nullable": true
          },
          "telefoneFixo": {
            "type": "string",
            "nullable": true
          },
          "enderecoRua": {
            "type": "string",
            "nullable": true
          },
          "enderecoNumero": {
            "type": "string",
            "nullable": true
          },
          "enderecoComplemento": {
            "type": "string",
            "nullable": true
          },
          "enderecoBairro": {
            "type": "string",
            "nullable": true
          },
          "enderecoCidade": {
            "type": "string",
            "nullable": true
          },
          "enderecoEstado": {
            "type": "string",
            "nullable": true
          },
          "enderecoPais": {
            "type": "string",
            "nullable": true
          },
          "enderecoCep": {
            "type": "string",
            "nullable": true
          },
          "senhaAtual": {
            "type": "string",
            "nullable": true
          },
          "novaSenha": {
            "type": "string",
            "nullable": true
          }
        },
        "additionalProperties": false
      },
      "UpdateInvitationRequest": {
        "type": "object",
        "properties": {
          "name": {
            "type": "string",
            "nullable": true
          },
          "email": {
            "type": "string",
            "nullable": true
          },
          "role": {
            "$ref": "#/components/schemas/UserRole"
          },
          "cargo": {
            "type": "string",
            "nullable": true
          }
        },
        "additionalProperties": false
      },
      "UpdateInvitationResponse": {
        "type": "object",
        "properties": {
          "success": {
            "type": "boolean"
          },
          "message": {
            "type": "string",
            "nullable": true
          },
          "invitation": {
            "$ref": "#/components/schemas/UserInvitationListResponse"
          }
        },
        "additionalProperties": false
      },
      "UpdateTokenizedAssetRequest": {
        "type": "object",
        "properties": {
          "tokenAddress": {
            "type": "string",
            "nullable": true
          },
          "transactionHash": {
            "type": "string",
            "nullable": true
          }
        },
        "additionalProperties": false
      },
      "UpdateUserCompanyInfoRequest": {
        "type": "object",
        "properties": {
          "nome": {
            "type": "string",
            "nullable": true
          },
          "telefoneCelular": {
            "type": "string",
            "nullable": true
          },
          "telefoneFixo": {
            "type": "string",
            "nullable": true
          },
          "rua": {
            "type": "string",
            "nullable": true
          },
          "numero": {
            "type": "string",
            "nullable": true
          },
          "complemento": {
            "type": "string",
            "nullable": true
          },
          "bairro": {
            "type": "string",
            "nullable": true
          },
          "cidade": {
            "type": "string",
            "nullable": true
          },
          "estado": {
            "type": "string",
            "nullable": true
          },
          "pais": {
            "type": "string",
            "nullable": true
          },
          "cep": {
            "type": "string",
            "nullable": true
          }
        },
        "additionalProperties": false
      },
      "UpdateUserRequest": {
        "type": "object",
        "properties": {
          "name": {
            "type": "string",
            "nullable": true
          },
          "email": {
            "type": "string",
            "nullable": true
          }
        },
        "additionalProperties": false
      },
      "UserCompanyInfoResponse": {
        "type": "object",
        "properties": {
          "id": {
            "type": "string",
            "format": "uuid"
          },
          "nome": {
            "type": "string",
            "nullable": true
          },
          "cnpj": {
            "type": "string",
            "nullable": true
          },
          "cnpjFormatado": {
            "type": "string",
            "nullable": true
          },
          "tipo": {
            "type": "string",
            "nullable": true
          },
          "modeloNegocio": {
            "type": "string",
            "nullable": true
          },
          "endereco": {
            "$ref": "#/components/schemas/EnderecoEmpresaDto"
          },
          "telefoneFixo": {
            "type": "string",
            "nullable": true
          },
          "telefoneCelular": {
            "type": "string",
            "nullable": true
          }
        },
        "additionalProperties": false
      },
      "UserDataExportResponse": {
        "type": "object",
        "properties": {
          "dadosPessoais": {
            "$ref": "#/components/schemas/DadosPessoais"
          },
          "dadosEmpresa": {
            "$ref": "#/components/schemas/DadosEmpresa"
          },
          "contratos": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/ContratoInfo"
            },
            "nullable": true
          },
          "pagamentos": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/PagamentoInfo"
            },
            "nullable": true
          },
          "preferenciasNotificacao": {
            "$ref": "#/components/schemas/NotificationPreferencesDTO"
          },
          "dataExportacao": {
            "type": "string",
            "format": "date-time"
          }
        },
        "additionalProperties": false
      },
      "UserInvitationListResponse": {
        "type": "object",
        "properties": {
          "id": {
            "type": "string",
            "format": "uuid"
          },
          "name": {
            "type": "string",
            "nullable": true
          },
          "email": {
            "type": "string",
            "nullable": true
          },
          "role": {
            "$ref": "#/components/schemas/UserRole"
          },
          "cargo": {
            "type": "string",
            "nullable": true
          },
          "status": {
            "$ref": "#/components/schemas/InvitationStatus"
          },
          "createdAt": {
            "type": "string",
            "format": "date-time"
          },
          "expiresAt": {
            "type": "string",
            "format": "date-time"
          },
          "acceptedAt": {
            "type": "string",
            "format": "date-time",
            "nullable": true
          },
          "invitedByName": {
            "type": "string",
            "nullable": true
          },
          "acceptedByName": {
            "type": "string",
            "nullable": true
          },
          "isExpired": {
            "type": "boolean"
          },
          "canBeEdited": {
            "type": "boolean"
          }
        },
        "additionalProperties": false
      },
      "UserProfileResponse": {
        "type": "object",
        "properties": {
          "id": {
            "type": "string",
            "format": "uuid"
          },
          "nome": {
            "type": "string",
            "nullable": true
          },
          "email": {
            "type": "string",
            "nullable": true
          },
          "role": {
            "type": "integer",
            "format": "int32"
          },
          "roleDescricao": {
            "type": "string",
            "nullable": true
          },
          "avatarUrl": {
            "type": "string",
            "nullable": true
          },
          "dataNascimento": {
            "type": "string",
            "format": "date-time",
            "nullable": true
          },
          "cpfMascarado": {
            "type": "string",
            "nullable": true
          },
          "cpf": {
            "type": "string",
            "nullable": true
          },
          "rg": {
            "type": "string",
            "nullable": true
          },
          "cargo": {
            "type": "string",
            "nullable": true
          },
          "telefoneCelular": {
            "type": "string",
            "nullable": true
          },
          "telefoneFixo": {
            "type": "string",
            "nullable": true
          },
          "enderecoRua": {
            "type": "string",
            "nullable": true
          },
          "enderecoNumero": {
            "type": "string",
            "nullable": true
          },
          "enderecoComplemento": {
            "type": "string",
            "nullable": true
          },
          "enderecoBairro": {
            "type": "string",
            "nullable": true
          },
          "enderecoCidade": {
            "type": "string",
            "nullable": true
          },
          "enderecoEstado": {
            "type": "string",
            "nullable": true
          },
          "enderecoPais": {
            "type": "string",
            "nullable": true
          },
          "enderecoCep": {
            "type": "string",
            "nullable": true
          },
          "enderecoCompleto": {
            "type": "string",
            "nullable": true
          },
          "aceitouTermosUso": {
            "type": "boolean"
          },
          "dataAceiteTermosUso": {
            "type": "string",
            "format": "date-time",
            "nullable": true
          },
          "versaoTermosUsoAceita": {
            "type": "string",
            "nullable": true
          },
          "aceitouPoliticaPrivacidade": {
            "type": "boolean"
          },
          "dataAceitePoliticaPrivacidade": {
            "type": "string",
            "format": "date-time",
            "nullable": true
          },
          "versaoPoliticaPrivacidadeAceita": {
            "type": "string",
            "nullable": true
          }
        },
        "additionalProperties": false
      },
      "UserResponse": {
        "type": "object",
        "properties": {
          "id": {
            "type": "string",
            "format": "uuid"
          },
          "name": {
            "type": "string",
            "nullable": true
          },
          "email": {
            "type": "string",
            "nullable": true
          },
          "role": {
            "$ref": "#/components/schemas/UserRole"
          },
          "companyId": {
            "type": "string",
            "format": "uuid",
            "nullable": true
          },
          "createdAt": {
            "type": "string",
            "format": "date-time"
          },
          "updatedAt": {
            "type": "string",
            "format": "date-time"
          }
        },
        "additionalProperties": false
      },
      "UserRole": {
        "enum": [
          "DonoEmpresaPai",
          "Financeiro",
          "Juridico",
          "FuncionarioCLT",
          "FuncionarioPJ"
        ],
        "type": "string"
      }
    },
    "securitySchemes": {
      "Bearer": {
        "type": "http",
        "description": "Insira o token JWT no formato: Bearer {seu_token}",
        "scheme": "Bearer",
        "bearerFormat": "JWT"
      }
    }
  },
  "security": [
    {
      "Bearer": [ ]
    }
  ]
}