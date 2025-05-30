import React, { useState } from 'react';

function Index() {
    const [image, setImage] = useState(null);
    const [results, setResults] = useState([]);
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setImage(URL.createObjectURL(file));
        setError(null);
        setStats(null);
        setResults([]);

        const formData = new FormData();
        formData.append('photo', file);

        setLoading(true);
        try {
            const response = await fetch('https://api.mesez.me/api/v1/verify', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) throw new Error('Server returned an error.');

            const data = await response.json();

            setStats({
                matchesFound: data.matches_found,
                searchTime: data.search_time_ms,
                entriesSearched: data.entries_searched,
            });

            setResults(data.results);
        } catch (err) {
            console.error(err);
            setError('Could not process the image. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container py-5">

            <div className="row justify-content-center">
                {/* Left: Upload Section */}
                <div className="col-md-4 mb-4">
                    <div className="card p-4 shadow-lg border-light mb-4 rounded">
                        <label htmlFor="imageUpload" className="form-label fw-bold text-secondary">Upload an Image:</label>
                        <input
                            type="file"
                            accept="image/*"
                            className="form-control mb-3"
                            id="imageUpload"
                            onChange={handleImageChange}
                        />

                        {image && (
                            <div className="text-center">
                                <img
                                    src={image}
                                    alt="Selected"
                                    className="img-thumbnail rounded"
                                    style={{ maxHeight: '250px', objectFit: 'cover' }}
                                />
                            </div>
                        )}
                    </div>

                    {loading && (
                        <div className="text-center">
                            <div className="spinner-border text-primary" role="status" />
                            <p className="mt-3">Searching...</p>
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
                                    <h6 className="text-muted">Matches Found</h6>
                                    <h3>{stats.matchesFound}</h3>
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

                    {results.length > 0 && (
                        <>
                            <div className="row">
                                {results.map((match, index) => (
                                    <div className="col-md-6 col-lg-3 mb-4" key={index}>
                                        <div className="card h-100 shadow-lg rounded">
                                            <img
                                                src={match.match_photo}
                                                className="card-img-top rounded rounded-bottom-0"
                                                alt={`Match ${index}`}
                                                style={{ objectFit: 'cover', height: '200px' }}
                                            />
                                            <div className="card-body">
                                                <h6 className="card-title small text-truncate" title={match.matched_id}>
                                                    ID: {match.matched_id}
                                                </h6>
                                                <span className="badge bg-primary mb-2">
                                                    {match.match_percent.toFixed(2)}%
                                                </span>
                                                <p className="card-text small mb-1">
                                                    <strong>Cosine:</strong> {match.cosine_similarity}
                                                </p>
                                                <p className="card-text small">
                                                    <strong>L2 Dist:</strong> {match.l2_distance.toFixed(2)}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Index;
