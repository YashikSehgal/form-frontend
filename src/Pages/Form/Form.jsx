import "./form.css";
import React, { useState } from "react";

const Form = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    contact: "",
    gender: "male",
    subjects: { english: true, maths: false, physics: false },
    url: "",
    selectedOption: "",
    about: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (["english", "maths", "physics"].includes(name)) {
      setFormData({ ...formData, subjects: { ...formData.subjects, [name]: checked } });
    } else if (type === "radio") {
      setFormData({ ...formData, gender: value });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("https://form-backend-sngm.onrender.com/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      setMessage(data.msg);

      if (res.status === 200) {
        // Reset form
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          contact: "",
          gender: "male",
          subjects: { english: true, maths: false, physics: false },
          url: "",
          selectedOption: "",
          about: "",
        });
      }
    } catch (err) {
      console.error(err);
      setMessage("Server error! Try again.");
    }
  };

  return (
    <div>
      <h1>React Form</h1>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} required />
        <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <input type="tel" name="contact" placeholder="Contact" value={formData.contact} onChange={handleChange} required />

        <div>
          Gender:
          <label><input type="radio" name="gender" value="male" checked={formData.gender === "male"} onChange={handleChange}/> Male</label>
          <label><input type="radio" name="gender" value="female" checked={formData.gender === "female"} onChange={handleChange}/> Female</label>
          <label><input type="radio" name="gender" value="other" checked={formData.gender === "other"} onChange={handleChange}/> Other</label>
        </div>

        <div>
          Subjects:
          <label><input type="checkbox" name="english" checked={formData.subjects.english} onChange={handleChange}/> English</label>
          <label><input type="checkbox" name="maths" checked={formData.subjects.maths} onChange={handleChange}/> Maths</label>
          <label><input type="checkbox" name="physics" checked={formData.subjects.physics} onChange={handleChange}/> Physics</label>
        </div>

        <input type="url" name="url" placeholder="URL" value={formData.url} onChange={handleChange} required />
        <select name="selectedOption" value={formData.selectedOption} onChange={handleChange} required>
          <option value="">Select</option>
          <option value="HTML">HTML</option>
          <option value="CSS">CSS</option>
          <option value="JS">JavaScript</option>
          <option value="React">React</option>
        </select>

        <textarea name="about" placeholder="About Yourself" value={formData.about} onChange={handleChange} required />

        <button type="submit">Submit</button>
        <button type="button" onClick={() => setFormData({
          firstName: "", lastName: "", email: "", contact: "", gender: "male",
          subjects: { english: true, maths: false, physics: false },
          url: "", selectedOption: "", about: ""
        })}>Reset</button>
      </form>
    </div>
  );
};

export default Form;
