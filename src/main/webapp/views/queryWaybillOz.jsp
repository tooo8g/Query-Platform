<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html>
<head>
  <title>运单编制</title>
  <script type="text/javascript" src="../js/jquery-1.11.3.js"></script>
  <script type="text/javascript" src="../js/queryWaybillOz.js"></script>
  <link rel="stylesheet" type="text/css" href="../css/queryWaybillOz.css">
  <link rel="stylesheet" type="text/css" href="../css/head_code.css">
  <link rel="stylesheet" type="text/css" href="../css/foot.css">
</head>
<body>
<jsp:include page="head_code.jsp"/>
<div class="qwbo">
  <div class="qwbo_waybill_information">
    <div class="qwbo_waybill_information_title">
      <p>运单信息</p>
    </div>
    <div class="qwbo_waybill_information_content">
      <div class="information_content_logistics_id">
        <label>运单号</label>
        <input type="text" class="content_logistics_id" value="">
      </div>
      <div class="information_content_logistics_company">
        <label>承运公司</label>
        <input type="text" class="content_logistics_company" value="">
      </div>
      <div class="information_content_car_license">
        <label>车号</label>
        <input type="text" class="content_car_license" value="">
      </div>
      <div class="information_content_good_num">
        <label>货号</label>
        <input type="text" class="content_good_num" value="">
      </div>
    </div>
  </div>
  <div class="qwbo_send_duty_information">
    <div class="qwbo_send_duty_information_title">
      <p>发货人信息</p>
    </div>
    <div class="qwbo_send_duty_information_content">
      <div class="information_content_send_duty">
        <label>发货人</label>
        <input type="text" class="content_send_duty" value="">
      </div>
      <div class="information_content_send_phone_num">
        <label>手机</label>
        <input type="text" class="content_send_phone_num" value="">
      </div>
      <div class="information_content_send_addr">
        <label>发货地址</label>
        <input type="text" class="content_send_addr" value="">
      </div>
      <div class="information_content_send_company">
        <label>企业名称</label>
        <input type="text" class="content_send_company" value="">
      </div>
    </div>
  </div>
  <div class="qwbo_receive_duty_information">
    <div class="qwbo_receive_duty_information_title">
      <p>收货人信息</p>
    </div>
    <div class="qwbo_receive_duty_information_content">
      <div class="information_content_receive_duty">
        <label>收货人</label>
        <input type="text" class="content_receive_duty" value="">
      </div>
      <div class="information_content_receive_phone_num">
        <label>手机</label>
        <input type="text" class="content_receive_phone_num" value="">
      </div>
      <div class="information_content_receive_addr">
        <label>收货地址</label>
        <input type="text" class="content_receive_addr" value="">
      </div>
      <div class="information_content_receive_company">
        <label>采购单位</label>
        <input type="text" class="content_receive_company" value="">
      </div>
    </div>
  </div>
  <div class="qwbo_goods_information">
    <div class="qwbo_goods_information_title">
      <p>货物信息</p>
    </div>
    <div class="qwbo_goods_information_content">
      <!--<div class="contract_id_select">-->
      <!--<label>订单号/合同号</label>-->
      <!--<input type="text" class="contract_id_select_value" value="">-->
      <!--<a href="javascript:;">选择</a>-->
      <!--</div>-->
      <div class="goods_information_show">
        <table class="goods_information_show_table">
          <thead class="goods_information_show_thead">
          <tr>
            <td>序列号</td>
            <td>产品名称</td>
            <td>规格型号</td>
            <td>计量单位</td>
            <td>产品标识代码</td>
            <td>物资编码</td>
            <td>备注</td>
            <td  width="73">操作</td>
          </tr>
          </thead>
          <tbody class="goods_information_show_tbody">
          <tr>
            <td><input type="text"></td>
            <td><input type="text"></td>
            <td><input type="text"></td>
            <td><input type="text"></td>
            <td><input type="text"></td>
            <td><input type="text"></td>
            <td><input type="text"></td>
            <td><a href="javascript:;" class="goods_information_delete" onclick="goods_information_delete(this)">删除</a></td>
          </tr>
          </tbody>
        </table>
      </div>
      <div class="goods_information_add">
        <a href="javascript:;" class="goods_in_add" onclick="goods_in_add()">新增货物信息</a>
      </div>
    </div>
  </div>
  <div class="qwbo_logistics_information">
    <div class="qwbo_logistics_information_title">
      <p>物流信息</p>
    </div>
    <div class="qwbo_logistics_information_content">
      <div class="logistics_content_send_location">
        <label>始发地</label>
        <input type="text" class="content_send_location" value="">
      </div>
      <div class="logistics_content_receive_location">
        <label>目的地</label>
        <input type="text" class="content_receive_location" value="">
      </div>
      <div class="logistics_content_table">
        <table class="logistics_table">
          <thead class="logistics_thead">
          <tr>
            <td>处理时间</td>
            <td>处理信息</td>
            <td>站点信息</td>
            <td>操作人</td>
          </tr>
          </thead>
          <tbody class="logistics_tbody"></tbody>
        </table>
      </div>
    </div>
  </div>
  <div class="qwbo_submit">
    <a href="javascript:;" onclick="qwob_submit()">提交</a>
  </div>
</div>
<jsp:include page="foot.jsp"/>
</body>
</html>
