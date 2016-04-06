/**
 * Created by zb on 2016/2/29.
 */

$(function(){
    /*打开页面，自动调用下面的方法，把相关信息放到biiLis_tbody里面*/
    search_purchase_button()

    /*fileStatus_a里面的a的方法*/
    $(".industryList a").on("click",function(){
        $(".industryList a").removeClass("colorWhite").addClass("colorBule")
        $(this).removeClass("colorBule").addClass("colorWhite")
    })
})


/*
 * 页码跳转
 * isGo判断是next还是pre
 * */
function goPage(str,industry,start,limit,isGo){
    $(".purchase_tbody").html("")
    $(".listperAuth_button").html("")
    var tbodyList="" //保存解析的数据
    var count //保存总条数
    var bzxx //保存json的bzxx里的数据
    var bzNum //标记
    $.ajax({
        url:ctx+"/queryPurchase_bidding",
        data:{str:str,industry:industry,start:start,limit:limit},
        type : 'post',
        dataType : 'json',
        success:function(data){
            count=data.count
            bzxx=data.bzxx
            for(var i=0;i<bzxx.length;i++){
                bzNum=Number(start)+i+1
                tbodyList+="<tr>"
                tbodyList+="<td>"+bzNum+"</td>"
                tbodyList+="<td>"+bzxx[i].purchaseOrderNo+"</td>"
                tbodyList+="<td title='"+bzxx[i].purchaserName+"'>"+bzxx[i].purchaserName+"</td>"
                tbodyList+="<td title='"+bzxx[i].purchaserCompany+"'>"+bzxx[i].purchaserCompany+"</td>"
                tbodyList+="<td title='"+bzxx[i].announcementType+"'>"+bzxx[i].announcementType+"</td>"
                tbodyList+="<td title='"+bzxx[i].purchaserVariety+"'>"+bzxx[i].purchaserVariety+"</td>"
                tbodyList+="<td title='"+bzxx[i].purchaserArea+"'>"+bzxx[i].purchaserArea+"</td>"
                tbodyList+="<td>"+bzxx[i].industry+"</td>"
                tbodyList+="<td>"+timeStamp2String(bzxx[i].publishTime.$date)+"</td>"
                tbodyList+="<td title='"+bzxx[i].address+"'><a>"+bzxx[i].dataSource+"</a></td>"
                tbodyList+="</tr>"
            }
            $(".purchase_tbody").append(tbodyList)

            var plButton=""
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
                plButton+="<a class=clickCursor onclick=goPage('"+str+"','"+industry+"','"+preStartRow+"','"+limitValue+"','pre')><img src='"+ctx+"/images/sts_4.png'></a>"
            }else{
                plButton+="<a><img src='"+ctx+"/images/sts_4.png'></a>"
            }
            plButton+="<p>"+pageNo+"/"+countPages+"</p>"
            if(countPages>pageNo){
                nextStartRow=pageNo*limitValue
                plButton+="<a class=clickCursor onclick=goPage('"+str+"','"+industry+"','"+nextStartRow+"','"+limitValue+"','next')><img src='"+ctx+"/images/sts_5.png'></a>"
            }else{
                plButton+="<a><img src='"+ctx+"/images/sts_5.png'></a>"
            }
            $(".listperAuth_button").append(plButton)
        }
    })
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

//搜索
function search_purchase_button(){
    $(".purchase_tbody").html("")
    $(".listperAuth_button").html("")
    var str=$(".serInput").val() //搜索框里的值
    var industry //所属行业
    $(".industryList a").each(function(){
        if($(this).hasClass("colorWhite")){
            industry= $(this).text().trim()
            if(industry=="不限"){
                industry=""
            }
        }
    })
    var startValue=0 //初始值
    var limitValue=10 //一次取出多少条数据
    var tbodyList="" //保存解析的数据
    var count //保存总条数
    var bzxx //保存json的bzxx里的数据
    var bzNum //标记
    $.ajax({
            url:ctx+"/queryPurchase_bidding",
            data:{str:str,industry:industry,start:startValue,limit:limitValue},
            type : 'post',
            dataType : 'json',
            success:function(data){
                count=data.count
                bzxx=data.bzxx
                for(var i=0;i<bzxx.length;i++){
                    bzNum=startValue+i+1
                    tbodyList+="<tr>"
                    tbodyList+="<td>"+bzNum+"</td>"
                    tbodyList+="<td>"+bzxx[i].purchaseOrderNo+"</td>"
                    tbodyList+="<td title='"+bzxx[i].purchaserName+"'>"+bzxx[i].purchaserName+"</td>"
                    tbodyList+="<td title='"+bzxx[i].purchaserCompany+"'>"+bzxx[i].purchaserCompany+"</td>"
                    tbodyList+="<td title='"+bzxx[i].announcementType+"'>"+bzxx[i].announcementType+"</td>"
                    tbodyList+="<td title='"+bzxx[i].purchaserVariety+"'>"+bzxx[i].purchaserVariety+"</td>"
                    tbodyList+="<td title='"+bzxx[i].purchaserArea+"'>"+bzxx[i].purchaserArea+"</td>"
                    tbodyList+="<td>"+bzxx[i].industry+"</td>"
                    tbodyList+="<td>"+timeStamp2String(bzxx[i].publishTime.$date)+"</td>"
                    tbodyList+="<td title='"+bzxx[i].address+"'><a>"+bzxx[i].dataSource+"</a></td>"
                    tbodyList+="</tr>"
                }
                $(".purchase_tbody").append(tbodyList)

                //分页
                var asButton=""
                var countPages=Math.ceil(count/limitValue)
                var pageNo=0  //当前页码
                if(startValue==0){
                    pageNo=1
                }
                $(".pageNo").val(pageNo)
                var nextStartRow//下一页开始显示的编号
                asButton+="<a><img src='"+ctx+"/images/sts_4.png'></a>"
                asButton+="<p>"+pageNo+"/"+countPages+"</p>"
                if(countPages>1){
                    nextStartRow=pageNo*limitValue
                    asButton+="<a class=clickCursor onclick=goPage('"+str+"','"+industry+"','"+nextStartRow+"','"+limitValue+"','next')><img src='"+ctx+"/images/sts_5.png'></a>"
                }else{
                    asButton+="<a><img src='"+ctx+"/images/sts_5.png'></a>"
                }
                $(".listperAuth_button").append(asButton)
            }
        }
    )
}