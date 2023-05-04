import React, { useState } from 'react'
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import image from "../Images/image.jpg";
import { useParams,useHistory } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    backgroundImage: `url(${image})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],

    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  size: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },

  paper: {
    margin: theme.spacing(2, 6),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(0),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  login: {
    margin: theme.spacing(0, 0, 0),
    width:150,
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  }
}));


const ForgetPassword = () => 
{
  const history = useHistory()
  const classes = useStyles();

  const { id, token } = useParams();

  const [password, setPassword] = useState("");

  const sendpassword = async (e) => {
    e.preventDefault();

    if (password === "") {


    } else if (password.length < 6) {

    } else {
      
      const res = await fetch(`http://localhost:8000/forgetpassword/${id}/${token}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ password })
      });

      const data = await res.json()
      if (data.status === 200) {
        alert("your password set")
        setPassword("")
      } else {
      }
    }
  }

  const handleLogin = () =>{
    history.push('/login')
  }


  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid
        className={classes.size}
        item
        xs={12}
        sm={8}
        md={5}
        component={Paper}
        elevation={1}
        square
      >
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Reset password
          </Typography>
          <form className={classes.form} onSubmit={sendpassword} >
            <TextField
              value={password}
              onChange={(e) => { setPassword(e.target.value) }}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="password"
              label="password"
              name="password"
              autoFocus
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}

            >
              Update password
            </Button>
            <Box mt={5}>
            </Box>
          </form>
            <Button
              type="submit"
              onClick={handleLogin}
              fullWidth
              variant="contained"
              color="primary"
              className={classes.login}

            >
              login
            </Button>
        </div>
      </Grid>
    </Grid>
  )
}

export default ForgetPassword
