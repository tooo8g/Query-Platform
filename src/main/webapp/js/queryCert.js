/**
 * Created by zb on 2016/1/6.
 */
var demoJson
$(function(){
    //页面刚打开，触发的方法
    var str="" //搜索框里的值
    var startValue=0 //初始值
    var limitValue=10 //一次取出多少条数据
    $.ajax({
            url: '../queryCert',
            data:{str:str,start:startValue,limit:limitValue},
            type : 'post',
            dataType : 'json',
            success:function(data){
                var trList=""
                demoJson=eval(data)
                var count=demoJson.count
                $("#as_num").text(count)
                var bzxx=demoJson.bzxx
                var bzNum
                for(var i=0;i<bzxx.length;i++){
                	bzNum=startValue+i+1
                    trList+="<tr>"
                    trList+="<td>"+bzNum+"</td>"
                    trList+="<td title="+bzxx[i].cert_status+">"+bzxx[i].cert_status+"</td>"
                    trList+="<td title="+bzxx[i].cert_unit+">"+bzxx[i].cert_unit+"</td>"
                    trList+="<td title="+bzxx[i].company_name+">"+bzxx[i].company_name+"</td>"
                    trList+="<td title="+bzxx[i].product_range+">"+bzxx[i].product_range+"</td>"
                    trList+="<td title="+bzxx[i].cert_num+">"+bzxx[i].cert_num+"</td>"
                    trList+="<td title="+bzxx[i].issue_organization+">"+bzxx[i].issue_organization+"</td>"
                    trList+="<td title="+bzxx[i].cert_standards+">"+bzxx[i].cert_standards+"</td>"
                    trList+="<td title="+timeStamp2String(bzxx[i].publish_date.$date)+">"+ timeStamp2String(bzxx[i].publish_date.$date)+"</td>"
                    trList+="<td title="+timeStamp2String(bzxx[i].valid_date.$date)+">"+timeStamp2String(bzxx[i].valid_date.$date)+"</td>"
                    trList+="<td><a id=asdt_"+bzxx[i]._id.$oid+" class='as_details colorHui' onclick=as_details('"+bzxx[i]._id.$oid+"')>详情</a></td>"
                    trList+="</tr>"
                }
                $(".as_tbody").append(trList)
                

                //分页
                var asButton=""
                var countPages=Math.ceil(count/limitValue)
                var PageNo=0  //当前页码
                if(startValue==0){
                    PageNo=1
                }
                $(".pageNo").val(PageNo)
                var nextStartRow//下一页开始显示的编号
                asButton+="<a>上一页</a>"
                asButton+="<p>"+PageNo+"/"+countPages+"</p>"
                if(countPages>1){
                    nextStartRow=PageNo*limitValue
                    asButton+="<a class=clickCursor onclick=goPage('"+str+"','"+nextStartRow+"','"+limitValue+"','next')>下一页</a>"
                }else{
                    asButton+="<a>下一页</a>"
                }
                $(".listperAuth_button").append(asButton)
            }
        }
    )
})
//搜索表单提交
function search_a_button(){
	$(".as_tbody").html("")
	$(".listperAuth_button").html("")
    var str=$(".serAInput").val() //搜索框里的值
    var startValue=0 //初始值
    var limitValue=10 //一次取出多少条数据
    $.ajax({
            url: '../queryCert',
            data:{str:str,start:startValue,limit:limitValue},
            type : 'post',
            dataType : 'json',
            success:function(data){
                var trList=""
                demoJson=eval(data)
                var count=demoJson.count
                $("#as_num").text(count)
                var bzxx=demoJson.bzxx
                var bzNum
                for(var i=0;i<bzxx.length;i++){
                	bzNum=startValue+i+1
                    trList+="<tr>"
                    trList+="<td>"+bzNum+"</td>"
                    trList+="<td title="+bzxx[i].cert_status+">"+bzxx[i].cert_status+"</td>"
                    trList+="<td title="+bzxx[i].cert_unit+">"+bzxx[i].cert_unit+"</td>"
                    trList+="<td title="+bzxx[i].company_name+">"+bzxx[i].company_name+"</td>"
                    trList+="<td title="+bzxx[i].product_range+">"+bzxx[i].product_range+"</td>"
                    trList+="<td title="+bzxx[i].cert_num+">"+bzxx[i].cert_num+"</td>"
                    trList+="<td title="+bzxx[i].issue_organization+">"+bzxx[i].issue_organization+"</td>"
                    trList+="<td title="+bzxx[i].cert_standards+">"+bzxx[i].cert_standards+"</td>"
                    trList+="<td title="+timeStamp2String(bzxx[i].publish_date.$date)+">"+timeStamp2String(bzxx[i].publish_date.$date)+"</td>"
                    trList+="<td title="+timeStamp2String(bzxx[i].valid_date.$date)+">"+timeStamp2String(bzxx[i].valid_date.$date)+"</td>"
                    trList+="<td><a id=asdt_"+bzxx[i]._id.$oid+" class='as_details colorHui' onclick=as_details('"+bzxx[i]._id.$oid+"')>详情</a></td>"
                    trList+="</tr>"
                }
                $(".as_tbody").append(trList)

                //分页
                var asButton=""
                var countPages=Math.ceil(count/limitValue)
                var pageNo=0  //当前页码
                if(startValue==0){
                    pageNo=1
                }
                $(".pageNo").val(pageNo)
                var nextStartRow//下一页开始显示的编号
                asButton+="<a>上一页</a>"
                asButton+="<p>"+pageNo+"/"+countPages+"</p>"
                if(countPages>1){
                    nextStartRow=pageNo*limitValue
                    asButton+="<a class=clickCursor onclick=goPage('"+str+"','"+nextStartRow+"','"+limitValue+"','next')>下一页</a>"
                }else{
                    asButton+="<a>下一页</a>"
                }
                $(".listperAuth_button").append(asButton)
            }
        }
    )
}

