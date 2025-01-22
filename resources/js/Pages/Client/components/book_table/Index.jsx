import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const [formData, setFormData] = useState({
    table: "",
    date: "",
    guests: "",
    notes: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Reservation Details:", formData);
    alert("Reservation successful!");
    // Handle further submission logic here, e.g., API calls.
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Reservation Form</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="table" className="form-label">
            Table Number
          </label>
          <input
            type="text"
            className="form-control"
            id="table"
            name="table"
            value={formData.table}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="date" className="form-label">
            Reservation Date
          </label>
          <input
            type="date"
            className="form-control"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="guests" className="form-label">
            Number of Guests
          </label>
          <input
            type="number"
            className="form-control"
            id="guests"
            name="guests"
            value={formData.guests}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="notes" className="form-label">
            Additional Notes
          </label>
          <textarea
            className="form-control"
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows="3"
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Submit Reservation
        </button>
      </form>
    </div>
  );
};

export default Index;
