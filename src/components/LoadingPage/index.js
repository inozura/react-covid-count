import React from "react";
import LoadingOutlined from "@ant-design/icons/LoadingOutlined";

const LoadingPage = () => {
  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        width: "100wh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <LoadingOutlined spin loop style={{ fontSize: 25, color: "skyblue" }} />
    </div>
  );
};

export default LoadingPage;
