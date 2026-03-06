var $ = function(Selector) {
    return document.querySelector(Selector);
};
var $$ = function(Selector) {
    return document.querySelectorAll(Selector);
};
var musicList = {
    "main": "jiangnan.mp3",
    "spring": "molihua.mp3",
    "solarterm": "molihua.mp3",
    "stop": "",
    "newyear": "yingchun.mp3",
    "newyear2": "xintaojiufu.wav"
}

//音乐控制器
function music(id) {
    //选择对象
    var audio = $("audio#main");
    //获取标签
    var audioid = audio.getAttribute("data-id");
    //设置路径
    var path = "assets/";
    //如果是不同的id则播放新的歌曲
    if(audioid != id) {
        audio.pause();
        audio.currentTime = 0.0;
        audio.setAttribute("src", path + musicList[id]);
        audio.play();
        audio.setAttribute("data-id", id);
    }
}

//视差特效
var scene = document.querySelector('.scene');
var parallax = new Parallax(scene);




var state = {
    title: "中华传统文化",
    url: "index.html"
};


function push(page) {
    switch(page) {
        case 'index':
            title = '中华传统文化';
            url = 'index.html';
            music('main');
            break;
        case "solarterm":
            title = "节气";
            url = "solarterm.html";
            music('spring');
            break;
        case "clock":
            title = "时辰";
            url = "clock.html";
            music('main');
            break;
        case "new-year":
            title = "春节";
            url = "new-year.html";
            music('newyear');
            break;
        case "poem":
            title = "诗词";
            url = "poem.html";
            music('main');
            break;
        case "qin":
            title = "五音";
            url = "qin.html";
            music('stop');
            break;
        case "bmzy":
            title = "笔墨纸砚";
            url = "bmzy.html";
            music('main');
            break;
    }
    var page2 = $$('section:not(#page-' + page + ')');
    for(i = 0; i < page2.length; i++) {
        page2[i].style.display = 'none';
    }
    $('section#page-' + page).style.display = 'block';
    history.replaceState(state, title, url); //你可能看到的是假的地址栏
}

//解析向index.html传的参数
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
if(getParameterByName('page')){
    push(getParameterByName('page'));
}

/*
 * 十二时辰
 */
var anteMeridiemName = ['丑', '寅', '卯', '辰', '巳', '午'];
var postMeridiemName = ['未', '申', '酉', '戌', '亥', '子'];

function run() {
    var time = new Date();
    var second = time.getSeconds();
    var minute = time.getMinutes();
    var hour = time.getHours();
    var hourstr;
    if(hour >= 1)
        hourstr = anteMeridiemName[0];
    if(hour >= 3)
        hourstr = anteMeridiemName[1];
    if(hour >= 5)
        hourstr = anteMeridiemName[2];
    if(hour >= 7)
        hourstr = anteMeridiemName[3];
    if(hour >= 9)
        hourstr = anteMeridiemName[4];
    if(hour >= 11)
        hourstr = anteMeridiemName[5];
    if(hour >= 13)
        hourstr = postMeridiemName[0];
    if(hour >= 15)
        hourstr = postMeridiemName[1];
    if(hour >= 17)
        hourstr = postMeridiemName[2];
    if(hour >= 19)
        hourstr = postMeridiemName[3];
    if(hour >= 21)
        hourstr = postMeridiemName[4];
    if(hour >= 23 && hour <= 1)
        hourstr = postMeridiemName[5];
    var s = (hour * 3600 + minute * 60 + second) / 43200 * 360;
    var obj = $$('#JS-hour-name li');
    for(j = 0; j < 6; j++) {
        if(hour <= 12) {
            obj[j].textContent = anteMeridiemName[j];
        } else {
            obj[j].textContent = postMeridiemName[j];
        }
    }
    if(hour < 10) hour = '0' + hour;
    if(minute < 10) minute = '0' + minute;
    if(second < 10) second = '0' + second;
    $('#timestr').textContent = hourstr + '时';
    $('#hour').textContent = hour;
    $('#minute').textContent = minute;
    $('#second').textContent = second;
    $('.hander').setAttribute("style", 'transform:rotate(' + s + 'deg);-webkit-transform:rotate(' + s + 'deg)');
}
run();
setInterval(run, 1000);

function hourinfo(id){
    
}
/*
 * 二十四节气
 */
var obj = $$('.month');
m = new Date().getMonth() - 1;
obj[m].setAttribute("style", 'background: rgb(234, 232, 226);');
/*
 * 春节
 */
var NewYearInfo = [
    ['腊月二十三', '俗称“小年”，传说这日是“灶王爷上天”之日，因此要祭灶神。'],
    ['腊月二十四', '掸尘扫房子，这日是约定俗成的扫除日。'],
    ['腊月二十五', '推磨做豆腐。传说玉帝会下界查访，吃豆腐渣以表清苦。'],
    ['腊月二十六', '杀猪割年肉，以前人们只在一年一度的年节中才能尽情吃肉。'],
    ['腊月二十七', '宰年鸡、赶大集，春节所需物品都在置办之中。'],
    ['腊月二十八', '打糕蒸馍贴花。古人以桃木为辟邪之木，后被红纸代替。'],
    ['腊月二十九', '上坟请祖上大供。对于祖先的崇拜，在我国由来已久。'],
    ['大年三十', '一夜连双岁，五更分二天。寒辞去冬雪，暖带入春风。'],
    ['大年初一', '金鸡报晓。晚辈给长辈拜年，长辈给压岁钱，压住邪祟。'],
    ['大年初二', '金吠报春。亲眷人家去拜年，东家留吃饭、西家排酒筵。'],
    ['大年初三', '肥猪拱门。女婿看望老丈人、媳妇回娘家，礼物带双数。'],
    ['大年初四', '三羊开泰。灶王爷要查户口，恭迎灶神回民间。'],
    ['大年初五', '艮牛耕春。五路接财神，东西南北中，财富五路通。'],
    ['大年初六', '马到成功。沥酒拜街中。万户千门看，无人不送穷。'],
    ['大年初七', '人寿年丰。摊煎饼吃七宝羹，安顿身心，休养生息。'],
    ['大年初八', '放生祈福。众星下界之日，制小灯燃而祭之，一寸光阴一寸金。'],
    ['大年初九', '玉皇天诞。是主宰宇宙最高的神，人们都会举行祭典以表庆贺。'],
    ['大年初十', '祭石感恩。有天还有地，人畜房米麦百谷都生地。'],
    ['正月十一', '祭奉紫姑。深受压迫的女性，把她奉为弱女子的保护神。'],
    ['正月十二', '搭建灯棚。元宵节将近，开始做元宵赏灯的准备工作。'],
    ['正月十三', '灶下点灯。预放元宵，自十三日起，巷陌桥道，皆编竹张灯。'],
    ['正月十四', '临水娘娘诞辰，又称“顺天圣母”。是拯救难产妇女的神仙。'],
    ['正月十五', '夜照田蚕（神）。观颜色判断一年的丰歉，后演化为元宵节观灯。']
];

function newyear(id) {
    $(".new-year .info h1").textContent = NewYearInfo[id][0];
    $(".new-year .info h4").textContent = NewYearInfo[id][1];
    $(".new-year .picture").style.backgroundImage = 'url(img/' + id + '.svg)';
    if (id>7) {
    	music("newyear2");
    } else{
    	music("newyear");
    }
    
}
/*
 * 诗词
 */
