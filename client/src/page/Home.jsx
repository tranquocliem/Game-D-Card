import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PageHOC, CustomInput, CustomButton } from "../components";
import { useGlobalContext } from "../context";

const Home = () => {
  const { contract, walletAddress, setShowAlert, gameData, setErrorMessage } =
    useGlobalContext();
  const [playerName, setPlayerName] = useState("");
  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      const playerExists = await contract.isPlayer(walletAddress);
      if (playerExists) return navigate("/tao-phong-dau");
      else {
        await contract.registerPlayer(playerName, playerName);

        setShowAlert({
          status: true,
          type: "info",
          message: `${playerName} is being summoned!`,
        });

        setTimeout(() => navigate("/tao-phong-dau"), 3000);
      }
    } catch (error) {
      setErrorMessage(error);
    }
  };

  useEffect(() => {
    const createPlayerToken = async () => {
      const playerExists = await contract.isPlayer(walletAddress);
      const playerTokenExists = await contract.isPlayerToken(walletAddress);
      if (playerExists && playerTokenExists) navigate("/tao-phong-dau");
    };

    if (contract) createPlayerToken();
  }, [contract]);

  useEffect(() => {
    if (gameData.activeBattle) {
      navigate(`/tran-dau/${gameData.activeBattle.name}`);
    }
  }, [gameData]);

  return (
    <>
      <div className="flex flex-col">
        <CustomInput
          label="Tên"
          placeHolder="Nhập tên người chơi của bạn"
          value={playerName}
          handleValueChange={setPlayerName}
        />

        <CustomButton
          title="Đăng ký"
          handleClick={handleClick}
          restStyles="mt-6"
        />
      </div>
    </>
  );
};

export default PageHOC(
  Home,
  <>
    Chào mừng đến với 2 Lá Bài <br /> một trò chơi bài Web3 NFT
  </>,
  <>
    Kết nối ví của bạn để bắt đầu chơi <br /> trò chơi thẻ bài chiến đấu trên
    web3
  </>
);
