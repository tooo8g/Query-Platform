<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html>
<head>
  <jsp:include page="resource.jsp"/>
    <title>订单号—查询</title>
    <script type="text/javascript" src="${ctx}/js/jquery-1.11.3.js"></script>
    <script type="text/javascript" src="${ctx}/js/queryContractSearch.js"></script>
    <script type="text/javascript" src="${ctx}/js/transTime.js"></script>
    <link rel="stylesheet" type="text/css" href="${ctx}/css/queryContractSearch.css">
    <link rel="stylesheet" type="text/css" href="${ctx}/css/head_code.css">
    <link rel="stylesheet" type="text/css" href="${ctx}/css/foot.css">
</head>
<body>
<jsp:include page="head_code.jsp"/>
<div class="conser">
  <div class="conser_top">
    <form id="conser_top_form">
      <div class="conser_top_contract">
        <label>订单号/合同号</label>
        <input type="text"  class="top_contract" value="">
      </div>
      <div class="conser_top_purchasing_company">
        <label>采购单位</label>
        <input type="text"  class="top_purchasing_company" value="">
      </div>
      <div class="conser_top_company_name">
        <label>供应商</label>
        <input type="text"  class="top_company_name" value="">
      </div>
      <div class="conser_top_click">
        <a type="reset" id="reset_submit" onclick="resetSubmit()">清除</a>
        <a type="button" id="form_button" onclick="formButton()">查询</a>
        <a class="contractCreat" href="${ctx}/contract/queryContractCreat" target="_self">新增合同/订单</a>
      </div>
    </form>
  </div>
  <div class="conser_bottom">
    <table class="conser_bottom_table">
      <thead class="conser_bottom_thead">
      <tr>
        <td width="73"></td>
        <td>订单号/合同号</td>
        <td width="200">供应商</td>
        <td>采购单位</td>
        <td>订单/合同详细信息</td>
        <td>编制人员</td>
        <td>编制时间</td>
        <td>编制状态</td>
        <td>数据权限</td>
      </tr>
      </thead>
      <tbody class="conser_bottom_tbody">

      </tbody>
    </table>
  </div>
  <div class="listperAuth_button">

  </div>
</div>
<div class="conser_juris displayNo" id="conser_juris">
  <input type="text" class="_id" value="">
  <div class="conserJuris">
    <div class="juris_conser">
      <div class="juris_conser_title">
        <p>权限分配</p>
        <a href="javaScript:;" class="juris_conser_title_a" onclick="close_conser_juris()"><img src="${ctx}/images/qws_1.png" ></a>
      </div>
      <form id="juris_conser_form">
        <div class="juris_conser_content">
          <div class="juris_conser_person">
            <div class="juris_conser_person_title">
              用户持有权限
            </div>
            <div class="juris_conser_person_content">
              <select name="juris_person_select" size="10" multiple="multiple" class="juris_person_select" id="juris_person_select">

              </select>
            </div>
          </div>
          <div class="juris_conser_person_move">
            <a href="javascript:;" onclick="jurisAdd()" class="jurisAdd"><img src="${ctx}/images/pel_1.png"><span>添加</span></a>
            <a href="javascript:;" onclick="jurisRemov()" class="jurisRemov"><span>移去</span><img src="${ctx}/images/pel_2.png"></a>
          </div>
          <div class="juris_conser_company">
            <div class="juris_conser_company_title">
              所有公司的读/写权限
            </div>
            <div class="juris_conser_company_content">
              <select name="juris_company_select" size="10" multiple="multiple" class="juris_company_select" id="juris_company_select">

              </select>
            </div>
          </div>
          <div class="juris_conser_save">
            <a href="javascript:;" onclick="juris_conser_button()">保存</a>
          </div>
        </div>
      </form>
    </div>
  </div>
</div>
<jsp:include page="foot.jsp"/>
</body>
</html>
