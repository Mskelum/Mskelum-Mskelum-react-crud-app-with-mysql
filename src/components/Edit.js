import React, { useContext, useEffect, useState } from 'react';
import { useParams, useHistory, useNavigate } from 'react-router-dom';
import { updatedata } from './context/ContextProvider';

const Edit = () => {
    
    const { updata, setUPdata } = useContext(updatedata);

    const { name } = useParams();
    const { email } = useParams();
    const { job } = useParams();
    const { number } = useParams();

    const [inpval, setINP] = useState({
        name: name,
        email: email,
        job: job,
        number: number
    });

    const setdata = (e) => {
        const { name, value } = e.target;
        setINP((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const { id } = useParams();


    const updateuser = async (e) => {
        e.preventDefault();

        const { name, email, job, number } = inpval;

        try {
            const res2 = await fetch(`http://localhost:8001/updateuser/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name,
                    email,
                    job,
                    number
                })
            });

            const data2 = await res2.json();
            console.log(data2);

            if (res2.status === 422 || !data2) {
                alert('Fill the data');
            } else {
                setUPdata(data2);
            }
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    return (
        <div className="container">
            <form className="mt-4">
                <div className="row">
                    <div className="mb-3 col-lg-6 col-md-6 col-12">
                        <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
                        <input type="text" value={inpval.name} onChange={setdata} name="name" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    </div>
                    <div className="mb-3 col-lg-6 col-md-6 col-12">
                        <label htmlFor="exampleInputPassword1" className="form-label">Email</label>
                        <input type="email" value={inpval.email} onChange={setdata} name="email" className="form-control" id="exampleInputPassword1" />
                    </div>
                    <div className="mb-3 col-lg-6 col-md-6 col-12">
                        <label htmlFor="exampleInputPassword1" className="form-label">Job</label>
                        <input type="text" value={inpval.job} onChange={setdata} name="job" className="form-control" id="exampleInputPassword1" />
                    </div>
                    <div className="mb-3 col-lg-6 col-md-6 col-12">
                        <label htmlFor="exampleInputPassword1" className="form-label">Mobile</label>
                        <input type="number" value={inpval.number} onChange={setdata} name="number" className="form-control" id="exampleInputPassword1" />
                    </div>

                    <button type="submit" onClick={updateuser} className="btn btn-primary">Submit</button>
                </div>
            </form>

        </div>
    )
}

export default Edit;





