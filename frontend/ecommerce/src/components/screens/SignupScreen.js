import React, { useEffect, useState } from 'react'
import { Row, Col, Button, Form, Card, Container, InputGroup } from 'react-bootstrap'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
import Loader from '../Loader'
import Message from '../Message'
import { validEmail, validPassword } from './Regex'




function SignupScreen() {
  const navigate = useNavigate()
  const [fname, setFname] = useState("")
  const [lname, setLname] = useState("")
  const [email, setEmail] = useState("")
  const [pass1, setPass1] = useState("")
  const [pass2, setPass2] = useState("")
  const [error, setError] = useState("")
  const [show, changeshow] = useState("fa fa-eye-slash")

  const submitHandler = (e) => {
    e.preventDefault()

    if(pass1 != pass2){
      setError("Password Do not match")
      navigate("/signup")
    }

    else if(!validPassword.test(pass1)){
      setError("Invalid Criteria does not match")
    }

    else{
      setError('Signup success')
    }

  }


  const showPassword = ()=>{
    var x = document.getElementById("pass1")
    var z = document.getElementById("pass2")
    if(x.type === "password" && z.type === "password"){
      x.type = "text"
      z.type = "text"
      changeshow('fa fa-eye');
    }else{
      x.type = "password"
      z.type = "password"
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
              Signup
            </Card.Header>
            <Card.Body>
              {error && <Message variant='danger'>{error}</Message>}
              <Form onSubmit={submitHandler }>
                <Form.Group className="mb-3" controlId="fname">
                  <Form.Label><span><i className='fa fa-user'></i></span> First Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your first name"
                    value={fname}
                    onChange={(e) => setFname(e.target.value)}
                    required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="lname">
                  <Form.Label><span><i className='fa fa-user'></i></span> Last Name</Form.Label>
                  <Form.Control type="text"
                    placeholder="Enter your last name"
                    required
                    value={lname}
                    onChange={(e) => setLname(e.target.value)} />
                </Form.Group>

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

                <Form.Group className="mb-3" >
                  <Form.Label><span><i className={show}></i></span>{" "}Confirm Password</Form.Label>
                  <InputGroup className='mb-3'>
                    <InputGroup.Checkbox onClick={showPassword}/>
                    {" "}
                    <Form.Control
                      placeholder='Confirm your password'
                      id="pass2"
                      required type='password'
                      value={pass2}
                      onChange={(e) => setPass2(e.target.value)}
                    />
                  </InputGroup>
                </Form.Group>

                <div className='d-grid gap-2'>
                  <Button className='btn btn-md btn-success' type="submit">
                    {" "}
                    SignUp{" "}
                  </Button>
                </div>
              </Form>

              <Row className='py-3'>
                <Col>Already User?
                  <Link to="/login">Login In</Link></Col>
              </Row>

            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}


export default SignupScreen;