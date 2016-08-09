/**
 * Created by zb on 2016/8/9.
 */
/**
 * Created by zb on 2016/8/9.
 */

$(function(){
        //按回车，触发searchA事件
        document.onkeydown = function(e){
            var ev = document.all ? window.event : e;
            if(ev.keyCode==13) {
                searchA()
            }
        }
    }
)

//点击搜索框
function searchA(){
    var search_input_value=$(".seaInput").val()
    $.ajax({
        url:ctx+'/query_word',
        data:{word:search_input_value},
        type:"post",
        dataType:"html",
        success:function(data){
            $(".selecShow").html("")
            $(".selecShow").html(data)
            selecShowA()
        }
    })
}

//获取近义词 selecShow a绑定click方法
function selecShowA(){
    $(".selecShow a").on("click",function(){
        var aValue=$(this).text()
        alert(aValue)
        $(this).attr("href","javascript:;")
        $.ajax({
            url:ctx+'/near_word',
            data:{word:aValue},
            type:"post",
            success:function(data){
                $(".synonym").html("")
                $(".synonym").html("是不是搜索："+data)
                synonymA()
            }
        })
    })
}

//（近义词）synonym里面的a添加click方法
function synonymA(){
    $(".synonym a").on("click",function(){
        var aValue=$(this).text()
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
}