<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
  <title>订单号--信息</title>
  <script type="text/javascript" src="../js/jquery-1.11.3.js"></script>
  <script type="text/javascript" src="../js/queryContractInformation.js"></script>
  <link rel="stylesheet" type="text/css" href="../css/queryContractInformation.css">
  <link rel="stylesheet" type="text/css" href="../css/head_code.css">
  <link rel="stylesheet" type="text/css" href="../css/foot.css">
</head>
<body>
<% String contract_id=request.getParameter("contract_id");%>
<jsp:include page="head_code.jsp"/>
<div class="qcti">
  <input type="hidden" class="pageNo" value="">
  <input type="hidden" class="contract_id" value="<%=contract_id%>">
  <div class="qcti_title">
    <p>当前位置：</p>
    <p>订单/合同详细信息</p>
  </div>
  <div class="qcti_body">
    <div class="qcti_body_basicInformation">
      <div class="qcti_body_basicInformation_title">
        <p>基本信息</p>
        <span>填写准确、完整信息</span>
      </div>
      <div class="qcti_body_basicInformation_content">
        <div class="basicInformation_content_company_name">
          <label>企业名称</label>
          <input type="text" class="content_company_name" value="">
          <a href="#" class="content_company_name_search">企业查询</a>
        </div>
        <div class="basicInformation_content_contract_id">
          <label>订单号/合同号</label>
          <input type="text" class="content_contract_id" value="">
        </div>
        <div class="basicInformation_content_purchasing_company">
          <label>采购单位</label>
          <input type="text" class="content_purchasing_company" value="">
        </div>
      </div>
      <div class="qcti_contractCreat_orderDetails">
        <div class="qcti_contractCreat_orderDetails_title">
          <p>订货明细表</p>
        </div>
        <div class="qcti_contractCreat_orderDetails_content">
          <table class="qcti_orderDetails_table">
            <thead class="qcti_orderDetails_thead">
            <tr>
              <td>物资编号</td>
              <td>物资名称</td>
              <td>规格型号</td>
              <td>计量单位</td>
              <td>供货数量</td>
              <td>单价（元）</td>
              <td>总价（元）</td>
              <td width="200">生产厂家</td>
            </tr>
            </thead>
            <tbody class="qcti_orderDetails_tbody">

            </tbody>
          </table>

        </div>
        <div class="qcti_contractCreat_supplyPlan">
          <div class="qcti_contractCreat_supplyPlan_title">
            <p>供货计划</p>
          </div>
          <div class="qcti_contractCreat_supplyPlan_content">
            <table class="qcti_supplyPlan_table">
              <thead class="qcti_supplyPlan_thead">
              <tr>
                <td>物资编号</td>
                <td>物资名称</td>
                <td>规格型号</td>
                <td>计量单位</td>
                <td>供货数量</td>
                <td>交货时间</td>
                <td>交货地点</td>
                <td>收货人</td>
                <td width="100">操作</td>
              </tr>
              </thead>
              <tbody class="qcti_supplyPlan_tbody"></tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <div class="qcti_body_basicInformation"></div>
  </div>
</div>
<jsp:include page="foot.jsp"/>
</body>
</html>
