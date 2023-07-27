import axios from 'axios';
import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';
import './css/login.css';

class Login extends Component {
  static contextType = MyContext; // using this.context to access global state
  constructor(props) {
    super(props);
    this.state = {
      txtUsername: '',
      txtPassword: ''
    };
  }
  render() {
    if (this.context.token === '') {
      return (
        <section class="container">
          <div class="login-container">
            <div class="circle circle-one"></div>
            <div class="form-container">
              <img src="https://raw.githubusercontent.com/hicodersofficial/glassmorphism-login-form/master/assets/illustration.png" alt="illustration" class="illustration" />
              <h1 class="opacity">ADMIN</h1>
              <td></td>

              <form>
                <input type="text" value={this.state.txtUsername} onChange={(e) => { this.setState({ txtUsername: e.target.value }); }} />
                <input type="password" value={this.state.txtPassword} onChange={(e) => { this.setState({ txtPassword: e.target.value }); }} />
                <button class="opacity"><input type="submit" value="LOGIN" onClick={(e) => this.btnLoginClick(e)} /></button>
              </form>

            </div>
            <div class="circle circle-two"></div>
          </div>
          <div class="theme-btn-container"></div>
        </section>
      );
    }
    return (<div />);
  }
  // event-handlers
  btnLoginClick(e) {
    e.preventDefault();
    const username = this.state.txtUsername;
    const password = this.state.txtPassword;
    if (username && password) {
      const account = { username: username, password: password };
      this.apiLogin(account);
    } else {
      alert('Please input username and password');
    }
  }
  // apis
  apiLogin(account) {
    axios.post('/api/admin/login', account).then((res) => {
      const result = res.data;
      if (result.success === true) {
        this.context.setToken(result.token);
        this.context.setUsername(account.username);
      } else {
        alert(result.message = "INVALID ACCOUNT!");
      }
    });
  }
}
export default Login;