import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const CoasterForm = () => {
    const { uuid } = useParams();  // Pobieramy parametr 'uuid' z URL
    const [coaster, setCoaster] = useState({
        numberOfClient: "",
        numberOfStaff: "",
        routeLength: "",
        timeStart: "",
        timeEnd: "",
        errorMessage: '',
        successMessage: ''
    });

    useEffect(() => {
        if (uuid) {
            // Jeśli uuid jest dostępne, załaduj dane edytowanego coastera
            axios.get(`/api/coasters/${uuid}`)
                .then(response => {
                    setCoaster({
                        numberOfClient: response.data.numberOfClient,
                        numberOfStaff: response.data.numberOfStaff,
                        routeLength: response.data.routeLength,
                        timeStart: response.data.timeStart,
                        timeEnd: response.data.timeEnd,
                        errorMessage: '',
                        successMessage: ''
                    });
                })
                .catch(error => {
                    setCoaster({
                        ...coaster,
                        errorMessage: 'Error fetching data',
                    });
                });
        }
    }, [uuid]);

    const onClickSave = () => {
        const baseUrl = "/api/coasters";
        const formData = new FormData();
        formData.append('number_of_client', parseInt(coaster.numberOfClient));
        formData.append('number_of_staff', parseInt(coaster.numberOfStaff));
        formData.append('route_lenght', parseInt(coaster.routeLength));
        formData.append('time_start', coaster.timeStart);
        formData.append('time_end', coaster.timeEnd);

        axios.post(baseUrl, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        })
            .then(response => {
                setCoaster({
                    numberOfClient: '',
                    numberOfStaff: '',
                    routeLength: '',
                    timeStart: '',
                    timeEnd: '',
                    successMessage: 'Form submitted successfully!',
                    errorMessage: '',
                });
            })
            .catch(error => {
                setCoaster({
                    ...coaster,
                    successMessage: '',
                    errorMessage: 'An error occurred. Please try again.',
                });
            });
    };

    const onClickUpdate = () => {
        const baseUrl = "/api/coasters/"+ uuid;

        console.log(coaster);

        const datapost = {
            'number_of_client' : parseInt(coaster.numberOfClient),
            'number_of_staff' : parseInt(coaster.numberOfStaff),
            'route_lenght' : parseInt(coaster.routeLength),
            'time_start' : coaster.timeStart,
            'time_end' : coaster.timeEnd
        }

        axios.put(baseUrl, datapost)
            .then(response => {
                setCoaster({
                    successMessage: 'Form submitted successfully!',
                    errorMessage: '',
                });
            })
            .catch(error => {
                setCoaster({
                    ...coaster,
                    successMessage: '',
                    errorMessage: 'An error occurred. Please try again.',
                });
            });
    };

    return (
        <div>
            <h4>{uuid ? 'Edit coaster' : 'Create new coaster'}</h4>
            <hr />

            {coaster.errorMessage && (
                <div className="alert alert-danger" role="alert">
                    {coaster.errorMessage}
                </div>
            )}

            {coaster.successMessage && (
                <div className="alert alert-success" role="alert">
                    {coaster.successMessage}
                </div>
            )}

            <div className="row">
                <div className="col-md-6 mb-3">
                    <label htmlFor="clients">No. client</label>
                    <input
                        required
                        type="text"
                        className="form-control"
                        placeholder="No. client"
                        value={coaster.numberOfClient}
                        onChange={(e) => setCoaster({ ...coaster, numberOfClient: e.target.value })}
                    />
                </div>
            </div>

            <div className="row">
                <div className="col-md-6 mb-3">
                    <label htmlFor="stuff">No. stuff</label>
                    <input
                        required
                        type="text"
                        className="form-control"
                        placeholder="No. stuff"
                        value={coaster.numberOfStaff}
                        onChange={(e) => setCoaster({ ...coaster, numberOfStaff: e.target.value })}
                    />
                </div>
            </div>

            <div className="row">
                <div className="col-md-6 mb-3">
                    <label htmlFor="length">Route length</label>
                    <input
                        required
                        type="text"
                        className="form-control"
                        placeholder="Route length"
                        value={coaster.routeLength}
                        disabled={!!uuid}
                        onChange={(e) => setCoaster({ ...coaster, routeLength: e.target.value })}
                    />
                </div>
            </div>

            <div className="row">
                <div className="col-md-6 mb-3">
                    <label htmlFor="timeStart">Time start </label>
                    <input
                        required
                        type="time"
                        className="form-control"
                        min="06:00"
                        max="23:00"
                        value={coaster.timeStart}
                        onChange={(e) => setCoaster({ ...coaster, timeStart: e.target.value })}
                    />
                </div>
            </div>

            <div className="row">
                <div className="col-md-6 mb-3">
                    <label htmlFor="timeEnd">Time end </label>
                    <input
                        required
                        type="time"
                        className="form-control"
                        min="06:00"
                        max="23:00"
                        value={coaster.timeEnd}
                        onChange={(e) => setCoaster({ ...coaster, timeEnd: e.target.value })}
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

export default CoasterForm;
