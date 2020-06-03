import React, { useState } from "react";

const About = () => {
  const [engLang, setlang] = useState<boolean>(false);

  return (
    <div className="about">
      <div className="about__lang">
        <span
          onClick={() => {
            setlang(true);
          }}
        >
          Eng
        </span>
        <span
          onClick={() => {
            setlang(false);
          }}
        >
          Rus
        </span>
      </div>
      {engLang ? <AboutEng /> : <AboutRus />}
    </div>
  );
};

export default About;

const AboutRus = () => {
  return (
    <div className="about-content">
      <h1>О приложении React App</h1>
      <p>
        Данное приложение представляет собой социальную сеть, построенную на
        основе библиотек <b>React JS</b> (create-react-app) и <b>Redux.</b>
      </p>
      <p>
        Архитектура приложении состоит из функциональных компонент с применением{" "}
        <b>HOOKS</b>.
      </p>
      <p>
        Формы логинизации и редактирования профиля созданы с помощью{" "}
        <b>Redux Form</b>. Осуществляется валидация полей.
      </p>
      <p>
        В процессе создания, в некоторых случаях, в рамках изучения, применялась
        типизация
        <b> TypeScript</b>.
      </p>
      <p>
        Для стилизации сайта используется препроцессор <b>SASS</b>
        (scss).
      </p>
      Серверный API{" "}
      <a href="https://social-network.samuraijs.com/" target="_blanc">
        Social Network API.
      </a>
      <hr />
      <p>
        Для тестирования и ознакомления с данным программным обеспечением
        используйте тестовый логин:{" "}
        <p>
          <b>Email:</b> free@samuraijs.com
        </p>{" "}
        <p>
          <b>Password:</b> free
        </p>
      </p>
      Исходный код данного приложения на GitHub{" "}
      <a href="https://github.com/antonK-86/social-link_ts" target="_blanc">
        здесь.
      </a>
      <p>
        <hr />
        <b>Первая</b> версия данного сайта, построенная на классовых
        компонентах:{" "}
        <a
          href="https://antonk-86.github.io/project-social_link"
          target="_blanc"
        >
          https://antonk-86.github.io/project-social_link
        </a>
      </p>
      Ее исходный код:{" "}
      <a
        href="https://github.com/antonK-86/project-social_link"
        target="_blanc"
      >
        https://github.com/antonK-86/project-social_link
      </a>
    </div>
  );
};

const AboutEng = () => {
  return (
    <div className="about-content">
      <h1>About React App</h1>
      <p>
        This application is a social network built on the basis of the{" "}
        <b>React JS</b> (create-react-app) and <b>Redux</b> libraries.
      </p>
      <p>
        Application architecture consists of functional components using{" "}
        <b>HOOKS</b>.
      </p>
      <p>
        Logic forms and profile corrections are created using <b>Redux Form</b>.
        Field validation.
      </p>
      <p>
        In the process of creation, in some cases, as part of the study, it was
        applied typing
        <b> TypeScript</b>.
      </p>
      <p>
        Preprocessor technology was applied to style the site. <b>SASS</b>
        (scss).
      </p>
      Used server API{" "}
      <a href="https://social-network.samuraijs.com/" target="_blanc">
        Social Network API.
      </a>
      <hr />
      <p>
        For testing and familiarization with this software use test login:{" "}
        <p>
          <b>Email:</b> free@samuraijs.com
        </p>{" "}
        <p>
          <b>Password:</b> free
        </p>
      </p>
      The source code of this application on GitHub{" "}
      <a href="https://github.com/antonK-86/social-link_ts" target="_blanc">
        here.
      </a>
      <p>
        <hr />
        <b>First</b> version of this site, built on class components:{" "}
        <a
          href="https://antonk-86.github.io/project-social_link"
          target="_blanc"
        >
          https://antonk-86.github.io/project-social_link
        </a>
      </p>
      Source code:{" "}
      <a
        href="https://github.com/antonK-86/project-social_link"
        target="_blanc"
      >
        https://github.com/antonK-86/project-social_link
      </a>
    </div>
  );
};
