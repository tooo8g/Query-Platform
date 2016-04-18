package com.crec.demo;

import java.io.IOException;
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.bson.Document;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.crec.util.CodeUtil;
import com.mongodb.gridfs.GridFSDBFile;
import com.platform.io.bean.Account;
import com.platform.io.bean.Company;
import com.platform.io.bean.OrderOrContract;
import com.platform.io.bean.Person;
import com.platform.io.bean.WaybillInfo;
import com.platform.mongo.s1.MongoDirverS1;
import com.platform.mongo.s2.MongoDirver;
import com.platform.mongo.util.FileUtils;
import com.platform.mongo.util.MD5Util;
import com.platform.mongo.util.TimeUtil;

@Controller
public class GeneralController {

	@RequestMapping("/query")
	public String index_jsp(Model model) {
		model.addAttribute("key", "MVC of Spring!");
		return "/index";
	}

	@RequestMapping("/json")
	public void json(@RequestParam String name, HttpServletRequest request,
			HttpServletResponse response) throws IOException {
		System.out.println("JSON HERE!!!");
		response.getWriter().print("{'name'," + name + "}");
	}

	@RequestMapping("/queryCert")
	public void QueryCertification(@RequestParam String str,
			@RequestParam int start, @RequestParam int limit,
			HttpServletRequest request, HttpServletResponse response)
			throws IOException {
		System.out.println(str);
		MongoDirverS1 md = new MongoDirverS1();
		String result = md.queryCertifications(str, start, limit);
		md.close();
		response.getWriter().print(result);
	}
	
	@RequestMapping("/queryPurchase_bidding")
	public void QueryPurchaseBidding(
			@RequestParam String str,
			@RequestParam String industry,
			@RequestParam int start, @RequestParam int limit,
			HttpServletRequest request, HttpServletResponse response)
			throws IOException {
		System.out.println(industry);
		MongoDirverS1 md = new MongoDirverS1();
		String result = md.queryPurchaseBidding(str,industry, start, limit);
		md.close();
		System.out.println(result);
		response.getWriter().print(result);
	}
	
	@RequestMapping("/queryCertMenu_tz")
	public void QueryCertificationByLeaf(HttpServletRequest request,
			HttpServletResponse response) throws IOException {
		MongoDirverS1 md = new MongoDirverS1();
		String result = md.queryCertification_menu_tz();
		md.close();
		response.getWriter().print(result);
	}

	@RequestMapping("/queryLatestStandard")
	public void QueryLatestStandard(@RequestParam String str,
			@RequestParam int start, @RequestParam int limit,
			HttpServletRequest request, HttpServletResponse response)
			throws IOException {
		MongoDirverS1 md = new MongoDirverS1();
		String result = md.queryLatestStandards(str, start, limit);
		md.close();
		response.getWriter().print(result);
	}

	@RequestMapping("/queryStandard")
	public void QueryStandard(@RequestParam String str,
			@RequestParam String standard_group,
			@RequestParam String standard_status,
			@RequestParam String special_subject, @RequestParam int start,
			@RequestParam int limit, HttpServletRequest request,
			HttpServletResponse response) throws IOException {
		MongoDirverS1 md = new MongoDirverS1();
		String result = md.queryStandards(str, standard_group, standard_status,
				special_subject, start, limit);
		md.close();
		response.getWriter().print(result);
	}

