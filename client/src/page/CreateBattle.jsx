import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import styles from "../styles";
import { useGlobalContext } from "../context";
import { CustomButton, CustomInput, PageHOC, GameLoad } from "../components";

const CreateBattle = () => {
  const {
    contract,
    gameData,
    battleName,
    setBattleName,
    setErrorMessage,
    walletAddress,
  } = useGlobalContext();
  const [waitBattle, setWaitBattle] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const player = async () => {
      try {
        const playerExists = await contract.isPlayer(walletAddress);
        if (!playerExists) navigate("/");
      } catch (error) {
        setErrorMessage(error);
      }
    };
    player();
    if (gameData?.activeBattle?.battleStatus === 1) {
      navigate(`/tran-dau/${gameData.activeBattle.name}`);
    } else if (gameData?.activeBattle?.battleStatus === 0) {
      setWaitBattle(true);
    }
  }, [gameData]);

  const handleClick = async () => {
    if (!battleName || !battleName.trim()) return null;

    try {
      await contract.createBattle(battleName);
      setWaitBattle(true);
    } catch (error) {
      setErrorMessage(error);
    }
  };

  return (
    <>
      {waitBattle && <GameLoad />}
      <div className="flex flex-col mb-5">
        <CustomInput
          label="Trận Đấu"
          placeHolder="Nhập tên trận đấu"
          value={battleName}
          handleValueChange={setBattleName}
        />
        <CustomButton
          title="Tạo Trận Đấu"
          handleClick={handleClick}
          restStyles="mt-6"
        />
      </div>
      <p className={styles.infoText} onClick={() => navigate("/phong-dau")}>
        Hoặc tham gia các trận chiến đã có sẵn
      </p>
    </>
  );
};

export default PageHOC(
  CreateBattle,
  <>
    Tạo <br /> phòng đấu mới
  </>,
  <>
    Tạo trận đấu của riêng bạn và chờ đợi những người chơi khác tham gia cùng
    bạn
  </>
);
