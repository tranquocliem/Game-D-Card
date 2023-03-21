import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useGlobalContext } from "../context";
import { CustomButton, PageHOC } from "../components";
import styles from "../styles";

function JoinBattle() {
  const navigate = useNavigate();
  const {
    contract,
    gameData,
    setShowAlert,
    setBattleName,
    walletAddress,
    setErrorMessage,
  } = useGlobalContext();

  useEffect(() => {
    if (gameData?.activeBattle?.battleStatus === 1)
      navigate(`/battle/${gameData.activeBattle.name}`);
  }, [gameData]);

  const handleClick = async (battleName) => {
    setBattleName(battleName);

    try {
      await contract.joinBattle(battleName);

      setShowAlert({
        status: true,
        type: "success",
        message: `Đang vào ${battleName}`,
      });
    } catch (error) {
      setErrorMessage(error);
    }
  };
  return (
    <>
      <h2 className={styles.joinHeadText}>Trận chiến có sẵn:</h2>
      <div className={styles.joinContainer}>
        {gameData.pendingBattles.length ? (
          gameData.pendingBattles
            .filter(
              (battle) =>
                !battle.players.includes(walletAddress) &&
                battle.battleStatus !== 1
            )
            .map((battle, index) => (
              <div key={battle.name + index} className={styles.flexBetween}>
                <p className={styles.joinBattleTitle}>
                  {index + 1}. {battle.name}
                </p>
                <CustomButton
                  title="Join"
                  handleClick={() => handleClick(battle.name)}
                />
              </div>
            ))
        ) : (
          <p className={styles.joinLoading}>
            Tải lại trang để xem các trận đánh mới
          </p>
        )}
      </div>
      <p className={styles.infoText} onClick={() => navigate("/tao-phong-dau")}>
        Hoặc tạo một trận chiến mới
      </p>
    </>
  );
}

export default PageHOC(
  JoinBattle,
  <>
    Tham Gia <br /> Cuộc Đấu
  </>,
  <>Tham gia các trận chiến đã có sẵn</>
);