	@RequestMapping("/queryPriceMenu")
	public void QueryPriceMenu(HttpServletRequest request,
			HttpServletResponse response) throws IOException {
		String json = "{\"name\":\"物资类别\",\"childs\":[{\"name\":\"金属材料\",\"childs\":[{\"name\":\"生铁、铁合金\"},"
				+ "{\"name\":\"型钢\",\"childs\":[{\"name\":\"H型钢\"},{\"name\":\"槽钢\"},{\"name\":\"高线\"},"
				+ "{\"name\":\"工字钢\"},{\"name\":\"角钢\"},{\"name\":\"螺纹钢\"},{\"name\":\"盘螺\"},"
				+ "{\"name\":\"球扁钢\"},{\"name\":\"圆钢\"}]},{\"name\":\"钢板、钢带\",\"childs\":[{\"name\":\"锅炉板\"},"
				+ "{\"name\":\"厚板\"},{\"name\":\"容器板\"},{\"name\":\"造船板\"},{\"name\":\"中板\"}]},{\"name\":\"优质型钢\"},"
				+ "{\"name\":\"钢管\",    \"childs\":[{\"name\":\"方管\"},{\"name\":\"热镀锌管\"},{\"name\":\"无缝管\"}]},"
				+ "{\"name\":\"钢丝绳、钢丝\"},{\"name\":\"有色金属材料\"},{\"name\":\"水暖、建筑五金\"}]},"
				+ "{\"name\":\"非金属材料\",\"childs\":[{\"name\":\"建筑材料\",\"childs\":[{\"name\":\"水泥\",\"childs\":[{\"name\":\"普通硅酸盐\"}]}]}]}]}";
		response.getWriter().print(json);
	}

	@RequestMapping("/queryPrice")
	public void QueryPrice(@RequestParam String name,
			@RequestParam String date, @RequestParam String specification,
			@RequestParam String city, @RequestParam int start,
			@RequestParam int limit, HttpServletRequest request,
			HttpServletResponse response) throws IOException {
		MongoDirverS1 md = new MongoDirverS1();
		String result = md.queryPrice(name, date, specification, city, start,
				limit);
		md.close();
		response.getWriter().print(result);
	}

	@RequestMapping("/queryCompanyForPrice")
	public void queryCompanyForPrice(@RequestParam String name,
			@RequestParam String specification, HttpServletRequest request,
			HttpServletResponse response) throws IOException {
		MongoDirverS1 md = new MongoDirverS1();
		String result = md.queryCompanyForPrice(name, specification);
		md.close();
		response.getWriter().print(result);
	}

	@RequestMapping("/queryPriceHistory1")
	public void QueryPriceHistory(@RequestParam String id,
			HttpServletRequest request, HttpServletResponse response)
			throws IOException {
		MongoDirverS1 md = new MongoDirverS1();
		// 价格详情
		Document price_info = md.queryPrice(id);
		// 把一个月的时间轴铺开
		Calendar now = TimeUtil.getToday();
		Calendar month_ago = TimeUtil.getDay(Calendar.MONTH, -1);
		Map<String, Integer> day_price = new TreeMap<String, Integer>();
		List<Document> data = md.queryPriceHistory(id);

		int init_price = data.remove(0).getInteger("price");

		for (Document d : data) {
			Date date = d.get("date", Date.class);
			String ymd = TimeUtil.parserStringYMD(date);
			day_price.put(ymd, d.getInteger("price"));
		}

		List<Document> labels = new ArrayList<Document>();
		List<Document> values = new ArrayList<Document>();
		while (month_ago.compareTo(now) <= 0) {
			Document label = new Document();
			Document value = new Document();
			String ymd = TimeUtil.parserStringYMD(month_ago.getTime());
			Integer p = day_price.get(ymd);
			if (p != null && p > 0) {
				init_price = p;
				value.put("value", p);
			} else {
				value.put("value", init_price);
			}
			label.put("label", ymd);
			labels.add(label);
			values.add(value);
			month_ago.add(Calendar.DAY_OF_MONTH, 1);
		}
		String caption = price_info.getString("name") + " "
				+ price_info.getString("specification") + " "
				+ price_info.getString("company");
		Document json = new Document();
		json.put(
				"chart",
				new Document("caption", caption)
						.append("numberprefix", "")
						.append("plotgradientcolor", "")
						.append("bgcolor", "FFFFFF")
						.append("showalternatehgridcolor", "0")
						.append("divlinecolor", "CCCCCC")
						.append("showvalues", "0")
						.append("showcanvasborder", "0")
						.append("canvasborderalpha", "0")
						.append("canvasbordercolor", "CCCCCC")
						.append("canvasborderthickness", "1")
						.append("yaxismaxvalue", "3000")
						.append("captionpadding", "30")
						.append("linethickness", "3")
						.append("yaxisvaluespadding", "15")
						.append("legendshadow", "0")
						.append("legendborderalpha", "0")
						.append("palettecolors",
								"#f8bd19,#008ee4,#33bdda,#e44a00,#6baa01,#583e78")
						.append("showborder", "0"));
		Document category = new Document();
		category.put("category", labels);
		List<Document> categorys = new ArrayList<Document>();
		categorys.add(category);
		json.put("categories", categorys);

		List<Document> datasets = new ArrayList<Document>();
		Document dataset = new Document();
		dataset.put("seriesname", price_info.getString("city"));
		dataset.put("data", values);
		datasets.add(dataset);
		json.put("dataset", datasets);

		md.close();
		response.getWriter().print(json.toJson());
	}

