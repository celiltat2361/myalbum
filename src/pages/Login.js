import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "../contexts/UserContext";
import { Row, Form, Button, Card, Alert } from "react-bootstrap";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useUserContext();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
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
          <Card.Title className="mb-3">Log in</Card.Title>

          <Form onSubmit={handleSubmit}>
            <Form.Group id="email" className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>

            <Form.Group id="password" className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>

            {error && <Alert variant="danger">{error}</Alert>}

            <Button disabled={loading} type="submit">
              Log In
            </Button>
          </Form>

          <div className="text-center mt-3">
            If you want an account, <Link to="/register">Sign up</Link>
          </div>
        </Card.Body>
      </Card>
    </Row>
  );
};

export default Login;
