import React from "react";
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Typography,
  Link,
} from "@material-ui/core";
// import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { makeStyles } from "@material-ui/core/styles";
import CardMedia from "@material-ui/core/CardMedia";

import { authenticationService } from "@/_services";
import image from "../images/calendarLogin.jpg"; // Tell webpack this JS file uses this image
import CtaBtn from "../_components/CtaBtn";

class LoginPage extends React.Component {
  constructor(props) {
    super(props);

    // // redirect to home if already logged in
    // if (authenticationService.currentUserValue!= 'undefined') {
    //     debugger;
    //     this.props.history.push('/');
    // }
  }

  render() {
    const classes = makeStyles((theme) => ({
      root: {
        flexGrow: 1,
      },
      paper: {
        padding: theme.spacing(2),
        textAlign: "center",
        color: theme.palette.text.secondary,
        width: "50%",
      },
    }));
    // const paperStyle = { padding: 20, height: '73vh', width: 300, margin: "0 auto" }
    const avatarStyle = { backgroundColor: "#1bbd7e" };

    // const paper= {padding: 2,textAlign: 'center',color: palette.text.secondary,}
    // const  root= {flexGrow: 1,}
    const btnstyle = { margin: "8px 0" };
    const initialValues = {
      username: "",
      password: "",
      remember: false,
    };
    return (
      <Formik
        initialValues={{
          username: "",
          password: "",
          remember: false,
        }}
        validationSchema={Yup.object().shape({
          username: Yup.string()
            .email("please enter valid email")
            .required("Required"),
          password: Yup.string().required("Required"),
        })}
        onSubmit={({ username, password }, { setStatus, setSubmitting }) => {
          setStatus();
          authenticationService.login(username, password).then(
            (user) => {
              const { from } = this.props.location.state || {
                from: { pathname: "/" },
              };
              this.props.history.push(from);
            },
            (error) => {
              setSubmitting(false);
              setStatus(error);
            }
          );
        }}
        render={({ errors, status, touched, isSubmitting }) => (
          <div id="auth-layout">
            <div className="page-section">
              <div className="page-container">
                <div className="auth-card">
                  <div className="left">
                    <img src={image} alt="Image Login" />
                  </div>
                  <div className="right">
                    <div>
                      <h1 className="fw-bold">Sign In</h1>
                      <Grid className="mt-3">
                        <Form>
                          <Field
                            className="py-2"
                            as={TextField}
                            label="Username"
                            name="username"
                            placeholder="Enter username"
                            fullWidth
                            required
                            helperText={<ErrorMessage name="username" />}
                          />
                          <Field
                            className="py-2"
                            as={TextField}
                            label="Password"
                            name="password"
                            placeholder="Enter password"
                            type="password"
                            fullWidth
                            required
                            helperText={<ErrorMessage name="password" />}
                          />
                          <Field
                            as={FormControlLabel}
                            name="remember"
                            control={<Checkbox color="primary" />}
                            label="Remember me"
                          />
                          {/* <Button
                      type="submit"
                      color="primary"
                      variant="contained"
                      disabled={isSubmitting}
                      style={btnstyle}
                      fullWidth
                    >
                      {isSubmitting ? "Loading" : "Sign in"}
                    </Button> */}

                          <div className="mb-3">
                            <CtaBtn primary>Sign In</CtaBtn>
                          </div>
                          <Typography className="text-center">
                            <Link href="#"> Forgot password ? </Link>
                          </Typography>
                        </Form>
                      </Grid>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      />
    );
  }
}

export { LoginPage };
