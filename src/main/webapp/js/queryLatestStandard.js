/**
 * Created by zb on 2016/1/14.
 */


$(function(){
    /*
     * 页面刚打开时，通过ajax方法，请求后台，返回相应数据，将其动态加入si_tbody中
     *
     * */
    var str="" //搜索框里的值
    var startValue=0 //初始值
    var limitValue=10 //一次取出多少条数据
    var tbodyList="" //保存解析的数据
    var count //保存总条数
    var bzxx //保存json的bzxx里的数据
    var bzNum //条数
    $.ajax({
        url:"../queryLatestStandard",
        data:{str:str,start:startValue,limit:limitValue},
        type:"post",
        dataType:"json",
        success:function(data){
            count=data.count
            bzxx=data.bzxx
            for(var i=0;i<bzxx.length;i++){
                bzNum=Number(startValue)+i+1
                tbodyList+="<tr>"
                tbodyList+="<td>"+bzNum+"</td>"
                tbodyList+="<td>"+bzxx[i].standard_group+"</td>"
                tbodyList+="<td>"+bzxx[i].standard_id+"</td>"
                tbodyList+="<td title='"+bzxx[i].standard_name+"'>"+bzxx[i].standard_name+"</td>"
                tbodyList+="<td>"+bzxx[i].replace_id+"</td>"
                tbodyList+="<td>"+timeStamp2String(bzxx[i].publish_date.$date)+"</td>"
                tbodyList+="<td>"+timeStamp2String(bzxx[i].execute_date.$date)+"</td>"
                tbodyList+="<td>"+bzxx[i].standard_status+"</td>"
                tbodyList+="<td>"+bzxx[i].special_subject+"</td>"
                tbodyList+="</tr>"
            }
            $(".si_tbody").append(tbodyList)

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
        },
        error:function(){
            alert("链接错误")
        }
    })
})


/*
 *  搜索按钮
 *  在搜索框写入值，点击搜索按钮
 * */
function search_si_button(){
    $(".si_tbody").html("")
    $(".listperAuth_button").html("")
    var str=$(".serInput").val() //搜索框里的值
    var startValue=0 //初始值
    var limitValue=10 //一次取出多少条数据
    var tbodyList="" //保存解析的数据
    var count //保存总条数
    var bzxx //保存json的bzxx里的数据
    var bzNum //标记
    $.ajax({
            url:"../queryLatestStandard",
            data:{str:str,start:startValue,limit:limitValue},
            type : 'post',
            dataType : 'json',
            success:function(data){
                count=data.count
                bzxx=data.bzxx
                for(var i=0;i<bzxx.length;i++){
                    bzNum=startValue+i+1
                    tbodyList+="<tr>"
                    tbodyList+="<td>"+bzNum+"</td>"
                    tbodyList+="<td>"+bzxx[i].standard_group+"</td>"
                    tbodyList+="<td>"+bzxx[i].standard_id+"</td>"
                    tbodyList+="<td title='"+bzxx[i].standard_name+"'>"+bzxx[i].standard_name+"</td>"
                    tbodyList+="<td>"+bzxx[i].replace_id+"</td>"
                    tbodyList+="<td>"+timeStamp2String(bzxx[i].publish_date.$date)+"</td>"
                    tbodyList+="<td>"+timeStamp2String(bzxx[i].execute_date.$date)+"</td>"
                    tbodyList+="<td>"+bzxx[i].standard_status+"</td>"
                    tbodyList+="<td>"+bzxx[i].special_subject+"</td>"
                    tbodyList+="</tr>"
                }
                $(".si_tbody").append(tbodyList)

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

/*
* 页码跳转
* isGo判断是next还是pre
* */
function goPage(str,start,limit,isGo){
    $(".si_tbody").html("")
    $(".listperAuth_button").html("")
    var tbodyList="" //保存解析的数据
    var count //保存总条数
    var bzxx //保存json的bzxx里的数据
    var bzNum //标记
    $.ajax({
        url:"../queryLatestStandard",
        data:{str:str,start:start,limit:limit},
        type : 'post',
        dataType : 'json',
        success:function(data){
            count=data.count
            bzxx=data.bzxx
            for(var i=0;i<bzxx.length;i++){
                bzNum=Number(start)+i+1
                tbodyList+="<tr>"
                tbodyList+="<td>"+bzNum+"</td>"
                tbodyList+="<td>"+bzxx[i].standard_group+"</td>"
                tbodyList+="<td>"+bzxx[i].standard_id+"</td>"
                tbodyList+="<td title='"+bzxx[i].standard_name+"'>"+bzxx[i].standard_name+"</td>"
                tbodyList+="<td>"+bzxx[i].replace_id+"</td>"
                tbodyList+="<td>"+timeStamp2String(bzxx[i].publish_date.$date)+"</td>"
                tbodyList+="<td>"+timeStamp2String(bzxx[i].execute_date.$date)+"</td>"
                tbodyList+="<td>"+bzxx[i].standard_status+"</td>"
                tbodyList+="<td>"+bzxx[i].special_subject+"</td>"
                tbodyList+="</tr>"
            }
            $(".si_tbody").append(tbodyList)

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

//时间格式化
function timeStamp2String(time){
    var datetime = new Date();
    datetime.setTime(time);
    var year = datetime.getFullYear();
    var month = datetime.getMonth() + 1 < 10 ? "0" + (datetime.getMonth() + 1) : datetime.getMonth() + 1;
    var date = datetime.getDate() < 10 ? "0" + datetime.getDate() : datetime.getDate();
    return year + "-" + month + "-" + date;
}
