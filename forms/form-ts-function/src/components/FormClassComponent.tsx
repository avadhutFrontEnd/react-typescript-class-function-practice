import React, { Component, ChangeEvent, FormEvent } from "react";

interface FormData {
  name: string;
  email: string;
  age: string;
}

interface State {
  formData: FormData;
  errors: Partial<FormData>;
  isSubmitted: boolean;
}

class UserForm extends Component<{}, State> {
  state: State = {
    formData: {
      name: "",
      email: "",
      age: "",
    },
    errors: {},
    isSubmitted: false,
  };

  validate = (): boolean => {
    const { name, email, age } = this.state.formData;
    const errors: Partial<FormData> = {};

    if (!name || name.length < 3) {
      errors.name = "Name must be at least 3 characters.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      errors.email = "Enter a valid email.";
    }

    if (age && (isNaN(Number(age)) || Number(age) < 18)) {
      errors.age = "Age must be a number ≥ 18.";
    }

    this.setState({ errors });

    return Object.keys(errors).length === 0;
  };

  handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    this.setState((prevState) => ({
      formData: { ...prevState.formData, [name]: value },
    }));
  };

  handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (this.validate()) {
      console.log("Form submitted:", this.state.formData);
      this.setState({ isSubmitted: true });
      return;
    }

    this.setState({ isSubmitted: false });
  };

  //   handleSubmit = (e: FormEvent) => {
  //     e.preventDefault();
  //     if (this.validate()) {
  //       console.log("Form submitted:", this.state.formData);
  //       this.setState({ isSubmitted: true });
  //     } else {
  //       this.setState({ isSubmitted: false });
  //     }
  //   };

  render() {
    const { formData, errors, isSubmitted } = this.state;
    const isDisabled = !formData.name || !formData.email;

    return (
      <form
        onSubmit={this.handleSubmit}
        style={{ maxWidth: "400px", margin: "auto" }}
      >
        <h2>User Form (Class)</h2>

        <div>
          <label>Name:</label>
          <br />
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={this.handleChange}
          />
          {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}
        </div>

        <div>
          <label>Email:</label>
          <br />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={this.handleChange}
          />
          {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
        </div>

        <div>
          <label>Age (optional):</label>
          <br />
          <input
            type="text"
            name="age"
            value={formData.age}
            onChange={this.handleChange}
          />
          {errors.age && <p style={{ color: "red" }}>{errors.age}</p>}
        </div>

        <button type="submit" disabled={isDisabled}>
          Submit
        </button>

        {isSubmitted && (
          <p style={{ color: "green" }}>Form submitted successfully!</p>
        )}
      </form>
    );
  }
}

export default UserForm;
