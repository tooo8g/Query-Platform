<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html>
<head>
  <jsp:include page="resource.jsp"/>
  <title>序列号查询</title>
  <script type="text/javascript" src="${ctx}/js/jquery-1.11.3.js"></script>
  <script type="text/javascript" src="${ctx}/js/querySerialNumSearch.js"></script>
  <script type="text/javascript" src="${ctx}/js/transTime.js"></script>
  <script type="text/javascript" src="${ctx}/js/WdatePicker.js"></script>
  <link rel="stylesheet" type="text/css" href="${ctx}/css/querySerialNumSearch.css">
  <link rel="stylesheet" type="text/css" href="${ctx}/css/head_code.css">
  <link rel="stylesheet" type="text/css" href="${ctx}/css/foot.css">
</head>
<body>
<jsp:include page="head_code.jsp"/>
<div class="qsns">
  <input type="hidden" class="pageNo" value="">
  <div class="qsns_top">
    <form id="qsnsForm">
      <div class="qsns_top_contract_id">
        <label>订单号/合同号</label>
        <input type="text" class="top_contract_id" value="">
      </div>
      <div class="qsns_top_state">
        <label>序列号状态</label>
        <input type="text" class="top_state" value="">
      </div>
      <div class="qsns_top_program_time">
        <label>编制日期</label>
        <input type="text" name="top_program_time" class="top_program_time" type="text" onFocus="var endDate=$dp.$('endDate2');WdatePicker({dateFmt:'yyyy-MM-dd',alwaysUseStartDate:true})" value=""/>
      </div>
      <div class="qsns_top_purchasing_company">
        <label>采购单位</label>
        <input type="text" class="top_purchasing_company" value="">
      </div>
      <div class="qsns_top_company_name">
        <label>企业名称</label>
        <input type="text" class="top_company_name" value="">
      </div>
      <div class="qsns_top_click">
        <a type="reset" id="reset_submit" onclick="resetSubmit()">清除</a>
        <a type="button" id="form_button" onclick="formButton()">查询</a>
      </div>
    </form>
  </div>
  <div class="qsns_bottom">
    <table class="qsns_bottom_table">
      <thead class="qsns_bottom_thead">
      <tr>
        <td width="73">序号</td>
        <td>序列号</td>
        <td>编制日期</td>
        <td>采购单位</td>
        <td>订单号/合同号</td>
        <td>企业名称</td>
        <td>物资编码</td>
        <td>产品标识代码</td>
        <td>产品名称</td>
        <td>规格型号</td>
        <td>序列号状态</td>
      </tr>
      </thead>
      <tbody class="qsns_bottom_tbody"></tbody>
    </table>
  </div>
  <div class="listperAuth_button">

  </div>
  <div class="qsns_create_barCode_qrCode">
    <a href="javascript:;" class="create_barCode" onclick="create_barCode()">生成条形码</a>
    <a href="javascript:;" class="create_qrCode" onclick="create_qrCode()">生成二维码</a>
  </div>
</div>
<jsp:include page="foot.jsp"/>
</body>
</html>
