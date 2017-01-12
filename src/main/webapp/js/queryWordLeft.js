
// 右侧加载相应的页面
function jumpPage(str) {
    if(str=='n'){        
        window.location.href=ctx+"/views/querywordselect.jsp"       
    }else if(str=='m'){   
        window.location.href=ctx+"/views/queryma.jsp"
    }else if(str=='nm'){
        window.location.href=ctx+"/views/queryda.jsp"
    }
}
