import React, { Component } from "react";

class TestFormat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 1,
      formData: {
        // Initialize form data here
        firstName: "",
        lastName: "",
        email: "",
        // Add more fields as needed
      },
    };
  }

  // Function to handle form field changes
  handleFieldChange = (fieldName, value) => {
    this.setState((prevState) => ({
      formData: {
        ...prevState.formData,
        [fieldName]: value,
      },
    }));
  };

  // Function to go to the next step
  nextStep = () => {
    this.setState((prevState) => ({
      step: prevState.step + 1,
    }));
  };

  // Function to go to the previous step
  prevStep = () => {
    this.setState((prevState) => ({
      step: prevState.step - 1,
    }));
  };

  // Function to submit the form data
  submitForm = () => {
    // You can submit the formData to a server or perform any other necessary actions here
    console.log("Form data submitted:", this.state.formData);
  };

  render() {
    const { step, formData } = this.state;

    switch (step) {
      case 1:
        return (
          <div>
            <h1>Step 1</h1>
            <input
              type="text"
              placeholder="First Name"
              value={formData.firstName}
              onChange={(e) =>
                this.handleFieldChange("firstName", e.target.value)
              }
            />
            <button onClick={this.nextStep}>Next</button>
          </div>
        );
      case 2:
        return (
          <div>
            <h1>Step 2</h1>
            <input
              type="text"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={(e) =>
                this.handleFieldChange("lastName", e.target.value)
              }
            />
            <button onClick={this.prevStep}>Previous</button>
            <button onClick={this.nextStep}>Next</button>
          </div>
        );
      case 3:
        return (
          <div>
            <h1>Step 3</h1>
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => this.handleFieldChange("email", e.target.value)}
            />
            <button onClick={this.prevStep}>Previous</button>
            <button onClick={this.nextStep}>Next</button>
          </div>
        );
      case 4:
        return (
          <div>
            <h1>Review and Submit</h1>
            <p>First Name: {formData.firstName}</p>
            <p>Last Name: {formData.lastName}</p>
            <p>Email: {formData.email}</p>
            <button onClick={this.prevStep}>Previous</button>
            <button onClick={this.submitForm}>Submit</button>
          </div>
        );
      default:
        return null;
    }
  }
}

export default TestFormat;
