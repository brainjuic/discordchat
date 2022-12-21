import { IconButton, makeStyles } from '@material-ui/core'
import React from 'react'
import { useSelector } from 'react-redux'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChatHeader from '../../components/ChatHeader/ChatHeader'
import './Layout_Sidebar.scss'
const useStyles=makeStyles((theme)=>{
    return{
        button:{
            padding:theme.spacing(1),
            color:'#fff'
        }
    }
})
const LayoutSidebar = ({children}) => {
    const classes=useStyles();
    return (
        <>
                <div className='main'>
                    <div className="main__header">
                        <div className="main__header-sidebar">
                                <p className='main__header-currentchannel'>{useSelector((state)=>state.currentserver.name)}</p>
                                <div className="main__header-expandicon">
                                    <IconButton className={classes.button} aria-label="settings">
                                        <ExpandMoreIcon fontSize='large'/>
                                    </IconButton>
                                </div>
                        </div>
                        <div className="main__header-chatbar">
                            <div className="main__header--chat">
                                <ChatHeader/>
                            </div>
                        </div>
                    </div>
                    <div className="main__content">
                        {children}
                        
                    </div>
                </div>
        </>
    )
}

export default LayoutSidebar
