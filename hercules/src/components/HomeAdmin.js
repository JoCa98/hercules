import React, { Component } from 'react';
import axios from "axios";

class HomeAdmin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userList: [{}],
            searchType: '5',
            searchInput:'Hola'
        };

        this.getUserList = this.getUserList.bind(this);
        this.rowEvent = this.rowEvent.bind(this);
        this.handleInput = this.handleInput.bind(this);
    }

    componentDidMount() {
        this.getUserList();
    }

    getUserList() {
        try {
            axios.get(`http://localhost:9000/AdminRoute/getUsersByCarnet`).then(response => {
                const userList = response.data[0];
                this.setState({ userList });
            });
        } catch (err) {
            console.error(err);
        }
    }

    handleInput(e) {
        const { value, name } = e.target;
        this.setState({
            [name]: value
        })
    }

    rowEvent(event) {
        try {
            alert(document.getElementById("myTable").rows[event.target.parentNode.rowIndex].cells[0].innerHTML);
        } catch (err) {
            console.error(err);
        }
    }

    render() {
        const userListVisual = this.state.userList.map((userList, i) => {
            return (
                <tr className="pointer" onClick={this.rowEvent} key={i}>
                    <td className="diplayNone">{userList.partyID}</td>
                    <td>{userList.identificationID}</td>
                    <td>{userList.fullName}</td>
                    <td>{userList.carnet}</td>
                </tr>
            )
        })
        return (
            <div className="container">
                <div className="row card mt-4 p-5">
                    <div className="col-12">
                        <h1 className="text-left colorBlue">Lista de usuarios</h1>
                        <div className="row">
                            <div className="col-2 offset-1">
                                <select className="form-control"
                                 name="searchType"
                                 onChange={this.handleInput}>
                                    <option value="0">Carnet</option>
                                    <option value="1">Nombre</option>
                                    <option value="2">Cedula</option>
                                </select>
                            </div>
                            <div className="col-5">
                                <input 
                                type="text"
                                name="searchInput" 
                                onChange={this.handleInput}
                                className="w-100 inputText" 
                                placeholder="Buscar"
                                >
                                </input>
                            </div>
                            <div className="col-2">
                                <button className="buttonSizeGeneral">Buscar</button>
                            </div>
                        </div>
                    </div>
                    <div className="col-9 offset-1 mt-4">
                        <table className="table table-sm table-hover" id="myTable">
                            <thead>
                                <tr>
                                    <th scope="col">Cédula</th>
                                    <th scope="col">Nombre</th>
                                    <th scope="col">Carnet</th>
                                </tr>
                            </thead>
                            <tbody>
                                {userListVisual}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}

export default HomeAdmin;