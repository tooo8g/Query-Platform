<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
  <jsp:include page="resource.jsp"/>
  <title>标准名称管理</title>
  <link rel="stylesheet" type="text/css" href="${ctx}/css/queryMa.css">
</head>
<body>
<div class="container">
  <jsp:include page="queryWordLeft.jsp"/>
  <div class="nm-r">
    <input type="file" id="files" style="display:none" onchange="importMa();"/>
    <a href="javascript:;" type="button" id="import" class="searchBu">导入</a>
    <div class="popup displayNo">
      <span class="popup_title">提示</span>
      <span class="popup_con">将名称放入一列并保存为txt</span>
      <a href="javascript:;" type="button" class="popup_sure" onclick="popupSure()">确定</a>
      <a href="javascript:;" type="button" class="popup_cancel" onclick="popupCancel()">取消</a>
    </div>
    <a href="javascript:;" type="button" class="deleteAll" onclick="deleteAll()">删除</a>
    <div class="r_search">
      <span>导入人</span>
      <input type="text" class="importPerson" value="">
      <span>名称</span>
      <input type="text" class="maName" value="">
      <span>时间</span>
      <input  name="maName_date" class="createCode_date" type="text" onFocus="var endDate=$dp.$('endDate2');WdatePicker({dateFmt:'yyyy-MM-dd',alwaysUseStartDate:true})" value=""/>
      <span>批次</span>
      <input type="text" class="maBatch" value="">
      <a href="javascript:;" type="button" class="maSearch" onclick="maSearch()">搜索</a>
    </div>
    <table>
      <thead>
      <tr>
        <td width="75"></td>
        <td>批次</td>
        <td>导入人</td>
        <td>时间</td>
        <td>名称</td>
        <td>关联状态</td>
      </tr>
      </thead>
      <tbody class="man_body">

      </tbody>
    </table>
    <div class="list_button">

    </div>
  </div>
</div>

<script type="text/javascript" src="${ctx}/js/jquery-1.11.3.js"></script>
<script type="text/javascript" src="${ctx}/js/queryMa.js"></script>
<script type="text/javascript" src="${ctx}/js/WdatePicker.js"></script>
<script src="${ctx}/js/jquery.pagination.js"></script>
</body>
</html>
