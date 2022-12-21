import React, { useEffect, useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useSelector } from "react-redux";
import { firestore } from "../../firebase/firebase";
import FetchRoleid from "../RolesDocument/FetchRoleid";
import { db } from "../../firebase/firebase";
import "./oneToChatMessage.scss";
import OneToChatMessagemap from "./oneToChatMessagemap";
const OneToChatMessage = () => {
  const id = useSelector((state) => state.doc.id);
  const currrentdoc = useSelector((state) => state.doc.name);
  const currentonetooneid = useSelector((state) => state.currentonetooneid.id);
  // const chatRef = firestore.collection("oneToOneChat").doc().collection("messages");
  const query=chatRef.orderBy('createdAt');
  const [messages] = useCollectionData(query, { idField: "id" });
  console.log("messages", messages);
  return (
    <div>
      {currrentdoc === "roles" ? (
        <FetchRoleid />
      ) : (
        messages &&
        messages.map((msg) => {
          return <OneToChatMessagemap key={msg.id} msg={msg} />;
        })
      )}
    </div>
  );
};

export default OneToChatMessage;
