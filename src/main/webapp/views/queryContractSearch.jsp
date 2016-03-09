<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>订单号—查询</title>
    <script type="text/javascript" src="../js/jquery-1.11.3.js"></script>
    <script type="text/javascript" src="../js/queryContractSearch.js"></script>
    <link rel="stylesheet" type="text/css" href="../css/queryContractSearch.css">
    <link rel="stylesheet" type="text/css" href="../css/head_code.css">
    <link rel="stylesheet" type="text/css" href="../css/foot.css">
</head>
<body>
<jsp:include page="head_code.jsp"/>
<div class="conser">
  <div class="conser_top">
    <form id="conser_top_form">
      <div class="conser_top_contract">
        <label>订单号/合同号</label>
        <input type="text"  class="top_contract" value="">
      </div>
      <div class="conser_top_purchasing_company">
        <label>采购单位</label>
        <input type="text"  class="top_purchasing_company" value="">
      </div>
      <div class="conser_top_company_name">
        <label>供应商</label>
        <input type="text"  class="top_company_name" value="">
      </div>
      <div class="conser_top_click">
        <a type="reset" id="reset_submit" onclick="resetSubmit()">清除</a>
        <a type="button" id="form_button" onclick="formButton()">查询</a>
      </div>
    </form>
  </div>
  <div class="conser_bottom">
    <table class="conser_bottom_table">
      <thead class="conser_bottom_thead">
      <tr>
        <td width="73"></td>
        <td>订单号/合同号</td>
        <td width="200">企业名称</td>
        <td>采购单位</td>
        <td>订单/合同详细信息</td>
        <td>编制人员</td>
        <td>编制时间</td>
      </tr>
      </thead>
      <tbody class="conser_bottom_tbody">

      </tbody>
    </table>
  </div>
  <div class="listperAuth_button">

  </div>
</div>
<jsp:include page="foot.jsp"/>
</body>
</html>
