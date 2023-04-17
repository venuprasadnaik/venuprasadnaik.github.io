import { readFileSync } from 'fs';
import { DateTime } from 'luxon';
import { generate } from 'randomstring';
import { launch } from 'puppeteer';

const names = ['Anu', 'Venu'];
const alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
const min = 100000;
const max = 999999;
const random = () => Math.floor(Math.random() * (max - min + 1)) + min;
const referenceID = `pay_${generate({ length: 14, charset: alphabet })}`;
const currentDate = DateTime.local();
const dueDate = DateTime.local().startOf('month');
const endDate = DateTime.local().endOf('month');
const billingPeriod = `${dueDate.toFormat('dd/MM/yyyy')} To ${endDate.toFormat('dd/MM/yyyy')}`;

const getPaidDateString = () => {
    const paidDate = dueDate;
    const hour = Math.floor(Math.random() * 4) + 8;
    const minute = Math.floor(Math.random() * 60);
    const amOrPm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour > 12 ? hour - 12 : hour;
    const strDaySuffix = getDaySuffix(paidDate.day);
    const month = paidDate.toFormat('LLL');
    const year = paidDate.toFormat('yyyy');
    return `${paidDate.day}<sup>${strDaySuffix}</sup> ${month} ${year} ${displayHour}:${minute}${amOrPm}`;
};

const getDaySuffix = (day) => {
    let strDaySuffix = 'th';
    if (day >= 1 && day <= 31) {
        switch (day % 10) {
            case 1:
                strDaySuffix = 'st';
                break;
            case 2:
                strDaySuffix = 'nd';
                break;
            case 3:
                strDaySuffix = 'rd';
                break;
            default:
                strDaySuffix = 'th';
                break;
        }
    }
    return strDaySuffix;
};

const replaceAll = (str, find, replace) => {
    return str.replace(new RegExp(find, 'g'), replace);
};

async function savePdf(htmlFile, outputFile) {
    const browser = await launch();
    const page = await browser.newPage();
    await page.setContent(htmlFile);
    const pdfOptions = {
        height: '11in',
        printBackground: true
    };
    const pdfBuffer = await page.pdf({ path: null, ...pdfOptions, width: "22cm", height: "29.71cm", margin: [0, 0, 0, 0] });
    await browser.close();
    return pdfBuffer;
}
export default async (req, res) => {
    const { name } = req.query;
    const filePath = `/Users/venuprasad/Downloads/GNET.html`;
    let fileContent = readFileSync(filePath, 'utf-8');
    if (name === 'Venu') {
        fileContent = replaceAll(fileContent, 'Anu Madhure C M', 'Venuprasad Naik');
        fileContent = replaceAll(fileContent, 'Anu1996', 'Venu1997');
        fileContent = replaceAll(fileContent, 'D/O MALLIKARJUNA SWAMY C J', '#27, 3rd floor, No.6, 4th Cross Road,');
        fileContent = replaceAll(fileContent, 'VAHAL NAGARA, BEHIND SHUTTLE COURT', 'Lakshmi Layout, Munnekollal, Bangalore,');
        fileContent = replaceAll(fileContent, 'CHALLAKERE,CHALLAKERE,Karnataka,India-577522', 'India-560037');
        fileContent = replaceAll(fileContent, '9060850280', '7259816840');
    }
    fileContent = replaceAll(fileContent, '335590', random()); // Bill No
    fileContent = replaceAll(fileContent, '435877', random()); // Order No
    fileContent = replaceAll(fileContent, '259393', random()); // Invoice No
    fileContent = replaceAll(fileContent, 'Billing_Date_Replacement', endDate.toFormat('dd/MM/yyyy')); // billing date
    fileContent = replaceAll(fileContent, 'Due_Date_Replacement', dueDate.toFormat('dd/MM/yyyy')); // due date
    fileContent = replaceAll(fileContent, 'Billing_Period_Replacement', billingPeriod); // Billing Period
    fileContent = replaceAll(fileContent, 'pay_LAe5xuAXuJCF8a', referenceID);
    fileContent = replaceAll(fileContent, '31<sup>st</sup> Jan 2023 09:34 AM', getPaidDateString());

    const filename = name + "_" + currentDate.monthLong + "_" + currentDate.year;

    const pdfBuffer = await savePdf(fileContent, filename);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `inline; filename="${filename}.pdf"`);
    res.status(200).send(pdfBuffer);
}


