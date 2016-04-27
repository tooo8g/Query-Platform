<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html>
<head>
  <jsp:include page="resource.jsp"/>
  <meta charset="UTF-8">
  <title>运单查询</title>
  <script type="text/javascript" src="${ctx}/js/jquery-1.11.3.js"></script>
  <script type="text/javascript" src="${ctx}/js/queryWaybillSearch.js"></script>
  <link rel="stylesheet" type="text/css" href="${ctx}/css/queryWaybillSearch.css">
  <link rel="stylesheet" type="text/css" href="${ctx}/css/head_code.css">
  <link rel="stylesheet" type="text/css" href="${ctx}/css/foot.css">
</head>
<body>
<jsp:include page="head_code.jsp"/>
<jsp:include page="loading.jsp"/>
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
          <label>货号</label>
          <input type="text" class="top_good_num" value="">
        </div>
        <div class="qwbs_top_click">
          <a type="reset" id="reset_submit" onclick="resetSubmit()">清除</a>
          <a type="button" id="form_button" onclick="formButton()">查询</a>
          <a class="queryWaybillOz" href="${ctx}/waybill/queryWaybillOz" target="_self">运单编制</a>
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
<div class="sendList displayNo" id="sendList">
  <div class="showSendList">
    <input type="hidden" class="pageNoSend" value="">
    <div class="show_sendList">
      <div class="show_sendList_title">
        <p>运单查询-发货清单</p>
        <a class="sendListe_title" onclick="closeDetails()"><img src="${ctx}/images/qws_1.png" ></a>
      </div>
      <div class="show_sendList_content">
        <table class="show_sendList_table">
          <thead class="show_sendList_thead">
          <tr>
            <td width="73"></td>
            <td>序列号</td>
            <td>产品名称</td>
            <td>规格型号</td>
            <td>计量单位</td>
            <td>产品标识代码</td>
            <td>物资编码</td>
            <td>备注</td>
          </tr>
          </thead>
          <tbody class="show_sendList_tbody"></tbody>
        </table>
      </div>
      <div class="listperAuth_send_button">

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
