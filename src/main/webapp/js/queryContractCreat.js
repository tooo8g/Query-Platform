/**
 * Created by zb on 2016/3/7.
 */
$(function(){
    /*调整头部*/
    $(".nav ul li a").removeClass("colorClick").addClass("colorNoClick")
    $(".contract").removeClass("colorNoClick").addClass("colorClick")
})
/*新增订货明细，点击以后，订货明细列表增加*/
function qcti_od_add(){
  $(".qcti_orderDetails_tbody").append("<tr><td><input type='text'></td><td><input type='text'></td><td><input type='text'></td><td><input type='text'></td><td><input type='text'></td><td><input type='text'></td><td><input type='text'></td><td><input type='text'></td><td><a class='qcti_orderDetails_delete' onclick='qcti_orderDetails_delete(this)'>删除</a></td></tr>")
}
/*删除订货明细里面的列表*/
function qcti_orderDetails_delete(str){
    var trLength=$(".qcti_orderDetails_tbody tr").length //qcti_orderDetails_tbody里面的tr的个数
    /*通过判断tr的个数，如果tr大于10，则直接删除，如果等于10，则删除以后还要再加一个*/
    $(str).parent().parent().remove()
    if(trLength<=10){
        qcti_od_add()
    }

}

/*新增供货计划，点击以后，供货计划列表增加*/
function qcti_supplyPlan_add(){
    $(".qcti_supplyPlan_tbody").append("<tr><td><input type='text'></td><td><input type='text'></td><td><input type='text'></td><td><input type='text'></td><td><input type='text'></td><td><input type='text'></td><td><input type='text'></td><td><input type='text'></td><td><a class='qcti_supplyPlan_delete' onclick='qcti_supplyPlan_delete(this)'>删除</a></td></tr>")
}
/*删除供货计划里面的列表*/
function qcti_supplyPlan_delete(str){
    var trLength=$(".qcti_supplyPlan_tbody tr").length //qcti_supplyPlan_tbody里面的tr的个数
    /*通过判断tr的个数，如果tr大于10，则直接删除，如果等于10，则删除以后还要再加一个*/
    $(str).parent().parent().remove()
    if(trLength<=10){
        qcti_supplyPlan_add()
    }

}



/*保存
* 点击保存以后，table里面的input值收集起来*/
function qcti_od_sp_preservation(){
    var flag=true //用来判断每行tr是否有空白input
    var inputValue="" //保存input值
    var trInputVal="" //用来保存每组tr的input
    var tableVal=[] //总的input val
    var orderOrCont="" //保存列表里面的东西
    $(".qcti_orderDetails_tbody tr").each(function(){
       $(this).find("input").each(function(){
           inputValue=$(this).val()
          if(inputValue==undefined || inputValue=="" || inputValue==null) {
              flag=false
          }
           if(!flag){
               return false
           }
       })
        if(flag){
            trInputVal={"material_code":""+$(this).find("input").eq(0).val()+"","material_name":""+$(this).find("input").eq(1).val()+"","specification":""+$(this).find("input").eq(2).val()+"","measurement":""+$(this).find("input").eq(3).val()+"","num":""+$(this).find("input").eq(4).val()+"","price":""+$(this).find("input").eq(5).val()+"","total_price":""+$(this).find("input").eq(6).val()+"","company":""+$(this).find("input").eq(7).val()+""}
            tableVal.push(trInputVal)
        }else{
            return false
        }
   })

    var flagsu=true //用来判断每行tr是否有空白input
    var inputValuesu="" //保存input值
    var trInputValsu="" //用来保存每组tr的input
    var tableValsu=[] //总的input val
    $(".qcti_supplyPlan_tbody tr").each(function(){
        $(this).find("input").each(function(){
            inputValuesu=$(this).val()
            if(inputValuesu==undefined || inputValuesu=="" || inputValuesu==null) {
                flagsu=false
            }
            if(!flagsu){
                return false
            }
        })
        if(flagsu){
            trInputValsu={"material_code":""+$(this).find("input").eq(0).val()+"","material_name":""+$(this).find("input").eq(1).val()+"","specification":""+$(this).find("input").eq(2).val()+"","measurement":""+$(this).find("input").eq(3).val()+"","num":""+$(this).find("input").eq(4).val()+"","supply_time":""+$(this).find("input").eq(5).val()+"","address":""+$(this).find("input").eq(6).val()+"","person":""+$(this).find("input").eq(7).val()+"","product_identify":""+$(this).find("input").eq(8).val()+""}
            console.log(trInputValsu)
            tableValsu.push(trInputValsu)
        }else{
            return false
        }
    })
    var company_name="" //企业名称
    company_name=$(".content_company_name").val()
    var contract_id="" //订单号/合同号
    contract_id=$(".content_contract_id").val()
    var purchasing_company="" //采购单位
    purchasing_company=$(".content_purchasing_company").val()
    orderOrCont={"company_name":""+company_name+"","contract_id":""+contract_id+"","purchasing_company":""+purchasing_company+"","purchasing":tableVal,"supply":tableValsu}
    var orderOrContracts="" //保存的JSON
    orderOrContracts=JSON.stringify(orderOrCont)
    $.ajax({
        url:"../addOrderOrContract",
        type:"post",
        data:orderOrContracts,
        contentType:"application/json",
        dataType:"json",
        success:function(data){

        }
    })
}