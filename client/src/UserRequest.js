import React from "react";

class UserRequest extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            errors: new Set(),
            messages: new Set(),
        };
        let errors = new Set(this.state.errors);
        fetch('/user/request', {
            method: 'get',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
        }).then(response => {
            return response.json();
        }).then(data => {
            if (data.error) {
                errors.add(data.error);
            }
            else {
                this.setState({
                    list: data,
                    errors: errors,
                });
            }
        }).catch(e => {
            errors.add(e);
            this.setState({
                errors: errors,
            });
        });
    }

    acceptRequest = (id, index) => {
        return (action) => {
            console.log(id);
            action.preventDefault();
            fetch('/user/request/accept/' + id, {
                method: 'get',
                headers: {'Content-Type': 'application/json'},
                credentials: 'include',
            }).then(response => {
                return response.json();
            }).then(body => {
                console.log(body);
                const list = this.state.list;
                delete list[index];
                this.setState({list: list});
            }).catch(e => {
                console.log(e.message);
            });
        };
    };



    render() {

        const errors = [];
        this.state.errors.forEach((error)=>{
            errors.push((<li key={error}>{error}</li>));
        });

        const messages = [];
        this.state.messages.forEach((error)=>{
            messages.push((<li key={error}>{error}</li>));
        });
        const that = this;
        // const list  = this.state.list.map(function (data, index) {
        //
        //     return (<li id={data._id} key={data._id}>
        //         <div>
        //             <label>Order ID:</label> {data._id}<br />
        //             <label>Address:</label> {data.address}<br />
        //             <label>Material Type:</label> {data.materialType}<br />
        //             <label>Quantity:</label> {data.quantity}<br />
        //             <form onSubmit={(action) => that.handleSubmit(action, data._id)}>
        //                 <input type={"text"} value={data.status} placeholder={"Status"} name={"status"} onChange={that.handleStatusChange(index)} />
        //                 <input type={"text"} value={data.location} placeholder={"Location"} name={"location"} onChange={that.handleLocationChange(index)} />
        //                 <input type={"text"} value={data.driver.name} placeholder={"Driver Name"} name={"driver.name"} onChange={that.handleDriverNameChange(index)} />
        //                 <input type={"text"} value={data.driver.contact} placeholder={"Driver Contact"} name={"driver.contact"} onChange={that.handleDriverContactChange(index)} />
        //                 <input type={"button"} onClick={that.acceptRequest(data._id, index)} value={"Update"}/>
        //             </form>
        //         </div>
        //     </li>);
        // });

        const list  = this.state.list.map(function (data, index) {
            if (!data.driver) {
                data.driver = {
                    name: '',
                    contact: '',
                }
            }
            if (!data.location) {
                data.location = '';
            }
            return (
                <div className={"card bg-light"} style={{display: "inline-block"}} id={data._id} key={data._id}>
                    <div className={"card-header bg-info"}>
                        <label>User ID: {data._id}</label>
                    </div>
                    <div className={"gap form-control card-body"} align="left">
                        <label>Name: {data.name}</label><br/>
                        <label>Contact Number: {data.contact}</label><br/>
                        <label>Address: {data.address}</label><br/>
                        <label>Email: {data.email}</label><br/>
                        <label>Status: {data.status}</label><br/>
                    </div>
                    <div className={"gap form-control card-footer"} align="left">
                        <form>
                            <button className={"form-control bg-success"}
                                    onClick={that.acceptRequest(data._id, index)}>Accept
                            </button>
                        </form>
                    </div>
                </div>);
        });


        return (
            <div align="center" className={"container-fluid gap"}>
                <div className={"card col-xl-12"}>
                    <div className="card-header"><h2>User Requests</h2></div>
                    <div className={"card-body"}>
                        <div className={"card-columns"}>
                            {list}
                        </div>
                    </div>
                </div>
                <div>
                    <div className={"col-md-6 gap"}>
                        {errors}
                    </div>
                    <div className={"col-md-6 gap"}>
                        {messages}
                    </div>
                </div>
            </div>
        );

    }
}


export default UserRequest;