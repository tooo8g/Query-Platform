<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html>
<head>
   <jsp:include page="resource.jsp"/>
    <title>查询</title>
    <link rel="stylesheet" type="text/css" href="${ctx}/css/wordQueryDemo.css">
    <script type="text/javascript" src="${ctx}/js/jquery-1.11.3.js"></script>
    <script>
    $(function(){
      //获取近义词 selecShow ul li a绑定click方法
      $(".selecShow ul li a").on("click",function(){
        var aValue=$(this).attr("href")
        $(this).attr("href","javascript:;")
        $.ajax({
          url:"/near_word",
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
          url:"/query_word",
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
        url:"/query_word",
        data:{word:search_input_value},
        type:"post",
        success:function(data){
          $(".selecShow").html("")
          $(".selecShow").html(data)
        }
      })
    }

  </script>
</head>
<body>
<div class="selectBody">
  <div class="selectSerch">
    <input type="text" name="search_input" value="" class="seaInput">
    <a type="button" name="search_a" class="search_a_btn" href="javascript:;" onclick="searchA()">搜索</a>
  </div>
  <div class="selectContent">
    <div class="synonym"></div>
    <div class="selecShow">

    </div>
  </div>
</div>
</body>
</html>