//证书详情
function as_details(str){
     $(".productInformation").removeClass("displayNo").addClass("displayBlock")
     $("#asdt_"+str).removeClass("colorHui").addClass("colorRed")

    //显示详情页
    var pis=""
    pis+="<ul>"
    for(var i=0;i<bzxx.length;i++){
        if(bzxx[i]._id.$oid==str){
            pis+="<li>"
            pis+="<p>企业名称：</p><span>"+bzxx[i].company_name+"</span>"
            pis+="<p>证书编号：</p><span>"+bzxx[i].cert_num+"</span>"
            pis+="<p>颁发单位：</p><span>"+bzxx[i].issue_organization+"</span>"
            pis+="<p>产品类别：</p><span>"+bzxx[i].product_kind+"</span>"
            pis+="<p>认证规则名称：</p><span>"+bzxx[i].cert_name+"</span>"
            pis+="<p>认证单元：</p><span>"+bzxx[i].cert_unit+"</span>"
            pis+="<p>认证标准和技术要求：</p><span>"+bzxx[i].cert_standards+"</span>"
            pis+="<p>注册地址：</p><span>"+bzxx[i].reg_addr+"</span>"
            pis+="<p>制造地址：</p><span>"+bzxx[i].product_addr+"</span>"
            pis+="<p>证书变更情况：</p><span>"+bzxx[i].cert_condition+"</span>"
            pis+="<p>发证日期：</p><span>"+timeStamp2String(bzxx[i].publish_date.$date)+"</span>"
            pis+="<p>有效期：</p><span>"+timeStamp2String(bzxx[i].valid_date.$date)+"</span>"
            pis+="<p>公告号：</p><span>"+bzxx[i].notification_number+"</span>"
            pis+="<p>证书状态：</p><span>"+bzxx[i].cert_status+"</span>"
            pis+="</li>"

            var pisContent=""
            var cert_detail=bzxx[i].cert_detail

            for(var j=0;j<cert_detail.length;j++){
                pisContent+="<li>"
                pisContent+="<p>"+cert_detail[j].product_code+"</p>"
                pisContent+="<p>"+cert_detail[j].specification+"</p>"
                pisContent+="<p>"+cert_detail[j].specification_status+"</p>"
                pisContent+="</li>"
            }
            $(".pis_content_ul").append(pisContent)
        }
    }
    pis+="</ul>"
    $(".product_infor_show1").append(pis)

     var docuHeight=$(document).height()  //页面可视区域
     var prShHeight=$(".product_show_infor").height()
     if(prShHeight<docuHeight){
           $(".productInformation").height(docuHeight)
     }
    var pisConHeight=docuHeight-320
    $(".pis_content").height(pisConHeight)
}

//关闭证书详情页
function pis_close(){
    $(".productInformation").removeClass("displayBlock").addClass("displayNo")
    $(".as_details").removeClass("colorRed").addClass("colorHui")
}

