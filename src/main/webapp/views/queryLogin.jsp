<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html>
<head lang="en">
  <meta charset="UTF-8">
  <title>登录页</title>
  <script type="text/javascript" src="../js/jquery-1.11.3.js"></script>
  <script type="text/javascript" src="../js/queryLogin.js"></script>
  <script type="text/javascript" src="../js/jquery.cookie.js"></script>
  <link rel="stylesheet" type="text/css" href="../css/queryLogin.css">
</head>
<body>
<div class="qLogin">
  <div class="qLogin_log">
    <img src="../images/head_3.png">
  </div>
  <div class="qLogin_content">
    <div class="content_login">
      <form id="qLogin_content_login" action="queryCodeSearch.html" name="qLogin_content_login" method="post">
        <div class="qLogin_content_login">
          <div class="login_top">
            <span>用户登录</span>
          </div>
          <div class="login_content">
            <div class="username">
              <div class="username_img">
                <img src="../images/login_03.png">
              </div>
              <div class="username_input">
                <input type="text" name="username" class="username_input_value" value="">
              </div>

              <div class="username_img1">
                <img src="../images/login_04.png" onclick="deleteUsername()">
              </div>
            </div>
            <div class="password">
              <div class="password_img">
                <img src="../images/login_05.png">
              </div>
              <div class="password_input">
                <input type="password" name="password" class="password_input_value" value="">
              </div>
              <div class="password_img1">
                <img src="../images/login_04.png" onclick="deletePassword()">
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
            <a class="loginSubmit" href="#" onclick="loginSubmit()">登陆</a>
          </div>
        </div>
      </form>
    </div>
  </div>
</div>
</body>
</html>