var mysql = require('mysql');
var request = require("request");  
var cheerio = require("cheerio");  
var url = "https://www.ted.com/talks?language=ko&sort=newest&topics%5B%5D=astronomy"; // topic = 1 (천문학)(url에 맞춰 ted.topic 번호 바꿔줄 것)
/*var url = "https://www.ted.com/talks?language=ko&sort=newest&topics%5B%5D=biotech";*/ // topic = 2 (바이오테크)
/*var url = "https://www.ted.com/talks?language=ko&sort=newest&topics%5B%5D=finance";*/ // topic = 3 (재무)
var dbConnection = mysql.createConnection({   
   host: 'localhost', 
   user: 'java89',   
   password: '1111',   
   database: 'dreamtree' 
});

function Ted() {
   this.topic = 1;
   this.cono = 0;
   this.count = 0;
   this.crtitle = new Array();
   this.anker = new Array();
   this.thumImg = new Array();
   this.author = new Array();
   this.vodsc = new Array(); 
   this.simg = new Array(); 
   this.spnm = new Array(); 
   this.spdsc = new Array();
   this.posted = new Array();
}

Ted.prototype.addCrTitle = function(title) {
   this.crtitle.push(title);
};
Ted.prototype.addAnker = function(anker) {
   this.anker.push(anker);
};
Ted.prototype.addThumImg = function(thumImg) {
   this.thumImg.push(thumImg);
};
Ted.prototype.addAuthor = function(author) {
   this.author.push(author);
};
Ted.prototype.addVodsc = function(vodsc) {
   this.vodsc.push(vodsc);
};
Ted.prototype.addSimg = function(simg) {
   this.simg.push(simg);
};
Ted.prototype.addSpnm = function(spnm) {
   this.spnm.push(spnm);
};
Ted.prototype.addSpdsc = function(spdsc) {
   this.spdsc.push(spdsc);
};
Ted.prototype.addPosted = function(posted) {
   this.posted.push(posted);
};

function EachTed() {
   this.cono = 0;
   this.count = 0;
   this.crtitle = new Array(); 
   this.anker = new Array();
   this.thumImg = new Array();
   this.author = new Array();
   this.vodsc = new Array(); 
   this.simg = new Array(); 
   this.spnm = new Array(); 
   this.spdsc = new Array();
   this.posted = new Array();
}

EachTed.prototype.addCrTitle = function(title) {
   this.crtitle.push(title);
};
EachTed.prototype.addAnker = function(anker) {
   this.anker.push(anker);
};
EachTed.prototype.addThumImg = function(thumImg) {
   this.thumImg.push(thumImg);
};
EachTed.prototype.addAuthor = function(author) {
   this.author.push(author);
};
EachTed.prototype.addVodsc = function(vodsc) {
   this.vodsc.push(vodsc);
};
EachTed.prototype.addSimg = function(simg) {
   this.simg.push(simg);
};
EachTed.prototype.addSpnm = function(spnm) {
   this.spnm.push(spnm);
};
EachTed.prototype.addSpdsc = function(spdsc) {
   this.spdsc.push(spdsc);
};
EachTed.prototype.addPosted = function(posted) {
   this.posted.push(posted);
};

request(url, function(error, response, html){
       if (error) {return conole.log(error)};
   
       var ted = new Ted();
       var post = Array();

       var a = cheerio.load(html);
       a('div.media__message h4.h9').each(function(){ // 제목
          ted.addCrTitle(a(this).text().replace(/\n/g, ""));
//          console.log("제목"+ted.crtitle);
       });
//       console.log(ted.crtitle);
//       console.log("----------------");
       
       a('div.media__image > a').each(function(){ // 영상 넘어가는 주소
//          console.log('=>',a(this).attr("href") );
          ted.addAnker("https://www.ted.com" + a(this).attr("href"));
       });
//       console.log(ted.anker.length, ted.anker);
//       console.log(ted.anker[0]);
//       console.log("----------------");
       
       a('img.thumb__image').each(function(){ // 비디오 썸네일
          ted.addThumImg(a(this).attr("src"));
       });
       a('div.media__message h4.h12').each(function(){ // speaker 이름
          ted.addAuthor(a(this).text());
       });
       a('div.media__message .meta__item .meta__val').each(function(){ // 날짜
           post = a(this).text().replace(/\n/g, "").split(" ");
          switch(post[0]) {
          case "Jan": post[0] = "0"+1; break;
          case "Feb": post[0] = "0"+2; break;
          case "Mar": post[0] = "0"+3; break;
          case "Apr": post[0] = "0"+4; break;
          case "May": post[0] = "0"+5; break;
          case "Jun": post[0] = "0"+6; break;
          case "Jul": post[0] = "0"+7; break;
          case "Aug": post[0] = "0"+8; break;
          case "Sep": post[0] = "0"+9; break;
          case "Oct": post[0] = 10; break;
          case "Nov": post[0] = 11; break;
          case "Dec": post[0] = 12; break;
          }
          ted.addPosted(post[1] + post[0]);
        });

      dbConnection.query(
           'select cono from contents ORDER BY cono desc;', 
           function(err, rows, fields) { // 서버에서 결과를 받았을 때 호출되는 함수
              // connection.query () 을 실행하고 결과가 나온다음 이 function을 실행해라.
              if (err) throw err;
              
            console.log('select contents 153', rows[0].cono);
            ted.cono = rows[0].cono + 1;
            setTimeout(function() {
               eachCrowl(ted);
            }, 1000);
      });
});

