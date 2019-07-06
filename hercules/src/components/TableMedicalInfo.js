import React, { Component } from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table-next';
import axios from 'axios';

class TableMedicalInfo extends Component {
    constructor(props) {
        super(props);
        this.state = { medicalInfo: [{}], id: 1 };
        this.getMedicalInfoHist = this.getMedicalInfoHist.bind(this);

    }

    async getMedicalInfoHist() {
        try {
            const response = await axios.get("http://localhost:9000/MedicalInfo/getMedicalInfoHist", {
                params: { 'id': this.id }
            }).then(response => {
                this.state.medicalInfo = response.data;
                this.setState({ medicalInfo: response.data });
            });
        } catch (err) {
            console.error(err);
        }
    }

    componentDidMount() {
        this.getMedicalInfoHist();
    }

    render() {
        return (
            <div className="container">
                <div className="row card mt-4 p-5">
                    <div className="col-12">

                        <BootstrapTable data={this.state.medicalInfo}>
                            <TableHeaderColumn dataField="date">Fecha</TableHeaderColumn>
                        </BootstrapTable>

                    </div>
                </div>
            </div>
        );
    }
}

export default TableMedicalInfo;