var poemList = [{
    "author": "李之仪",
    "title": "卜算子·我住长江头",
    "content": "只愿君心似我心，\n定不负相思意。"
}, {
    "author": "苏轼",
    "title": "江城子·乙卯正月二十日夜记梦",
    "content": "十年生死两茫茫，\n不思量，\n自难忘。"
}, {
    "author": "卓文君",
    "title": "白头吟",
    "content": "愿得一心人，\n白头不相离。"
}, {
    "author": "温庭筠",
    "title": "南歌子词二首 / 新添声杨柳枝词",
    "content": "玲珑骰子安红豆，\n入骨相思知不知。"
}, {
    "author": "徐再思",
    "title": "折桂令·春情",
    "content": "平生不会相思，\n才会相思，\n便害相思。"
}, {
    "author": "李白",
    "title": "三五七言 / 秋风词",
    "content": "入我相思门，\n知我相思苦。"
}, {
    "author": "元稹",
    "title": "离思五首·其四",
    "content": "曾经沧海难为水，\n除却巫山不是云。"
}, {
    "author": "佚名",
    "title": "击鼓",
    "content": "执子之手，\n与子偕老。"
}, {
    "author": "佚名",
    "title": "上邪",
    "content": "山无陵，\n江水为竭。\n冬雷震震，\n夏雨雪。\n天地合，\n乃敢与君绝。"
}, {
    "author": "秦观",
    "title": "鹊桥仙·纤云弄巧",
    "content": "两情若是久长时，\n又岂在朝朝暮暮。"
}, {
    "author": "元好问",
    "title": "摸鱼儿·雁丘词 / 迈陂塘",
    "content": "问世间，\n情为何物，\n直教生死相许？"
}, {
    "author": "俞彦",
    "title": "长相思·折花枝",
    "content": "怕相思，\n已相思，\n轮到相思没处辞，\n眉间露一丝。"
}, {
    "author": "司马相如",
    "title": "凤求凰 / 琴歌",
    "content": "一日不见兮，\n思之如狂。"
}, {
    "author": "元稹",
    "title": "离思五首·其四",
    "content": "取次花丛懒回顾，\n半缘修道半缘君。"
}, {
    "author": "乐婉",
    "title": "卜算子·答施",
    "content": "若是前生未有缘，\n待重结、来生愿。"
}, {
    "author": "李商隐",
    "title": "无题·昨夜星辰昨夜风",
    "content": "身无彩凤双飞翼，\n心有灵犀一点通。"
}, {
    "author": "晏殊",
    "title": "玉楼春·春恨",
    "content": "天涯地角有穷时，\n只有相思无尽处。"
}, {
    "author": "李白",
    "title": "怨情",
    "content": "美人卷珠帘，\n深坐颦蛾眉。"
}, {
    "author": "纳兰性德",
    "title": "山花子·风絮飘残已化萍",
    "content": "人到情多情转薄，\n而今真个悔多情。"
}, {
    "author": "佚名",
    "title": "西洲曲",
    "content": "海水梦悠悠，\n君愁我亦愁。"
}, {
    "author": "李之仪",
    "title": "卜算子·我住长江头",
    "content": "日日思君不见君，\n共饮长江水。"
}, {
    "author": "张籍",
    "title": "节妇吟·寄东平李司空师道",
    "content": "还君明珠双泪垂，\n恨不相逢未嫁时。"
}, {
    "author": "卓文君",
    "title": "白头吟",
    "content": "闻君有两意，\n故来相决绝。"
}, {
    "author": "柳永",
    "title": "雨霖铃·寒蝉凄切",
    "content": "多情自古伤离别，\n更那堪冷落清秋节！"
}, {
    "author": "张先",
    "title": "千秋岁·数声鶗鴂",
    "content": "心似双丝网，\n中有千千结。"
}, {
    "author": "佚名",
    "title": "留别妻",
    "content": "生当复来归，\n死当长相思。"
}, {
    "author": "李商隐",
    "title": "无题·重帏深下莫愁堂",
    "content": "直道相思了无益，\n未妨惆怅是清狂。"
}, {
    "author": "晏几道",
    "title": "临江仙·梦后楼台高锁",
    "content": "落花人独立，\n微雨燕双飞。"
}, {
    "author": "顾夐",
    "title": "诉衷情·永夜抛人何处去",
    "content": "换我心，\n为你心，\n始知相忆深。"
}, {
    "author": "晏几道",
    "title": "长相思·长相思",
    "content": "欲把相思说似谁，\n浅情人不知。"
}, {
    "author": "秦观",
    "title": "八六子·倚危亭",
    "content": "夜月一帘幽梦，\n春风十里柔情。"
}, {
    "author": "朱彝尊",
    "title": "忆少年·飞花时节",
    "content": "相思了无益，\n悔当初相见。"
}, {
    "author": "佚名",
    "title": "迢迢牵牛星",
    "content": "盈盈一水间，\n脉脉不得语。"
}, {
    "author": "刘禹锡",
    "title": "杨柳枝 / 柳枝词",
    "content": "曾与美人桥上别，\n恨无消息到今朝。"
}, {
    "author": "晏殊",
    "title": "玉楼春·春恨",
    "content": "无情不似多情苦。\n一寸还成千万缕。"
}, {
    "author": "白居易",
    "title": "长恨歌",
    "content": "天长地久有时尽，\n此恨绵绵无绝期。"
}, {
    "author": "范仲淹",
    "title": "苏幕遮·怀旧",
    "content": "酒入愁肠，\n化作相思泪。"
}, {
    "author": "白居易",
    "title": "浪淘沙·借问江潮与海水",
    "content": "借问江潮与海水，\n何似君情与妾心？"
}, {
    "author": "李白",
    "title": "春思",
    "content": "当君怀归日，\n是妾断肠时。"
}, {
    "author": "李白",
    "title": "三五七言 / 秋风词",
    "content": "相思相见知何日？\n此时此夜难为情！"
}, {
    "author": "王昌龄",
    "title": "闺怨",
    "content": "忽见陌头杨柳色，\n悔教夫婿觅封侯。"
}, {
    "author": "辛弃疾",
    "title": "鹧鸪天·晚日寒鸦一片愁",
    "content": "肠已断，\n泪难收。\n相思重上小红楼。"
}, {
    "author": "严蕊",
    "title": "卜算子·不是爱风尘",
    "content": "花落花开自有时，\n总赖东君主。"
}, {
    "author": "李商隐",
    "title": "夜雨寄北",
    "content": "君问归期未有期，\n巴山夜雨涨秋池。"
}, {
    "author": "李白",
    "title": "长相思·其一",
    "content": "孤灯不明思欲绝，\n卷帷望月空长叹。"
}, {
    "author": "曹植",
    "title": "明月上高楼",
    "content": "愿为西南风，\n长逝入君怀。"
}, {
    "author": "夏完淳",
    "title": "卜算子·秋色到空闺",
    "content": "谁料同心结不成，\n翻就相思结。"
}, {
    "author": "徐干",
    "title": "室思",
    "content": "思君如流水，\n何有穷已时。"
}, {
    "author": "佚名",
    "title": "留别妻",
    "content": "结发为夫妻，\n恩爱两不疑。"
}, {
    "author": "张籍",
    "title": "节妇吟·寄东平李司空师道",
    "content": "感君缠绵意，\n系在红罗襦。"
}, {
    "author": "张九龄",
    "title": "望月怀远",
    "content": "情人怨遥夜，\n竟夕起相思。"
}, {
    "author": "佚名",
    "title": "关雎",
    "content": "窈窕淑女，\n君子好逑。"
}, {
    "author": "张泌",
    "title": "寄人",
    "content": "多情只有春庭月，\n犹为离人照落花。"
}, {
    "author": "袁枚",
    "title": "马嵬",
    "content": "莫唱当年长恨歌，\n人间亦自有银河。"
}, {
    "author": "李煜",
    "title": "长相思·一重山",
    "content": "山远天高烟水寒，\n相思枫叶丹。"
}, {
    "author": "王雱",
    "title": "眼儿媚·杨柳丝丝弄轻柔",
    "content": "相思只在：丁香枝上，\n豆蔻梢头。"
}, {
    "author": "白居易",
    "title": "浪淘沙·借问江潮与海水",
    "content": "相恨不如潮有信，\n相思始觉海非深。"
}, {
    "author": "叶梦得",
    "title": "虞美人·雨后同干誉才卿置酒来禽花下作",
    "content": "殷勤花下同携手。\n更尽杯中酒。\n美人不用敛蛾眉。"
}, {
    "author": "张籍",
    "title": "节妇吟·寄东平李司空师道",
    "content": "君知妾有夫，\n赠妾双明珠。"
}, {
    "author": "蜀妓",
    "title": "鹊桥仙·说盟说誓",
    "content": "不茶不饭，\n不言不语，\n一味供他憔悴。"
}, {
    "author": "张籍",
    "title": "节妇吟·寄东平李司空师道",
    "content": "知君用心如日月，\n事夫誓拟同生死。"
}, {
    "author": "李冠",
    "title": "蝶恋花·春暮",
    "content": "一寸相思千万绪。\n人间没个安排处。"
}, {
    "author": "晏几道",
    "title": "生查子·狂花顷刻香",
    "content": "天与短因缘，\n聚散常容易。"
}, {
    "author": "吕本中",
    "title": "采桑子·恨君不似江楼月",
    "content": "恨君不似江楼月，\n南北东西，\n南北东西，\n只有相随无别离。"
}, {
    "author": "曹植",
    "title": "明月上高楼",
    "content": "君若清路尘，\n妾若浊水泥；"
}, {
    "author": "纳兰性德",
    "title": "画堂春·一生一代一双人",
    "content": "相思相望不相亲，\n天为谁春。"
}, {
    "author": "韦庄",
    "title": "女冠子·四月十七",
    "content": "四月十七，\n正是去年今日，\n别君时。"
}, {
    "author": "辛弃疾",
    "title": "摸鱼儿·更能消几番风雨",
    "content": "千金纵买相如赋，\n脉脉此情谁诉。"
}, {
    "author": "欧阳修",
    "title": "蝶恋花·庭院深深深几许",
    "content": "泪眼问花花不语，\n乱红飞过秋千去。"
}, {
    "author": "武则天",
    "title": "如意娘",
    "content": "看朱成碧思纷纷，\n憔悴支离为忆君。"
}, {
    "author": "欧阳炯",
    "title": "贺明朝·忆昔花间相见后",
    "content": "忆昔花间相见后，\n只凭纤手，\n暗抛红豆。"
}, {
    "author": "白居易",
    "title": "长恨歌",
    "content": "春宵苦短日高起，\n从此君王不早朝。"
}, {
    "author": "张籍",
    "title": "征妇怨",
    "content": "妇人依倚子与夫，\n同居贫贱心亦舒。"
}, {
    "author": "晏几道",
    "title": "浣溪沙·闲弄筝弦懒系裙",
    "content": "怅恨不逢如意酒。\n寻思难值有情人。"
}, {
    "author": "刘禹锡",
    "title": "潇湘神·斑竹枝",
    "content": "斑竹枝，\n斑竹枝，\n泪痕点点寄相思。"
}, {
    "author": "姜夔",
    "title": "踏莎行·自沔东来",
    "content": "夜长争得薄情知，\n春初早被相思染。"
}, {
    "author": "鱼玄机",
    "title": "江陵愁望寄子安",
    "content": "忆君心似西江水，\n日夜东流无歇时。"
}, {
    "author": "李白",
    "title": "折荷有赠",
    "content": "相思无因见，\n怅望凉风前。"
}, {
    "author": "纳兰性德",
    "title": "蝶恋花·辛苦最怜天上月",
    "content": "无那尘缘容易绝，\n燕子依然，\n软踏帘钩说。"
}, {
    "author": "晏殊",
    "title": "蝶恋花·槛菊愁烟兰泣露",
    "content": "欲寄彩笺兼尺素。\n山长水阔知何处。"
}, {
    "author": "白居易",
    "title": "采莲曲",
    "content": "逢郎欲语低头笑，\n碧玉搔头落水中。"
}, {
    "author": "雍裕之",
    "title": "自君之出矣",
    "content": "思君如陇水，\n长闻呜咽声。"
}, {
    "author": "晏几道",
    "title": "生查子·关山魂梦长",
    "content": "两鬓可怜青，\n只为相思老。"
}, {
    "author": "韦庄",
    "title": "应天长·别来半岁音书绝",
    "content": "别来半岁音书绝，\n一寸离肠千万结。"
}, {
    "author": "傅玄",
    "title": "车遥遥篇",
    "content": "君安游兮西入秦，\n愿为影兮随君身。"
}, {
    "author": "周密",
    "title": "扫花游·九日怀归",
    "content": "雁字无多，\n写得相思几许。"
}, {
    "author": "吴文英",
    "title": "宴清都·秋感",
    "content": "寄相思，\n寒雨灯窗，\n芙蓉旧院。"
}, {
    "author": "卓文君",
    "title": "白头吟",
    "content": "皑如山上雪，\n皎若云间月。"
}, {
    "author": "晏几道",
    "title": "少年游·离多最是",
    "content": "浅情终似，\n行云无定，\n犹到梦魂中。"
}, {
    "author": "纳兰性德",
    "title": "蝶恋花·辛苦最怜天上月",
    "content": "若似月轮终皎洁，\n不辞冰雪为卿热。"
}, {
    "author": "刘镇",
    "title": "玉楼春·东山探梅",
    "content": "佳人独立相思苦。\n薄袖欺寒脩竹暮。"
}, {
    "author": "苏轼",
    "title": "贺新郎·夏景",
    "content": "待浮花、浪蕊都尽，\n伴君幽独。"
}, {
    "author": "李白",
    "title": "夜坐吟",
    "content": "掩妾泪，\n听君歌。"
}, {
    "author": "晏几道",
    "title": "临江仙·斗草阶前初见",
    "content": "流水便随春远，\n行云终与谁同。"
}, {
    "author": "惠洪",
    "title": "千秋岁·半身屏外",
    "content": "春思乱，\n芳心碎。"
}, {
    "author": "张惠言",
    "title": "相见欢·年年负却花期",
    "content": "梅花雪，\n梨花月，\n总相思。"
}, {
    "author": "欧阳修",
    "title": "踏莎行·候馆梅残",
    "content": "离愁渐远渐无穷，\n迢迢不断如春水。"
}, {
    "author": "晏殊",
    "title": "山亭柳·赠歌者",
    "content": "若有知音见采，\n不辞遍唱阳春。"
}, {
    "author": "鱼玄机",
    "title": "闺怨",
    "content": "春来秋去相思在，\n秋去春来信息稀。"
}, {
    "author": "纳兰性德",
    "title": "虞美人·曲阑深处重相见",
    "content": "凄凉别后两应同，\n最是不胜清怨月明中。"
}, {
    "author": "欧阳修",
    "title": "玉楼春·尊前拟把归期说",
    "content": "人生自是有情痴，\n此恨不关风与月。"
}, {
    "author": "张鸣善",
    "title": "普天乐·咏世",
    "content": "月有盈亏花有开谢，\n想人生最苦离别。"
}, {
    "author": "柳永",
    "title": "雨霖铃·寒蝉凄切",
    "content": "多情自古伤离别，\n更那堪冷落清秋节！"
}, {
    "author": "高适",
    "title": "别董大二首",
    "content": "莫愁前路无知己，\n天下谁人不识君。"
}, {
    "author": "李白",
    "title": "南陵别儿童入京",
    "content": "仰天大笑出门去，\n我辈岂是蓬蒿人。"
}, {
    "author": "贺铸",
    "title": "行路难·缚虎手",
    "content": "衰兰送客咸阳道。\n天若有情天亦老。"
}, {
    "author": "李煜",
    "title": "浪淘沙令·帘外雨潺潺",
    "content": "独自莫凭栏，\n无限江山，\n别时容易见时难。"
}, {
    "author": "刘禹锡",
    "title": "杨柳枝 / 柳枝词",
    "content": "曾与美人桥上别，\n恨无消息到今朝。"
}, {
    "author": "李商隐",
    "title": "无题·相见时难别亦难",
    "content": "相见时难别亦难，\n东风无力百花残。"
}, {
    "author": "李白",
    "title": "黄鹤楼送孟浩然之广陵",
    "content": "故人西辞黄鹤楼，\n烟花三月下扬州。"
}, {
    "author": "辛弃疾",
    "title": "木兰花慢·滁州送范倅",
    "content": "老来情味减，\n对别酒、怯流年。"
}, {
    "author": "柳永",
    "title": "雨霖铃·寒蝉凄切",
    "content": "执手相看泪眼，\n竟无语凝噎。"
}, {
    "author": "韦应物",
    "title": "寄李儋元锡",
    "content": "去年花里逢君别，\n今日花开已一年。"
}, {
    "author": "李白",
    "title": "赠汪伦",
    "content": "桃花潭水深千尺，\n不及汪伦送我情。"
}, {
    "author": "张泌",
    "title": "寄人",
    "content": "多情只有春庭月，\n犹为离人照落花。"
}, {
    "author": "王维",
    "title": "渭城曲 / 送元二使安西",
    "content": "劝君更尽一杯酒，\n西出阳关无故人。"
}, {
    "author": "苏轼",
    "title": "鹊桥仙·七夕",
    "content": "相逢一醉是前缘，\n风雨散、飘然何处。"
}, {
    "author": "辛弃疾",
    "title": "水调歌头·壬子三山被召陈端仁给事饮饯席上作",
    "content": "悲莫悲生离别，\n乐莫乐新相识，\n儿女古今情。"
}, {
    "author": "晏几道",
    "title": "蝶恋花·醉别西楼醒不记",
    "content": "醉别西楼醒不记。\n春梦秋云，\n聚散真容易。"
}, {
    "author": "高适",
    "title": "送李侍御赴安西",
    "content": "功名万里外，\n心事一杯中。"
}, {
    "author": "李煜",
    "title": "清平乐·别来春半",
    "content": "别来春半，\n触目柔肠断。"
}, {
    "author": "范云",
    "title": "别诗",
    "content": "昔去雪如花，\n今来花似雪。"
}, {
    "author": "柳永",
    "title": "雨霖铃·寒蝉凄切",
    "content": "今宵酒醒何处？\n杨柳岸，\n晓风残月。"
}, {
    "author": "吕本中",
    "title": "踏莎行·雪似梅花",
    "content": "为谁醉倒为谁醒，\n到今犹恨轻离别。"
}, {
    "author": "李存勖",
    "title": "如梦令·曾宴桃源深洞",
    "content": "长记别伊时，\n和泪出门相送。"
}, {
    "author": "骆宾王",
    "title": "于易水送人 / 于易水送别",
    "content": "昔时人已没，\n今日水犹寒。"
}, {
    "author": "王维",
    "title": "送别 / 山中送别 / 送友",
    "content": "春草明年绿，\n王孙归不归？"
}, {
    "author": "晏几道",
    "title": "生查子·狂花顷刻香",
    "content": "天与短因缘，\n聚散常容易。"
}, {
    "author": "吕本中",
    "title": "采桑子·恨君不似江楼月",
    "content": "恨君不似江楼月，\n南北东西，\n南北东西，\n只有相随无别离。"
}, {
    "author": "李白",
    "title": "梦游天姥吟留别 / 别东鲁诸公",
    "content": "别君去兮何时还？\n且放白鹿青崖间。\n须行即骑访名山。"
}, {
    "author": "王昌龄",
    "title": "芙蓉楼送辛渐二首",
    "content": "寒雨连天夜入吴，\n平明送客楚山孤。"
}, {
    "author": "陆龟蒙",
    "title": "别离",
    "content": "丈夫非无泪，\n不洒离别间。"
}, {
    "author": "龚自珍",
    "title": "浪淘沙·写梦",
    "content": "独自凄凉还自遣，\n自制离愁。"
}, {
    "author": "杜甫",
    "title": "春望",
    "content": "感时花溅泪，\n恨别鸟惊心。"
}, {
    "author": "李白",
    "title": "渡荆门送别",
    "content": "仍怜故乡水，\n万里送行舟。"
}, {
    "author": "晏几道",
    "title": "少年游·离多最是",
    "content": "离多最是，\n东西流水，\n终解两相逢。"
}, {
    "author": "韦庄",
    "title": "女冠子·四月十七",
    "content": "四月十七，\n正是去年今日，\n别君时。"
}, {
    "author": "姜夔",
    "title": "鹧鸪天·元夕有所梦",
    "content": "春未绿，\n鬓先丝。\n人间别久不成悲。"
}, {
    "author": "晏殊",
    "title": "蝶恋花·槛菊愁烟兰泣露",
    "content": "明月不谙离恨苦。\n斜光到晓穿朱户。"
}, {
    "author": "刘长卿",
    "title": "重送裴郎中贬吉州",
    "content": "猿啼客散暮江头，\n人自伤心水自流。"
}, {
    "author": "杜荀鹤",
    "title": "送人游吴",
    "content": "君到姑苏见，\n人家尽枕河。"
}, {
    "author": "黄景仁",
    "title": "别老母",
    "content": "惨惨柴门风雪夜，\n此时有子不如无。"
}, {
    "author": "晏殊",
    "title": "踏莎行·碧海无波",
    "content": "当时轻别意中人，\n山长水远知何处。"
}, {
    "author": "寇准",
    "title": "江南春·波渺渺",
    "content": "江南春尽离肠断，\n苹满汀洲人未归。"
}, {
    "author": "晏几道",
    "title": "秋蕊香·池苑清阴欲就",
    "content": "有情不管别离久。\n情在相逢终有。"
}, {
    "author": "魏夫人",
    "title": "点绛唇·波上清风",
    "content": "聚散匆匆，\n此恨年年有。"
}, {
    "author": "王昌龄",
    "title": "芙蓉楼送辛渐二首",
    "content": "高楼送客不能醉，\n寂寂寒江明月心。"
}, {
    "author": "苏轼",
    "title": "减字木兰花·春月",
    "content": "不似秋光，\n只与离人照断肠。"
}, {
    "author": "张先",
    "title": "天仙子·水调数声持酒听",
    "content": "午醉醒来愁未醒。\n送春春去几时回。"
}, {
    "author": "贺知章",
    "title": "回乡偶书二首",
    "content": "离别家乡岁月多，\n近来人事半消磨。"
}, {
    "author": "晏殊",
    "title": "浣溪沙·一向年光有限身",
    "content": "一向年光有限身。\n等闲离别易销魂。\n酒筵歌席莫辞频。"
}, {
    "author": "郑文宝",
    "title": "柳枝词",
    "content": "不管烟波与风雨，\n载将离恨过江南。"
}, {
    "author": "辛弃疾",
    "title": "鹧鸪天·晚日寒鸦一片愁",
    "content": "若教眼底无离恨，\n不信人间有白头。"
}, {
    "author": "周紫芝",
    "title": "鹧鸪天·一点残红欲尽时",
    "content": "梧桐叶上三更雨，\n叶叶声声是别离。"
}, {
    "author": "岑参",
    "title": "白雪歌送武判官归京",
    "content": "山回路转不见君，\n雪上空留马行处。"
}, {
    "author": "白居易",
    "title": "草 / 赋得古原草送别",
    "content": "又送王孙去，\n萋萋满别情。"
}, {
    "author": "韦庄",
    "title": "应天长·别来半岁音书绝",
    "content": "别来半岁音书绝，\n一寸离肠千万结。"
}, {
    "author": "王昌龄",
    "title": "芙蓉楼送辛渐",
    "content": "寒雨连江夜入吴，\n平明送客楚山孤。"
}, {
    "author": "苏轼",
    "title": "临江仙·送钱穆父",
    "content": "一别都门三改火，\n天涯踏尽红尘。"
}, {
    "author": "温庭筠",
    "title": "更漏子·玉炉香",
    "content": "梧桐树，\n三更雨，\n不道离情正苦。"
}, {
    "author": "韦庄",
    "title": "送日本国僧敬龙归",
    "content": "扶桑已在渺茫中，\n家在扶桑东更东。"
}, {
    "author": "黄景仁",
    "title": "别老母",
    "content": "搴帷拜母河梁去，\n白发愁看泪眼枯。"
}, {
    "author": "欧阳修",
    "title": "长相思·花似伊",
    "content": "花似伊。\n柳似伊。\n花柳青春人别离。"
}, {
    "author": "高适",
    "title": "东平别前卫县李寀少府 / 送前卫县李宷少府",
    "content": "云开汶水孤帆远，\n路绕梁山匹马迟。"
}, {
    "author": "杜甫",
    "title": "赠李白",
    "content": "秋来相顾尚飘蓬，\n未就丹砂愧葛洪。"
}, {
    "author": "聂胜琼",
    "title": "鹧鸪天·别情",
    "content": "玉惨花愁出凤城，\n莲花楼下柳青青。"
}, {
    "author": "李清照",
    "title": "蝶恋花·泪湿罗衣脂粉满",
    "content": "惜别伤离方寸乱。\n忘了临行，\n酒盏深和浅。"
}, {
    "author": "刘长卿",
    "title": "送李判官之润州行营",
    "content": "江春不肯留归客，\n草色青青送马蹄。"
}, {
    "author": "苏辙",
    "title": "水调歌头·徐州中秋",
    "content": "离别一何久，\n七度过中秋。"
}, {
    "author": "陆龟蒙",
    "title": "别离",
    "content": "所志在功名，\n离别何足叹。"
}, {
    "author": "寇准",
    "title": "柳·晓带轻烟间杏花",
    "content": "长条别有风流处，\n密映钱塘苏小家。"
}, {
    "author": "施耐庵",
    "title": "念奴娇·天南地北",
    "content": "离愁万种，\n醉乡一夜头白。"
}, {
    "author": "张耒",
    "title": "秋蕊香·帘幕疏疏风透",
    "content": "别离滋味浓于酒。\n著人瘦。\n此情不及墙东柳。\n春色年年如旧。"
}, {
    "author": "王国维",
    "title": "蝶恋花·满地霜华浓似雪",
    "content": "自是浮生无可说。\n人间第一耽离别。"
}, {
    "author": "欧阳修",
    "title": "诉衷情·眉意",
    "content": "都缘自有离恨，\n故画作远山长。"
}, {
    "author": "柳永",
    "title": "忆帝京·薄衾小枕凉天气",
    "content": "薄衾小枕凉天气，\n乍觉别离滋味。"
}, {
    "author": "纳兰性德",
    "title": "采桑子·当时错",
    "content": "一别如斯，\n落尽梨花月又西。"
}, {
    "author": "李商隐",
    "title": "无题·昨夜星辰昨夜风",
    "content": "隔座送钩春酒暖，\n分曹射覆蜡灯红。"
}, {
    "author": "佚名",
    "title": "送别诗",
    "content": "柳条折尽花飞尽，\n借问行人归不归？"
}, {
    "author": "李煜",
    "title": "破阵子·四十年来家国",
    "content": "最是仓皇辞庙日，\n教坊犹奏别离歌，\n垂泪对宫娥。"
}, {
    "author": "王维",
    "title": "送沈子归江东 / 送沈子福之江东",
    "content": "唯有相思似春色，\n江南江北送君归。"
}, {
    "author": "李白",
    "title": "送友人",
    "content": "浮云游子意，\n落日故人情。"
}, {
    "author": "李白",
    "title": "黄鹤楼送孟浩然之广陵",
    "content": "孤帆远影碧空尽，\n唯见长江天际流。"
}, {
    "author": "周紫芝",
    "title": "临江仙·送光州曾使君",
    "content": "谁知江上酒，\n还与故人倾。"
}, {
    "author": "李白",
    "title": "金陵酒肆留别",
    "content": "请君试问东流水，\n别意与之谁短长。"
}, {
    "author": "周邦彦",
    "title": "兰陵王·柳",
    "content": "隋堤上、曾见几番，\n拂水飘绵送行色。"
}, {
    "author": "冯延巳",
    "title": "浣溪沙·春到青门柳色黄",
    "content": "绣帐已阑离别梦，\n玉炉空袅寂寥香。"
}, {
    "author": "薛道衡",
    "title": "昔昔盐",
    "content": "关山别荡子，\n风月守空闺。"
}, {
    "author": "薛涛",
    "title": "送友人",
    "content": "谁言千里自今夕，\n离梦杳如关塞长。"
}, {
    "author": "徐昌图",
    "title": "临江仙·饮散离亭西去",
    "content": "饮散离亭西去，\n浮生长恨飘蓬。"
}, {
    "author": "韩缜",
    "title": "凤箫吟·锁离愁",
    "content": "锁离愁，\n连绵无际，\n来时陌上初熏。"
}, {
    "author": "李白",
    "title": "金乡送韦八之西京",
    "content": "狂风吹我心，\n西挂咸阳树。"
}, {
    "author": "李白",
    "title": "送友人入蜀",
    "content": "升沉应已定，\n不必问君平。"
}, {
    "author": "王实甫",
    "title": "十二月过尧民歌·别情",
    "content": "自别后遥山隐隐，\n更那堪远水粼粼。"
}, {
    "author": "骆宾王",
    "title": "送别",
    "content": "离心何以赠，\n自有玉壶冰。"
}, {
    "author": "王昌龄",
    "title": "送柴侍御",
    "content": "沅水通波接武冈，\n送君不觉有离伤。"
}, {
    "author": "王昌龄",
    "title": "送狄宗亨",
    "content": "送君归去愁不尽，\n又惜空度凉风天。"
}, {
    "author": "纳兰性德",
    "title": "清平乐·孤花片叶",
    "content": "孤花片叶，\n断送清秋节。"
}, {
    "author": "晁冲之",
    "title": "临江仙·忆昔西池池上饮",
    "content": "别来不寄一行书。\n寻常相见了，\n犹道不如初。"
}, {
    "author": "杜甫",
    "title": "奉济驿重送严公四韵",
    "content": "远送从此别，\n青山空复情。"
}, {
    "author": "纳兰性德",
    "title": "木兰词·拟古决绝词柬友",
    "content": "人生若只如初见，\n何事秋风悲画扇。"
}, {
    "author": "苏轼",
    "title": "江城子·乙卯正月二十日夜记梦",
    "content": "十年生死两茫茫，\n不思量，\n自难忘。"
}, {
    "author": "崔护",
    "title": "题都城南庄",
    "content": "去年今日此门中，\n人面桃花相映红。"
}, {
    "author": "元稹",
    "title": "离思五首·其四",
    "content": "曾经沧海难为水，\n除却巫山不是云。"
}, {
    "author": "欧阳修",
    "title": "玉楼春·尊前拟把归期说",
    "content": "人生自是有情痴，\n此恨不关风与月。"
}, {
    "author": "秦观",
    "title": "鹊桥仙·纤云弄巧",
    "content": "两情若是久长时，\n又岂在朝朝暮暮。"
}, {
    "author": "李煜",
    "title": "相见欢·林花谢了春红",
    "content": "林花谢了春红，\n太匆匆。\n无奈朝来寒雨，\n晚来风。"
}, {
    "author": "苏轼",
    "title": "临江仙·送钱穆父",
    "content": "人生如逆旅，\n我亦是行人。"
}, {
    "author": "李商隐",
    "title": "锦瑟",
    "content": "此情可待成追忆？\n只是当时已惘然。"
}, {
    "author": "苏麟",
    "title": "断句",
    "content": "近水楼台先得月，\n向阳花木易为春。"
}, {
    "author": "李商隐",
    "title": "无题·昨夜星辰昨夜风",
    "content": "身无彩凤双飞翼，\n心有灵犀一点通。"
}, {
    "author": "李白",
    "title": "宣州谢脁楼饯别校书叔云 / 陪侍御叔华登楼歌",
    "content": "抽刀断水水更流，\n举杯消愁愁更愁。"
}, {
    "author": "罗隐",
    "title": "蜂",
    "content": "采得百花成蜜后，\n为谁辛苦为谁甜。"
}, {
    "author": "白居易",
    "title": "琵琶行",
    "content": "同是天涯沦落人，\n相逢何必曾相识！"
}, {
    "author": "李商隐",
    "title": "无题·相见时难别亦难",
    "content": "春蚕到死丝方尽，\n蜡炬成灰泪始干。"
}, {
    "author": "张鸣善",
    "title": "普天乐·咏世",
    "content": "月有盈亏花有开谢，\n想人生最苦离别。"
}, {
    "author": "晏殊",
    "title": "采桑子·时光只解催人老",
    "content": "时光只解催人老，\n不信多情，\n长恨离亭，\n泪滴春衫酒易醒。"
}, {
    "author": "唐寅",
    "title": "一剪梅·雨打梨花深闭门",
    "content": "雨打梨花深闭门，\n忘了青春，\n误了青春。"
}, {
    "author": "杨慎",
    "title": "临江仙·滚滚长江东逝水",
    "content": "青山依旧在，\n几度夕阳红。"
}, {
    "author": "郑思肖",
    "title": "画菊",
    "content": "宁可枝头抱香死，\n何曾吹落北风中。"
}, {
    "author": "惠能",
    "title": "菩提偈",
    "content": "菩提本无树，\n明镜亦非台。"
}, {
    "author": "韦应物",
    "title": "淮上喜会梁川故人 / 淮上喜会梁州故人",
    "content": "浮云一别后，\n流水十年间。"
}, {
    "author": "苏轼",
    "title": "惠崇春江晚景 / 惠崇春江晓景",
    "content": "竹外桃花三两枝，\n春江水暖鸭先知。"
}, {
    "author": "李贺",
    "title": "南园十三首·其五",
    "content": "男儿何不带吴钩，\n收取关山五十州。"
}, {
    "author": "苏轼",
    "title": "南乡子·重九涵辉楼呈徐君猷",
    "content": "万事到头都是梦，\n休休。\n明日黄花蝶也愁。"
}, {
    "author": "杜甫",
    "title": "前出塞九首·其六",
    "content": "射人先射马，\n擒贼先擒王。"
}, {
    "author": "张可久",
    "title": "卖花声·怀古",
    "content": "美人自刎乌江岸，\n战火曾烧赤壁山，\n将军空老玉门关。"
}, {
    "author": "李白",
    "title": "把酒问月·故人贾淳令予问之",
    "content": "今人不见古时月，\n今月曾经照古人。"
}, {
    "author": "张谓",
    "title": "题长安壁主人",
    "content": "世人结交须黄金，\n黄金不多交不深。"
}, {
    "author": "杜甫",
    "title": "闻官军收河南河北",
    "content": "白日放歌须纵酒，\n青春作伴好还乡。"
}, {
    "author": "龚自珍",
    "title": "己亥杂诗·其五",
    "content": "落红不是无情物，\n化作春泥更护花。"
}, {
    "author": "苏轼",
    "title": "望江南·超然台作",
    "content": "休对故人思故国，\n且将新火试新茶。\n诗酒趁年华。"
}, {
    "author": "朱熹",
    "title": "劝学诗 / 偶成",
    "content": "少年易老学难成，\n一寸光阴不可轻。"
}, {
    "author": "贺铸",
    "title": "芳心苦·杨柳回塘",
    "content": "当年不肯嫁春风，\n无端却被秋风误。"
}, {
    "author": "李商隐",
    "title": "锦瑟",
    "content": "沧海月明珠有泪，\n蓝田日暖玉生烟。"
}, {
    "author": "韦庄",
    "title": "菩萨蛮·劝君今夜须沈醉",
    "content": "遇酒且呵呵，\n人生能几何！"
}, {
    "author": "郑燮",
    "title": "竹石",
    "content": "咬定青山不放松，\n立根原在破岩中。"
}, {
    "author": "贾岛",
    "title": "剑客 / 述剑",
    "content": "十年磨一剑，\n霜刃未曾试。"
}, {
    "author": "李清照",
    "title": "武陵春·春晚",
    "content": "物是人非事事休，\n欲语泪先流。"
}, {
    "author": "李商隐",
    "title": "锦瑟",
    "content": "锦瑟无端五十弦，\n一弦一柱思华年。"
}, {
    "author": "王昌龄",
    "title": "出塞二首·其一",
    "content": "秦时明月汉时关，\n万里长征人未还。"
}, {
    "author": "陆游",
    "title": "游山西村",
    "content": "山重水复疑无路，\n柳暗花明又一村。"
}, {
    "author": "何梦桂",
    "title": "摸鱼儿·记年时人人何处",
    "content": "数人世相逢，\n百年欢笑，\n能得几回又。"
}, {
    "author": "鲍照",
    "title": "拟行路难·其四",
    "content": "人生亦有命，\n安能行叹复坐愁？"
}, {
    "author": "陆游",
    "title": "金错刀行",
    "content": "呜呼！\n楚虽三户能亡秦，\n岂有堂堂中国空无人！"
}, {
    "author": "李白",
    "title": "行路难·其一",
    "content": "长风破浪会有时，\n直挂云帆济沧海。"
}, {
    "author": "杜荀鹤",
    "title": "小松",
    "content": "时人不识凌云木，\n直待凌云始道高。"
}, {
    "author": "李商隐",
    "title": "乐游原 / 登乐游原",
    "content": "夕阳无限好，\n只是近黄昏。"
}, {
    "author": "杜甫",
    "title": "望岳",
    "content": "会当凌绝顶，\n一览众山小。"
}, {
    "author": "苏轼",
    "title": "题西林壁",
    "content": "不识庐山真面目，\n只缘身在此山中。"
}, {
    "author": "李煜",
    "title": "乌夜啼·昨夜风兼雨",
    "content": "世事漫随流水，\n算来一梦浮生。"
}, {
    "author": "苏轼",
    "title": "琴诗",
    "content": "若言琴上有琴声，\n放在匣中何不鸣？"
}, {
    "author": "白居易",
    "title": "草 / 赋得古原草送别",
    "content": "离离原上草，\n一岁一枯荣。"
}, {
    "author": "赵秉文",
    "title": "青杏儿·风雨替花愁",
    "content": "劝君莫惜花前醉，\n今年花谢，\n明年花谢，\n白了人头。"
}, {
    "author": "杜秋娘",
    "title": "金缕衣",
    "content": "劝君莫惜金缕衣，\n劝君惜取少年时。"
}, {
    "author": "辛弃疾",
    "title": "木兰花慢·滁州送范倅",
    "content": "老来情味减，\n对别酒、怯流年。"
}, {
    "author": "于谦",
    "title": "石灰吟",
    "content": "千锤万凿出深山，\n烈火焚烧若等闲。"
}, {
    "author": "王勃",
    "title": "送杜少府之任蜀州 / 送杜少府之任蜀川",
    "content": "海内存知己，\n天涯若比邻。"
}, {
    "author": "林则徐",
    "title": "赴戍登程口占示家人·其二",
    "content": "苟利国家生死以，\n岂因祸福避趋之！"
}, {
    "author": "刘禹锡",
    "title": "酬乐天扬州初逢席上见赠",
    "content": "沉舟侧畔千帆过，\n病树前头万木春。"
}, {
    "author": "韦应物",
    "title": "寄李儋元锡",
    "content": "去年花里逢君别，\n今日花开已一年。"
}, {
    "author": "黄蘖禅师",
    "title": "上堂开示颂",
    "content": "不经一番寒彻骨，\n怎得梅花扑鼻香。"
}, {
    "author": "卢梅坡",
    "title": "雪梅·其一",
    "content": "梅须逊雪三分白，\n雪却输梅一段香。"
}, {
    "author": "欧阳修",
    "title": "春日西湖寄谢法曹韵",
    "content": "酒逢知己千杯少，\n话不投机半句多。"
}, {
    "author": "陆游",
    "title": "书愤五首·其二",
    "content": "壮心未与年俱老，\n死去犹能作鬼雄。"
}, {
    "author": "袁枚",
    "title": "马嵬",
    "content": "莫唱当年长恨歌，\n人间亦自有银河。"
}, {
    "author": "苏轼",
    "title": "浣溪沙·游蕲水清泉寺",
    "content": "谁道人生无再少？\n门前流水尚能西！\n休将白发唱黄鸡。"
}, {
    "author": "陆游",
    "title": "沈园二首",
    "content": "伤心桥下春波绿，\n曾是惊鸿照影来。"
}, {
    "author": "文天祥",
    "title": "过零丁洋",
    "content": "人生自古谁无死？\n留取丹心照汗青。"
}, {
    "author": "苏轼",
    "title": "稼说送张琥",
    "content": "博观而约取，\n厚积而薄发"
}, {
    "author": "王贞白",
    "title": "白鹿洞二首·其一",
    "content": "读书不觉已春深，\n一寸光阴一寸金。"
}, {
    "author": "荀子",
    "title": "劝学",
    "content": "不积小流，\n无以成江海。"
}, {
    "author": "贺知章",
    "title": "回乡偶书二首·其一",
    "content": "少小离家老大回，\n乡音无改鬓毛衰。"
}, {
    "author": "杨炯",
    "title": "从军行",
    "content": "宁为百夫长，\n胜作一书生。"
}, {
    "author": "文天祥",
    "title": "过零丁洋",
    "content": "山河破碎风飘絮，\n身世浮沉雨打萍。"
}, {
    "author": "李白",
    "title": "将进酒",
    "content": "天生我材必有用，\n千金散尽还复来。"
}, {
    "author": "陶渊明",
    "title": "杂诗·人生无根蒂",
    "content": "盛年不重来，\n一日难再晨。"
}, {
    "author": "李白",
    "title": "上李邕",
    "content": "宣父犹能畏后生，\n丈夫未可轻年少。"
}, {
    "author": "纳兰性德",
    "title": "长相思·山一程",
    "content": "山一程，\n水一程，\n身向榆关那畔行，\n夜深千帐灯。"
}, {
    "author": "荀子",
    "title": "劝学",
    "content": "冰，\n水为之，\n而寒于水。"
}, {
    "author": "陆游",
    "title": "示儿",
    "content": "死去元知万事空，\n但悲不见九州同。"
}, {
    "author": "戴叔伦",
    "title": "塞上曲二首·其二",
    "content": "愿得此身长报国，\n何须生入玉门关。"
}, {
    "author": "黄庭坚",
    "title": "寄黄几复",
    "content": "桃李春风一杯酒，\n江湖夜雨十年灯。"
}, {
    "author": "李白",
    "title": "梦游天姥吟留别 / 别东鲁诸公",
    "content": "世间行乐亦如此，\n古来万事东流水。"
}, {
    "author": "晏几道",
    "title": "蝶恋花·醉别西楼醒不记",
    "content": "醉别西楼醒不记。\n春梦秋云，\n聚散真容易。"
}, {
    "author": "秦观",
    "title": "江城子·西城杨柳弄春柔",
    "content": "韶华不为少年留。\n恨悠悠。\n几时休。"
}, {
    "author": "朱敦儒",
    "title": "西江月·世事短如春梦",
    "content": "世事短如春梦，\n人情薄似秋云。"
}, {
    "author": "颜真卿",
    "title": "劝学诗",
    "content": "黑发不知勤学早，\n白首方悔读书迟。"
}, {
    "author": "苏轼",
    "title": "临江仙·夜饮东坡醒复醉",
    "content": "长恨此身非我有，\n何时忘却营营。"
}, {
    "author": "李煜",
    "title": "相见欢·林花谢了春红",
    "content": "自是人生长恨，\n水长东。"
}, {
    "author": "高适",
    "title": "送李侍御赴安西",
    "content": "功名万里外，\n心事一杯中。"
}, {
    "author": "屈原",
    "title": "国殇",
    "content": "身既死兮神以灵，\n魂魄毅兮为鬼雄。"
}, {
    "author": "朱熹",
    "title": "春日",
    "content": "等闲识得东风面，\n万紫千红总是春。"
}, {
    "author": "王籍",
    "title": "入若耶溪",
    "content": "蝉噪林逾静，\n鸟鸣山更幽。"
}, {
    "author": "辛弃疾",
    "title": "水调歌头·壬子三山被召陈端仁给事饮饯席上作",
    "content": "人间万事，\n毫发常重泰山轻。"
}, {
    "author": "韦庄",
    "title": "思帝乡·春日游",
    "content": "纵被无情弃，\n不能羞。"
}, {
    "author": "骆宾王",
    "title": "于易水送人 / 于易水送别",
    "content": "昔时人已没，\n今日水犹寒。"
}, {
    "author": "陆游",
    "title": "冬夜读书示子聿",
    "content": "纸上得来终觉浅，\n绝知此事要躬行。"
}, {
    "author": "范云",
    "title": "别诗",
    "content": "昔去雪如花，\n今来花似雪。"
}, {
    "author": "苏轼",
    "title": "浣溪沙·端午",
    "content": "彩线轻缠红玉臂，\n小符斜挂绿云鬟。\n佳人相见一千年。"
}, {
    "author": "马致远",
    "title": "天净沙·秋思",
    "content": "枯藤老树昏鸦，\n小桥流水人家，\n古道西风瘦马。"
}, {
    "author": "王昌龄",
    "title": "从军行七首·其四",
    "content": "黄沙百战穿金甲，\n不破楼兰终不还。"
}, {
    "author": "杜牧",
    "title": "寄扬州韩绰判官",
    "content": "二十四桥明月夜，\n玉人何处教吹箫？"
}, {
    "author": "刘禹锡",
    "title": "杨柳枝 / 柳枝词",
    "content": "曾与美人桥上别，\n恨无消息到今朝。"
}, {
    "author": "王翰",
    "title": "凉州词二首·其一",
    "content": "醉卧沙场君莫笑，\n古来征战几人回？"
}, {
    "author": "王昌龄",
    "title": "出塞二首·其一",
    "content": "秦时明月汉时关，\n万里长征人未还。"
}, {
    "author": "陆游",
    "title": "游山西村",
    "content": "山重水复疑无路，\n柳暗花明又一村。"
}, {
    "author": "王驾",
    "title": "社日",
    "content": "鹅湖山下稻粱肥，\n豚栅鸡栖半掩扉。"
}, {
    "author": "陆游",
    "title": "沈园二首",
    "content": "伤心桥下春波绿，\n曾是惊鸿照影来。"
}, {
    "author": "王之涣",
    "title": "凉州词二首·其一",
    "content": "羌笛何须怨杨柳，\n春风不度玉门关。"
}, {
    "author": "王维",
    "title": "积雨辋川庄作 / 秋归辋川庄作",
    "content": "漠漠水田飞白鹭，\n阴阴夏木啭黄鹂。"
}, {
    "author": "戴叔伦",
    "title": "塞上曲二首·其二",
    "content": "愿得此身长报国，\n何须生入玉门关。"
}, {
    "author": "高鼎",
    "title": "村居",
    "content": "儿童散学归来早，\n忙趁东风放纸鸢。"
}, {
    "author": "王昌龄",
    "title": "出塞二首",
    "content": "但使龙城飞将在，\n不教胡马度阴山。"
}, {
    "author": "辛弃疾",
    "title": "西江月·夜行黄沙道中",
    "content": "稻花香里说丰年。\n听取蛙声一片。"
}, {
    "author": "李绅",
    "title": "古风二首 / 悯农二首",
    "content": "锄禾日当午，\n汗滴禾下土。"
}, {
    "author": "陶渊明",
    "title": "归园田居·其一",
    "content": "少无适俗韵，\n性本爱丘山。"
}, {
    "author": "李煜",
    "title": "渔父·浪花有意千里雪",
    "content": "一壶酒，\n一竿身，\n快活如侬有几人。"
}, {
    "author": "范仲淹",
    "title": "渔家傲·秋思",
    "content": "塞下秋来风景异，\n衡阳雁去无留意。"
}, {
    "author": "志南",
    "title": "绝句",
    "content": "古木阴中系短篷，\n杖藜扶我过桥东。"
}, {
    "author": "卢纶",
    "title": "和张仆射塞下曲·其二",
    "content": "林暗草惊风，\n将军夜引弓。"
}, {
    "author": "范成大",
    "title": "四时田园杂兴·其二",
    "content": "梅子金黄杏子肥，\n麦花雪白菜花稀。"
}, {
    "author": "范成大",
    "title": "夏日田园杂兴·其七",
    "content": "童孙未解供耕织，\n也傍桑阴学种瓜。"
}, {
    "author": "沈自晋",
    "title": "玉芙蓉·雨窗小咏",
    "content": "掩柴扉，\n谢他梅竹伴我冷书斋。"
}, {
    "author": "杜甫",
    "title": "秋兴八首·其一",
    "content": "江间波浪兼天涌，\n塞上风云接地阴。"
}, {
    "author": "卢纶",
    "title": "和张仆射塞下曲·其三",
    "content": "欲将轻骑逐，\n大雪满弓刀。"
}, {
    "author": "李白",
    "title": "关山月",
    "content": "长风几万里，\n吹度玉门关。"
}, {
    "author": "徐锡麟",
    "title": "出塞",
    "content": "只解沙场为国死，\n何须马革裹尸还。"
}, {
    "author": "陆游",
    "title": "卜算子·咏梅",
    "content": "驿外断桥边，\n寂寞开无主。"
}, {
    "author": "王翰",
    "title": "凉州词二首",
    "content": "秦中花鸟已应阑，\n塞外风沙犹自寒。"
}, {
    "author": "陶渊明",
    "title": "归园田居·其一",
    "content": "开荒南野际，\n守拙归园田。"
}, {
    "author": "纳兰性德",
    "title": "望江南·咏弦月",
    "content": "斜倚画阑娇不语，\n暗移梅影过红桥，\n裙带北风飘。"
}, {
    "author": "李益",
    "title": "夜上受降城闻笛",
    "content": "不知何处吹芦管，\n一夜征人尽望乡。"
}, {
    "author": "范仲淹",
    "title": "渔家傲·秋思",
    "content": "四面边声连角起，\n千嶂里，\n长烟落日孤城闭。"
}, {
    "author": "孟浩然",
    "title": "过故人庄",
    "content": "绿树村边合，\n青山郭外斜。"
}, {
    "author": "翁卷",
    "title": "乡村四月",
    "content": "绿遍山原白满川，\n子规声里雨如烟。"
}, {
    "author": "岑参",
    "title": "走马川行奉送出师西征 / 走马川行奉送封大夫出师西征",
    "content": "君不见走马川行雪海边，\n平沙莽莽黄入天。"
}, {
    "author": "王建",
    "title": "雨过山村",
    "content": "雨里鸡鸣一两家，\n竹溪村路板桥斜。"
}, {
    "author": "杜牧",
    "title": "清明",
    "content": "借问酒家何处有？\n牧童遥指杏花村。"
}, {
    "author": "辛弃疾",
    "title": "清平乐·村居",
    "content": "大儿锄豆溪东，\n中儿正织鸡笼。"
}, {
    "author": "雷震",
    "title": "村晚",
    "content": "牧童归去横牛背，\n短笛无腔信口吹。"
}, {
    "author": "王维",
    "title": "酬张少府",
    "content": "晚年唯好静，\n万事不关心。"
}, {
    "author": "陆游",
    "title": "游山西村",
    "content": "箫鼓追随春社近，\n衣冠简朴古风存。"
}, {
    "author": "杜甫",
    "title": "九日蓝田崔氏庄",
    "content": "老去悲秋强自宽，\n兴来今日尽君欢。"
}, {
    "author": "张炎",
    "title": "渡江云·山阴久客一再逢春回忆西杭渺然愁思",
    "content": "一帘鸠外雨，\n几处闲田，\n隔水动春锄。"
}, {
    "author": "张榘",
    "title": "青玉案·被檄出郊题陈氏山居",
    "content": "西风乱叶溪桥树。\n秋在黄花羞涩处。"
}, {
    "author": "陈继儒",
    "title": "浣溪沙·初夏夜饮归",
    "content": "笑指吾庐何处是？\n一池荷叶小桥横。"
}, {
    "author": "陆游",
    "title": "书愤五首·其一",
    "content": "楼船夜雪瓜洲渡，\n铁马秋风大散关。"
}, {
    "author": "周邦彦",
    "title": "玉楼春·桃溪不作从容住",
    "content": "当时相候赤栏桥，\n今日独寻黄叶路。"
}, {
    "author": "顾彩",
    "title": "相见欢·秋风吹到江村",
    "content": "秋风吹到江村，\n正黄昏，\n寂寞梧桐夜雨不开门。"
}, {
    "author": "吴文英",
    "title": "十二郎·垂虹桥",
    "content": "记晓叶题霜，\n秋灯吟雨，\n曾系长桥过艇。"
}, {
    "author": "陈与义",
    "title": "临江仙·夜登小阁忆洛中旧游",
    "content": "忆昔午桥桥上饮，\n坐中多是豪英。"
}, {
    "author": "白居易",
    "title": "雪夜小饮赠梦得",
    "content": "小酌酒巡销永夜，\n大开口笑送残年。"
}, {
    "author": "张孝祥",
    "title": "浣溪沙·霜日明霄水蘸空",
    "content": "万里中原烽火北，\n一尊浊酒戍楼东。"
}, {
    "author": "吴文英",
    "title": "瑞龙吟·送梅津",
    "content": "还背垂虹秋去，\n四桥烟雨，\n一宵歌酒。"
}, {
    "author": "陆游",
    "title": "秋波媚·七月十六日晚登高兴亭望长安南山",
    "content": "灞桥烟柳，\n曲江池馆，\n应待人来。"
}, {
    "author": "朱栴",
    "title": "官桥柳色",
    "content": "桥北桥南千百树，\n绿烟金穗映清流。"
}, {
    "author": "张惠言",
    "title": "江城子·填张春溪西湖竹枝词",
    "content": "郎到断桥须有路，\n侬住处，\n柳如金。"
}, {
    "author": "辛弃疾",
    "title": "木兰花慢·席上送张仲固帅兴元",
    "content": "落日胡尘未断，\n西风塞马空肥。"
}, {
    "author": "王建",
    "title": "寄旧山僧",
    "content": "猎人箭底求伤雁，\n钓户竿头乞活鱼。"
}, {
    "author": "柳永",
    "title": "望海潮·东南形胜",
    "content": "烟柳画桥，\n风帘翠幕，\n参差十万人家。"
}, {
    "author": "贾岛",
    "title": "题李凝幽居",
    "content": "过桥分野色，\n移石动云根。"
}, {
    "author": "温庭筠",
    "title": "商山早行",
    "content": "鸡声茅店月，\n人迹板桥霜。"
}, {
    "author": "王涯",
    "title": "塞下曲二首·其二",
    "content": "不知马骨伤寒水，\n惟见龙城起暮云。"
}, {
    "author": "李益",
    "title": "塞下曲·其一",
    "content": "燕歌未断塞鸿飞，\n牧马群嘶边草绿。"
}, {
    "author": "李益",
    "title": "塞下曲",
    "content": "伏波惟愿裹尸还，\n定远何须生入关。"
}, {
    "author": "张说",
    "title": "幽州夜饮",
    "content": "军中宜剑舞，\n塞上重笳音。"
}, {
    "author": "张炎",
    "title": "高阳台·西湖春感",
    "content": "接叶巢莺，\n平波卷絮，\n断桥斜日归船。"
}, {
    "author": "杜审言",
    "title": "春日京中有怀",
    "content": "公子南桥应尽兴，\n将军西第几留宾。"
}, {
    "author": "姜夔",
    "title": "点绛唇·丁未冬过吴松作",
    "content": "第四桥边，\n拟共天随住。"
}, {
    "author": "纳兰性德",
    "title": "淡黄柳·咏柳",
    "content": "红板桥空，\n溅裙人去，\n依旧晓风残月。"
}, {
    "author": "白居易",
    "title": "村夜",
    "content": "独出前门望野田，\n月明荞麦花如雪。"
}, {
    "author": "寇准",
    "title": "江南春·波渺渺",
    "content": "孤村芳草远，\n斜日杏花飞。"
}, {
    "author": "白朴",
    "title": "天净沙·春",
    "content": "啼莺舞燕，\n小桥流水飞红。"
}, {
    "author": "李白",
    "title": "秋登宣城谢脁北楼",
    "content": "两水夹明镜，\n双桥落彩虹。"
}, {
    "author": "王禹偁",
    "title": "村行·马穿山径菊初黄",
    "content": "何事吟余忽惆怅，\n村桥原树似吾乡。"
}, {
    "author": "李益",
    "title": "从军北征",
    "content": "碛里征人三十万，\n一时回向月明看。"
}, {
    "author": "宋之问",
    "title": "寒食江州满塘驿",
    "content": "去年上巳洛桥边，\n今年寒食庐山曲。"
}, {
    "author": "王禹偁",
    "title": "村行·马穿山径菊初黄",
    "content": "马穿山径菊初黄，\n信马悠悠野兴长。"
}, {
    "author": "王士祯",
    "title": "浣溪沙·红桥",
    "content": "白鸟朱荷引画桡，\n垂杨影里见红桥，\n欲寻往事已魂消。"
}, {
    "author": "吴文英",
    "title": "夜合花·自鹤江入京泊葑门外有感",
    "content": "柳暝河桥，\n莺晴台苑，\n短策频惹春香。"
}, {
    "author": "佚名",
    "title": "长歌行",
    "content": "青青园中葵，\n朝露待日晞。"
}, {
    "author": "白朴",
    "title": "天净沙·秋",
    "content": "孤村落日残霞，\n轻烟老树寒鸦，\n一点飞鸿影下。"
}, {
    "author": "王昌龄",
    "title": "从军行七首",
    "content": "大漠风尘日色昏，\n红旗半卷出辕门。"
}, {
    "author": "范成大",
    "title": "浣溪沙·江村道中",
    "content": "十里西畴熟稻香，\n槿花篱落竹丝长，\n垂垂山果挂青黄。"
}, {
    "author": "韦应物",
    "title": "观田家",
    "content": "田家几日闲，\n耕种从此起。"
}, {
    "author": "李白",
    "title": "塞下曲六首·其一",
    "content": "晓战随金鼓，\n宵眠抱玉鞍。"
}, {
    "author": "王维",
    "title": "少年行四首",
    "content": "孰知不向边庭苦，\n纵死犹闻侠骨香。"
}, {
    "author": "曹松",
    "title": "己亥岁二首·僖宗广明元年",
    "content": "传闻一战百神愁，\n两岸强兵过未休。"
}, {
    "author": "陶渊明",
    "title": "归园田居·其三",
    "content": "道狭草木长，\n夕露沾我衣。"
}, {
    "author": "王维",
    "title": "渭川田家",
    "content": "田夫荷锄至，\n相见语依依。"
}, {
    "author": "洪咨夔",
    "title": "眼儿媚·平沙芳草渡头村",
    "content": "平沙芳草渡头村。\n绿遍去年痕。"
}, {
    "author": "杜甫",
    "title": "奉济驿重送严公四韵",
    "content": "江村独归处，\n寂寞养残生。"
}, {
    "author": "岳飞",
    "title": "满江红·登黄鹤楼有感",
    "content": "叹江山如故，\n千村寥落。"
}, {
    "author": "翁卷",
    "title": "乡村四月",
    "content": "乡村四月闲人少，\n才了蚕桑又插田。"
}, {
    "author": "张籍",
    "title": "野老歌 / 山农词",
    "content": "岁暮锄犁傍空室，\n呼儿登山收橡实。"
}, {
    "author": "李白",
    "title": "子夜吴歌·秋歌",
    "content": "长安一片月，\n万户捣衣声。"
}, {
    "author": "李白",
    "title": "春夜宴桃李园序 / 春夜宴从弟桃花园序",
    "content": "会桃花之芳园，\n序天伦之乐事。"
}, {
    "author": "王维",
    "title": "田园乐七首·其六",
    "content": "桃红复含宿雨，\n柳绿更带朝烟。"
}, {
    "author": "欧阳修",
    "title": "踏莎行·候馆梅残",
    "content": "候馆梅残，\n溪桥柳细。"
}, {
    "author": "王维",
    "title": "山居秋暝",
    "content": "空山新雨后，\n天气晚来秋。"
}, {
    "author": "崔护",
    "title": "题都城南庄",
    "content": "人面不知何处去，\n桃花依旧笑春风。"
}, {
    "author": "马致远",
    "title": "天净沙·秋思",
    "content": "枯藤老树昏鸦，\n小桥流水人家，\n古道西风瘦马。"
}, {
    "author": "志南",
    "title": "绝句",
    "content": "沾衣欲湿杏花雨，\n吹面不寒杨柳风。"
}, {
    "author": "杜甫",
    "title": "绝句二首",
    "content": "江碧鸟逾白，\n山青花欲燃。"
}, {
    "author": "唐寅",
    "title": "一剪梅·雨打梨花深闭门",
    "content": "雨打梨花深闭门，\n忘了青春，\n误了青春。"
}, {
    "author": "陆游",
    "title": "钗头凤·红酥手",
    "content": "红酥手，\n黄縢酒，\n满城春色宫墙柳。"
}, {
    "author": "苏轼",
    "title": "惠崇春江晚景 / 惠崇春江晓景",
    "content": "竹外桃花三两枝，\n春江水暖鸭先知。"
}, {
    "author": "白居易",
    "title": "大林寺桃花",
    "content": "人间四月芳菲尽，\n山寺桃花始盛开。"
}, {
    "author": "秦观",
    "title": "八六子·倚危亭",
    "content": "夜月一帘幽梦，\n春风十里柔情。"
}, {
    "author": "陆游",
    "title": "临安春雨初霁",
    "content": "小楼一夜听春雨，\n深巷明朝卖杏花。"
}, {
    "author": "王勃",
    "title": "滕王阁序",
    "content": "落霞与孤鹜齐飞，\n秋水共长天一色。"
}, {
    "author": "苏轼",
    "title": "春宵·春宵一刻值千金",
    "content": "春宵一刻值千金，\n花有清香月有阴。"
}, {
    "author": "徐再思",
    "title": "水仙子·夜雨",
    "content": "一声梧叶一声秋，\n一点芭蕉一点愁，\n三更归梦三更后。"
}, {
    "author": "毛泽东",
    "title": "沁园春·长沙",
    "content": "独立寒秋，\n湘江北去，\n橘子洲头。"
}, {
    "author": "贺铸",
    "title": "芳心苦·杨柳回塘",
    "content": "当年不肯嫁春风，\n无端却被秋风误。"
}, {
    "author": "李商隐",
    "title": "无题·相见时难别亦难",
    "content": "相见时难别亦难，\n东风无力百花残。"
}, {
    "author": "杜甫",
    "title": "绝句",
    "content": "两个黄鹂鸣翠柳，\n一行白鹭上青天。"
}, {
    "author": "张若虚",
    "title": "春江花月夜",
    "content": "春江潮水连海平，\n海上明月共潮生。"
}, {
    "author": "李煜",
    "title": "浪淘沙令·帘外雨潺潺",
    "content": "流水落花春去也，\n天上人间。"
}, {
    "author": "李白",
    "title": "黄鹤楼送孟浩然之广陵",
    "content": "故人西辞黄鹤楼，\n烟花三月下扬州。"
}, {
    "author": "王安石",
    "title": "梅花 / 梅",
    "content": "墙角数枝梅，\n凌寒独自开。"
}, {
    "author": "朱熹",
    "title": "春日",
    "content": "胜日寻芳泗水滨，\n无边光景一时新。"
}, {
    "author": "杨万里",
    "title": "晓出净慈寺送林子方",
    "content": "接天莲叶无穷碧，\n映日荷花别样红。"
}, {
    "author": "纳兰性德",
    "title": "采桑子·当时错",
    "content": "红泪偷垂，\n满眼春风百事非。"
}, {
    "author": "杜甫",
    "title": "春夜喜雨",
    "content": "好雨知时节，\n当春乃发生。"
}, {
    "author": "李商隐",
    "title": "夜雨寄北",
    "content": "君问归期未有期，\n巴山夜雨涨秋池。"
}, {
    "author": "高骈",
    "title": "山亭夏日",
    "content": "水晶帘动微风起，\n满架蔷薇一院香。"
}, {
    "author": "朱庭玉",
    "title": "天净沙·秋",
    "content": "庭前落尽梧桐，\n水边开彻芙蓉。"
}, {
    "author": "李商隐",
    "title": "无题·飒飒东风细雨来",
    "content": "春心莫共花争发，\n一寸相思一寸灰！"
}, {
    "author": "韩愈",
    "title": "早春呈水部张十八员外 / 初春小雨 / 早春",
    "content": "天街小雨润如酥，\n草色遥看近却无。"
}, {
    "author": "王安石",
    "title": "泊船瓜洲",
    "content": "春风又绿江南岸，\n明月何时照我还？"
}, {
    "author": "杨万里",
    "title": "小池",
    "content": "小荷才露尖尖角，\n早有蜻蜓立上头。"
}, {
    "author": "刘禹锡",
    "title": "酬乐天扬州初逢席上见赠",
    "content": "沉舟侧畔千帆过，\n病树前头万木春。"
}, {
    "author": "刘彻",
    "title": "秋风辞",
    "content": "兰有秀兮菊有芳，\n怀佳人兮不能忘。"
}, {
    "author": "李白",
    "title": "春夜洛城闻笛 / 春夜洛阳城闻笛",
    "content": "谁家玉笛暗飞声，\n散入春风满洛城。"
}, {
    "author": "韦应物",
    "title": "滁州西涧",
    "content": "春潮带雨晚来急，\n野渡无人舟自横。"
}, {
    "author": "柳宗元",
    "title": "江雪",
    "content": "千山鸟飞绝，\n万径人踪灭。"
}, {
    "author": "王之涣",
    "title": "凉州词二首·其一",
    "content": "羌笛何须怨杨柳，\n春风不度玉门关。"
}, {
    "author": "王贞白",
    "title": "白鹿洞二首·其一",
    "content": "读书不觉已春深，\n一寸光阴一寸金。"
}, {
    "author": "苏轼",
    "title": "菩萨蛮·回文夏闺怨",
    "content": "柳庭风静人眠昼，\n昼眠人静风庭柳。"
}, {
    "author": "王维",
    "title": "积雨辋川庄作 / 秋归辋川庄作",
    "content": "漠漠水田飞白鹭，\n阴阴夏木啭黄鹂。"
}, {
    "author": "杨巨源",
    "title": "城东早春",
    "content": "若待上林花似锦，\n出门俱是看花人。"
}, {
    "author": "杜牧",
    "title": "山行",
    "content": "停车坐爱枫林晚，\n霜叶红于二月花。"
}, {
    "author": "杜甫",
    "title": "春望",
    "content": "国破山河在，\n城春草木深。"
}, {
    "author": "苏轼",
    "title": "蝶恋花·春景",
    "content": "花褪残红青杏小。\n燕子飞时，\n绿水人家绕。"
}, {
    "author": "王安石",
    "title": "元日",
    "content": "爆竹声中一岁除，\n春风送暖入屠苏。"
}, {
    "author": "白居易",
    "title": "钱塘湖春行",
    "content": "乱花渐欲迷人眼，\n浅草才能没马蹄。"
}, {
    "author": "崔涂",
    "title": "除夜 / 巴山道中除夜书怀 / 除夜有怀",
    "content": "乱山残雪夜，\n孤烛异乡人。"
}, {
    "author": "王维",
    "title": "鸟鸣涧",
    "content": "人闲桂花落，\n夜静春山空。"
}, {
    "author": "辛弃疾",
    "title": "西江月·夜行黄沙道中",
    "content": "稻花香里说丰年。\n听取蛙声一片。"
}, {
    "author": "白居易",
    "title": "问刘十九",
    "content": "晚来天欲雪，\n能饮一杯无。"
}, {
    "author": "李清照",
    "title": "醉花阴·薄雾浓云愁永昼",
    "content": "莫道不销魂，\n帘卷西风，\n人比黄花瘦。"
}, {
    "author": "黄庭坚",
    "title": "鄂州南楼书事",
    "content": "清风明月无人管，\n并作南楼一味凉。"
}, {
    "author": "毛泽东",
    "title": "沁园春·雪",
    "content": "北国风光，\n千里冰封，\n万里雪飘。"
}, {
    "author": "崔道融",
    "title": "梅花",
    "content": "朔风如解意，\n容易莫摧残。"
}, {
    "author": "李煜",
    "title": "清平乐·别来春半",
    "content": "别来春半，\n触目柔肠断。"
}, {
    "author": "李白",
    "title": "宣城见杜鹃花 / 子规",
    "content": "一叫一回肠一断，\n三春三月忆三巴。"
}, {
    "author": "白居易",
    "title": "忆江南·江南好",
    "content": "日出江花红胜火，\n春来江水绿如蓝。"
}, {
    "author": "刘长卿",
    "title": "逢雪宿芙蓉山主人",
    "content": "日暮苍山远，\n天寒白屋贫。"
}, {
    "author": "贺知章",
    "title": "回乡偶书二首",
    "content": "唯有门前镜湖水，\n春风不改旧时波。"
}, {
    "author": "朱熹",
    "title": "春日",
    "content": "等闲识得东风面，\n万紫千红总是春。"
}, {
    "author": "晏殊",
    "title": "破阵子·春景",
    "content": "池上碧苔三四点，\n叶底黄鹂一两声。"
}, {
    "author": "宋祁",
    "title": "玉楼春·春景",
    "content": "绿杨烟外晓寒轻，\n红杏枝头春意闹。"
}, {
    "author": "李白",
    "title": "清平调·其一",
    "content": "云想衣裳花想容，\n春风拂槛露华浓。"
}, {
    "author": "杜牧",
    "title": "江南春",
    "content": "千里莺啼绿映红，\n水村山郭酒旗风。"
}, {
    "author": "韩愈",
    "title": "晚春",
    "content": "杨花榆荚无才思，\n惟解漫天作雪飞。"
}, {
    "author": "苏轼",
    "title": "饮湖上初晴后雨二首·其二",
    "content": "欲把西湖比西子，\n淡妆浓抹总相宜。"
}, {
    "author": "纳兰性德",
    "title": "浣溪沙·谁念西风独自凉",
    "content": "谁念西风独自凉，\n萧萧黄叶闭疏窗，\n沉思往事立残阳。"
}, {
    "author": "李白",
    "title": "行路难·其一",
    "content": "欲渡黄河冰塞川，\n将登太行雪满山。"
}, {
    "author": "晏殊",
    "title": "浣溪沙·一向年光有限身",
    "content": "满目山河空念远，\n落花风雨更伤春。"
}, {
    "author": "高鼎",
    "title": "村居",
    "content": "草长莺飞二月天，\n拂堤杨柳醉春烟。"
}, {
    "author": "叶绍翁",
    "title": "游园不值",
    "content": "春色满园关不住，\n一枝红杏出墙来。"
}, {
    "author": "贺知章",
    "title": "咏柳 / 柳枝词",
    "content": "碧玉妆成一树高，\n万条垂下绿丝绦。"
}, {
    "author": "祖咏",
    "title": "终南望余雪",
    "content": "终南阴岭秀，\n积雪浮云端。"
}, {
    "author": "杜牧",
    "title": "九日齐山登高",
    "content": "江涵秋影雁初飞，\n与客携壶上翠微。"
}, {
    "author": "刘彻",
    "title": "秋风辞",
    "content": "秋风起兮白云飞，\n草木黄落兮雁南归。"
}, {
    "author": "关汉卿",
    "title": "大德歌·冬",
    "content": "雪纷纷，\n掩重门，\n不由人不断魂，\n瘦损江梅韵。"
}, {
    "author": "李商隐",
    "title": "宿骆氏亭寄怀崔雍崔衮",
    "content": "秋阴不散霜飞晚，\n留得枯荷听雨声。"
}, {
    "author": "范仲淹",
    "title": "渔家傲·秋思",
    "content": "塞下秋来风景异，\n衡阳雁去无留意。"
}, {
    "author": "韩愈",
    "title": "早春呈水部张十八员外 / 初春小雨 / 早春",
    "content": "最是一年春好处，\n绝胜烟柳满皇都。"
}, {
    "author": "杜甫",
    "title": "江畔独步寻花·其五",
    "content": "黄师塔前江水东，\n春光懒困倚微风。"
}, {
    "author": "张继",
    "title": "枫桥夜泊 / 夜泊枫江",
    "content": "月落乌啼霜满天，\n江枫渔火对愁眠。"
}, {
    "author": "李白",
    "title": "山人劝酒",
    "content": "春风尔来为阿谁，\n蝴蝶忽然满芳草。"
}, {
    "author": "晏殊",
    "title": "玉楼春·春恨",
    "content": "绿杨芳草长亭路。\n年少抛人容易去。"
}, {
    "author": "韦庄",
    "title": "思帝乡·春日游",
    "content": "春日游，\n杏花吹满头。"
}, {
    "author": "陈文述",
    "title": "夏日杂诗",
    "content": "一夜雨声凉到梦，\n万荷叶上送秋来。"
}, {
    "author": "蔡确",
    "title": "夏日登车盖亭",
    "content": "纸屏石枕竹方床，\n手倦抛书午梦长。"
}, {
    "author": "虞集",
    "title": "南乡一剪梅·招熊少府",
    "content": "若待明朝风雨过，\n人在天涯！\n春在天涯。"
}, {
    "author": "寇准",
    "title": "江南春·波渺渺",
    "content": "江南春尽离肠断，\n苹满汀洲人未归。"
}, {
    "author": "黄景仁",
    "title": "别老母",
    "content": "惨惨柴门风雪夜，\n此时有子不如无。"
}, {
    "author": "苏轼",
    "title": "减字木兰花·莺初解语",
    "content": "莺初解语，\n最是一年春好处。"
}, {
    "author": "杜甫",
    "title": "春夜喜雨",
    "content": "晓看红湿处，\n花重锦官城。"
}, {
    "author": "杜甫",
    "title": "绝句二首",
    "content": "迟日江山丽，\n春风花草香。"
}, {
    "author": "柳永",
    "title": "定风波·自春来",
    "content": "自春来、惨绿愁红，\n芳心是事可可。"
}, {
    "author": "黄巢",
    "title": "不第后赋菊",
    "content": "待到秋来九月八，\n我花开后百花杀。"
}, {
    "author": "刘长卿",
    "title": "长沙过贾谊宅",
    "content": "秋草独寻人去后，\n寒林空见日斜时。"
}, {
    "author": "王昌龄",
    "title": "长信怨",
    "content": "金井梧桐秋叶黄，\n珠帘不卷夜来霜。"
}, {
    "author": "杜甫",
    "title": "绝句",
    "content": "窗含西岭千秋雪，\n门泊东吴万里船。"
}, {
    "author": "卢纶",
    "title": "和张仆射塞下曲·其三",
    "content": "欲将轻骑逐，\n大雪满弓刀。"
}, {
    "author": "李白",
    "title": "经乱离后天恩流夜郎忆旧游书怀赠江夏韦太守良宰",
    "content": "天上白玉京，\n十二楼五城。\n仙人抚我顶，\n结发受长生。"
}];

