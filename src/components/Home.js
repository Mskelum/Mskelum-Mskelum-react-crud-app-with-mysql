import React, { useState, useEffect } from 'react';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import CreateIcon from '@mui/icons-material/Create';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Link } from 'react-router-dom';

const Home = () => {
    const [userData, setUserData] = useState([]);
    const [udata, setUdata] = useState("");
    const [updata, setUPdata] = useState("");
    const [dltdata, setDLTdata] = useState("");
    const [data, setData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResult, setSearchResult] = useState({});

    useEffect(() => {
        fetch('http://localhost:8001/getusers')
            .then(res => res.json())
            .then(data => setData(data))
            .catch(err => console.log(err));
    }, []);

    const deleteUser = async (id) => {
        const res2 = await fetch(`http://localhost:8001/deleteuser/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const deletedata = await res2.json();
        console.log(deletedata);

        if (res2.status === 422 || !deletedata) {
            console.log("error");
        } else {
            console.log("user deleted");
            // Update the data state after deletion if required
            // history('/');
        }
    };
    
    const search = async () => {
        const res = await fetch(`http://localhost:8001/induser/${searchQuery}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const data = await res.json();
        console.log(data);

        if (res.status === 422 || !data) {
            console.log("error");
        } else {
            setSearchResult(data[0]);
            console.log("get data");
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        search();
    };

    return (
        <>

            {udata && (
                <div className="alert alert-success alert-dismissible fade show" role="alert">
                    <strong>{udata.name}</strong> added successfully!
                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
            )}

            {updata && (
                <div className="alert alert-success alert-dismissible fade show" role="alert">
                    <strong>{updata.name}</strong> updated successfully!
                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
            )}

            {dltdata && (
                <div className="alert alert-danger alert-dismissible fade show" role="alert">
                    User deleted successfully!
                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
            )}

            <div className="mt-5">
                <div className="container">
                    <form className="d-flex" onSubmit={handleSubmit}>
                        <input 
                            className="form-control me-2" 
                            type="search" 
                            placeholder="Search" 
                            aria-label="Search" 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onClick={() => setSearchResult({})}
                        />
                        <button className="btn btn-outline-success" type="submit">Search</button>
                    </form>

                    <div className="add_btn mt-2 mb-2">
                        <Link to="/register" className="btn btn-primary">Add data</Link>
                    </div>

                {searchResult && (
                <div>
                    <table className="table">
                        <tbody>
                            <tr>
                                <td>{searchResult.id}</td>
                                <td>{searchResult.name}</td>
                                <td>{searchResult.email}</td>
                                <td>{searchResult.job}</td>
                                <td>{searchResult.number}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )}



                    <table className="table">
                        <thead>
                            <tr className="table-dark">
                                <th scope="col">id</th>
                                <th scope="col">Username</th>
                                <th scope="col">email</th>
                                <th scope="col">Job</th>
                                <th scope="col">Number</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((d, i) => (
                                <tr key={i}>
                                    <td>{d.id}</td>
                                    <td>{d.name}</td>
                                    <td>{d.email}</td>
                                    <td>{d.job}</td>
                                    <td>{d.number}</td>
                            
                                    <td className="d-flex justify-content-between">
                                        <Link to={`view/${d.id}`}>
                                            <button className="btn btn-success"><RemoveRedEyeIcon /></button>
                                        </Link>
                                        <Link to={`edit/${d.id}`}>
                                            <button className="btn btn-primary"><CreateIcon /></button>
                                        </Link>
                                        <button className="btn btn-danger" onClick={() => deleteUser(d.id)}>
                                            <DeleteOutlineIcon />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default Home;
