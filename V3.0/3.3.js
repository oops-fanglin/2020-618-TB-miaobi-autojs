// 直到检查该应用开启无障碍后才执行其后面的代码
auto.waitFor();
width=device.width
height=device.height

// 防止第一次运行获取无障碍后直接结束
toast("按音量上键停止脚本，停止会有提示")
sleep(3000);
main();

/**
 * 主要代码
 */
function main(){    
    openTB();
    
    if(isTBOpen()){
        sleep(3000);

        // 打开任务列表
        openTaskList();
        sleep(3000);
        
        // 签到
        missionClick("签到");
        sleep(3000);

        // T金币兑换
        missionClick("去兑换");
        sleep(3000);

        // 浏览
        mission15s("去浏览");
        sleep(3000);

        // 有其他任务字样可按上面的格式自行添加

        toast("任务完成，脚本结束.");

    } else {
        toast("脚本结束");
    }
}

/**
 * @description 打开TB
 */
function openTB(){
    app.startActivity({
        packageName : "com.taobao.taobao",
        className : "com.taobao.browser.BrowserActivity",
        data : "http://pages.tmall.com/wow/z/hdwk/n-hdwk-solution/2020618-single?spm=a211oj.14555662/e0b1.6009912280.d_primarybtn_1&disableNav=YES&disableProgress=YES&hd_from=mallres"
    })
}

/**
 * @description 判断TB是否打开
 * @author Chou
 */
function isTBOpen(){
    toast("7秒后检测当前运行应用");
    sleep(7000);
    toast("当前运行软件" + currentActivity() );
    if(currentActivity() == "com.taobao.browser.BrowserActivity"){
        toast("成功进入活动页")
        return true;
    } else {
        toast("打开TB失败");
        return false;
    }
}

/**
 * @description 打开喵币任务列表
 * @author Chou
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
 * @author Chou
 */
function missionClick(keyword){
    toast("开始" + keyword + "任务");
    if(text(keyword).exists()){
        text(keyword).findOne().click();
        toast("完成" + keyword + "任务");
    } else {
        toast( keyword + "任务已完成或失败");
    }
}

/**
 * @description 等待15秒完成的任务 
 * @param {*} keyword 
 * @author Chou
 */
function mission15s(keyword){
    // 完成的任务数
    var successed = 1;
    
    while(textContains(keyword).exists() ){
        toast("开始第" + successed  + "个" + keyword + "任务");
        textContains(keyword).findOne().click();
        sleep(4000);
        toast("模拟滑动");
        swipe(width / 2 , height - 600 , width / 2,0,7000); 
        sleep(16000);
        toast("完成第" + successed  + "个" + keyword + "任务");
        successed++;
        back();
        sleep(3000);
    }

    if(successed == 1){
        toast(keyword + "任务已完成或失败");
    } else {
        toast("完成" + keyword + "任务");
    }
}