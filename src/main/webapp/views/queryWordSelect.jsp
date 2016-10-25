<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html>
<head>
    <jsp:include page="resource.jsp"/>
    <title>物料名称比对测试（291272条数据）</title>
    <script type="text/javascript" src="${ctx}/js/jquery-1.11.3.js"></script>
    <script type="text/javascript" src="${ctx}/js/queryWordSelect.js"></script>
    <link rel="stylesheet" type="text/css" href="${ctx}/css/queryWordSelect.css">
    <link rel="stylesheet" type="text/css" href="${ctx}/css/head_code.css">
    <link rel="stylesheet" type="text/css" href="${ctx}/css/foot.css">
</head>
<body>
<div class="container">
  <div class="catalog">
    <div class="catalogButton">
      <input type="text" class="searchInput" value="">
      <a href="javaScripy:;" type="button" class="searchButton" onclick="searchAdd()">添加</a>
     <!-- <input type="file" class="searchBu">导入 --> 
       <input type="file" id="files" style="display:none" onchange="imports();"/>
       <a type="button" id="import" class="searchBu">导入</a>
    </div>
    <div class="catalogList">
      <ul>
        <li>机车车辆用制动软管连接器</li>
        <li>铁路信号产品绝缘电阻</li>
        <li>机车车辆油压减振器</li>
        <li> 铁路信号插入式交流二元继电器</li>
        <li> 铁道客车及动车组防滑装置</li>
        <li>扣件螺栓机动扳手</li>
        <li>机车用铸铁闸瓦</li>
        <li>铁道客车塞拉门</li>
      </ul>
    </div>
  </div>
  <div class="searchResult">
  <input type="hidden" class="wordHidden" value="">
    <div class="sr_top">
    </div>
    <div class="sr_nm">
     <p>近义词（可多选）</p>
     <div class="sr_nm_content"></div>
    </div>
    <div class="sr_con">
      <div class="firstSelect">
        <div class="divTitle">备选名称</div>
        <div  class="selectLeft" id="left">
          <div class="selectLeftContent"></div>
        </div>
      </div>
      <div class="sr_con_input">
        <a type="button" onclick="moveLi(document.getElementById('left'),document.getElementById('right'),true)">>></a><br><br>
        <a type="button" onclick="moveLi(document.getElementById('right'), document.getElementById('left'),false)"><<</a>
      </div>
      <div class="secondSelect">
        <div class="divTitle">已对应名称</div>
        <div  class="selectRight" id="right">
        <div class="selectRightContent">
        </div>
        </div>
      </div>

    </div>
  </div>
</div>
</body>
</html>