	@RequestMapping("/queryPriceHistory2")
	public void QueryPriceHistory(@RequestParam String id,
			@RequestParam String name, @RequestParam String specification,
			@RequestParam String company, @RequestParam String city,
			HttpServletRequest request, HttpServletResponse response)
			throws IOException {
		MongoDirverS1 md = new MongoDirverS1();
		// 价格详情
		Document price_info = md.queryPrice(id);
		// 把一个月的时间轴铺开
		Calendar now = TimeUtil.getToday();
		Calendar month_ago = TimeUtil.getDay(Calendar.MONTH, -1);
		Map<String, Integer> day_price = new TreeMap<String, Integer>();
		Map<String, Integer> day_price1 = new TreeMap<String, Integer>();
		List<Document> data = md.queryPriceHistory(id);
		List<Document> data1 = md.queryPriceHistory(name, specification,
				company, city);

		int init_price = data.remove(0).getInteger("price");
		int init_price1 = data1.remove(0).getInteger("price");

		for (Document d : data) {
			Date date = d.getDate("date");
			String ymd = TimeUtil.parserStringYMD(date);
			day_price.put(ymd, d.getInteger("price"));
		}

		for (Document d : data1) {
			Date date = d.getDate("date");
			String ymd = TimeUtil.parserStringYMD(date);
			day_price1.put(ymd, d.getInteger("price"));
		}

		List<Document> labels = new ArrayList<Document>();
		List<Document> values = new ArrayList<Document>();

		List<Document> labels1 = new ArrayList<Document>();
		List<Document> values1 = new ArrayList<Document>();
		while (month_ago.compareTo(now) <= 0) {
			Document label = new Document();
			Document value = new Document();

			Document label1 = new Document();
			Document value1 = new Document();
			String ymd = TimeUtil.parserStringYMD(month_ago.getTime());
			Integer p = day_price.get(ymd);
			Integer p1 = day_price1.get(ymd);
			if (p != null && p > 0) {
				init_price = p;
				value.put("value", p);
			} else {
				value.put("value", init_price);
			}

			if (p1 != null && p1 > 0) {
				init_price1 = p1;
				value1.put("value", p1);
			} else {
				value1.put("value", init_price1);
			}

			label.put("label", ymd);
			label1.put("label", ymd);
			labels.add(label);
			labels1.add(label1);
			values.add(value);
			values1.add(value1);
			month_ago.add(Calendar.DAY_OF_MONTH, 1);
		}
		String caption = price_info.getString("name") + " "
				+ price_info.getString("specification") + " "
				+ price_info.getString("texture");
		Document json = new Document();
		json.put(
				"chart",
				new Document("caption", caption)
						.append("numberprefix", "")
						.append("plotgradientcolor", "")
						.append("bgcolor", "FFFFFF")
						.append("showalternatehgridcolor", "0")
						.append("divlinecolor", "CCCCCC")
						.append("showvalues", "0")
						.append("showcanvasborder", "0")
						.append("canvasborderalpha", "0")
						.append("canvasbordercolor", "CCCCCC")
						.append("canvasborderthickness", "1")
						.append("yaxismaxvalue", "3000")
						.append("captionpadding", "30")
						.append("linethickness", "3")
						.append("yaxisvaluespadding", "15")
						.append("legendshadow", "0")
						.append("legendborderalpha", "0")
						.append("palettecolors",
								"#f8bd19,#008ee4,#33bdda,#e44a00,#6baa01,#583e78")
						.append("showborder", "0"));
		Document category = new Document();
		category.put("category", labels);
		List<Document> categorys = new ArrayList<Document>();
		categorys.add(category);
		json.put("categories", categorys);

		List<Document> datasets = new ArrayList<Document>();
		Document dataset = new Document();
		dataset.put("seriesname", price_info.getString("city"));
		dataset.put("data", values);
		datasets.add(dataset);

		Document dataset1 = new Document();
		dataset1.put("seriesname", city);
		dataset1.put("data", values1);
		datasets.add(dataset1);

		json.put("dataset", datasets);

		md.close();
		response.getWriter().print(json.toJson());
	}

