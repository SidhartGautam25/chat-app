import React from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./styles.module.css";
// import setting from "@public/icons/setting.png";
import write from "@public/icons/edit.png";
import threeLine from "@public/icons/menu-bar.png";
import profile from "@public/images/pikachu.jpg";
import video from "@public/icons/video-camera.png";
import audio from "@public/icons/voice-mail.png";






  
import io from "socket.io-client";
import { useEffect, useState } from "react";

const socket = io.connect("http://localhost:8000");

function Home() {
  const [room, setRoom] = useState("");

  const [message, setMessage] = useState("");
  const [totalms,setTotalms]=useState([]);
  const [name,setName]=useState("");
  const [allrooms,setAllrooms]=useState([]);
  
  
  const [allfriend,setAllfriend]=useState([]);

  const joinRoomN=(data)=>{
       if(data !== ""){
        console.log("new room==NNNNNNN> ",data);
        socket.emit("join_room",data,name);

       }
  }
  

  const sendMessage = () => {
    
       setTotalms([...totalms,{
      "sender":name,
      "msg":message,
      "room":room
    }]);
    console.log("total message ==> ",totalms);
    socket.emit("send_message", { message, room,name });
    
    
  };
  
  function roomChange(data){
    
        console.log("yha jao=> ",data);
        setRoom(data);
        joinRoomN(data);
        
  }
  
  
  useEffect(() => {

    socket.on("receive_message", (data) => {
      console.log("recieved msg=> ",data);
      setTotalms([...totalms,{
        "sender":data.name,
        "msg":data.message,
        "room":data.room
      }]);
      
    });
    socket.on("all-room",(data)=>{
      console.log("newroom event listend,data==> ",data);
      setAllrooms(data);
      console.log("rooms=> ",allrooms);
    });
    socket.on("newuser",(data)=>{
      console.log("newuser event listened,data=> ",data);
      setAllfriend([...allfriend,{
        "name":data.name,
        "id":data.socketid
      }]);
      console.log(allfriend);
    })
    return ()=>{
      socket.off("receive_message");
      socket.off("all-room");
      socket.off("newuser");
    }
  }, [totalms,allfriend,allrooms,message,name,room]);
  return (
    <div className={styles.App}>
      <div className={styles.mainbox}>
           <div className={styles.groupbox}>
                <div className={styles.groupheading}>Your Details</div>
                <div>
                  <input
                      className={styles.roomdetail}
                      placeholder="Room Number..."
                      onChange={(event) => {
                      setRoom(event.target.value);
                      }}
                  />
                </div>
                <div>
                  <input
                    className={styles.namedetail}
                    placeholder="your name please"
                    onChange={(event) => {
                    setName(event.target.value);
                    }}
                  />
                </div>
                <button className={styles.submitbutton} onClick={()=>{
                    if (room !== "") {
                        console.log("new room joined name=> ",name);
                        console.log("present room==> ",room);
                        socket.emit("join_room",room,name);
                        console.log("rooms=>>> ",room);
                    }
                 }}>submit choices</button>

             
           </div>
      <div className={styles.chatbox}>
        <div className={styles.chatboxheader}>
          Room : {room}
        </div>
      
        <div className={styles.chatboxbody}>
          {totalms?.map((p,i)=> 
            p.sender===name?(p.room===room&&<div key={i} className={styles.msgsmallleft}>{p.sender} : {p.msg}</div>):(p.room===room&&
            <div key={i} className={styles.msgsmallright}>{p.sender} : {p.msg}</div>
          ))
          }
        </div>
        <div className={styles.msgsentbox}>
          <input className={styles.msginput}
            placeholder="Message..."
            onChange={(event) => {
            setMessage(event.target.value);
            }}
          />
          <button className={styles.msgbutton} onClick={sendMessage}> Send </button>
        </div>
      
      
      </div>
      <div className={styles.groupbox}>
              <div className={styles.groupheading}>Avaliable Groups</div>
              <div className={styles.groupbody}>
              {allrooms?.map((p,i)=><div key={i} className={styles.roomsname} onClick={()=>{roomChange(p)}}>{p}</div>)}
              </div>
             
           </div>
      </div>
      
      
    </div>
  );
}

export default Home;
