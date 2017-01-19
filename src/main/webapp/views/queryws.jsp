<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<jsp:include page="resource.jsp"/>
<link rel="stylesheet" type="text/css" href="${ctx}/css/queryws.css">
  <div class="con-no-ma displayNo" id="con-no-ma">
    <div class="catalog">
      <div class="catalogTile">非标准名称、别名</div>
      <div class="catalogButton">
        <input type="text" class="searchInput" value="">
        <a href="javascript:;" type="button" class="searchButton" onclick="searchAdd()">添加</a>
        <!--<input type="file" id="filese" style="display:none" onchange="imports();"/>-->
        <!--<a href="javascript:;" type="button" id="imports" class="searchBus">导入</a>-->
      </div>
      <div class="catalogList">
        <ul>
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
          <div class="divTitle">请选择可能匹配的标准名称</div>
          <div  class="selectLeft" id="left">
            <div class="selectLeftContent">
              <div class="selectLeftContent_select displayNo">
                <input class="left_select" type="text" value="" onclick="">
                <a href="javascript:;" type="button" class="left_select_button" onclick="leftSelect()">查询</a>
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
          <div class="divTitle">匹配到的标准名称</div>
          <!--<a href="javascript:;" type="button" class="sesButton" onclick="sesAdd()">添加</a>-->
          <div  class="selectRight" id="right">
            <div class="selectRightContent">
              <div class="selectRightContentAdd">
                <p class="tip hide">*该项无法删除</p>
              </div>
              <div class="selectRightContentShow"></div>
            </div>
          </div>
        </div>
      </div>
  </div>
</div>

<script type="text/javascript" src="${ctx}/js/jquery-1.11.3.js"></script>
<script type="text/javascript" src="${ctx}/js/queryws.js"></script>

