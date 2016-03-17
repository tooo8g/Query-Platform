<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html>
<head>
    <title>产品标识代码查询</title>
    <script type="text/javascript" src="../js/jquery-1.11.3.js"></script>
    <script type="text/javascript" src="../js/queryCodeSearch.js"></script>
    <link rel="stylesheet" type="text/css" href="../css/queryCodeSearch.css">
    <link rel="stylesheet" type="text/css" href="../css/head_code.css">
    <link rel="stylesheet" type="text/css" href="../css/foot.css">
</head>
<body>
<jsp:include page="head_code.jsp"/>
  <input type="hidden" class="pageNo" value="">
<div class="cq">
    <div class="cq_top">
        <form id="cqForm">
            <div class="cq_top_enterpriseName">
                <label>企业名称</label>
                <input type="text" name="cqt_enterpriseName" class="cqt_enterpriseName" value="">
            </div>
            <div class="cq_top_productCode">
                <label>产品标识代码</label>
                <input type="text" name="cqt_productCode" class="cqt_productCode" value="">
            </div>
            <div class="cq_top_productName">
                <label>产品名称</label>
                <input type="text" name="cqt_productName" class="cqt_productName" value="">
            </div>
            <div class="cq_top_specifications">
                <label>规格型号</label>
                <input type="text" name="cqt_specifications" class="cqt_specifications" value="">
            </div>
            <div class="cq_top_click">
                <a type="reset" id="reset_submit" onclick="resetSubmit()">清除</a>
                <a type="button" id="form_button" onclick="formButton()">查询</a>
            </div>
        </form>
    </div>
    <div class="cq_bottom">
        <table class="cq_table">
            <thead class="cq_thead">
            <td width="73"></td>
            <td width="200">企业名称</td>
            <td>产品标识代码</td>
            <td>产品名称</td>
            <td>规格型号</td>
            <td>计量单位</td>
            <td>物资编码</td>
            <td width="200">所属路局/所属采购单位</td>
            <td width="200">操作</td>
            </thead>
            <tbody class="cq_tbody">

            </tbody>
        </table>
    </div>
    <div class="listperAuth_button">

    </div>
</div>
<jsp:include page="foot.jsp"/>
</body>
</html>
