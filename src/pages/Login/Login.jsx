import { Button, makeStyles } from '@material-ui/core'
import React from 'react'
import { useDispatch } from 'react-redux';
import './Login.scss'
import { GoogleSignInStart } from '../../redux/users/user.action';
// import GitHubIcon from '@material-ui/icons/GitHub';
const useStyles=makeStyles({
    github:{
      marginTop:'1rem',
      backgroundColor:'#020000',
      color:'#fff',
      '&:hover':{
        backgroundColor:'rgba(2,0,0,.75)'
      }
    },
    google:{
      padding:'.75rem'
    },
    githubicon:{
      color:'white'
    }
  })
const Homepage = () => {
    const classes=useStyles();
    const dispatch = useDispatch();
    return (
        <>
            <div className="discord__homepage">
             <img className="discord__homepage-svg" src="/discord.svg" alt="Discord Svg"/>
            <Button onClick={()=>dispatch(GoogleSignInStart())} className={`${classes.google} discord__homepage-btn`}  variant="outlined" style={{color:"gray",fontSize: "1.2rem",}}>Connect to metamask</Button>
            {/* <Button onClick={signinWithGithub} startIcon={<GitHubIcon className={classes.githubicon}/>} className={`${classes.github} discord__homepage-btn`} variant='outlined'>Sign In With Github</Button> */}
            </div>
        </>
    )
}

export default Homepage
