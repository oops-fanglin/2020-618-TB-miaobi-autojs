// 直到检查该应用开启无障碍后才执行其后面的代码
auto.waitFor();
width=device.width
height=device.height

toast("按音量上键停止脚本，停止会有提示")
sleep(3000);
main();

/**
 * 主代码
 */
function main(){    
    // 打开TB活动页
    openTB();

    // 打开任务列表，并且只有打开才放行下面的代码
    openTaskList();
    
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

}

/**
 * @description 打开TB活动页
 */
function openTB(){
    app.startActivity({
        packageName : "com.taobao.taobao",
        className : "com.taobao.browser.BrowserActivity",
        data : "http://pages.tmall.com/wow/z/hdwk/n-hdwk-solution/2020618-single?spm=a211oj.14555662/e0b1.6009912280.d_primarybtn_1&disableNav=YES&disableProgress=YES&hd_from=mallres"
    })
}

/**
 * @description 打开喵币任务列表，只有打开才结束
 * @author Chou
 */
function openTaskList(){
    while(text("做任务，领喵币").find().empty()) {
        toast("未检测到活动页");
        sleep(3000);
    }
    textContains("领喵币").findOne().click();
    toast("检测到活动页，打开任务列表成功");
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