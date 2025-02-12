import React, { useState, useEffect } from 'react';
import {Link, useParams} from 'react-router-dom';
import axios from 'axios';

const WagonForm = () => {
    const { coasterUuid, uuid } = useParams();
    const [wagon, setWagon] = useState({
        numberOfPlaces: "",
        speed: "",
        errorMessage: '',
        successMessage: ''
    });

    useEffect(() => {
        if (coasterUuid && uuid) {
            // Jeśli uuid jest dostępne, załaduj dane edytowanego wagonu
            axios.get(`/api/coasters/${coasterUuid}/wagons/${uuid}`)
                .then(response => {
                    setWagon({
                        numberOfPlaces: response.data.numberOfPlaces,
                        speed: response.data.speed,
                        errorMessage: '',
                        successMessage: ''
                    });
                })
                .catch(() => {
                    setWagon({
                        ...wagon,
                        errorMessage: 'Error fetching data',
                    });
                });
        }
    }, [uuid]);

    const onClickSave = () => {
        const baseUrl = '/api/coasters/'+ coasterUuid +'/wagons';

        const formData = new FormData();
        formData.append('number_of_places', parseInt(wagon.numberOfPlaces));
        formData.append('speed', parseFloat(wagon.speed));

        axios.post(baseUrl, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        })
            .then(() => {
                setWagon({
                    numberOfPlaces: '',
                    speed: '',
                    successMessage: 'Form submitted successfully!',
                    errorMessage: '',
                });
            })
            .catch(() => {
                setWagon({
                    ...wagon,
                    successMessage: '',
                    errorMessage: 'An error occurred. Please try again.',
                });
            });
    };

    const onClickUpdate = () => {
        const baseUrl = '/api/coasters/'+ coasterUuid +'/wagons/'+ uuid;

        const datapost = {
            'number_of_places' : parseInt(wagon.numberOfPlaces),
            'speed' : parseFloat(wagon.speed)
        }

        axios.put(baseUrl, datapost)
            .then(() => {
                setWagon({
                    ...wagon,
                    successMessage: 'Form submitted successfully!',
                    errorMessage: '',
                });
            })
            .catch(() => {
                setWagon({
                    ...wagon,
                    successMessage: '',
                    errorMessage: 'An error occurred. Please try again.',
                });
            });
    };

    return (
        <div>

            <div className="row">
                <div className="col-6">
                    <h4>{coasterUuid && uuid ? 'Edit wagon for coaster: ' : 'Create new wagon for coaster: '} {coasterUuid}</h4>
                </div>
                <div className="col-6 text-right">
                    <Link className="btn btn-sm btn-secondary mr-2" to={"/coasters/"+ coasterUuid}>Coaster details</Link>
                    <Link className="btn btn-sm btn-secondary" to={"/coasters/"+ coasterUuid +"/edit"}>Edit coaster</Link>
                </div>
            </div>
            <hr />

            {wagon.errorMessage && (
                <div className="alert alert-danger" role="alert">
                    {wagon.errorMessage}
                </div>
            )}

            {wagon.successMessage && (
                <div className="alert alert-success" role="alert">
                    {wagon.successMessage}
                </div>
            )}

            <div className="row">
                <div className="col-md-6 mb-3">
                    <label htmlFor="places">No. places</label>
                    <input
                        required
                        type="text"
                        className="form-control"
                        placeholder="No. places"
                        value={wagon.numberOfPlaces}
                        onChange={(e) => setWagon({ ...wagon, numberOfPlaces: e.target.value })}
                    />
                </div>
            </div>

            <div className="row">
                <div className="col-md-6 mb-3">
                    <label htmlFor="speed">Speed</label>
                    <input
                        required
                        type="text"
                        className="form-control"
                        placeholder="Speed"
                        value={wagon.speed}
                        onChange={(e) => setWagon({ ...wagon, speed: e.target.value })}
                    />
                </div>
            </div>

            <div className="row">
                <div className="col-md-6 mb-3">
                    <button
                        className="btn btn-primary btn-block"
                        type="submit"
                        onClick={uuid ? onClickUpdate : onClickSave}
                    >
                        {uuid ? 'Update' : 'Save'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default WagonForm;
