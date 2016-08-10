<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html>
<head>
   <jsp:include page="resource.jsp"/>
    <title>查询</title>
    <link rel="stylesheet" type="text/css" href="${ctx}/css/wordQueryDemo.css">
    <script type="text/javascript" src="${ctx}/js/jquery-1.11.3.js"></script>
</head>
<body>
<div class="selectBody">
  <p>细目名称查询（共存储90003条数据）</p>
  <div class="selectSerch">
    <input type="text" name="search_input" value="" class="seaInput">
    <a type="button" name="search_a" class="search_a_btn" href="javascript:;" onclick="searchA()">搜索</a>
  </div>
  <div class="selectContent">
    <div class="synonym">

    </div>
    <div class="selecShow">

    </div>
  </div>
</div>
<div class="selectNewBody">
    <p>细目名称查询（共存储90003条数据）</p>
    <div class="selectNewSerch">
        <input type="text" name="search_input" value="" class="seaNewInput">
        <a type="button" name="search_a" class="search_an_btn" href="javascript:;" onclick="searchNewA()">搜索</a>
    </div>
    <div class="selectNewContent">
        <div class="synonymNew">

        </div>
        <div class="selecNewShow">

        </div>
    </div>
</div>
<script type="text/javascript" src="${ctx}/js/wordQueryDemo.js"></script>
</body>
</html>
