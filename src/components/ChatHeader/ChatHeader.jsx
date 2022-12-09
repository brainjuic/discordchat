import React from "react";
import "./ChatHeader.scss";
import { fade, makeStyles } from "@material-ui/core";
import PersonIcon from "@material-ui/icons/Person";
import EmojiPeopleIcon from "@material-ui/icons/EmojiPeople";
import NotificationsIcon from "@material-ui/icons/Notifications";
import Button from "@material-ui/core/Button";
import { useSelector } from "react-redux";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { auth } from "../../firebase/firebase";
const useStyles = makeStyles((theme) => {
  return {
    search: {
      position: "relative",
      borderRadius: theme.shape.borderRadius,
      backgroundColor: "#212226",
      "&:hover": {
        backgroundColor: fade("#212226", 0.5),
      },
      marginLeft: 0,
      marginRight: theme.spacing(0.4),
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(1),
        width: "auto",
      },
    },
    inputRoot: {
      color: "inherit",
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      fontSize: theme.spacing(1.5),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        width: "12ch",
        "&:focus": {
          width: "20ch",
        },
      },
    },
  };
});
function ChatHeader() {
  const [openMenu, setOpenMenu] = React.useState(false);

  return (
    <div className="chat__main">
      <div className="chatheader">
        <div className="chatheader__topic">
          <p className="chatheader__topic-hash">#</p>
          <p className="chatheader__topic-content">
            {useSelector((state) => state.doc.name)}
          </p>
        </div>

        <div className="chatheader__items">
          <div
            className="chatheader__items-left"
            style={{ cursor: "pointer" }}
            onClick={() => ""}
          >
            <div>
              <Button
                variant="outlined"
                style={{ color: "gray", fontSize: "1.2rem" }}
                onClick={() => auth.signOut()}
              >
                Disconnect from metamask
              </Button>
            </div>
            <NotificationsIcon fontSize="large" />
            <svg
              x="0"
              y="0"
              aria-hidden="false"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M22 12L12.101 2.10101L10.686 3.51401L12.101 4.92901L7.15096 9.87801V9.88001L5.73596 8.46501L4.32196 9.88001L8.56496 14.122L2.90796 19.778L4.32196 21.192L9.97896 15.536L14.222 19.778L15.636 18.364L14.222 16.95L19.171 12H19.172L20.586 13.414L22 12Z"
              ></path>
            </svg>
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
          </div>
          <div className="chatheader__searchbar">
            <input
              className="chatheader__searchbar-input"
              type="text"
              placeholder="Search"
            />
            <div className="chatheader__searchbar-searchicon">
              <svg
                aria-hidden="false"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M21.707 20.293L16.314 14.9C17.403 13.504 18 11.799 18 10C18 7.863 17.167 5.854 15.656 4.344C14.146 2.832 12.137 2 10 2C7.863 2 5.854 2.832 4.344 4.344C2.833 5.854 2 7.863 2 10C2 12.137 2.833 14.146 4.344 15.656C5.854 17.168 7.863 18 10 18C11.799 18 13.504 17.404 14.9 16.314L20.293 21.706L21.707 20.293ZM10 16C8.397 16 6.891 15.376 5.758 14.243C4.624 13.11 4 11.603 4 10C4 8.398 4.624 6.891 5.758 5.758C6.891 4.624 8.397 4 10 4C11.603 4 13.109 4.624 14.242 5.758C15.376 6.891 16 8.398 16 10C16 11.603 15.376 13.11 14.242 14.243C13.109 15.376 11.603 16 10 16Z"
                ></path>
              </svg>
            </div>
          </div>
          <div
            className="chatheader__items-right"
            onClick={() => setOpenMenu(!openMenu)}
          >
            <PersonIcon fontSize="large" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatHeader;
