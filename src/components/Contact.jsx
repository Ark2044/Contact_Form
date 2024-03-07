// Contact.jsx
import React, { useState } from "react";
import './Contact.css';
import {
  TextField,
  Button,
  Container,
  Typography,
  Grid,
  Grow,
} from "@mui/material";

export default function Contact() {
  const [formData, setFormData] = useState({
    Name: "",
    Email: "",
    Phone: "",
    Message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
  
    // Reset error message
    const form = e.target;
    const errorElement = form.querySelector('.error-message');
    if (errorElement) {
      errorElement.textContent = '';
    }
  
    if (
      formData.Name === "" ||
      formData.Email === "" ||
      formData.Phone === "" ||
      formData.Message === ""
    ) {
      // If any required field is empty, prevent form submission
      // and display the error message
      return setError("Please fill out all fields.");
    }
  
    // If all fields are filled, proceed with form submission
    fetch(
      "https://script.google.com/macros/s/AKfycbzC680myBD_Y72QCkXB4nutb4HJNG0BJLjFJmY24ZKlij5WnZpYU7RR0bNgrjEJ-HhwXg/exec",
      {
        method: "POST",
        body: new FormData(form),
      }
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.text(); // Get response as text
      })
      .then((data) => {
        console.log(data); // Log the response
        setSubmitted(true);
      })
      .catch((error) => {
        console.error(error);
        setError("An error occurred while submitting the form. Please try again later.");
      });
  
    form.reset();
    setFormData({ Name: "", Email: "", Phone: "", Message: "" });
  }
  
  
  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  return (
    <Container maxWidth="md" className="contact-container">
      <Typography variant="h4" align="center" gutterBottom className="contact-heading">
        Contact Me
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          {!submitted ? (
            <Grow in={true} timeout={1000}>
              <form className="contact-form" onSubmit={handleSubmit}>
                {error && (
                  <Typography variant="body1" color="error" align="center">
                    {error}
                  </Typography>
                )}
                <TextField
                  label="Your Name"
                  name="Name"
                  type="text"
                  variant="outlined"
                  margin="normal"
                  value={formData.Name}
                  onChange={handleChange}
                  required
                  fullWidth
                  className="input-field"
                />
                <TextField
                  label="Your Email"
                  name="Email"
                  type="email"
                  variant="outlined"
                  margin="normal"
                  value={formData.Email}
                  onChange={handleChange}
                  required
                  fullWidth
                  className="input-field"
                />
                <TextField
                  label="Your Phone"
                  name="Phone"
                  type="tel"
                  variant="outlined"
                  margin="normal"
                  value={formData.Phone}
                  onChange={handleChange}
                  required
                  fullWidth
                  pattern="[0-9]{10}"
                  title="Please enter a 10-digit phone number"
                  className="input-field"
                />
                <TextField
                  label="Your Message"
                  name="Message"
                  multiline
                  rows={4}
                  variant="outlined"
                  margin="normal"
                  value={formData.Message}
                  onChange={handleChange}
                  required
                  fullWidth
                  className="input-field"
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  className="submit-button"
                >
                  Submit
                </Button>
              </form>
            </Grow>
          ) : (
            <Grow in={true} timeout={1000}>
              <Typography variant="h5" align="center">
                Thank you for your submission!
              </Typography>
            </Grow>
          )}
        </Grid>
      </Grid>
    </Container>
  );
}
