import { Button, makeStyles } from "@material-ui/core";
import React from "react";
import { useDispatch } from "react-redux";
import "./Login.scss";
import { GoogleSignInStart } from "../../redux/users/user.action";
import { useState } from "react";
import { ethers } from "ethers";
// import GitHubIcon from '@material-ui/icons/GitHub';
const useStyles = makeStyles({
  github: {
    marginTop: "1rem",
    backgroundColor: "#020000",
    color: "#fff",
    "&:hover": {
      backgroundColor: "rgba(2,0,0,.75)",
    },
  },
  google: {
    padding: ".75rem",
  },
  githubicon: {
    color: "white",
  },
});
const Homepage = () => {
  const [walletAddress, setWalletAddress] = useState("");
  const classes = useStyles();
  const dispatch = useDispatch();

  async function requestAccount() {
    console.log("Requesting account...");
    if (window.ethereum) {
      console.log("detected");
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setWalletAddress(accounts[0]);
      } catch (error) {
        console.log("Error connecting metamask...");
      }
    } else {
      alert("Meta Mask not detected");
    }
  }
console.log('====================================');
console.log(walletAddress);
console.log('====================================');
  // Create a provider to interact with a smart contract
  async function connectWallet() {
    if (typeof window.ethereum !== "undefined") {
      await requestAccount();

      const provider = new ethers.providers.Web3Provider(window.ethereum);
    }
  }
  const signInFunction = async () => {
    await connectWallet();
    dispatch(GoogleSignInStart(walletAddress));
  };

  return (
    <>
      <div className="discord__homepage">
        <img
          className="discord__homepage-svg"
          src="/discord.svg"
          alt="Discord Svg"
        />
        <Button
          onClick={() => signInFunction()}
          className={`${classes.google} discord__homepage-btn`}
          variant="outlined"
          style={{ color: "gray", fontSize: "1.2rem" }}
        >
          Connect to metamask
        </Button>
        {/* <Button onClick={signinWithGithub} startIcon={<GitHubIcon className={classes.githubicon}/>} className={`${classes.github} discord__homepage-btn`} variant='outlined'>Sign In With Github</Button> */}
      </div>
    </>
  );
};

export default Homepage;
