<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>国家铁路局认证目录查询</title>
    <script type="text/javascript" src="../../js/jquery-1.11.3.js"></script>
    <script type="text/javascript" src="../../js/queryCert.js"></script>
    <link rel="stylesheet" type="text/css" href="../../css/repariParts.css">

</head>
<body>
<div class="as">
  <input type="hidden" class="pageNo" value="">
  <div class="as_title">
    <p>当前位置：</p>
    <p>资质信息查询>></p>
    <p>目录查询</p>
  </div>
  <div class="as_left">
    <p>目录</p>
    <ul>
      <li class="colorHui">铁路总公司认证采信目录</li>
      <li class="colorRed">国家铁路局认证目录</li>
      <li class="colorHui">动车组维修用新品零部件目录</li>
      <li class="colorHui">铁路车辆零部件技术审查</li>
    </ul>
  </div>
  <div class="as_right">
    <div action="queryCert" class="a_search">
      <input type="text" name="search_a_text" value="" class="serAInput">
      <input type="button" name="search_a" value="搜索" class="search_a_btn" onclick="search_a_button()">
    </div>
    <div class="a_title">
      <p class="colorHui">证书统计</p>
      <span>|</span>
      <p class="colorHui">当前证书数量：<p id="as_num"></p>个</p>
    </div>
    <div class="asTable">
      <table class="as_table">
        <thead class="as_thead">
        <tr>
          <td>证书状态</td>
          <td>认证单元</td>
          <td>企业名称</td>
          <td>采信目录产品范围</td>
          <td>证书编号</td>
          <td>颁发单位</td>
          <td>认证标准和技术要求</td>
          <td>颁发日期</td>
          <td>有效日期</td>
          <td>操作</td>
        </tr>
        </thead>
        <tbody class="as_tbody">

        </tbody>
      </table>
    </div>
    <div class="listperAuth_button">

    </div>
  </div>
</div>
<div class="productInformation displayNo">
  <div class="product_infor_show">
    <div class="product_show_infor">
     <div class="product_infor_show1">
     </div>
     <div class="product_infor_show2">
      <table>
        <thead class="pis_thead">
        <tr>
          <td>产品标识代码</td>
          <td>规格型号</td>
          <td>规格型号状态</td>
        </tr>
        </thead>
        <tbody class="pis_tbody">

        </tbody>
      </table>
    </div>
     <div class="pis_button_div">
      <input type="button" class="pis_button" value="关闭" onclick="pis_close()">
     </div>
    </div>
  </div>
</div>
<div></div>
</body>
</html>
