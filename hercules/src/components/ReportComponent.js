
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ReportComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            variable: sessionStorage.getItem('report'),
            list: [{}],
            optionList:[{}]
        }        
        this.typeOfReport = this.typeOfReport.bind(this);
        this.statusReport = this.statusReport.bind(this);
        this.statusDropDown = this.statusDropDown.bind(this);
    }

    typeOfReport(){
        switch(variable){
            case 1: 
                this.statusDropDown();
                break;
            case 2:
                break;
            case 3:
                break;
            case 4:
                break;
            case 5:
                break;
        }
    }

    statusDropDown(){
      this.state.optionList.push({description: "Activo", value: 1});
      this.state.optionList.push({description: "Inactivo", value:0});
    }

    statusReport(){
        try {
            axios.get(`http://localhost:9000/ReportsRoute/userStatusReport`,
                {
                    params: { status: variable }
                }).then(response => {
                    const list = response.data[0];
                    this.setState({ list });
                });
        } catch (err) {
            console.error("Un error inesperado ha ocurrido");
        }
    }


    render() {

        const statusList = this.state.optionList.map((option, i) => {
            return (
                <option value={option.value} key={i}>{option.description} </option>
            )
        })
        return(
            <div className="container">
                <div className="row mt-4">
                    <Breadcrumb>
                        <Breadcrumb.Item href="#/HomeAdmin">Inicio</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <div className="row mt-2">
                    <div className="col-12 card p-5">
                        <div className="row">
                            <h1 className="text-left colorBlue mb-4"></h1>
                        </div>
                    </div>
            </div>
        );
    }
}


export default ReportComponent;