	/**
	 * 新增合同订单号
	 * @author niyn
	 * @param orderOrContracts  对象
	 * @param session
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value="/addOrderOrContract")
	@ResponseBody
	public String addOrderOrContract(@RequestBody OrderOrContract orderOrContracts,HttpSession session,HttpServletResponse response) throws Exception {
	    System.out.println(orderOrContracts);
	    Account a= (Account) session.getAttribute("account");
	    List<Integer>  list = a.getFiled();
 	    orderOrContracts.setFiled(list);
	    MongoDirver md = new MongoDirver();
	    md.addOrderOrContract(orderOrContracts,a.getName());
	    return "success";
	}
	
	/**
	 * 查询合同订单号（带条件查询）
	 * @author niyn
	 * @param contract_id                     合同订单号
	 * @param purchasing_company     采购单位
	 * @param company_name              供应商
	 * @param start
	 * @param limit
	 * @param request
	 * @param session
	 * @param response
	 * @throws IOException
	 */
	@RequestMapping("/queryOrderOrContract")
	public void queryOrderOrContract(@RequestParam String contract_id,@RequestParam String purchasing_company,@RequestParam String company_name,
			@RequestParam int start,
			@RequestParam int limit, HttpServletRequest request,HttpSession session,HttpServletResponse response) throws IOException {
		MongoDirver md = new MongoDirver();
		Account a =(Account) session.getAttribute("account");
		String result = md.queryOrderOrContract(contract_id,purchasing_company,company_name, a.getFiled(),start,	limit);
		md.close();
		response.getWriter().print(result);
	}
	/**
	 * 根据物资编号查询订货明细
	 * @author niyn
	 * @param str
	 * @param start
	 * @param limit
	 */
	@RequestMapping("/queryPurchasingByCode")
	public void queryPurchasingByCode(@RequestParam String material_code,HttpServletRequest request,HttpServletResponse response) throws IOException {
		MongoDirver md = new MongoDirver();
		String result = md.queryPurchasingByCode(material_code);
		md.close();
		response.getWriter().print(result);
	}
	/**
	 * 根据物资编号查询供货计划
	 * @author niyn
	 * @param str
	 * @param start
	 * @param limit
	 */
	@RequestMapping("/querySupplyDetailByCode")
	public void querySupplyDetailByCode(@RequestParam String materialCode,HttpServletRequest request,HttpServletResponse response) throws IOException {
		MongoDirver md = new MongoDirver();
		String result = md.querySupplyDetailByCode(materialCode);
		md.close();
		response.getWriter().print(result);
	}
	/**
	 * 查询合同订单号详情
	 * @author niyn
	 * @param contract_id  合同订单号
	 */
	@RequestMapping("/queryOrderOrContractDetail")
	public void queryOrderOrContractDetail(@RequestParam String _id, HttpServletRequest request,HttpSession session,HttpServletResponse response) throws IOException {
		MongoDirver md = new MongoDirver();
		Account a =(Account) session.getAttribute("account");
		String result = md.queryOrderOrContractDetail(_id,a.getFiled());
		md.close();
		response.getWriter().print(result);
	}
	/**
	 * 更新订单/合同
	 * @author niyn
	 * @throws Exception 
	 */
	@RequestMapping(value = "/updateOrderOrContract")
	@ResponseBody
	public void updateOrderOrContract(@RequestBody OrderOrContract orderOrContracts) throws Exception{
		System.out.println(orderOrContracts);
		MongoDirver md = new MongoDirver();
		md.updateOrderOrContract(orderOrContracts);
	}
	/**
	 * 新增运单
	 * @author niyn
	 * @param waybillInfo
	 */
	@RequestMapping(value="/addWaybillInfo")
	@ResponseBody
	public String addWaybillInfo(@RequestBody WaybillInfo waybillInfo,HttpSession session,HttpServletResponse response) throws Exception {
	    System.out.println(waybillInfo);
	    Account a= (Account) session.getAttribute("account");
	    waybillInfo.setFiled(a.getFiled());
	    MongoDirver md = new MongoDirver();
	    md.addWaybillInfo(waybillInfo);
	    return "success";
	}
	/**
	 * 查询运单（带条件查询）
	 * @author niyn
	 * @param logistics_id                
	 * @param logistics_company
	 * @param car_license
	 * @param contract_id
	 * @param logistics_stats
	 * @param good_num
	 * @param start
	 * @param limit
	 */
	@RequestMapping("/queryWaybillInfo")
	public void queryWaybillInfo(
			@RequestParam String logistics_id,
			@RequestParam String logistics_company,
			@RequestParam String car_license,
			@RequestParam String contract_id,
			@RequestParam String logistics_stats,
			@RequestParam String good_num,
			@RequestParam int start,
			@RequestParam int limit, HttpServletRequest request,HttpSession session,HttpServletResponse response) throws IOException {
		MongoDirver md = new MongoDirver();
		Account a= (Account) session.getAttribute("account");
		String result = md.queryWaybillInfo(logistics_id,logistics_company,car_license, contract_id,logistics_stats,good_num,a.getFiled(),start,	limit);
		System.out.println(result);
		md.close();
		response.getWriter().print(result);
	}
	
