import React from "react";
import cls from "./DemoWorks.module.css";

const DemoWorks = () => {
  return (
    <div className={cls.demo}>
      <h1>Demo projects</h1>
      <br />
      <div className={cls.demoContainer}>
        <a
          href="https://antonk-86.github.io/mydemoprojects.github.io/content/ActiveBox/index.html"
          target="blanc"
        >
          <div className={cls.demoContainer_item + " " + cls.activeb}></div>
        </a>
        <a
          href="https://antonk-86.github.io/mydemoprojects.github.io/content/FashionShop/index.html"
          target="blanc"
        >
          <div className={cls.demoContainer_item + " " + cls.fashion}></div>
        </a>
        <a
          href="https://antonk-86.github.io/mydemoprojects.github.io/content/ShopInc/index.html"
          target="blanc"
        >
          <div className={cls.demoContainer_item + " " + cls.incdy}></div>
        </a>
        <a
          href="https://antonk-86.github.io/mydemoprojects.github.io/content/Mogo/index.html"
          target="blanc"
        >
          <div className={cls.demoContainer_item + " " + cls.mogo}></div>
        </a>
        <a
          href="https://antonk-86.github.io/mydemoprojects.github.io/content/Surf/index.html"
          target="blanc"
          className={cls.demoContainer_item__a}
        >
          <div className={cls.demoContainer_item + " " + cls.surf}></div>
        </a>
      </div>
    </div>
  );
};

export default DemoWorks;
