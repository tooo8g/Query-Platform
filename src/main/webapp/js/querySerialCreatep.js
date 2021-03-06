/**
 * Created by zb on 2016/3/1.
 */
var product_name="" //产品名称
var product_identify="" //产品标识代码
var material_code="" //物资编码
var purchasing_company="" //采购单位
var group_id=""
var specification=""  //规格型号
var company_name="" //企业名称	
$(function(){
    /*改变头部的css*/
    $(".guanliUl").removeClass("displayBlock").addClass("displayNo")
    $(".codeUl").removeClass("displayNo").addClass("displayBlock")

    /*通过id获取产品详情信息*/
    var branch_id=$(".branch_id").val() //关联ID
    var jsonData="" //返回的JSON
     $.post(ctx+"/queryCode",{branch_id:branch_id},function(data){
            jsonData=data
             product_name = jsonData.product_name
             product_identify = jsonData.product_identify
             material_code = jsonData.material_code
             purchasing_company = jsonData.purchasing_company
             specification=jsonData.specification
             $(".body_product_name").val(product_name)
             $(".body_product_identify").val(product_identify)
             $(".body_material_code").val(material_code)
             $(".createCode_purchasing_company").val(purchasing_company)
             company_name=jsonData.company_name
        },"json"
    )


})
/*自动创建序列号*/
function creatCode(){
    var startValue=0 //初始值
    var limitValue=10 //一次取出多少条数据
    var contract_id=$(".createCode_orderno").val() //订单号/合同号
    var program_time=$(".createCode_date").val() //编制日期
    var creatNum=$(".createCode_creatNum").val() //生成数量
    var branch_id=$(".branch_id").val() //关联ID
    var count="" //总数
    var productInfos="" //保存data信息
    var tbodyList=""
    var bzNum
    $.ajax({
        url:ctx+"/createCode",
        data:{product_name:product_name,product_identify:product_identify,material_code:material_code,purchasing_company:purchasing_company,contract_id:contract_id,program_time:program_time,num:creatNum,branch_id:branch_id,specification:specification,company_name:company_name,start:startValue,limit:limitValue},
        type:"post",
        dataType:"json",
        success:function(data){
            $(".qscp_body_codeList_button").removeClass("displayNo").addClass("displayBlock")
            count=data.count
            productInfos=data.codes
            group_id=productInfos[0].group_id.$oid
            for(var i=0;i<productInfos.length;i++){
                bzNum=Number(startValue)+i+1
                tbodyList+="<tr>"
                tbodyList+="<td>"+bzNum+"</td>"
                tbodyList+="<td>"+productInfos[i].code+"</td>"
                tbodyList+="<td>"+timeStamp2String(productInfos[i].program_time.$date)+"</td>"
                tbodyList+="<td>"+productInfos[i].purchasing_company+"</td>"
                tbodyList+="<td>"+productInfos[i].contract_id+"</td>"
                tbodyList+="<td>"+productInfos[i].material_code+"</td>"
                tbodyList+="<td>"+productInfos[i].product_name+"</td>"
                tbodyList+="<td>"+productInfos[i].specification+"</td>"
                tbodyList+="<td>"+productInfos[i].product_identify+"</td>"
                tbodyList+="</tr>"
            }
            $(".body_codeList_tbody").html(" ")
            $(".body_codeList_tbody").append(tbodyList)

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
                asButton+="<a class=clickCursor onclick=goPage('"+product_name+"','"+product_identify+"','"+material_code+"','"+purchasing_company+"','"+contract_id+"','"+program_time+"','"+creatNum+"','"+branch_id+"','"+specification+"','"+nextStartRow+"','"+limitValue+"','next')><img src='"+ctx+"/images/sts_5.png'></a>"
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
function goPage(product_name,product_identify,material_code,purchasing_company,contract_id,program_time,creatNum,branch_id,specification,
startValue,limitValue,isGo){
    $.ajax({
        url:ctx+"/queryCodes",
        data:{branch_id:branch_id,group_id:group_id,start:startValue,limit:limitValue},
        type : 'post',
        dataType : 'json',
        success:function(data){
            var count="" //总数
            var productInfos="" //保存data信息
            var tbodyList=""
            var bzNum
            count=data.count
            productInfos=data.codes
            for(var i=0;i<productInfos.length;i++){
                bzNum=Number(startValue)+i+1
                tbodyList+="<tr>"
                tbodyList+="<td>"+bzNum+"</td>"
                tbodyList+="<td>"+productInfos[i].code+"</td>"
                tbodyList+="<td>"+timeStamp2String(productInfos[i].program_time.$date)+"</td>"
                tbodyList+="<td>"+productInfos[i].purchasing_company+"</td>"
                tbodyList+="<td>"+productInfos[i].contract_id+"</td>"
                tbodyList+="<td>"+productInfos[i].material_code+"</td>"
                tbodyList+="<td>"+productInfos[i].product_name+"</td>"
                tbodyList+="<td>"+productInfos[i].specification+"</td>"
                tbodyList+="<td>"+productInfos[i].product_identify+"</td>"
                tbodyList+="</tr>"
            }
            $(".body_codeList_tbody").html(" ")
            $(".body_codeList_tbody").append(tbodyList)


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
                asButton+="<a class=clickCursor onclick=goPage('"+product_name+"','"+product_identify+"','"+material_code+"','"+purchasing_company+"','"+contract_id+"','"+program_time+"','"+creatNum+"','"+branch_id+"','"+specification+"','"+preStartRow+"','"+limitValue+"','pre')><img src='"+ctx+"/images/sts_4.png'></a>"
            }else{
                asButton+="<a><img src='"+ctx+"/images/sts_4.png'></a>"
            }
            asButton+="<p>"+pageNo+"/"+countPages+"</p>"
            if(countPages>pageNo){
                nextStartRow=pageNo*limitValue
                asButton+="<a class=clickCursor onclick=goPage('"+product_name+"','"+product_identify+"','"+material_code+"','"+purchasing_company+"','"+contract_id+"','"+program_time+"','"+creatNum+"','"+branch_id+"','"+preStartRow+"','"+nextStartRow+"','"+limitValue+"','next')><img src='"+ctx+"/images/sts_5.png'></a>"
            }else{
                asButton+="<a><img src='"+ctx+"/images/sts_5.png'></a>"
            }
            $(".listperAuth_button").html(" ")
            $(".listperAuth_button").append(asButton)
        }
    })
}
/*生成序列号*/
function generateCode(){
    var branch_id=$(".branch_id").val() //关联ID
    group_id//组ID
    //现在已经获取到了关联ID和组ID
}
/*清空序列号*/
function codeEmpty(){
    $.ajax({
        url:ctx+"/empty",
        data:{group_id:group_id},
        type:"post",
        success:function(data){
            if(data=="true"){
                $(".body_codeList_tbody").html()
                $(".qscp_body_codeList_button").removeClass("displayBlock").addClass("displayNo")
            }else{
                alert("删除失败")
            }
        }

    })
}

