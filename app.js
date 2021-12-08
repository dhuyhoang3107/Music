const $=document["querySelector"]["bind"](document);const $$=document["querySelectorAll"]["bind"](document);const playlist=$('.playlist');const cd=$('.cd');const heading=$('header h2');const thumb=$('.cd-thumb');const audio=$('#audio');const playBtn=$('.btn-toggle-play');const player=$('.player');const progress=$('#progress');const nextBtn=$('.btn-next');const prevBtn=$('.btn-prev');let newArray=[];var isMusic='vietnamese';const PlAYER_STORAGE_KEY="MUSIC_APP";const LIST_STORAGE_KEY="MUSIC_LIST";const random=$('.btn-random');const repeat=$('.btn-repeat');let indexArray=[];const app={currentIndex:0,isPlaying:false,isRandom:false,isRepeat:false,config:JSON["parse"](localStorage["getItem"](PlAYER_STORAGE_KEY))|| {},setConfig:function(key,value){this["config"][key]= value;localStorage["setItem"](PlAYER_STORAGE_KEY,JSON["stringify"](this["config"]))},songs:{vietnamese:[{name:"B\u01b0\u1edbc Qua Nhau",singer:"V\u0169",path:"https://c1-ex-swe.nixcdn.com/NhacCuaTui1024/BuocQuaNhau-Vu-7120388.mp3?st=I9W59X1Odyi9QRGTehWfHg&e=1638708688",image:"https://avatar-nct.nixcdn.com/song/2021/11/19/6/d/9/1/1637317177185.jpg"},{name:"\xC1i N\u1ed9",singer:"Masew, Kh\xF4i V\u0169",path:"https://c1-ex-swe.nixcdn.com/NhacCuaTui1021/AiNo1-MasewKhoiVu-7078913.mp3?st=ngcoKLRyRorVu8KqUeS1wg&e=1638762705",image:"https://avatar-nct.nixcdn.com/song/2021/08/30/2/1/a/e/1630316309035.jpg"},{name:"Mu\u1ed9n R\u1ed3i M\xE0 Sao C\xF2n",singer:"S\u01a1n T\xF9ng M-TP",path:"https://c1-ex-swe.nixcdn.com/Believe_Audio19/MuonRoiMaSaoCon-SonTungMTP-7011803.mp3?st=tD-Ln6qGqkdH659AeuHsjQ&e=1638782546",image:"https://avatar-nct.nixcdn.com/song/2021/04/29/9/1/f/8/1619691182261.jpg"},{name:"Th\u1ee9c Gi\u1ea5c",singer:"Da LAB",path:"https://c1-ex-swe.nixcdn.com/NhacCuaTui1018/ThucGiac-DaLAB-7048212.mp3?st=1LcQhTisk8WrOQuzK4p86Q&e=1638782708",image:"https://avatar-nct.nixcdn.com/song/2021/07/14/8/c/f/9/1626231010810.jpg"},{name:"\u0110\u1ed9 T\u1ed9c 2",singer:"Masew, \u0110\u1ed9 Mixi, Ph\xFAc Du, Ph\xE1o",path:"https://c1-ex-swe.nixcdn.com/NhacCuaTui1020/DoToc2-MasewDoMixiPhucDuPhao-7064730.mp3?st=ehahZN3-iX9xYdBFgDgGcg&e=1638782785",image:"https://avatar-nct.nixcdn.com/song/2021/08/10/b/2/e/0/1628579601228.jpg"},{name:"Ch\xFAng Ta Sau N\xE0y",singer:"T.R.I",path:"https://c1-ex-swe.nixcdn.com/NhacCuaTui1010/ChungTaSauNay-TRI-6929586.mp3?st=l56Wr1fLE9fMnFehhpo5xg&e=1638782875",image:"https://avatar-nct.nixcdn.com/song/2021/01/27/5/2/2/b/1611738358661.jpg"},{name:"D\u1ecbu D\xE0ng Em \u0110\u1ebfn",singer:"ERIK, NinjaZ",path:"https://c1-ex-swe.nixcdn.com/NhacCuaTui1021/DiuDangEmDen-ERIKNinjaZ-7078877.mp3?st=QmjyqbnGv3jClPKm4oA1YQ&e=1638782938",image:"https://avatar-nct.nixcdn.com/song/2021/08/30/2/1/a/e/1630307726211.jpg"},{name:"H\u01b0\u01a1ng",singer:"V\u0103n Mai H\u01b0\u01a1ng, Negav",path:"https://c1-ex-swe.nixcdn.com/NhacCuaTui1010/Huong-VanMaiHuongNegav-6927340.mp3?st=PvHOWlRnF6TymvggYGding&e=1638783027",image:"https://avatar-nct.nixcdn.com/song/2021/01/22/9/f/2/1/1611280898757.jpg"},{name:"Mi\xEAn Man",singer:"DUTZUX",path:"https://c1-ex-swe.nixcdn.com/NhacCuaTui1024/MienMan-DUTZUX-7120884.mp3?st=yTOFq5aH8FGEvbm-_n_KTA&e=1638783090",image:"https://avatar-nct.nixcdn.com/song/2021/11/19/6/d/9/1/1637320885751.jpg"},{name:"c\xF3 h\u1eb9n v\u1edbi thanh xu\xE2n",singer:"MONSTAR",path:"https://c1-ex-swe.nixcdn.com/NhacCuaTui1020/cohenvoithanhxuan-MONSTAR-7050201.mp3?st=PjrrnZ2dZ3ffA6R7dRrppQ&e=1638783161",image:"https://avatar-nct.nixcdn.com/song/2021/07/16/f/4/9/8/1626425507034.jpg"}],english:[{name:"Stay",singer:"The Kid LAROI, Justin Bieber",path:"https://c1-ex-swe.nixcdn.com/NhacCuaTui1018/Stay-TheKidLAROIJustinBieber-7045258.mp3?st=tDMLXwH5rcrkO9nF-Y0mWA&e=1638769802",image:"https://avatar-nct.nixcdn.com/song/2021/07/09/5/5/8/2/1625815274622.jpg"},{name:"All Too Well",singer:"Taylor Swift",path:"https://c1-ex-swe.nixcdn.com/NhacCuaTui1024/AllTooWell10MinuteVersionTaylorsVersion-TaylorSwift-7120438.mp3?st=moySlM-gRk8kpSEQdA729g&e=1638673508",image:"https://avatar-nct.nixcdn.com/song/2021/11/23/d/a/a/e/1637643196932_300.jpg"},{name:"Equal In The Darkness",singer:"Steve Aoki, Th\xE1i Y L\xE2m (Jolin Tsai), MAX",path:"https://c1-ex-swe.nixcdn.com/NhacCuaTui1024/EqualInTheDarkness-SteveAokiThaiYLamJolinTsaiMAX-7116228.mp3?st=1TO5aq2W9pnBPnKJ-0BwLA&e=1638673651",image:"https://avatar-nct.nixcdn.com/song/2021/10/27/0/c/c/3/1635299658476_300.jpg"},{name:"Always Love You",singer:"Elton John, Young Thug, Nicki Minaj",path:"https://c1-ex-swe.nixcdn.com/Unv_Audio203/AlwaysLoveYou-EltonJohnYoungThugNickiMinaj-7114807.mp3?st=FjWol1PzZ4cmEPzH-8rKdQ&e=1638673737",image:"https://avatar-nct.nixcdn.com/song/2021/10/21/c/d/d/a/1634797395961.jpg"},{name:"Wildest Dreams (Taylor\'s Version)",singer:"Taylor Swift",path:"https://c1-ex-swe.nixcdn.com/NhacCuaTui1022/WildestDreamsTaylorsVersion-TaylorSwift-7090980.mp3?st=MqTkbQYsSI-Wri68OiCggA&e=1638673817",image:"https://avatar-nct.nixcdn.com/song/2021/09/17/5/a/b/4/1631889063619_300.jpg"},{name:"Lonely",singer:"Justin Bieber, Benny Blanco",path:"https://c1-ex-swe.nixcdn.com/Unv_Audio197/Lonely-JustinBieberbennyblanco-6993497.mp3?st=HfdveKXgMQiQEl5_nrafHg&e=1638784621",image:"https://avatar-nct.nixcdn.com/song/2020/10/16/7/4/6/2/1602823109092.jpg"},{name:"Intentions",singer:"Justin Bieber, Quavo",path:"https://c1-ex-swe.nixcdn.com/NhacCuaTui995/Intentions-JustinBieberQuavo-6217997.mp3?st=hcdpQpM3beevQ-_6KJ82dA&e=1638784782",image:"https://avatar-nct.nixcdn.com/song/2020/02/07/2/0/7/2/1581052824234.jpg"},{name:"Hold On",singer:"Justin Bieber, Dominic Fike",path:"https://c1-ex-swe.nixcdn.com/Unv_Audio201/HoldOn-JustinBieber-7103059.mp3?st=Jb7CePADDk5Lz9NMD9pSAQ&e=1638784678",image:"https://avatar-nct.nixcdn.com/song/2021/03/05/2/1/7/c/1614931554567.jpg"},{name:"Monster",singer:"Shawn Mendes, Justin Bieber",path:"https://c1-ex-swe.nixcdn.com/Unv_Audio188/Monster-ShawnMendesJustinBieber-6838261.mp3?st=w65iy6S0b1mtDlUnsZOceA&e=1638784732",image:"https://avatar-nct.nixcdn.com/song/2020/11/23/0/2/3/c/1606100084558.jpg"},{name:"All Around Me",singer:"Justin Bieber",path:"https://c1-ex-swe.nixcdn.com/NhacCuaTui995/AllAroundMe-JustinBieber-6223828.mp3?st=vvGCbil4vC_5l_05XNgOtw&e=1638873647",image:"https://avatar-nct.nixcdn.com/song/2020/02/14/a/9/d/b/1581658518670.jpg"}],korea:[{name:"Haru Haru",singer:"BIGBANG",path:"https://c1-ex-swe.nixcdn.com/YG_Audio1/HaruHaru-BIGBANG-6291516.mp3?st=Gspt0qSx7rVZoYeM-x2jXA&e=1638783344",image:"https://avatar-nct.nixcdn.com/song/2020/06/09/2/d/0/7/1591688793624.jpg"},{name:"Loser",singer:"BIGBANG",path:"https://c1-ex-swe.nixcdn.com/YG_Audio1/Loser-BIGBANG-6291940.mp3?st=Lhof5KoX62zevt2ZEXBP-A&e=1638783344",image:"https://avatar-nct.nixcdn.com/song/2019/07/10/f/2/6/d/1562734574215.jpg"},{name:"Let\'S Not Fall In Love",singer:"BIGBANG",path:"https://c1-ex-swe.nixcdn.com/YG_Audio1/LetSNotFallInLove-BIGBANG-6292282.mp3?st=fcFmzvoy9t6mhv487BnahA&e=1638783344",image:"https://avatar-nct.nixcdn.com/song/2019/07/10/f/2/6/d/1562734613690.jpg"},{name:"Blue",singer:"BIGBANG",path:"https://c1-ex-swe.nixcdn.com/YG_Audio1/Blue-BIGBANG-6292792.mp3?st=g0jDh_aS0bi75C3ZD9FhvA&e=1638783344",image:"https://avatar-nct.nixcdn.com/song/2019/08/08/1/e/0/1/1565247252132.jpg"},{name:"Bang Bang Bang",singer:"BIGBANG",path:"https://c1-ex-swe.nixcdn.com/YG_Audio1/BangBangBang-BIGBANG-6293092.mp3?st=6I573fkPVGoqOxI43cIGVw&e=1638783344",image:"https://avatar-nct.nixcdn.com/song/2019/07/10/f/2/6/d/1562734586323.jpg"},{name:"If You",singer:"BIGBANG",path:"https://c1-ex-swe.nixcdn.com/YG_Audio1/IfYou-BIGBANG-6292294.mp3?st=xp-NrUXRQJTWzQabivltww&e=1638783344",image:"https://avatar-nct.nixcdn.com/song/2019/07/10/f/2/6/d/1562734599196.jpg"},{name:"Horang Suwolga",singer:"Sangnoksu, Narae",path:"https://c1-ex-swe.nixcdn.com/NhacCuaTui1005/HorangSuwolga-SangnoksuNarae-6770371.mp3?st=Ks8apkixAmM2J_Yr8k0-eA&e=1638783344",image:"https://avatar-nct.nixcdn.com/song/2020/12/14/5/c/b/a/1607915686599.jpg"},{name:"Celebrity",singer:"IU",path:"https://c1-ex-swe.nixcdn.com/NhacCuaTui1011/Celebrity-IU-6938138.mp3?st=iM5VWwaQtj1ImVGkz3bq8Q&e=1638783344",image:"https://avatar-nct.nixcdn.com/song/2021/03/01/7/7/d/0/1614570355625.jpg"},{name:"Blueming",singer:"IU",path:"https://c1-ex-swe.nixcdn.com/NhacCuaTui992/Blueming-IU-6138404.mp3?st=HGiSqSggzq_yx7A8dWC5aQ&e=1638783344",image:"https://avatar-nct.nixcdn.com/song/2019/11/18/b/0/e/0/1574073260102.jpg"},{name:"Love Scenario",singer:"iKON",path:"https://c1-ex-swe.nixcdn.com/YG_Audio1/LoveScenario-iKON-6292220.mp3?st=GquH-Wmqa8cjZfNqRgIM7w&e=1638783344",image:"https://avatar-nct.nixcdn.com/song/2018/01/25/5/2/d/e/1516873006451.jpg"}],china:[{name:"M\u1ea1c Ly / \u83ab\u79bb (Gia Nam Truy\u1ec7n OST)",singer:"C\xFAc T\u1ecbnh Y (Ju Jing Yi)",path:"https://c1-ex-swe.nixcdn.com/NhacCuaTui1024/MacLyGiaNamTruyenOST-CucTinhYJuJingYi-7114103.mp3?st=1kYhMVrtp1prZDQLxMbXzQ&e=1638784935",image:"https://avatar-nct.nixcdn.com/song/2021/10/26/8/1/f/e/1635241730249.jpg"},{name:"Tay Tr\xE1i Ch\u1ec9 Tr\u0103ng / \u5de6\u624b\u6307\u6708",singer:"T\xE1t \u0110\u1ec9nh \u0110\u1ec9nh (Sa Ding Ding)",path:"https://c1-ex-swe.nixcdn.com/NhacCuaTui962/TayTraiChiTrang-TatDinhDinhSaDingDing-5431513.mp3?st=R7nm-Q6FxpUL0UxCDMq2ig&e=1638784935",image:"https://avatar-nct.nixcdn.com/song/2019/05/02/d/4/7/3/1556786602391.jpg"},{name:"S\u1ee9 Thanh Hoa / \u9752\u82b1\u74f7",singer:"Ch\xE2u Ki\u1ec7t Lu\xE2n (Jay Chou)",path:"https://c1-ex-swe.nixcdn.com/NhacCuaTui964/SuThanhHoa-ChauKietLuanJayChou-108110.mp3?st=ieBMFvjQWp7apqOrblPsiQ&e=1638784935",image:"https://avatar-nct.nixcdn.com/song/2019/08/07/3/6/d/a/1565165369019.jpg"},{name:"Phi \u0110i\u1ec3u V\xE0 Ve S\u1ea7u / \u98de\u9e1f\u548c\u8749",singer:"Nh\u1eadm Nhi\xEAn",path:"https://c1-ex-swe.nixcdn.com/NhacCuaTui1000/ChimBayCungVe-NhamNhien-6321767.mp3?st=OPJVhLrpz3u1cVbknHRjzw&e=1638784935",image:"https://avatar-nct.nixcdn.com/song/2020/07/03/8/9/c/9/1593752079734.jpg"},{name:"Mang Ch\u1ee7ng / \u8292\u79cd",singer:"\xC2m Khuy\u1ebft Thi Th\xEDnh, Tri\u1ec7u Ph\u01b0\u01a1ng T\u1ecbnh (Zhao Fangjing)",path:"https://c1-ex-swe.nixcdn.com/NhacCuaTui983/MangChung-TrieuPhuongTinhAmKhuyetThiThinh-5989054.mp3?st=9WINGtCn0ciu3GtGJODdrQ&e=1638784935",image:"https://avatar-nct.nixcdn.com/song/2019/08/05/1/9/9/6/1565016156395.jpg"},{name:"\u0110\u1ed3ng Tho\u1ea1i",singer:"Quang L\u01b0\u01a1ng (Michael Wong)",path:"https://c1-ex-swe.nixcdn.com/NhacCuaTui946/DongThoai-MichaelWongQuangLuong-161624.mp3?st=lVaJblR1dnRj2csOFwvkRA&e=1638784935",image:"https://avatar-nct.nixcdn.com/song/2019/08/07/3/6/d/a/1565163727207.jpg"},{name:"V\xF4 Ngu / \u65e0\u865e (Ch\xE2u Sinh Nh\u01b0 C\u1ed1 Ost)",singer:"L\xFD T\u1eed \u0110\xECnh (Mimi Lee), T\u1ec9nh Lung (Jing Long)",path:"https://c1-ex-swe.nixcdn.com/NhacCuaTui1020/VoNguChauSinhNhuCoOst-LyTuDinhMimiLeeTinhLungJingLong-7075326.mp3?st=H_9Pz6muAHchS9Pn6n3-qA&e=1638784935",image:"https://avatar-nct.nixcdn.com/song/2021/08/26/6/5/8/f/1629966116215.jpg"},{name:"\xC1i Th\u01b0\u01a1ng",singer:"\u0110\u1ed5ng Trinh (Dong Zhen)",path:"https://c1-ex-swe.nixcdn.com/NhacCuaTui155/AiThuong-DongTrinh_35bzb.mp3?st=xwSnK7z8klRBvJR4sKuo3Q&e=1638784935",image:"https://avatar-nct.nixcdn.com/singer/avatar/2017/03/22/7/e/b/2/1490170353513.jpg"},{name:"B\u1ea5t Nhi\u1ec5m / \u4e0d\u67d3 (H\u01b0\u01a1ng M\u1eadt T\u1ef1a Kh\xF3i S\u01b0\u01a1ng OST)",singer:"Mao B\u1ea5t D\u1ecbch (Mao Bu Yi)",path:"https://c1-ex-swe.nixcdn.com/NhacCuaTui960/BatNhiem-MaoBatDichMaoBuyi-5393965.mp3?st=-66MXvOtm335TBJ4NHba5Q&e=1638784935",image:"https://avatar-nct.nixcdn.com/song/2019/05/02/d/4/7/3/1556786553828.jpg"},{name:"Thi\u1ebfu Ni\xEAn / \u5c11\u5e74",singer:"M\u1ed9ng Nhi\xEAn (Meng Ran)",path:"https://c1-ex-swe.nixcdn.com/NhacCuaTui996/ThieuNien-MongNhienMengRan-6238337.mp3?st=izeVhk_T_SP2bFJHAjencQ&e=1638784935",image:"https://avatar-nct.nixcdn.com/song/2020/03/18/3/d/4/9/1584522109605.jpg"}],love:[]},handleEvents:function(isMusic){const cdWidth=cd["offsetWidth"];const _this=this;document["onscroll"]= function(){if($('.download.active')|| false){$('.download.active')["classList"]["remove"]('active')};const scrollTop=window["scrollY"]|| document["documentElement"]["scrollTop"];const newCdWidth=cdWidth- scrollTop;cd["style"]["width"]= newCdWidth> 0?newCdWidth+ "px":0;cd["style"]["opacity"]= newCdWidth/ cdWidth;if(scrollTop> 50){$('.locationmusic')["classList"]["add"]('none')}else {$('.locationmusic')["classList"]["remove"]('none')}};playBtn["onclick"]= function(){if(_this["isPlaying"]){audio["pause"]()}else {audio["play"]();_this["config"][isMusic]> 2?$(".song.active")["scrollIntoView"]({behavior:"smooth",block:"center"}):_this["scrollToActiveSong"](isMusic)}};const animateThumb=cd["animate"]([{transform:"rotate(360deg)"}],{duration:10000,iterations:Infinity});animateThumb["pause"]();this["hendleAbumMusic"](animateThumb);audio["onplay"]= function(){_this["isPlaying"]= true;player["classList"]["add"]("playing");animateThumb["play"]()};audio["onpause"]= function(){_this["isPlaying"]= false;player["classList"]["remove"]("playing");animateThumb["pause"]()};audio["ontimeupdate"]= function(){if(audio["duration"]){const progressPercent=Math["floor"]((audio["currentTime"]/ audio["duration"])* 100);progress["value"]= progressPercent}};progress["oninput"]= function(e){const seekTime=(audio["duration"]/ 100)* e["target"]["value"];audio["currentTime"]= seekTime};nextBtn["onclick"]= function(){if(_this["isRandom"]){_this["randomSong"](isMusic)};_this["nextSong"](isMusic);_this["renderSongs"](isMusic);_this["scrollToActiveSong"]();audio["play"]()};prevBtn["onclick"]= function(){if(_this["isRandom"]){_this["randomSong"](isMusic)};_this["prevSong"](isMusic);_this["renderSongs"](isMusic);_this["scrollToActiveSong"]();audio["play"]()};audio["onended"]= function(){if(_this["isRandom"]){_this["randomSong"](isMusic);audio["play"]()}else {if(_this["isRepeat"]){audio["play"]()}else {nextBtn["onclick"]()}}};random["onclick"]= function(){if(_this["isRepeat"]){_this["isRepeat"]=  !_this["isRepeat"];repeat["classList"]["toggle"]('active',_this["isRepeat"]);_this["setConfig"]('isRepeat',_this["isRepeat"])};_this["isRandom"]=  !_this["isRandom"];_this["setConfig"]('isRandom',_this["isRandom"]);random["classList"]["toggle"]('active',_this["isRandom"])};repeat["onclick"]= function(){if(_this["isRandom"]){_this["isRandom"]=  !_this["isRandom"];random["classList"]["toggle"]('active',_this["isRandom"]);_this["setConfig"]('isRandom',_this["isRandom"])};_this["isRepeat"]=  !_this["isRepeat"];_this["setConfig"]('isRepeat',_this["isRepeat"]);repeat["classList"]["toggle"]('active',_this["isRepeat"])};playlist["onclick"]= function(e){const songNode=e["target"]["closest"](".song:not(.active)");if(songNode&&  !e["target"]["closest"]('.option')){isMusic== undefined?isMusic= 'vietnamese':'';_this["currentIndex"]= Number(songNode["dataset"]["index"]);_this["setConfig"](isMusic,_this["currentIndex"]);_this["loadCurrentSong"](isMusic);_this["renderSongs"](isMusic);audio["play"]()};if(e["target"]["closest"]('.option')){e["target"]["closest"]('.like')?_this["hendleLikeSongs"](e["target"]["closest"]('.like'),isMusic,animateThumb):'';const download=$$('.download');const indexDownload=Number(e["target"]["closest"]('.option')["dataset"]["download"]);download[indexDownload]["classList"]["toggle"]('active');if($('.download.active')){download["forEach"](function(value,index){if(Number(index)!== indexDownload){value["classList"]["remove"]('active')}})}}};$('body')["onclick"]= function(e){if(!e["target"]["closest"]('.playlist')){if($('.download.active')|| false){$('.download.active')["classList"]["remove"]('active')}}}},hendleAbumMusic:function(animateThumb){const that=this;$$('.locationmusic div')["forEach"](function(value){value["onclick"]= function(e){const valueIsMusic=e["target"]["getAttribute"]('value');that["checkCurrentIndex"](isMusic);if(!e["target"]["closest"]('.locationmusic > .select')){if(e["target"]["innerText"]== 'LOVE'&& that["songs"]["love"]["length"]=== 0){alert('B\u1ea1n ch\u01b0a c\xF3 b\xE0i h\xE1t y\xEAu th\xEDch!!')}else {switch(valueIsMusic){case 'vietnamese':isMusic= 'vietnamese';break;case 'english':isMusic= 'english';break;case 'korea':isMusic= 'korea';break;case 'china':isMusic= 'china';break;case 'love':isMusic= 'love';break};indexArray= [];progress["value"]= 0;animateThumb["pause"]();that["currentIndex"]= 0;that["isPlaying"]= false;player["classList"]["remove"]('playing');cd["style"]["width"]= 200+ 'px';cd["style"]["opacity"]= null;that["renderSongs"](isMusic);that["handleEvents"](isMusic);that["loadCurrentSong"](isMusic);that["nextSong"](isMusic);that["prevSong"](isMusic);$('.locationmusic > .select')["classList"]["remove"]('select');e["target"]["classList"]["add"]('select');that["config"][isMusic]> 2?$(".song.active")["scrollIntoView"]({behavior:"smooth",block:"center"}):that["scrollToActiveSong"]()}}}})},checkCurrentIndex:function(isMusic){if(this["config"][isMusic]== null){this["config"][isMusic]= 0}},scrollToActiveSong:function(){setTimeout(()=>{$(".song.active")["scrollIntoView"]({behavior:"smooth",block:"end"})},300)},loadCurrentSong:function(isMusic){heading["textContent"]= this["config"][isMusic]?this["songs"][isMusic][this["config"][isMusic]]["name"]:this["songs"][isMusic][this["currentIndex"]]["name"];thumb["style"]["backgroundImage"]= this["config"][isMusic]?`url(${this["songs"][isMusic][this["config"][isMusic]]["image"]})`:`url(${this["songs"][isMusic][this["currentIndex"]]["image"]})`;audio["src"]= this["config"][isMusic]?this["songs"][isMusic][this["config"][isMusic]]["path"]:this["songs"][isMusic][this["currentIndex"]]["path"]},renderSongs:function(music){this["config"]['vietnamese']== undefined?this["setConfig"]('vietnamese',0):'';music== undefined?music= 'vietnamese':'';const htmls=this["songs"][music]["map"]((song,index)=>{return `
                <div class="song ${index=== this["config"][music]?"active":''}" data-index="${index}">
                    <div class="thumb" style="background-image: url('${song["image"]}')">
                    </div>
                    <div class="body">
                        <h3 class="title">${song["name"]}</h3>
                        <p class="author">${song["singer"]}</p>
                    </div>
                    <div class="option" data-download="${index}">
                        <i class="fas fa-ellipsis-h"></i>
                        <div class="download" data-download="${index}">
                        <a href="${song["path"]}">Tải</a>
                        <a class="like ${this["config"][song["name"]]?"active":''}" data-index="${index}" data-name="${song["name"]}" data-path="${song["path"]}" data-image="${song["image"]}"
                         data-singer="${song["singer"]}">${this["config"][song["name"]]?'B\u1ecf th\xEDch':'Th\xEDch'}</a>
                        </div>
                    </div>
                </div>
                `});playlist["innerHTML"]= htmls["join"]('')},hendleLikeSongs:function(likeSongs,isMusic,animateThumb){const name=likeSongs["dataset"]["name"];const singer=likeSongs["dataset"]["singer"];const path=likeSongs["dataset"]["path"];const image=likeSongs["dataset"]["image"];const index=likeSongs["dataset"]["index"];const listArray={name,singer,path,image};if(likeSongs["innerText"]=== 'Th\xEDch'){if(this["songs"]["love"]["length"]>= 0&& isMusic!= 'english'&& isMusic!= 'korea'&& isMusic!= 'china'){isMusic= 'vietnamese'};this["songs"]["love"]["push"](listArray);localStorage["setItem"](LIST_STORAGE_KEY,JSON["stringify"](this["songs"]["love"]));this["setConfig"](name,name);this["renderSongs"](isMusic);alert('\u0110\xE3 th\xEAm v\xE0o danh s\xE1ch y\xEAu th\xEDch')}else {if(likeSongs["innerText"]=== 'B\u1ecf th\xEDch'){const deleteArray=this["songs"]["love"]["filter"](function(value){return value["name"]!= name});const storageMusic=JSON["parse"](localStorage["getItem"](LIST_STORAGE_KEY));newArray= deleteArray;this["songs"]["love"]= newArray;localStorage["setItem"](LIST_STORAGE_KEY,JSON["stringify"](this["songs"]["love"]));this["setConfig"](name,null);newArray= [];this["renderSongs"](isMusic);if(storageMusic[this["currentIndex"]]["name"]== name&& this["config"][isMusic]== 0&& isMusic== 'love'){this["config"][isMusic]= 0;player["classList"]["remove"]('playing');this["isPlaying"]= false;progress["value"]= 0;animateThumb["pause"]();this["songs"]["love"]["length"]> 0?this["renderSongs"](isMusic):'';this["songs"]["love"]["length"]> 0?this["loadCurrentSong"](isMusic):''};if(this["config"][isMusic]> 0&& isMusic== 'love'){index> this["currentIndex"]?'':this["setConfig"](isMusic,--this["config"][isMusic]);this["currentIndex"]--;this["renderSongs"](isMusic)};if(this["songs"]["love"]["length"]== 0){this["currentIndex"]= this["config"][isMusic];this["config"][isMusic]= 0;$('.vietnamese')["click"]()}}}},nextSong:function(isMusic){isMusic== undefined?isMusic= 'vietnamese':'';this["config"][isMusic]++;if(this["config"][isMusic]>= this["songs"][isMusic]["length"]){this["config"][isMusic]= 0};this["loadCurrentSong"](isMusic)},prevSong:function(isMusic){isMusic== undefined?isMusic= 'vietnamese':'';this["config"][isMusic]--;if(this["config"][isMusic]< 0){this["config"][isMusic]= this["songs"][isMusic]["length"]- 1};this["loadCurrentSong"](isMusic)},randomSong:function(isMusic){isMusic== undefined?isMusic= 'vietnamese':'';let newIndex;let _that=this;if(indexArray["length"]=== _that["songs"][isMusic]["length"]){indexArray= []};do{newIndex= Math["floor"](Math["random"]()* _that["songs"][isMusic]["length"])}while(indexArray["includes"](newIndex));;indexArray["push"](newIndex);_that["config"][isMusic]= newIndex;_that["loadCurrentSong"](isMusic);_that["renderSongs"](isMusic);_that["scrollToActiveSong"]()},loadConfig:function(){this["isRandom"]= this["config"]["isRandom"];this["isRepeat"]= this["config"]["isRepeat"]},start:function(){localStorage["getItem"](LIST_STORAGE_KEY)&& this["songs"]["love"]["length"]=== 0?this["songs"]["love"]= JSON["parse"](localStorage["getItem"](LIST_STORAGE_KEY)):'';this["hendleAbumMusic"]();this["handleEvents"]();this["renderSongs"](isMusic);this["loadCurrentSong"](isMusic);this["loadConfig"]();random["classList"]["toggle"]('active',this["isRandom"]|| false);repeat["classList"]["toggle"]('active',this["isRepeat"]|| false)}};app["start"]()
