//import { CardContent, Typography } from "@material-ui/core";
import React,{useEffect, useState} from "react";
import {
    Button,
    Card,
    CardActions,
    CardContent,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Grid,
    Typography,
  } from "@material-ui/core";
  import {getMatchDetails} from '../api/Api';
const Mycard=({match})=>{

    const [detail,setDetails]=useState({});


    const [open,setOpen]=useState(false);
    const handleClick=(id)=>{
        getMatchDetails(id)
        .then((data)=>{console.log("Match data",data);
            setDetails(data);
            handleOpen();
        })
        .catch((error)=> console.log(error))
    }

    const getMatchCard=()=>{
        return (
            <Card style={{marginTop:20}}>
                <CardContent>
                   <Grid container justify="center" alignItems="center" spacing={4} >
                        <Grid item >
                            <Typography variant="h5">
                            {match["team-1"]}
                            </Typography>
                        </Grid>
                  
                        <Grid item >
                            <img style={{width:85}} src={require("../img/vs.png")} alt="" />
                        </Grid>
                   
                        <Grid item >
                            <Typography variant="h5">
                                {match["team-2"]}
                            </Typography>
                        </Grid>
                   </Grid>
                </CardContent>
                <CardActions>
                    <Grid container justify="center">
                    <Button onClick={()=>{
                        handleClick(match.unique_id);
                    }}
                    item variant="outlined" color="primary">
                        Show Details
                    </Button>
                    <Button style={{marginLeft:5 }}
                    item variant="contained" color="primary">
                        Start Time {new Date(match.dateTimeGMT).toLocaleString()}
                    </Button>
                    </Grid>

                </CardActions>
                    
            </Card>
        );
    };
    const handleOpen=()=>{
        setOpen(true);
    }
    const handleClose=()=>{
        setOpen(false);
    }
    const getDialog=()=>(
        <Dialog open={open} onClose={handleClose}>  
            <DialogTitle id="alert-dialog-title">
                {"Match Details..."}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    <Typography>
                        {detail.stat}
                    </Typography>
                    <Typography>
                        Match{" "}
                        <span style={{fontStyle: "italic", fontWeight:"bold"}}> 
                            {detail.matchStarted ? "Started" : "Not Started yet"}{" "}
                        </span>
                    </Typography>
                    <Typography>
                        Score
                        <span style={{fontStyle: "italic", fontWeight:"bold"}}> 
                            {detail.score}
                        </span>
                    </Typography>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary" autoFocus>
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
    return( 
        <>
            {getMatchCard()}
            {getDialog()}
        </>
    );
}

export default Mycard;