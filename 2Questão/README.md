# Relatório de Erros no Arquivo `UserManagement.js`

Este documento descreve os problemas encontrados no código enviado e sugere soluções para corrigi-los.

---

## Problemas Identificados

### 1. **Alterar o Estado Diretamente**

No método `handleNameChange`, o estado é alterado diretamente:

```javascript
this.state.newUserName = event.target.value;
```
#### Problema:

Dessa forma o estado de newUserName não está sendo alterado corretamente.

#### Solução:

Use o método `setState`:

```javascript
handleNameChange(event) {
  this.setState({ newUserName: event.target.value });
}
```

---

### 2. **Alterar o Estado Diretamente ao Adicionar Usuários**

No método `addUser`, o estado é alterado diretamente:

```javascript
this.state.users.push(newUser);
this.forceUpdate();
```

#### Problema:

Alterar o estado diretamente não é uma boa prática, além de que o uso do forceUpdate pode resultar problemas.

#### Solução:

Use o método `setState` para atualizar o array de usuários e a retirada do forceUpdate pelo fato de que ao atualizar pelo setState o React já sabe que houve uma alteração e já atualiza o DOM.:

```javascript
addUser() {
  const newUser = {
    id: this.state.users.length + 1,
    name: this.state.newUserName,
    email: this.state.newUserEmail
  };

  this.setState((prevState) => ({
    users: [...prevState.users, newUser],
    newUserName: '',
    newUserEmail: ''
  }));
}
```

---

### 3. **Campos Não Limpados Após Adicionar Usuário**

Após adicionar um usuário, os campos de entrada permanecem preenchidos.

#### Solução:

No método `addUser`, redefina os valores dos campos:

```javascript
this.setState({
  newUserName: '',
  newUserEmail: ''
});
```

---
Obs:
- A forma com o Id do usuário está sendo setado pode causar problemas no futuro, uma vez que o usuário possa ser deletado haverá duplicamento de Id. Utilize uma forma como uuid para gerar Id único.
- Não há verificação se o nome e email estão preenchidos para adicionar um usuário, verificar regras de negocio para verificar se ambos precisam estar preenchidos para adicionar um usuário. ( Email sem verificação se é realmente um email)
---

### 4. **Ausência de `onChange` no Campo Nome**

O campo de entrada para o nome do usuário não possui o evento `onChange`:

```javascript
<input
  type="text"
  placeholder="Nome do usuário"
  value={this.state.newUserName}
/>
```

#### Problema:

Sem o evento `onChange`, o valor digitado não é registrado no estado.

#### Solução:

Adicione o evento `onChange` que chama `handleNameChange`:

```javascript
<input
  type="text"
  placeholder="Nome do usuário"
  value={this.state.newUserName}
  onChange={(e) => this.handleNameChange(e)}
/>
```

---


### 5. **Ausência de `key` ao Mapear Usuários**

Ao renderizar a lista de usuários, não foi atribuída uma `key` única, fazendo com que apareçam avisos no console:

```javascript
{this.state.users.map(user => (
  <li>
    {user.name} ({user.email})
  </li>
))}
```

#### Problema:

Sem uma `key`, o React pode ter dificuldades para identificar quais elementos foram alterados, removidos ou adicionados, afetando a performance.

#### Solução:

Adicione a propriedade `key` com um identificador único (por exemplo, `user.id`):

```javascript
{this.state.users.map(user => (
  <li key={user.id}>
    {user.name} ({user.email})
  </li>
))}
```

---

### 6. **Criação de Funções Inline nos Eventos**

O código atual utiliza funções inline em eventos:

```javascript
<button onClick={() => this.addUser()}>Adicionar Usuário</button>
```

#### Problema:

Embora funcione, isso pode impactar a performance, pois uma nova função é criada a cada renderização.Esse jeito é utilizado quando há algo sendo passado como parâmetro.

#### Solução Alternativa:

Transforme os métodos `addUser`, `handleNameChange`, `handleEmailChange` em uma função arrow dentro da classe para evitar problemas de contexto ou utilize bind para garantir o contexto correto:

```javascript
addUser = () => {
};
```

E use o evento diretamente:

```javascript
<button onClick={this.addUser}>Adicionar Usuário</button>
```




