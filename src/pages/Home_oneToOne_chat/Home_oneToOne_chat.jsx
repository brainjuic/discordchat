import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import ChatMessage from '../../components/ChatMessage/ChatMessage';
import ChatSearchBar from '../../components/ChatSearchBar/ChatSearchBar';
import { firestore } from '../../firebase/firebase';
import currentdoc from '../../redux/document/document.actions';
import SidebarChannel from '../../components/SidebarChannel/SidebarChannel'
import Sidebarvoice from '../../components/Sidebarvoice/Sidebarvoice'
import BadgeAvatars from '../../components/Avatar/BadgeAvatar'
import Roles from '../../components/Roles/Roles'
import './Home_oneToOne_chat.scss'
import AddChannelPopup from '../../components/AddChannelPopup/AddChannelPopup';
// const useStyles=makeStyles((theme)=>{
//     return{
//         button:{
//             padding:theme.spacing(1),
//             color:'#fff'
//         }
//     }
// })

const Home_oneToOne_chat = ({match}) => {
    const dispatch = useDispatch();
    useEffect(() => {
        const myfun=async()=>{
            const channelRef=firestore.collection("servers").doc(match.params.serverId).collection("channels").doc(match.params.channelId);
            await channelRef.get().then((snapshot)=>{
                dispatch(currentdoc({id:match.params.channelId,name:snapshot.data().channel}))                
            })
            
        }
        myfun();        
        return () => {

        }
    }, [dispatch,match.params.channelId])
    return (
        <>
               <div className='main__sidebar'>
                    <div className='main__channels'>
                        <div className="main__channels-header">
                                <img className='main__channels-expand' src="/expand.svg" alt="" />
                                <div className='main__channels-text'>TEXT CHANNELS</div>
                                <div className="main__channels-addicon">
                                    <AddChannelPopup/>
                                </div>
                        </div>
                        <div className="main__channels-list">
                            <SidebarChannel/>
                        </div>
                    </div>
                        <div className="main__voice">
                            <Sidebarvoice/>
                        </div>
                            <div className="main__avatar">
                                <BadgeAvatars/>
                            </div>
                        </div>
            <div className="chat">
                <div className='chat__message'>
                    <ChatMessage/>
                </div>
                <div className="chat__searchbar">
                    <ChatSearchBar/>
                </div>                    
            </div>
            <div className="main__roles">
                <Roles/>
            </div>
        </>
    )
}

export default Home_oneToOne_chat
