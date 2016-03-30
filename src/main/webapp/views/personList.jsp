<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
  <jsp:include page="resource.jsp"/>
  <title>用户列表</title>
  <script type="text/javascript" src="${ctx}/js/jquery-1.11.3.js"></script>
  <script type="text/javascript" src="${ctx}/js/transTime.js"></script>
  <script type="text/javascript" src="${ctx}/js/jquery-form.js"></script>
  <script type="text/javascript" src="${ctx}/js/personList.js"></script>
  <link rel="stylesheet" type="text/css" href="${ctx}/css/personList.css">
</head>
<body>
<jsp:include page="head_code.jsp"/>
<div class="psl">
  <input type="hidden" class="pageNo" value="">
  <div class="psl_top">
    <form class="psl_top_form" id="psl_top_form">
      <div id="divFirst">
        <label>登录名</label>
        <input class="psl_name"  name="name" value="">
      </div>
      <div>
        <label>姓名</label>
        <input name="username" value="">
      </div>
      <div>
        <label>所属公司</label>
        <input name="company" value="">
      </div>
      <div class="psl_top_click">
        <a type="reset" id="reset_submit" onclick="resetSubmit()">清除</a>
        <a type="button" id="form_button" onclick="psl_formButton()">查询</a>
        <a href="javaScript:;"  class="personCreat" onclick="personCreat()">新增</a>
      </div>
    </form>
  </div>
  <div class="psl_bottom">
    <table class="psl_bottom_table">
      <thead class="psl_bottom_thead">
      <tr>
        <td width="73"></td>
        <td>登录名</td>
        <td>姓名</td>
        <td>注册时间</td>
        <td>联系电话</td>
        <td>邮箱</td>
        <td width="250">所属公司</td>
        <td>数据权限</td>
      </tr>
      </thead>
      <tbody class="psl_bottom_tbody"></tbody>
    </table>
  </div>
  <div class="listperAuth_button">

  </div>
</div>
<div class="psl_person_create displayNo" id="psl_person_create">
  <div class="pslCreate">
    <div class="create_psl">
      <div class="create_psl_title">
        <p>新增用户</p>
        <a href="javaScript:;" class="create_psl_title_a" onclick="close_psl_Create()"><img src="${ctx}/images/qws_1.png" ></a>
      </div>
      <form id="create_psl_form">
        <div class="create_psl_content">
          <div>
            <label>登录名</label>
            <input type="text" class="login_name" name="login_name" value="">
          </div>
          <div>
            <label>密码</label>
            <input type="password" class="password" name="password" value="">
          </div>
          <div>
            <label>重复密码</label>
            <input type="password" class="confirm_pwd" name="confirm_pwd" value="">
          </div>
          <div>
            <label>姓名</label>
            <input type="text" class="username" name="username" value="">
          </div>
          <div>
            <label>联系方式</label>
            <input type="text" class="tel" name="tel" value="">
          </div>
          <div>
            <label>邮箱</label>
            <input type="text" class="email" name="email" value="">
          </div>
          <div>
            <label>所属公司</label>
            <input type="text" class="company" name="company" value="">
          </div>
          <div class="creat_psl_button">
            <a href="javascript:;" onclick="creat_psl_button()">保存</a>
          </div>
        </div>
      </form>
    </div>
  </div>
</div>
<div class="psl_juris displayNo" id="psl_juris">
  <input type="hidden" class="_id" value="">
  <div class="pslJuris">
    <div class="juris_psl">
      <div class="juris_psl_title">
        <p>权限分配</p>
        <a href="javaScript:;" class="juris_psl_title_a" onclick="close_psl_juris()"><img src="${ctx}/images/qws_1.png" ></a>
      </div>
      <form id="juris_psl_form">
        <div class="juris_psl_content">
          <div class="juris_psl_person">
            <div class="juris_psl_person_title">
              用户持有权限
            </div>
            <div class="juris_psl_person_content">
              <select name="juris_person_select" size="10" multiple="multiple" class="juris_person_select" id="juris_person_select">

              </select>
            </div>
          </div>
          <div class="juris_psl_person_move">
            <a href="javascript:;" onclick="jurisAdd()" class="jurisAdd"><img src="${ctx}/images/pel_1.png"><span>添加</span></a>
            <a href="javascript:;" onclick="jurisRemov()" class="jurisRemov"><span>移去</span><img src="${ctx}/images/pel_2.png"></a>
          </div>
          <div class="juris_psl_company">
            <div class="juris_psl_company_title">
              所有公司的读/写权限
            </div>
            <div class="juris_psl_company_content">
              <select name="juris_company_select" size="10" multiple="multiple" class="juris_company_select" id="juris_company_select">

              </select>
            </div>
          </div>
          <div class="juris_psl_save">
            <a href="javascript:;" onclick="juris_psl_button()">保存</a>
          </div>
        </div>
      </form>
    </div>
  </div>
</div>
<jsp:include page="foot.jsp"/>
</body>
</html>
