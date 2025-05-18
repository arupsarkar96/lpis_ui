import { useState } from 'react';
import { Link } from 'react-router-dom';

const Tracking = () => {
    const [preview, setPreview] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [results, setResults] = useState([]);
    const [error, setError] = useState(null);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (!selectedFile) return;

        setPreview(URL.createObjectURL(selectedFile));
        setResults([]);
        setError(null);
        handleUpload(selectedFile);
    };

    const handleUpload = async (selectedFile) => {
        const formData = new FormData();
        formData.append('file', selectedFile);

        setUploading(true);

        try {
            const res = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/tracking`, {
                method: 'POST',
                body: formData,
            });

            if (res.ok) {
                const matches = await res.json();
                setResults(matches);
            } else {
                const errorData = await res.json();
                throw new Error(errorData.detail || 'Server returned an error.');
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div>
            <nav className="navbar navbar-dark bg-primary shadow-sm mb-3">
                <div className="container-fluid">
                    <Link className="navbar-brand fw-bold" to="/tracking">Face Tracker</Link>
                </div>
            </nav>

            <div className="container-fluid px-3">
                <div className="row g-3 justify-content-center">
                    {/* Upload Panel */}
                    <div className="col-md-4">
                        <div className="card p-3 shadow-sm">
                            <label htmlFor="imageUpload" className="form-label fw-bold text-primary mb-2">
                                Upload an Image:
                            </label>
                            <input
                                type="file"
                                accept="image/*"
                                className="form-control"
                                id="imageUpload"
                                onChange={handleFileChange}
                            />

                            {uploading && (
                                <div className="progress mt-3" style={{ height: '6px' }}>
                                    <div
                                        className="progress-bar progress-bar-striped progress-bar-animated"
                                        role="progressbar"
                                        style={{ width: '100%' }}
                                    ></div>
                                </div>
                            )}

                            {preview && (
                                <div className="text-center mt-3">
                                    <img
                                        src={preview}
                                        alt="Selected"
                                        className="img-fluid rounded border"
                                        style={{ maxHeight: '200px', objectFit: 'cover' }}
                                    />
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Results Panel */}
                    <div className="col-md-8">
                        {error && (
                            <div className="alert alert-danger">{error}</div>
                        )}

                        {results.length > 0 && (
                            <div className="row g-3">
                                {results.map((result, idx) => (
                                    <div className="col-md-6" key={idx}>
                                        <div className="card p-2 shadow-sm h-100">
                                            <div className="d-flex justify-content-between align-items-center mb-2">
                                                <h6 className="mb-0 fw-semibold text-truncate">
                                                    {result.person?.name || 'Unknown'}
                                                </h6>
                                                <small className="text-muted">
                                                    {new Date(result.timestamp).toLocaleTimeString()}
                                                </small>
                                            </div>
                                            <p className="small text-muted mb-1">{result.person?.note}</p>
                                            <div className="d-flex flex-wrap gap-1 mb-2">
                                                <span className="badge bg-success">Score: {result.similarity}</span>
                                                <span className="badge bg-info text-dark">Index: {result.index_size}</span>
                                                <span className="badge bg-secondary">Time: {result.time_taken} ms</span>
                                            </div>
                                            <div className="d-flex flex-wrap gap-2 border-top pt-2">
                                                {result.person?.faces?.map((face) => (
                                                    <img
                                                        key={face.id}
                                                        src={`${process.env.REACT_APP_FILE_URL}/face/${face.photo_path}`}
                                                        alt="Face"
                                                        title={`${face.age} yrs, ${face.is_male ? 'Male' : 'Female'}`}
                                                        className="rounded border"
                                                        style={{
                                                            width: '48px',
                                                            height: '48px',
                                                            objectFit: 'cover'
                                                        }}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Tracking;
