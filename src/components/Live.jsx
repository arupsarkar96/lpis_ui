import React, { useState, useEffect } from 'react';

function ResultsList() {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch data from the API
    const fetchResults = async () => {
        try {
            const response = await fetch('https://api.mesez.me/api/v1/live'); // Replace with your actual endpoint
            if (!response.ok) throw new Error('Failed to fetch data');
            const data = await response.json();
            setResults(data);
            setError(null);
        } catch (err) {
            console.error(err);
            setError('Could not load results.');
        } finally {
            setLoading(false);
        }
    };

    // Auto-refresh every 10 seconds
    useEffect(() => {
        fetchResults(); // Initial fetch
        const intervalId = setInterval(fetchResults, 1500);
        return () => clearInterval(intervalId); // Cleanup
    }, []);

    return (
        <div className="container py-5">
            <h2 className="mb-4 fw-bold text-center text-primary">Live Match Results</h2>

            {loading && (
                <div className="text-center my-5">
                    <div className="spinner-border text-primary" role="status" />
                    <p className="mt-3">Loading results...</p>
                </div>
            )}

            {error && (
                <div className="alert alert-danger text-center" role="alert">
                    {error}
                </div>
            )}

            {!loading && results.length > 0 && (
                <div className="row">
                    {results.map((item) => (
                        <div className="col-sm-6 col-md-4 col-lg-3 mb-4" key={item.id}>
                            <div className="card h-100 shadow-sm border-0">
                                <img
                                    src={`https://api.mesez.me/faces/${item.photo}`}
                                    className="card-img-top"
                                    alt={`User ${item.id}`}
                                    style={{ objectFit: 'cover', height: '200px' }}
                                />
                                <div className="card-body">
                                    <h6 className="card-title text-truncate" title={`ID: ${item.id}`}>
                                        ID: {item.id}
                                    </h6>
                                    <p className="card-text small mb-1">
                                        <strong>Case ID:</strong> {item.case_id}
                                    </p>
                                    <span className="badge bg-success">
                                        Match: {item.similarity.toFixed(2)}%
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {!loading && results.length === 0 && (
                <p className="text-center text-muted">No match results available.</p>
            )}
        </div>
    );
}

export default ResultsList;
