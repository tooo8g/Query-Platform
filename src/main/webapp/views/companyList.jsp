<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <jsp:include page="resource.jsp"/>
    <title>公司列表</title>
    <script type="text/javascript" src="${ctx}/js/jquery-1.11.3.js"></script>
    <script type="text/javascript" src="${ctx}/js/companyList.js"></script>
    <script type="text/javascript" src="${ctx}/js/transTime.js"></script>
    <script type="text/javascript" src="${ctx}/js/jquery-form.js"></script>
    <link rel="stylesheet" type="text/css" href="${ctx}/css/companyList.css">
</head>
<body>
<jsp:include page="head_code.jsp"/>
<div class="cpl">
  <input type="hidden" class="pageNo" value="">
  <div class="cpl_top">
    <form class="cpl_top_form" id="cpl_top_form">
      <div class="cpl_top_com_name">
        <label>公司名称</label>
        <input type="text" class="top_com_name" value="">
      </div>
      <div class="cpl_top_org_code">
        <label>组织机构代码</label>
        <input type="text" class="top_org_code" value="">
      </div>
      <div class="cpl_top_click">
        <a type="reset" id="reset_submit" onclick="resetSubmit()">清除</a>
        <a type="button" id="form_button" onclick="formButton()">查询</a>
        <a href="javaScript:;"  class="companyCreat" onclick="companyCreat()">新增</a>
      </div>
    </form>
  </div>
  <div class="cpl_bottom">
    <table class="cpl_bottom_table">
      <thead class="cpl_bottom_thead">
      <tr>
        <td width="73"></td>
        <td width="200">公司名称</td>
        <td>组织机构代码</td>
        <td>注册时间</td>
        <td width="300">公司地址</td>
        <td>联系人</td>
        <td>联系方式</td>
      </tr>
      </thead>
      <tbody class="cpl_bottom_tbody">

      </tbody>
    </table>
  </div>
  <div class="listperAuth_button">

  </div>
</div>
<div class="cpl_create displayNo" id="cpl_create">
  <div class="cplCreate">
    <div class="create_cpl">
      <div class="create_cpl_title">
        <p>新增公司</p>
        <a href="javaScript:;" class="create_cpl_title_a" onclick="closeCreate()"><img src="${ctx}/images/qws_1.png" ></a>
      </div>
      <form id="create_cpl_form" >
        <div class="create_cpl_content">
          <div>
            <label>公司名称</label>
            <input type="text" class="com_name" name="com_name" value="">
          </div>
          <div>
            <label>组织机构代码</label>
            <input type="text" class="org_code" name="org_code" value="">
          </div>
          <div>
            <label>公司地址</label>
            <input type="text" class="com_addr" name="com_addr" value="">
          </div>
          <div>
            <label>联系人</label>
            <input type="text" class="con_person" name="con_person" value="">
          </div>
          <div>
            <label>联系方式</label>
            <input type="text" class="con_way" name="con_way" value="">
          </div>
          <div class="creat_button">
            <a href="javaScript:;" onclick="creat_button()">保存</a>
          </div>
        </div>

      </form>

    </div>
  </div>
</div>
<jsp:include page="foot.jsp"/>
</body>
</html>
