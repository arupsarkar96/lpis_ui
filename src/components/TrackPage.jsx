import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const TrackPage = () => {
    const [uploads, setUploads] = useState([]);
    const [loading, setLoading] = useState(false); // changed to false so we can trigger it repeatedly
    const { id } = useParams();

    const fetchData = () => {
        setLoading(true);
        fetch("http://localhost:8000/case/" + id)
            .then((res) => res.json())
            .then((data) => {
                setUploads(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching uploads:", error);
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchData(); // initial fetch

        const interval = setInterval(() => {
            fetchData();
        }, 5000); // refresh every 5s

        return () => clearInterval(interval);
    }, [id]);

    return (
        <div className="container-fluid px-0">
            {/* Loading Bar */}
            <div className="w-100">
                <div className="progress" style={{ height: "8px" }}>
                    <div
                        className="progress-bar progress-bar-striped progress-bar-animated bg-primary"
                        style={{ width: "100%" }}
                    ></div>
                </div>
            </div>

            <div className="container my-5">
                <h2 className="mb-4 text-center">📦 Match 📦</h2>
                <div className="row g-4">
                    {uploads.map((upload) => (
                        <div key={upload.id} className="col-12 col-md-3">
                            <div className="card p-3 shadow-sm h-100">
                                <h5 className="text-center text-primary mb-3">
                                    Similarity: {upload.similarity}%
                                </h5>
                                <div className="d-flex justify-content-between">
                                    <img
                                        src={`http://localhost:8000/${upload.source_photo}`}
                                        alt="Source"
                                        className="img-fluid rounded border me-2"
                                        style={{ width: "48%", maxHeight: "180px", objectFit: "cover" }}
                                    />
                                    <img
                                        src={`http://localhost:8000/${upload.matched_photo}`}
                                        alt="Matched"
                                        className="img-fluid rounded border"
                                        style={{ width: "48%", maxHeight: "180px", objectFit: "cover" }}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TrackPage;