var nextEach = true;
var index = 0;

function eachCrowl(ted) {
   console.log('eachCrowl(ted) 165', index);
   setInterval(function() {
      if (nextEach == true && ted.anker.length >= index) {
         nextEach = false;
         var eachTed = new EachTed();
         var i = index;
         eachTed.addCrTitle(ted.crtitle[i]);
         eachTed.addAnker(ted.anker[i]);
         eachTed.addThumImg(ted.thumImg[i]);
         eachTed.addAuthor(ted.author[i]);
         eachTed.addPosted(ted.posted[i]);
         var anker = ted.anker[i];
         crowl(ted, eachTed, anker);
         index++;
      }
   }, 1000);
}

function crowl(ted, eachTed, anker) {
   request(anker, function(error, response, html){
      if (error) {return console.log(error)};
          console.log("crowl(ted) 186", anker);
      var a = cheerio.load(html);

      eachTed.addVodsc(a('p.talk-description').text().replace(/\n/g, "").replace(/\r/g, "")); // 비디오 설명.
      eachTed.addSimg(a('a.talk-speaker__image img').attr("src")); // 스피커 이미지
      eachTed.addSpnm(a('div.talk-speaker__name > a').text());// 스피커 이름
      eachTed.addSpdsc(a('div.talk-speaker__description').text()); // 스피커 직업
      
      setInterval(function() {
         console.log('vodsc', 'spnm', 'spdsc', 'simg', '195');
         console.log('vodsc', eachTed.vodsc[0], 'spnm', eachTed.spnm[0], 'spdsc', eachTed.spdsc[0], 'simg', eachTed.simg[0]);
         video();
      }, 1000);

      function video() {
         dbConnection.query("insert into contents(type) values('video')",
               function(err, rows, fields) {
                   console.log("crowl(ted) 206", ted.cono);
                   var ti = 0;
                     while (true) {
                        setTimeout(function() {
                           console.log("insert contents 210", rows, ti++);
                        }, 1000);
                        if (rows != undefined) {
                           contents();
                           break;
                        }
                     }
            });
      }
      function contents() {
         dbConnection.query("insert into video(cono, kotl, entl, voimg, vodsc, spnm, sjob, simg, posted) values(?,?,?,?,?,?,?,?,?)", 
               [ted.cono, eachTed.crtitle[0], eachTed.anker[0], eachTed.thumImg[0], eachTed.vodsc[0], eachTed.spnm[0], eachTed.spdsc[0], eachTed.simg[0], eachTed.posted[0]],
               function (err, rows, fields) {
                   console.log("contents() 223", ted.cono);
                   console.log('title', eachTed.crtitle[0], 'anker', eachTed.anker[0], 'thumImg', eachTed.thumImg[0], 
                         'vodsc', eachTed.vodsc[0], 'spnm', eachTed.spnm[0], 'spdsc', eachTed.spdsc[0], 'simg', eachTed.simg[0], 'posted', eachTed.posted[0]);
                   var vi = 0;
                     while (true) {
                        setTimeout(function() {
                           console.log("insert video 229", rows, vi++);
                        }, 1000);
                        if (rows != undefined) {
                           copic();
                           break;
                        }
                     }
                  });
      }
      function copic() {
         dbConnection.query("insert into copic(tno, cono) values(?, ?)", 
               [ted.topic, ted.cono],
               function (err, rows, fields) {
                  console.log("copic() 242", ted.cono);
                   var ci = 0;
                     while (true) {
                        setTimeout(function() {
                           console.log("insert copic 246", rows, ci++);
                        }, 1000);
                        if (rows != undefined) {
                           ted.cono++;
                           nextEach = true;
                           break;
                        }
                     }
               });
      }
   });
}