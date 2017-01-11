/**
 * Created by Administrator on 2017/1/5.

 */

$(function(){
	$(".a_nm").removeClass("aNoClick").addClass("aClick")
	daSearch()
})
//通过条件搜索数据关联列表
function daSearch() {
    var startValue=0 //初始值
    var limitValue=10 //一次取出多少条数据
    var standard_v=$(".standard_v").val() //标准名称
    var nonstandard_v=$(".nonstandard_v").val() //非标准名称
    var mean_time_start=$(".createCode_date_start").val()
    var mean_time_end=$(".createCode_date_end").val()
    var type=0
    type=$(".assoic option:selected").val() //关联方式:0手动1自动
    var check=0  
    check=$(".check option:selected").val() //准确性:0未判别1准确2不准确
    var operator=$(".operator").val() //关联人
    var count="" //总数
    var means="" //保存data信息
    var tbodyList=""
    var bzNum
    $.ajax({
        url:ctx+'/query_mean',
        type:"post",
        data:{standard_v:standard_v,nonstandard_v:nonstandard_v,type:type,check:check,operator:operator,mean_time_start:mean_time_start,mean_time_end:mean_time_end,start:startValue,limit:limitValue},
        dataType:"json",
        success:function (datas) {
            count=datas.count
            means=datas.data
            if(means.length>0){
            	 for(var i=0;i<means.length;i++){
                     bzNum=Number(startValue)+i+1
                     tbodyList+="<tr>"
                     tbodyList+="<td><a class='noclickId' href='javascript:;' onclick='clickCodes(this)'><span>"+bzNum+"</span></td>"
                     tbodyList+="<td>"+means[i].standard_v+"</td>"
                     tbodyList+="<td>"+means[i].nonstandard_v+"</td>"
                     tbodyList+="<td>"+(means[i].type=='0'?'手动':'自动')+"</td>"
                     if(means[i].check==0){
                         tbodyList+="<td>"+'未判别'+"</td>"
                     }else if(means[i].check==1){
                         tbodyList+="<td>"+'准确'+"</td>"
                     }else{
                         tbodyList+="<td>"+'不准确'+"</td>"
                     }
                     tbodyList+="<td>"+timeStamp2String(means[i].mean_time.$date)+"</td>"
                     tbodyList+="<td>"+means[i].operator+"</td>"
                 }
                 $(".da_body").html("")
                 $(".da_body").append(tbodyList)

                 var pageCount=0 //总页数
                 pageCount=count/limitValue
                 $('.list_button').pagination({
                     totalData:count,
                     pageCount:pageCount,
                     showData:limitValue,         
                     jump:true,
                     coping:true,
                     count:2,
                     homePage:'首页',
                     endPage:'末页',
                     prevContent:'上页',
                     nextContent:'下页',
                     callback: pageCallback //pageCallback() 为翻页调用次函数。
                 });
            }else{
            	$(".da_body").html("")
                $(".da_body").append("<p>没有相应数据</p>")
                $('.list_button').html("")
            }
           
        }
    })
}


//分页回调函数
function pageCallback(api) {
  var limitValue=10 //一次取出多少条数据
  var pageNo=1 //当前页码
  if(api){
      pageNo=api.getCurrent()
  }
  var startValue=(pageNo-1)*limitValue //初始值

  var importer=$(".importPerson").val() //导入人
  var value=$(".maName").val() //名称
  var imp_time_start=$(".createCode_date_start").val() //开始日期
  var imp_time_end=$(".createCode_date_end").val() //结束日期
  var batch_id=$(".maBatch").val() //批次
  var source=$(".source option:selected").val() //数据来源
  var count="" //总数
  var standard="" //保存data信息
  var tbodyList=""
  var bzNum
  $.ajax({
      url:ctx+'/query_mean',
      type:"post",
      data:{standard_v:standard_v,nonstandard_v:nonstandard_v,type:type,check:check,operator:operator,mean_time_start:mean_time_start,mean_time_end:mean_time_end,start:startValue,limit:limitValue},
      dataType:"json",
      success:function (datas) {
          count=datas.count
          means=datas.data
          if(means.length>0){
          	 for(var i=0;i<means.length;i++){
                   bzNum=Number(startValue)+i+1
                   tbodyList+="<tr>"
                   tbodyList+="<td><a class='noclickId' href='javascript:;' onclick='clickCodes(this)'><span>"+bzNum+"</span></td>"
                   tbodyList+="<td>"+means[i].standard_v+"</td>"
                   tbodyList+="<td>"+means[i].nonstandard_v+"</td>"
                   tbodyList+="<td>"+(means[i].type=='0'?'手动':'自动')+"</td>"
                   if(means[i].check==0){
                       tbodyList+="<td>"+'未判别'+"</td>"
                   }else if(means[i].check==1){
                       tbodyList+="<td>"+'准确'+"</td>"
                   }else{
                       tbodyList+="<td>"+'不准确'+"</td>"
                   }
                   tbodyList+="<td>"+timeStamp2String(means[i].mean_time.$date)+"</td>"
                   tbodyList+="<td>"+means[i].operator+"</td>"
               }
               $(".da_body").html("")
               $(".da_body").append(tbodyList)

               var pageCount=0 //总页数
               pageCount=count/limitValue
               $('.list_button').pagination({
                   totalData:count,
                   pageCount:pageCount,
                   showData:limitValue,
                   current:pageNo,
                   jump:true,
                   coping:true,
                   count:2,
                   homePage:'首页',
                   endPage:'末页',
                   prevContent:'上页',
                   nextContent:'下页',
                   callback: pageCallback //pageCallback() 为翻页调用次函数。
               });
          }else{
              $(".da_body").html("")
              $(".da_body").append("<p>没有相应数据</p>")
              $('.list_button').html("")
          }
         
      }
  })
}




/*点击序号，如果背景是白的，就变成蓝色，如果是蓝色，就变成白色*/
function clickCodes(str){
    if($(str).hasClass("noclickId")){
        $(".noman_body a").removeClass("clickId").addClass("noclickId")
        $(str).removeClass("noclickId").addClass("clickId")
    }else{
        $(str).removeClass("clickId").addClass("noclickId")
    }
}

//时间格式化
function timeStamp2String(time){
    var datetime = new Date();
    datetime.setTime(time);
    var year = datetime.getFullYear();
    var month = datetime.getMonth() + 1 < 10 ? "0" + (datetime.getMonth() + 1) : datetime.getMonth() + 1;
    var date = datetime.getDate() < 10 ? "0" + datetime.getDate() : datetime.getDate();
    return year + "-" + month + "-" + date;
}