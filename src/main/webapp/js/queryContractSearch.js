/**
 * Created by zb on 2016/3/3.
 */
$(function(){
    /*改变头部的css*/
    $(".guanliUl").removeClass("displayBlock").addClass("displayNo")
    $(".codeUl").removeClass("displayNo").addClass("displayBlock")

    /*修改头部的css*/
    $(".nav li a").removeClass("colorClick").addClass("colorNoClick")
    $(".contract").removeClass("colorNoClick").addClass("colorClick")
    var startValue=0 //初始值
    var limitValue=10 //一次取出多少条数据
    var contract_id="" //订单合同号
    var purchasing_company="" //采购单位
    var company_name="" //供应商
    var count="" //总数
    var bzxx="" //保存data信息
    var tbodyList=""
    var bzNum
    /*打开页面，直接调用下面的方法*/
    $.ajax({
        url:ctx+"/queryOrderOrContract",
        type:"post",
        data:{contract_id:contract_id,purchasing_company:purchasing_company,company_name:company_name,start:startValue,limit:limitValue},
        dataType:"json",
        success:function(data){
            count=data.count
            bzxx=data.bzxx
            for(var i=0;i<bzxx.length;i++){
                bzNum=Number(startValue)+i+1
                tbodyList+="<tr>"
                tbodyList+="<td>"+bzNum+"</td>"
                tbodyList+="<td>"+bzxx[i].contract_id+"</td>"
                tbodyList+="<td>"+bzxx[i].company_name+"</td>"
                tbodyList+="<td>"+bzxx[i].purchasing_company+"</td>"
                tbodyList+="<td><a href='"+ctx+"/contract/queryContractInformation?contract_id="+bzxx[i].contract_id+"'>查看/编制序列号</a></td>"
                tbodyList+="<td>"+bzxx[i].user_id+"</td>"
                tbodyList+="<td>"+timeStamp2String(bzxx[i].add_time.$date)+"</td>"
                tbodyList+="<td>编制中</td>"
                tbodyList+="</tr>"
            }
            $(".conser_bottom_tbody").html(" ")
            $(".conser_bottom_tbody").append(tbodyList)
            if(count>0) {
                var asButton = ""
                var countPages = Math.ceil(count / limitValue)
                var PageNo  //当前页码
                if (startValue == 0) {
                    PageNo = 1
                }
                $(".pageNo").val(PageNo)
                var nextStartRow//下一页开始显示的编号
                asButton += "<a><img src='"+ctx+"/images/sts_4.png'></a>"
                asButton += "<p>" + PageNo + "/" + countPages + "</p>"
                if (countPages > 1) {
                    nextStartRow = PageNo * limitValue
                    asButton += "<a class=clickCursor onclick=goPage('" + contract_id + "','" + purchasing_company + "','" + company_name + "','" + nextStartRow + "','" + limitValue + "','next')><img src='"+ctx+"/images/sts_5.png'></a>"
                } else {
                    asButton += "<a><img src='"+ctx+"/images/sts_5.png'></a>"
                }
                $(".listperAuth_button").html(" ")
                $(".listperAuth_button").append(asButton)
            }
        },
        error:function(){
            alert("链接失败")
        }
    })
})

