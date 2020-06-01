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
    toast("打开任务列表中")
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
        sml_move(402, 1433, 587, 768, 1687);
        sleep(22000);
        if(textContains("返回618列车").exists()){
            textContains("返回618列车").findOne().click();
            ++successed;
            toast("完成第" + successed  + "个" + keyword + "任务");
            sleep(2000);
        } else if(desc("任务完成").exists() || textContains("任务完成").exists() || textContains("任务已完成").exists()){
            ++successed;
            toast("完成第" + successed  + "个" + keyword + "任务");
            back();back();
            sleep(2000);
        } else if(desc("领取失败").exists() || textContains("领取失败").exists()){
            ++failed;
            toast("失败了" + failed + "个任务");
            back();back();
            sleep(2000);
        }
    }
}

function bezier_curves(cp, t) {
    cx = 3.0 * (cp[1].x - cp[0].x);
    bx = 3.0 * (cp[2].x - cp[1].x) - cx;
    ax = cp[3].x - cp[0].x - cx - bx;
    cy = 3.0 * (cp[1].y - cp[0].y);
    by = 3.0 * (cp[2].y - cp[1].y) - cy;
    ay = cp[3].y - cp[0].y - cy - by;

    tSquared = t * t;
    tCubed = tSquared * t;
    result = {
        "x": 0,
        "y": 0
    };
    result.x = (ax * tCubed) + (bx * tSquared) + (cx * t) + cp[0].x;
    result.y = (ay * tCubed) + (by * tSquared) + (cy * t) + cp[0].y;
    return result;
}

//仿真随机带曲线滑动  
//qx, qy, zx, zy, time 代表起点x,起点y,终点x,终点y,过程耗时单位毫秒
function sml_move(qx, qy, zx, zy, time) {
    var xxy = [time];
    var point = [];
    var dx0 = {
        "x": qx,
        "y": qy
    };

    var dx1 = {
        "x": random(qx - 100, qx + 100),
        "y": random(qy, qy + 50)
    };
    var dx2 = {
        "x": random(zx - 100, zx + 100),
        "y": random(zy, zy + 50),
    };
    var dx3 = {
        "x": zx,
        "y": zy
    };
    for (var i = 0; i < 4; i++) {

        eval("point.push(dx" + i + ")");

    };
    log(point[3].x)

    for (let i = 0; i < 1; i += 0.08) {
        xxyy = [parseInt(bezier_curves(point, i).x), parseInt(bezier_curves(point, i).y)]

        xxy.push(xxyy);

    }

    log(xxy);
    gesture.apply(null, xxy);
}