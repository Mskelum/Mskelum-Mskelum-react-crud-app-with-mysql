import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [job, setJob] = useState('');
    const [number, setNumber] = useState('');
    const [validationError, setValidationError] = useState('');
    const [registrationComplete, setRegistrationComplete] = useState(false);

    const navigate = useNavigate();

    const reg = () => {
        if (!name || !email || !job || !number) {
            setValidationError('Please fill out all required fields');
            return; 
        }

        fetch('http://localhost:8001/create', {
            method: 'POST',
            body: JSON.stringify({
                id: id,
                name: name,
                email: email,
                job: job,
                number: number
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Failed to save data');
            }
        })
        .then((json) => {
            window.alert('Success: Data saved successfully');
            console.log(json);
            setId('');
            setName('');
            setEmail('');
            setJob('');
            setNumber('');
            setValidationError('');
            setRegistrationComplete(true);
        })
        .catch((error) => {
            window.alert('Error: Data saved unsuccessfully');
            console.error(error);
        });
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        switch (name) {
            case 'id':
                setId(value);
                break;
            case 'name':
                setName(value);
                break;
            case 'email':
                setEmail(value);
                break;
            case 'job':
                setJob(value);
                break;
            case 'number':
                setNumber(value);
                break;
            default:
                break;
        }
    };

    return (
        <div className="container">
            <form className="mt-4">
                <div className="row">
                    <div className="mb-3 col-lg-6 col-md-6 col-12">
                        <label htmlFor="id" className="form-label">Id</label>
                        <input type="text" value={id} onChange={handleInputChange} name="id" className="form-control" id="id" />
                    </div>
                    <div className="mb-3 col-lg-6 col-md-6 col-12">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" value={name} onChange={handleInputChange} name="name" className="form-control" id="name" />
                    </div>
                    <div className="mb-3 col-lg-6 col-md-6 col-12">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" value={email} onChange={handleInputChange} name="email" className="form-control" id="email" />
                    </div>
                    <div className="mb-3 col-lg-6 col-md-6 col-12">
                        <label htmlFor="job" className="form-label">Job</label>
                        <input type="text" value={job} onChange={handleInputChange} name="job" className="form-control" id="job" />
                    </div>
                    <div className="mb-3 col-lg-6 col-md-6 col-12">
                        <label htmlFor="number" className="form-label">Mobile</label>
                        <input type="number" value={number} onChange={handleInputChange} name="number" className="form-control" id="number" />
                    </div>
                    <button type="button" onClick={reg} className="btn btn-primary">Submit</button>
                </div>
            </form>
        </div>
    );
};

export default Register;
