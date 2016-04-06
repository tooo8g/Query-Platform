<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html>
<head>
    <jsp:include page="resource.jsp"/>
    <title>招标采购列表页面</title>
    <script type="text/javascript" src="${ctx}/js/jquery-1.11.3.js"></script>
    <script type="text/javascript" src="${ctx}/js/queryPurchaseList.js"></script>
    <link rel="stylesheet" type="text/css" href="${ctx}/css/queryPrchaseList.css">
</head>
<body>
<jsp:include page="head.jsp"/>
<input type="hidden" class="pageNo" value="">
<div class="purchase">
  <div class="purchase_title">
    <p>当前位置：</p>
    <p>公告信息查询>></p>
    <p>招标采购列表查询</p>
  </div>
  <div class="purchase_main">
    <div class="purchase_search">
       <label>所属行业</label>
        <div class="industryList">
            <a class="colorWhite" href="javascript:;">不限</a>
            <a class="colorBule" href="javascript:;">交通运输</a>
            <a class="colorBule" href="javascript:;">建筑工程</a>
            <a class="colorBule" href="javascript:;">机械设备</a>
            <a class="colorBule" href="javascript:;">办公用品</a>
            <a class="colorBule" href="javascript:;">建筑建材</a>
            <a class="colorBule" href="javascript:;">服务</a>
        </div>
      <input type="text" value="" class="serInput">
      <a type="button" name="search_purchase" class="search_purchase_btn" onclick="search_purchase_button()">搜索</a>
    </div>
    <div class="purchase_tableDiv">
      <table class="purchase_table">
        <thead class="purchase_thead">
        <tr>
          <td width="73"></td>
          <td width="120">采购编号</td>
          <td width="300">采购名称</td>
          <td>组织单位</td>
          <td>公告类型</td>
          <td>采购品种</td>
          <td>采购地区</td>
          <td>所属行业</td>
          <td>发布时间</td>
          <td>数据来源</td>
        </tr>
        </thead>
        <tbody class="purchase_tbody">

        </tbody>
      </table>
    </div>

    <div class="listperAuth_button">

    </div>
  </div>
</div>
<jsp:include page="foot.jsp"/>
</body>
</html>
