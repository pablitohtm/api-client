import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';


import Button from '@material-ui/core/Button';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbDownAltIcon from '@material-ui/icons/ThumbDownAlt';

import {votePost} from './../services/Fetchs';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  chip: {
    margin: theme.spacing(0.5),
  },
  section1: {
    margin: theme.spacing(3, 2),
  },
  section2: {
    margin: theme.spacing(2),
  },
  section3: {
    margin: theme.spacing(3, 1, 1),
  },
  button: {
    margin: theme.spacing(1),
  }
}));

function handleVote (id,vote) {
  const votar = async(id,vote) =>{
    const res = await votePost(id,vote);
    if(res.status === 204){
      window.location.reload();
    }else{
      
    }
  };
  votar(id,vote);
}

export default function MiddleDividers({id, titulo, conteudo, up, down, data}) {
  const classes = useStyles();

  const dateFormat = (data) => {

    let dataFormatada = data.toLocaleDateString() + ", " + 
      data.getHours().toString().padStart(2, '0') + 
        ":" + data.getMinutes().toString().padStart(2, '0') +
        ":" + data.getSeconds().toString().padStart(2, '0');

    return dataFormatada; 
  };


  return (
    <div className={classes.root}>
      <div className={classes.section1}>
        <Grid container alignItems="center">
          <Grid item xs>
            <Typography gutterBottom variant="h4">
              {titulo}
            </Typography>
          </Grid>
          <Grid item>
            <Typography gutterBottom variant="h6">
            {dateFormat(data)}
            </Typography>
          </Grid>
        </Grid>
        <Typography color="textSecondary" variant="body2">
        {conteudo}
        </Typography>
      </div>
      <Divider variant="middle" />
      <div className={classes.section2}>
        <div>
          <Button
            onClick={handleVote.bind(this,id,1)}
            variant="contained"
            color="primary"
            className={classes.button}
            startIcon={<ThumbUpAltIcon />}
            >
              {up}
          </Button>
          <Button
            onClick={handleVote.bind(this,id,0)}
            variant="contained"
            color="secondary"
            className={classes.button}
            startIcon={<ThumbDownAltIcon />}
            >
              {down}
          </Button>
        </div>
      </div>
    </div>
  );
}
