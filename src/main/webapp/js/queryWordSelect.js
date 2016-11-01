$(function(){
    catalogAdd()
    //导入事件
    $("#import").click(function(){//点击导入按钮，使files触发点击事件，然后完成读取文件的操作。
    	if(confirm("将名称放入一列并保存为txt")){
    		$("#files").click();
    	}
    });
    //回车事件
    document.onkeydown = function(e){ 
        var ev = document.all ? window.event : e;
        if(ev.keyCode==13) {
        	searchAdd()
         }
    }
    //鼠标左键事件
    document.onmousedown=function (e) {
        if(e.which==1){
            var mdTagName=$(e.target).parent().prop("tagName")
            if(mdTagName=="UL"||mdTagName=="LI"){

            }else{
                cateFoucs()
            }
        }
    }
    cateMouseenter()
    cateMouseleave()

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
    cateFoucs()
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
            $(".selectLeftContent_show").removeClass("displayNo").addClass("displayBlcok")
            $(".selectLeftContent_show").html("")
            document.getElementById('left').scrollTop = 0;
            $(".selectLeftContent_show").html(selectLeft_list)

            means=msg.means
            selectRight_list+="<ul>"
            for(var i=0;i<means.length;i++){
                selectRight_list+="<li>"+means[i]+"</li>"
            }
            selectRight_list+="</ul>"
            $(".selectRightContentAdd").removeClass("displayBlock").addClass("displayNo")
            $(".selectRightContentShow").html("")
              document.getElementById('right').scrollTop = 0;
            $(".selectRightContentShow").html(selectRight_list)

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
        $(".catalogList ul").append("<li><p>"+inputValue+"</p><input type='text' class='displayNo' value=''><span  class='displayNo' onclick='catEdit(this)'>编辑</span></li>")
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
            liList+="<li><p>"+list[i].trim()+"</p><input type='text' class='displayNo' value=''><span  class='displayNo' onclick='catEdit(this)'>编辑</span></li>"
        }
        $(".catalogList ul").append(liList)
        
        catalogAdd()
    };
}

//catalogList鼠标划入事件
function cateMouseenter(){
    $(".catalogList ul li").mouseenter(function () {
        if($(".catalogList ul li input").hasClass("displayBlock")){
            $(this).find("span").removeClass("displayNo").addClass("displayBlock")
        }else{
            $(".catalogList ul li span").removeClass("displayBlock").addClass("displayNo")
            $(this).find("span").removeClass("displayNo").addClass("displayBlock")
        }
    })
}
//catalogList鼠标划出事件
function cateMouseleave() {
    $(".catalogList ul li").mouseleave(function () {
        if($(".catalogList ul li input").hasClass("displayBlock")) {
            $(".catalogList ul li span").removeClass("displayBlock").addClass("displayNo")
            $(".catalogList ul li input[class='displayBlock']").parent().find("span").removeClass("displayNo").addClass("displayBlock")
        }else{
            $(".catalogList ul li span").removeClass("displayBlock").addClass("displayNo")

            var inputValue=$(this).find("input").val()
            var pT=$(this).find("p")
            if(inputValue){
                pT.text(inputValue)
            }
            $(this).find("p").removeClass("displayNo").addClass("displayBlock")
            $(this).find("span").removeClass("displayBlock").addClass("displayNo")
            $(this).find("input").removeClass("displayBlock").addClass("displayNo")

            $.ajax({
                url:"",
                type:"post",
                data:{},
                success:function () {

                }
            })
        }
    })

}

//catalogList鼠标所在位置触发事件
function cateFoucs(){
    $(".catalogList ul li span").removeClass("displayBlock").addClass("displayNo")
    var inputFocus=$(".catalogList ul li input[class='displayBlock']")
    var inputValue=inputFocus.val()
    var parentV=inputFocus.parent()
    var pT=parentV.find("p")
    if(inputValue){
        pT.text(inputValue)
    }
    parentV.find("p").removeClass("displayNo").addClass("displayBlock")
    parentV.find("span").removeClass("displayBlock").addClass("displayNo")
    inputFocus.removeClass("displayBlock").addClass("displayNo")

    cateMouseenter()

    $.ajax({
        url:"",
        type:"post",
        data:{},
        success:function () {

        }
    })
}
//catalogList里的p值改变
function  catEdit(str) {
    $(".catalogList li").removeClass("clickLi")
    $(str).parent().addClass("clickLi")
    var pValue="" //当前p里面的值
    var pT=$(str).parent().find("p")
    pValue=pT.text().trim()
    pT.removeClass("displayBlock").addClass("displayNo")
    var inputValue="" //当前input里面的值
    var inputT=$(str).parent().find("input")
    inputT.removeClass("displayNo").addClass("displayBlock")
    inputValue=pValue
    inputT.val(inputValue)

    inputT.on("blur",function () {
        inputValue=$(this).val()
        pValue=inputValue
        if(inputValue){
            pT.text(pValue)
        }
        $(this).parent().find("span").removeClass("displayBlock").addClass("displayNo")
        inputT.removeClass("displayBlock").addClass("displayNo")
        pT.removeClass("displayNo").addClass("displayBlock")

        //$.ajax({
        //    url:"",
        //    type:"post",
        //    data:{},
        //    success:function () {
        //
        //    }
        //})
    })
}

//添加匹配到的名称
function  sesAdd() {
    $(".selectRightContentAdd").removeClass("displayNo").addClass("displayBlock")
    $(".selectRightContentAdd").append("<input type='text' value=''><a href='javascript:;' type='button' class='saveses' onclick='saveSes()'>确认</a>")
}

//保存添加的方法
function  saveSes() {
    //获取selectRight里面的数据，然后传给后台
    var selectLi=""
    selectLi+="<p>"+$('.selectRightContentAdd input').val()+"<p>"
    //请求路径,flag为true,增加，false，减少
    var wordValue=$(".wordHidden").val()
    var url=""
    url=ctx+'/put_means'
    $.ajax({
        url:url,
        type:"post",
        data:{word:wordValue,m:selectLi},
        success:function(){
            $(".selectRightContentAdd input").val()
            $(".selectRightContentAdd").removeClass("displayBlock").addClass("displayNo")
            $('.selectRightContentAdd').html("")
            $(".selectRightContentShow").append("<li>+selectLi+</li>")
        }
    })
}

//查询可能匹配的名称
function leftSelect() {
    var inputValue=$(".left_select").val()
    var result=""
    var selectLeft_list=""
    var msg=""
    $.ajax({
        url:ctx+'/query_word_detail',
        type:"post",
        data:{word:inputValue},
        dataType:"json",
        success:function (data) {
            msg=data.msg
            result=msg.result
            selectLeft_list+="<ul>"
            for(var i=0;i<result.length;i++){
                selectLeft_list+="<li>"+result[i]+"</li>"
            }
            selectLeft_list+="</ul>"
            $(".selectLeftContent_show").removeClass("displayNo").addClass("displayBlcok")
            $(".selectLeftContent_show").html("")
            document.getElementById('left').scrollTop = 0;
            $(".selectLeftContent_show").html(selectLeft_list)
        }
    })
}