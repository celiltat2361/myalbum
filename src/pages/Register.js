import React, { useRef, useState } from "react";
import { useUserContext } from "../contexts/UserContext";
import { Link, useNavigate } from "react-router-dom";
import { Row, Form, Button, Card, Alert } from "react-bootstrap";

const Register = () => {
  const navigate = useNavigate();
  const { signup } = useUserContext();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("The passwords does not match");
    }

    setError(null);

    try {
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      navigate("/");
    } catch (e) {
      setError(e.message);
      setLoading(false);
    }
  };

  return (
    <Row className="d-flex justify-content-center">
      <Card className="w-100 mt-5">
        <Card.Body>
          <Card.Title className="mb-3">Sign Up</Card.Title>

          <Form onSubmit={handleSubmit}>
            <Form.Group id="email" className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>

            <Form.Group id="password" className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>

            <Form.Group id="password-confirm" className="mb-3">
              <Form.Label>Password Confirm</Form.Label>
              <Form.Control type="password" ref={passwordConfirmRef} required />
            </Form.Group>

            {error && <Alert variant="danger">{error}</Alert>}

            <Button disabled={loading} type="submit">
              Sign Up
            </Button>
          </Form>

          <div className="text-center mt-3">
            Already have an account? <Link to="/login">Log in</Link>
          </div>
        </Card.Body>
      </Card>
    </Row>
  );
};

export default Register;
