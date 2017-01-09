<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<jsp:include page="resource.jsp"/>
<link rel="stylesheet" type="text/css" href="${ctx}/css/queryWordLeft.css">
<div class="nm-l">
  <a href="javascript:;" class="a_n aClick"  onclick="jumpPage('n')">非标准名称管理界面</a>
  <a href="javascript:;" class="a_m aNoClick" onclick="jumpPage('m')">标准名称管理界面</a>
  <a href="javascript:;" class="a_nm aNoClick" onclick="jumpPage('nm')">数据关联界面</a>
</div>
<script type="text/javascript" src="${ctx}/js/queryWordLeft.js"></script>