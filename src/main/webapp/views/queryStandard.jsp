<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title>标准类型查询</title>
    <script type="text/javascript" src="../js/jquery-1.11.3.js"></script>
    <script type="text/javascript" src="../js/jquery-form.js"></script>
    <script type="text/javascript" src="../js/queryStandard.js"></script>
    <link rel="stylesheet" type="text/css" href="../css/queryStandard.css">
</head>
<body>
<div class="head">
    <div class="head_show">
        <div class="head_left">
            <p>欢迎来到某某有限公司</p>
            <p>客服热线-400-698000</p>
        </div>
        <div class="head_right">
            <img src="../images/sts_1.png">
            <a>登陆</a>|
            <a>注册</a>|
            <a>我的关注</a>|
            <a>供应商服务<img src="../images/sts_2.png"></a>|
            <a>网站导航<img src="../images/sts_2.png"></a>
        </div>
    </div>
</div>
<div class="logo">
    <div class="logo_img">
        <img src="../images/sts_3.png">
    </div>
</div>
<input type="hidden" class="pageNo" value="">
<div class="sts">
    <div class="sts_title">
        <p>当前位置：</p>
        <p>技术标准查询>></p>
        <p>标准类型查询</p>
    </div>
    <div class="sts_left">
        <p>标准类型</p>
        <div class="stsLeft_ul">
            <ul>
                <li id="sstandCountryType">国家标准</li>
                <li id="standType">行业标准</li>
                <div id="sts_standType">
                    <a class="colorHui">铁路行业标准</a>
                    <a class="colorHui">电力行业标准</a>
                    <a class="colorHui">冶金行业标准</a>
                </div>
                <li id="standWen">标准型技术文件</li>
                <li id="standGUicheng">铁道计量检定规程</li>
            </ul>
        </div>
    </div>
    <div class="sts_right">
        <div class="sts_right_top">
            <form id="searchForm">
                <div class="sts_search_number">
                    <label>编号名称</label>
                    <input type="text" name="search_number" class="search_number"  value="标准编号/标准名称" onfocus="if (value =='标准编号/标准名称'){value =''}" onblur="if (value ==''){value='标准编号/标准名称'}" >
                    <a class="buttonForm" onclick="formButton()">查询</a>
                </div>
                <div class="fileStatus">
                    <label>文件状态</label>
                    <div class="fileStatus_a">
                        <a class="colorWhite">不限</a>
                        <a class="colorBule">有效</a>
                        <a class="colorBule">作废</a>
                    </div>
                </div>
                <div class="proClss">
                    <label>专业分类</label>
                    <div class="proClss_a">
                        <a class="colorWhite">不限</a>
                        <a class="colorBule">公务</a>
                        <a class="colorBule">牵引供电</a>
                        <a class="colorBule">通信信号</a>
                        <a class="colorBule">机车车辆</a>
                        <a class="colorBule">基础与综合</a>
                        <a class="colorBule">运输</a>
                        <a class="colorBule">其他</a>
                    </div>
                </div>
            </form>
        </div>
        <div class="sts_right_bottom">
            <!--<div class="sts_table_title">-->
            <!--找到100条记录-->
            <!--</div>-->
            <div class="sts_table">
                <table class="sts_search_table">
                    <thead class="sts_search_thead">
                    <tr>
                        <td width="120">标准编号</td>
                        <td width="250">标准名称</td>
                        <td width="120">代替标准号</td>
                        <td>标准类别</td>
                        <td>专业分类</td>
                        <td>标准状态</td>
                        <td>发布日期</td>
                        <td>实施日期</td>
                    </tr>
                    </thead>
                    <tbody class="sts_search_tbody">

                    </tbody>
                </table>
            </div>
        </div>
        <div class="listperAuth_button">

        </div>
    </div>
</div>
<div class="foot">
    <div class="foot1">
        <a href="javaScript:;">广告服务</a>|
        <a href="javaScript:;">联系我们</a>|
        <a href="javaScript:;">合作伙伴</a>|
        <a href="javaScript:;">法律声明</a>|
        <a href="javaScript:;">关于我们</a>
    </div>
    <div class="foot2">
        <p>**有限公司版权所有 京ICP备14004333号</p>
    </div>
    <div class="foot3">
        <div class="foot3_p">
            <p>请使用IE9以上版本浏览页面</p>
        </div>
    </div>
</div>
</body>
</html>