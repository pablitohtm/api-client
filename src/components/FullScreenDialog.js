import React, {forwardRef, useImperativeHandle, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import List from '@material-ui/core/List';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';

import TextField from '@material-ui/core/TextField';

import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import FormHelperText from '@material-ui/core/FormHelperText';

import {insertPost} from './../services/Fetchs';

import { Alert, AlertTitle } from '@material-ui/lab';


import { Grid, Paper } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  paper: {
      padding: 20,
      height: '80vh',
      width: 480,
      margin: '20px auto'
  }
}));

const initialValues = {
  titulo : "",
  conteudo : ""
}

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function FullScreenDialog(props, ref) {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const [values, setValues] = useState(initialValues);

  const [error, setError] = useState(false);

  function onChange(ev){
      const {name, value} = ev.target;
      setValues({ ...values, [name]: value});
  }

  useImperativeHandle(ref, () => ({
    setFromOutside () {
      handleClickOpen();
    }
  }), [])

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  }

  const handleSave = () => {
    const saveEvent = async() =>{
      const res = await insertPost(values);
      if(res.status === 201){
        setOpen(false);
        window.location.reload();
      }else{
        setError(true);
      }

    }
    saveEvent();
  };

  return (
    <div>
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Cadastro de Post
            </Typography>
            <Button autoFocus color="inherit" onClick={handleSave.bind(this)}>
              Salvar
            </Button>
          </Toolbar>
        </AppBar>
        <List>
          <Grid>
            <Paper className={classes.paper}>
              { error && 
                <div>
                  <Alert severity="error">
                  <AlertTitle>Erro</AlertTitle>
                  Erro ao inserir Postagem <strong>tente novamente mais tarde!</strong>
                  </Alert>
                  <br/>
                </div>}
              <form className={classes.root} noValidate autoComplete="off">
                <div>
                  <InputLabel htmlFor="my-input">Título</InputLabel>
                  <Input id="titulo" name="titulo" aria-describedby="my-helper-text" onChange={onChange} fullWidth/>
                  <FormHelperText id="my-helper-text">Resumo breve sobre a Postagem.</FormHelperText>
                </div>
                <br />
                <div>
                  <TextField
                    id="conteudo" 
                    name="conteudo"
                    label="Conteúdo"
                    multiline
                    rows={6}
                    variant="outlined"
                    onChange={onChange}
                    fullWidth
                  />
                  <FormHelperText id="my-helper-text">Todo o texto da Postagem.</FormHelperText>
                </div> 
              </form>
            </Paper>
          </Grid>
        </List>
      </Dialog>
    </div>
  );
}

export default forwardRef(FullScreenDialog)
