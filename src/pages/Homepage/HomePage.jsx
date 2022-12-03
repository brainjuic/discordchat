import React, { useState, useEffect } from "react";
import ChatHeader from "../../components/ChatHeader/ChatHeader";
import { auth, firestore, default as firebase } from "../../firebase/firebase";
import "./Homepage.scss";
import "../../components/AvailableServers/AvailableServers.scss";
import Divider from '@material-ui/core/Divider';
const homepage = () => {
  const [userSearch, setUserSearch] = useState(null);
  const [listOFUsers, setListOfUsers] = useState(null);
  useEffect(() => { 
    const fetchUsers = async () => {
      const usersCollection = firestore.collection("users");
      const data = await usersCollection.get();
      setListOfUsers(data.docs.map((doc) => doc.data()));
    };
    fetchUsers();
  }, []);

  // const handleAddFriend = async (e) => {
  //     e.preventDefault();
  //     const userRef = firestore.collection("users");
  //     const snapshot = await userRef.get();
  //     if (snapshot.empty) {
  //         console.log("No matching documents.");
  //         return;
  //     }
  //     snapshot.forEach(doc => {
  //         if (doc.data().displayName === userSearch) {
  //             console.log(doc.id, "=>", doc.data());
  //             usersRef.doc(auth.currentUser.uid).set({
  //                 friends: {
  //                     [doc.id]: doc.data().displayName,
  //                 },
  //             }, { merge: true });

  //         }
  //     });
  // };

  const searchFromAllUsers = (e) => {
    const search = e.target.value;
    if (search.length > 0) {
      firestore.collection("users")
        .where("username", "==", search)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            if (
              doc.data().username.toLowerCase().includes(search.toLowerCase())
            ) {
              setUserSearch(doc.data());
            }
          });
        });
    } else {
      setUserSearch(null);
    }
  };
  //   const addFriend = (e) => {
  //     e.preventDefault();
  //     const userRef = firestore.collection("users").doc(auth.currentUser.uid);
  //     userRef.update({
  //       friends: firebase.firestore.FieldValue.arrayUnion(userSearch.uid),
  //     });
  //     setUserSearch(null);
  //   };

  return (
    <>
      <div className="homepage">
        <div className="homepage__header">
          <div className="homepage__header-sidebar">
            <div className="homepage__header-inputcontainer">
              <input
                type="text"
                className="homepage__header-input"
                onChange={(e) => searchFromAllUsers(e)}
                placeholder="Find or start a conversation"
              />
            </div>
          </div>
          <div className="homepage__header-chatbar">
            <div className="homepage__header--chat">
              <ChatHeader />
            </div>
          </div>
        </div>
        <div className="homepage__content">
          <div className="homepage__sidebar">
            <div className="homepage__sidebar-container">
              <div className="homepage__sidebar-content">
                <div className="homepage__sidebar-avatar">
                  <svg aria-hidden="false" viewBox="0 0 24 24">
                    <g fill="none" fillRule="evenodd">
                      <path
                        fill="currentColor"
                        fillRule="nonzero"
                        d="M0.5,0 L0.5,1.5 C0.5,5.65 2.71,9.28 6,11.3 L6,16 L21,16 L21,14 C21,11.34 15.67,10 13,10 C13,10 12.83,10 12.75,10 C8,10 4,6 4,1.5 L4,0 L0.5,0 Z M13,0 C10.790861,0 9,1.790861 9,4 C9,6.209139 10.790861,8 13,8 C15.209139,8 17,6.209139 17,4 C17,1.790861 15.209139,0 13,0 Z"
                        transform="translate(2 4)"
                      ></path>
                      <path d="M0,0 L24,0 L24,24 L0,24 L0,0 Z M0,0 L24,0 L24,24 L0,24 L0,0 Z M0,0 L24,0 L24,24 L0,24 L0,0 Z"></path>
                    </g>
                  </svg>
                </div>
                <div className="homepage__sidebar-title">Friends</div>
              </div>
              <Divider/>
              <div className="" style={{marginTop:"8px"}}>
                
                  {userSearch ? (
                    <>
                      <div className="">
                        <img className="false availableserver__map-imageuniversal" src={userSearch.userphoto} alt="" />
                      </div>
                      <p>{userSearch?.username}</p>
                    </>
                  ) : (
                    <div className="">
                      {listOFUsers?.map((user) =>{
                        console.log(user);
                            return (
                                <ul style={{display:"flex", flexDirection:"row", marginBottom:"12px"}} key={user.uid}>
                                    <img className="false availableserver__map-imageuniversal" src={user.userphoto} alt="" />
                                    <p style={{margin:"5px",paddingTop:"19px"}}>{user.username}</p>
                                </ul>
                            )
                        })}
                    </div>
                  )}
                
              </div>
            </div>
            {/* <div className='homepage__channels'>
                                <div className="homepage__channels-header">
                                    <div className="homepage__channels-expandicon">
                                    <IconButton className={classes.button} aria-label="settings">
                                        <ExpandMoreIcon/>
                                    </IconButton>
                                        </div>
                                    <p>Text Channels</p>
                                    <div className="homepage__channels-addicon">
                                        <AddChannelPopup/>
                                    </div>
                                </div>
                                <div className="homepage__channels-list">
                                    <SidebarChannel/>
                                </div>
                            </div>
                            <div className="homepage__voice">
                                <Sidebarvoice/>
                            </div>
                            <div className="homepage__avatar">
                                    <BadgeAvatars/>
                            </div> */}
          </div>
          <div className="homepage__mid">
            <div className="homepage__mid-imagecontainer">
              <img className="homepage__mid-image" src="/wampus.svg" />
            </div>
            <p className="homepage__mid-text">
              No one's around to play with Wumpus.
            </p>
          </div>
          {/* <div className="chat">
                            <div className='chat__message'>
                                <ChatMessage/>
                            </div>
                            <div className="chat__searchbar">
                                <ChatSearchBar/>
                            </div>
                        </div> */}
          <div className="activity">
            <div className="activity__container">
              <div className="activity__container-heading">ACTIVE NOW</div>
              <div className="activity__container-content">
                <div className="activity__container--head">
                  It's quiet for now...
                </div>
                <div className="activity__container--para">
                  When a friend starts an activity—like playing a game or
                  hanging out on voice—we’ll show it here!
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* </div> */}
    </>
  );
};

export default homepage;
