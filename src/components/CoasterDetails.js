import React, { useState, useEffect } from 'react';
import axios from "axios";
import {Link, useParams} from "react-router-dom";

const CoasterDetails = () => {
    const [coaster, setCoaster] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    // Pobranie uuid z paramsów URL
    const { uuid } = useParams();

    useEffect(() => {
        axios.get(`/api/coasters/${uuid}`)
            .then(response => {
                response.data.wagons = Object.values(response.data.wagons)
                setCoaster(response.data);
            })
            .catch(error => {
                alert("Error ==> " + error);
            });
    }, [uuid]);

    if (!coaster) {
        return <div>Loading...</div>;
    }

    const onClickDelete = (coasterUuid, uuid) => {
        const isConfirmed = window.confirm("Czy na pewno chcesz usunąć ten wagon?");

        if (isConfirmed) {
            axios.delete(`/api/coasters/${coasterUuid}/wagons/${uuid}`)
                .then(response => {
                    setCoaster(prevCoaster => ({
                        ...prevCoaster,
                        wagons: prevCoaster.wagons.filter(wagon => wagon.uuid !== uuid)
                    }));
                    setSuccessMessage('Wagon was successfully deleted!');
                    setErrorMessage('');
                })
                .catch(error => {
                    setSuccessMessage('');
                    setErrorMessage('Wagon was not successfully deleted!');
                });
        }
    };

    const calculateMinutesDifference = (start, end) => {
        const [startHour, startMinute] = start.split(":").map(Number);
        const [endHour, endMinute] = end.split(":").map(Number);

        const startInMinutes = startHour * 60 + startMinute;
        const endInMinutes = endHour * 60 + endMinute;

        return endInMinutes - startInMinutes;
    };

    const divideAndFloor = (num, den) => {
        return Math.floor(num / den);
    };

    const ceil = (num) => {
        if(num == 'Infinity') {
            return 0;
        } else {
            return Math.ceil(num);
        }
    };

    const floor = (num) => {
        if(num == 'Infinity') {
            return 0;
        } else {
            return Math.floor(num);
        }
    };

    const totalPlaces = coaster.wagons.reduce((sum, wagon) => sum + wagon.numberOfPlaces, 0);

    const minSpeed = coaster.wagons.reduce((min, wagon) => {
        return wagon.speed < min ? wagon.speed : min;
    }, Infinity);

    const numberOfTrips = floor(calculateMinutesDifference(coaster.timeStart, coaster.timeEnd) / ceil(coaster.routeLength * 2 / minSpeed / 60 + 5));

    const numberOfServedClients = coaster.wagons.reduce((sum, wagon) => sum + (wagon.numberOfPlaces * numberOfTrips), 0);

    const requiredNumOfStaff = () => {
        if(coaster.wagons && coaster.wagons.length) {
            return coaster.wagons.length * 2 + 1;
        }
        return 0;
    }

    return (
        <section>
            <div className="row">
                <div className="col-6 mt-5">

                    <h4>Coaster details {coaster.uuid}</h4>
                    <hr/>

                    <table className="table">
                        <thead className="thead-dark">
                        <tr>
                            <th scope="col">Option</th>
                            <th scope="col">Value</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <th scope="row">UUID</th>
                            <td>{coaster.uuid}</td>
                        </tr>
                        <tr>
                            <th scope="row">Number of staff</th>
                            <td>
                                {coaster.numberOfStaff}
                                {coaster.numberOfStaff < requiredNumOfStaff() ? (<div><span className="alert-danger">Too small staff</span></div>) : (<span></span>)}
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">Number of clients</th>
                            <td>{coaster.numberOfClient}</td>
                        </tr>
                        <tr>
                            <th scope="row">Route lenght</th>
                            <td>{coaster.routeLength}</td>
                        </tr>
                        <tr>
                            <th scope="row">Time end</th>
                            <td>{coaster.timeStart}</td>
                        </tr>
                        <tr>
                            <th scope="row">Time end</th>
                            <td>{coaster.timeEnd}</td>
                        </tr>
                        </tbody>
                    </table>

                    <div>
                        <Link className="btn btn-sm btn-primary mr-2" to={"/coasters/"+ coaster.uuid+"/edit"}>Edit coaster</Link>
                    </div>
                </div>
                <div className="col-6 mt-5">

                    <h4>Statistics</h4>
                    <hr/>

                    <table className="table">
                        <tbody>
                        <tr>
                            <th scope="row" title="Wymagana liczba personelu">Required number of personnel</th>
                            <td>1p + {coaster.wagons && coaster.wagons.length ? (coaster.wagons.length * 2) : 0}p</td>
                        </tr>
                        <tr>
                            <th scope="row" title="Możliwa liczba wagonów dla wprowadzonej liczby personelu">Possible number of wagons for the entered number of personnel</th>
                            <td>{divideAndFloor((coaster.numberOfStaff - 1), 2)}</td>
                        </tr>
                        <tr>
                            <th scope="row" title="Czas pracy kolejki (w minutach)">Working time of the train (in minutes)</th>
                            <td>{calculateMinutesDifference(coaster.timeStart, coaster.timeEnd)} min.</td>
                        </tr>
                        <tr>
                            <th scope="row" title="Najniższa prędkość wagonika">Lowest speed of the wagon</th>
                            <td>{minSpeed} m/s</td>
                        </tr>
                        <tr>
                            <th scope="row" title="Czas 1 przejazdu (przerwa + 5 min)">Time of 1 journey (+ 5 min break)</th>
                            <td>{ceil(coaster.routeLength * 2 / minSpeed / 60 + 5)} min</td>
                        </tr>
                        <tr>
                            <th scope="row" title="Sumaryczna pojemność wagoników">Total capacity of wagons</th>
                            <td>{totalPlaces} person</td>
                        </tr>
                        <tr>
                            <th scope="row" title="Możliwa liczba wykonanych kursów przez 1 wagonik">Possible number of journeys performed by 1 wagon</th>
                            <td>{numberOfTrips} trips</td>
                        </tr>
                        <tr>
                            <th scope="row" title="Możliwa liczba obsłużonych Klientów (wszystkie wagoniki)">Possible number of served Customers (all wagons)</th>
                            <td>{numberOfServedClients} person</td>
                        </tr>
                        </tbody>
                    </table>

                </div>
                <div className="col-12 mt-5">

                    <h4>Wagons:</h4>
                    <hr/>
                    <table className="table">
                        <thead className="thead-dark">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">No. places</th>
                            <th scope="col">Speed</th>
                            <th scope="col">Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            coaster.wagons && coaster.wagons.length === 0
                                ? <tr><td colSpan="8">No wagons available</td></tr>
                                : coaster.wagons.map((data) => {
                                    return(
                                        <tr key={data.uuid}>
                                            <th scope="row">{data.uuid}</th>
                                            <td>{data.numberOfPlaces}</td>
                                            <td>{data.speed} m/s</td>
                                            <td>
                                                <Link className="btn btn-sm btn-primary mr-2" to={"/coasters/"+ coaster.uuid +"/edit-wagon/"+ data.uuid}>Edit</Link>
                                                <button className="btn btn-sm btn-danger" onClick={() => onClickDelete(coaster.uuid, data.uuid)}>Delete</button>
                                            </td>
                                        </tr>
                                    )
                                })
                        }
                        </tbody>
                    </table>

                    <div>
                        <Link className="btn btn-sm btn-primary mr-2" to={"/coasters/"+ coaster.uuid+"/create-wagon"}>Add new wagon</Link>
                        {
                            coaster.wagons && coaster.wagons.length && coaster.wagons.length == divideAndFloor((coaster.numberOfStaff - 1), 2)
                                ? (<span className="alert alert-danger">Dodano maksymalną liczbę wagoników dla wprowadzonej liczby personelu obsługującego</span>)
                            : ''
                        }
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CoasterDetails;
