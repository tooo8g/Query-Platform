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
    
    catalogAdd()
    
    
    
    $("#import").click(function(){//点击导入按钮，使files触发点击事件，然后完成读取文件的操作。
//    	if（alert("将名称放入一列并保存为txt")）{
//    		$("#files").click();
//    	}
    	if(confirm("将名称放入一列并保存为txt")){
    		$("#files").click();
    	}
    });


    document.onkeydown = function(e){ 
        var ev = document.all ? window.event : e;
        if(ev.keyCode==13) {
        	searchAdd()
         }
    } 


})
//移动
function moveLi(obj1, obj2,flag) {
   if(flag){
	   $(".selectRight ul li").removeClass("liClick")
	   $(".selectRight ul").append($(".liClick"))
	   $(".selectLeft .liClick").remove()
   }else{
	   $(".selectLeft ul li").removeClass("liClick")
	   $(".selectLeft ul").append($(".liClick"))
	   $(".selectRight .liClick").remove()
   }
   
   
    //获取selectRight里面的数据，然后传给后台
   var selectLi=""
   if(flag){
	   selectLi+=$(".selectRight .liClick").html()   
    }else{
       selectLi+=$(".selectLeft .liClick").html()   
    }
    //请求路径,flag为true,增加，false，减少
    var wordValue=$(".wordHidden").val()
    var url=""
    if(flag){
        url=ctx+'/put_means'
    }else{
        url=ctx+'/remove_means'
    }
    $.ajax({
        url:url,
        type:"post",
        data:{word:wordValue,m:selectLi},
        success:function(){
        	
        }
    })
}




//查询，点击查询，右边出现
function searchCatalog(str){  
    var msg=""  //用来保存data里面的值
    var words=""
    var near=""
    var result=""
    var means=""
    var sr_top_list=""
    var sr_nm_list=""
    var selectLeft_list=""
    var selectRight_list=""
    var liValue //点击的值
    	liValue=str
    $.ajax({
        url:ctx+'/query_word_detail',
        type:'post',
        data:{word:liValue},
        dataType:"json",
        success:function(data){
        	//给wordHidden赋值
        	$(".wordHidden").val(liValue)
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
            $(".sr_nm_content").html("")
            $(".sr_nm_content").html(sr_nm_list)

            result=msg.result
            selectLeft_list+="<ul>"
            for(var i=0;i<result.length;i++){
                selectLeft_list+="<li>"+result[i]+"</li>"
            }
            selectLeft_list+="</ul>"
            $(".selectLeftContent").html("")
            document.getElementById('left').scrollTop = 0;
            $(".selectLeftContent").html(selectLeft_list)

            means=msg.means
            selectRight_list+="<ul>"
            for(var i=0;i<means.length;i++){
                selectRight_list+="<li>"+means[i]+"</li>"
            }
            selectRight_list+="</ul>"
            $(".selectRightContent").html("")
              document.getElementById('right').scrollTop = 0;
            $(".selectRightContent").html(selectRight_list)

            nmClick()
            
            selectLeftClick()
            selectRightClick()
        }
    })
}
//点击sr_nm_content里面的值，改变样式，触发事件
function nmClick(){
    $(".sr_nm_content span").on("click",function(){
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
    var word=""
    $(".sr_nm_content span").each(function(){
        if($(this).hasClass("spanClick")){
            	word+=$(this).text()
        }
    })

    var selectLeft=""
    var results=""
    var msg=""
    	
    if(word){
        $.ajax({
            url:ctx+'/queryWord',
            type:'post',
            data:{word:word,m:""},
            dataType:"json",
            success:function(data){
                msg=data.msg
                results=msg.result
                for(var i=0;i<results.length;i++){
                    selectLeft+="<li>"+results[i]+"</li>"
                }
                $(".selectLeftContent").html("")
                document.getElementById('left').scrollTop = 0;
                $(".selectLeftContent").html(selectLeft)
                
                selectLeftClick()
                selectRightClick()
            }
        })	
    }else{
    	var str=$(".wordHidden").val()
    	searchCatalog(str)
    }
}

//给selectLeft li 添加click方法
function selectLeftClick(){
	$(".selectLeft li").on("click",function(){
		$(".selectLeft li").removeClass("liClick")
		$(this).addClass("liClick")
	})
}

//给selectRight li 添加click方法
function selectRightClick(){
	$(".selectRight li").on("click",function(){
		$(".selectRight li").removeClass("liClick")
		$(this).addClass("liClick")
	})
}


//添加
function searchAdd(){
	var inputValue=$(".searchInput").val()
	if(inputValue){
		$(".catalogList ul").append("<li>"+inputValue+"</li>")	
		catalogAdd()
		$(".searchInput").val("")
	}
}


    //给catalog下的Li绑定事件
function catalogAdd(){
    $(".catalog ul li").on('click',function(){
        $(".catalog ul li").removeClass("clickLi")
        $(".searchInput").val("")
        $(this).addClass("clickLi")
        
        var str=$(this).text()
    	searchCatalog(str)
    })
    
}


function imports(){
    var selectedFile = document.getElementById("files").files[0];//获取读取的File对象
    var name = selectedFile.name;//读取选中文件的文件名
    var size = selectedFile.size;//读取选中文件的大小
    var reader = new FileReader();//这里是核心！！！读取操作就是由它完成的。
    reader.readAsText(selectedFile);//读取文件的内容

    var liList=""
    var list=[]
    reader.onload = function(){
        list=this.result.split("\n")
        for(var i=0;i<list.length;i++){
        	liList+="<li>"+list[i].trim()+"</li>"
        }
        $(".catalogList ul").append(liList)
        
        catalogAdd()
    };
}