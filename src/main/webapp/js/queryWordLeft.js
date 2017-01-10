
// 右侧加载相应的页面
function jumpPage(str) {
    if(str=='n'){        
        window.location.href=ctx+"/views/queryNoMa.jsp"       
    }else if(str=='m'){   
        window.location.href=ctx+"/views/queryMa.jsp"
    }else if(str=='nm'){
        window.location.href=ctx+"/views/queryDataAss.jsp"
    }
}
