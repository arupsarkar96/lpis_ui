import React, { useState } from 'react';

function Exact() {
    const [image, setImage] = useState(null);
    const [result, setResult] = useState(null);
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setImage(URL.createObjectURL(file));
        setError(null);
        setStats(null);
        setResult(null);

        const formData = new FormData();
        formData.append('photo', file);

        setLoading(true);
        try {
            const response = await fetch('https://api.mesez.me/api/v1/match_face', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                // If the response is not OK, throw an error with the response message
                const errorData = await response.json();
                throw new Error(errorData.message || 'Server returned an error.');
            }

            const data = await response.json();

            setStats({
                matchFound: data.match_found,
                searchTime: data.search_time_ms,
                entriesSearched: data.entries_searched,
            });

            setResult(data.best_match);
        } catch (err) {
            console.error(err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container py-5">
            <div className="row">
                {/* Left: Upload Section */}
                <div className="col-md-4">
                    <div className="card p-4 shadow-lg border-light mb-4 rounded">
                        <label htmlFor="imageUpload" className="form-label fw-bold">Upload an Image:</label>
                        <input
                            type="file"
                            accept="image/*"
                            className="form-control"
                            id="imageUpload"
                            onChange={handleImageChange}
                        />

                        {image && (
                            <div className="mt-3 text-center">
                                <img
                                    src={image}
                                    alt="Selected"
                                    className="img-thumbnail"
                                    style={{ maxHeight: '250px' }}
                                />
                            </div>
                        )}
                    </div>

                    {loading && (
                        <div className="text-center">
                            <div className="spinner-border text-primary" role="status" />
                            <p className="mt-2">Searching...</p>
                        </div>
                    )}

                    {error && (
                        <div className="alert alert-danger mt-3" role="alert">
                            {error}
                        </div>
                    )}
                </div>

                {/* Right: Results Section */}
                <div className="col-md-8">
                    {stats && (
                        <div className="row text-center mb-4">
                            <div className="col-md-4">
                                <div className="card shadow-lg border-light rounded p-3">
                                    <h6 className="text-muted">Match Found</h6>
                                    <h3>{stats.matchFound ? 'True' : 'False'}</h3>
                                </div>
                            </div>
                            <div className="col-md-4 mt-3 mt-md-0">
                                <div className="card shadow-lg border-light rounded p-3">
                                    <h6 className="text-muted">Search Time</h6>
                                    <h3>{stats.searchTime} ms</h3>
                                </div>
                            </div>
                            <div className="col-md-4 mt-3 mt-md-0">
                                <div className="card shadow-lg border-light rounded p-3">
                                    <h6 className="text-muted">Entries Searched</h6>
                                    <h3>{stats.entriesSearched}</h3>
                                </div>
                            </div>
                        </div>
                    )}

                    {result && stats?.matchFound && (
                        <div className="card shadow-lg mb-4 border-light rounded">
                            <h5 className="card-header">
                                Best Match
                            </h5>
                            <div className="card-body">
                                <div className="row align-items-center">
                                    {/* Image Section */}
                                    <div className="col-md-4 text-center">
                                        <img
                                            src={result.match_photo}
                                            alt="Best Match"
                                            className="img-fluid rounded shadow-lg"
                                            style={{
                                                maxHeight: '250px',
                                                objectFit: 'cover',
                                                border: '4px solid #ffffff',
                                            }}
                                        />
                                    </div>

                                    {/* Info Section */}
                                    <div className="col-md-8">
                                        <h6 className="card-title text-dark fw-bold">ID: {result.matched_id}</h6>
                                        <p className="card-text text-muted">
                                            <strong>Match Percentage:</strong> <span className="text-success">{result.match_percent.toFixed(2)}%</span>
                                        </p>
                                        <p className="card-text text-muted">
                                            <strong>Cosine Similarity:</strong> <span className="text-info">{result.cosine_similarity}</span>
                                        </p>
                                        <p className="card-text text-muted">
                                            <strong>L2 Distance:</strong> <span className="text-warning">{result.l2_distance.toFixed(2)}</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                    )}

                    {result && !stats?.matchFound && (
                        <div className="alert alert-warning" role="alert">
                            No matches found.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Exact;
