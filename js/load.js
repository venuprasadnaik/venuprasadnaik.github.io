/*
 *
 * Venuprasad Naik 
 * vpnaik97@gmail.com
 * 1/1/2021
 * 
 */

var socialtags = [{
    img: "img/github.svg",
    link: "https://github.com/venuprasadnaik"
}, {
    img: "img/linkedin.svg",
    link: "https://www.linkedin.com/in/venuprasad/"
}, {
    img: "img/stackoverflow.svg",
    link: "https://www.stackoverflow.com/story/venuprasad"
}, {
    img: "img/twitter.svg",
    link: "https://twitter.com/venuprasad_naik"
}, {
    img: "img/download-cloud.svg",
    link: "resume/Venuprasad_Naik_Software_Developer.pdf"
}]

function loadSocialIcons() {
    var socialtext = ""
    for (x in socialtags) {
        var data = `<a class="center" href="` + socialtags[x].link + `"> <img class="center" style="padding: 5px!important;width: 40px;" src="` + socialtags[x].img + `"></a>`
        socialtext += data
    }
    document.getElementById("social-list").innerHTML = socialtext;
}

loadSocialIcons()

function dayNightToggle() {
    var element = document.body;
    element.classList.toggle("light-mode");
    var check = window.localStorage.getItem('light-mode');
    if (check == "light") {
        window.localStorage.clear();
    } else {
        window.localStorage.setItem('light-mode', 'light');
    }

}

function checkDayNight() {
    var check = window.localStorage.getItem('light-mode');
    var element = document.body;
    if (check == "light") {
        element.classList.add("light-mode");
    } else {
        element.classList.remove("light-mode");
    }
}

checkDayNight()

function calculateYOE() {
    span = document.getElementById('experience');
    txt = document.createTextNode(getExperience("08/06/2018")); //MM/DD/YYY
    span.innerText = txt.textContent;
    function getExperience(dateString) {
        var now = new Date();
        var today = new Date(now.getYear(), now.getMonth(), now.getDate());

        var yearNow = now.getYear();
        var monthNow = now.getMonth();
        var dateNow = now.getDate();

        var dob = new Date(dateString.substring(6, 10),
            dateString.substring(0, 2) - 1,
            dateString.substring(3, 5)
        );

        var yearJoined = dob.getYear();
        var monthJoined = dob.getMonth();
        var dateJoined = dob.getDate();
        var exp = {};
        var expString = "";
        var yearString = "";
        var monthString = "";

        var yearExp = yearNow - yearJoined;

        if (monthNow >= monthJoined)
            var monthExp = monthNow - monthJoined;
        else {
            yearExp--;
            var monthExp = 12 + monthNow - monthJoined;
        }

        if (dateNow >= dateJoined)
            var dateExp = dateNow - dateJoined;
        else {
            monthExp--;
            var dateExp = 31 + dateNow - dateJoined;

            if (monthExp < 0) {
                monthExp = 11;
                yearExp--;
            }
        }

        exp = {
            years: yearExp,
            months: monthExp,
            days: dateExp
        };

        if (exp.years > 1) yearString = " years";
        else yearString = " year";
        if (exp.months > 1) monthString = " months";
        else monthString = " month";
        if ((exp.years > 0) && (exp.months > 0) && (exp.days > 0))
            expString = exp.years + yearString + " " + exp.months + monthString;
        else if ((exp.years > 0) && (exp.months == 0) && (exp.days > 0))
            expString = exp.years + yearString;
        return expString;
    }
}

calculateYOE()