/**
 * Created by zb on 2016/4/22.
 */
$(function(){
	   /*改变头部的css*/
    $(".codeUl").removeClass("displayBlock").addClass("displayNo")
    $(".guanliUl").removeClass("displayNo").addClass("displayBlock")

    /*给nav a 绑定一个click事件*/
    $(".nav a").removeClass("colorClick").addClass("colorNoClick")
    $(".materialManage").removeClass("colorNoClick").addClass("colorClick")
})
/*新增物资明细
* 刚打开网页，materManageAdd_tbody里面的tr条数为10条，可以最大显示20条，超过20以后，会出现滚动条
* */
function materManage_Add_add(){
    $(".materManageAdd_tbody").append("<tr><td><input class='material_code' type='text' value=''></td><td><input class='material_name' type='text' value=''></td><td><input class='specification' type='text' value=''></td><td><input class='measurement' type='text' value=''></td><td><input class='isPrecious' type='checkbox'></td> <td><a onclick=materManageAdd_delete(this)>删除</a></td></tr>")
}

/*删除订货明细里面的列表
* 删除点击的行以后，进行判断，如果行数小于10，就给自动添加一条
* */
function materManageAdd_delete(str){
    var trLength=$(".materManageAdd_tbody tr").length //materManageAdd_tbody里面的tr的个数
    /*通过判断tr的个数，如果tr大于10，则直接删除，如果等于10，则删除以后还要再加一个*/
    $(str).parent().parent().remove()
    if(trLength<=10){
        materManage_Add_add()
    }
}

/*保存
* 遍历每行前四列里面的值，将其保存在trInputVal里面
*获取每行的值前进行判断，如果这行的input里面没有值，就跳出循环
* 如果有值，就获取这行的前四个值，然后对第五个值进行checked判断，true为1，false为0
* 所有的tr遍历完以后，全部保存到tableVal
* material转换为json,传给后台
* * */
function materManage_add_save(){
    var flag=true //用来判断每行tr是否有空白input
    var inputValue="" //保存input值
    var trInputVal="" //用来保存每组tr的input
    var tableVal=[] //总的input val
    var isPrecious="" //是否是重要物质
    $(".materManageAdd_tbody tr").each(function(){
        $(this).find("input").each(function(i){
            /*通过i判断，如果超过4，即这行tr里面的的第五个input，就跳出判断，不获取第五个值*/
            if(i>4){
                return false
            }else{
                inputValue=$(this).val()
                if(inputValue==undefined || inputValue=="" || inputValue==null) {
                    flag=false
                }
                if(!flag){
                    return false
                }
            }
        })
        if(flag){
            isPrecious=$(this).find("input").eq(4).is(':checked')?1:0
            trInputVal={"material_code":""+$(this).find("input").eq(0).val()+"","material_name":""+$(this).find("input").eq(1).val()+"","specification":""+$(this).find("input").eq(2).val()+"","measurement":""+$(this).find("input").eq(3).val()+"","isPrecious":""+isPrecious+""}
            tableVal.push(trInputVal)
        }else{
            return false
        }
    })
    var material=JSON.stringify(tableVal)
    if(trInputVal){
        $.ajax({
            url:ctx+"/addMaterial",
            type:"post",
            data:material,
            contentType:"application/json",
            success:function(data){
                window.location.href=ctx+"/material/materialManager";
            }
        })
    }else{
        alert("物资明细表必须有一条数据")
    }
}

function buildConfig()
{
    return {
        delimiter: $('#delimiter').val(),
        newline: getLineEnding(),
        header: $('#header').prop('checked'),
        dynamicTyping: $('#dynamicTyping').prop('checked'),
        preview: parseInt($('#preview').val() || 0),
        step: $('#stream').prop('checked') ? stepFn : undefined,
        encoding: $('#encoding').val(),
        worker: $('#worker').prop('checked'),
        comments: $('#comments').val(),
        complete: completeFn,
        error: errorFn,
        download: $('#download').prop('checked'),
        fastMode: $('#fastmode').prop('checked'),
        skipEmptyLines: $('#skipEmptyLines').prop('checked'),
        chunk: $('#chunk').prop('checked') ? chunkFn : undefined,
        beforeFirstChunk: undefined
    };

    function getLineEnding()
    {
        if ($('#newline-n').is(':checked'))
            return "\n";
        else if ($('#newline-r').is(':checked'))
            return "\r";
        else if ($('#newline-rn').is(':checked'))
            return "\r\n";
        else
            return "";
    }
}

//导入以后返回的数据
function completeFn(){
    end = performance.now();
    if (!$('#stream').prop('checked')
        && !$('#chunk').prop('checked')
        && arguments[0]
        && arguments[0].data)
        rows = arguments[0].data.length;
    var arrayList="" //保存导入的数据
    arrayList=arguments[0].data    //materManageAdd_tbody
    var tbodyList="" //保存到tbody里面的数据
    //console.log(arrayList[0][0])
    for(var i=1;i<arrayList.length-1;i++){
        tbodyList+="<tr>"
        tbodyList+="<td><input class='material_code' type='text' value="+arrayList[i][0]+"></td>"
        tbodyList+="<td><input class='material_name' type='text' value="+arrayList[i][1]+"></td>"
        tbodyList+="<td><input class='specification' type='text' value="+arrayList[i][2]+"></td>"
        tbodyList+="<td><input class='measurement' type='text' value="+arrayList[i][3]+"></td>"
        tbodyList+="<td><input class='isPrecious' type='checkbox'></td>"
        tbodyList+="<td><a onclick=materManageAdd_delete(this)>删除</a></td>"
        tbodyList+="</tr>"
    }
    $(".materManageAdd_tbody").html("")
    $(".materManageAdd_tbody").append(tbodyList)
}
function errorFn(error, file)
{
    console.log("ERROR:", error, file);
}

/*files传入值以后，调用这个方法*/
function filesCheange(){
        stepped = 0;
        chunks = 0;
        rows = 0;
        var txt = $('#input').val();
        var localChunkSize = $('#localChunkSize').val();
        var remoteChunkSize = $('#remoteChunkSize').val();
        var files = $('#files')[0].files;
        var config = buildConfig();

        // NOTE: Chunk size does not get reset if changed and then set back to empty/default value
        if (localChunkSize)
            Papa.LocalChunkSize = localChunkSize;
        if (remoteChunkSize)
            Papa.RemoteChunkSize = remoteChunkSize;

        pauseChecked = $('#step-pause').prop('checked');
        printStepChecked = $('#print-steps').prop('checked');


        if (files.length > 0)
        {
            if (!$('#stream').prop('checked') && !$('#chunk').prop('checked'))
            {
                for (var i = 0; i < files.length; i++)
                {
                    if (files[i].size > 1024 * 1024 * 10)
                    {
                        alert("A file you've selected is larger than 10 MB; please choose to stream or chunk the input to prevent the browser from crashing.");
                        return;
                    }
                }
            }

            start = performance.now();

            $('#files').parse({
                config: config
                //before: function(file, inputElem)
                //{
                //    console.log("Parsing file:", file);
                //},
                //complete: function()
                //{
                //    console.log("Done with all files.");
                //}
            });
        }
        else
        {
            start = performance.now();
            var results = Papa.parse(txt, config);
            console.log("Synchronous parse results:", results);
        }
}
/*触发#files的click方法,csv文件的格式必须为utf-8，不然会出现中文乱码，utf-8的csv文件，用excel打开后，会出现乱码
* csv文件修改编码格式的方法：用记事本打开，然后点击另存为，选中相依的编码格式
* */
function inportMater(){
    return $("#files").click()
}