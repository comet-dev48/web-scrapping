// const express = require('express');
// const app = express();
var rp = require('request-promise');
const $ = require('cheerio');



rp('https://www.indeed.com/jobs?as_and=javascript+developer&as_phr=&as_any=&as_not=&as_ttl=&as_cmp=&jt=all&st=&as_src=&salary=&radius=25&l=minneapolis&fromage=3&limit=10&sort=&psf=advsrch')
    .then( (html) => {
        let jobsToDisplay = [];
        const jobTitle = $('.title', html);
        const jobCompany = $('.company', html);
        
        for(let i = 0; i < 1; i ++) {
            jobsToDisplay.push({
                title: jobTitle[i].children[1].attribs.title,
                href: 'www.indeed.com' + jobTitle[i].children[1].attribs.href,
                company: jobCompany[i].children[0].data.trim(),
            })
        }
        

        console.log(jobsToDisplay);



                // 
            // })
        // }
    })
    .catch((error) => {
        console.log('error with scraping', error);
    });


// app.listen(5000, () => {
//     console.log('on port 5000');
// })
