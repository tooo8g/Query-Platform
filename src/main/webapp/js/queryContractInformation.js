/**
 * Created by zb on 2016/3/4.
 */
$(function(){
    /*改变头部的css*/
    $(".guanliUl").removeClass("displayBlock").addClass("displayNo")
    $(".codeUl").removeClass("displayNo").addClass("displayBlock")

    /*调整头部*/
    $(".nav ul li a").removeClass("colorClick").addClass("colorNoClick")
    $(".contract").removeClass("colorNoClick").addClass("colorClick")

    /*打开页面。获取contract_id;//订单、合同号，把这个传到后台，把返回的东西显示到页面*/
    var _id=$("._id").val() //订单/合同号
    
    $.ajax({
        url:ctx+"/queryOrderOrContractDetail",
        type:"post",
        data:{_id:_id},
        dataType:"json",
        success:function(data){
            var contractJson=data //保存json
            var purchasing=contractJson.purchasing //订单明细表
            var supply=contractJson.supply //供货计划
            var company_name=contractJson.bzxx.company_name //企业名称
            var contract_id = contractJson.bzxx.contract_id//合同订单号id
            var purchasing_company=contractJson.bzxx.purchasing_company //采购单位
            var access=$(".access").val()
            //给企业名称  订单号/合同号 采购单位 赋值
            $(".content_company_name").val(company_name)
            $(".content_contract_id").val(contract_id)
            $(".content_purchasing_company").val(purchasing_company)
            //给订货明细表赋值
            var qcti_orderDetails_table=""  //qcti_orderDetails_table里的值
            var qcti_orderDetails_thead="" //qcti_orderDetails_thead里的值
            var purchasingTbodyList="" //qcti_orderDetails_tbody里面的东西
            	if(access=="read"){
            		     qcti_orderDetails_thead+="<tr>"
                         qcti_orderDetails_thead+="<td>物资编号</td>"
                         qcti_orderDetails_thead+="<td>物资名称</td>"
                         qcti_orderDetails_thead+="<td>规格型号</td>"
                         qcti_orderDetails_thead+="<td>计量单位</td>"
                         qcti_orderDetails_thead+="<td>产品标示代码</td>"
                         qcti_orderDetails_thead+="<td>供货数量</td>"
                         qcti_orderDetails_thead+="<td>单价(元)</td>"
                         qcti_orderDetails_thead+="<td>总价(元)</td>"
                         qcti_orderDetails_thead+="<td width='200'>生产厂家</td>"
                         qcti_orderDetails_thead+="</tr>"
                     for(var i=0;i<purchasing.length;i++){
	            		purchasingTbodyList+="<tr>"
		                purchasingTbodyList+="<td>"+purchasing[i].material_code+"</td>"
		                purchasingTbodyList+="<td>"+purchasing[i].material_name+"</td>"
		                purchasingTbodyList+="<td>"+purchasing[i].specification+"</td>"
		                purchasingTbodyList+="<td>"+purchasing[i].measurement+"</td>"
                        purchasingTbodyList+="<td>"+purchasing[i].product_code+"</td>"
		                purchasingTbodyList+="<td>"+purchasing[i].num+"</td>"
		                purchasingTbodyList+="<td>"+purchasing[i].price+"</td>"
		                purchasingTbodyList+="<td>"+purchasing[i].total_price+"</td>"
		                purchasingTbodyList+="<td>"+purchasing[i].company+"</td>"
		                purchasingTbodyList+="</tr>"
                     } 	
            	}else{
            		   qcti_orderDetails_thead+="<tr>"
                           qcti_orderDetails_thead+="<td>物资编号</td>"
                           qcti_orderDetails_thead+="<td>物资名称</td>"
                           qcti_orderDetails_thead+="<td>规格型号</td>"
                           qcti_orderDetails_thead+="<td>计量单位</td>"
                           qcti_orderDetails_thead+="<td>产品标示代码</td>"
                           qcti_orderDetails_thead+="<td>供货数量</td>"
                           qcti_orderDetails_thead+="<td>单价(元)</td>"
                           qcti_orderDetails_thead+="<td>总价(元)</td>"
                           qcti_orderDetails_thead+="<td width='200'>生产厂家</td>"
                           qcti_orderDetails_thead+="<td>操作</td>"
                           qcti_orderDetails_thead+="</tr>"
            		  for(var i=0;i<purchasing.length;i++){                
		                    purchasingTbodyList+="<tr>"
		                    purchasingTbodyList+="<td>"+purchasing[i].material_code+"</td>"
		                    purchasingTbodyList+="<td>"+purchasing[i].material_name+"</td>"
		                    purchasingTbodyList+="<td>"+purchasing[i].specification+"</td>"
		                    purchasingTbodyList+="<td>"+purchasing[i].measurement+"</td>"
                            purchasingTbodyList+="<td>"+purchasing[i].product_code+"</td>"
		                    purchasingTbodyList+="<td>"+purchasing[i].num+"</td>"
		                    purchasingTbodyList+="<td>"+purchasing[i].price+"</td>"
		                    purchasingTbodyList+="<td>"+purchasing[i].total_price+"</td>"
		                    purchasingTbodyList+="<td>"+purchasing[i].company+"</td>"
		                    purchasingTbodyList+="<td><a onclick=goQuerySerialCreatec('"+purchasing[i]._id.$oid+"','"+company_name+"','"+contract_id+"','"+purchasing_company+"')>编制序列号</a></td>"
		                   /* purchasingTbodyList+="<td><a href='"+ctx+"/serial/querySerialCreatec?_id="+purchasing[i]._id.$oid+"&company_name="+company_name+"&contract_id="+contract_id+"&purchasing_company="+purchasing_company+"'>编制序列号</a></td>"*/
		                    purchasingTbodyList+="</tr>"
            		  } 	
            	}
            $(".qcti_orderDetails_thead").html("")
            $(".qcti_orderDetails_thead").append(qcti_orderDetails_thead)
            $(".qcti_orderDetails_tbody").html("")
            $(".qcti_orderDetails_tbody").append(purchasingTbodyList)

            //给供货计划赋值
            var supplyPlanTbodyList="" //qcti_supplyPlan_tbody里面的值
            for(var i=0;i<supply.length;i++) {
                supplyPlanTbodyList += "<tr>"
                supplyPlanTbodyList += "<td>" + supply[i].material_code + "</td>"
                supplyPlanTbodyList += "<td>" + supply[i].material_name + "</td>"
                supplyPlanTbodyList += "<td>" + supply[i].specification + "</td>"
                supplyPlanTbodyList += "<td>" + supply[i].measurement + "</td>"
                supplyPlanTbodyList += "<td>" + supply[i].num + "</td>"
                supplyPlanTbodyList += "<td>" + supply[i].supply_time + "</td>"
                supplyPlanTbodyList += "<td>" + supply[i].address + "</td>"
                supplyPlanTbodyList += "<td>" + supply[i].person + "</td>"
                //if(supply[i].code_num==0){
                //    supplyPlanTbodyList+="<td><a href='"+ctx+"/serial/querySerialCreatec?contract_id="+contract_id+"&_id="+supply[i]._id.$oid+"'>编制序列号</a></td>"
                //}else{
                //   supplyPlanTbodyList+="<td><a href='"+ctx+"/serial/querySerialNumSearch?_id="+supply[i]._id.$oid+"'>查看详情</a></td>"
                //}
                supplyPlanTbodyList+="</tr>"
            }
            $(".qcti_supplyPlan_tbody").html("")
            $(".qcti_supplyPlan_tbody").append(supplyPlanTbodyList)
        }
    })
    
    
    
  //设置命名空间
    var CodeSTD = window.CodeSTD || {};

    window.CodeSTD = CodeSTD; 

    /**
     * 创建Form表单
     * @author 王成委
     * @param config Object
     *  <p>url:form的Action，提交的后台地址</p>
     *  <p>method:使用POST还是GET提交表单</p>
     *  <p>params:参数 K-V</p>
     * @return Form
     */
    CodeSTD.form = function(config){
        config = config || {};

        var url = config.url,
            method = config.method || 'GET',
            params = config.params || {};

        var form = document.createElement('form');
        form.action = url;
        form.method = method;
        form.target = "_self";

        for(var param in params){
            var value = params[param],
                input = document.createElement('input');

            input.type = 'hidden';
            input.name = param;
            input.value = value;

            form.appendChild(input);
        }

        return form;
    }
 })

 
 function goQuerySerialCreatec(_id,company_name,contract_id,purchasing_company){

    var form = new CodeSTD.form({
        url:ctx+'/serial/querySerialCreatec',
        method:'POST',
        target:"_blank",
        params:{
        	_id:_id,
        	company_name:company_name,
        	contract_id:contract_id,
        	purchasing_company:purchasing_company
        }
    })

    $(form).submit();
    form = null;
}