//页码跳转
function goPage(str,start,limit,isGo){
	$(".as_tbody").html("")
	$(".listperAuth_button").html("")
    $.ajax({
        url: '../queryCert',
        data:{str:str,start:start,limit:limit},
        type : 'post',
        dataType : 'json',
        success:function(data){
            var trList=""
            demoJson=eval(data)
            var count=demoJson.count
            $("#as_num").text(count)
            var bzxx=demoJson.bzxx
            var bzNum=""
            for(var i=0;i<bzxx.length;i++){
            	bzNum=Number(start)+i+1
                trList+="<tr>"
                trList+="<td>"+bzNum+"</td>"
                trList+="<td title="+bzxx[i].cert_status+">"+bzxx[i].cert_status+"</td>"
                trList+="<td title="+bzxx[i].cert_unit+">"+bzxx[i].cert_unit+"</td>"
                trList+="<td title="+bzxx[i].company_name+">"+bzxx[i].company_name+"</td>"
                trList+="<td title="+bzxx[i].product_range+">"+bzxx[i].product_range+"</td>"
                trList+="<td title="+bzxx[i].cert_num+">"+bzxx[i].cert_num+"</td>"
                trList+="<td title="+bzxx[i].issue_organization+">"+bzxx[i].issue_organization+"</td>"
                trList+="<td title="+bzxx[i].cert_standards+">"+bzxx[i].cert_standards+"</td>"
                trList+="<td title="+timeStamp2String(bzxx[i].publish_date.$date)+">"+timeStamp2String(bzxx[i].publish_date.$date)+"</td>"
                trList+="<td title="+timeStamp2String(bzxx[i].valid_date.$date)+">"+timeStamp2String(bzxx[i].valid_date.$date)+"</td>"
                trList+="<td><a id=asdt_"+bzxx[i]._id.$oid+" class='as_details colorHui' onclick=as_details('"+bzxx[i]._id.$oid+"')>详情</a></td>"
                trList+="</tr>"
            }
            $(".as_tbody").append(trList)
            
            //显示详情页
            var pis=""
                 pis+="<ul>"
            for(var i=0;i<bzxx.length;i++){
            	 pis+="<li id="+bzxx[i]._id.$oid+" class='displayNo'>"
            	 pis+="<p>企业名称：</p><span>"+bzxx[i].company_name+"</span>"
                 pis+="<p>证书编号：</p><span>"+bzxx[i].cert_num+"</span>"
                 pis+="<p>颁发单位：</p><span>"+bzxx[i].issue_organization+"</span>"
                 pis+="<p>产品类别：</p><span>"+bzxx[i].product_kind+"</span>"
                 pis+="<p>认证规则名称：</p><span>"+bzxx[i].cert_name+"</span>"
                 pis+="<p>认证单元：</p><span>"+bzxx[i].cert_unit+"</span>"
                 pis+="<p>认证标准和技术要求：</p><span>"+bzxx[i].cert_standards+"</span>"
                 pis+="<p>注册地址：</p><span>"+bzxx[i].reg_addr+"</span>"
                 pis+="<p>制造地址：</p><span>"+bzxx[i].product_addr+"</span>"
                 pis+="<p>证书变更情况：</p><span>"+bzxx[i].cert_condition+"</span>"
                 pis+="<p>发证日期：</p><span>"+timeStamp2String(bzxx[i].publish_date.$date)+"</span>"
                 pis+="<p>有效期：</p><span>"+timeStamp2String(bzxx[i].valid_date.$date)+"</span>"
                 pis+="<p>公告号：</p><span>"+bzxx[i].notification_number+"</span>"
                 pis+="<p>证书状态：</p><span>"+bzxx[i].cert_status+"</span>"
                 pis+="</li>"
                	 
                 var pisBody=""
                 var cert_detail=bzxx[i].cert_detail
                 for(var j=0;j<cert_detail.length;j++){
                           pisBody+="<tr class="+bzxx[i]._id.$oid+" class='displayNo'>"
                           pisBody+="<td>"+cert_detail[j].product_code+"</td>"
                           pisBody+="<td>"+cert_detail[j].specification+"</td>"
                           pisBody+="<td>"+cert_detail[j].specification_status+"</td>"
                           pisBody+="</tr>"
                    }
                 $(".pis_tbody").append(pisBody)
                		 
            }
                 pis+="</ul>"
            $(".product_infor_show1").append(pis)
            
            var asButton=""
            var pageNo  //当前页码
            var noPage
            var limitValue=10
            var countPages=Math.ceil(count/limitValue)
            if(isGo=="next"){
                noPage=Number($(".pageNo").val())+1
                if(noPage>countPages){
                    pageNo=countPages
                }else{
                    pageNo=noPage
                }
            }  
            if(isGo=="pre"){
                noPage=Number($(".pageNo").val())-1
                if(noPage==0){
                    noPage=1
                }
                pageNo=noPage
            }
            $(".pageNo").val(pageNo)
            var preStartRow //上一页开始显示的编号
            var nextStartRow//下一页开始显示的编号
            if(pageNo>1){
                preStartRow=(pageNo-2)*limitValue
                asButton+="<a class=clickCursor onclick=goPage('"+str+"','"+preStartRow+"','"+limitValue+"','pre')>上一页</a>"
            }else{
                asButton+="<a>上一页</a>"
            }
            asButton+="<p>"+pageNo+"/"+countPages+"</p>"
            if(countPages>pageNo){
                nextStartRow=pageNo*limitValue
                asButton+="<a class=clickCursor onclick=goPage('"+str+"','"+nextStartRow+"','"+limitValue+"','next')>下一页</a>"
            }else{
                asButton+="<a>下一页</a>"
            }
            $(".listperAuth_button").append(asButton)
        }
    })
}

function timeStamp2String(time){
	var datetime = new Date();
	datetime.setTime(time);
	var year = datetime.getFullYear();
	var month = datetime.getMonth() + 1 < 10 ? "0" + (datetime.getMonth() + 1) : datetime.getMonth() + 1;
	var date = datetime.getDate() < 10 ? "0" + datetime.getDate() : datetime.getDate();
	return year + "-" + month + "-" + date;
	}
