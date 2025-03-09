import React, { useState, useEffect } from 'react';
import DevImg from "../../public/img/dev.png";
import Image from "next/image";
import faGithub from "../../public/img/github.svg";
import faLinkedin from "../../public/img/linkedin.svg";
import Resume from "../../public/img/download-cloud.svg";
import Twitter from "../../public/img/twitter.svg";
import { Poppins } from 'next/font/google'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ["100", "200", "500"],
  display: "swap"
})

const Home = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  useEffect(() => {
    const element = document.body;
    if (isDarkMode) {
      element.classList.add("light-mode");
      window.localStorage.setItem('light-mode', 'light');
    } else {
      element.classList.remove("light-mode");
      window.localStorage.removeItem('light-mode');
    }
  }, [isDarkMode]);

  const socialIcons = [
    {
      icon: faGithub,
      link: "https://github.com/venuprasadnaik",
      title: "GitHub",
    },
    {
      icon: faLinkedin,
      link: "https://www.linkedin.com/in/venuprasad/",
      title: "LinkedIn",
    },
    // {
    //   icon: Resume,
    //   link: "/resume/Venuprasad_Naik_Software_Developer.pdf",
    //   title: "Resume",
    // },
    {
      icon: Twitter,
      link: "https://www.stackoverflow.com/story/venuprasad",
      title: "Twitter"
    }
  ];

  const experienceInYears = () => {
    const startDate = new Date("08/06/2018");
    const currentDate = new Date();
    const diffInMs = Math.abs(currentDate - startDate);
    const diffInMonths = Math.round(diffInMs / (1000 * 60 * 60 * 24 * 30.44));
    const years = Math.floor(diffInMonths / 12);
    const months = diffInMonths % 12;
    const yearString = years > 0 ? years + " year" + (years > 1 ? "s" : "") : "";
    const monthString =
      months > 0 ? " and " + months + " month" + (months > 1 ? "s" : "") : "";
    return yearString + monthString;
  };

  return (
    <main className={poppins.className}>
      <button onClick={toggleDarkMode}>
        Toggle {isDarkMode ? "light" : "dark"} mode
      </button>
      <div className="container vertical-center">
        <div className="row spacing">
          <Image
            className="center col-10 col-sm-10 col-lg-5 col-md-5 spacing"
            src={DevImg}
            width={500}
            height={500}
            alt="Developer"
          />
          <div className="col-10 col-sm-10 col-lg-7 col-md-7 center spacing">
            <h1>Hi, I am Venuprasad</h1>
            <p className="title-desc center">
              A curious and experienced programmer with over{" "}
              <span id="experience">{experienceInYears()}</span> of experience in
              the software development field. With extensive experience in Java,
              Spring Framework, Oracle Cloud, Object-Oriented Programming (OOP),
              Kafka, Kubernetes, and Docker.
            </p>
            <div className="col-md-6 col-sm-7 center">
              <div className="row" id="social-list">
                {socialIcons.map((icon, index) => (
                  <a
                    key={index}
                    href={icon.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={icon.title}
                    className="center"
                  >
                    <Image src={icon.icon} width={40} className="center social-link" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
