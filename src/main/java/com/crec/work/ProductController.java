package com.crec.work;

import java.io.IOException;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.bson.types.ObjectId;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.crec.util.CodeUtil;
import com.platform.io.bean.Account;
import com.platform.io.bean.Code;
import com.platform.mongo.s1.MongoDirver;
import com.platform.mongo.util.TimeUtil;

/**
 * 
 * @author zhangyb
 * 
 */
@Controller
public class ProductController {
	/**
	 * 产品标识代码(查询)
	 * 
	 * @param company_name
	 * @param product_identify
	 * @param product_name
	 * @param specification
	 * @param response
	 * @throws IOException
	 * @author zhangyb
	 */
	@RequestMapping("/product")
	public void queryProduct(
			@RequestParam(required = false) String company_name,
			@RequestParam(required = false) String product_identify,
			@RequestParam(required = false) String product_name,
			@RequestParam(required = false) String specification,
			@RequestParam(required = false) int start,
			@RequestParam(required = false) int limit,
			HttpSession session,
			HttpServletResponse response) throws IOException {
		MongoDirver md = new MongoDirver();
		Account a =(Account)session.getAttribute("account");
		String result = md.queryProductInfo(company_name, product_identify,
				product_name, specification,a.getField(), start, limit);
		md.close();
		response.getWriter().print(result);
	}

	/**
	 * 创建序列号并且默认查询出第一页
	 * 
	 * @author zhangyb
	 * @param code
	 * @param num
	 * @return
	 * @throws IOException
	 */
	@RequestMapping("/createCode")
	public void createCode(@RequestParam(required = false) String product_name,
			@RequestParam(required = false) String product_identify,
			@RequestParam(required = false) String material_code,
			@RequestParam(required = false) String purchasing_company,
			@RequestParam(required = false) String company_name,
			@RequestParam(required = false) String contract_id,
			@RequestParam(required = false) String program_time,
			@RequestParam(required = false) String branch_id,
			@RequestParam(required = false) String specification,
			@RequestParam(required = false) int num,
			@RequestParam(required = false) int start,
			@RequestParam(required = false) int limit,
			HttpSession session,
			HttpServletResponse response) throws IOException {
		Code code = new Code();
		ObjectId group_id = new ObjectId();
		code.setProduct_name(product_name);// 产品名称
		code.setProduct_identify(product_identify);// 产品标示代码
		code.setMaterial_code(material_code);// 物资编码
		code.setPurchasing_company(purchasing_company);// 采购单位
		code.setContract_id(contract_id);// 订单合同编号
		code.setProgram_time(TimeUtil.parserTime(program_time));// 编制时间
		code.setCompany_name(company_name);// 企业名称
		code.setSpecification(specification);// 规格型号
		// 把页面传过来的String类型的branch_id转换成ObjectId类型
		ObjectId branchId = new ObjectId(branch_id);
		code.setBranch_id(branchId);// 关联Id
		code.setGroup_id(group_id);// 组Id
		code.setAdd_time(new Date());
		Account a = (Account)session.getAttribute("account");
		List<Code> codes = CodeUtil.codec(code, num,a.getField());
		MongoDirver md = new MongoDirver();
		for (Code c : codes) {
			md.addCode(c);
		}
		String result = md.queryCodes(group_id, branchId,a.getField(), start, limit);
		md.close();
		response.getWriter().print(result);
	}

	/**
	 * 生成序列号页面的的分页查询
	 * 
	 * @author zhangyb
	 * @param groupId
	 * @param start
	 * @param limit
	 * @param response
	 * @throws IOException
	 */
	@RequestMapping("/queryCodes")
	public void queryCodes(String group_id, String branch_id, int start,
			int limit,HttpSession session, HttpServletResponse response) throws IOException {
		MongoDirver md = new MongoDirver();
		ObjectId gId = new ObjectId(group_id);
		ObjectId bId = new ObjectId(branch_id);
		Account a = (Account)session.getAttribute("account");
		String result = md.queryCodes(gId, bId, a.getField(),start, limit);
		md.close();
		response.getWriter().print(result);

	}

	/**
	 * 根据组id(groupId)清空数据
	 * 
	 * @author zhangyb
	 * @param groupId
	 * @throws IOException
	 */
	@RequestMapping("/empty")
	public void deleteByGroupId(
			@RequestParam(required = false) String group_id,
			HttpSession session,
			HttpServletResponse response) throws IOException {
		MongoDirver md = new MongoDirver();
		Account a = (Account)session.getAttribute("account");
		md.deleteByGroupId(group_id,a.getField());
		md.close();
		response.getWriter().print(true);
	}

	/**
	 * 查询code
	 * 
	 * @author zhangyb
	 * @param branchId
	 * @throws IOException
	 */
	@RequestMapping("/queryCode")
	public void querySingleCode(
			@RequestParam(required = false) String branch_id,
			HttpSession session,
			HttpServletResponse response) throws IOException {
		MongoDirver md = new MongoDirver();
		Account a = (Account)session.getAttribute("account");
		String result = md.querySingleCode(branch_id,a.getField());
		md.close();
		response.getWriter().print(result);
	}

	/**
	 * 序列号信息查询
	 * 
	 * @author zhangyb
	 * @param contract_id
	 *            订单号/合同号
	 * @param state
	 *            状态
	 * @param program_time
	 *            编制日期
	 * @param purchasing_company
	 *            采购单位
	 * @param company_name
	 *            企业名称
	 * @param start
	 * @param limit
	 * @param response
	 * @throws IOException
	 */
	@RequestMapping("/queryAllCode")
	public void queryAllCode(
			@RequestParam(required = false) String contract_id,
			@RequestParam(required = false) String state,
			@RequestParam(required = false) String program_time,
			@RequestParam(required = false) String purchasing_company,
			@RequestParam(required = false) String company_name,
			@RequestParam(required = false) int start,
			@RequestParam(required = false) int limit,
			HttpSession session,
			HttpServletResponse response) throws IOException {
		MongoDirver md = new MongoDirver();
		Account a = (Account)session.getAttribute("account");
		String result = md.queryAllCode(contract_id, state, program_time,
				purchasing_company, company_name,a.getField(), start, limit);
		md.close();
		response.getWriter().print(result);

	}
}
