import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function EditService() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        vehicleNumber: "",
        vehicleType: "",
        lastService: "",
        nextService: "",
        lastKm: "",
        nextKm: "",
        notes: ""
    });

    // LOAD SERVICE DETAILS
    useEffect(() => {
        axios
            .get(`http://localhost:3000/api/services/${id}`, {
                headers: { Authorization: localStorage.getItem("token") }
            })
            .then((res) => setForm(res.data))
            .catch(() => alert("Failed to load service"));
    }, [id]);

    // HANDLE INPUT
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // UPDATE SERVICE
    const handleSubmit = (e) => {
        e.preventDefault();

        axios
            .put(`http://localhost:3000/api/services/${id}`, form, {
                headers: { Authorization: localStorage.getItem("token") }
            })
            .then(() => {
                alert("Service updated");
                navigate("/dashboard");
            })
            .catch(() => alert("Update failed"));
    };

    return (
        <div className="container mt-4">
            <h2>Edit Service</h2>

            <form onSubmit={handleSubmit} className="mt-3">

                <label>Vehicle Number</label>
                <input
                    name="vehicleNumber"
                    className="form-control"
                    value={form.vehicleNumber}
                    onChange={handleChange}
                />

                <label>Vehicle Type</label>
                <input
                    name="vehicleType"
                    className="form-control"
                    value={form.vehicleType}
                    onChange={handleChange}
                />

                <label>Last Service Date</label>
                <input
                    type="date"
                    name="lastService"
                    className="form-control"
                    value={form.lastService?.slice(0, 10)}
                    onChange={handleChange}
                />

                <label>Next Service Date</label>
                <input
                    type="date"
                    name="nextService"
                    className="form-control"
                    value={form.nextService?.slice(0, 10)}
                    onChange={handleChange}
                />

                <label>Last KM</label>
                <input
                    type="number"
                    name="lastKm"
                    className="form-control"
                    value={form.lastKm}
                    onChange={handleChange}
                />

                <label>Next KM</label>
                <input
                    type="number"
                    name="nextKm"
                    className="form-control"
                    value={form.nextKm}
                    onChange={handleChange}
                />

                <label>Notes</label>
                <textarea
                    name="notes"
                    className="form-control"
                    value={form.notes}
                    onChange={handleChange}
                />

                <button className="btn btn-primary mt-3">Update Service</button>
            </form>
        </div>
    );
}
