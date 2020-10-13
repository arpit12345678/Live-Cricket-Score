import React,{useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from './Component/Navbar';
import MyCard from './Component/MyCard';
//import { AppBar, Button } from '@material-ui/core';
import {getMatches} from './api/Api';
import {Grid,Typography} from "@material-ui/core";
function App() {
  const [matches,setMatches]=useState([]);
  useEffect(()=>{
    getMatches() 
      .then((data)=> setMatches(data.matches))
      .catch((error)=> alert("could not find data"));
  },[])
  return (
    <div className="App">
      <Navbar />
    <Typography variant="h3" style={{marginTop: 20}}>
      Welcome to my Live Score APP
    </Typography>
    <Grid container>
    <Grid sm="2"></Grid>
    <Grid sm="8">
    {
    matches.map((match)=>(
        <MyCard key={match.unique_id} match={match} />
    ))
    }
    </Grid>
    </Grid> 
    </div>
  );
}

export default App;
