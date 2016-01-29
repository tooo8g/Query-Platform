<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>市场价格查询</title>
    <script type="text/javascript" src="../js/jquery-1.11.3.js"></script>
    <script type="text/javascript" src="../js/queryPrice.js"></script>
    <script type="text/javascript" src="../js/WdatePicker.js"></script>
    <script type="text/javascript" src="../js/chart/fusioncharts.js"></script>
    <script type="text/javascript" src="../js/chart/fusioncharts.charts.js"></script>
    <script type="text/javascript" src="../js/chart/fusioncharts-jquery-plugin.js"></script>
    <link rel="stylesheet" type="text/css" href="../css/queryPrice.css">
</head>
<body>
<div class="jq_message_content">
    <input type="hidden" class="pageNo" value="">
    <div class="jq_message_title">
        <p>当前位置：</p>
        <p>资质信息查询>></p>
        <p>目录查询</p>
        <a></a>
    </div>
    <div class="jq_message_left">
        <div class="list_tittle">
            物资类别
        </div>
        <ul class="list_content">

        </ul>
        <div class="itemShow displayNo">
            <p id="itemShow_title"><img src="../images/closehuifu.png" onclick="closeItemShow()"></p>
            <div class="itemShowList showItem" class_num="0"></div>
        </div>
    </div>
    <div class="jq_message_right">
        <div class="price_select_top">
            <form>
                <div class="price_select_formlist">
                    <div class="price_select_l">
                        <div>
								<span>
								价格日期：
								</span>
                            <input id="startDate1" name="price_Data" class="price_Data" type="text" onFocus="var endDate=$dp.$('endDate2');WdatePicker({dateFmt:'yyyy-MM-dd',alwaysUseStartDate:true})" value=""/>

                        </div>
                        <div>
								<span>
								地区：
								</span>
                            <select class="regionSelect" onchange="regionClick('regionSelect')">
                                <option selected value="全部">全部</option>
                                <option value="华北区">华北区</option>
                                <option value="东北区">东北区</option>
                                <option value="华东区">华东区</option>
                                <option value="华中区">华中区</option>
                                <option value="华南区">华南区</option>
                                <option value="西北区">西北区</option>
                                <option value="西南区">西南区</option>
                            </select>
                        </div>
                        <div>
								<span>
								物资名称：
								</span>
                            <input type="text" class="wuziName" name="wuzi_name" value="">
                        </div>

                    </div>
                    <div class="price_select_r">
                        <div>
								<span>
								规格型号：
								</span>
                            <input type="text" class="specification" name="guige_num" value="">
                        </div>
                        <div>
								<span>
								城市：
								</span>
                            <select class="regionSelect_city" name="city">

                            </select>
                        </div>
                    </div>
                </div>
                <div class="price_select_sub">
                    <input type="button"  value="查询" id="form_button" onclick="formButton()">
                    <input type="reset"  value="清除" id="reset_submit" onclick="resetSubmit()">
                </div>
            </form>
        </div>
        <div class="price_select_bottom">
            <table class="price_select_list">
                <thead>
                <tr class="title">
                    <td width="50"></td>
                    <td>物资名称</td>
                    <td>规格(mm)</td>
                    <td>材质</td>
                    <td>钢厂/产地</td>
                    <td>地区</td>
                    <td>城市</td>
                    <td>价格日期</td>
                    <td>价格(元/吨)</td>
                    <td>计价方式</td>
                    <td>涨跌</td>
                    <td>历史价</td>
                    <td>备注</td>
                </tr>
                </thead>
                <tbody class="jg_tbody">

                </tbody>
            </table>
        </div>
        <div class="listperAuth">
            <div class="listperAuth_button">

            </div>
        </div>

    </div>
</div>
<div class="priceInformation displayNo">
    <input class="saveId" type="hidden" value="">
    <div class="showHisPrice">
        <div class="hisPrice">
            <p class="hisPrice_title"><img src="../images/closehuifu.png" onclick="closeDetails()"></p>
            <div class="hisPrice_left">
                <div class="left_title">
                    <p>品名</p>
                    <p>规格</p>
                    <p>材质</p>
                    <p class="productName"></p>
                    <p class="specification1"></p>
                    <p class="texture"></p>
                </div>
                <div class="left_slelect">
                    <div class="left_slelect_title">
                        对照查询：
                    </div>
                    <div class="left_slelect_content">
                        <label>厂家/厂地：</label>
                        <select class="factoryAddress">
                            <option value=""></option>
                        </select>
                        <label>地区：</label>
                        <select class="region" onchange="regionClick('region')">
                            <option selected value="全部">全部</option>
                            <option value="华北区">华北区</option>
                            <option value="东北区">东北区</option>
                            <option value="华东区">华东区</option>
                            <option value="华中区">华中区</option>
                            <option value="华南区">华南区</option>
                            <option value="西北区">西北区</option>
                            <option value="西南区">西南区</option>
                        </select>
                        <label>城市：</label>
                        <select class="region_city">

                        </select>
                    </div>
                </div>
                <div class="left_button">
                    <a onclick="selectData()">查询</a>
                </div>
            </div>
            <div class="hisPrice_right">
                <div class="hisPrice_right_top">
                    <div class="hisPrice_standard">
                        <label>标准：</label>
                    </div>
                    <div class="hisPrice_contrast">
                        <label>对照：</label>

                    </div>
                </div>
                <div class="hisPrice_right_bottom">
                    <div class="hisPrice_rbt">
                        <a id="histyData" class="histyData colorRed" onclick="SelectHistyData()">历史数据列表</a>
                        <a class="hisIndex colorBlack" onclick="SelectIndex()">指数</a>
                    </div>
                    <div id="hisPrice_rbs" class="hisPrice_rbs displayNo">

                    </div>
                    <div class="hisPrice_rbb displayBlock">
                        <div class="hisPrice_rbb_his">
                            <table class="his_table">
                                <thead class="his_thead">
                                <tr>
                                    <td></td>
                                    <td class="city1"></td>
                                    <td class="city2"></td>
                                </tr>
                                </thead>
                                <tbody class="his_tbody">
                                <tr>
                                    <td>日期</td>
                                    <td>价格</td>
                                    <td>价格</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</body>
</html>
