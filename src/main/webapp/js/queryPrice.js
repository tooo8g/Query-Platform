/**
 * Created by zb on 2016/1/19.
 */
var list_json=""; //保存目录列表的json
var jsonData=""; //保存物资数据的json
var jsonDetailsData="" //相情页面的json
$(function(){
    /*改变头部的css*/
    $(".guanliUl").removeClass("displayBlock").addClass("displayNo")
    $(".codeUl").removeClass("displayNo").addClass("displayBlock")

    /*修改头部的css*/
    $(".nav li a").removeClass("colorClick").addClass("colorNoClick")
    $(".seniorSearchSpan").removeClass("colorNoClick").addClass("colorClick")


    allCityList('regionSelect_city')
    /*
     * 进去页面，自动调此方法，获取左边的目录
     * */
    $.ajax({
        url:ctx+"/queryPriceMenu",
        type:"post",
        dataType:"json",
        success:function(data){
            var list_content="" //保存目录列表
            list_json=data
            var dataChilds
            dataChilds=list_json.childs
            for(var i=0;i<dataChilds.length;i++){
                list_content+="<li class='list_content"+i+" colorNoClickLi' onclick=showChilds("+i+")>"+dataChilds[i].name+"</li>"
            }
            $(".list_content").append(list_content)
        }
    })
    //给目录添加click事件
    $(".itemShowList").on("click","a",function() {
        $(".itemShow a").removeClass("colorClick").addClass("colorNoClick")
        $(".itemShow a img").attr("src",""+ctx+"/images/as_2.png")
        $(this).removeClass("colorNoClick").addClass("colorClick")
        $(this).find("img").attr("src",""+ctx+"/images/as_3.png")
        var list_num = $(this).attr("num");
        var itemShowList_data=list_json.childs[0].childs[list_num].childs
        var num=1;

        for(var i = $(".itemShow .showItem").length;i > 0 ;i-- ){
            if($(".itemShow .showItem").eq(i).attr("class_num") > $(this).parent().parent().attr("class_num") ){
                $(".itemShow .showItem").eq(i).remove();
            }
        };
        if(itemShowList_data){
            $(".itemShow").append("<div class='itemShowList"+num+" showItem'></div>");
            $(".itemShowList"+num).append("<div class='mulluShow"+num+" mulluShowSh' name='mulluShowSh'></div>")
            $(".itemShowList"+num).append("<div id='scrollShow"+num+"' class='scrollShow'><div id='scrollSh"+num+"' class='scrollSh'></div></div>");
            $(".itemShowList" + num).attr("class_num", 1);
            itemShowList($(".mulluShow" + num), itemShowList_data);
            mousewheel_fn("itemShowList" + num,"mulluShow" + num,"scrollShow"+num,"scrollSh"+num)
        }else{
            thisText=$(this).find("p").html()
            itemShowButton(thisText)
        };
    })

    /*
     * 打开页面。调用方法，获取右边信息列表
     * */
    var startValue=0 //初始值
    var limitValue=10 //一次取出多少条数据
    var price_Data=""
    var wuziName=""
    var citySelect=""
    var specification=""
    $.ajax({
        url:ctx+"/queryPrice",
        data:{date:price_Data,name:wuziName,city:citySelect,specification:specification,start:startValue,limit:limitValue},
        type:"post",
        dataType:"json",
        success:function(data){
            jsonData=data
            var trList=""  //保存获取的数据
            var jgxx=data.jgxx  //返回的json里面的jgxx数据
            var count=data.count //总条数
            var bzNum
            for(var i=0;i<jgxx.length;i++){
            	bzNum=Number(startValue)+i+1
                trList+="<tr>"
                trList+="<td>"+bzNum+"</td>"
                trList+="<td>"+jgxx[i].name+"</td>"
                trList+="<td>"+jgxx[i].specification+"</td>"
                trList+="<td>"+jgxx[i].texture+"</td>"
                trList+="<td>"+jgxx[i].company+"</td>"
                trList+="<td>"+jgxx[i].area+"</td>"
                trList+="<td>"+jgxx[i].city+"</td>"
                trList+="<td>"+timeStamp2String(jgxx[i].update_time.$date)+"</td>"
                trList+="<td>"+jgxx[i].price+"</td>"
                trList+="<td>"+jgxx[i].priceType+"</td>"
                if(jgxx[i].price_range>=0){
                    trList+="<td><p class='colorRed'>"+'↑'+jgxx[i].price_range+"</p></td>"
                }else{
                    trList+="<td><p class='colorGreen'>"+'↓'+jgxx[i].price_range+"</p></td>"
                }

                trList+="<td><a id=priSel_"+jgxx[i]._id.$oid+" class='priSeldetails colorHui' onclick=priSel_details('"+jgxx[i]._id.$oid+"')>详情</a></td>"
                trList+="<td>"+jgxx[i].expand+"</td>"
                trList+="</tr>"
            }
            $(".jg_tbody").html(" ")
            $(".jg_tbody").append(trList)


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
                asButton+="<a class=clickCursor onclick=goPage('"+price_Data+"','"+wuziName+"','"+citySelect+"','"+specification+"','"+nextStartRow+"','"+limitValue+"','next')><img src='"+ctx+"/images/sts_5.png'></a>"
            }else{
                asButton+="<a><img src='"+ctx+"/images/sts_5.png'></a>"
            }
            $(".listperAuth_button").append(asButton)
        },
        error:function(){
            alert("链接失败")
        }
    })


    /*给body绑定一个click事件，点击itemShow之外的地方，调用closeItemShow方法 */
    $("body").click(function(event){
        var evt = event.srcElement ? event.srcElement : event.target;
        if(evt.getAttribute("name")!="mulluShowSh"&&evt.id!="itemShow"&&evt.tagName!="LI"&&evt.className!="clas"&&evt.tagName!="A"&&evt.tagName!="P"&&evt.tagName!="IMG"){
            closeItemShow()
        }
    });
})

/*
 * 点击目录，显示它下面的childs
 * */

function showChilds(str){
    $(".list_content li").removeClass("colorClick").addClass("colorNoClickLi")
    $(".list_content"+str).removeClass("colorNoClickLi").addClass("colorClick")
    $(".itemShow").removeClass("displayNo").addClass("displayBlock");
    for(var i = $(".itemShow .showItem").length;i >=0 ;i-- ){
        if($(".itemShow .showItem").eq(i).attr("class_num") == 0 ){
            $(".itemShow .showItem").eq(i).html("");
        }
        else{
            $(".itemShow .showItem").eq(i).remove();
        }
    }
    $(".itemShowList").append("<div class='mulluShowSh' name='mulluShowSh'></div><div id='scrollShow' class='scrollShow'> <div id='scrollSh' class='scrollSh'></div></div>")
    var muluJson //目录JSON
    muluJson = list_json.childs[str].childs
    $(".mulluShowSh").html("")
    for (var i = 0; i < muluJson.length; i++) {
        $(".mulluShowSh").append("<a href='javaScript:;' class='clas colorNoClick' num='"+i+"'><p>"+muluJson[i].name+"</p><img src='"+ctx+"/images/as_2.png'></a>")
    }

    var sihHeight=$("#itemShow").height()
    $(".jq_message_content").height(sihHeight+135)
    mousewheel_fn('itemShowList','mulluShowSh','scrollShow','scrollSh')

}

