<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html>
<head>
    <jsp:include page="resource.jsp"/>
    <title>市场价格查询</title>
    <script type="text/javascript" src="${ctx}/js/jquery-1.11.3.js"></script>
    <script type="text/javascript" src="${ctx}/js/queryPrice.js"></script>
    <script type="text/javascript" src="${ctx}/js/scrollJs.js"></script>
    <script type="text/javascript" src="${ctx}/js/WdatePicker.js"></script>
    <script type="text/javascript" src="${ctx}/js/chart/fusioncharts.js"></script>
    <script type="text/javascript" src="${ctx}/js/chart/fusioncharts.charts.js"></script>
    <script type="text/javascript" src="${ctx}/js/chart/fusioncharts-jquery-plugin.js"></script>
    <link rel="stylesheet" type="text/css" href="${ctx}/css/queryPrice.css">
</head>
<body>
<jsp:include page="head.jsp"/>
<div class="jq_message_content">
    <input type="hidden" class="pageNo" value="">
    <div class="jq_message_title">
        <p>当前位置：</p>
        <p>市场价格查询>></p>
        <a></a>
    </div>
    <div class="jq_message_left">
        <div class="list_tittle">
            <div class="title_p">物资类别</div>
        </div>
        <div class="jq_message_left_ul">
           <ul class="list_content">

           </ul> 
        </div>
        <div class="itemShow displayNo" id="itemShow">
            <div class="itemShowList showItem" class_num="0" id="showItem0">
                <div class="mulluShowSh" name="mulluShowSh"></div>
                <div id="scrollShow" class="scrollShow">
                    <div id="scrollSh" class="scrollSh"></div>
                </div>
            </div>
        </div>
    </div>
    <div class="jq_message_right">
        <div class="price_select_top">
            <form id="priceForm">
                <div class="price_select_formlist">
                    <div class="priceDate">
                        <label>
                            价格日期：
                        </label>
                        <input id="startDate1" name="price_Data" class="price_Data" type="text" onFocus="var endDate=$dp.$('endDate2');WdatePicker({dateFmt:'yyyy-MM-dd',alwaysUseStartDate:true})" value=""/>

                    </div>
                    <div class="specificationModel">
                        <label>
                            规格型号：
                        </label>
                        <input type="text" class="specification" name="guige_num" value="">
                    </div>
                    <div class="materialName">
                        <label>
                            物资名称：
                        </label>
                        <input type="text" class="wuziName" name="wuzi_name" value="">
                    </div>
                    <div class="region">
                        <label>
                            地区：
                        </label>
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
                    <div class="city">
                        <label>
                            城市：
                        </label>
                        <select class="regionSelect_city" name="city">

                        </select>
                    </div>
                    <a type="reset" id="reset_submit" onclick="resetSubmit()">清除</a>
                    <a type="button"  id="form_button" onclick="formButton()">查询</a>
                </div>
            </form>
        </div>
        <div class="price_select_bottom">
            <table class="price_select_list">
                <thead class="price_select_thead">
                <tr>
                    <td width="50"></td>
                    <td>物资名称</td>
                    <td width="90">规格(mm)</td>
                    <td>材质</td>
                    <td>钢厂/产地</td>
                    <td>地区</td>
                    <td>城市</td>
                    <td>价格日期</td>
                    <td>价格(元/吨)</td>
                    <td>计价方式</td>
                    <td width="50">涨跌</td>
                    <td>历史价</td>
                    <td>备注</td>
                </tr>
                </thead>
                <tbody class="jg_tbody">

                </tbody>
            </table>
        </div>
        <%--<div class="listperAuth">--%>
            <div class="listperAuth_button">

            </div>
        <%--</div>--%>

    </div>
</div>
<div class="priceInformation displayNo" id="priceInformation">
    <input class="saveId" type="hidden" value="">
    <div class="showHisPrice">
        <div class="hisPrice">
            <div class="hisPrice_infor_title">
                <p>历史价</p>
                <a class="hisPrice_title" onclick="closeDetails()"><img src="${ctx}/images/as_1.png" ></a>
            </div>
            <div class="hisPrice_left">
                <div class="left_title">
                    <ul>
                        <li>
                            <p>品名:</p>
                            <span class="productName"></span>
                        </li>
                        <li>
                            <p>规格:</p>
                            <span class="specification1"></span>
                        </li>
                        <li>
                            <p>材质:</p>
                            <span class="texture"></span>
                        </li>
                    </ul>
                </div>
                <div class="left_slelect">
                    <div class="left_slelect_content">
                        <label>厂家</label>
                        <select class="factoryAddress">
                            <option value="">厂家</option>
                        </select>
                        <label>地区</label>
                        <select id="qp_region"  class="qp_region" onchange="regionClick('qp_region)">
                            <option value="">全部</option>
                            <option value="华北区">华北区</option>
                            <option value="东北区">东北区</option>
                            <option value="华东区">华东区</option>
                            <option value="华中区">华中区</option>
                            <option value="华南区">华南区</option>
                            <option value="西北区">西北区</option>
                            <option value="西南区">西南区</option>
                        </select>
                        <label>城市</label>
                        <select class="qp_region_city">
                            <option value="">城市</option>
                        </select>
                    </div>
                </div>
                <div class="left_button">
                    <a onclick="selectData()">查询</a>
                </div>
            </div>
            <div class="hisPrice_right">
                <div class="hisPrice_right_top">
                    <div class="hisPrice_right_top_left">
                        <label>标准：</label>
                        <label>对照：</label>
                    </div>
                    <div class="hisPrice_right_top_right">
                        <table class="hisPrice_sc_table">
                            <thead class="hisPrice_sc_thead">
                            <tr>
                                <td>品名</td>
                                <td>规格</td>
                                <td>材质</td>
                                <td>厂家</td>
                                <td>地区</td>
                                <td>城市</td>
                            </tr>
                            </thead>
                            <tbody class="hisPrice_sc_tbody">
                            <tr class="hisPrice_standard">
                            </tr>
                            <tr class="hisPrice_contrast">
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            </tbody>
                        </table>
                    </div>

                </div>
                <div class="hisPrice_right_bottom">
                    <div class="hisPrice_rbt">
                        <a class="histyData colorBlu" onclick="SelectHistyData()">历史数据列表</a>
                        <a class="hisIndex" onclick="SelectIndex()">指数</a>
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
            <div class="jq_button_div_close">
                <div class="jq_button_div">
                    <a type="button" class="jq_button" onclick="closeDetails()">关闭</a>
                </div>
            </div>

        </div>
    </div>
</div>
<jsp:include page="foot.jsp"/>
</body>
</html>
