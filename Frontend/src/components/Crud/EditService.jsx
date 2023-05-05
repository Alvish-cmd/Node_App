import React, { useEffect, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import image from "../Images/image.jpg";
import { useParams, useHistory } from "react-router-dom";
import "./css/add-service.css"

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
  }
}));



export default function EditService(props) 
{
  const history = useHistory()
  const classes = useStyles();
  const { id } = useParams();
  const [customer, setCustomer] = useState('')
  const [service, setService] = useState('')
  const [price, setPrice] = useState('')
  const [data, setData] = useState('')
  const [name,setName] = useState('')
  const fetchData = async() => {
    
    const response = await fetch(`http://localhost:8000/getservice/${id}`,
      {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          "Allow-Control-Cross-Origin": '*'
        },
        
      });
      const Response = await response.json()
      console.log("🚀 ~ file: EditService.jsx:82 ~ fetchData ~ Response:", Response)
      if(Response.status = 200){
        setData(Response.data )
        setName(Response.firstName)
      }
  }
  


  
  useEffect(() => {
   fetchData()
  }, []);

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
            Edit service
          </Typography>
          <form className={classes.form} >

            <div className="form-group">
              <label for="name" className="text-light">Customer Name: </label>
              <select id="Customer_name" onClick={(e) => { setCustomer(e.target.value) }} name="customer" className="form-control" disabled>
              <option value={name} >{name}</option>
              </select>
            </div>
            <div class="form-group">
              <label for="name" class="text-light">Serivce: </label>
              <select id="Customer_name" onChange={(e) => { setService(e.target.value) }} name="service" class="form-control">
                <option value={data.service} selected>{data.service}</option>
                <option value="Website Devlopment">Website Devlopment</option>
                <option value="App Devlopment">App Devlopment</option>
                <option value="Game Devlopment">Game Devlopment</option>
              </select>
            </div>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="service_price"
              value={data.service_price}
              onChange={(e) => { setPrice(e.target.value) }}
              label="price"
              type="number"
              id="price"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              
            >
              Update Service
            </Button>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}

