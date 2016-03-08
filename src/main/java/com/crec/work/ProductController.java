package com.crec.work;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import org.bson.types.ObjectId;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import com.crec.util.CodeUtil;
import com.platform.io.bean.Code;
import com.platform.mongo.s1.MongoDirver;

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
			HttpServletResponse response) throws IOException {
		System.out.println("222222222222222222222");
		MongoDirver md = new MongoDirver();
		String result = md.queryProductInfo(company_name, product_identify,
				product_name, specification,start,limit);
		md.close();
		response.getWriter().print(result);
	}

	/**
	 * 创建序列号
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
			@RequestParam(required = false) String contract_id,
			@RequestParam(required = false) String program_time,
			@RequestParam(required = false) String branchId,
			@RequestParam(required = false) int num,
			@RequestParam(required = false) int start,
			@RequestParam(required = false) int limit,
			HttpServletResponse response) throws IOException {
		System.out.println(product_name + "******" + product_identify
				+ "******" + purchasing_company);
		Code code = new Code();
		ObjectId groupId = new ObjectId();
		code.setProduct_name(product_name);// 产品名称
		code.setProduct_identify(product_identify);// 产品标示代码
		code.setMaterial_code(material_code);// 物资编码
		code.setPurchasing_company(purchasing_company);// 采购单位
		code.setContract_id(contract_id);// 订单合同编号
		code.setProgram_time(program_time);// 编制时间
		code.setBranchId(branchId);// 关联Id
		code.setGroupId(groupId.toString());// 组Id
		System.out.println(product_name + "%%%%%%" + product_identify
				+ "%%%%%%%%" + material_code);
		List<Code> codes = CodeUtil.codec(code, num);
		MongoDirver md = new MongoDirver();
		for (Code c : codes) {
			md.addCode(c);
		}
		String result = md.queryCodes(groupId, start, limit);
		System.out.println();
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
	public void deleteByGroupId(@RequestParam(required=false)String groupId,
			HttpServletResponse response) throws IOException {
		System.out.println(groupId+"^^^^^^^^^^^^^^^^^^^^");
		MongoDirver md = new MongoDirver();
		md.deleteByGroupId(groupId);
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
			@RequestParam(required = false) String branchId,
			HttpServletResponse response) throws IOException {
		MongoDirver md = new MongoDirver();
		String result = md.querySingleCode(branchId);
		md.close();
		response.getWriter().print(result);
	}
}
