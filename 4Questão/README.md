# 4 Questão - Consumo de API

# Controle de Token e API de Autenticação

  Práticas recomendadas para gerenciamento de tokens e autenticação de APIs em aplicações frontend para consumo de endpoints. 
  [Exemplo de aplicação](https://github.com/wagnerjunr/Shipay-Desafio/blob/main/4Quest%C3%A3o/Aplica%C3%A7%C3%A3o/ssr/useAuth.js){:target="_blank"} 

### 1. Gerenciamento de Credenciais no Frontend
- Armazene os dados de `access_key` e `secret_key` em um arquivo `.env` no frontend para segurança.
- Implemente validações para as respostas da API:
  - **200 (Autorizado)**: Processar corretamente os dados retornados.
  - **4XX (Sem autorização)**: Tratar erros de autenticação de maneira adequada.

---

### 2. Armazenamento de Tokens
- Em caso de uma resposta `200` contendo os dados `access_token`, `access_token_expires_in`, `refresh_token`, e `refresh_token_expires_in`:
  - **Armazenamento Seguro**: 
    - Armazene, se possível, o `refresh_token` nos cookies como `HttpOnly` para maior segurança. 
    - o `access_token` deve ser armazenado em uma variável global para ser enviado aos endpoints -Exemplo: Authorization: Bearer.
    - Utilize o `refresh_token` para revalidar o `access_token` quando necessário.
  - **Motivação**: 
    - O `refresh_token` geralmente tem um tempo de expiração mais longo e reduz o risco de ataques, pois é enviado apenas ao backend.

---

### 3. Função de Verificação de Token
- Crie uma função (`getAccessToken`) que irá:
  1. Verificar o tempo de expiração do `access_token` e se o mesmo é null.
  2. Caso esteja inválido, verificar o `refresh_token` e seu tempo de expiração para revalidar o `access_token`.
  Obs: Caso haja um endpoint para o refresh_token, ela deve ser chamada quando o `access_token` estiver inválido para revalida-lo.
  3. Se ambos estiverem inválidos, chamar novamente a rota de autenticação para revalidar os tokens.
  4. Retornar o novo `access_token` se tudo estiver correto.

---

### 4. Uso do Token em Requisições
- Chame a função `getAccessToken` para verificar o status do token de acesso antes de chamar endpoints.
- Inclua o `access_token` no cabeçalho (`Authorization`) das requisições enviadas aos endpoints da aplicação.

---

## Ideias e Boas Práticas

### Middleware de Autenticação (Backend)
**Ideia**:  
- Crie um middleware no backend para verificar se o `access_token` enviado na requisição é válido.  
  - Se inválido, verifique o `refresh_token`.
  - Se o `refresh_token` for válido, revalide o `access_token` e permita o acesso. 
  - Se ambos forem inválidos, o usuário não possui autorização para realizar aquela ação.

---

### Otimização de Performance
- **Armazenamento na Memória**: 
  - Armazene o `access_token` em uma variável global para facilitar o acesso para ser enviado aos endpoints.
- **Renovação Automática**: 
  - Implemente uma lógica para renovar o token antes de sua expiração, evitando múltiplas requisições desnecessárias ao endpoint de autenticação.

---

### Requisições Paralelas
- Utilize bibliotecas como `Promise.all` para disparar múltiplas requisições simultâneas de maneira eficiente.

---

### Cache de Resultados
- **Cache Server-Side**:
  - Implemente cache no servidor para evitar consultas repetitivas a endpoints que retornam dados estáticos ou semi-estáticos.



