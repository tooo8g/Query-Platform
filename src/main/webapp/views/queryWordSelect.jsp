<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html>
<head>
    <jsp:include page="resource.jsp"/>
    <title></title>
    <script type="text/javascript" src="${ctx}/js/jquery-1.11.3.js"></script>
    <script type="text/javascript" src="${ctx}/js/queryWordSelect.js"></script>
    <link rel="stylesheet" type="text/css" href="${ctx}/css/queryWordSelect.css">
    <link rel="stylesheet" type="text/css" href="${ctx}/css/head_code.css">
    <link rel="stylesheet" type="text/css" href="${ctx}/css/foot.css">
</head>
<body>
<div class="container">
  <div class="catalog">
    <div class="catalogButton">
      <input type="text" class="searchInput" value="">
      <a type="button" class="searchButton" onclick="searchCatalog()">查询</a>
    </div>
    <div class="catalogList">
      <ul>
        <li>我是1</li>
        <li>我是2</li>
        <li>我是3</li>
        <li>我是4</li>
        <li>我是5</li>
        <li>我是6</li>
        <li>我是7</li>
        <li>我是8</li>
        <li>我是9</li>
        <li>我是10</li>
      </ul>
    </div>
  </div>
  <div class="searchResult">
    <div class="sr_top">
    </div>
    <div class="sr_nm">
    </div>
    <div class="sr_con">
      <div class="firstSelect">
        <select multiple name="left" class="selectLeft" id="left">
        </select>
      </div>
      <div class="sr_con_input">
        <a type="button" onclick="moveOption(document.getElementById('left'),document.getElementById('right'),true)">>></a><br><br>
        <a type="button" onclick="moveOption(document.getElementById('right'), document.getElementById('left'),false)"><<</a>
      </div>
      <div>
        <select multiple name="right" class="selectRight" id="right"></select>
      </div>

    </div>
  </div>
</div>
<jsp:include page="foot.jsp"/>
</body>
</html>
