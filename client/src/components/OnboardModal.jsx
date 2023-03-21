import { useState, useEffect } from "react";
import Modal from "react-modal";

import styles from "../styles";
import { CustomButton } from ".";
import { useGlobalContext } from "../context";
import { GetParams, SwitchNetwork } from "../utils/onboard.js";

const OnboardModal = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const { updateCurrentWalletAddress } = useGlobalContext();
  const [step, setStep] = useState(-1);

  async function resetParams() {
    const currentStep = await GetParams();
    setStep(currentStep.step);
    setIsOpen(currentStep.step !== -1);
  }

  useEffect(() => {
    resetParams();

    window?.ethereum?.on("chainChanged", () => {
      resetParams();
    });

    window?.ethereum?.on("accountsChanged", () => {
      resetParams();
    });
  }, []);

  const generateStep = (st) => {
    switch (st) {
      case 0:
        return (
          <>
            <p className={styles.modalText}>Bạn chưa cài đặt Core Wallet!</p>
            <CustomButton
              title="Download Core"
              handleClick={() => window.open("https://core.app/", "_blank")}
            />
          </>
        );

      case 1:
        return (
          <>
            <p className={styles.modalText}>
              Bạn chưa kết nối tài khoản của mình với Core Wallet!
            </p>
            <CustomButton
              title="Connect Account"
              handleClick={updateCurrentWalletAddress}
            />
          </>
        );

      case 2:
        return (
          <>
            <p className={styles.modalText}>
              Bạn đang ở trên một network khác. Chuyển sang Fuji C-Chain.
            </p>
            <CustomButton title="Chuyển" handleClick={SwitchNetwork} />
          </>
        );

      case 3:
        return (
          <>
            <p className={styles.modalText}>
              Rất tiếc, bạn không có tokens AVAX trong tài khoản của mình
            </p>
            <CustomButton
              title="Lấy một số mã thông báo thử nghiệm"
              handleClick={() =>
                window.open("https://faucet.avax.network/", "_blank")
              }
            />
          </>
        );

      default:
        return <p className={styles.modalText}>Tốt chơi nào!</p>;
    }
  };

  return (
    <Modal
      isOpen={modalIsOpen}
      className={`absolute inset-0 ${styles.flexCenter} flex-col ${styles.glassEffect}`}
      overlayClassName="Overlay"
    >
      {generateStep(step)}
    </Modal>
  );
};

export default OnboardModal;
