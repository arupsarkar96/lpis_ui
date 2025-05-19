import React, { useState } from 'react';

const AddPersonForm = ({ onPersonAdded }) => {
    const [name, setName] = useState('');
    const [note, setNote] = useState('');

    const handleAdd = async (e) => {
        e.preventDefault();
        if (!name.trim()) return;

        try {
            const res = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/persons`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, note }),
            });

            if (res.ok) {
                setName('');
                onPersonAdded();
            }
        } catch (error) {
            console.error('Error adding person', error);
        }
    };

    return (
        <form onSubmit={handleAdd} className="mb-4">
            <input
                type="text"
                placeholder="New person name"
                className="form-control mb-2"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input
                type="text"
                placeholder="Note ( Optional )"
                className="form-control mb-2"
                value={note}
                onChange={(e) => setNote(e.target.value)}
            />
            <button className="btn btn-sm btn-success w-100">Add Person</button>
        </form>
    );
};

export default AddPersonForm;