/*清除*/
function resetSubmit(){
    $("#conser_top_form")[0].reset()
}
/*查询*/
function formButton(){
    var startValue=0 //初始值
    var limitValue=10 //一次取出多少条数据
    var contract_id=$(".top_contract").val();//订单合同号
    var purchasing_company=$(".top_purchasing_company").val();//采购单位
    var company_name=$(".top_company_name").val();//供应商
    var count="" //总数
    var bzxx="" //保存data信息
    var tbodyList=""
    var bzNum
    $.ajax({
        url:ctx+"/queryOrderOrContract",
        type:"post",
        data:{contract_id:contract_id,purchasing_company:purchasing_company,company_name:company_name,start:startValue,limit:limitValue},
        dataType:"json",
        success:function(data){
            count=data.count
            bzxx=data.bzxx
            for(var i=0;i<bzxx.length;i++){
                bzNum=Number(startValue)+i+1
                tbodyList+="<tr>"
                tbodyList+="<td>"+bzNum+"</td>"
                tbodyList+="<td>"+bzxx[i].contract_id+"</td>"
                tbodyList+="<td>"+bzxx[i].company_name+"</td>"
                tbodyList+="<td>"+bzxx[i].purchasing_company+"</td>"
                tbodyList+="<td><a href='"+ctx+"/contract/queryContractInformation?contract_id="+bzxx[i].contract_id+"'>查看/编制序列号</a></td>"
                tbodyList+="<td>"+bzxx[i].user_id+"</td>"
                tbodyList+="<td>"+timeStamp2String(bzxx[i].add_time.$date)+"</td>"
                tbodyList+="<td>编制中</td>"
                tbodyList+="</tr>"
            }
            $(".conser_bottom_tbody").html(" ")
            $(".conser_bottom_tbody").append(tbodyList)

            var asButton=""
            var countPages=Math.ceil(count/limitValue)
            var PageNo  //当前页码
            if(startValue==0){
                PageNo=1
            }
            $(".pageNo").val(PageNo)
            var nextStartRow//下一页开始显示的编号
            asButton+="<a><img src='"+ctx+"/images/sts_4.png'></a>"
            asButton+="<p>"+PageNo+"/"+countPages+"</p>"
            if(countPages>1){
                nextStartRow=PageNo*limitValue
                asButton+="<a class=clickCursor onclick=goPage('"+contract_id+"','"+purchasing_company+"','"+company_name+"','"+nextStartRow+"','"+limitValue+"','next')><img src='"+ctx+"/images/sts_5.png'></a>"
            }else{
                asButton+="<a><img src='"+ctx+"/images/sts_5.png'></a>"
            }
            $(".listperAuth_button").html(" ")
            $(".listperAuth_button").append(asButton)
        },
        error:function(){
            alert("链接失败")
        }
    })
}

//页码跳转
function goPage(contract_id,purchasing_company,company_name,startValue,limitValue,isGo){
    $.ajax({
        url:ctx+"/queryStandard",
        data:{contract_id:contract_id,purchasing_company:purchasing_company,company_name:company_name,start:startValue,limit:limitValue},
        dataType : 'json',
        success:function(data){
            var count="" //总数
            var bzxx="" //保存data信息
            var tbodyList=""
            var bzNum
            count=data.count
            bzxx=data.bzxx
            for(var i=0;i<bzxx.length;i++){
                bzNum=Number(startValue)+i+1
                tbodyList+="<tr>"
                tbodyList+="<td>"+bzNum+"</td>"
                tbodyList+="<td>"+bzxx[i].contract_id+"</td>"
                tbodyList+="<td>"+bzxx[i].company_name+"</td>"
                tbodyList+="<td>"+bzxx[i].purchasing_company+"</td>"
                tbodyList+="<td><a href='"+ctx+"/contract/queryContractInformation?contract_id="+bzxx[i].contract_id+"'>查看/编制序列号</a></td>"
                tbodyList+="<td>"+bzxx[i].user_id+"</td>"
                tbodyList+="<td>"+timeStamp2String(bzxx[i].add_time.$date)+"</td>"
                tbodyList+="<td>编制中</td>"
                tbodyList+="</tr>"
            }
            $(".conser_bottom_tbody").html(" ")
            $(".conser_bottom_tbody").append(tbodyList)


            var asButton=""
            var pageNo=$(".pageNo").val()  //当前页码
            var countPages=Math.ceil(count/limitValue)
            var noPage
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
                asButton+="<a class=clickCursor onclick=goPage('"+contract_id+"','"+purchasing_company+"','"+company_name+"','"+preStartRow+"','"+limitValue+"','pre')><img src='"+ctx+"/images/sts_4.png'></a>"
            }else{
                asButton+="<a><img src='"+ctx+"/images/sts_4.png'></a>"
            }
            asButton+="<p>"+pageNo+"/"+countPages+"</p>"
            if(countPages>pageNo){
                nextStartRow=pageNo*limitValue
                asButton+="<a class=clickCursor onclick=goPage('"+contract_id+"','"+purchasing_company+"','"+company_name+"','"+nextStartRow+"','"+limitValue+"','next')><img src='"+ctx+"/images/sts_5.png'></a>"
            }else{
                asButton+="<a><img src='"+ctx+"/images/sts_5.png'></a>"
            }
            $(".listperAuth_button").html(" ")
            $(".listperAuth_button").append(asButton)
        }
    })
}

