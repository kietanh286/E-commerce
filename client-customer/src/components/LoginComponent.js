import axios from 'axios';
import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';
import withRouter from '../utils/withRouter';
import './app.css'
import './script.js'
import { Button, Card, Input } from 'antd';
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
    return (
      <div className="align-center">
        <Card title='LOGIN'></Card>
        <form>
          <table className="align-center">
            <Card hoverable><tbody>
              <tr>
                <td>Username:</td>
                <td><Input type='text' value={this.state.txtUsername} onChange={(e) => { this.setState({ txtUsername: e.target.value }) }}></Input></td>
              </tr>
              <tr>
                <td>Password:</td>
                <td><Input type='password' value={this.state.txtPassword} onChange={(e) => { this.setState({ txtPassword: e.target.value }) }}></Input></td>
              </tr>
            </tbody>
              <Button width='20px' margin='20px' font-size='15px' danger onClick={(e) => this.btnLoginClick(e)}>Login</Button>
            </Card>
          </table>
        </form>
      </div>
    );
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
    axios.post('/api/customer/login', account).then((res) => {
      const result = res.data;
      if (result.success === true) {
        this.context.setToken(result.token);
        this.context.setCustomer(result.customer);
        this.props.navigate('/home');
      } else {
        alert(result.message);
      }
    });
  }
}
export default withRouter(Login);