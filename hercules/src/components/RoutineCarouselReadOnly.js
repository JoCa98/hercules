import React, { Component } from 'react';
import leftArrowImage from '../appImage/leftArrow.svg';
import rightArrowImage from '../appImage/rightArrow.svg';
import axios from "axios";
import Select from "react-select";



class RoutineCarouselReadOnly extends Component {

    constructor(props) {
        super(props);
        this.state = {
            exerciseType: [{}],
            exercise:[{}],
            typeID: 1,
            id: 1,
            name: "Tipo de ejercicio",
            lastExerciseType: [{}],
            lastTypeID: ""
        };
        this.exerciseTypeSelect = this.exerciseTypeSelect.bind(this);
        this.rigthArrow = this.rigthArrow.bind(this);
        this.getExerciseData = this.getExerciseData.bind(this);
        this.leftArrow = this.leftArrow.bind(this);
    }

    componentDidMount() {
        axios.get(`http://localhost:9000/RoutineRoute/getExerciseType`).then(response => {
            this.state.exerciseType = response.data;
            this.setState({ exerciseType: response.data });
        });

       axios.get(`http://localhost:9000/RoutineRoute/getLastType`).then(response => {
            this.state.lastTypeID = response.data[0];
            this.setState({lastTypeID: response.data[0]});
        })

        this.getExerciseData();
    }

    rigthArrow(){
       if(this.state.typeID == this.state.lastTypeID.exerciseTypeID){
       
        this.state.typeID = 1;
        this.setState({typeID: 1}); 
       } else {
        const value = parseInt(this.state.typeID) + 1;
        this.state.typeID = value;
        this.setState({typeID: value});
       
       }
       this.getExerciseData();
       console.log(this.state.typeID);
    }

    leftArrow(){
        if(this.state.typeID == 1){
        
         this.state.typeID = this.state.lastTypeID.exerciseTypeID;
         this.setState({typeID: this.state.lastTypeID.exerciseTypeID}); 
        } else {
            const value = parseInt(this.state.typeID)  - 1;
            this.state.typeID = value;
            this.setState({typeID: value});
        }
        this.getExerciseData();
     
     }

    exerciseTypeSelect(event){
        this.state.typeID = event.target.value;
        this.setState({ typeID: event.target.value});
        console.log(this.state.typeID);
        this.getExerciseData();
    }

    getExerciseData(){
        axios.get(`http://localhost:9000/RoutineRoute/getExercise`, {
            params: {
               routineID: this.state.id,
               id: this.state.typeID
               }
            }).then(response => {
              this.state.exercise = response.data[0];
             this.setState({ exercise: response.data[0]});
            });
    }


    

    render() {
        const exerciseVisual = this.state.exercise.map((exercise,i) => {
            return(
                <tr className="pointer" key={i}>
                    <td>{exercise.description}</td>
                    <td>{exercise.charge}</td>
                    <td>{exercise.series}</td>
                    <td>{exercise.repetitions}</td>
                    <td>{exercise.minutes}</td>
                </tr>
            )
        })
        const exerciseList = this.state.exerciseType.map((exercises, i) => {
            return (
                <option value={exercises.exerciseTypeID} key={i}>{exercises.description} </option>
            )
        })
        return (
            <div className="container card">
                <div className="row mt-4">
                    <div className="col-2 col-md-4">
                        <img src={leftArrowImage} className="buttonSizeGeneral" onClick={this.leftArrow}/>
                    </div>
                    <div className="col-8 col-md-4">
                    <select name="exerciseSelect" className="form-control" onChange={this.exerciseTypeSelect} value={this.state.typeID} >
                             {exerciseList}             
                    </select>
                        
                    </div>
                    <div className="col-2 col-md-4">
                        <img src={rightArrowImage} className="buttonSizeGeneral" onClick={this.rigthArrow}/>
                    </div>
                </div>
                <div className="row mt-4">
                    <div className="col-12">
                        <div className="table-responsive">
                            <table className="table tabe-sm table-hover"> 
                                <thead>
                                    <tr>
                                        <th scope="col">Ejercicio</th>
                                        <th scope="col">Carga/Peso</th>
                                        <th scope="col">Series</th>
                                        <th scope="col">Repeticiones</th>
                                        <th scope="col">Minutos</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {exerciseVisual}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default RoutineCarouselReadOnly;