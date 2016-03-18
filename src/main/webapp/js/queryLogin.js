/**
 * Created by zb on 2016/3/17.
 */

$(function(){
    ///*通过判断saveUsername是否被选中来修改背景图片,默认为选中状态*/
    //$(".saveUser").css("background-image","url('../images/login_06.png')")


    /*获取页面可视高复*/
    var viewportheight; //浏览器可视高度
    // 支持(mozilla/netscape/opera/chrome/IE7)
    if (typeof window.innerWidth != 'undefined') {
        viewportheight = window.innerHeight;
    }
    // 支持（IE6）
    else if (typeof document.documentElement != 'undefined' && typeof document.documentElement.clientWidth != 'undefined' && document.documentElement.clientWidth != 0) {
        viewportheight = document.documentElement.clientHeight;
    }
    // 支持其他浏览器
    else {
        viewportheight = document.getElementsByTagName('body')[0].clientHeight;
    }
    var qLoginTop; //qLogin距离头部的高度
    qLoginTop=viewportheight-580>0?(viewportheight-580)/2:0
    $(".qLogin").css({marginTop:qLoginTop})
    if ($.cookie("rmbUser") == "true") {
        $("#saveUsername").attr("checked", true);
        $(".username_input_value").val($.cookie("username"));
        $(".password_input_value").val($.cookie("password"));
    }
})
/*清空用户名*/
function deleteUsername(){
     $(".username_input_value").val("")
}
/*表单提交*/
function loginSubmit(){
    if ($("#saveUsername").attr("checked")) {
        var str_username = $(".username_input_value").val();
        var str_password = $(".password_input_value").val();
        $.cookie("rmbUser", "true", { expires: 7 }); //存储一个带7天期限的cookie
        $.cookie("username", str_username, { expires: 7 });
        $.cookie("password", str_password, { expires: 7 });
    }
    else {
        $.cookie("rmbUser", "false", { expire: -1 });
        $.cookie("username", "", { expires: -1 });
        $.cookie("password", "", { expires: -1 });
    }

    $("#qLogin_content_login").submit()
}