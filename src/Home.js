import React, {useState, useEffect, useRef} from 'react';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

import MiddleDividers from './components/MiddleDividers';
import FullScreenDialog from './components/FullScreenDialog';

import {postsList} from './services/Fetchs';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  central:{
    justifyContent: 'center',
    alignItems: 'center'
  }
}));

function Home() {
    
    const classes = useStyles();
    const [posts, setPosts] = useState([]);

    const childRef = useRef();
    const onClick = () => {
        childRef.current.setFromOutside();
    };

    useEffect(()=>{
        const Load = async() =>{
            const posts = await postsList();

            if(!posts){
                setPosts([]);
            }else{
                setPosts(posts);
            }
        }
        Load();
    },[])

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        Postagens
                    </Typography>
                    <Button color="inherit" onClick={onClick}>Inserir Post</Button>
                </Toolbar>
            </AppBar>
            <List className={classes.list}>
                {posts.map((row) => (
                    <ListItem key={row.id} alignItems="flex-start">
                        <MiddleDividers id={row.id}
                                        titulo={row.titulo}
                                        conteudo={row.conteudo}
                                        up={row.up}
                                        down={row.down}
                                        data={new Date(row.data)}/>
                    </ListItem>
                ))}
            </List>
            <FullScreenDialog ref={childRef}/>
        </div>
    )
}

export default Home;