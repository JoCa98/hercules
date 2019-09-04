import React, { Component } from 'react';
import plusImage from '../appImage/plusImage.svg';
import TablePhysicalInfo from './TablePhysicalInfo';
import axios from "axios";

class HistoricPhysicalInfoAdmin extends Component {

    constructor(props) {
        super(props);
        /**
        * userName
        * @type {String}
        * Property that contains the name of the user
        * partyID
        * @type {Integer}
        * Property that contains the id of the user
        */
        this.state = {
            userName: [{}],
            partyID: sessionStorage.getItem("userPartyID"),
        }

        this.redirect = this.redirect.bind(this);
        this.backButton = this.backButton.bind(this);
    }

    componentDidMount() {
        try {
            axios.get(`http://localhost:9000/User/getUserName`,
                {
                    params: { partyID: this.state.partyID }
                }).then(response => {
                    const userName = response.data[0];
                    this.setState({ userName });
                });
        } catch (err) {
            console.error(err);
        }
    }

    redirect() {
        if (sessionStorage.getItem('dateLastRegistry') !== 'undefined' &&
        sessionStorage.getItem('dateLastRegistry') !== null && 
            new Date(sessionStorage.getItem('dateLastRegistry')) === Date(new Date().getFullYear() + "/" + (new Date().getMonth() + 1) + "/" + new Date().getDate())) {
            alert("Solo se puede agregar un registro por día.");
            console.log(new Date(sessionStorage.getItem('dateLastRegistry')));
            console.log(Date(new Date().getFullYear() + "/" + (new Date().getMonth() + 1) + "/" + new Date().getDate()));

            
        } else {
            this.props.history.push(`/AddPhysicalInfo`);

        }
    }


    /**
    * Method that redirect to the previous page
    */
    backButton() {
        this.props.history.push(`/ConsultUser`);
    }

    render() {
        const name = this.state.userName.map((userName, i) => {
            return (
                <label className="form-label" key={i} >Usuario: {userName.fullName}</label>
            )
        })
        return (
            <div className="container">
                <div className="row card mt-4 p-5">
                    <div className="col-12">
                        <h1 className="text-left colorBlue">Composición Corporal</h1>
                        <div className="row">
                            <div className="col-4 offset-1 text-center">
                                {name}
                            </div>
                            <div className="col-4 offset-1 text-center">
                                <img src={plusImage} onClick={this.redirect} className="buttonSizeGeneral pointer" />
                                <h4 className="colorBlue pointer" onClick={this.redirect}>Agregar nuevo</h4>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 mt-4 text-center">
                        <TablePhysicalInfo />
                    </div>
                    <div className="row">
                        <div className=" mt-4 col-md-8">
                            <button align="left" className="buttonSizeGeneral" onClick={this.backButton}>Volver</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default HistoricPhysicalInfoAdmin;