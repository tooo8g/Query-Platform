<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
   <jsp:include page="resource.jsp"/>
   <title>数据清洗</title>
   <link rel="stylesheet" href="${ctx}/css/querydataass.css">
</head>
<body>
<div class="container">
  <jsp:include page="queryWordLeft.jsp"/>
  <div class="da-r">
    <div class="da_search">
      <span>标准名称</span>
      <input type="text" class="standard_v" value="">
      <span>非标准名称</span>
      <input type="text" class="nonstandard_v" value="">
       <span>时间</span>
      <input  name="nomaName_date" class="createCode_date_start" type="text" onFocus="var endDate=$dp.$('endDate2');WdatePicker({dateFmt:'yyyy-MM-dd',alwaysUseStartDate:true})" value=""/>--
      <input  name="nomaName_date" class="createCode_date_end" type="text" onFocus="var endDate=$dp.$('endDate2');WdatePicker({dateFmt:'yyyy-MM-dd',alwaysUseStartDate:true})" value=""/>
      <span>关联方式</span>
      <select class="assoic">
        <option value="0">手动</option>
        <option value="1">自动</option>
      </select>
      <span>准确性</span>
      <select class="check">
        <option value="0">未判别</option>
        <option value="1">准确</option>
        <option value="2">不准确</option>
      </select>
      <span class="oper">关联人</span>
      <input type="text" class="operator" value="">
      <a href="javascript:;" type="button" class="daSearch" onclick="daSearch()">搜索</a>
      <a href="javascript:;" type="button" class="daEx" onclick="daEx()">审核</a>
    </div>
    <div class="de displayNo">
      <span class="de_title">提示</span>
      <span class="de_con">将名称放入一列并保存为txt</span>
      <a href="javascript:;" type="button" class="de_sure" onclick="deSure()">合格</a>
      <a href="javascript:;" type="button" class="de_cancel" onclick="deCancel()">不合格</a>
    </div>
    <table>
      <thead>
      <tr>
        <td width="75"></td>
        <td>标准名称</td>
        <td>非标准名称</td>
        <td>自动/手动</td>
        <td>准确性</td>
        <td>时间</td>
        <td>关联人</td>
      </tr>
      </thead>
      <tbody class="da_body">

      </tbody>
    </table>
    <div class="list_button">

    </div>
  </div>
</div>
<script type="text/javascript" src="${ctx}/js/jquery-1.11.3.js"></script>
<script type="text/javascript" src="${ctx}/js/queryda.js"></script>
<script type="text/javascript" src="${ctx}/js/WdatePicker.js"></script>
<script src="${ctx}/js/jquery.pagination.js"></script>
</body>
</html>
