import React, { Component } from 'react';
import axios from "axios"
import { Link } from "react-router-dom";

export default class CoasterList extends Component {
    constructor()
    {
        super()
        this.state = {
            listCoaster: [],
            errorMessage: '',
            successMessage: ''
        }
    }
    componentDidMount()
    {
        axios.get("/api/coasters")
            .then(response=>{
                this.setState({
                    listCoaster: Object.values(response.data)
                })
            })
            .catch(error=>{
                alert("Error ==>"+error)
            })
    }
    render() {
        const { errorMessage, successMessage } = this.state;

        return (
            <section>
                <h4>List coasters</h4>
                <hr/>

                {/* Komunikat o błędzie */}
                {errorMessage && (
                    <div className="alert alert-danger" role="alert">
                        {errorMessage}
                    </div>
                )}

                {/* Komunikat o sukcesie */}
                {successMessage && (
                    <div className="alert alert-success" role="alert">
                        {successMessage}
                    </div>
                )}

                <table className="table">
                    <thead className="thead-dark">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">No. client</th>
                        <th scope="col">No. stuff</th>
                        <th scope="col">Route length</th>
                        <th scope="col">Time start</th>
                        <th scope="col">Time end</th>
                        <th scope="col">Wagons count</th>
                        <th scope="col">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.listCoaster.length === 0
                            ? <tr><td colSpan="8">No data available</td></tr>
                            : this.state.listCoaster.map((data) => {
                                return(
                                    <tr key={data.uuid}>
                                        <th scope="row">{data.uuid}</th>
                                        <td>{data.numberOfClient}</td>
                                        <td>{data.numberOfStaff}</td>
                                        <td>{data.routeLength}</td>
                                        <td>{data.timeStart}</td>
                                        <td>{data.timeEnd}</td>
                                        <td>{Object.values(data.wagons).length}</td>
                                        <td>
                                            <Link className="btn btn-sm btn-primary mr-2" to={"/coasters/"+ data.uuid}>Show</Link>
                                            <Link className="btn btn-sm btn-primary mr-2" to={"/coasters/"+ data.uuid +"/edit"}>Edit</Link>
                                            <Link className="btn btn-sm btn-primary mr-2" to={"/coasters/"+ data.uuid+"/create-wagon"}>Add wagon</Link>
                                            <a href="#" className="btn btn-sm btn-danger" onClick={()=>this.onClickDelete(data.uuid)}>Delete</a>
                                        </td>
                                    </tr>
                                )
                            })
                    }
                    </tbody>
                </table>
            </section>
        )
    }
    onClickDelete(uuid)
    {
        const isConfirmed = window.confirm("Czy na pewno chcesz usunąć ten wpis?");

        if (isConfirmed) {
            axios.delete("/api/coasters/" + uuid)
                .then(response => {
                    this.setState(prevState => ({
                        listCoaster: prevState.listCoaster.filter(coaster => coaster.uuid !== uuid),
                        successMessage: 'Coaster was successfully deleted!',
                        errorMessage: '',
                    }));
                })
                .catch(error => {
                    this.setState({
                        successMessage: '',
                        errorMessage: 'Coaster was not successfully deleted!',
                    });
                })
        }
    }
}