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
const Home = () => {
  return (
    <div className={styles.home}>
      <div className={styles.left}>
        <div className={styles.leftnav}>
          <span className={styles.leftspan}>Chats</span>
          <div className={styles.logos}>
            <Image src={write} className={styles.logoItems} />
            <Image src={threeLine} className={styles.logoItems} />
          </div>
        </div>
        <input
          type="text"
          className={styles.input}
          placeholder="Search or start new chats"
        />
        <div className={styles.peoples}>
          <div className={styles.people}>
            <Image src={profile} className={styles.profile} />
            <span className={styles.name}>name</span>
          </div>
          <div className={styles.people}>
            <Image src={profile} className={styles.profile} />
            <span className={styles.name}>name</span>
          </div>

          <div className={styles.people}>
            <Image src={profile} className={styles.profile} />
            <span className={styles.name}>name</span>
          </div>
          <div className={styles.people}>
            <Image src={profile} className={styles.profile} />
            <span className={styles.name}>name</span>
          </div>
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.rightnav}>
          <div className={styles.right_people}>
            <Image src={profile} className={styles.profile} />
            <span className={styles.name}>name</span>
          </div>
          <div className={styles.logos}>
            <Image src={video} className={styles.video} />
            <Image src={audio} className={styles.audio} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
