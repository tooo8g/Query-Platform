/**
 * Created by zb on 2016/8/9.
 */
$(function(){
    //获取近义词 selecShow ul li a绑定click方法
    $(".selecShow ul li a").on("click",function(){
        var aValue=$(this).attr("href")
        $(this).attr("href","javascript:;")
        $.ajax({
            url:ctx+'/near_word',
            data:{word:aValue},
            type:"post",
            success:function(data){
                $(".synonym").html("")
                $(".synonym").html(data)
            }
        })
    })
    //（近义词）synonym里面的a添加click方法
    $(".synonym").on("click",function(){
        var aValue=$(this).attr("href")
        $(this).attr("href","javascript:;")
        $.ajax({
            url:ctx+'/query_word',
            data:{word:aValue},
            type:"post",
            success:function(data){
                $(".selecShow").html("")
                $(".selecShow").html(data)
            }
        })
    })
})
//点击搜索框
function searchA(){
    var search_input_value=$(".search_input").val()
    $.ajax({
        url:ctx+'/query_word',
        data:{word:search_input_value},
        type:"post",
        success:function(data){
            $(".selecShow").html("")
            $(".selecShow").html(data)
        }
    })
}