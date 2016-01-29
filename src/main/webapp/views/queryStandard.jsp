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
    <input type="hidden" class="pageNo" value="">
    <div class="sts">
        <div class="sts_title">
            <p>当前位置：</p>
            <p>技术标准查询>></p>
            <p>标准类型查询</p>
        </div>
        <div class="sts_left">
            <p>目录</p>
            <ul>
                <li >国家标准</li>
                <li id="standType" class="colorHui">行业标准</li>
                <div id="sts_standType" class="displayNone">
                    <a class="colorHui">铁路行业标准</a>
                    <a class="colorHui">电力行业标准</a>
                    <a class="colorHui">冶金行业标准</a>
                </div>
                <li>标准型技术文件</li>
                <li>铁道计量检定规程</li>
            </ul>
        </div>
        <div class="sts_right">
            <div class="sts_right_top">
                <form id="searchForm">
                    <div class="sts_search_formList">
                        <div class="sts_search_l">
                            <div>
                                <span>标准编号</span>
                                <input type="text" name="standard_id" class="standard_id" value="">
                            </div>
                            <div>
                                <span>文件状态</span>
                                <select class="standard_status">
                                    <option value="现行" selected>现行</option>
                                    <option value="作废">作废</option>
                                </select>
                            </div>
                        </div>
                        <div class="sts_search_r">
                            <div>
                                <span>标准名称</span>
                                <input type="text" name="standard_name" class="standard_name" value="">
                            </div>
                            <div>
                                <span>专业分类</span>
                                <select class="special_subject">
                                    <option selected value="">全部</option>
                                    <option value="基础与综合">基础与综合</option>
                                    <option value="工务工程">工务工程</option>
                                    <option value="机车车辆综合">机车车辆综合</option>
                                    <option value="牵引供电">牵引供电</option>
                                    <option value="铁道机车">铁道机车</option>
                                    <option value="铁道车辆">铁道车辆</option>
                                    <option value="铁路通信">铁路通信</option>
                                    <option value="铁路信号">铁路信号</option>
                                    <option value="铁路运输">铁路运输</option>
                                    <option value="通信信号综合">通信信号综合</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="sts_search_sub">
                       <input type="button"  value="查询" id="form_button" onclick="formButton()">
                       <input type="reset"  value="清除" id="reset_submit">
                    </div>
                </form>
            </div>
            <div class="sts_right_bottom">
                <div class="sts_table_title">
                    找到100条记录
                </div>
                <div class="sts_table">
                    <table class="sts_search_table">
                        <thead class="sts_search_thead">
                        <tr>
                            <td width="50"></td>
                            <td width="120">标准编号</td>
                            <td width="280">标准名称</td>
                            <td>代替标准号</td>
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
</body>
</html>