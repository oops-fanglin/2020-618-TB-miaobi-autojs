// 直到检查该应用开启无障碍后才执行其后面的代码
auto.waitFor();
app.startActivity({
        packageName : "com.taobao.taobao",
        className : "com.taobao.browser.BrowserActivity",
        data : "http://pages.tmall.com/wow/z/hdwk/n-hdwk-solution/2020618-single?spm=a211oj.14555662/e0b1.6009912280.d_primarybtn_1&disableNav=YES&disableProgress=YES&hd_from=mallres"
})
main();

/**
 * 主要代码
 */
function main(){
    if(openTB()){
        sleep(4000);
        //打开活动首页
        toast("打开淘宝成功，进入活动页");

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
 * @author Chou
 */
function openTB(){
    toast("打开TB中...，7秒后检测当前运行应用");
    sleep(7000);
toast(currentActivity() );
    if(currentActivity() == "com.taobao.browser.BrowserActivity"||
    currentActivity() == "com.taobao.tao.TBMainActivity"){
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
    if(textContains(keyword).exists()){
        textContains(keyword).findOne().click();
        toast("完成" + keyword + "任务");
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
    // 循环数
    var tryCount = 5;
    /**
     * 循环防止漏掉
     */
    while(tryCount > 0){
        while(textContains(keyword).exists() ){
            toast("开始第" + successed  + "个" + keyword + "任务");
            sleep(2000);
            textContains(keyword).findOne().click();
            sleep(4000);
            swipe(width / 2 , height - 600 , width / 2,0,7000); 
            sleep(18000);
            toast("完成第" + successed  + "个" + keyword + "任务");
            successed++;
            back();
            sleep(3000);
        }
        tryCount--;
    }
}