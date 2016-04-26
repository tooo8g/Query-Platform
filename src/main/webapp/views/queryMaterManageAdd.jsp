<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html>
<head lang="en">
  <jsp:include page="resource.jsp"/>
  <title>新增物资</title>
  <script type="text/javascript" src="${ctx}/js/jquery-1.11.3.js"></script>
  <script type="text/javascript" src="${ctx}/js/queryMaterManageAdd.js"></script>
  <script type="text/javascript" src="${ctx}/js/papaparse.js"></script>
  <link rel="stylesheet" type="text/css" href="${ctx}/css/queryMaterManageAdd.css">
</head>
<body>
<jsp:include page="head_code.jsp"/>
<div class="materManageAdd">
  <div class="materManageAdd_top">
    <input type="file" id="files" onchange="filesCheange()">
    <a class="inportMater" onclick="inportMater()">导入物资明细</a>
  </div>
  <div class="materManageAdd_bottom">
    <table class="materManageAdd_table">
      <thead class="materManageAdd_thead">
      <tr>
        <td width="200">物资编码</td>
        <td>物资名称</td>
        <td>规格型号</td>
        <td width="100">计量单位</td>
        <td width="100">重要物质</td>
        <td width="100">操作</td>
      </tr>
      </thead>
      <tbody class="materManageAdd_tbody">
      <tr>
        <td><input class="material_code" type="text" value=""></td>
        <td><input class="material_name" type="text" value=""></td>
        <td><input class="specification" type="text" value=""></td>
        <td><input class="measurement" type="text" value=""></td>
        <td><input class="isPrecious" type="checkbox"></td>
        <td><a onclick="materManageAdd_delete(this)">删除</a></td>
      </tr>
      <tr>
        <td><input class="material_code" type="text" value=""></td>
        <td><input class="material_name" type="text" value=""></td>
        <td><input class="specification" type="text" value=""></td>
        <td><input class="measurement" type="text" value=""></td>
        <td><input class="isPrecious" type="checkbox"></td>
        <td><a onclick="materManageAdd_delete(this)">删除</a></td>
      </tr>
      <tr>
        <td><input class="material_code" type="text" value=""></td>
        <td><input class="material_name" type="text" value=""></td>
        <td><input class="specification" type="text" value=""></td>
        <td><input class="measurement" type="text" value=""></td>
        <td><input class="isPrecious" type="checkbox"></td>
        <td><a onclick="materManageAdd_delete(this)">删除</a></td>
      </tr>
      <tr>
        <td><input class="material_code" type="text" value=""></td>
        <td><input class="material_name" type="text" value=""></td>
        <td><input class="specification" type="text" value=""></td>
        <td><input class="measurement" type="text" value=""></td>
        <td><input class="isPrecious" type="checkbox"></td>
        <td><a onclick="materManageAdd_delete(this)">删除</a></td>
      </tr>
      <tr>
        <td><input class="material_code" type="text" value=""></td>
        <td><input class="material_name" type="text" value=""></td>
        <td><input class="specification" type="text" value=""></td>
        <td><input class="measurement" type="text" value=""></td>
        <td><input class="isPrecious" type="checkbox"></td>
        <td><a onclick="materManageAdd_delete(this)">删除</a></td>
      </tr>
      <tr>
        <td><input class="material_code" type="text" value=""></td>
        <td><input class="material_name" type="text" value=""></td>
        <td><input class="specification" type="text" value=""></td>
        <td><input class="measurement" type="text" value=""></td>
        <td><input class="isPrecious" type="checkbox"></td>
        <td><a onclick="materManageAdd_delete(this)">删除</a></td>
      </tr>
      <tr>
        <td><input class="material_code" type="text" value=""></td>
        <td><input class="material_name" type="text" value=""></td>
        <td><input class="specification" type="text" value=""></td>
        <td><input class="measurement" type="text" value=""></td>
        <td><input class="isPrecious" type="checkbox"></td>
        <td><a onclick="materManageAdd_delete(this)">删除</a></td>
      </tr>
      <tr>
        <td><input class="material_code" type="text" value=""></td>
        <td><input class="material_name" type="text" value=""></td>
        <td><input class="specification" type="text" value=""></td>
        <td><input class="measurement" type="text" value=""></td>
        <td><input class="isPrecious" type="checkbox"></td>
        <td><a onclick="materManageAdd_delete(this)">删除</a></td>
      </tr>
      <tr>
        <td><input class="material_code" type="text" value=""></td>
        <td><input class="material_name" type="text" value=""></td>
        <td><input class="specification" type="text" value=""></td>
        <td><input class="measurement" type="text" value=""></td>
        <td><input class="isPrecious" type="checkbox"></td>
        <td><a onclick="materManageAdd_delete(this)">删除</a></td>
      </tr>
      <tr>
        <td><input class="material_code" type="text" value=""></td>
        <td><input class="material_name" type="text" value=""></td>
        <td><input class="specification" type="text" value=""></td>
        <td><input class="measurement" type="text" value=""></td>
        <td><input class="isPrecious" type="checkbox"></td>
        <td><a onclick="materManageAdd_delete(this)">删除</a></td>
      </tr>
      </tbody>
    </table>
  </div>
  <div class="materManageAdd_add">
    <a href="javascript:;" class="materManage_Add_add" onclick="materManage_Add_add()">新增物资明细</a>
  </div>
  <div class="materManageAdd_save">
    <a href="javascript:;" class="materManage_add_save" onclick="materManage_add_save()">保存</a>
  </div>
</div>
<jsp:include page="foot.jsp"/>
</body>
</html>