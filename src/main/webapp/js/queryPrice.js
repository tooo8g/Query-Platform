/**
 * Created by zb on 2016/1/19.
 */
var list_json=""; //保存目录列表的json
var jsonData=""; //保存物资数据的json
var jsonDetailsData="" //相情页面的json
$(function(){
    allCityList('regionSelect_city')
    /*
     * 进去页面，自动调此方法，获取左边的目录
     * */
    $.ajax({
        url:"../json/demoSelectLeft.json",
        type:"post",
        dataType:"json",
        success:function(data){
            var list_content="" //保存目录列表
            list_json=data
            var dataChilds
            dataChilds=list_json.childs
            for(var i=0;i<dataChilds.length;i++){
                list_content+="<li>"
                list_content+="<a onclick=showChilds("+i+")>"+dataChilds[i].name+"</a>"
                list_content+="</li>"
            }
            $(".list_content").append(list_content)
        }
    })
    //给目录添加click事件
    $(".itemShowList").on("click","a",function() {
        var list_num = $(this).attr("num");
        var itemShowList_data=list_json.childs[0].childs[list_num].childs
        var num=1;

        for(var i = $(".itemShow .showItem").length;i > 0 ;i-- ){
            if($(".itemShow .showItem").eq(i).attr("class_num") > $(this).parent().attr("class_num") ){
                $(".itemShow .showItem").eq(i).remove();
            }
        };
        if(itemShowList_data){
            $(".itemShow").append("<div class='itemShowList"+num+" showItem'></div>");
            $(".itemShowList"+num).attr("class_num",1);
            itemShowList($(".itemShowList"+num),itemShowList_data);
        }else{
            thisText=$(this).html()
            itemShowButton(thisText)
        };
    })

    /*
     * 打开页面。调用方法，获取右边信息列表
     * */
    var startValue=0 //初始值
    var limitValue=20 //一次取出多少条数据
    var price_Data=""
    var wuziName=""
    var regionSelect=""
    var citySelect=""
    var specification=""
    $.ajax({
        url:"../json/demoSelect.json",
        data:{date:price_Data,name:wuziName,regionSelect:regionSelect,citySelect:citySelect,specification:specification,start:startValue,limit:limitValue},
        type:"post",
        dataType:"json",
        success:function(data){
            jsonData=data
            var trList=""  //保存获取的数据
            var jgxx=data.jgxx  //返回的json里面的jgxx数据
            var count=data.count //总条数
            for(var i=0;i<jgxx.length;i++){
                trList+="<tr>"
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
            asButton+="<a>上一页</a>"
            asButton+="<p>"+pageNo+"/"+countPages+"</p>"
            if(countPages>1){
                nextStartRow=pageNo*limitValue
                asButton+="<a class=clickCursor onclick=goPage('"+price_Data+"','"+wuziName+"','"+regionSelect+"','"+citySelect+"','"+specification+"','"+nextStartRow+"','"+limitValue+"','next')>下一页</a>"
            }else{
                asButton+="<a>下一页</a>"
            }
            $(".listperAuth_button").append(asButton)
        },
        error:function(){
            alert("链接失败")
        }
    })
})

/*
 * 点击目录，显示它下面的childs
 * */

function showChilds(str){
    $(".itemShow").removeClass("displayNo").addClass("displayBlock");
    var muluJson //目录JSON
    muluJson = list_json.childs[str].childs
    $(".itemShowList").html("")
    for (var i = 0; i < muluJson.length; i++) {
        $(".itemShowList").append("<a num='" + i + "'>" + muluJson[i].name + "</a>")
    }
    //获取页面可视区域，然后确定showItem的高度
    var docuHeight = $(document).height()  //页面可视区域
    var sihHeight = docuHeight - 250
    $(".showItem").height(sihHeight)
}

//获取二 三级目录
function itemShowList(append_dom,data){
    var thisText //当前点击对象的text值
    if (data) {
        append_dom.html("");
        for (var i = 0; i < data.length; i++) {
            append_dom.append("<a  num='" + i + "' class='itemName''>" + data[i].name + "</a>");
        };
        append_dom.on("click","a",function() {
            list_n = $(this).attr("num");
            var itemShowList_data=data[list_n].childs;
            class_num = parseInt(append_dom.attr("class_num")) + 1 ;

            for(var i = $(".itemShow .showItem").length;i > 0 ;i-- ){
                if($(".itemShow .showItem").eq(i).attr("class_num") > $(this).parent().attr("class_num") ){
                    $(".itemShow .showItem").eq(i).remove();
                }
            };
            if(itemShowList_data){
                $(".itemShow").append("<div class='itemShowList"+class_num+" showItem'></div>");
                $(".itemShowList"+class_num).attr("class_num",class_num);
                itemShowList($(".itemShowList"+class_num),itemShowList_data);
            }else{
                thisText=$(this).html()
                itemShowButton(thisText)
            };
        });
        var docuHeight=$(document).height()  //页面可视区域
        var sihHeight=docuHeight-250
        $(".showItem").height(sihHeight)
    }
}


/*目录提交  str为点击的目录的值
 * date 价格日期
 * */
function itemShowButton(str){
    closeItemShow()
    var startValue=0 //初始值
    var limitValue=20 //一次取出多少条数据
    var price_Data=""
    var wuziName=""
    var regionSelect=""
    var citySelect=""
    var specification=""
    $.ajax({
            url: '../json/demoSelect.json',
            data:{str:str,start:startValue,limit:limitValue},
            type : 'post',
            dataType : 'json',
            success:function(data){
                jsonData=data
                var trList=""  //保存获取的数据
                var jgxx=data.jgxx  //返回的json里面的jgxx数据
                var count=data.count //总条数
                for(var i=0;i<jgxx.length;i++){
                    trList+="<tr>"
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
                asButton+="<a>上一页</a>"
                asButton+="<p>"+pageNo+"/"+countPages+"</p>"
                if(countPages>1){
                    nextStartRow=pageNo*limitValue
                    asButton+="<a class=clickCursor onclick=goPage('"+price_Data+"','"+wuziName+"','"+regionSelect+"','"+citySelect+"','"+specification+"','"+nextStartRow+"','"+limitValue+"','next')>下一页</a>"
                }else{
                    asButton+="<a>下一页</a>"
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
function goPage(date,name,regionSelect,citySelect,specification,start,limit,isGo){
    $(".as_tbody").html("")
    $(".listperAuth_button").html("")
    $.ajax({
        url: '../json/demoSelect.json',
        data:{date:date,name:name,regionSelect:regionSelect,citySelect:citySelect,specification:specification,start:start,limit:limit},
        type : 'post',
        dataType : 'json',
        success:function(data){
            var trList=""  //保存获取的数据
            var jgxx=data.jgxx  //返回的json里面的jgxx数据
            var count=data.count //总条数
            for(var i=0;i<jgxx.length;i++){
                trList+="<tr>"
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
            var limitValue=20
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
            var preStartRow //上一页开始显示的编号
            var nextStartRow//下一页开始显示的编号
            if(pageNo>1){
                preStartRow=(pageNo-2)*limitValue
                asButton+="<a class=clickCursor onclick=goPage('"+date+"','"+name+"','"+regionSelect+"','"+citySelect+"','"+specification+"','"+preStartRow+"','"+limitValue+"','pre')>上一页</a>"
            }else{
                asButton+="<a>上一页</a>"
            }
            asButton+="<p>"+pageNo+"/"+countPages+"</p>"
            if(countPages>pageNo){
                nextStartRow=pageNo*limitValue
                asButton+="<a class=clickCursor onclick=goPage('"+date+"','"+name+"','"+regionSelect+"','"+citySelect+"','"+specification+"','"+preStartRow+"','"+nextStartRow+"','"+limitValue+"','next')>下一页</a>"
            }else{
                asButton+="<a>下一页</a>"
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
    var limitValue=20 //一次取出多少条数据
    var price_Data=$(".price_Data").val()
    var wuziName=$(".wuziName").val()
    var regionSelect=$(".regionSelect option:selected").val()
    var citySelect=$(".citySelect option:selected").val()
    var specification=$(".specification").val()
    $.ajax({
        url:"../json/demoSelect.json",
        data:{date:price_Data,name:wuziName,regionSelect:regionSelect,citySelect:citySelect,specification:specification,start:startValue,limit:limitValue},
        type:"post",
        dataType:"json",
        success:function(data){
            jsonData=data
            var trList=""  //保存获取的数据
            var jgxx=data.jgxx  //返回的json里面的jgxx数据
            var count=data.count //总条数
            for(var i=0;i<jgxx.length;i++){
                trList+="<tr>"
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
            asButton+="<a>上一页</a>"
            asButton+="<p>"+pageNo+"/"+countPages+"</p>"
            if(countPages>1){
                nextStartRow=pageNo*limitValue
                asButton+="<a class=clickCursor onclick=goPage('"+price_Data+"','"+wuziName+"','"+regionSelect+"','"+citySelect+"','"+specification+"','"+nextStartRow+"','"+limitValue+"','next')>下一页</a>"
            }else{
                asButton+="<a>下一页</a>"
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
    $(".citySelect").html(" ")
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

    hisPrice_standard_p+="<p>"+name+"</p>"
    hisPrice_standard_p+="<p>"+specification+"</p>"
    hisPrice_standard_p+="<p>"+texture+"</p>"
    hisPrice_standard_p+="<p>"+company+"</p>"
    hisPrice_standard_p+="<p>"+area+"</p>"
    hisPrice_standard_p+="<p>"+city+"</p>"
    $(".hisPrice_standard").append(hisPrice_standard_p)
    /*
     * 通过名称和规格获取厂家
     * name 名称
     * specification 规格
     * */
    $.ajax({
        url:"../json/demo_product.json",
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

            //获取页面可视区域高度和prShHeight，然后判断，如果prShHeight小于docuHeight，productInformation的高度为prShHeight
            var docuHeight=$(document).height()  //页面可视区域
            var hisPhHeight=$(".hisPrice").height()
            //当hisPhHeight<docuHeight时，设定新的hisPrice高度
            var newHisHeight
            newHisHeight=docuHeight-120
            if(hisPhHeight<docuHeight){
                $(".priceInformation").height(docuHeight)
                $(".hisPrice").height(newHisHeight)
            }

        }
    })
    /*
     * 调用方法，获取第一个城市的数据
     * id
     * */
    $.ajax({
        url:"../json/demo_btj.json",
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
            $(".his_tbody").append(hisTbodyList)
        }
    })
}

/*关闭详情页*/
function closeDetails(){
    $(".priceInformation").removeClass("displayBlock").addClass("displayNo")
    $(".priSeldetails").removeClass("colorRed").addClass("colorBlack")
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
    //$(".region_city").html("")
    //$(".region_city").append("<option value=''></option>")
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
        url:"../json/demo_btj.json",
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
            hisPrice_contrast_p+="<p>"+name+"</p>"
            hisPrice_contrast_p+="<p>"+specification+"</p>"
            hisPrice_contrast_p+="<p>"+texture+"</p>"
            hisPrice_contrast_p+="<p>"+company+"</p>"
            hisPrice_contrast_p+="<p>"+area+"</p>"
            hisPrice_contrast_p+="<p>"+city+"</p>"
            $(".hisPrice_contrast").append(hisPrice_contrast_p)
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
        width: "500",
        height: "300",
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
    selectedValue=$("."+str+" option:selected").val()
    $("."+str+"_city").html(" ")
    if(selectedValue){
        if(selectedValue=="华北区") {
            cityList += "<option value='北京市'>北京市</option>"
            cityList += "<option value='天津市'>天津市</option>"
            cityList += "<option value='石家庄'>石家庄</option>"
            cityList += "<option value='保定市'>保定市</option>"
            cityList += "<option value='秦皇岛'>秦皇岛</option>"
            cityList += "<option value='唐山市'>唐山市</option>"
            cityList += "<option value='邯郸市'>邯郸市</option>"
            cityList += "<option value='邢台市'>邢台市</option>"
            cityList += "<option value='沧州市'>沧州市</option>"
            cityList += "<option value='承德市'>承德市</option>"
            cityList += "<option value='廊坊市'>廊坊市</option>"
            cityList += "<option value='衡水市'>衡水市</option>"
            cityList += "<option value='张家口'>张家口</option>"
            cityList += "<option value='太原市'>太原市</option>"
            cityList += "<option value='大同市'>大同市</option>"
            cityList += "<option value='阳泉市'>阳泉市</option>"
            cityList += "<option value='长治市'>长治市</option>"
            cityList += "<option value='临汾市'>临汾市</option>"
            cityList += "<option value='晋中市'>晋中市</option>"
            cityList += "<option value='运城市'>运城市</option>"
            cityList += "<option value='晋城市'>晋城市</option>"
            cityList += "<option value='忻州市'>忻州市</option>"
            cityList += "<option value='朔州市'>朔州市</option>"
            cityList += "<option value='吕梁市'>吕梁市</option>"
            cityList += "<option value='呼和浩特'>呼和浩特</option>"
            cityList += "<option value='呼伦贝尔'>呼伦贝尔</option>"
            cityList += "<option value='包头市'>包头市</option>"
            cityList += "<option value='赤峰市'>赤峰市</option>"
            cityList += "<option value='乌海市'>乌海市</option>"
            cityList += "<option value='通辽市'>通辽市</option>"
            cityList += "<option value='鄂尔多斯'>鄂尔多斯</option>"
            cityList += "<option value='乌兰察布'>乌兰察布</option>"
            cityList += "<option value='巴彦淖尔'>巴彦淖尔</option>"
        }
        if(selectedValue=="东北区") {
            cityList+="<option value='大连市'>大连市</option>"
            cityList+="<option value='沈阳市'>沈阳市</option>"
            cityList+="<option value='盘锦市'>盘锦市</option>"
            cityList+="<option value='鞍山市'>鞍山市</option>"
            cityList+="<option value='抚顺市'>抚顺市</option>"
            cityList+="<option value='本溪市'>本溪市</option>"
            cityList+="<option value='铁岭市'>铁岭市</option>"
            cityList+="<option value='锦州市'>锦州市</option>"
            cityList+="<option value='丹东市'>丹东市</option>"
            cityList+="<option value='辽阳市'>辽阳市</option>"
            cityList+="<option value='葫芦岛'>葫芦岛</option>"
            cityList+="<option value='阜新市'>阜新市</option>"
            cityList+="<option value='朝阳市'>朝阳市</option>"
            cityList+="<option value='营口市'>营口市</option>"
            cityList+="<option value='长春市'>长春市</option>"
            cityList+="<option value='吉林市'>吉林市</option>"
            cityList+="<option value='通化市'>通化市</option>"
            cityList+="<option value='白城市'>白城市</option>"
            cityList+="<option value='四平市'>四平市</option>"
            cityList+="<option value='辽源市'>辽源市</option>"
            cityList+="<option value='松原市'>松原市</option>"
            cityList+="<option value='白山市'>白山市</option>"
            cityList+="<option value='哈尔滨市'>哈尔滨市</option>"
            cityList+="<option value='伊春市'>伊春市</option>"
            cityList+="<option value='牡丹江'>牡丹江</option>"
            cityList+="<option value='大庆市'>大庆市</option>"
            cityList+="<option value='鸡西市'>鸡西市</option>"
            cityList+="<option value='鹤岗市'>鹤岗市</option>"
            cityList+="<option value='绥化市'>绥化市</option>"
            cityList+="<option value='双鸭山'>双鸭山</option>"
            cityList+="<option value='七台河'>七台河</option>"
            cityList+="<option value='佳木斯'>佳木斯</option>"
            cityList+="<option value='黑河市'>黑河市</option>"
            cityList+="<option value='齐齐哈尔市'>齐齐哈尔市</option>"
        }
        if(selectedValue=="华东区"){
            cityList+="<option value='南京市'>南京市</option>"
            cityList+="<option value='无锡市'>无锡市</option>"
            cityList+="<option value='常州市'>常州市</option>"
            cityList+="<option value='扬州市'>扬州市</option>"
            cityList+="<option value='徐州市'>徐州市</option>"
            cityList+="<option value='苏州市'>苏州市</option>"
            cityList+="<option value='连云港'>连云港</option>"
            cityList+="<option value='盐城市'>盐城市</option>"
            cityList+="<option value='淮安市'>淮安市</option>"
            cityList+="<option value='宿迁市'>宿迁市</option>"
            cityList+="<option value='镇江市'>镇江市</option>"
            cityList+="<option value='南通市'>南通市</option>"
            cityList+="<option value='泰州市'>泰州市</option>"
            cityList+="<option value='杭州市'>杭州市</option>"
            cityList+="<option value='宁波市'>宁波市</option>"
            cityList+="<option value='绍兴市'>绍兴市</option>"
            cityList+="<option value='温州市'>温州市</option>"
            cityList+="<option value='湖州市'>湖州市</option>"
            cityList+="<option value='嘉兴市'>嘉兴市</option>"
            cityList+="<option value='台州市'>台州市</option>"
            cityList+="<option value='金华市'>金华市</option>"
            cityList+="<option value='舟山市'>舟山市</option>"
            cityList+="<option value='衢州市'>衢州市</option>"
            cityList+="<option value='丽水市'>丽水市</option>"
            cityList+="<option value='合肥市'>合肥市</option>"
            cityList+="<option value='芜湖市'>芜湖市</option>"
            cityList+="<option value='亳州市'>亳州市</option>"
            cityList+="<option value='马鞍山'>马鞍山</option>"
            cityList+="<option value='池州市'>池州市</option>"
            cityList+="<option value='淮南市'>淮南市</option>"
            cityList+="<option value='淮北市'>淮北市</option>"
            cityList+="<option value='蚌埠市'>蚌埠市</option>"
            cityList+="<option value='巢湖市'>巢湖市</option>"
            cityList+="<option value='安庆市'>安庆市</option>"
            cityList+="<option value='宿州市'>宿州市</option>"
            cityList+="<option value='铜陵市'>铜陵市</option>"
            cityList+="<option value='滁州市'>滁州市</option>"
            cityList+="<option value='黄山市'>黄山市</option>"
            cityList+="<option value='六安市'>六安市</option>"
            cityList+="<option value='阜阳市'>阜阳市</option>"
            cityList+="<option value='厦门市'>厦门市</option>"
            cityList+="<option value='福州市'>福州市</option>"
            cityList+="<option value='泉州市'>泉州市</option>"
            cityList+="<option value='漳州市'>漳州市</option>"
            cityList+="<option value='南平市'>南平市</option>"
            cityList+="<option value='三明市'>三明市</option>"
            cityList+="<option value='龙岩市'>龙岩市</option>"
            cityList+="<option value='莆田市'>莆田市</option>"
            cityList+="<option value='宁德市'>宁德市</option>"
            cityList+="<option value='青岛市'>青岛市</option>"
            cityList+="<option value='济南市'>济南市</option>"
            cityList+="<option value='潍坊市'>潍坊市</option>"
            cityList+="<option value='淄博市'>淄博市</option>"
            cityList+="<option value='威海市'>威海市</option>"
            cityList+="<option value='枣庄市'>枣庄市</option>"
            cityList+="<option value='泰安市'>泰安市</option>"
            cityList+="<option value='临沂市'>临沂市</option>"
            cityList+="<option value='东营市'>东营市</option>"
            cityList+="<option value='济宁市'>济宁市</option>"
            cityList+="<option value='烟台市'>烟台市</option>"
            cityList+="<option value='菏泽市'>菏泽市</option>"
            cityList+="<option value='日照市'>日照市</option>"
            cityList+="<option value='德州市'>德州市</option>"
            cityList+="<option value='聊城市'>聊城市</option>"
            cityList+="<option value='滨州市'>滨州市</option>"
            cityList+="<option value='莱芜市'>莱芜市</option>"
            cityList+="<option value='上海市'>上海市</option>"
            cityList+="<option value='南昌市'>南昌市</option>"
        }
        if(selectedValue=="华中区"){
            cityList+="<option value='赣州市'>赣州市</option>"
            cityList+="<option value='景德镇'>景德镇</option>"
            cityList+="<option value='九江市'>九江市</option>"
            cityList+="<option value='萍乡市'>萍乡市</option>"
            cityList+="<option value='新余市'>新余市</option>"
            cityList+="<option value='抚州市'>抚州市</option>"
            cityList+="<option value='宜春市'>宜春市</option>"
            cityList+="<option value='上饶市'>上饶市</option>"
            cityList+="<option value='鹰潭市'>鹰潭市</option>"
            cityList+="<option value='吉安市'>吉安市</option>"
            cityList+="<option value='郑州市'>郑州市</option>"
            cityList+="<option value='洛阳市'>洛阳市</option>"
            cityList+="<option value='焦作市'>焦作市</option>"
            cityList+="<option value='商丘市'>商丘市</option>"
            cityList+="<option value='信阳市'>信阳市</option>"
            cityList+="<option value='新乡市'>新乡市</option>"
            cityList+="<option value='安阳市'>安阳市</option>"
            cityList+="<option value='开封市'>开封市</option>"
            cityList+="<option value='漯河市'>漯河市</option>"
            cityList+="<option value='南阳市'>南阳市</option>"
            cityList+="<option value='鹤壁市'>鹤壁市</option>"
            cityList+="<option value='平顶山'>平顶山</option>"
            cityList+="<option value='濮阳市'>濮阳市</option>"
            cityList+="<option value='许昌市'>许昌市</option>"
            cityList+="<option value='周口市'>周口市</option>"
            cityList+="<option value='三门峡'>三门峡</option>"
            cityList+="<option value='驻马店'>驻马店</option>"
            cityList+="<option value='平顶山市'>平顶山市</option>"
            cityList+="<option value='荆门市'>荆门市</option>"
            cityList+="<option value='咸宁市'>咸宁市</option>"
            cityList+="<option value='襄樊市'>襄樊市</option>"
            cityList+="<option value='荆州市'>荆州市</option>"
            cityList+="<option value='黄石市'>黄石市</option>"
            cityList+="<option value='宜昌市'>宜昌市</option>"
            cityList+="<option value='随州市'>随州市</option>"
            cityList+="<option value='鄂州市'>鄂州市</option>"
            cityList+="<option value='孝感市'>孝感市</option>"
            cityList+="<option value='黄冈市'>黄冈市</option>"
            cityList+="<option value='十堰市'>十堰市</option>"
            cityList+="<option value='武汉市'>武汉市</option>"
            cityList+="<option value='大冶市'>大冶市</option>"
            cityList+="<option value='长沙市'>长沙市</option>"
            cityList+="<option value='郴州市'>郴州市</option>"
            cityList+="<option value='娄底市'>娄底市</option>"
            cityList+="<option value='衡阳市'>衡阳市</option>"
            cityList+="<option value='株洲市'>株洲市</option>"
            cityList+="<option value='湘潭市'>湘潭市</option>"
            cityList+="<option value='岳阳市'>岳阳市</option>"
            cityList+="<option value='常德市'>常德市</option>"
            cityList+="<option value='邵阳市'>邵阳市</option>"
            cityList+="<option value='益阳市'>益阳市</option>"
            cityList+="<option value='永州市'>永州市</option>"
            cityList+="<option value='张家界'>张家界</option>"
            cityList+="<option value='怀化市'>怀化市</option>"
            cityList+="<option value='江门市'>江门市</option>"
        }
        if(selectedValue=="华南区"){
            cityList+="<option value='佛山市'>佛山市</option>"
            cityList+="<option value='汕头市'>汕头市</option>"
            cityList+="<option value='湛江市'>湛江市</option>"
            cityList+="<option value='韶关市'>韶关市</option>"
            cityList+="<option value='中山市'>中山市</option>"
            cityList+="<option value='珠海市'>珠海市</option>"
            cityList+="<option value='茂名市'>茂名市</option>"
            cityList+="<option value='肇庆市'>肇庆市</option>"
            cityList+="<option value='阳江市'>阳江市</option>"
            cityList+="<option value='惠州市'>惠州市</option>"
            cityList+="<option value='潮州市'>潮州市</option>"
            cityList+="<option value='揭阳市'>揭阳市</option>"
            cityList+="<option value='清远市'>清远市</option>"
            cityList+="<option value='河源市'>河源市</option>"
            cityList+="<option value='东莞市'>东莞市</option>"
            cityList+="<option value='汕尾市'>汕尾市</option>"
            cityList+="<option value='云浮市'>云浮市</option>"
            cityList+="<option value='广州市'>广州市</option>"
            cityList+="<option value='深圳市'>深圳市</option>"
            cityList+="<option value='南宁市'>南宁市</option>"
            cityList+="<option value='贺州市'>贺州市</option>"
            cityList+="<option value='柳州市'>柳州市</option>"
            cityList+="<option value='桂林市'>桂林市</option>"
            cityList+="<option value='梧州市'>梧州市</option>"
            cityList+="<option value='北海市'>北海市</option>"
            cityList+="<option value='玉林市'>玉林市</option>"
            cityList+="<option value='钦州市'>钦州市</option>"
            cityList+="<option value='百色市'>百色市</option>"
            cityList+="<option value='防城港'>防城港</option>"
            cityList+="<option value='贵港市'>贵港市</option>"
            cityList+="<option value='河池市'>河池市</option>"
            cityList+="<option value='崇左市'>崇左市</option>"
            cityList+="<option value='来宾市'>来宾市</option>"
            cityList+="<option value='海口市'>海口市</option>"
            cityList+="<option value='三亚市'>三亚市</option>"
        }
        if(selectedValue=="西北区"){
            cityList+="<option value='咸阳市'>咸阳市</option>"
            cityList+="<option value='榆林市'>榆林市</option>"
            cityList+="<option value='宝鸡市'>宝鸡市</option>"
            cityList+="<option value='铜川市'>铜川市</option>"
            cityList+="<option value='渭南市'>渭南市</option>"
            cityList+="<option value='汉中市'>汉中市</option>"
            cityList+="<option value='安康市'>安康市</option>"
            cityList+="<option value='商洛市'>商洛市</option>"
            cityList+="<option value='延安市'>延安市</option>"
            cityList+="<option value='西安市'>西安市</option>"
            cityList+="<option value='兰州市'>兰州市</option>"
            cityList+="<option value='白银市'>白银市</option>"
            cityList+="<option value='武威市'>武威市</option>"
            cityList+="<option value='金昌市'>金昌市</option>"
            cityList+="<option value='平凉市'>平凉市</option>"
            cityList+="<option value='张掖市'>张掖市</option>"
            cityList+="<option value='嘉峪关'>嘉峪关</option>"
            cityList+="<option value='酒泉市'>酒泉市</option>"
            cityList+="<option value='庆阳市'>庆阳市</option>"
            cityList+="<option value='定西市'>定西市</option>"
            cityList+="<option value='陇南市'>陇南市</option>"
            cityList+="<option value='天水市'>天水市</option>"
            cityList+="<option value='西宁市'>西宁市</option>"
            cityList+="<option value='宁夏'>宁夏</option>"
            cityList+="<option value='乌鲁木齐'>乌鲁木齐</option>"
            cityList+="<option value='银川市'>银川市</option>"
            cityList+="<option value='固原市'>固原市</option>"
            cityList+="<option value='青铜峡市'>青铜峡市</option>"
            cityList+="<option value='石嘴山市'>石嘴山市</option>"
            cityList+="<option value='中卫市'>中卫市</option>"
        }
        if(selectedValue=="西南区"){
            cityList+="<option value='成都市'>成都市</option>"
            cityList+="<option value='乐山市'>乐山市</option>"
            cityList+="<option value='雅安市'>雅安市</option>"
            cityList+="<option value='内江市'>内江市</option>"
            cityList+="<option value='宜宾市'>宜宾市</option>"
            cityList+="<option value='广元市'>广元市</option>"
            cityList+="<option value='达州市'>达州市</option>"
            cityList+="<option value='资阳市'>资阳市</option>"
            cityList+="<option value='绵阳市'>绵阳市</option>"
            cityList+="<option value='眉山市'>眉山市</option>"
            cityList+="<option value='巴中市'>巴中市</option>"
            cityList+="<option value='攀枝花'>攀枝花</option>"
            cityList+="<option value='遂宁市'>遂宁市</option>"
            cityList+="<option value='德阳市'>德阳市</option>"
            cityList+="<option value='广安市'>广安市</option>"
            cityList+="<option value='南充市'>南充市</option>"
            cityList+="<option value='自贡市'>自贡市</option>"
            cityList+="<option value='泸州市'>泸州市</option>"
            cityList+="<option value='昆明市'>昆明市</option>"
            cityList+="<option value='玉溪市'>玉溪市</option>"
            cityList+="<option value='丽江市'>丽江市</option>"
            cityList+="<option value='临沧市'>临沧市</option>"
            cityList+="<option value='曲靖市'>曲靖市</option>"
            cityList+="<option value='昭通市'>昭通市</option>"
            cityList+="<option value='保山市'>保山市</option>"
            cityList+="<option value='贵阳市'>贵阳市</option>"
            cityList+="<option value='安顺市'>安顺市</option>"
            cityList+="<option value='遵义市'>遵义市</option>"
            cityList+="<option value='六盘水'>六盘水</option>"
            cityList+="<option value='拉萨市'>拉萨市</option>"
            cityList+="<option value='阿里'>阿里</option>"
            cityList+="<option value='重庆市'>重庆市</option>"
        }

        $("."+str+"_city").append(cityList)
    }
}

function allCityList(str){
    var cityList="" //存放城市
    cityList += "<option value=''></option>"
    cityList += "<option value='北京市'>北京市</option>"
    cityList += "<option value='天津市'>天津市</option>"
    cityList += "<option value='石家庄'>石家庄</option>"
    cityList += "<option value='保定市'>保定市</option>"
    cityList += "<option value='秦皇岛'>秦皇岛</option>"
    cityList += "<option value='唐山市'>唐山市</option>"
    cityList += "<option value='邯郸市'>邯郸市</option>"
    cityList += "<option value='邢台市'>邢台市</option>"
    cityList += "<option value='沧州市'>沧州市</option>"
    cityList += "<option value='承德市'>承德市</option>"
    cityList += "<option value='廊坊市'>廊坊市</option>"
    cityList += "<option value='衡水市'>衡水市</option>"
    cityList += "<option value='张家口'>张家口</option>"
    cityList += "<option value='太原市'>太原市</option>"
    cityList += "<option value='大同市'>大同市</option>"
    cityList += "<option value='阳泉市'>阳泉市</option>"
    cityList += "<option value='长治市'>长治市</option>"
    cityList += "<option value='临汾市'>临汾市</option>"
    cityList += "<option value='晋中市'>晋中市</option>"
    cityList += "<option value='运城市'>运城市</option>"
    cityList += "<option value='晋城市'>晋城市</option>"
    cityList += "<option value='忻州市'>忻州市</option>"
    cityList += "<option value='朔州市'>朔州市</option>"
    cityList += "<option value='吕梁市'>吕梁市</option>"
    cityList += "<option value='呼和浩特'>呼和浩特</option>"
    cityList += "<option value='呼伦贝尔'>呼伦贝尔</option>"
    cityList += "<option value='包头市'>包头市</option>"
    cityList += "<option value='赤峰市'>赤峰市</option>"
    cityList += "<option value='乌海市'>乌海市</option>"
    cityList += "<option value='通辽市'>通辽市</option>"
    cityList += "<option value='鄂尔多斯'>鄂尔多斯</option>"
    cityList += "<option value='乌兰察布'>乌兰察布</option>"
    cityList += "<option value='巴彦淖尔'>巴彦淖尔</option>"
    cityList+="<option value='大连市'>大连市</option>"
    cityList+="<option value='沈阳市'>沈阳市</option>"
    cityList+="<option value='盘锦市'>盘锦市</option>"
    cityList+="<option value='鞍山市'>鞍山市</option>"
    cityList+="<option value='抚顺市'>抚顺市</option>"
    cityList+="<option value='本溪市'>本溪市</option>"
    cityList+="<option value='铁岭市'>铁岭市</option>"
    cityList+="<option value='锦州市'>锦州市</option>"
    cityList+="<option value='丹东市'>丹东市</option>"
    cityList+="<option value='辽阳市'>辽阳市</option>"
    cityList+="<option value='葫芦岛'>葫芦岛</option>"
    cityList+="<option value='阜新市'>阜新市</option>"
    cityList+="<option value='朝阳市'>朝阳市</option>"
    cityList+="<option value='营口市'>营口市</option>"
    cityList+="<option value='长春市'>长春市</option>"
    cityList+="<option value='吉林市'>吉林市</option>"
    cityList+="<option value='通化市'>通化市</option>"
    cityList+="<option value='白城市'>白城市</option>"
    cityList+="<option value='四平市'>四平市</option>"
    cityList+="<option value='辽源市'>辽源市</option>"
    cityList+="<option value='松原市'>松原市</option>"
    cityList+="<option value='白山市'>白山市</option>"
    cityList+="<option value='哈尔滨市'>哈尔滨市</option>"
    cityList+="<option value='伊春市'>伊春市</option>"
    cityList+="<option value='牡丹江'>牡丹江</option>"
    cityList+="<option value='大庆市'>大庆市</option>"
    cityList+="<option value='鸡西市'>鸡西市</option>"
    cityList+="<option value='鹤岗市'>鹤岗市</option>"
    cityList+="<option value='绥化市'>绥化市</option>"
    cityList+="<option value='双鸭山'>双鸭山</option>"
    cityList+="<option value='七台河'>七台河</option>"
    cityList+="<option value='佳木斯'>佳木斯</option>"
    cityList+="<option value='黑河市'>黑河市</option>"
    cityList+="<option value='齐齐哈尔市'>齐齐哈尔市</option>"
    cityList+="<option value='南京市'>南京市</option>"
    cityList+="<option value='无锡市'>无锡市</option>"
    cityList+="<option value='常州市'>常州市</option>"
    cityList+="<option value='扬州市'>扬州市</option>"
    cityList+="<option value='徐州市'>徐州市</option>"
    cityList+="<option value='苏州市'>苏州市</option>"
    cityList+="<option value='连云港'>连云港</option>"
    cityList+="<option value='盐城市'>盐城市</option>"
    cityList+="<option value='淮安市'>淮安市</option>"
    cityList+="<option value='宿迁市'>宿迁市</option>"
    cityList+="<option value='镇江市'>镇江市</option>"
    cityList+="<option value='南通市'>南通市</option>"
    cityList+="<option value='泰州市'>泰州市</option>"
    cityList+="<option value='杭州市'>杭州市</option>"
    cityList+="<option value='宁波市'>宁波市</option>"
    cityList+="<option value='绍兴市'>绍兴市</option>"
    cityList+="<option value='温州市'>温州市</option>"
    cityList+="<option value='湖州市'>湖州市</option>"
    cityList+="<option value='嘉兴市'>嘉兴市</option>"
    cityList+="<option value='台州市'>台州市</option>"
    cityList+="<option value='金华市'>金华市</option>"
    cityList+="<option value='舟山市'>舟山市</option>"
    cityList+="<option value='衢州市'>衢州市</option>"
    cityList+="<option value='丽水市'>丽水市</option>"
    cityList+="<option value='合肥市'>合肥市</option>"
    cityList+="<option value='芜湖市'>芜湖市</option>"
    cityList+="<option value='亳州市'>亳州市</option>"
    cityList+="<option value='马鞍山'>马鞍山</option>"
    cityList+="<option value='池州市'>池州市</option>"
    cityList+="<option value='淮南市'>淮南市</option>"
    cityList+="<option value='淮北市'>淮北市</option>"
    cityList+="<option value='蚌埠市'>蚌埠市</option>"
    cityList+="<option value='巢湖市'>巢湖市</option>"
    cityList+="<option value='安庆市'>安庆市</option>"
    cityList+="<option value='宿州市'>宿州市</option>"
    cityList+="<option value='铜陵市'>铜陵市</option>"
    cityList+="<option value='滁州市'>滁州市</option>"
    cityList+="<option value='黄山市'>黄山市</option>"
    cityList+="<option value='六安市'>六安市</option>"
    cityList+="<option value='阜阳市'>阜阳市</option>"
    cityList+="<option value='厦门市'>厦门市</option>"
    cityList+="<option value='福州市'>福州市</option>"
    cityList+="<option value='泉州市'>泉州市</option>"
    cityList+="<option value='漳州市'>漳州市</option>"
    cityList+="<option value='南平市'>南平市</option>"
    cityList+="<option value='三明市'>三明市</option>"
    cityList+="<option value='龙岩市'>龙岩市</option>"
    cityList+="<option value='莆田市'>莆田市</option>"
    cityList+="<option value='宁德市'>宁德市</option>"
    cityList+="<option value='青岛市'>青岛市</option>"
    cityList+="<option value='济南市'>济南市</option>"
    cityList+="<option value='潍坊市'>潍坊市</option>"
    cityList+="<option value='淄博市'>淄博市</option>"
    cityList+="<option value='威海市'>威海市</option>"
    cityList+="<option value='枣庄市'>枣庄市</option>"
    cityList+="<option value='泰安市'>泰安市</option>"
    cityList+="<option value='临沂市'>临沂市</option>"
    cityList+="<option value='东营市'>东营市</option>"
    cityList+="<option value='济宁市'>济宁市</option>"
    cityList+="<option value='烟台市'>烟台市</option>"
    cityList+="<option value='菏泽市'>菏泽市</option>"
    cityList+="<option value='日照市'>日照市</option>"
    cityList+="<option value='德州市'>德州市</option>"
    cityList+="<option value='聊城市'>聊城市</option>"
    cityList+="<option value='滨州市'>滨州市</option>"
    cityList+="<option value='莱芜市'>莱芜市</option>"
    cityList+="<option value='上海市'>上海市</option>"
    cityList+="<option value='南昌市'>南昌市</option>"
    cityList+="<option value='赣州市'>赣州市</option>"
    cityList+="<option value='景德镇'>景德镇</option>"
    cityList+="<option value='九江市'>九江市</option>"
    cityList+="<option value='萍乡市'>萍乡市</option>"
    cityList+="<option value='新余市'>新余市</option>"
    cityList+="<option value='抚州市'>抚州市</option>"
    cityList+="<option value='宜春市'>宜春市</option>"
    cityList+="<option value='上饶市'>上饶市</option>"
    cityList+="<option value='鹰潭市'>鹰潭市</option>"
    cityList+="<option value='吉安市'>吉安市</option>"
    cityList+="<option value='郑州市'>郑州市</option>"
    cityList+="<option value='洛阳市'>洛阳市</option>"
    cityList+="<option value='焦作市'>焦作市</option>"
    cityList+="<option value='商丘市'>商丘市</option>"
    cityList+="<option value='信阳市'>信阳市</option>"
    cityList+="<option value='新乡市'>新乡市</option>"
    cityList+="<option value='安阳市'>安阳市</option>"
    cityList+="<option value='开封市'>开封市</option>"
    cityList+="<option value='漯河市'>漯河市</option>"
    cityList+="<option value='南阳市'>南阳市</option>"
    cityList+="<option value='鹤壁市'>鹤壁市</option>"
    cityList+="<option value='平顶山'>平顶山</option>"
    cityList+="<option value='濮阳市'>濮阳市</option>"
    cityList+="<option value='许昌市'>许昌市</option>"
    cityList+="<option value='周口市'>周口市</option>"
    cityList+="<option value='三门峡'>三门峡</option>"
    cityList+="<option value='驻马店'>驻马店</option>"
    cityList+="<option value='平顶山市'>平顶山市</option>"
    cityList+="<option value='荆门市'>荆门市</option>"
    cityList+="<option value='咸宁市'>咸宁市</option>"
    cityList+="<option value='襄樊市'>襄樊市</option>"
    cityList+="<option value='荆州市'>荆州市</option>"
    cityList+="<option value='黄石市'>黄石市</option>"
    cityList+="<option value='宜昌市'>宜昌市</option>"
    cityList+="<option value='随州市'>随州市</option>"
    cityList+="<option value='鄂州市'>鄂州市</option>"
    cityList+="<option value='孝感市'>孝感市</option>"
    cityList+="<option value='黄冈市'>黄冈市</option>"
    cityList+="<option value='十堰市'>十堰市</option>"
    cityList+="<option value='武汉市'>武汉市</option>"
    cityList+="<option value='大冶市'>大冶市</option>"
    cityList+="<option value='长沙市'>长沙市</option>"
    cityList+="<option value='郴州市'>郴州市</option>"
    cityList+="<option value='娄底市'>娄底市</option>"
    cityList+="<option value='衡阳市'>衡阳市</option>"
    cityList+="<option value='株洲市'>株洲市</option>"
    cityList+="<option value='湘潭市'>湘潭市</option>"
    cityList+="<option value='岳阳市'>岳阳市</option>"
    cityList+="<option value='常德市'>常德市</option>"
    cityList+="<option value='邵阳市'>邵阳市</option>"
    cityList+="<option value='益阳市'>益阳市</option>"
    cityList+="<option value='永州市'>永州市</option>"
    cityList+="<option value='张家界'>张家界</option>"
    cityList+="<option value='怀化市'>怀化市</option>"
    cityList+="<option value='江门市'>江门市</option>"
    cityList+="<option value='佛山市'>佛山市</option>"
    cityList+="<option value='汕头市'>汕头市</option>"
    cityList+="<option value='湛江市'>湛江市</option>"
    cityList+="<option value='韶关市'>韶关市</option>"
    cityList+="<option value='中山市'>中山市</option>"
    cityList+="<option value='珠海市'>珠海市</option>"
    cityList+="<option value='茂名市'>茂名市</option>"
    cityList+="<option value='肇庆市'>肇庆市</option>"
    cityList+="<option value='阳江市'>阳江市</option>"
    cityList+="<option value='惠州市'>惠州市</option>"
    cityList+="<option value='潮州市'>潮州市</option>"
    cityList+="<option value='揭阳市'>揭阳市</option>"
    cityList+="<option value='清远市'>清远市</option>"
    cityList+="<option value='河源市'>河源市</option>"
    cityList+="<option value='东莞市'>东莞市</option>"
    cityList+="<option value='汕尾市'>汕尾市</option>"
    cityList+="<option value='云浮市'>云浮市</option>"
    cityList+="<option value='广州市'>广州市</option>"
    cityList+="<option value='深圳市'>深圳市</option>"
    cityList+="<option value='南宁市'>南宁市</option>"
    cityList+="<option value='贺州市'>贺州市</option>"
    cityList+="<option value='柳州市'>柳州市</option>"
    cityList+="<option value='桂林市'>桂林市</option>"
    cityList+="<option value='梧州市'>梧州市</option>"
    cityList+="<option value='北海市'>北海市</option>"
    cityList+="<option value='玉林市'>玉林市</option>"
    cityList+="<option value='钦州市'>钦州市</option>"
    cityList+="<option value='百色市'>百色市</option>"
    cityList+="<option value='防城港'>防城港</option>"
    cityList+="<option value='贵港市'>贵港市</option>"
    cityList+="<option value='河池市'>河池市</option>"
    cityList+="<option value='崇左市'>崇左市</option>"
    cityList+="<option value='来宾市'>来宾市</option>"
    cityList+="<option value='海口市'>海口市</option>"
    cityList+="<option value='三亚市'>三亚市</option>"
    cityList+="<option value='咸阳市'>咸阳市</option>"
    cityList+="<option value='榆林市'>榆林市</option>"
    cityList+="<option value='宝鸡市'>宝鸡市</option>"
    cityList+="<option value='铜川市'>铜川市</option>"
    cityList+="<option value='渭南市'>渭南市</option>"
    cityList+="<option value='汉中市'>汉中市</option>"
    cityList+="<option value='安康市'>安康市</option>"
    cityList+="<option value='商洛市'>商洛市</option>"
    cityList+="<option value='延安市'>延安市</option>"
    cityList+="<option value='西安市'>西安市</option>"
    cityList+="<option value='兰州市'>兰州市</option>"
    cityList+="<option value='白银市'>白银市</option>"
    cityList+="<option value='武威市'>武威市</option>"
    cityList+="<option value='金昌市'>金昌市</option>"
    cityList+="<option value='平凉市'>平凉市</option>"
    cityList+="<option value='张掖市'>张掖市</option>"
    cityList+="<option value='嘉峪关'>嘉峪关</option>"
    cityList+="<option value='酒泉市'>酒泉市</option>"
    cityList+="<option value='庆阳市'>庆阳市</option>"
    cityList+="<option value='定西市'>定西市</option>"
    cityList+="<option value='陇南市'>陇南市</option>"
    cityList+="<option value='天水市'>天水市</option>"
    cityList+="<option value='西宁市'>西宁市</option>"
    cityList+="<option value='宁夏'>宁夏</option>"
    cityList+="<option value='乌鲁木齐'>乌鲁木齐</option>"
    cityList+="<option value='银川市'>银川市</option>"
    cityList+="<option value='固原市'>固原市</option>"
    cityList+="<option value='青铜峡市'>青铜峡市</option>"
    cityList+="<option value='石嘴山市'>石嘴山市</option>"
    cityList+="<option value='中卫市'>中卫市</option>"
    cityList+="<option value='成都市'>成都市</option>"
    cityList+="<option value='乐山市'>乐山市</option>"
    cityList+="<option value='雅安市'>雅安市</option>"
    cityList+="<option value='内江市'>内江市</option>"
    cityList+="<option value='宜宾市'>宜宾市</option>"
    cityList+="<option value='广元市'>广元市</option>"
    cityList+="<option value='达州市'>达州市</option>"
    cityList+="<option value='资阳市'>资阳市</option>"
    cityList+="<option value='绵阳市'>绵阳市</option>"
    cityList+="<option value='眉山市'>眉山市</option>"
    cityList+="<option value='巴中市'>巴中市</option>"
    cityList+="<option value='攀枝花'>攀枝花</option>"
    cityList+="<option value='遂宁市'>遂宁市</option>"
    cityList+="<option value='德阳市'>德阳市</option>"
    cityList+="<option value='广安市'>广安市</option>"
    cityList+="<option value='南充市'>南充市</option>"
    cityList+="<option value='自贡市'>自贡市</option>"
    cityList+="<option value='泸州市'>泸州市</option>"
    cityList+="<option value='昆明市'>昆明市</option>"
    cityList+="<option value='玉溪市'>玉溪市</option>"
    cityList+="<option value='丽江市'>丽江市</option>"
    cityList+="<option value='临沧市'>临沧市</option>"
    cityList+="<option value='曲靖市'>曲靖市</option>"
    cityList+="<option value='昭通市'>昭通市</option>"
    cityList+="<option value='保山市'>保山市</option>"
    cityList+="<option value='贵阳市'>贵阳市</option>"
    cityList+="<option value='安顺市'>安顺市</option>"
    cityList+="<option value='遵义市'>遵义市</option>"
    cityList+="<option value='六盘水'>六盘水</option>"
    cityList+="<option value='拉萨市'>拉萨市</option>"
    cityList+="<option value='阿里'>阿里</option>"
    cityList+="<option value='重庆市'>重庆市</option>"

    $("."+str).append(cityList)
}