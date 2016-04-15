<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html>
<head>
  <jsp:include page="resource.jsp"/>
  <title>订单号--新增</title>
  <script type="text/javascript" src="${ctx}/js/jquery-1.11.3.js"></script>
  <script type="text/javascript" src="${ctx}/js/queryContractCreat.js"></script>
  <script type="text/javascript" src="${ctx}/js/WdatePicker.js"></script>
  <link rel="stylesheet" type="text/css" href="${ctx}/css/queryContractCreat.css">
  <link rel="stylesheet" type="text/css" href="${ctx}/css/head_code.css">
  <link rel="stylesheet" type="text/css" href="${ctx}/css/foot.css">
</head>
<body>
<jsp:include page="head_code.jsp"/>
<div class="qcc">
  <input type="hidden" class="pageNo" value="">
  <div class="qcc_title">
    <p>当前位置：</p>
    <p>订单/合同详细信息</p>
  </div>
  <div class="qcc_body">
    <div class="qcti_contractCreat">
      <div class="qcti_contractCreat_title">
        <p>基本信息</p>
        <span>填写准确、完整信息</span>
      </div>
      <div class="qcti_contractCreat_content">
        <div class="contractCreat_content_company_name">
          <label>供应商</label>
          <input type="text" class="content_company_name" value="" onfocus="companyNameSearchShow()">

          <%--<a href="javascript:;" class="companySearch">供应商查询</a>--%>
          <div class="company_name_search displayNo" onmouseleave="companyNameSearchHidden()">
            <input type="hidden" class="nameSearchPage" value="">
            <input type="hidden" class="com_org_code" value="">
            <input type="hidden" class="com_company_field" value="">
            <div>
              <input type="text" class="com_name" value="" placeholder="供应商名称">
            </div>
            <div>
              <input type="text" class="org_code" value="" placeholder="组织机构代码">
            </div>
            <div>
              <a class="name_search_a" onclick="companyNameSearch()">查询</a>
            </div>
            <div class="name_search_list">
            </div>
            <div class="name_searchAuth_button">

            </div>
            <div class="name_searchAuth_close">
              <a onclick="companyNameSearchHidden()">关闭</a>
            </div>
          </div>
        </div>
        <div class="contractCreat_content_contract_id">
          <label>订单号/合同号</label>
          <input type="text" class="content_contract_id" value="">
        </div>
        <div class="contractCreat_content_purchasing_company">
          <label>采购单位</label>
          <input type="text" class="content_purchasing_company" value="">
        </div>
      </div>
      <div class="qcti_contractCreat_orderDetails">
        <div class="qcti_contractCreat_orderDetails_title">
          <p>订货明细表</p>
        </div>
        <div class="qcti_contractCreat_orderDetails_content">
          <table class="qcti_orderDetails_table">
            <thead class="qcti_orderDetails_thead">
            <tr>
              <td>物资编号</td>
              <td>物资名称</td>
              <td>规格型号</td>
              <td>计量单位</td>
              <td>产品标示代码</td>
              <td>供货数量</td>
              <td>单价（元）</td>
              <td>总价（元）</td>
              <td>生产厂家</td>
              <td width="73">操作</td>
            </tr>
            </thead>
            <tbody class="qcti_orderDetails_tbody">
            <tr>
              <td><input type="text" value=""  onblur="searchBymaterialCode(this)" ></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td><input type="text"></td>
              <td><input type="text"></td>
              <td><input type="text"></td>
              <td><input type="text" onfocus="product_name_search_show(this)" value=""><input type="text" value=""></td>
              <td><a href="javascript:;" class="qcti_orderDetails_delete" onclick="qcti_orderDetails_delete(this)">删除</a></td>
            </tr>
            <tr>
              <td><input type="text" value=""  onblur="searchBymaterialCode(this)" ></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td><input type="text"></td>
              <td><input type="text"></td>
              <td><input type="text"></td>
              <td><input type="text" onfocus="product_name_search_show(this)" value=""><input type="text" value=""></td>
              <td><a href="javascript:;" class="qcti_orderDetails_delete" onclick="qcti_orderDetails_delete(this)">删除</a></td>
            </tr>
            <tr>
              <td><input type="text" value=""  onblur="searchBymaterialCode(this)" ></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td><input type="text"></td>
              <td><input type="text"></td>
              <td><input type="text"></td>
              <td><input type="text" onfocus="product_name_search_show(this)" value=""><input type="text" value=""></td>
              <td><a href="javascript:;" class="qcti_orderDetails_delete" onclick="qcti_orderDetails_delete(this)">删除</a></td>
            </tr>
            <tr>
              <td><input type="text" value=""  onblur="searchBymaterialCode(this)" ></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td><input type="text"></td>
              <td><input type="text"></td>
              <td><input type="text"></td>
              <td><input type="text" onfocus="product_name_search_show(this)" value=""><input type="text" value=""></td>
              <td><a href="javascript:;" class="qcti_orderDetails_delete" onclick="qcti_orderDetails_delete(this)">删除</a></td>
            </tr>
            <tr>
              <td><input type="text" value=""  onblur="searchBymaterialCode(this)" ></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td><input type="text"></td>
              <td><input type="text"></td>
              <td><input type="text"></td>
              <td><input type="text" onfocus="product_name_search_show(this)" value=""><input type="text" value=""></td>
              <td><a href="javascript:;" class="qcti_orderDetails_delete" onclick="qcti_orderDetails_delete(this)">删除</a></td>
            </tr>
            <tr>
              <td><input type="text" value=""  onblur="searchBymaterialCode(this)" ></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td><input type="text"></td>
              <td><input type="text"></td>
              <td><input type="text"></td>
              <td><input type="text" onfocus="product_name_search_show(this)" value=""><input type="text" value=""></td>
              <td><a href="javascript:;" class="qcti_orderDetails_delete" onclick="qcti_orderDetails_delete(this)">删除</a></td>
            </tr>
            <tr>
              <td><input type="text" value=""  onblur="searchBymaterialCode(this)" ></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td><input type="text"></td>
              <td><input type="text"></td>
              <td><input type="text"></td>
              <td><input type="text" onfocus="product_name_search_show(this)" value=""><input type="text" value=""></td>
              <td><a href="javascript:;" class="qcti_orderDetails_delete" onclick="qcti_orderDetails_delete(this)">删除</a></td>
            </tr>
            <tr>
              <td><input type="text" value=""  onblur="searchBymaterialCode(this)" ></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td><input type="text"></td>
              <td><input type="text"></td>
              <td><input type="text"></td>
              <td><input type="text" onfocus="product_name_search_show(this)" value=""><input type="text" value=""></td>
              <td><a href="javascript:;" class="qcti_orderDetails_delete" onclick="qcti_orderDetails_delete(this)">删除</a></td>
            </tr>
            <tr>
              <td><input type="text" value=""  onblur="searchBymaterialCode(this)" ></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td><input type="text"></td>
              <td><input type="text"></td>
              <td><input type="text"></td>
              <td><input type="text" onfocus="product_name_search_show(this)" value=""><input type="text" value=""></td>
              <td><a href="javascript:;" class="qcti_orderDetails_delete" onclick="qcti_orderDetails_delete(this)">删除</a></td>
            </tr>
            <tr>
              <td><input type="text" value=""  onblur="searchBymaterialCode(this)" ></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td><input type="text"></td>
              <td><input type="text"></td>
              <td><input type="text"></td>
              <td><input type="text" onfocus="product_name_search_show(this)" value=""><input type="text" value=""></td>
              <td><a href="javascript:;" class="qcti_orderDetails_delete" onclick="qcti_orderDetails_delete(this)">删除</a></td>
            </tr>
            </tbody>
          </table>
          <div class="product_name_search displayNo">
            <input type="hidden" class="nameSearchPage_pro" value="">
            <input type="hidden" class="com_org_code_pro" value="">
            <div class="comNamePro">
              <input type="text" class="com_name_pro" value="" placeholder="供应商名称">
            </div>
            <div class="orgCodePro">
              <input type="text" class="org_code_pro" value="" placeholder="组织机构代码">
            </div>
            <div>
              <a class="name_search_a" onclick="productNameSearch()">查询</a>
            </div>
            <div class="pro_name_search_list">
            </div>
            <div class="pro_name_searchAuth_button">

            </div>
            <div class="name_searchAuth_close">
              <a onclick="productNameSearchHidden()">关闭</a>
            </div>
          </div>
        </div>
        <div class="qcti_orderDetails_add">
          <a href="javascript:;" class="qcti_od_add" onclick="qcti_od_add()">新增订货明细</a>
        </div>
      </div>
      <div class="qcti_contractCreat_supplyPlan">
        <div class="qcti_contractCreat_supplyPlan_title">
          <p>供货计划</p>
        </div>
        <div class="qcti_contractCreat_supplyPlan_content">
          <table class="qcti_supplyPlan_table">
            <thead class="qcti_supplyPlan_thead">
            <tr>
              <td>物资编号</td>
              <td>物资名称</td>
              <td>规格型号</td>
              <td>计量单位</td>
              <td>供货数量</td>
              <td>交货时间</td>
              <td>交货地点</td>
              <td>收货人</td>
              <td>产品标识代码</td>
              <td width="73">操作</td>
            </tr>
            </thead>
            <tbody class="qcti_supplyPlan_tbody">
            <tr>
              <td><input type="text"></td>
              <td><input type="text"></td>
              <td><input type="text"></td>
              <td><input type="text"></td>
              <td><input type="text"></td>
              <td><input  name="createCode_date" class="createCode_date" type="text" onFocus="var endDate=$dp.$('endDate2');WdatePicker({dateFmt:'yyyy-MM-dd',alwaysUseStartDate:true})" value=""/></td>
              <td><input type="text"></td>
              <td><input type="text"></td>
              <td><input type="text"></td>
              <td><a href="javascript:;" class="qcti_supplyPlan_delete" onclick="qcti_supplyPlan_delete(this)">删除</a></td>
            </tr>
            <tr>
              <td><input type="text"></td>
              <td><input type="text"></td>
              <td><input type="text"></td>
              <td><input type="text"></td>
              <td><input type="text"></td>
              <td><input name="createCode_date" class="createCode_date" type="text" onFocus="var endDate=$dp.$('endDate2');WdatePicker({dateFmt:'yyyy-MM-dd',alwaysUseStartDate:true})" value=""/></td>
              <td><input type="text"></td>
              <td><input type="text"></td>
              <td><input type="text"></td>
              <td><a href="javascript:;" class="qcti_supplyPlan_delete" onclick="qcti_supplyPlan_delete(this)">删除</a></td>
            </tr>
            <tr>
              <td><input type="text"></td>
              <td><input type="text"></td>
              <td><input type="text"></td>
              <td><input type="text"></td>
              <td><input type="text"></td>
              <td><input  name="createCode_date" class="createCode_date" type="text" onFocus="var endDate=$dp.$('endDate2');WdatePicker({dateFmt:'yyyy-MM-dd',alwaysUseStartDate:true})" value=""/></td>
              <td><input type="text"></td>
              <td><input type="text"></td>
              <td><input type="text"></td>
              <td><a href="javascript:;" class="qcti_supplyPlan_delete" onclick="qcti_supplyPlan_delete(this)">删除</a></td>
            </tr>
            <tr>
              <td><input type="text"></td>
              <td><input type="text"></td>
              <td><input type="text"></td>
              <td><input type="text"></td>
              <td><input type="text"></td>
              <td><input  name="createCode_date" class="createCode_date" type="text" onFocus="var endDate=$dp.$('endDate2');WdatePicker({dateFmt:'yyyy-MM-dd',alwaysUseStartDate:true})" value=""/></td>
              <td><input type="text"></td>
              <td><input type="text"></td>
              <td><input type="text"></td>
              <td><a href="javascript:;" class="qcti_supplyPlan_delete" onclick="qcti_supplyPlan_delete(this)">删除</a></td>
            </tr>
            <tr>
              <td><input type="text"></td>
              <td><input type="text"></td>
              <td><input type="text"></td>
              <td><input type="text"></td>
              <td><input type="text"></td>
              <td><input  name="createCode_date" class="createCode_date" type="text" onFocus="var endDate=$dp.$('endDate2');WdatePicker({dateFmt:'yyyy-MM-dd',alwaysUseStartDate:true})" value=""/></td>
              <td><input type="text"></td>
              <td><input type="text"></td>
              <td><input type="text"></td>
              <td><a href="javascript:;" class="qcti_supplyPlan_delete" onclick="qcti_supplyPlan_delete(this)">删除</a></td>
            </tr>
            <tr>
              <td><input type="text"></td>
              <td><input type="text"></td>
              <td><input type="text"></td>
              <td><input type="text"></td>
              <td><input type="text"></td>
              <td><input  name="createCode_date" class="createCode_date" type="text" onFocus="var endDate=$dp.$('endDate2');WdatePicker({dateFmt:'yyyy-MM-dd',alwaysUseStartDate:true})" value=""/></td>
              <td><input type="text"></td>
              <td><input type="text"></td>
              <td><input type="text"></td>
              <td><a href="javascript:;" class="qcti_supplyPlan_delete" onclick="qcti_supplyPlan_delete(this)">删除</a></td>
            </tr>
            <tr>
              <td><input type="text"></td>
              <td><input type="text"></td>
              <td><input type="text"></td>
              <td><input type="text"></td>
              <td><input type="text"></td>
              <td><input  name="createCode_date" class="createCode_date" type="text" onFocus="var endDate=$dp.$('endDate2');WdatePicker({dateFmt:'yyyy-MM-dd',alwaysUseStartDate:true})" value=""/></td>
              <td><input type="text"></td>
              <td><input type="text"></td>
              <td><input type="text"></td>
              <td><a href="javascript:;" class="qcti_supplyPlan_delete" onclick="qcti_supplyPlan_delete(this)">删除</a></td>
            </tr>
            <tr>
              <td><input type="text"></td>
              <td><input type="text"></td>
              <td><input type="text"></td>
              <td><input type="text"></td>
              <td><input type="text"></td>
              <td><input  name="createCode_date" class="createCode_date" type="text" onFocus="var endDate=$dp.$('endDate2');WdatePicker({dateFmt:'yyyy-MM-dd',alwaysUseStartDate:true})" value=""/></td>
              <td><input type="text"></td>
              <td><input type="text"></td>
              <td><input type="text"></td>
              <td><a href="javascript:;" class="qcti_supplyPlan_delete" onclick="qcti_supplyPlan_delete(this)">删除</a></td>
            </tr>
            <tr>
              <td><input type="text"></td>
              <td><input type="text"></td>
              <td><input type="text"></td>
              <td><input type="text"></td>
              <td><input type="text"></td>
              <td><input  name="createCode_date" class="createCode_date" type="text" onFocus="var endDate=$dp.$('endDate2');WdatePicker({dateFmt:'yyyy-MM-dd',alwaysUseStartDate:true})" value=""/></td>
              <td><input type="text"></td>
              <td><input type="text"></td>
              <td><input type="text"></td>
              <td><a href="javascript:;" class="qcti_supplyPlan_delete" onclick="qcti_supplyPlan_delete(this)">删除</a></td>
            </tr>
            <tr>
              <td><input type="text"></td>
              <td><input type="text"></td>
              <td><input type="text"></td>
              <td><input type="text"></td>
              <td><input type="text"></td>
              <td><input  name="createCode_date" class="createCode_date" type="text" onFocus="var endDate=$dp.$('endDate2');WdatePicker({dateFmt:'yyyy-MM-dd',alwaysUseStartDate:true})" value=""/></td>
              <td><input type="text"></td>
              <td><input type="text"></td>
              <td><input type="text"></td>
              <td><a href="javascript:;" class="qcti_supplyPlan_delete" onclick="qcti_supplyPlan_delete(this)">删除</a></td>
            </tr>
            </tbody>
          </table>
        </div>
        <div class="qcti_supplyPlan_add">
          <a href="javascript:;" class="qcti_supplyPlan_add" onclick="qcti_supplyPlan_add()">新增供货计划</a>
        </div>
      </div>
      <div class="qcti_preservation">
        <a href="javascript:;" class="qcti_supplyPlan_preservation" onclick="qcti_od_sp_preservation()">保存</a>
      </div>
    </div>
  </div>
</div>

<jsp:include page="foot.jsp"/>
</body>
</html>
