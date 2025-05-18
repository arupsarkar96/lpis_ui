import React, { useState, useEffect } from 'react';

const PersonPhotos = ({ person }) => {
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [faces, setFaces] = useState(person.faces || []);

    // 🔄 Update faces when selected person changes
    useEffect(() => {
        setFaces(person.faces || []);
    }, [person]);

    const handleUpload = async (e) => {
        e.preventDefault();
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);
        formData.append('person_id', person.id);

        setUploading(true);

        try {
            const res = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/faces`, {
                method: 'POST',
                body: formData,
            });

            if (res.ok) {
                const newFace = await res.json();
                setFaces((prev) => [...prev, newFace]);
                setFile(null); // reset file
            } else {
                console.error('Upload failed with status:', res.status);
            }
        } catch (err) {
            console.error('Upload failed', err);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div>
            <h5>{person.name}</h5>
            <p>{person.note}</p>

            <form onSubmit={handleUpload} className="mb-3">
                <input
                    type="file"
                    onChange={(e) => setFile(e.target.files[0])}
                    className="form-control mb-2"
                />
                <button className="btn btn-primary btn-sm" disabled={uploading}>
                    {uploading ? 'Uploading...' : 'Upload New Photo'}
                </button>
            </form>

            <div className="d-flex flex-wrap gap-3">
                {faces.map((face) => (
                    <div key={face.id} className="card p-2" style={{ width: '120px' }}>
                        <img
                            src={`${process.env.REACT_APP_FILE_URL}/face/${face.photo_path}`}
                            alt="face"
                            className="img-fluid rounded"
                            style={{ height: '100px', objectFit: 'cover' }}
                        />
                        <div className="text-center mt-1">
                            <small>{face.is_male ? 'Male' : 'Female'}</small><br />
                            <small>{face.age} yrs</small>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PersonPhotos;
