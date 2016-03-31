/**
 * Created by zb on 2016/3/30.
 */
/*退出*/
function loginOut(){
    $.ajax({
        url:"",
        type:"post",
        success:function(){
            window.location.href=ctx+"/login"
        }
    })
}