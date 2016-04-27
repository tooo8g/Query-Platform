<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html>
<head lang="en">
  <jsp:include page="resource.jsp"/>
  <meta charset="UTF-8">
  <title>登录页</title>
  <script type="text/javascript" src="${ctx}/js/jquery-1.11.3.js"></script>
  <script type="text/javascript" src="${ctx}/js/queryLogin.js"></script>
  <script type="text/javascript" src="${ctx}/js/jquery.cookie.js"></script>
  <link rel="stylesheet" type="text/css" href="${ctx}/css/queryLogin.css">
</head>
<body>
<div class="qLogin">
  <div class="qLogin_log">
    <img src="${ctx}/images/head_4.png">
  </div>
  <div class="qLogin_content">
    <div class="content_login">
      <form id="qLogin_content_login" action="${ctx}/goLogin" name="qLogin_content_login" method="post">
        <div class="qLogin_content_login">
          <div class="login_top">
            <span>用户登录</span>
          </div>
          <div class="login_content">
            <div class="username">
              <div class="username_img">
                <img src="${ctx}/images/login_03.png">
              </div>
              <div class="username_input">
                <input type="text" name="username" class="username_input_value" value="admin">
              </div>

              <div class="username_img1">
                <img src="${ctx}/images/login_04.png" onclick="deleteUsername()">
              </div>
            </div>
            <div class="password">
              <div class="password_img">
                <img src="${ctx}/images/login_05.png">
              </div>
              <div class="password_input">
                <input type="password" name="password" class="password_input_value" value="123">
              </div>
              <div class="password_img1">
                <img src="${ctx}/images/login_04.png" onclick="deletePassword()">
              </div>
            </div>
            <div class="inplist">
              <label for="saveUsername" id="saveUsernameLabel">
                <input id="saveUsername" class="saveUsername" type="checkbox" checked>下次自动登录
              </label>
              <!--<label for="saveUsername" id="saveUsernameLabel">-->
              <!--<span class="saveUser"></span>-->
              <!--<input id="saveUsername" class="saveUsername" type="checkbox" checked>下次自动登录-->
              <!--</label>-->
            </div>
          </div>
          <div class="login_submit">
            <a class="loginSubmit" onclick="loginSubmit()">登陆</a>
          </div>
        </div>
      </form>
      <div class="qLogin_ver"></div>
      <div class="qLogin_version">
        <span class="qLogin_version_span">版本：1.3.3</span>
        <div class="qLogin_version_prompt displayNo" id="qLogin_version_prompt">
          1.2.0修改记录：<br>
          &nbsp;&nbsp;1，增加数据权限管理功能。<br>
          &nbsp;&nbsp;2，编制序列号界面空间布局调整。<br>
          &nbsp;&nbsp;3，编制序列号增加编制状态字段。<br>
          &nbsp;&nbsp;4，页面头部和主功能菜单字段及样式调整。<br>
          &nbsp;&nbsp;5，新增订单、合同时订货明细中增加产品标示代码字段。<br>
          &nbsp;&nbsp;6，企业名称修改为供应商。<br>
          &nbsp;&nbsp;7，调整title的菜单。<br>
          <br>
          1.2.2修改记录：<br>
          &nbsp;&nbsp;1，增加标准在线查看功能。<br>
          &nbsp;&nbsp;2，修改一些错别字。<br>
          &nbsp;&nbsp;3，修复序列号查询编制日期的BUG。<br>
          &nbsp;&nbsp;4，增加资质多关键字查询功能。<br>
          &nbsp;&nbsp;5，页面样式调整。<br>
          <br>
          1.3.0修改记录:<br>
          &nbsp;&nbsp;1，增加订单合同流程<br>
          &nbsp;&nbsp;2，增加条码/二维码生成及预览功能<br>
          &nbsp;&nbsp;3，根据合同的录入方、供应商、采购物资厂家等角色分配读、写(编制序列号)权限<br>
          &nbsp;&nbsp;4，增加用户操作权限管理功能<br>
          &nbsp;&nbsp;5，修复主流程BUG<br>
          <br>
          1.3.1修改记录:<br>
          &nbsp;&nbsp;1，增加物资管理功能<br>
          <br>
          1.3.2修改记录:<br>
          &nbsp;&nbsp;1，变更功能摆放<br>
          <br>
          1.3.3修改记录:<br>
          &nbsp;&nbsp;1，增加loading加载效果<br>
        </div>
      </div>
    </div>
  </div>
</div>
</body>
</html>
