import React,{Component} from "react";
import axios from 'axios';

import { useHistory } from "react-router-dom";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col
} from "reactstrap";

class Login extends  Component {
  constructor(props) {
    super(props);
    this.state={
      username: '',
      password:'',
      error:'',}
  };
  handleChangeUsername = (event)=>{
    this.setState({
      username:event.target.value
    });
  }
   handleChangePassword = (event)=>{
    this.setState({
      password:event.target.value
    });
  }
  handleSubmit=(event)=>{
    event.preventDefault();
    fetch('http://127.0.0.1:8000/login/',{
      method:'POST',
      headers:{
        'Content-Type':'application/x-wwww-form-urlencoded',
      },
      body:`username=${this.state.username}&password=${this.state.password}`,
    })
        .then ((response) =>{
          if (response.status===200){
            alert("Login Successfully")
             this.props.history.push("/admin/dashboard");
          }else{
            this.setState({error:'Invalid username or password'})
          }

    })
    .catch((error)=>
    {
      this.setState({
        error: 'Invalid login credentials',
      });
    });


  }

  // const
  // history = useHistory();
  //
  // const
  // onSubmitBtnClicked = () => {
  //   history.push("/admin/dashboard");
  // }

  render() {
    return (
        <>
          <Col lg="5" md="6">
            <Card className="bg-secondary shadow border-0">

              <CardBody className="px-lg-5 py-lg-5">
                <div className="text-center text-muted mb-4">
                  <big>Sign In</big>
                </div>
                <Form role="form" onSubmit={this.handleSubmit}>
                  <FormGroup className="mb-3">
                    <InputGroup className="input-group-alternative">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-email-83"/>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                          placeholder="Username"
                          type="text"
                          name="username"
                          value={this.state.username}
                          onChange={this.handleChangeUsername}
                      />
                    </InputGroup>
                  </FormGroup>
                  <FormGroup>
                    <InputGroup className="input-group-alternative">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-lock-circle-open"/>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                          placeholder="Password"
                          type="password"
                          name="password"
                          value={this.state.password}
                          onChange ={this.handleChangePassword}
                      />
                    </InputGroup>
                  </FormGroup>
                  <div className="custom-control custom-control-alternative custom-checkbox">
                    <input
                        className="custom-control-input"
                        id=" customCheckLogin"
                        type="checkbox"
                    />
                    <label
                        className="custom-control-label"
                        htmlFor=" customCheckLogin"
                    >
                      <span className="text-muted">Remember me</span>
                    </label>
                  </div>
                  <div className="text-center">
                    <Button className="my-4" color="primary" type="button" >
                      Sign in
                    </Button>
                  </div>
                </Form>
              </CardBody>
            </Card>
            <Row className="mt-3">

              <Col className="text-right" xs="12">
                <a
                    className="text-light"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                >
                  <small>Forgot Password</small>
                </a>
              </Col>
            </Row>
          </Col>
        </>
    );
  };
};

export default Login;
