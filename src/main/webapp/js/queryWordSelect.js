$(function(){
    var nScrollHight = 0; //滚动距离总长(注意不是滚动条的长度)
    var nScrollTop = 0;   //滚动到的当前位置
    var nDivHight = $(".catalogList").height();

    //$(".catalogList").scroll(function(){
    //    nScrollHight = $(this)[0].scrollHeight;
    //    nScrollTop = $(this)[0].scrollTop;
    //    if(nScrollTop + nDivHight >= nScrollHight)
    //        var liList="<li>我是11</li><li>我是12</li><li>我是13</li><li>我是14</li><li>我是15</li><li>我是16</li><li>我是17</li><li>我是18</li><li>我是19</li><li>我是20</li>"
    //    $("div ul").append(liList)
    //})



    //给catalog下的Li绑定事件
    $(".catalog ul li").on('click',function(){
        $(".catalog ul li").removeClass("clickLi")
        $(".searchInput").val("")
        $(".searchInput").val($(this).text().trim())
        $(this).addClass("clickLi")
    })

})
//移动
function moveOption(obj1, obj2,flag) {
    var selectOption=""

    for(var i = obj1.options.length - 1 ; i >= 0 ; i--) {
        if(obj1.options[i].selected) {
            if(selectOption){
                selectOption+=","+obj1.options[i].text
            }else{
                selectOption+=obj1.options[i].text
            }

            var opt = new Option(obj1.options[i].text,obj1.options[i].value);
            opt.selected = true;
            obj2.options.add(opt);
            obj1.remove(i);
        }
    }
    //获取selectRight里面的数据，然后传给后台
    //请求路径,flag为true,增加，false，减少
    var url=""
    if(flag){
        url=""
    }else{
        url=""
    }
    $.post({
        url:url,
        type:"post",
        data:{means:selectOption}
    })
}




//查询，点击查询，右边出现
function searchCatalog(){
    var inputValue //搜索框里面的值
    var msg=""  //用来保存data里面的值
    var words=""
    var near=""
    var result=""
    var means=""
    var sr_top_list=""
    var sr_nm_list=""
    var selectLeft_list=""
    var selectRight_list=""
    inputValue=$(".searchInput").val()
    $.ajax({
        url:'../json/bzlx.json',
        type:'post',
        data:{word:inputValue},
        dataType:"json",
        success:function(data){
            msg=data.msg
            words=msg.words
            for(var i=0;i<words.length;i++){
                sr_top_list+="<span>"+words[i]+ "</span>"
            }
            $('.sr_top').html("")
            $(".sr_top").html(sr_top_list)

            near=msg.near
            for(var i=0;i<near.length;i++){
                sr_nm_list+="<span>"+near[i]+"</span>"
            }
            $(".sr_nm").html("")
            $(".sr_nm").html(sr_nm_list)

            result=msg.result
            for(var i=0;i<result.length;i++){
                selectLeft_list+="<option>"+result[i]+"</option>"
            }
            $(".selectLeft").html("")
            $(".selectLeft").html(selectLeft_list)

            means=msg.means
            for(var i=0;i<means.length;i++){
                selectRight_list+="<option>"+means[i]+"</option>"
            }
            $(".selectRight").html("")
            $(".selectRight").html(selectRight_list)

            nmClick()

        }
    })
}
//点击sr_nm里面的值，改变样式，触发事件
function nmClick(){
    $(".sr_nm span").on("click",function(){
        if($(this).hasClass("spanClick")){
            $(this).removeClass("spanClick")
        }else{
            $(this).addClass("spanClick")
        }
        nearClick()
    })
}

//点击的相似字
function nearClick(){
    //点击的相似字
    var near=""
    $(".sr_nm span").each(function(){
        if($(this).hasClass("spanClick")){
            if(near){
                near+=","+$(this).text()
            }else{
                near+=$(this).text()
            }
        }
    })

    var selectLeft=""
    var results=""
    $.ajax({
        url:'../json/bzlx.json',
        type:'post',
        data:{near:near},
        dataType:'json',
        success:function(data){
            results=data.msg.result
            for(var i=0;i<results.length;i++){
                selectLeft+="<option>"+results[i]+"</option>"
            }
            $(".selectLeft").html("")
            $(".selectLeft").html(selectLeft)
        }
    })
}
