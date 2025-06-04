import React from 'react';

class UserManagement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [
        { id: 1, name: 'Alice', email: 'alice@example.com' },
        { id: 2, name: 'Bob', email: 'bob@example.com' }
      ],
      newUserName: '',
      newUserEmail: ''
    };
  }

  handleNameChange = (event) => {
    this.setState({ newUserName: event.target.value });
  };

  handleEmailChange = (event) => {
    this.setState({ newUserEmail: event.target.value });
  };

  addUser = () => {
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
  };

  render() {
    return (
      <div>
        <h2>Gerenciamento de Usuários</h2>
        <div>
          <input
            type="text"
            placeholder="Nome do usuário"
            value={this.state.newUserName}
            onChange={this.handleNameChange}
          />
          <input
            type="email"
            placeholder="Email do usuário"
            value={this.state.newUserEmail}
            onChange={this.handleEmailChange}
          />
          <button onClick={this.addUser}>Adicionar Usuário</button>
        </div>
        <ul>
          {this.state.users.map((user) => (
            <li key={user.id}>
              {user.name} ({user.email})
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default UserManagement;