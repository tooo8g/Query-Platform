package com.crec.work;

import java.io.IOException;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

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
			HttpServletResponse response) throws IOException {
		MongoDirver md = new MongoDirver();
		String result = md.queryProductInfo(company_name, product_identify,
				product_name, specification);
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
	public void createCode(Code code, int num, HttpServletResponse response)
			throws IOException {
		List<Code> list = CodeUtil.codec(code, num);
		MongoDirver md = new MongoDirver();
		// 存库
		String result = null;
		for (Code c : list) {
			result = md.addCode(c);
		}
		md.close();
		response.getWriter().print(result);
	}
}
