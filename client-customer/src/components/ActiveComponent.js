import axios from 'axios';
import React, { Component } from 'react';
import './app.css'
import './script.js'
import { Button, Card, Input } from 'antd';
<div id="top-image"></div>
class Active extends Component {
  constructor(props) {
    super(props);
    this.state = {
      txtID: '',
      txtToken: ''
    };
  }
  render() {
    return (
      <div className="align-center">
        <Card title='ACTIVE ACCOUNT'></Card>
        <form>
          <table className="align-center">
            <Card hoverable><tbody>
              <tr>
                <td>ID</td>
                <td><Input value={this.state.txtID} onChange={(e) => { this.setState({ txtID: e.target.value }) }}></Input></td>
              </tr>
              <tr>
                <td>Token</td>
                <td><Input value={this.state.txtToken} onChange={(e) => { this.setState({ txtToken: e.target.value }) }}></Input></td>
              </tr>
              <tr>
                <td></td>
                <Button width='20px' margin='20px' font-size='15px' danger onClick={(e) => this.btnActiveClick(e)}>ACTIVE</Button>
              </tr>
            </tbody>
            </Card>
          </table>
        </form>
      </div>
    );
  }
  // event-handlers
  btnActiveClick(e) {
    e.preventDefault();
    const id = this.state.txtID;
    const token = this.state.txtToken;
    if (id && token) {
      this.apiActive(id, token);
    } else {
      alert('Please input id and token');
    }
  }
  // apis
  apiActive(id, token) {
    const body = { id: id, token: token };
    axios.post('/api/customer/active', body).then((res) => {
      const result = res.data;
      if (result) {
        alert('SUCCESSFULL!');
      } else {
        alert('SOMETHING WRONG!');
      }
    });
  }
}
export default Active;