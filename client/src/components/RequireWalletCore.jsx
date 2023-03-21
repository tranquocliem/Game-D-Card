import React from "react";
import styles from "../styles";

const RequireWalletCore = () => {
  return (
    <div className={`${styles.flexBetween} ${styles.gameLoadContainer}`}>
      <div className={`flex-1 ${styles.flexCenter} flex-col`}>
        <h1 className={`${styles.headText} text-center`}>
          Bạn chưa thể chơi game <br /> cần cài đặt ví Core
        </h1>
        <p className={styles.gameLoadText}>
          Để cài ví Core bạn vào link này:{" "}
          <a
            className="hover:text-violet-500 text-violet-400"
            href="https://chrome.google.com/webstore/detail/core-crypto-wallet-nft-ex/agoakfejjabomempkjlepdflaleeobhb?hl=en-US"
          >
            Link Tại Đây
          </a>
        </p>
      </div>
    </div>
  );
};

export default RequireWalletCore;
