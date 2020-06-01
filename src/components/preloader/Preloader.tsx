import React from "react";
import preloader from "./preloader.svg";

const Preloader = () => {
  return (
    <div className="preloader_container">
      <img src={preloader} alt="preloader" className="preloader" />
    </div>
  );
};

export default Preloader;
