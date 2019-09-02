import React, { Component } from 'react';

class UserHomeWithOut extends Component {
    render() {
        return (
            <div className="container">
                <div className="row mt-4">
                    <div className="col-12 card p-5">
                    <h1 className="text-left colorBlue mb-4">Rutina actual</h1>
                    <div className="row">
                            <div className="col-12 ">
                                <div className="row">
                                    <div className="col-12">
                                        <label font-size="18px">Aún no cuenta con una rutina.</label>
                                        <br />
                                        <label font-size="18px">Diríjase a la oficina de deporte y recreación para que le asignen una.</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default UserHomeWithOut;