function roll() {
    var select = poemList[Math.ceil(Math.random() * poemList.length)];
    content = select.content.replace(/\n/g, "</h1><h1>");
    $(".poem .content").innerHTML = "<h1>" + content + "</h1>";
    $(".poem .author").textContent = select.author;
    $(".poem .title").textContent = select.title;
    music("main");
}
/*
 * 弹琴
 */
document.onkeydown = function() {
    switch(event.keyCode) {
        case 65:
            qin("key-11");
            break;
        case 83:
            qin("key-12");
            break;
        case 68:
            qin("key-13");
            break;
        case 70:
            qin("key-14");
            break;
        case 71:
            qin("key-15");
            break;
        case 72:
            qin("key-16");
            break;
        case 74:
            qin("key-17");
            break;
        case 81:
            qin("key-21");
            break;
        case 87:
            qin("key-22");
            break;
        case 69:
            qin("key-23");
            break;
        case 82:
            qin("key-24");
            break;
        case 84:
            qin("key-25");
            break;
        case 89:
            qin("key-26");
            break;
        case 85:
            qin("key-27");
            break;
        case 49:
            qin("key-31");
            break;
        case 50:
            qin("key-32");
            break;
        case 51:
            qin("key-33");
            break;
        case 52:
            qin("key-34");
            break;
        case 53:
            qin("key-35");1
            break;
        case 54:
            qin("key-36");
            break;
        case 55:
            qin("key-37");
            break;
    }
}

function qin(id) {
    var audio = $("audio#" + id);
    music('stop');
    audio.currentTime = 0.0;
    audio.play();
}