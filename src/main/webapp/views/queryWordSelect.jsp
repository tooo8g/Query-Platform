<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html>
<head>
    <jsp:include page="resource.jsp"/>
    <title>物料名称比对测试（291272条数据）</title>
    <script type="text/javascript" src="${ctx}/js/jquery-1.11.3.js"></script>
    <script type="text/javascript" src="${ctx}/js/queryWordSelect.js"></script>
    <link rel="stylesheet" type="text/css" href="${ctx}/css/queryWordSelect.css">
</head>
<body>
<div class="container">
  <div class="catalog">
    <div class="catalogTile">新物质编码导入</div>
    <div class="catalogButton">
      <input type="text" class="searchInput" value="">
      <a href="javaScripy:;" type="button" class="searchButton" onclick="searchAdd()">添加</a>
       <input type="file" id="files" style="display:none" onchange="imports();"/>
       <a type="button" id="import" class="searchBu">导入</a>
    </div>
    <div class="catalogList">
      <ul>
        <li><p>机车车辆用制动软管连接器</p><input type="text" class="displayNo" value=""><span  class="displayNo" onclick="catEdit(this)">编辑</span></li>
        <li><p>铁路信号产品绝缘电阻</p><input type="text" class="displayNo" value=""><span  class="displayNo" onclick="catEdit(this)">编辑</span></li>
        <li><p>机车车辆油压减振器</p><input type="text" class="displayNo" value=""><span   class="displayNo" onclick="catEdit(this)">编辑</span></li>
        <li><p>铁路信号插入式交流二元继电器</p><input type="text" class="displayNo" value=""><span  class="displayNo" onclick="catEdit(this)">编辑</span></li>
        <li><p>铁道客车及动车组防滑装置</p><input type="text" class="displayNo" value=""><span  class="displayNo" onclick="catEdit(this)">编辑</span></li>
        <li><p>扣件螺栓机动扳手</p><input type="text" class="displayNo" value=""><span  class="displayNo" onclick="catEdit(this)">编辑</span></li>
        <li><p>机车用铸铁闸瓦</p><input type="text" class="displayNo" value=""><span  class="displayNo" onclick="catEdit(this)">编辑</span></li>
        <li><p>铁道客车塞拉门</p><input type="text" class="displayNo" value=""><span  class="displayNo" onclick="catEdit(this)">编辑</span></li>
      </ul>
    </div>
  </div>
  <div class="popup displayNo">
    <span class="popup_title">提示</span>
    <span class="popup_con">将名称放入一列并保存为txt</span>
    <a href="javascript:;" type="button" class="popup_sure" onclick="popupSure()">确定</a>
    <a href="javascript:;" type="button" class="popup_cancel" onclick="popupCancel()">取消</a>
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
        <div class="divTitle">请选择可能匹配的名称</div>
        <div  class="selectLeft" id="left">
          <div class="selectLeftContent">
            <div class="selectLeftContent_select displayNo">
              <input class="left_select" type="text" value="" onclick="">
              <a href="javaScripy:;" type="button" class="left_select_button" onclick="leftSelect()">查询</a>
            </div>
            <div class="selectLeftContent_show"></div>
          </div>
        </div>
      </div>
      <div class="sr_con_input">
        <a type="button" onclick="moveLi(document.getElementById('left'),document.getElementById('right'),true)">>></a>
        <a type="button" onclick="moveLi(document.getElementById('right'), document.getElementById('left'),false)"><<</a>
      </div>
      <div class="secondSelect">
        <div class="divTitle">匹配到的名称</div>
        <a href="javaScripy:;" type="button" class="sesButton" onclick="sesAdd()">添加</a>
        <div  class="selectRight" id="right">
          <div class="selectRightContent">
            <div class="selectRightContentAdd"></div>
            <div class="selectRightContentShow"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</body>
</html>
