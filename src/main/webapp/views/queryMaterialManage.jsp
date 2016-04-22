<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html>
<head lang="en">
  <jsp:include page="resource.jsp"/>
  <meta charset="UTF-8">
  <title>物资管理</title>
  <script type="text/javascript" src="${ctx}/js/jquery-1.11.3.js"></script>
  <script type="text/javascript" src="${ctx}/js/queryMaterialManage.js"></script>
  <script type="text/javascript" src="${ctx}/js/transTime.js"></script>
  <link type="text/css" rel="stylesheet" href="${ctx}/css/queryMaterialManage.css">
</head>
<body>
<jsp:include page="head_code.jsp"/>
<div class="materManage">
  <input type="hidden" class="pageNo" value="">
  <div class="materManage_top">
    <div>
      <label>物资编码</label>
      <input type="text" class="materManage_material_code" value="">
    </div>
    <div>
      <label>物资名称</label>
      <input type="text" class="materManage_material_name" value="">
    </div>
    <div class="materManageOperation">
      <a href="javascript:;" type="button" id="materManageSearch" onclick="materManageSearch()">查询</a>
      <a href="queryMaterManageAdd.html"  id="materManageAdd" >新增物资</a>
    </div>
  </div>
  <div class="materManage_bottom">
    <table class="materManage_table">
      <thead class="materManage_thead">
      <tr>
        <td width="73"></td>
        <td>物资编码</td>
        <td>物资名称</td>
        <td>规格型号</td>
        <td>计量单位</td>
        <td>重要物资</td>
        <td>更新时间</td>
        <td width="100">操作</td>
      </tr>
      </thead>
      <tbody class="materManage_tbody">

      </tbody>
    </table>
  </div>
  <div class="listperAuth_button">

  </div>
</div>
<div class="modify_materManage displayNo" id="modify_materManage">
  <input type="hidden" class="materManageId" value="">
  <div class="materManage_modify">
    <div class="materManageModify">
      <div class="materManageModify_title">
        <P>修改物资</P>
        <a href="javaScript:;" class="materManageModify_title_a" onclick="close_materManage_modify()"><img src="../images/qws_1.png" ></a>
      </div>
      <div class="materManageModify_content">
        <div>
          <label>物资编码</label>
          <input type="text" class="mater_material_code" value="">
        </div>
        <div>
          <label>物资名称</label>
          <input type="text" class="mater_material_name" value="">
        </div>
        <div>
          <label>规格型号</label>
          <input type="text" class="mater_specification" value="">
        </div>
        <div>
          <label>计量单位</label>
          <input type="text" class="mater_measurement" value="">
        </div>
        <div>
          <label>重要物资</label>
          <input type="checkbox" class="mater_isPrecious">
        </div>
        <div class="creat_button">
          <a href="javascript:;" onclick="saveModify_materManage()">保存</a>
        </div>
      </div>
    </div>
  </div>
</div>
<jsp:include page="foot.jsp"/>
</body>
</html>