	@RequestMapping("/queryGoodsInfo")
	public void queryGoodsInfo(
			@RequestParam String _id,
			@RequestParam int start,
			@RequestParam int limit,HttpServletRequest request,HttpSession session,HttpServletResponse response) throws IOException {
		Account a= (Account) session.getAttribute("account");
		MongoDirver md = new MongoDirver();
		String result = md.queryGoodsInfo(_id,a.getFiled(),start,limit);
		System.out.println(result);
		md.close();
		response.getWriter().print(result);
	}
	
	@RequestMapping("/queryLogisticsInfo")
	public void queryLogisticsInfo(
			@RequestParam String _id,HttpServletRequest request,HttpSession session,HttpServletResponse response) throws IOException {
		MongoDirver md = new MongoDirver();
		Account a= (Account) session.getAttribute("account");
		String result = md.queryLogisticsInfo(_id,a.getFiled());
		System.out.println(result);
		md.close();
		response.getWriter().print(result);
	}
	
	/**
	 * 登录
	 * @author niyn
	 * @param username  登录名
	 * @param password   密码
	 */
	@RequestMapping("/goLogin")
	public ModelAndView login(String username,String password,HttpSession session) throws Exception{
		Map<String,Object> jsonMap = new HashMap<String,Object>();
		MongoDirver md = new MongoDirver();
		Account account = md.login(username,MD5Util.MD5(password));
		System.out.println(account+"");
		if(account!=null){
			session.setAttribute("account", account);
			jsonMap.put("success", true);
			return new ModelAndView("queryCodeSearch");
		}else{
			return new ModelAndView("queryLogin");
		}
	}
	
