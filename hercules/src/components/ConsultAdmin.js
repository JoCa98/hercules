import React, { Component } from 'react';
import axios from 'axios';
import validations from './validations';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import ModalComponent from './ModalComponent';
import PermissionsManager from "./PermissionsManager";

class MedicalPersonalList extends Component {
    constructor(props) {
        super(props);
        /**
        *userTypeList:
        * @type {Array}
        * Property that stores the list of type of users that comes from the database
        * 
        * userTypeID:
        * @type {integer}
        * Property that indicates the type of user and his behavior in the web site
        */

        this.state = {
            permissionsManager: new PermissionsManager(),
            validations: new validations(),
            userTypeID: "3",
            partyID: sessionStorage.getItem("userPartyID"),
            show: false,
            isExit: false
        };

        this.healthServicePersonal = this.healthServicePersonal.bind(this);
        this.sportsPersonal = this.sportsPersonal.bind(this);
        this.adminsList = this.adminsList.bind(this);

    }

    componentDidMount() {
        /* if (this.state.permissionsManager.validatePermission(this.props.location.pathname, this)) {*/
        window.scrollTo(0, 0);
        /*}*/
    }


    activateGymPersonalMethod() {
        try {
            axios.get(`http://localhost:9000/ConfigurationRoute/changeUserStatus`,
            { params: { email: this.state.searchInput ,status: 1} }).then(response => {
            });
        } catch (err) {
            console.error("Un error inesperado ha ocurrido");
        }
    }

    deactivateGymPersonalMethod() {
        try {
            axios.get(`http://localhost:9000/ConfigurationRoute/changeUserStatus`,
            { params: { email: this.state.searchInput ,status: 0} }).then(response => {
            });
        } catch (err) {
            console.error("Un error inesperado ha ocurrido");
        }
    }

    /**
    * Method that redirect to the requested page
    */

    /*
    healthServicePersonal() {
        this.props.history.push(`/HealthPersonal`);
    }

    sportsPersonal() {
        this.props.history.push(`/SportsPersonal`);
    }
    
    adminsList() {
        this.props.history.push(`/AdminsList`);
    }
    */
}