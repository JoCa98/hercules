import React, { Component } from 'react';
import axios from "axios";
import { Route, withRouter } from 'react-router-dom';

class TablePhysicalInfo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            physicalInfo: [{}],
            partyID: 0
        };

        this.rowEvent = this.rowEvent.bind(this);
        this.getUserPhysicalInfo = this.getUserPhysicalInfo.bind(this);
    }

    componentDidMount() {
        sessionStorage.removeItem('dateLastRegistry');
        var value = "";
        if(sessionStorage.getItem('userTypeID') == 1 || sessionStorage.getItem('userTypeID') == 2){
            
            this.setState({
                partyID: sessionStorage.getItem('partyID')
            })
            value = sessionStorage.getItem('partyID');
        }else if(sessionStorage.getItem('userTypeID') == 3 || sessionStorage.getItem('userTypeID') == 4){
            this.setState({
                partyID: sessionStorage.getItem('userPartyID')
            })
            value = sessionStorage.getItem('userPartyID');
        }

        this.getUserPhysicalInfo(value);
    }

    /**
     * Method that brings the list of pshusical information by id
     * and loads them to physicalInfo
     */
    getUserPhysicalInfo(value) {
        
        try {
            axios.get(`http://localhost:9000/PhysicalInfo/getPhysicalInfoByID`,
                { params: { partyID:  value} }).then(response => {
                    const physicalInfo = response.data[0];
                    this.setState({ physicalInfo });
                });
        } catch (err) {
            console.error(err);
        }
    }


    rowEvent() {
        this.props.history.push('/EditPhysicalInfo');
    }

    render() {
        const physicalInfoListVisual = this.state.physicalInfo.map((physicalInfo, i) => {
            if (i == 0 && sessionStorage.getItem('userTypeID') == 4) {
                sessionStorage.setItem('dateLastRegistry', physicalInfo.regDate);
                return (
                    <tr className="pointer" onClick={this.rowEvent} key={i}>
                        <td>{physicalInfo.regDate}</td>
                        <td>{physicalInfo.weight}</td>
                        <td>{physicalInfo.totalBody_Fat}</td>
                        <td>{physicalInfo.bodyWater}</td>
                        <td>{physicalInfo.totalMuscle_Mass}</td>
                        <td>{physicalInfo.physicalAssessment}</td>
                        <td>{physicalInfo.boneMass}</td>
                        <td>{physicalInfo.DCI}</td>
                        <td>{physicalInfo.metabolicAge}</td>
                        <td>{physicalInfo.visceralFat}</td>
                    </tr>
                )

            } else {
                return (
                    <tr key={i}>
                        <td>{physicalInfo.regDate}</td>
                        <td>{physicalInfo.weight}</td>
                        <td>{physicalInfo.totalBody_Fat}</td>
                        <td>{physicalInfo.bodyWater}</td>
                        <td>{physicalInfo.totalMuscle_Mass}</td>
                        <td>{physicalInfo.physicalAssessment}</td>
                        <td>{physicalInfo.boneMass}</td>
                        <td>{physicalInfo.DCI}</td>
                        <td>{physicalInfo.metabolicAge}</td>
                        <td>{physicalInfo.visceralFat}</td>
                    </tr>
                )
            }

        })
        return (
            <div className="table-responsive">
                <table className="table table-sm table-hover table-bordered" id="physicalInfoTable">
                    <thead>
                        <tr>
                            <th scope="col" className="align-middle">Fecha</th>
                            <th scope="col" className="align-middle">Peso(kg)</th>
                            <th scope="col" className="align-middle">% Grasa Corporal</th>
                            <th scope="col" className="align-middle">% Agua Corporal</th>
                            <th scope="col" className="align-middle">Masa Muscular</th>
                            <th scope="col" className="align-middle">Valoración Física</th>
                            <th scope="col" className="align-middle">Masa Ósea</th>
                            <th scope="col" className="align-middle">DCI/BMR</th>
                            <th scope="col" className="align-middle">Edad Metabólica</th>
                            <th scope="col" className="align-middle">Grasa Visceral</th>
                        </tr>
                    </thead>
                    <tbody>
                        {physicalInfoListVisual}
                    </tbody>
                </table>
            </div>
        )
    }
}
export default withRouter(TablePhysicalInfo);