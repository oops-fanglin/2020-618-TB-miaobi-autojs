// 直到检查该应用开启无障碍后才执行其后面的代码
auto.waitFor();
// 获取设备长，宽并提示
var height = device.height;
var width = device.width;
toast("屏幕宽度:" + width + "\n屏幕高度:" + height);

main();

/**
 * @description 主方法
 * @author Chou
 */
function main(){
    if(openTB()){
        // 打开任务列表
        openTaskList();
        
        // 签到
        missionClick("去签到");
        sleep(2000);

        // T金币兑换
        missionClick("去兑换");
        sleep(2000);

        // 浏览
        mission15s("去浏览");
        sleep(2000);

        // 有其他任务字样可按上面的格式自行添加

        toast("任务完成，脚本结束.");
    } else {
        toast("TB打开失败，脚本结束");
    }
}

/**
 * @description 打开TB
 */
function openTB(){
    toast("打开TB中...");
    launchApp("手机淘宝");
    sleep(5000);

    if(currentActivity() == "com.taobao.browser.BrowserActivity"){
        toast("打开TB成功");
        return true;
    } else {
        toast("打开TB失败");
        return false;
    }
}

/**
 * @description 打开喵币任务列表
 */
function openTaskList(){
    if (textContains("领喵币").exists()) {
        textContains("领喵币").findOne().click();
        toast("打开任务列表成功");
    } else {
        toast("已打开或出错");
    }
}

/**
 * @description 单次点击即可完成的任务 
 * @param {*} keyword
 */
function missionClick(keyword){
    if(textContains(keyword).exists()){
        textContains(keyword).findOne().click();
        toast("完成" + keyword + "任务");
    }
}

/**
 * @description 等待15秒完成的任务 
 * @param {*} keyword 
 */
function mission15s(keyword){
    // 完成的任务数
    var successed = 0;
    var failed = 0;
    
    // 循环搜索keyword，找到后点击进入并滑动，等待20秒后判断页面是否出现完成字样
    while(textContains(keyword).exists()){
        sleep(2000);

        textContains(keyword).click();
        swipe(width / 2 , height - 600 , width / 2,0,500); 
        sleep(22000);
        if(desc("返回618列车").exists() || textContains("返回618列车").exists() || 
            desc("任务完成").exists() || textContains("任务完成").exists() || 
            desc("任务已完成").exists() || textContains("任务已完成").exists()){
            ++successed;
            toast("完成第" + successed  + "个" + keyword + "任务");
            back();
            sleep(3000);
            back();
            sleep(3000);
        } else if(desc("领取失败").exists() || textContains("领取失败").exists()){
            ++failed;
            toast("失败了" + failed + "个任务");
            back();
            sleep(3000);
            back();
            sleep(3000);
        }
    }
}