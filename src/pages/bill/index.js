import React, { useState, useEffect } from 'react';
import DevImg from "/public/img/report.png";
import Image from "next/image";
import Resume from "/public/img/anu.png";
import Twitter from "/public/img/venu.png";
import { Poppins } from 'next/font/google'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ["100", "200", "500"],
  display: "swap"
})

const Bill = () => {
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
      icon: Resume,
      link: "Anu_April_2023.pdf",
      title: "Anu Bill",
    },
    {
      icon: Twitter,
      link: "Venu_April_2023.pdf",
      title: "Venu BIll"
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
            <h1>Internet Bill Generator</h1>
            
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
                    <Image src={icon.icon} width={150} height={150} className="center nextimg" />
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

export default Bill;
