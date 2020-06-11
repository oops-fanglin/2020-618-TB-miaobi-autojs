toast("脚本开始\n使用期间有任何问题欢迎提交ISSUE。\nGithub:HairDesappear");
toast("建议先将农场任务和TB人生任务完成再运行脚本");
// 直到检查该应用开启无障碍后才执行其后面的代码
auto.waitFor();

// 获取设备长宽
width=device.width
height=device.height

main();

/**
 * 主代码
 */
function main(){    
    // 打开TB
    openTB();

    // 进入活动页面
    openActivityPage();

    // 打开任务列表
    openTaskList();

    var keywords = ["签到", "去兑换", "去观看", "去逛逛", "去完成", "去浏览"];
    justDoIt(keywords);

    toast("脚本结束。\n使用期间有任何问题欢迎提交ISSUE。\nGithub:HairDesappear");
}

/**
 * @description 打开TB
 */
function openTB(){
    launchApp("手机淘宝");
    while(currentActivity() != "com.taobao.browser.BrowserActivity" &&
          currentActivity() != "com.taobao.tao.TBMainActivity"){
        toast("每五秒检测TB是否打开，如遇问题请按音量上键停止");
        sleep(5000);
    }
    toast("打开TB成功");
    sleep(3000);
}

/**
 * @description 从主页面通过搜索框进入活动页
 * @author Chou
 */
function openActivityPage(){
    if(currentActivity() == "com.taobao.tao.TBMainActivity"){
        className("android.view.View").desc("搜索").clickable(true).findOne().click()
        sleep(1000);
        id("searchEdit").setText("理想列车");
        sleep(1000);
        desc("搜索").findOne().click();
        sleep(6000);
    } else if (currentActivity() == "com.taobao.browser.BrowserActivity"){
        toast("已进入活动页");
        sleep(3000);
    }
}

/**
 * @description 打开喵币任务列表，只有打开才结束
 * @author Chou
 */
function openTaskList(){
    while(text("做任务，领喵币").find().empty()) {
        toast("未检测到任务入口，请确认是否在活动页，如遇到问题请按音量上键停止");
        sleep(5000);
    }
    textContains("领喵币").findOne().click();
    toast("检测到活动页，打开任务列表成功");
    sleep(5000);
}

/**
 * @description 单次点击即可完成的任务 
 * @param {*} keyword
 * @author Chou
 */
function missionClick(keyword){
    text(keyword).findOne().click();
    toast("完成" + keyword + "任务");
    sleep(4000);
}

/**
 * @description 等待15秒完成的任务 
 * @param {*} keyword 
 * @author Chou
 */
function mission15s(keyword){
    // 完成一次浏览任务
    textContains(keyword).findOne().click();
    sleep(4000);
    toast("模拟滑动");
    swipe(width / 2 , height - 600 , width / 2,0,7000); 
    sleep(15000);
    back();
    sleep(3000);
}


function justDoIt(keywords){
    var messionCount = 0;
        while(containsKeywords(keywords)){
            switch(keywords[i]){
                case "签到" :
                case "去兑换" :
                case "去观看":missionClick(keywords[i]);
                    break;
                case "去完成":
                case "去逛逛":
                case "去搜索":
                case "去浏览":mission15s(keywords[i]);
                    break;
            }
            sumMession++;
            toast("已完成了" + messionCount + "个任务");
            
            // 防止主页浏览任务终端脚本
            if(!text("做任务，领喵币").find().empty()){
                openActivityPage();
                openTaskList();
            }
        }
        toast("能力范围内没有未完成的任务咯");
        toast("总共完成了" + messionCount + "个任务");
}

function containsKeywords(keywords){
    // 判断页面是否包含关键字数组的内容
    for(var i = 0; i < keywords.length; i++){
        if(text(keywords[i]).exists()){
            return true;
        }
    }
    return false;
}