	/**
	 * 退出
	 * @author niyn
	 */
	@RequestMapping("/goLogout")
	public ModelAndView logout(HttpSession session){
		session.invalidate();
		return new ModelAndView("queryLogin");
	}
	
	/**
	 * 查询公司列表
	 * @author niyn
	 * @param com_name   公司名称
	 * @param org_code      机构代码
	 * @param start
	 * @param limit
	 */
	@RequestMapping("/queryCompanyList")
	public void queryCompanyList(
			@RequestParam String com_name,@RequestParam String org_code,HttpServletRequest request,HttpSession session,HttpServletResponse response,
			int start,int limit
			) throws IOException {
		MongoDirver md = new MongoDirver();
		String result = md.queryCompany(com_name, org_code, start, limit);
		System.out.println(result);
		md.close();
		response.getWriter().print(result);
	}
	
	/**
	 * 新增公司
	 * @author niyn         
	 * @param company    company对象
	 */
	@RequestMapping("/addCompany")
	@ResponseBody
	public void addCompany(Company company) throws Exception {
		MongoDirver md = new MongoDirver();
		md.addCompany(company);
		md.close();
	}
	
	/**
	 * 查询用户列表（带条件查询）
	 * @author niyn
	 * @param name            登录名
	 * @param username     姓名
	 * @param company      公司
	 * @param start
	 * @param limit
	 */
	
	@RequestMapping("/queryAccountList")
	public void queryAccountList(
			@RequestParam String name,
			@RequestParam String username,
			@RequestParam String company,
			HttpServletRequest request,HttpSession session,HttpServletResponse response,
			int start,int limit
			) throws IOException {
		MongoDirver md = new MongoDirver();
		String result = md.queryAccount(name, username, company, start, limit);
		System.out.println(result);
		md.close();
		response.getWriter().print(result);
	}
	
	/**
	 * 新增用户
	 * @author niyn
	 * @param name         登录名
	 * @param password   密码
	 * @param username  姓名 
	 * @param company   公司 
	 * @param tel             电话
	 * @param email        邮箱
	 */
	@RequestMapping("/addAccount")
	@ResponseBody
	public void addAccount(
			@RequestParam String name,
			@RequestParam String password,
			@RequestParam String username,
			@RequestParam String company,
			@RequestParam String tel,
			@RequestParam String email,
			HttpServletRequest request,HttpSession session,HttpServletResponse response
			) throws Exception {
		Account a = new Account();
		Person p = new  Person();
		p.setCompany(company);
		p.setEmail(email);
		p.setUsername(username);
		p.setTel(tel);
		List<Integer> filed = new ArrayList<Integer>();
		a.setName(name);
		a.setPassword(MD5Util.MD5(password));
		a.setPerson(p);
		a.setFiled(filed);
		MongoDirver md = new MongoDirver();
	    md.addAccount(a);
		md.close();
	}
	
	/**
	 * 查询用户管理的数据权限列表
	 * @author niyn
	 * @param _id      用户id（account表中的_id）
	 */
	@RequestMapping("/queryAuthorityInfo")
	public void queryAuthorityInfo(
			@RequestParam String _id,
			HttpServletRequest request,HttpSession session,HttpServletResponse response
			) throws Exception {
		MongoDirver md = new MongoDirver();
		String result = md.queryAuthorityInfo(_id);
		System.out.println(result);
		md.close();
		response.getWriter().print(result);
	}
	
	/**
	 * 查询用户管理的操作权限列表
	 * @author niyn
	 * @param _id      用户id（account表中的_id）
	 */
	@RequestMapping("/queryOperationInfo")
	public void queryOperationInfo(
			@RequestParam String _id,
			HttpServletRequest request,HttpSession session,HttpServletResponse response
			) throws Exception {
		MongoDirver md = new MongoDirver();
		String result = md.queryOperationInfo(_id);
		System.out.println(result);
		md.close();
		response.getWriter().print(result);
	}
	
