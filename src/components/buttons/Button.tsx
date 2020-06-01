import React, { useState } from "react";

export const Button = (props: any) => {
  let [click, setClick] = useState(false);

  let onClick = click;

  const handleClick = () => {
    setClick(!onClick);
    setTimeout(() => setClick(onClick), 170);
  };
  return (
    <button
      type="button"
      className={"btn " + props.addClass + " " + (click ? "btn-click" : "")}
      onClick={handleClick}
    >
      <span className="btn-text">{props.text}</span>
    </button>
  );
};

export const ButtonAdd = (props: any) => {
  let [click, setClick] = useState(false);

  let onClick = click;
  const handleClick = () => {
    setClick(!onClick);
    setTimeout(() => setClick(onClick), 170);
    setTimeout(() => props.addUsersOnList(), 200);
  };

  return (
    <button
      type="button"
      className={"btn btn-round " + (click && "btn-click")}
      onClick={handleClick}
    >
      <span className="btn-text">Show other users</span>
    </button>
  );
};

export const ButtonFollow = (props: any) => {
  let [click, setClick] = useState(false);

  let onClick = click;
  const handleClick = (event: any) => {
    event.preventDefault();
    setClick(!onClick);
    setTimeout(() => setClick(onClick), 170);
  };

  return (
    <button
      type="button"
      className={"btn btn-follow " + (click && "btn-click")}
      onClick={handleClick}
    >
      <span className="btn-text">{props.follow}</span>
    </button>
  );
};

export const ButtonSaveProfile = (props: any) => {
  let [click, setClick] = useState(false);

  let onClick = click;
  const handleClick = () => {
    setClick(!onClick);
    setTimeout(() => setClick(onClick), 170);
  };
  return (
    <div
      className={"btn btn_save-profile " + (click && "btn-click")}
      onClick={handleClick}
    >
      {props.children}
    </div>
  );
};

export const ButtonLoading = (props: any) => {
  return (
    <div className="btn btn-loading">
      <span className="btn-loading-icon">
        <span className="anticon-loading">
          <svg
            viewBox="0 0 1024 1024"
            focusable="false"
            className="anticon-spin"
            data-icon="loading"
            width="1em"
            height="1em"
            fill="cornsilk"
            aria-hidden="true"
          >
            <path d="M988 548c-19.9 0-36-16.1-36-36 0-59.4-11.6-117-34.6-171.3a440.45 440.45 0 00-94.3-139.9 437.71 437.71 0 00-139.9-94.3C629 83.6 571.4 72 512 72c-19.9 0-36-16.1-36-36s16.1-36 36-36c69.1 0 136.2 13.5 199.3 40.3C772.3 66 827 103 874 150c47 47 83.9 101.8 109.7 162.7 26.7 63.1 40.2 130.2 40.2 199.3.1 19.9-16 36-35.9 36z"></path>
          </svg>
        </span>
      </span>
      <span>Loading</span>
    </div>
  );
};
