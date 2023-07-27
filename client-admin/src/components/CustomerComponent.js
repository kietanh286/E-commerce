import axios from 'axios';
import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';
import './css/main.css'
import { Card } from 'antd';
class Customer extends Component {
    static contextType = MyContext; // using this.context to access global state
    constructor(props) {
        super(props);
        this.state = {
            customers: [],
            orders: [],
            order: null
        };
    }
    render() {
        const customers = this.state.customers.map((item) => {
            return (
                <tr key={item._id} className="datatable" onClick={() => this.trCustomerClick(item)}>
                    <td>{item._id}</td>
                    <td>{item.username}</td>
                    <td>{item.password}</td>
                    <td>{item.name}</td>
                    <td>{item.phone}</td>
                    <td>{item.email}</td>
                    <td>{item.active}</td>
                    <td>
                        {item.active === 0 ?
                            <span className="link" onClick={() => this.lnkEmailClick(item)}>EMAIL</span>
                            :
                            <span className="link" onClick={() => this.lnkDeactiveClick(item)}>DEACTIVE</span>}                    </td>
                </tr>
            );
        });
        const orders = this.state.orders.map((item) => {
            return (
                <tr key={item._id} className="datatable" onClick={() => this.trOrderClick(item)}>
                    <td>{item._id}</td>
                    <td>{new Date(item.cdate).toLocaleString()}</td>
                    <td>{item.customer.name}</td>
                    <td>{item.customer.phone}</td>
                    <td>{item.total}</td>
                    <td>{item.status}</td>
                </tr>
            );
        });
        if (this.state.order) {
            var items = this.state.order.items.map((item, index) => {
                return (
                    <tr key={item.product._id} className="datatable">
                        <td>{index + 1}</td>
                        <td>{item.product._id}</td>
                        <td>{item.product.name}</td>
                        <td><img src={"data:image/jpg;base64," + item.product.image} width="70px" height="70px" alt="" /></td>
                        <td>{item.product.price}</td>
                        <td>{item.quantity}</td>
                        <td>{item.product.price * item.quantity}</td>
                    </tr>
                );
            });
        }
        return (
            <div>
                <Card><div className="align-center">
                    <h2 className="text-center">CUSTOMER LIST</h2>
                    <table className="datatable" border="1">
                        <tbody>
                            <tr className="datatable">
                                <th><Card>ID</Card></th>
                                <th><Card>Username</Card></th>
                                <th><Card>Password</Card></th>
                                <th><Card>Name</Card></th>
                                <th><Card>Phone</Card></th>
                                <th><Card>Email</Card></th>
                                <th><Card>Active</Card></th>
                                <th><Card>Action</Card></th>

                            </tr>
                            {customers}
                        </tbody>
                    </table>
                </div></Card>
                {this.state.orders.length > 0 ?
                    <Card><div className="align-center">
                        <h2 className="text-center">ORDER LIST</h2>
                        <table className="datatable" border="1">
                            <tbody>
                                <tr className="datatable">
                                    <th><Card>ID</Card></th>
                                    <th><Card>Creation date</Card></th>
                                    <th><Card>Cust.name</Card></th>
                                    <th><Card>Cust.phone</Card></th>
                                    <th><Card>Total</Card></th>
                                    <th><Card>Email</Card></th>
                                    <th><Card>Status</Card></th>
                                </tr>
                                {orders}
                            </tbody>
                        </table>
                    </div></Card>
                    : <div />}
                {this.state.order ?
                    <div className="align-center">
                        <Card><h2 className="text-center">ORDER DETAIL</h2></Card>
                        <table className="datatable" border="1">
                            <Card><tbody>
                                <tr className="datatable">
                                    <th><Card>No.</Card></th>
                                    <th><Card>Prod.ID</Card></th>
                                    <th><Card>Prod.name</Card></th>
                                    <th><Card>Image</Card></th>
                                    <th><Card>Price</Card></th>
                                    <th><Card>Quantity</Card></th>
                                    <th><Card>Amount</Card></th>
                                </tr>
                                {items}
                            </tbody></Card>
                        </table>
                    </div>
                    : <div />}
            </div>
        );
    }
    componentDidMount() {
        this.apiGetCustomers();
    }
    // event-handlers
    trCustomerClick(item) {
        this.setState({ orders: [], order: null });
        this.apiGetOrdersByCustID(item._id);
    }
    trOrderClick(item) {
        this.setState({ order: item });
    }
    lnkDeactiveClick(item) {
        this.apiPutCustomerDeactive(item._id, item.token);
    }
    lnkEmailClick(item) {
        this.apiGetCustomerSendmail(item._id);
    }
    // apis
    apiGetCustomers() {
        const config = { headers: { 'x-access-token': this.context.token } };
        axios.get('/api/admin/customers', config).then((res) => {
            const result = res.data;
            this.setState({ customers: result });
        });
    }
    apiGetOrdersByCustID(cid) {
        const config = { headers: { 'x-access-token': this.context.token } };
        axios.get('/api/admin/orders/customer/' + cid, config).then((res) => {
            const result = res.data;
            this.setState({ orders: result });
        });
    }
    apiPutCustomerDeactive(id, token) {
        const body = { token: token };
        const config = { headers: { 'x-access-token': this.context.token } };
        axios.put('/api/admin/customers/deactive/' + id, body, config).then((res) => {
            const result = res.data;
            if (result) {
                this.apiGetCustomers();
            } else {
                alert('SORRY BABY!');
            }
        });
    }
    apiGetCustomerSendmail(id) {
        const config = { headers: { 'x-access-token': this.context.token } };
        axios.get('/api/admin/customers/sendmail/' + id, config).then((res) => {
            const result = res.data;
            alert(result.message);
        });
    }
}
export default Customer;