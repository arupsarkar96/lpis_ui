import React, { useState, useEffect } from 'react'

const Live = () => {
    const [records, setRecords] = useState([]);

    const fetchTracking = async () => {
        try {
            const res = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/tracking`);
            const data = await res.json();
            setRecords(data);
        } catch (err) {
            console.error('Failed to fetch tracking data', err);
        }
    };

    useEffect(() => {
        fetchTracking(); // initial load

        const intervalId = setInterval(fetchTracking, 5000); // refresh every 5s

        return () => clearInterval(intervalId); // cleanup
    }, []);
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <div className="container-fluid">
                    <a className="navbar-brand fw-bold" href="#">
                        Live tracking
                    </a>
                </div>
            </nav>
            <div className='container-fluid p-4'>
                <div className="row">
                    {records.map((record) => (
                        <div className="col-md-4 mb-4" key={record.id}>
                            <div className="card shadow-sm">
                                <div className="card-body d-flex gap-3">
                                    <img
                                        src={`${process.env.REACT_APP_FILE_URL}/detected/${record.photo}`}
                                        alt="Detected"
                                        style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                                        className="rounded border"
                                    />

                                    <div>
                                        <h6 className="mb-1">{record.person?.name}</h6>
                                        <p className="mb-1"><small>{record.person?.note}</small></p>
                                        <p className="mb-1"><strong>Confidence Score:</strong> {record.similarity}</p>
                                        <p className="mb-1"><strong>Camera:</strong> {record.camera?.location} ({record.camera?.ip})</p>
                                        <p className="mb-1"><strong>Time:</strong> {new Date(record.timestamp).toLocaleString()}</p>
                                        <p className="mb-1"><strong>Index Size:</strong> {record.index_size}</p>
                                        <p className="mb-1"><strong>Search Time:</strong> {record.time_taken} ms</p>
                                    </div>
                                </div>

                                <div className="card-footer bg-light">
                                    <div className="d-flex flex-wrap gap-2 align-items-center">
                                        {record.person.faces.slice(0, 5).map((face) => (
                                            <img
                                                key={face.id}
                                                src={`${process.env.REACT_APP_FILE_URL}/face/${face.photo_path}`}
                                                alt="Match"
                                                title={`${face.age} yrs, ${face.is_male ? 'Male' : 'Female'}`}
                                                style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                                                className="rounded border"
                                            />
                                        ))}

                                        {record.person.faces.length > 5 && (
                                            <div
                                                className="rounded border bg-secondary text-white d-flex justify-content-center align-items-center"
                                                style={{ width: '50px', height: '50px', fontSize: '0.9rem' }}
                                            >
                                                +{record.person.faces.length - 5}
                                            </div>
                                        )}
                                    </div>

                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default Live