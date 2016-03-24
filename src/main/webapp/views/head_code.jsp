<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<jsp:include page="resource.jsp"/>
<link rel="stylesheet" type="text/css" href="${ctx}/css/head_code.css">
<div class="head">
    <div class="head_title">
        <div class="head_show">
            <div class="head_left">
                <p>欢迎来到某某有限公司</p>
                <p>客服热线-400-698000</p>
            </div>
            <div class="head_right">
                <img src="${ctx}/images/head_1.png">
                <a>登陆</a>|
                <a>注册</a>|
                <a>我的关注</a>|
                <a>供应商服务<img src="${ctx}/images/head_2.png"></a>|
                <a>网站导航<img src="${ctx}/images/head_2.png"></a>
            </div>
        </div>
    </div>

    <div class="head_logo_nav">
        <div class="head_nav">
            <div class="logo">
                <div class="logo_img">
                    <img src="${ctx}/images/head_3.png">
                </div>
            </div>
            <div class="nav">
                <ul>
                    <li><a href="${ctx}/code/queryCodeSearch" target="_self" class="product_identify colorClick">产品标识代码查询</a></li>
                    <li><a href="${ctx}/contract/queryContractSearch" target="_self" class="contract colorNoClick">合同/订单查询</a></li>
                    <li><a href="${ctx}/serial/querySerialNumSearch" target="_self" class="serialNumber colorNoClick">序列号查询</a></li>
                    <li><a href="${ctx}/waybill/queryWaybillSearch" target="_self" class="waybill colorNoClick">运单查询</a></li>
                </ul>
            </div>
        </div>
    </div>
</div>