//获取二 三级目录
function itemShowList(append_dom,data){
    var thisText //当前点击对象的text值
    if (data) {
        append_dom.html("");
        for (var i = 0; i < data.length; i++) {
            append_dom.append("<a href='javaScript:;' class='clas colorNoClick' num='"+i+"'><p>"+data[i].name+"</p><img src='"+ctx+"/images/as_2.png'></a>")
        };
        append_dom.on("click","a",function() {
            $(this).parent().find("a").removeClass("colorClick").addClass("colorNoClick")
            $(this).parent().find("a").find("img").attr("src",""+ctx+"/images/as_2.png")
            $(this).removeClass("colorNoClick").addClass("colorClick")
            $(this).find("img").attr("src",""+ctx+"/images/as_3.png")

            list_n = $(this).attr("num");
            var itemShowList_data=data[list_n].childs;
            class_num = parseInt(append_dom.parent().attr("class_num")) + 1 ;

            for(var i = $(".itemShow .showItem").length;i > 0 ;i-- ){
                if($(".itemShow .showItem").eq(i).attr("class_num") > $(this).parent().parent().attr("class_num") ){
                    $(".itemShow .showItem").eq(i).remove();
                }
            };
            if(itemShowList_data){
                $(".itemShow").append("<div class='itemShowList"+class_num+" showItem'></div>");
                $(".itemShowList"+class_num).append("<div class='mulluShow"+class_num+" mulluShowSh' name='mulluShowSh'></div>")
                $(".itemShowList"+class_num).append("<div id='scrollShow"+class_num+"' class='scrollShow'><div id='scrollSh"+class_num+"' class='scrollSh'></div></div>");
                $(".itemShowList" + class_num).attr("class_num", class_num);
                itemShowList($(".mulluShow"+class_num),itemShowList_data);
                mousewheel_fn("itemShowList" + class_num,"mulluShow" + class_num,"scrollShow"+class_num,"scrollSh"+class_num)
            }else{
            	 thisText=$(this).find("p").html()
                itemShowButton(thisText)
            };
        });
    }
}


/*目录提交  str为点击的目录的值
 * date 价格日期
 * */
function itemShowButton(str){
    closeItemShow()
    var startValue=0 //初始值
    var limitValue=10 //一次取出多少条数据
    var price_Data=""
    var citySelect=""
    var specification=""
    $.ajax({
            url: ctx+'/queryPrice',
            data:{date:price_Data,name:str,city:citySelect,specification:specification,start:startValue,limit:limitValue},
            type : 'post',
            dataType : 'json',
            success:function(data){
                jsonData=data
                var trList=""  //保存获取的数据
                var jgxx=data.jgxx  //返回的json里面的jgxx数据
                var count=data.count //总条数
                var bzNum
                $(".wuziName").val(str)
                for(var i=0;i<jgxx.length;i++){
                	bzNum=Number(startValue)+i+1
                    trList+="<tr>"
                    trList+="<td>"+bzNum+"</td>"
                    trList+="<td>"+jgxx[i].name+"</td>"
                    trList+="<td>"+jgxx[i].specification+"</td>"
                    trList+="<td>"+jgxx[i].texture+"</td>"
                    trList+="<td>"+jgxx[i].company+"</td>"
                    trList+="<td>"+jgxx[i].area+"</td>"
                    trList+="<td>"+jgxx[i].city+"</td>"
                    trList+="<td>"+timeStamp2String(jgxx[i].update_time.$date)+"</td>"
                    trList+="<td>"+jgxx[i].price+"</td>"
                    trList+="<td>"+jgxx[i].priceType+"</td>"
                    if(jgxx[i].price_range>=0){
                        trList+="<td><p class='colorRed'>"+'↑'+jgxx[i].price_range+"</p></td>"
                    }else{
                        trList+="<td><p class='colorGreen'>"+'↓'+jgxx[i].price_range+"</p></td>"
                    }

                    trList+="<td><a id=priSel_"+jgxx[i]._id.$oid+" class='priSeldetails colorHui' onclick=priSel_details('"+jgxx[i]._id.$oid+"')>详情</a></td>"
                    trList+="<td>"+jgxx[i].expand+"</td>"
                    trList+="</tr>"
                }
                $(".jg_tbody").html(" ")
                $(".jg_tbody").append(trList)


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
                    asButton+="<a class=clickCursor onclick=goPage('"+price_Data+"','"+str+"','"+citySelect+"','"+specification+"','"+nextStartRow+"','"+limitValue+"','next')><img src='"+ctx+"/images/sts_5.png'></a>"
                }else{
                    asButton+="<a><img src='"+ctx+"/images/sts_5.png'></a>"
                }
                $(".listperAuth_button").html(" ")
                $(".listperAuth_button").append(asButton)
            },
            error:function(){
                alert("链接失败")
            }
        }
    )
}

//页码跳转
function goPage(date,name,citySelect,specification,start,limit,isGo){
    $(".listperAuth_button").html("")
    $.ajax({
        url: ctx+'/queryPrice',
        data:{date:date,name:name,city:citySelect,specification:specification,start:start,limit:limit},
        type : 'post',
        async:"false",
        dataType : 'json',
        success:function(data){
            var trList=""  //保存获取的数据
            var jgxx=data.jgxx  //返回的json里面的jgxx数据
            var count=data.count //总条数
            var bzNum=""
            for(var i=0;i<jgxx.length;i++){
            	bzNum=Number(start)+i+1
                trList+="<tr>"
                trList+="<td>"+bzNum+"</td>"
                trList+="<td>"+jgxx[i].name+"</td>"
                trList+="<td>"+jgxx[i].specification+"</td>"
                trList+="<td>"+jgxx[i].texture+"</td>"
                trList+="<td>"+jgxx[i].company+"</td>"
                trList+="<td>"+jgxx[i].area+"</td>"
                trList+="<td>"+jgxx[i].city+"</td>"
                trList+="<td>"+timeStamp2String(jgxx[i].update_time.$date)+"</td>"
                trList+="<td>"+jgxx[i].price+"</td>"
                trList+="<td>"+jgxx[i].priceType+"</td>"
                if(jgxx[i].price_range>=0){
                    trList+="<td><p class='colorRed'>"+'↑'+jgxx[i].price_range+"</p></td>"
                }else{
                    trList+="<td><p class='colorGreen'>"+'↓'+jgxx[i].price_range+"</p></td>"
                }

                trList+="<td><a id=priSel_"+jgxx[i]._id.$oid+" class='priSeldetails colorHui' onclick=priSel_details('"+jgxx[i]._id.$oid+"')>详情</a></td>"
                trList+="<td>"+jgxx[i].expand+"</td>"
                trList+="</tr>"
            }
            $(".jg_tbody").html(" ")
            $(".jg_tbody").append(trList)



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
                asButton+="<a class=clickCursor onclick=goPage('"+date+"','"+name+"','"+citySelect+"','"+specification+"','"+preStartRow+"','"+limitValue+"','pre')><img src='"+ctx+"/images/sts_4.png'></a>"
            }else{
                asButton+="<a><img src='"+ctx+"/images/sts_4.png'></a>"
            }
            asButton+="<p>"+pageNo+"/"+countPages+"</p>"
            if(countPages>pageNo){
                nextStartRow=pageNo*limitValue
                asButton+="<a class=clickCursor onclick=goPage('"+date+"','"+name+"','"+citySelect+"','"+specification+"','"+nextStartRow+"','"+limitValue+"','next')><img src='"+ctx+"/images/sts_5.png'></a>"
            }else{
                asButton+="<a><img src='"+ctx+"/images/sts_5.png'></a>"
            }
            $(".listperAuth_button").append(asButton)
        }
    })
}

