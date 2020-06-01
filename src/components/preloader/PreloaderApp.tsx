import React from "react";
import preloader from "./preloader.svg";

export const PreloaderApp = () => {
  return (
    <div className="preloader-app">
      <img src={preloader} alt="preloader" />
    </div>
  );
};

export default PreloaderApp;
