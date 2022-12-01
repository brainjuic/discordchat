import React, { useEffect, useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { firestore } from "../../firebase/firebase";
import AvailableServersmap from "./AvailableServersmap";
import "./AvailableServers.scss";
// import currentserver from '../../redux/server/server.actions';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import currentserver from "../../redux/server/server.actions";
function AvailableServers() {
  const history = useHistory();
  const dispatch = useDispatch();
  const serverRef = firestore.collection("servers");
  const query = serverRef.orderBy("createdAt").limit(10);
  const [servers] = useCollectionData(query, { idField: "id" });
  const newserver = useSelector((state) => state.newserver.present);
  const currentserverid = useSelector((state) => state.currentserver.id);
  useEffect(() => {
    if (newserver) {
      return;
    } else {
      if (servers && !!servers.length) {
        // dispatch(currentserver({id:servers[0].id,name:servers[0].servername,email:servers[0].email,roleid:servers[0].roleid}));
      }
    }
    return () => {};
  }, [servers, newserver, dispatch]);
  // useEffect(() => {
  //         if(newserver){
  //             dispatch()
  //         }
  //     return () => {

  //     }
  // }, [newserver])
  return (
    <div className="availableserver">
      <div
        className={`${
          currentserverid == null
            ? "availableserver__clicked"
            : "availableserver__map"
        }`}
      >
        <div
          className={`${
            currentserverid == null
              ? "availableserver__clicked--homeicon"
              : "availableserver__map--homeicon"
          }`}
          onClick={() => {
            dispatch(currentserver({ id: null, name: null, email: null }));
            history.push("/discord-clone/channels/@me");
          }}
        >
          <svg
            version="1.0"
            xmlns="http://www.w3.org/2000/svg"
            width="192.000000pt"
            height="192.000000pt"
            viewBox="0 0 192.000000 192.000000"
            preserveAspectRatio="xMidYMid meet"
          >
            <g
              transform="translate(0.000000,192.000000) scale(0.100000,-0.100000)"
              fill="#000000"
              stroke="none"
            >
              <path
                d="M468 1333 c-61 -130 -73 -163 -61 -163 4 1 33 9 63 20 51 18 86 19
530 19 444 0 479 -1 530 -19 30 -11 59 -19 63 -20 13 0 0 36 -61 163 l-55 117
-94 0 c-87 0 -97 -2 -130 -27 l-36 -28 -203 -3 c-188 -3 -206 -2 -243 17 -22
12 -42 25 -46 31 -3 6 -49 10 -104 10 l-98 0 -55 -117z"
              />

              <path
                d="M494 1061 c-87 -40 -108 -99 -102 -291 4 -121 7 -141 29 -180 13 -24
42 -58 65 -75 l41 -30 5 -103 c3 -56 8 -105 12 -109 4 -4 50 37 104 90 l97 97
331 0 c366 0 399 4 467 61 72 60 82 92 82 275 0 159 0 161 -28 203 -54 82 -46
81 -587 81 -441 0 -478 -2 -516 -19z m756 -250 c15 -29 12 -67 -6 -85 -23 -24
-445 -24 -468 0 -18 18 -21 56 -6 85 10 18 24 19 240 19 216 0 230 -1 240 -19z"
              />
            </g>
          </svg>
        </div>
      </div>
      {servers &&
        servers.map((server) => {
          return <AvailableServersmap key={server.id} server={server} />;
        })}
    </div>
  );
}

export default AvailableServers;