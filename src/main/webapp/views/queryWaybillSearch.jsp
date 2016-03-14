<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
  <meta charset="UTF-8">
  <title>运单查询</title>
  <script type="text/javascript" src="../js/jquery-1.11.3.js"></script>
  <script type="text/javascript" src="../js/queryWaybillSearch.js"></script>
  <link rel="stylesheet" type="text/css" href="../css/queryWaybillSearch.css">
  <link rel="stylesheet" type="text/css" href="../css/head_code.css">
  <link rel="stylesheet" type="text/css" href="../css/foot.css">
</head>
<body>
<jsp:include page="head_code.jsp"/>
<div class="qwbs">
  <input type="hidden" class="pageNo" value="">
  <div class="qwbs_title">
    <p>当前位置：</p>
    <p>运单查询</p>
  </div>
  <div class="qwbs_body">
    <div class="qwbs_top">
      <form id="qwbs_top_form">
        <div class="qwbs_top_logistics_id">
          <label>运单号</label>
          <input type="text" class="top_logistics_id" value="">
        </div>
        <div class="qwbs_top_logistics_company">
          <label>承运公司</label>
          <input type="text" class="top_logistics_company" value="">
        </div>
        <div class="qwbs_top_contract_id">
          <label>订单号/合同号</label>
          <input type="text" class="top_contract_id" value="">
        </div>
        <div class="qwbs_top_logistics_stats">
          <label>物流状态</label>
          <select  class="top_logistics_stats">
            <option value="未发货">未发货</option>
            <option value="已发货">已发货</option>
            <option value="物流运输中">物流运输中</option>
            <option value="已收货">已收货</option>
          </select>
        </div>
        <div class="qwbs_top_car_license">
          <label>车号</label>
          <input type="text" class="top_car_license" value="">
        </div>
        <div class="qwbs_top_good_num">
          <label>车号</label>
          <input type="text" class="top_good_num" value="">
        </div>
        <div class="qwbs_top_click">
          <a type="reset" id="reset_submit" onclick="resetSubmit()">清除</a>
          <a type="button" id="form_button" onclick="formButton()">查询</a>
        </div>
      </form>
    </div>
    <div class="qwbs_bottom">
      <table class="qwbs_bottom_table">
        <thead class="qwbs_bottom_thead">
        <tr>
          <td width="73"></td>
          <td width="73">运单号</td>
          <td>承运公司</td>
          <td>订单号/合同号</td>
          <td>车号</td>
          <td>货号</td>
          <td>发货地址</td>
          <td>发货人</td>
          <td>发货时间</td>
          <td>到货地址</td>
          <td>预计到货时间</td>
          <td>发货清单</td>
          <td>物流状态</td>
        </tr>
        </thead>
        <tbody class="qwbs_bottom_tbody"></tbody>
      </table>
    </div>
    <div class="listperAuth_button">

    </div>
  </div>
</div>
<jsp:include page="foot.jsp"/>
</body>
</html>
