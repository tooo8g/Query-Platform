<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
  <jsp:include page="resource.jsp"/>
  <title>标准名称管理</title>
  <link rel="stylesheet" type="text/css" href="${ctx}/css/querymas.css">
  <link rel="stylesheet" type="text/css" href="${ctx}/css/jquery.editable-select.min.css">
  <link rel="stylesheet" href="${ctx}/js/layui/css/layui.css">
</head>
<body>
<div class="container">
  <jsp:include page="queryWordLeft.jsp"/>
  <div class="nm-r">
    <input type="file" id="files" style="display:none"/>
    <a href='javascript:;' data-method='offset' data-type='auto' class='showExcel displayNo'></a>
    <a href="javascript:;" type="button" id="import" class="searchBu">导入</a>
    <div class="popup displayNo">
      <span class="popup_title">提示</span>
      <span class="popup_con">请选择excel表</span>
      <a href="javascript:;" type="button" class="popup_sure" onclick="popupSure()">确定</a>
      <a href="javascript:;" type="button" class="popup_cancel" onclick="popupCancel()">取消</a>
    </div>
    <a href="javascript:;" type="button" class="deleteAll" onclick="deleteAll()">删除</a>
    <a href="javascript:;" type="button" class="assoic" onclick="assOic()">智能关联</a>
    <a href="javascript:;" type="button" class="maSearch" onclick="maSearch()">搜索</a>
    <div class="r_search">
      <span>导入人</span>
      <input type="text" class="importPerson" value="">
      <span>名称</span>
      <input type="text" class="maName" value="">
      <span>时间</span>
      <input name="maName_date" type="text" class="createCode_date_start" id="prev_date" onFocus="WdatePicker({maxDate:'%y-%M-%d',alwaysUseStartDate:true});" value=""/>--
      <input name="maName_date" type="text" class="createCode_date_end" id="behind_data" onFocus="WdatePicker({maxDate:'%y-%M-%d',minDate:'#F{$dp.$D(\'prev_date\')}',alwaysUseStartDate:true});" value="" />
      <span>批次</span>
      <input type="text" class="maBatch" value="">
      <span>关联数</span>
      <select class="maMean" id="maMean">
        <option value="-1">所有</option>
        <option value="0">0</option>
        <option value="1">1</option>
        <option value="2">2</option>
      </select>
      <span>数据来源</span>
      <select class="source">
        <option value="0">人工导入</option>
        <option value="1">数据服务平台</option>
      </select>
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
        <td width="75">关联数</td>
        <td width="75">操作</td>
      </tr>
      </thead>
      <tbody class="man_body">

      </tbody>
    </table>
    <div class="list_button">

    </div>
  </div>
</div>
<div class="sm hide" id="sm">
  <div class="smCon" >
    <ul>

    </ul>
  </div>
</div>
<div class="excelTable displayNo" id="excelTable">
  <table>
    <thead>
    </thead>
    <tbody>
    </tbody>
  </table>
</div>
<script type="text/javascript" src="${ctx}/js/jquery-1.11.3.js"></script>
<script type="text/javascript" src="${ctx}/js/queryMa.js"></script>
<script type="text/javascript" src="${ctx}/js/WdatePicker.js"></script>
<script type="text/javascript" src="${ctx}/js/jquery.pagination.js"></script>
<script type="text/javascript" src="${ctx}/js/jquery.editable-select.min.js"></script>
<script type="text/javascript" src="${ctx}/js/layui/layui.js"></script>
<script type="text/javascript" src="${ctx}/js/modernizr-2.8.3.js"></script>
<script type="text/javascript" src="${ctx}/js/jquery-ui.min.js"></script>
<script type="text/javascript" src="${ctx}/js/infragistics.core.js"></script>
<script type="text/javascript" src="http://cdn-na.infragistics.com/igniteui/2016.2/latest/js/infragistics.lob.js"></script>
<script type="text/javascript" src="http://cdn-na.infragistics.com/igniteui/2016.2/latest/js/modules/infragistics.documents.core.js"></script>
<script type="text/javascript" src="http://cdn-na.infragistics.com/igniteui/2016.2/latest/js/modules/infragistics.excel.js"></script>
</body>
</html>
