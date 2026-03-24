import React, { useState } from "react";

interface FormData {
  name: string;
  email: string;
  age: string;
}

const UserForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    age: "",
  });

  const [errors, setErrors] = useState<Partial<FormData>>();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = ():boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.name || FormData.name.length < 3) {
      newErrors.name = "Name must be at least 3 characters.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email)) {
      newErrors.email = "Enter a valid email.";
    }

    if (
      formData.age &&
      (isNaN(Number(formData.age)) || Number(formData.age) < 18)
    ) {
      newErrors.age = "Age must be a number ≥ 18.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  //   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //     const { name, value } = e.target;
  //     setFormData(prev => ({ ...prev, [name]: value }));
  //   };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validate()) {
      console.log("Form submitted:", formData);
      setIsSubmitted(true);
      return;
    }

    setIsSubmitted(false);
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: "400px", margin: "auto" }}>
      <h2>User Form</h2>

      <div>
        <label htmlFor="name">Name:</label>
        <input
          id="name"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        {errors?.name && <p style={{ color: "red" }}>{errors.name}</p>}
      </div>

      <div>
        <label htmlFor="email">Email:</label>
        <input
          id=""
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors?.email && <p style={{ color: "red" }}>{errors.email}</p>}
      </div>

      <div>
        <label htmlFor="age">Age:</label>
        <input
          id=""
          type="text"
          name="age"
          value={formData.age}
          onChange={handleChange}
        />
        {errors?.age && <p style={{ color: "red" }}>{errors.age}</p>}
      </div>
      <button type="submit" disabled={!formData.name || !formData.email}>Submit
      </button>
      {isSubmitted && (
        <p style={{ color: "green" }}>Form submitted successfully!</p>
      )}
    </form>
  );
};

export default UserForm;
