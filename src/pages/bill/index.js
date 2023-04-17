import { Poppins } from 'next/font/google';
import Image from "next/image";
import { useEffect, useState } from 'react';
import Resume from "/public/img/anu.png";
import DevImg from "/public/img/report.png";
import Twitter from "/public/img/venu.png";
import { DateTime } from 'luxon';
import axios from 'axios';


const poppins = Poppins({
  subsets: ['latin'],
  weight: ["100", "200", "500"],
  display: "swap"
})

const Bill = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const generatePdf = async (name, event) => {
    event.preventDefault();

    try {
      setLoading(true);
      setError(null);

      const response = await axios.get(`/api/pdf?name=${name}`, {
        responseType: 'blob',
      });
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      const currentDate = DateTime.local();
      const filename = name + "_" + currentDate.monthLong + "_" + currentDate.year;
      console.log(name);
      link.setAttribute('download', `${filename}.pdf`);
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

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
      title: "Anu",
    },
    {
      icon: Twitter,
      link: "Venu_April_2023.pdf",
      title: "Venu"
    }
  ];

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
                    href="#" onClick={(event) => generatePdf(icon.title, event)}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={icon.title}
                    className="center"
                  >
                    <Image src={icon.icon} width={150} height={150} className="center nextimg" alt="Download" />
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
