import React, { useEffect, useState } from 'react';
import PersonList from '../components/PersonList';
import AddPersonForm from '../components/AddPersonForm';
import PersonPhotos from '../components/PersonPhotos';

const Persons = () => {
    const [persons, setPersons] = useState([]);
    const [selectedPerson, setSelectedPerson] = useState(null);

    const fetchPersons = async () => {
        try {
            const res = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/persons`);
            const data = await res.json();
            setPersons(data);
        } catch (error) {
            console.error('Failed to fetch persons', error);
        }
    };

    useEffect(() => {
        fetchPersons();
    }, []);

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm mb-4">
                <div className="container-fluid">
                    <a className="navbar-brand fw-bold" href="#">
                        Manage Persons
                    </a>
                </div>
            </nav>

            <div className="container">
                <div className="row">
                    {/* Left Side - Person List + Add */}
                    <div className="col-md-4 mb-4">
                        <div className="card shadow-sm p-3">
                            <h5 className="card-title mb-3">Add New Person</h5>
                            <AddPersonForm onPersonAdded={fetchPersons} />
                        </div>

                        <div className="card shadow-sm mt-4 p-3">
                            <h5 className="card-title mb-3">Persons List</h5>
                            <PersonList persons={persons} onSelect={setSelectedPerson} />
                        </div>
                    </div>

                    {/* Right Side - Photos */}
                    <div className="col-md-8">
                        <div className="card shadow-sm p-3">
                            {selectedPerson ? (
                                <PersonPhotos person={selectedPerson} />
                            ) : (
                                <p className="text-muted">Select a person to view photos.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Persons;
