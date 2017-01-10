<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <jsp:include page="resource.jsp"/>
    <title>非标准名称管理</title>
    <link rel="stylesheet" type="text/css" href="${ctx}/css/queryNoMa.css">
</head>
<body>
<div class="container">
  <jsp:include page="queryWordLeft.jsp"/>
  <div class="nm-r">
    <input type="file" id="files" style="display:none" onchange="importNoMa();"/>
    <a href="javascript:;" type="button" id="import" class="searchBu">导入</a>
    <div class="popup displayNo">
      <span class="popup_title">提示</span>
      <span class="popup_con">将名称放入一列并保存为txt</span>
      <a href="javascript:;" type="button" class="popup_sure" onclick="popupSure()">确定</a>
      <a href="javascript:;" type="button" class="popup_cancel" onclick="popupCancel()">取消</a>
    </div>
    <a href="javascript:;" type="button" class="deleteAll" onclick="deleteAll()">删除</a>
    <a href="javascript:;" type="button" class="assoic" onclick="assOic()">智能关联</a>
    <div class="r_search">
      <span>导入人</span>
      <input type="text" class="importPerson" value="">
      <span>名称</span>
      <input type="text" class="nomaName" value="">
      <span>时间</span>
      <input  name="nomaName_date" class="createCode_date_start" type="text" onFocus="var endDate=$dp.$('endDate2');WdatePicker({dateFmt:'yyyy-MM-dd',alwaysUseStartDate:true})" value=""/>--
      <input  name="nomaName_date" class="createCode_date_end" type="text" onFocus="var endDate=$dp.$('endDate2');WdatePicker({dateFmt:'yyyy-MM-dd',alwaysUseStartDate:true})" value=""/>
      <span>批次</span>
      <input type="text" class="nomaBatch" value="">
      <span>数据来源</span>
      <select class="source">
        <option value="0">人工导入</option>
        <option value="1">数据服务平台</option>
      </select>
      <a href="javascript:;" type="button" class="omaSearch" onclick="nomaSearch()">搜索</a>
    </div>
    <table>
      <thead>
      <tr>
        <td width="75"></td>
        <td width="75">批次</td>
        <td>导入人</td>
        <td>时间</td>
        <td width="250">名称</td>
        <td>数据来源</td>
        <td width="75">关联状态</td>
      </tr>
      </thead>
      <tbody class="noman_body">

      </tbody>
    </table>
    <div class="list_button">

    </div>
  </div>
</div>

<script type="text/javascript" src="${ctx}/js/jquery-1.11.3.js"></script>
<script type="text/javascript" src="${ctx}/js/queryNoMa.js"></script>
<script type="text/javascript" src="${ctx}/js/WdatePicker.js"></script>
<script src="${ctx}/js/jquery.pagination.js"></script>
</body>
</html>
