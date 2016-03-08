<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>序列号编制--从产品标识</title>
    <script type="text/javascript" src="../js/jquery-1.11.3.js"></script>
    <script type="text/javascript" src="../js/querySerialCreatep.js"></script>
    <script type="text/javascript" src="../js/WdatePicker.js"></script>
    <link rel="stylesheet" type="text/css" href="../css/querySerialCreatep.css">
    <link rel="stylesheet" type="text/css" href="../css/head_code.css">
    <link rel="stylesheet" type="text/css" href="../css/foot.css">
</head>
<body>
 <% String branchId=request.getParameter("branchId");%>
<jsp:include page="head_code.jsp"/>
<div class="qscp">
  <input type="hidden" class="pageNo" value="">
  <input type="hidden" class="branchId" value="<%=branchId%>">
  <div class="qscp_title">
    <p>当前位置：</p>
    <p>资质信息查询</p>
  </div>
  <div class="qscp_body">
    <div class="qscp_body_information">
      <p>产品详情信息</p>
      <div class="qscp_body_product_name">
        <label>产品名称</label>
        <input type="text" class="body_product_name" value="">
      </div>
      <div class="qscp_body_product_identify">
        <label>产品标识代码</label>
        <input type="text" class="body_product_identify" value="">
      </div>
      <div class="qscp_body_material_code">
        <label>物资编码</label>
        <input type="text" class="body_material_code" value="">
      </div>
    </div>
    <div class="qscp_body_createCode">
      <div class="body_createCode_purchasing_company">
        <label>采购单位</label>
        <input type="text" class="createCode_purchasing_company" value="">
      </div>
      <div class="body_createCode_orderno">
        <label>订单号/合同号</label>
        <input type="text" class="createCode_orderno" value="">
        <a href="#" class="contract_id_earch" target="_blank">订单号/合同号查询</a>
        <a href="querySerialNumSearch.jsp" class="serialNumberSearch" target="_blank">以编制序列号查询</a>
      </div>
      <div class="body_createCode_date">
        <label>编制日期</label>
        <input id="startDate1" name="createCode_date" class="createCode_date" type="text" onFocus="var endDate=$dp.$('endDate2');WdatePicker({dateFmt:'yyyy-MM-dd',alwaysUseStartDate:true})" value=""/>
      </div>
      <div class="body_createCode_creatNum">
        <label>生成数量</label>
        <input type="text" class="createCode_creatNum" value="">
      </div>
      <div class="body_createCode_creatCode">
        <a class="createCode_creatCode" onclick="creatCode()">自动创建序列号</a>
      </div>
    </div>
    <div class="qscp_body_codeList_button displayNo">
      <div class="qscp_body_codeList">
        <table class="body_codeList_table">
          <thead class="body_codeList_thead">
          <tr>
            <td width="73">序号</td>
            <td width="200">序列号</td>
            <td>编制日期</td>
            <td>采购单位</td>
            <td>订单号/合同号</td>
            <td>物资编码</td>
            <td>物资名称</td>
            <td>规格型号</td>
            <td>产品标识代码</td>
          </tr>
          </thead>
          <tbody class="body_codeList_tbody"></tbody>
        </table>
      </div>
      <div class="listperAuth_button">

      </div>
      <div class="qscp_body_delete">
        <a href="javascript:;" class="body_generateCode" onclick="generateCode()">生成序列号</a>
        <a href="javascript:;" class="body_empty" onclick="codeEmpty()">清空</a>
      </div>
    </div>

  </div>
</div>
<jsp:include page="foot.jsp"/>
</body>
</html>
