import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ImageUploadForm = () => {
    const [name, setName] = useState("");
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    // const navigate = useNavigate();

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || !image) {
            alert("Please fill out both fields.");
            return;
        }

        const formData = new FormData();
        formData.append("name", name);
        formData.append("image", image);

        try {
            const response = await fetch("http://localhost:8000/case", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) throw new Error("Upload failed");
            const caseinfo = await response.json()
            // Success!
            // navigate(`/case/${caseinfo.case_id}`);
        } catch (error) {
            console.error("Upload error:", error);
            alert("Upload failed. Please try again.");
        }
    };

    return (
        <div className="container d-flex align-items-center justify-content-center min-vh-100">
            <div className="card p-4 shadow" style={{ maxWidth: 400, width: "100%" }}>
                <h2 className="text-center text-primary mb-4">Upload Info</h2>

                {preview && (
                    <div className="mb-3 text-center">
                        <img
                            src={preview}
                            alt="Preview"
                            className="img-fluid rounded border"
                            style={{ maxHeight: "200px", objectFit: "cover" }}
                        />
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="nameInput" className="form-label">Name</label>
                        <input
                            type="text"
                            id="nameInput"
                            className="form-control"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter your name"
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="imageInput" className="form-label">Select Image</label>
                        <input
                            type="file"
                            id="imageInput"
                            className="form-control"
                            accept="image/*"
                            onChange={handleImageChange}
                            required
                        />
                    </div>

                    <button type="submit" className="btn btn-primary w-100">
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ImageUploadForm;
