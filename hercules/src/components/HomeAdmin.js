import React, { Component } from 'react';
import axios from "axios";

class HomeAdmin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userList: [{}]
        };

        this.getUserList = this.getUserList.bind(this);
        this.redirect = this.redirect.bind(this);
    }

    componentDidMount() {
        this.getUserList();
    }

    getUserList() {
        try {
            axios.get(`http://localhost:9000/AdminRoute/getUsersByCarnet`).then(response => {
                console.error(response.data);
                const userList = response.data[0];
                this.setState({ userList });
            });
        } catch (err) {
            console.error(err);
        }
    }
    redirect(event) {
        try {
            alert(document.getElementById("myTable").rows[event.target.cellIndex].cells[0].innerHTML);
        } catch (err) {
            console.error(err);
        }
    }

    render() {
        const userListVisual = this.state.userList.map((userList, i) => {
            return (
                <tr className="pointer" onClick={this.redirect} key={i}>
                    <td className="diplayNone">{userList.partyID}</td>
                    <th scope="row">{userList.identificationID}</th>
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
                                <select className="form-control">
                                    <option>Carnet</option>
                                    <option>Nombre</option>
                                    <option>Cedula</option>
                                </select>
                            </div>
                            <div className="col-5">
                                <input type="text" className="w-100 inputText" placeholder="Buscar"></input>
                                <i className="fas fa-search" aria-hidden="true"></i>
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
                                    <th scope="col" className="diplayNone">PartyID</th>
                                    <th scope="col">Cedula</th>
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