//关闭页面
function closeItemShow(){
    $(".itemShow").removeClass("displayBlock").addClass("displayNo");
    for(var i = $(".itemShow .showItem").length;i >=0 ;i-- ){
        if($(".itemShow .showItem").eq(i).attr("class_num") == 0 ){
            $(".itemShow .showItem").eq(i).html("");
            $(".itemShowList").append("<div class='mulluShowSh' name='mulluShowSh'></div><div id='scrollShow' class='scrollShow'><div id='scrollSh' class='scrollSh'></div></div>")
            //$(".jq_message_content").height(569)
        }
        else{
            $(".itemShow .showItem").eq(i).remove();
        }
    }
}
/*查询
 * date 价格日期
 * name  物资名称
 * regionSelect  地区
 * citySelect 城市
 * specification 规格型号
 * */
function formButton(){
    var startValue=0 //初始值
    var limitValue=10 //一次取出多少条数据
    var price_Data=$(".price_Data").val()
    var wuziName=$(".wuziName").val()
    var citySelect=$(".regionSelect_city option:selected").val()?$(".regionSelect_city option:selected").val():""
    var specification=$(".specification").val()
    var bzNum=""
    $.ajax({
        url:ctx+"/queryPrice",
        data:{date:price_Data,name:wuziName,city:citySelect,specification:specification,start:startValue,limit:limitValue},
        type:"post",
        dataType:"json",
        success:function(data){
            jsonData=data
            var trList=""  //保存获取的数据
            var jgxx=data.jgxx  //返回的json里面的jgxx数据
            var count=data.count //总条数
            for(var i=0;i<jgxx.length;i++){
            	bzNum=Number(startValue)+i+1
                trList+="<tr>"
                trList+="<td>"+bzNum+"</td>"	
                trList+="<td>"+jgxx[i].name+"</td>"
                trList+="<td>"+jgxx[i].specification+"</td>"
                trList+="<td>"+jgxx[i].texture+"</td>"
                trList+="<td>"+jgxx[i].company+"</td>"
                trList+="<td>"+jgxx[i].area+"</td>"
                trList+="<td>"+jgxx[i].city+"</td>"
                trList+="<td>"+timeStamp2String(jgxx[i].update_time.$date)+"</td>"
                trList+="<td>"+jgxx[i].price+"</td>"
                trList+="<td>"+jgxx[i].priceType+"</td>"
                if(jgxx[i].price_range>=0){
                    trList+="<td><p class='colorRed'>"+'↑'+jgxx[i].price_range+"</p></td>"
                }else{
                    trList+="<td><p class='colorGreen'>"+'↓'+jgxx[i].price_range+"</p></td>"
                }

                trList+="<td><a id=priSel_"+jgxx[i]._id.$oid+" class='priSeldetails colorHui' onclick=priSel_details('"+jgxx[i]._id.$oid+"')>详情</a></td>"
                trList+="<td>"+jgxx[i].expand+"</td>"
                trList+="</tr>"
            }
            $(".jg_tbody").html(" ")
            $(".jg_tbody").append(trList)


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
                asButton+="<a class=clickCursor onclick=goPage('"+price_Data+"','"+wuziName+"','"+citySelect+"','"+specification+"','"+nextStartRow+"','"+limitValue+"','next')><img src='"+ctx+"/images/sts_5.png'></a>"
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
/*清除方法*/
function resetSubmit(){
    $("#priceForm")[0].reset()
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

/*详情*/
function priSel_details(str){
    $(".priSeldetails").removeClass("colorRed").addClass("colorHui")
    $("#priSel_"+str).removeClass("colorHui").addClass("colorRed")
    $(".priceInformation").removeClass("displayNo").addClass("displayBlock")
    $(".saveId").val(str)
    allCityList('region_city')
    var jgxx=jsonData.jgxx
    var name //物资名称
    var specification //规格型号
    var texture //材质
    var company //厂家
    var area //地区
    var city //城市
    var hisPrice_standard_p="" //保存标准里面的信息
    for(var i=0;i<jgxx.length;i++){
        if(jgxx[i]._id.$oid==str){
            name=jgxx[i].name
            specification=jgxx[i].specification
            texture=jgxx[i].texture
            company=jgxx[i].company
            area=jgxx[i].area
            city=jgxx[i].city
        }
    }
    $(".productName").text(name)
    $(".specification1").text(specification)
    $(".texture").text(texture)

    hisPrice_standard_p+="<td>"+name+"</td>"
    hisPrice_standard_p+="<td>"+specification+"</td>"
    hisPrice_standard_p+="<td>"+texture+"</td>"
    hisPrice_standard_p+="<td class='priceComp'>"+company+"</td>"
    hisPrice_standard_p+="<td>"+area+"</td>"
    hisPrice_standard_p+="<td>"+city+"</td>"
    $(".hisPrice_standard").append(hisPrice_standard_p)
    /*
     * 通过名称和规格获取厂家
     * name 名称
     * specification 规格
     * */
    $.ajax({
        url:ctx+"/queryCompanyForPrice",
        type:"post",
        data:{name:name,specification:specification},
        dataType:"json",
        success:function(data){
            var companys=data.companys
            var com=""
            for(var i=0;i<companys.length;i++){
                com+="<option>"+companys[i]+"</option>"
            }
            $(".factoryAddress").append(com)        

        }
    })
    /*
     * 调用方法，获取第一个城市的数据
     * id
     * */
    $.ajax({
        url:ctx+"/queryPriceHistory1",
        type:"post",
        data:{id:str},
        dataType:"json",
        success:function(data){
            jsonDetailsData=data
            var dataset=data.dataset  // dataset
            $(".city1").text(dataset[0].seriesname)
            var category=data.categories[0].category
            var datas=dataset[0].data
            var hisTbodyList=""
            for(var i=0;i<category.length;i++){
                hisTbodyList+="<tr>"
                hisTbodyList+="<td>"+category[i].label+"</td>"
                hisTbodyList+="<td>"+datas[i].value+"</td>"
                hisTbodyList+="</tr>"
            }
            $(".his_tbody").html(" ")
            $(".his_tbody").append(hisTbodyList)
        }
    })
    
    //获取页面可视区域高度和prShHeight，然后判断，如果prShHeight小于docuHeight，productInformation的高度为prShHeight
    var docuHeight=$(document).height()  //页面可视区域
    var hisPhHeight=$(".hisPrice").height()
    //当hisPhHeight<docuHeight时，设定新的hisPrice高度
    var newHisHeight
    newHisHeight=docuHeight-191
    if(hisPhHeight<docuHeight){
        $(".priceInformation").height(docuHeight)
        $(".hisPrice").height(newHisHeight)
    }
    
    /*给详情页绑定一个click事件，点击productInformation之外的地方，调用closeDetails方法*/
    $(".priceInformation").on("click",function(event){
        event.stopPropagation();
        var evt = event.srcElement ? event.srcElement : event.target;
        if(evt.id=='priceInformation'){
        	closeDetails()
        }
    });

    $(".qp_region_city").append(allCityList())
}

/*关闭详情页*/
function closeDetails(){
    $(".priceInformation").removeClass("displayBlock").addClass("displayNo")
    $(".priSeldetails").removeClass("colorRed").addClass("colorBlack")
    
    $(".hisPrice_rbs").removeClass("displayBlock").addClass("displayNo")
    $(".hisPrice_rbb").removeClass("displayNo").addClass("displayBlock")
    
    $(".histyData").removeClass("colorBlack").addClass("colorRed")
    $(".hisIndex").removeClass("colorRed").addClass("colorBlack")
    
    $(".city1").text("")
    $(".city2").text("")
    $(".his_tbody").html(" ")
    $(".his_tbody").append("<tr><td>日期</td><td>价格</td><td>价格</td></tr>")

    $(".hisPrice_standard").html("")
    $(".hisPrice_standard").append("<label>标准：</label>")

    $(".hisPrice_contrast").html("")
    $(".hisPrice_contrast").append("<label>对照：</label>")

    $(".factoryAddress option:first").prop("selected", 'selected');
    $(".region option:first").prop("selected", 'selected');

    $(".region_city option:first").prop("selected", 'selected');
    
    
}


/*详情页面查询数据
 *id
 * name //物品名称
 *specification //规格
 * company //厂家
 * area //地区
 * city //城市
 * */
function selectData(){
    var id=$(".saveId").val() //详情的ID
    var name=$(".productName").text().trim() //品名
    var specification=$(".specification1").text().trim() //规格
    var texture=$(".texture").text().trim() //材质
    var company=$(".factoryAddress option:selected").val() //厂家
    var area=$(".region option:selected").val() //地区
    var city=$(".region_city option:selected").val() //城市
    $.ajax({
        url:ctx+"/queryPriceHistory2",
        type:"post",
        data:{id:id,name:name,specification:specification,company:company,city:city},
        dataType:"json",
        success:function(data){
            jsonDetailsData=data
            var dataset=data.dataset  // dataset
            $(".city1").text(dataset[0].seriesname)
            $(".city2").text(dataset[1].seriesname)
            var category=data.categories[0].category
            var datas1=dataset[0].data //第一个城市的值
            var datas2=dataset[1].data //第二个城市的值
            var hisTbodyList=""
            for(var i=0;i<category.length;i++){
                hisTbodyList+="<tr>"
                hisTbodyList+="<td>"+category[i].label+"</td>"
                hisTbodyList+="<td>"+datas1[i].value+"</td>"
                hisTbodyList+="<td>"+datas2[i].value+"</td>"
                hisTbodyList+="</tr>"
            }
            $(".his_tbody").html(" ")
            $(".his_tbody").append("<tr><td>日期</td><td>价格</td><td>价格</td></tr>")
            $(".his_tbody").append(hisTbodyList)

            var hisPrice_contrast_p="" //保存对照的数据
            hisPrice_contrast_p+="<td>"+name+"</td>"
            hisPrice_contrast_p+="<td>"+specification+"</td>"
            hisPrice_contrast_p+="<td>"+texture+"</td>"
            hisPrice_contrast_p+="<td class='priceCom'>"+company+"</td>"
            hisPrice_contrast_p+="<td>"+area+"</td>"
            hisPrice_contrast_p+="<td>"+city+"</td>"
            $(".hisPrice_contrast").html(" ")
            $(".hisPrice_contrast").append(hisPrice_contrast_p)
            //通过判断css来确定现在是在数据列表还是指数
            if($("#histyData").hasClass("colorRed")){
            	SelectHistyData()
            }else{
            	SelectIndex()
            }            
            
            var priceComp=$(".priceComp").width()
            var priceCom=$(".priceCom").width()
            if(priceComp>priceCom){
            	$(".priceCom").width(priceComp)
            }else{
            	$(".priceComp").width(priceCom)
            }
        },
        erroe:function(){
            alert("链接失败")
        }
    })
}

/*查找历史数据列表*/
function SelectHistyData(){
    $(".hisIndex").removeClass("colorRed").addClass("colorBlack")
    $(".histyData").removeClass("colorBlack").addClass("colorRed")
    $(".hisPrice_rbb").removeClass("displayNo").addClass("displayBlock")
    $(".hisPrice_rbs").removeClass("displayBlock").addClass("displayNo")
}

/*查找指数*/
function SelectIndex(){
    $(".histyData").removeClass("colorRed").addClass("colorBlack")
    $(".hisIndex").removeClass("colorBlack").addClass("colorRed")
    $(".hisPrice_rbs").removeClass("displayNo").addClass("displayBlock")
    $(".hisPrice_rbb").removeClass("displayBlock").addClass("displayNo")
    $(".hisPrice_rbs").insertFusionCharts({
        type: "msline",
        width: "750",
        height: "380",
        dataFormat: "json",
        dataSource: jsonDetailsData
    });
}


/*
 * 点击地区，选择以后，动态赋予城市相关信息
 * */
function regionClick(str){
    var cityList="" //存放城市
    var selectedValue //选中的value值
//    selectedValue=$("."+str+" option:selected").val()
    selectedValue=document.getElementById("qp_region").value
    $("."+str+"_city").html(" ")
    if(selectedValue){
        if(selectedValue=="华北区") {
            cityList += "<option value='北京'>北京</option>"
            cityList += "<option value='天津'>天津</option>"
            cityList += "<option value='石家庄'>石家庄</option>"
            cityList += "<option value='保定'>保定</option>"
            cityList += "<option value='秦皇岛'>秦皇岛</option>"
            cityList += "<option value='唐山'>唐山</option>"
            cityList += "<option value='邯郸'>邯郸</option>"
            cityList += "<option value='邢台'>邢台</option>"
            cityList += "<option value='沧州'>沧州</option>"
            cityList += "<option value='承德'>承德</option>"
            cityList += "<option value='廊坊'>廊坊</option>"
            cityList += "<option value='衡水'>衡水</option>"
            cityList += "<option value='张家口'>张家口</option>"
            cityList += "<option value='太原'>太原</option>"
            cityList += "<option value='大同'>大同</option>"
            cityList += "<option value='阳泉'>阳泉</option>"
            cityList += "<option value='长治'>长治</option>"
            cityList += "<option value='临汾'>临汾</option>"
            cityList += "<option value='晋中'>晋中</option>"
            cityList += "<option value='运城'>运城</option>"
            cityList += "<option value='晋城'>晋城</option>"
            cityList += "<option value='忻州'>忻州</option>"
            cityList += "<option value='朔州'>朔州</option>"
            cityList += "<option value='吕梁'>吕梁</option>"
            cityList += "<option value='呼和浩特'>呼和浩特</option>"
            cityList += "<option value='呼伦贝尔'>呼伦贝尔</option>"
            cityList += "<option value='包头'>包头</option>"
            cityList += "<option value='赤峰'>赤峰</option>"
            cityList += "<option value='乌海'>乌海</option>"
            cityList += "<option value='通辽'>通辽</option>"
            cityList += "<option value='鄂尔多斯'>鄂尔多斯</option>"
            cityList += "<option value='乌兰察布'>乌兰察布</option>"
            cityList += "<option value='巴彦淖尔'>巴彦淖尔</option>"
        }
        if(selectedValue=="东北区") {
            cityList+="<option value='大连'>大连</option>"
            cityList+="<option value='沈阳'>沈阳</option>"
            cityList+="<option value='盘锦'>盘锦</option>"
            cityList+="<option value='鞍山'>鞍山</option>"
            cityList+="<option value='抚顺'>抚顺</option>"
            cityList+="<option value='本溪'>本溪</option>"
            cityList+="<option value='铁岭'>铁岭</option>"
            cityList+="<option value='锦州'>锦州</option>"
            cityList+="<option value='丹东'>丹东</option>"
            cityList+="<option value='辽阳'>辽阳</option>"
            cityList+="<option value='葫芦岛'>葫芦岛</option>"
            cityList+="<option value='阜新'>阜新</option>"
            cityList+="<option value='朝阳'>朝阳</option>"
            cityList+="<option value='营口'>营口</option>"
            cityList+="<option value='长春'>长春</option>"
            cityList+="<option value='吉林'>吉林</option>"
            cityList+="<option value='通化'>通化</option>"
            cityList+="<option value='白城'>白城</option>"
            cityList+="<option value='四平'>四平</option>"
            cityList+="<option value='辽源'>辽源</option>"
            cityList+="<option value='松原'>松原</option>"
            cityList+="<option value='白山'>白山</option>"
            cityList+="<option value='哈尔滨'>哈尔滨</option>"
            cityList+="<option value='伊春'>伊春</option>"
            cityList+="<option value='牡丹江'>牡丹江</option>"
            cityList+="<option value='大庆'>大庆</option>"
            cityList+="<option value='鸡西'>鸡西</option>"
            cityList+="<option value='鹤岗'>鹤岗</option>"
            cityList+="<option value='绥化'>绥化</option>"
            cityList+="<option value='双鸭山'>双鸭山</option>"
            cityList+="<option value='七台河'>七台河</option>"
            cityList+="<option value='佳木斯'>佳木斯</option>"
            cityList+="<option value='黑河'>黑河</option>"
            cityList+="<option value='齐齐哈尔'>齐齐哈尔</option>"
        }
        if(selectedValue=="华东区"){
            cityList+="<option value='南京'>南京</option>"
            cityList+="<option value='无锡'>无锡</option>"
            cityList+="<option value='常州'>常州</option>"
            cityList+="<option value='扬州'>扬州</option>"
            cityList+="<option value='徐州'>徐州</option>"
            cityList+="<option value='苏州'>苏州</option>"
            cityList+="<option value='连云港'>连云港</option>"
            cityList+="<option value='盐城'>盐城</option>"
            cityList+="<option value='淮安'>淮安</option>"
            cityList+="<option value='宿迁'>宿迁</option>"
            cityList+="<option value='镇江'>镇江</option>"
            cityList+="<option value='南通'>南通</option>"
            cityList+="<option value='泰州'>泰州</option>"
            cityList+="<option value='杭州'>杭州</option>"
            cityList+="<option value='宁波'>宁波</option>"
            cityList+="<option value='绍兴'>绍兴</option>"
            cityList+="<option value='温州'>温州</option>"
            cityList+="<option value='湖州'>湖州</option>"
            cityList+="<option value='嘉兴'>嘉兴</option>"
            cityList+="<option value='台州'>台州</option>"
            cityList+="<option value='金华'>金华</option>"
            cityList+="<option value='舟山'>舟山</option>"
            cityList+="<option value='衢州'>衢州</option>"
            cityList+="<option value='丽水'>丽水</option>"
            cityList+="<option value='合肥'>合肥</option>"
            cityList+="<option value='芜湖'>芜湖</option>"
            cityList+="<option value='亳州'>亳州</option>"
            cityList+="<option value='马鞍山'>马鞍山</option>"
            cityList+="<option value='池州'>池州</option>"
            cityList+="<option value='淮南'>淮南</option>"
            cityList+="<option value='淮北'>淮北</option>"
            cityList+="<option value='蚌埠'>蚌埠</option>"
            cityList+="<option value='巢湖'>巢湖</option>"
            cityList+="<option value='安庆'>安庆</option>"
            cityList+="<option value='宿州'>宿州</option>"
            cityList+="<option value='铜陵'>铜陵</option>"
            cityList+="<option value='滁州'>滁州</option>"
            cityList+="<option value='黄山'>黄山</option>"
            cityList+="<option value='六安'>六安</option>"
            cityList+="<option value='阜阳'>阜阳</option>"
            cityList+="<option value='厦门'>厦门</option>"
            cityList+="<option value='福州'>福州</option>"
            cityList+="<option value='泉州'>泉州</option>"
            cityList+="<option value='漳州'>漳州</option>"
            cityList+="<option value='南平'>南平</option>"
            cityList+="<option value='三明'>三明</option>"
            cityList+="<option value='龙岩'>龙岩</option>"
            cityList+="<option value='莆田'>莆田</option>"
            cityList+="<option value='宁德'>宁德</option>"
            cityList+="<option value='青岛'>青岛</option>"
            cityList+="<option value='济南'>济南</option>"
            cityList+="<option value='潍坊'>潍坊</option>"
            cityList+="<option value='淄博'>淄博</option>"
            cityList+="<option value='威海'>威海</option>"
            cityList+="<option value='枣庄'>枣庄</option>"
            cityList+="<option value='泰安'>泰安</option>"
            cityList+="<option value='临沂'>临沂</option>"
            cityList+="<option value='东营'>东营</option>"
            cityList+="<option value='济宁'>济宁</option>"
            cityList+="<option value='烟台'>烟台</option>"
            cityList+="<option value='菏泽'>菏泽</option>"
            cityList+="<option value='日照'>日照</option>"
            cityList+="<option value='德州'>德州</option>"
            cityList+="<option value='聊城'>聊城</option>"
            cityList+="<option value='滨州'>滨州</option>"
            cityList+="<option value='莱芜'>莱芜</option>"
            cityList+="<option value='上海'>上海</option>"
            cityList+="<option value='南昌'>南昌</option>"
        }
        if(selectedValue=="华中区"){
            cityList+="<option value='赣州'>赣州</option>"
            cityList+="<option value='景德镇'>景德镇</option>"
            cityList+="<option value='九江'>九江</option>"
            cityList+="<option value='萍乡'>萍乡</option>"
            cityList+="<option value='新余'>新余</option>"
            cityList+="<option value='抚州'>抚州</option>"
            cityList+="<option value='宜春'>宜春</option>"
            cityList+="<option value='上饶'>上饶</option>"
            cityList+="<option value='鹰潭'>鹰潭</option>"
            cityList+="<option value='吉安'>吉安</option>"
            cityList+="<option value='郑州'>郑州</option>"
            cityList+="<option value='洛阳'>洛阳</option>"
            cityList+="<option value='焦作'>焦作</option>"
            cityList+="<option value='商丘'>商丘</option>"
            cityList+="<option value='信阳'>信阳</option>"
            cityList+="<option value='新乡'>新乡</option>"
            cityList+="<option value='安阳'>安阳</option>"
            cityList+="<option value='开封'>开封</option>"
            cityList+="<option value='漯河'>漯河</option>"
            cityList+="<option value='南阳'>南阳</option>"
            cityList+="<option value='鹤壁'>鹤壁</option>"
            cityList+="<option value='平顶山'>平顶山</option>"
            cityList+="<option value='濮阳'>濮阳</option>"
            cityList+="<option value='许昌'>许昌</option>"
            cityList+="<option value='周口'>周口</option>"
            cityList+="<option value='三门峡'>三门峡</option>"
            cityList+="<option value='驻马店'>驻马店</option>"
            cityList+="<option value='平顶山'>平顶山</option>"
            cityList+="<option value='荆门'>荆门</option>"
            cityList+="<option value='咸宁'>咸宁</option>"
            cityList+="<option value='襄樊'>襄樊</option>"
            cityList+="<option value='荆州'>荆州</option>"
            cityList+="<option value='黄石'>黄石</option>"
            cityList+="<option value='宜昌'>宜昌</option>"
            cityList+="<option value='随州'>随州</option>"
            cityList+="<option value='鄂州'>鄂州</option>"
            cityList+="<option value='孝感'>孝感</option>"
            cityList+="<option value='黄冈'>黄冈</option>"
            cityList+="<option value='十堰'>十堰</option>"
            cityList+="<option value='武汉'>武汉</option>"
            cityList+="<option value='大冶'>大冶</option>"
            cityList+="<option value='长沙'>长沙</option>"
            cityList+="<option value='郴州'>郴州</option>"
            cityList+="<option value='娄底'>娄底</option>"
            cityList+="<option value='衡阳'>衡阳</option>"
            cityList+="<option value='株洲'>株洲</option>"
            cityList+="<option value='湘潭'>湘潭</option>"
            cityList+="<option value='岳阳'>岳阳</option>"
            cityList+="<option value='常德'>常德</option>"
            cityList+="<option value='邵阳'>邵阳</option>"
            cityList+="<option value='益阳'>益阳</option>"
            cityList+="<option value='永州'>永州</option>"
            cityList+="<option value='张家界'>张家界</option>"
            cityList+="<option value='怀化'>怀化</option>"
            cityList+="<option value='江门'>江门</option>"
        }
        if(selectedValue=="华南区"){
            cityList+="<option value='佛山'>佛山</option>"
            cityList+="<option value='汕头'>汕头</option>"
            cityList+="<option value='湛江'>湛江</option>"
            cityList+="<option value='韶关'>韶关</option>"
            cityList+="<option value='中山'>中山</option>"
            cityList+="<option value='珠海'>珠海</option>"
            cityList+="<option value='茂名'>茂名</option>"
            cityList+="<option value='肇庆'>肇庆</option>"
            cityList+="<option value='阳江'>阳江</option>"
            cityList+="<option value='惠州'>惠州</option>"
            cityList+="<option value='潮州'>潮州</option>"
            cityList+="<option value='揭阳'>揭阳</option>"
            cityList+="<option value='清远'>清远</option>"
            cityList+="<option value='河源'>河源</option>"
            cityList+="<option value='东莞'>东莞</option>"
            cityList+="<option value='汕尾'>汕尾</option>"
            cityList+="<option value='云浮'>云浮</option>"
            cityList+="<option value='广州'>广州</option>"
            cityList+="<option value='深圳'>深圳</option>"
            cityList+="<option value='南宁'>南宁</option>"
            cityList+="<option value='贺州'>贺州</option>"
            cityList+="<option value='柳州'>柳州</option>"
            cityList+="<option value='桂林'>桂林</option>"
            cityList+="<option value='梧州'>梧州</option>"
            cityList+="<option value='北海'>北海</option>"
            cityList+="<option value='玉林'>玉林</option>"
            cityList+="<option value='钦州'>钦州</option>"
            cityList+="<option value='百色'>百色</option>"
            cityList+="<option value='防城港'>防城港</option>"
            cityList+="<option value='贵港'>贵港</option>"
            cityList+="<option value='河池'>河池</option>"
            cityList+="<option value='崇左'>崇左</option>"
            cityList+="<option value='来宾'>来宾</option>"
            cityList+="<option value='海口'>海口</option>"
            cityList+="<option value='三亚'>三亚</option>"
        }
        if(selectedValue=="西北区"){
            cityList+="<option value='咸阳'>咸阳</option>"
            cityList+="<option value='榆林'>榆林</option>"
            cityList+="<option value='宝鸡'>宝鸡</option>"
            cityList+="<option value='铜川'>铜川</option>"
            cityList+="<option value='渭南'>渭南</option>"
            cityList+="<option value='汉中'>汉中</option>"
            cityList+="<option value='安康'>安康</option>"
            cityList+="<option value='商洛'>商洛</option>"
            cityList+="<option value='延安'>延安</option>"
            cityList+="<option value='西安'>西安</option>"
            cityList+="<option value='兰州'>兰州</option>"
            cityList+="<option value='白银'>白银</option>"
            cityList+="<option value='武威'>武威</option>"
            cityList+="<option value='金昌'>金昌</option>"
            cityList+="<option value='平凉'>平凉</option>"
            cityList+="<option value='张掖'>张掖</option>"
            cityList+="<option value='嘉峪关'>嘉峪关</option>"
            cityList+="<option value='酒泉'>酒泉</option>"
            cityList+="<option value='庆阳'>庆阳</option>"
            cityList+="<option value='定西'>定西</option>"
            cityList+="<option value='陇南'>陇南</option>"
            cityList+="<option value='天水'>天水</option>"
            cityList+="<option value='西宁'>西宁</option>"
            cityList+="<option value='宁夏'>宁夏</option>"
            cityList+="<option value='乌鲁木齐'>乌鲁木齐</option>"
            cityList+="<option value='银川'>银川</option>"
            cityList+="<option value='固原'>固原</option>"
            cityList+="<option value='青铜峡'>青铜峡</option>"
            cityList+="<option value='石嘴山'>石嘴山</option>"
            cityList+="<option value='中卫'>中卫</option>"
        }
        if(selectedValue=="西南区"){
            cityList+="<option value='成都'>成都</option>"
            cityList+="<option value='乐山'>乐山</option>"
            cityList+="<option value='雅安'>雅安</option>"
            cityList+="<option value='内江'>内江</option>"
            cityList+="<option value='宜宾'>宜宾</option>"
            cityList+="<option value='广元'>广元</option>"
            cityList+="<option value='达州'>达州</option>"
            cityList+="<option value='资阳'>资阳</option>"
            cityList+="<option value='绵阳'>绵阳</option>"
            cityList+="<option value='眉山'>眉山</option>"
            cityList+="<option value='巴中'>巴中</option>"
            cityList+="<option value='攀枝花'>攀枝花</option>"
            cityList+="<option value='遂宁'>遂宁</option>"
            cityList+="<option value='德阳'>德阳</option>"
            cityList+="<option value='广安'>广安</option>"
            cityList+="<option value='南充'>南充</option>"
            cityList+="<option value='自贡'>自贡</option>"
            cityList+="<option value='泸州'>泸州</option>"
            cityList+="<option value='昆明'>昆明</option>"
            cityList+="<option value='玉溪'>玉溪</option>"
            cityList+="<option value='丽江'>丽江</option>"
            cityList+="<option value='临沧'>临沧</option>"
            cityList+="<option value='曲靖'>曲靖</option>"
            cityList+="<option value='昭通'>昭通</option>"
            cityList+="<option value='保山'>保山</option>"
            cityList+="<option value='贵阳'>贵阳</option>"
            cityList+="<option value='安顺'>安顺</option>"
            cityList+="<option value='遵义'>遵义</option>"
            cityList+="<option value='六盘水'>六盘水</option>"
            cityList+="<option value='拉萨'>拉萨</option>"
            cityList+="<option value='阿里'>阿里</option>"
            cityList+="<option value='重庆'>重庆</option>"
        }
        $("."+str+"_city").append(cityList)
    }else{
            $(".qp_region_city").append(allCityList())
        }
}

function allCityList(str){
    var cityList="" //存放城
    cityList += "<option value=''></option>"
    cityList += "<option value='北京'>北京</option>"
    cityList += "<option value='天津'>天津</option>"
    cityList += "<option value='石家庄'>石家庄</option>"
    cityList += "<option value='保定'>保定</option>"
    cityList += "<option value='秦皇岛'>秦皇岛</option>"
    cityList += "<option value='唐山'>唐山</option>"
    cityList += "<option value='邯郸'>邯郸</option>"
    cityList += "<option value='邢台'>邢台</option>"
    cityList += "<option value='沧州'>沧州</option>"
    cityList += "<option value='承德'>承德</option>"
    cityList += "<option value='廊坊'>廊坊</option>"
    cityList += "<option value='衡水'>衡水</option>"
    cityList += "<option value='张家口'>张家口</option>"
    cityList += "<option value='太原'>太原</option>"
    cityList += "<option value='大同'>大同</option>"
    cityList += "<option value='阳泉'>阳泉</option>"
    cityList += "<option value='长治'>长治</option>"
    cityList += "<option value='临汾'>临汾</option>"
    cityList += "<option value='晋中'>晋中</option>"
    cityList += "<option value='运城'>运城</option>"
    cityList += "<option value='晋城'>晋城</option>"
    cityList += "<option value='忻州'>忻州</option>"
    cityList += "<option value='朔州'>朔州</option>"
    cityList += "<option value='吕梁'>吕梁</option>"
    cityList += "<option value='呼和浩特'>呼和浩特</option>"
    cityList += "<option value='呼伦贝尔'>呼伦贝尔</option>"
    cityList += "<option value='包头'>包头</option>"
    cityList += "<option value='赤峰'>赤峰</option>"
    cityList += "<option value='乌海'>乌海</option>"
    cityList += "<option value='通辽'>通辽</option>"
    cityList += "<option value='鄂尔多斯'>鄂尔多斯</option>"
    cityList += "<option value='乌兰察布'>乌兰察布</option>"
    cityList += "<option value='巴彦淖尔'>巴彦淖尔</option>"
    cityList+="<option value='大连'>大连</option>"
    cityList+="<option value='沈阳'>沈阳</option>"
    cityList+="<option value='盘锦'>盘锦</option>"
    cityList+="<option value='鞍山'>鞍山</option>"
    cityList+="<option value='抚顺'>抚顺</option>"
    cityList+="<option value='本溪'>本溪</option>"
    cityList+="<option value='铁岭'>铁岭</option>"
    cityList+="<option value='锦州'>锦州</option>"
    cityList+="<option value='丹东'>丹东</option>"
    cityList+="<option value='辽阳'>辽阳</option>"
    cityList+="<option value='葫芦岛'>葫芦岛</option>"
    cityList+="<option value='阜新'>阜新</option>"
    cityList+="<option value='朝阳'>朝阳</option>"
    cityList+="<option value='营口'>营口</option>"
    cityList+="<option value='长春'>长春</option>"
    cityList+="<option value='吉林'>吉林</option>"
    cityList+="<option value='通化'>通化</option>"
    cityList+="<option value='白城'>白城</option>"
    cityList+="<option value='四平'>四平</option>"
    cityList+="<option value='辽源'>辽源</option>"
    cityList+="<option value='松原'>松原</option>"
    cityList+="<option value='白山'>白山</option>"
    cityList+="<option value='哈尔滨'>哈尔滨</option>"
    cityList+="<option value='伊春'>伊春</option>"
    cityList+="<option value='牡丹江'>牡丹江</option>"
    cityList+="<option value='大庆'>大庆</option>"
    cityList+="<option value='鸡西'>鸡西</option>"
    cityList+="<option value='鹤岗'>鹤岗</option>"
    cityList+="<option value='绥化'>绥化</option>"
    cityList+="<option value='双鸭山'>双鸭山</option>"
    cityList+="<option value='七台河'>七台河</option>"
    cityList+="<option value='佳木斯'>佳木斯</option>"
    cityList+="<option value='黑河'>黑河</option>"
    cityList+="<option value='齐齐哈尔'>齐齐哈尔</option>"
    cityList+="<option value='南京'>南京</option>"
    cityList+="<option value='无锡'>无锡</option>"
    cityList+="<option value='常州'>常州</option>"
    cityList+="<option value='扬州'>扬州</option>"
    cityList+="<option value='徐州'>徐州</option>"
    cityList+="<option value='苏州'>苏州</option>"
    cityList+="<option value='连云港'>连云港</option>"
    cityList+="<option value='盐城'>盐城</option>"
    cityList+="<option value='淮安'>淮安</option>"
    cityList+="<option value='宿迁'>宿迁</option>"
    cityList+="<option value='镇江'>镇江</option>"
    cityList+="<option value='南通'>南通</option>"
    cityList+="<option value='泰州'>泰州</option>"
    cityList+="<option value='杭州'>杭州</option>"
    cityList+="<option value='宁波'>宁波</option>"
    cityList+="<option value='绍兴'>绍兴</option>"
    cityList+="<option value='温州'>温州</option>"
    cityList+="<option value='湖州'>湖州</option>"
    cityList+="<option value='嘉兴'>嘉兴</option>"
    cityList+="<option value='台州'>台州</option>"
    cityList+="<option value='金华'>金华</option>"
    cityList+="<option value='舟山'>舟山</option>"
    cityList+="<option value='衢州'>衢州</option>"
    cityList+="<option value='丽水'>丽水</option>"
    cityList+="<option value='合肥'>合肥</option>"
    cityList+="<option value='芜湖'>芜湖</option>"
    cityList+="<option value='亳州'>亳州</option>"
    cityList+="<option value='马鞍山'>马鞍山</option>"
    cityList+="<option value='池州'>池州</option>"
    cityList+="<option value='淮南'>淮南</option>"
    cityList+="<option value='淮北'>淮北</option>"
    cityList+="<option value='蚌埠'>蚌埠</option>"
    cityList+="<option value='巢湖'>巢湖</option>"
    cityList+="<option value='安庆'>安庆</option>"
    cityList+="<option value='宿州'>宿州</option>"
    cityList+="<option value='铜陵'>铜陵</option>"
    cityList+="<option value='滁州'>滁州</option>"
    cityList+="<option value='黄山'>黄山</option>"
    cityList+="<option value='六安'>六安</option>"
    cityList+="<option value='阜阳'>阜阳</option>"
    cityList+="<option value='厦门'>厦门</option>"
    cityList+="<option value='福州'>福州</option>"
    cityList+="<option value='泉州'>泉州</option>"
    cityList+="<option value='漳州'>漳州</option>"
    cityList+="<option value='南平'>南平</option>"
    cityList+="<option value='三明'>三明</option>"
    cityList+="<option value='龙岩'>龙岩</option>"
    cityList+="<option value='莆田'>莆田</option>"
    cityList+="<option value='宁德'>宁德</option>"
    cityList+="<option value='青岛'>青岛</option>"
    cityList+="<option value='济南'>济南</option>"
    cityList+="<option value='潍坊'>潍坊</option>"
    cityList+="<option value='淄博'>淄博</option>"
    cityList+="<option value='威海'>威海</option>"
    cityList+="<option value='枣庄'>枣庄</option>"
    cityList+="<option value='泰安'>泰安</option>"
    cityList+="<option value='临沂'>临沂</option>"
    cityList+="<option value='东营'>东营</option>"
    cityList+="<option value='济宁'>济宁</option>"
    cityList+="<option value='烟台'>烟台</option>"
    cityList+="<option value='菏泽'>菏泽</option>"
    cityList+="<option value='日照'>日照</option>"
    cityList+="<option value='德州'>德州</option>"
    cityList+="<option value='聊城'>聊城</option>"
    cityList+="<option value='滨州'>滨州</option>"
    cityList+="<option value='莱芜'>莱芜</option>"
    cityList+="<option value='上海'>上海</option>"
    cityList+="<option value='南昌'>南昌</option>"
    cityList+="<option value='赣州'>赣州</option>"
    cityList+="<option value='景德镇'>景德镇</option>"
    cityList+="<option value='九江'>九江</option>"
    cityList+="<option value='萍乡'>萍乡</option>"
    cityList+="<option value='新余'>新余</option>"
    cityList+="<option value='抚州'>抚州</option>"
    cityList+="<option value='宜春'>宜春</option>"
    cityList+="<option value='上饶'>上饶</option>"
    cityList+="<option value='鹰潭'>鹰潭</option>"
    cityList+="<option value='吉安'>吉安</option>"
    cityList+="<option value='郑州'>郑州</option>"
    cityList+="<option value='洛阳'>洛阳</option>"
    cityList+="<option value='焦作'>焦作</option>"
    cityList+="<option value='商丘'>商丘</option>"
    cityList+="<option value='信阳'>信阳</option>"
    cityList+="<option value='新乡'>新乡</option>"
    cityList+="<option value='安阳'>安阳</option>"
    cityList+="<option value='开封'>开封</option>"
    cityList+="<option value='漯河'>漯河</option>"
    cityList+="<option value='南阳'>南阳</option>"
    cityList+="<option value='鹤壁'>鹤壁</option>"
    cityList+="<option value='平顶山'>平顶山</option>"
    cityList+="<option value='濮阳'>濮阳</option>"
    cityList+="<option value='许昌'>许昌</option>"
    cityList+="<option value='周口'>周口</option>"
    cityList+="<option value='三门峡'>三门峡</option>"
    cityList+="<option value='驻马店'>驻马店</option>"
    cityList+="<option value='平顶山'>平顶山</option>"
    cityList+="<option value='荆门'>荆门</option>"
    cityList+="<option value='咸宁'>咸宁</option>"
    cityList+="<option value='襄樊'>襄樊</option>"
    cityList+="<option value='荆州'>荆州</option>"
    cityList+="<option value='黄石'>黄石</option>"
    cityList+="<option value='宜昌'>宜昌</option>"
    cityList+="<option value='随州'>随州</option>"
    cityList+="<option value='鄂州'>鄂州</option>"
    cityList+="<option value='孝感'>孝感</option>"
    cityList+="<option value='黄冈'>黄冈</option>"
    cityList+="<option value='十堰'>十堰</option>"
    cityList+="<option value='武汉'>武汉</option>"
    cityList+="<option value='大冶'>大冶</option>"
    cityList+="<option value='长沙'>长沙</option>"
    cityList+="<option value='郴州'>郴州</option>"
    cityList+="<option value='娄底'>娄底</option>"
    cityList+="<option value='衡阳'>衡阳</option>"
    cityList+="<option value='株洲'>株洲</option>"
    cityList+="<option value='湘潭'>湘潭</option>"
    cityList+="<option value='岳阳'>岳阳</option>"
    cityList+="<option value='常德'>常德</option>"
    cityList+="<option value='邵阳'>邵阳</option>"
    cityList+="<option value='益阳'>益阳</option>"
    cityList+="<option value='永州'>永州</option>"
    cityList+="<option value='张家界'>张家界</option>"
    cityList+="<option value='怀化'>怀化</option>"
    cityList+="<option value='江门'>江门</option>"
    cityList+="<option value='佛山'>佛山</option>"
    cityList+="<option value='汕头'>汕头</option>"
    cityList+="<option value='湛江'>湛江</option>"
    cityList+="<option value='韶关'>韶关</option>"
    cityList+="<option value='中山'>中山</option>"
    cityList+="<option value='珠海'>珠海</option>"
    cityList+="<option value='茂名'>茂名</option>"
    cityList+="<option value='肇庆'>肇庆</option>"
    cityList+="<option value='阳江'>阳江</option>"
    cityList+="<option value='惠州'>惠州</option>"
    cityList+="<option value='潮州'>潮州</option>"
    cityList+="<option value='揭阳'>揭阳</option>"
    cityList+="<option value='清远'>清远</option>"
    cityList+="<option value='河源'>河源</option>"
    cityList+="<option value='东莞'>东莞</option>"
    cityList+="<option value='汕尾'>汕尾</option>"
    cityList+="<option value='云浮'>云浮</option>"
    cityList+="<option value='广州'>广州</option>"
    cityList+="<option value='深圳'>深圳</option>"
    cityList+="<option value='南宁'>南宁</option>"
    cityList+="<option value='贺州'>贺州</option>"
    cityList+="<option value='柳州'>柳州</option>"
    cityList+="<option value='桂林'>桂林</option>"
    cityList+="<option value='梧州'>梧州</option>"
    cityList+="<option value='北海'>北海</option>"
    cityList+="<option value='玉林'>玉林</option>"
    cityList+="<option value='钦州'>钦州</option>"
    cityList+="<option value='百色'>百色</option>"
    cityList+="<option value='防城港'>防城港</option>"
    cityList+="<option value='贵港'>贵港</option>"
    cityList+="<option value='河池'>河池</option>"
    cityList+="<option value='崇左'>崇左</option>"
    cityList+="<option value='来宾'>来宾</option>"
    cityList+="<option value='海口'>海口</option>"
    cityList+="<option value='三亚'>三亚</option>"
    cityList+="<option value='咸阳'>咸阳</option>"
    cityList+="<option value='榆林'>榆林</option>"
    cityList+="<option value='宝鸡'>宝鸡</option>"
    cityList+="<option value='铜川'>铜川</option>"
    cityList+="<option value='渭南'>渭南</option>"
    cityList+="<option value='汉中'>汉中</option>"
    cityList+="<option value='安康'>安康</option>"
    cityList+="<option value='商洛'>商洛</option>"
    cityList+="<option value='延安'>延安</option>"
    cityList+="<option value='西安'>西安</option>"
    cityList+="<option value='兰州'>兰州</option>"
    cityList+="<option value='白银'>白银</option>"
    cityList+="<option value='武威'>武威</option>"
    cityList+="<option value='金昌'>金昌</option>"
    cityList+="<option value='平凉'>平凉</option>"
    cityList+="<option value='张掖'>张掖</option>"
    cityList+="<option value='嘉峪关'>嘉峪关</option>"
    cityList+="<option value='酒泉'>酒泉</option>"
    cityList+="<option value='庆阳'>庆阳</option>"
    cityList+="<option value='定西'>定西</option>"
    cityList+="<option value='陇南'>陇南</option>"
    cityList+="<option value='天水'>天水</option>"
    cityList+="<option value='西宁'>西宁</option>"
    cityList+="<option value='宁夏'>宁夏</option>"
    cityList+="<option value='乌鲁木齐'>乌鲁木齐</option>"
    cityList+="<option value='银川'>银川</option>"
    cityList+="<option value='固原'>固原</option>"
    cityList+="<option value='青铜峡'>青铜峡</option>"
    cityList+="<option value='石嘴山'>石嘴山</option>"
    cityList+="<option value='中卫'>中卫</option>"
    cityList+="<option value='成都'>成都</option>"
    cityList+="<option value='乐山'>乐山</option>"
    cityList+="<option value='雅安'>雅安</option>"
    cityList+="<option value='内江'>内江</option>"
    cityList+="<option value='宜宾'>宜宾</option>"
    cityList+="<option value='广元'>广元</option>"
    cityList+="<option value='达州'>达州</option>"
    cityList+="<option value='资阳'>资阳</option>"
    cityList+="<option value='绵阳'>绵阳</option>"
    cityList+="<option value='眉山'>眉山</option>"
    cityList+="<option value='巴中'>巴中</option>"
    cityList+="<option value='攀枝花'>攀枝花</option>"
    cityList+="<option value='遂宁'>遂宁</option>"
    cityList+="<option value='德阳'>德阳</option>"
    cityList+="<option value='广安'>广安</option>"
    cityList+="<option value='南充'>南充</option>"
    cityList+="<option value='自贡'>自贡</option>"
    cityList+="<option value='泸州'>泸州</option>"
    cityList+="<option value='昆明'>昆明</option>"
    cityList+="<option value='玉溪'>玉溪</option>"
    cityList+="<option value='丽江'>丽江</option>"
    cityList+="<option value='临沧'>临沧</option>"
    cityList+="<option value='曲靖'>曲靖</option>"
    cityList+="<option value='昭通'>昭通</option>"
    cityList+="<option value='保山'>保山</option>"
    cityList+="<option value='贵阳'>贵阳</option>"
    cityList+="<option value='安顺'>安顺</option>"
    cityList+="<option value='遵义'>遵义</option>"
    cityList+="<option value='六盘水'>六盘水</option>"
    cityList+="<option value='拉萨'>拉萨</option>"
    cityList+="<option value='阿里'>阿里</option>"
    cityList+="<option value='重庆'>重庆</option>"

    $("."+str).append(cityList)
}