	/**
	 * 分配用户管理的操作权限
	 * @author niyn
	 * @param fileds  操作权限的字段（operation表中的oper_num字段）
	 * @param _id      用户id（account表中的_id）
	 */
	@RequestMapping("/assignOperation")
	public void assignOperation(
			@RequestParam String fileds,
			@RequestParam String _id,
			HttpServletRequest request,HttpSession session,HttpServletResponse response
			) throws Exception {
		String[] f  = {};
		if((fileds.length()>0)&&fileds!=null){
			f =  fileds.split(",");
		}
		MongoDirver md = new MongoDirver();
		md.assignOperation(f, _id);
		md.close();
	}
	
	/**
	 * 用户管理中的数据权限分配
	 * @author niyn
	 * @param fileds 权限数组 filed字段(company表中的com_filed字段)
	 * @param _id     用户id（account表中的_id）
	 */
	@RequestMapping("/assign")
	public void assign(
			@RequestParam String fileds, 
			@RequestParam String _id,
			HttpServletRequest request,HttpSession session,HttpServletResponse response
			) throws Exception {
		String[] f  = {};
		if((fileds.length()>0)&&fileds!=null){
			f =  fileds.split(",");
		}
		MongoDirver md = new MongoDirver();
		md.assign(f, _id);
		md.close();
	}
	
	/**
	 * PDF文件下载（暂时搁置）
	 * @author niyn
	 * @param file_name 文件名称，示例：4855.pdf名称为4855
	 */
    @RequestMapping("/download")  
    public void download(
    		@RequestParam String file_name,
    		HttpServletResponse res) throws Exception {  
        OutputStream os = res.getOutputStream();  
        try {  
            res.reset();  
            res.setHeader("Content-Disposition", "attachment;filename="+ new String((file_name + ".pdf").getBytes(), "iso-8859-1"));
            res.setContentType("application/octet-stream");
            MongoDirver md = new MongoDirver();
            GridFSDBFile gfFile = md.downloadPDF(file_name, null);
            if(gfFile!=null){
            	gfFile.writeTo(os);
            }else{
            	res.getWriter().println("文件为空，请上传");
            }
            os.flush();  
        } finally {  
            if (os != null) {  
                os.close();  
            }  
        }  
    }  

    /**
     * 生成条形码
     * @author niyn
     * @param code 序列号
     * @throws Exception 
     */
    @RequestMapping("/generateBarCode")
	public void generateBarCode(
			@RequestParam String code,
			HttpServletResponse response) throws Exception{
    	byte[] barCodeByte = CodeUtil.barcode(code);
    	response.getWriter().print(barCodeByte);
	} 
    
    /**
     * 生成二维码
     * @author niyn
     * @param code 序列号
     * @throws Exception 
     */
    @RequestMapping("/generateQrCode")
	public void generateQrCode(
			@RequestParam String code,
			HttpServletResponse response) throws Exception{
    	byte[] barCodeByte = CodeUtil.qrcode(code);
    	System.out.println("二维码返回数据:"+barCodeByte);
    	response.getWriter().print(barCodeByte);
	} 
	
	public static void main(String[] args) {
		GeneralController g = new GeneralController();
		try {
			// g.QueryPriceHistory("56a86fcd4d462a721c8496fd", null, null);
			// g.QueryPriceHistory("56a86fcd4d462a721c8496fd", "设备BBA", "12345",
			// "石家庄钢铁厂", "石家庄", null, null);
//			g.QueryPriceMenu(null, null);
//			MongoDirver md = new MongoDirver();
//			String result = md.queryCertifications("车钩及缓冲装置总成", 0, 10);
//			System.out.println(result);
//			md.close();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
}
