<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<jsp:include page="resource.jsp"/>
<script type="text/javascript" src="${ctx}/js/head_code.js"></script>
<link rel="stylesheet" type="text/css" href="${ctx}/css/head_code.css">
<div class="head">
    <div class="head_title">
        <div class="head_show">
            <div class="head_left">
                <p>欢迎进入铁路产品标识代码管理系统</p>
                <p>客服热线：010-51874060</p>
            </div>
            <div class="head_right">
                <img src="${ctx}/images/head_1.png">
                <span>${account.person.username}</span>
                <a href="${ctx}/code/queryCodeSearch" target="_self">供应商服务</a>
                <c:if test="${account.oper_filed.toString().indexOf('0')!=-1}">
                	|<a href="${ctx}/company/queryCompanyList" target="_self">系统管理</a>
                </c:if>
                |
                <a href="javascript:;" target="_self" onclick="loginOut()">退出</a>
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
                <ul class="codeUl displayNo">
                    <li><a href="${ctx}/code/queryCodeSearch" target="_self" class="product_identify colorClick">产品标识代码查询</a></li>
                    <li><a href="${ctx}/contract/queryContractSearch" target="_self" class="contract colorNoClick">合同/订单查询</a></li>
                    <li><a href="${ctx}/serial/querySerialNumSearch" target="_self" class="serialNumber colorNoClick">序列号查询</a></li>
                    <li><a href="${ctx}/waybill/queryWaybillSearch" target="_self" class="waybill colorNoClick">运单查询</a></li>
                    <li class="seniorSearch"><span  class="seniorSearchSpan colorNoClick">高级查询</span>
                        <ul>
                            <li><a href="${ctx}/cert/queryCert" target="_self" class="queryCert colorNoClick">资质查询</a></li>
                            <li><a href="${ctx}/standard/queryStandard" target="_self" class="queryStandard colorNoClick">标准查询</a></li>
                            <li><a href="${ctx}/price/queryPrice" target="_self" class="queryPrice colorNoClick">价格查询</a></li>
                            <li><a href="${ctx}/purchase/queryPurchaseList" target="_self" class="queryPurchaseList colorNoClick">招标采购</a></li>
                        </ul>
                    </li>
                </ul>
                <ul class="guanliUl displayNo">
                    <li><a href="${ctx}/company/queryCompanyList" target="_self" class="companyList colorClick">供应商管理</a></li>
                    <li><a href="${ctx}/account/queryAccountList" target="_self" class="personList colorNoClick">用户管理</a></li>
                    <li><a href="${ctx}/material/materialManager" target="_self" class="materialManage colorNoClick">物资管理</a></li>
                </ul>
            </div>
        </div>
    </div>
</div>