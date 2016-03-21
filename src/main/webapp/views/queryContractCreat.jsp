<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html>
<head>
  <title>订单号--新增</title>
  <script type="text/javascript" src="../js/jquery-1.11.3.js"></script>
  <script type="text/javascript" src="../js/queryContractCreat.js"></script>
  <script type="text/javascript" src="../js/WdatePicker.js"></script>
  <link rel="stylesheet" type="text/css" href="../css/queryContractCreat.css">
  <link rel="stylesheet" type="text/css" href="../css/head_code.css">
  <link rel="stylesheet" type="text/css" href="../css/foot.css">
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
          <label>企业名称</label>
          <input type="text" class="content_company_name" value="">
          <a href="javascript:;" class="companySearch">企业查询</a>
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
              <td>供货数量</td>
              <td>单价（元）</td>
              <td>总价（元）</td>
              <td>生产厂家</td>
              <td width="73">操作</td>
            </tr>
            </thead>
            <tbody class="qcti_orderDetails_tbody">
            <tr>
              <td><input type="text"></td>
              <td><input type="text"></td>
              <td><input type="text"></td>
              <td><input type="text"></td>
              <td><input type="text"></td>
              <td><input type="text"></td>
              <td><input type="text"></td>
              <td><input type="text"></td>
              <td><a href="javascript:;" class="qcti_orderDetails_delete" onclick="qcti_orderDetails_delete(this)">删除</a></td>
            </tr>
            <tr>
              <td><input type="text"></td>
              <td><input type="text"></td>
              <td><input type="text"></td>
              <td><input type="text"></td>
              <td><input type="text"></td>
              <td><input type="text"></td>
              <td><input type="text"></td>
              <td><input type="text"></td>
              <td><a href="javascript:;" class="qcti_orderDetails_delete" onclick="qcti_orderDetails_delete(this)">删除</a></td>
            </tr>
            <tr>
              <td><input type="text"></td>
              <td><input type="text"></td>
              <td><input type="text"></td>
              <td><input type="text"></td>
              <td><input type="text"></td>
              <td><input type="text"></td>
              <td><input type="text"></td>
              <td><input type="text"></td>
              <td><a href="javascript:;" class="qcti_orderDetails_delete" onclick="qcti_orderDetails_delete(this)">删除</a></td>
            </tr>
            <tr>
              <td><input type="text"></td>
              <td><input type="text"></td>
              <td><input type="text"></td>
              <td><input type="text"></td>
              <td><input type="text"></td>
              <td><input type="text"></td>
              <td><input type="text"></td>
              <td><input type="text"></td>
              <td><a href="javascript:;" class="qcti_orderDetails_delete" onclick="qcti_orderDetails_delete(this)">删除</a></td>
            </tr>
            <tr>
              <td><input type="text"></td>
              <td><input type="text"></td>
              <td><input type="text"></td>
              <td><input type="text"></td>
              <td><input type="text"></td>
              <td><input type="text"></td>
              <td><input type="text"></td>
              <td><input type="text"></td>
              <td><a href="javascript:;" class="qcti_orderDetails_delete" onclick="qcti_orderDetails_delete(this)">删除</a></td>
            </tr>
            <tr>
              <td><input type="text"></td>
              <td><input type="text"></td>
              <td><input type="text"></td>
              <td><input type="text"></td>
              <td><input type="text"></td>
              <td><input type="text"></td>
              <td><input type="text"></td>
              <td><input type="text"></td>
              <td><a href="javascript:;" class="qcti_orderDetails_delete" onclick="qcti_orderDetails_delete(this)">删除</a></td>
            </tr>
            <tr>
              <td><input type="text"></td>
              <td><input type="text"></td>
              <td><input type="text"></td>
              <td><input type="text"></td>
              <td><input type="text"></td>
              <td><input type="text"></td>
              <td><input type="text"></td>
              <td><input type="text"></td>
              <td><a href="javascript:;" class="qcti_orderDetails_delete" onclick="qcti_orderDetails_delete(this)">删除</a></td>
            </tr>
            <tr>
              <td><input type="text"></td>
              <td><input type="text"></td>
              <td><input type="text"></td>
              <td><input type="text"></td>
              <td><input type="text"></td>
              <td><input type="text"></td>
              <td><input type="text"></td>
              <td><input type="text"></td>
              <td><a href="javascript:;" class="qcti_orderDetails_delete" onclick="qcti_orderDetails_delete(this)">删除</a></td>
            </tr>
            <tr>
              <td><input type="text"></td>
              <td><input type="text"></td>
              <td><input type="text"></td>
              <td><input type="text"></td>
              <td><input type="text"></td>
              <td><input type="text"></td>
              <td><input type="text"></td>
              <td><input type="text"></td>
              <td><a href="javascript:;" class="qcti_orderDetails_delete" onclick="qcti_orderDetails_delete(this)">删除</a></td>
            </tr>
            <tr>
              <td><input type="text"></td>
              <td><input type="text"></td>
              <td><input type="text"></td>
              <td><input type="text"></td>
              <td><input type="text"></td>
              <td><input type="text"></td>
              <td><input type="text"></td>
              <td><input type="text"></td>
              <td><a href="javascript:;" class="qcti_orderDetails_delete" onclick="qcti_orderDetails_delete(this)">删除</a></td>
            </tr>
            </tbody>
          </table>
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
