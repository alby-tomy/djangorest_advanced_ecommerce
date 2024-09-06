import React, { useEffect, useState } from 'react'
import { Row, Col, Button, Form, Card, Container, InputGroup } from 'react-bootstrap'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
import Loader from '../Loader'
import Message from '../Message'
import { validEmail, validPassword } from './Regex'




function LoginScreen() {
  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [pass1, setPass1] = useState("")
  const [error, setError] = useState("")
  const [show, changeshow] = useState("fa fa-eye-slash")


  const submitHandler = (e) => {
    e.preventDefault()

  }

  const showPassword = ()=>{
    var x = document.getElementById("pass1")
    if(x.type === "password"){
      x.type = "text"
      changeshow('fa fa-eye');
    }else{
      x.type = "password"
      changeshow('fa fa-eye-slash');
    }
  }


  return (
    <Container className='mt-3'>
      <Row>
        <Col md={4}></Col>
        <Col md={4}>
          <Card>
            <Card.Header as="h3" className='text-center bg-black text-light'>
              Login
            </Card.Header>
            <Card.Body>
              {error && <Message variant='danger'>{error}</Message>}
              <Form onSubmit={submitHandler }>
                

                <Form.Group className="mb-3" controlId="email">
                  <Form.Label><span><i className='fa-regular fa-envelope'></i></span> Email</Form.Label>
                  <Form.Control type="email"
                    placeholder="Enter your email address"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3" >
                  <Form.Label><span><i className={show}></i></span>{" "} Password</Form.Label>
                  <InputGroup className='mb-3'>
                    <InputGroup.Checkbox onClick={showPassword}/>
                    {" "}
                    <Form.Control
                      placeholder='Create a password'
                      id="pass1"
                      required type='password'
                      value={pass1}
                      onChange={(e) => setPass1(e.target.value)}
                    />
                  </InputGroup>
                  <small>Password must incude atlest [1-9][a-z][A-Z][_$@81..] & 8 Characters</small>
                </Form.Group>

                

                <div className='d-grid gap-2'>
                  <Button className='btn btn-md btn-success' type="submit">
                    {" "}
                    Login{" "}
                  </Button>
                </div>
              </Form>

              <Row className='py-3'>
                <Col>Create User?
                  <Link to="/signup">Sign Up</Link></Col>
              </Row>

            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}


export default LoginScreen;