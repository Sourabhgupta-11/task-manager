import React, { useState,useContext } from "react";
import { Form, Button, Card, Container, Row, Col } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext.js";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const { login, signup } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) await login(username, password);
      else await signup(username, password);
      navigate("/"); 
    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <Container fluid className="vh-100 d-flex justify-content-center align-items-center bg-light">
      <Row className="w-100 justify-content-center">
        <Col md={6} lg={5}>
          <Card className="shadow-lg border-0 rounded-4">
            <Card.Body className="p-5">
              <h2 className="text-center mb-4 fw-bold text-primary">
                {isLogin ? "Welcome Back 👋" : "Create Your Account 🚀"}
              </h2>
              <p className="text-center text-muted mb-4">
                {isLogin
                  ? "Login to manage your daily tasks and track progress easily."
                  : "Sign up to start managing tasks and boost your productivity."}
              </p>

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formUsername">
                  <Form.Label className="fw-semibold">Username</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-4" controlId="formPassword">
                  <Form.Label className="fw-semibold">Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Form.Group>

                <Button
                  variant="primary"
                  type="submit"
                  className="w-100 py-2 fw-semibold"
                >
                  {isLogin ? "Login" : "Sign Up"}
                </Button>
              </Form>

              <div className="text-center mt-4">
                <span className="text-muted">
                  {isLogin ? "Don’t have an account? " : "Already have an account? "}
                </span>
                <Button
                  variant="link"
                  className="p-0 fw-semibold"
                  onClick={() => setIsLogin(!isLogin)}
                >
                  {isLogin ? "Sign up" : "Login"}
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
