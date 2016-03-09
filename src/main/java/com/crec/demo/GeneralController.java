package com.crec.demo;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.bson.Document;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.platform.io.bean.OrderOrContract;
import com.platform.io.bean.Product2;
import com.platform.mongo.s1.MongoDirver;
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
		MongoDirver md = new MongoDirver();
		String result = md.queryCertifications(str, start, limit);
		md.close();
		response.getWriter().print(result);
	}
	
	@RequestMapping("/queryPurchase_bidding")
	public void QueryPurchaseBidding(@RequestParam String str,
			@RequestParam int start, @RequestParam int limit,
			HttpServletRequest request, HttpServletResponse response)
			throws IOException {
		System.out.println(str);
		MongoDirver md = new MongoDirver();
		String result = md.queryPurchaseBidding(str, start, limit);
		md.close();
		System.out.println(result);
		response.getWriter().print(result);
	}
	
	@RequestMapping("/queryCertMenu_tz")
	public void QueryCertificationByLeaf(HttpServletRequest request,
			HttpServletResponse response) throws IOException {
		MongoDirver md = new MongoDirver();
		String result = md.queryCertification_menu_tz();
		md.close();
		response.getWriter().print(result);
	}

	@RequestMapping("/queryLatestStandard")
	public void QueryLatestStandard(@RequestParam String str,
			@RequestParam int start, @RequestParam int limit,
			HttpServletRequest request, HttpServletResponse response)
			throws IOException {
		MongoDirver md = new MongoDirver();
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
		MongoDirver md = new MongoDirver();
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
		MongoDirver md = new MongoDirver();
		String result = md.queryPrice(name, date, specification, city, start,
				limit);
		md.close();
		response.getWriter().print(result);
	}

	@RequestMapping("/queryCompanyForPrice")
	public void queryCompanyForPrice(@RequestParam String name,
			@RequestParam String specification, HttpServletRequest request,
			HttpServletResponse response) throws IOException {
		MongoDirver md = new MongoDirver();
		String result = md.queryCompanyForPrice(name, specification);
		md.close();
		response.getWriter().print(result);
	}

	@RequestMapping("/queryPriceHistory1")
	public void QueryPriceHistory(@RequestParam String id,
			HttpServletRequest request, HttpServletResponse response)
			throws IOException {
		MongoDirver md = new MongoDirver();
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
		MongoDirver md = new MongoDirver();
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

	@RequestMapping(value="/addOrderOrContract",method=RequestMethod.POST)
	@ResponseBody
	public void addOrderOrContract(@RequestBody OrderOrContract orderOrContracts, HttpServletResponse response) throws Exception {
	    System.out.println(orderOrContracts);
	    MongoDirver md = new MongoDirver();
	    md.addOrderOrContract(orderOrContracts);
	}
	
	
	@RequestMapping("/queryOrderOrContract")
	public void queryOrderOrContract(@RequestParam String contract_id,@RequestParam String purchasing_company,@RequestParam String company_name,
			@RequestParam int start,
			@RequestParam int limit, HttpServletRequest request,HttpServletResponse response) throws IOException {
		MongoDirver md = new MongoDirver();
		String result = md.queryOrderOrContract(contract_id,purchasing_company,company_name, start,	limit);
		md.close();
		response.getWriter().print(result);
	}
	/**
	 * 根据物资编号查询订货明细
	 * @author niyn
	 * @param str
	 * @param start
	 * @param limit
	 * @param request
	 * @param response
	 * @throws IOException
	 */
	@RequestMapping("/queryPurchasingByCode")
	public void queryPurchasingByCode(@RequestParam String materialCode,HttpServletRequest request,HttpServletResponse response) throws IOException {
		MongoDirver md = new MongoDirver();
		String result = md.queryPurchasingByCode(materialCode);
		md.close();
		response.getWriter().print(result);
	}
	/**
	 * 根据物资编号查询供货计划
	 * @author niyn
	 * @param str
	 * @param start
	 * @param limit
	 * @param request
	 * @param response
	 * @throws IOException
	 */
	@RequestMapping("/querySupplyDetailByCode")
	public void querySupplyDetailByCode(@RequestParam String materialCode,HttpServletRequest request,HttpServletResponse response) throws IOException {
		MongoDirver md = new MongoDirver();
		String result = md.querySupplyDetailByCode(materialCode);
		md.close();
		response.getWriter().print(result);
	}
	
	@RequestMapping("/queryOrderOrContractDetail")
	public void queryOrderOrContractDetail(@RequestParam String contract_id, HttpServletRequest request,HttpServletResponse response) throws IOException {
		MongoDirver md = new MongoDirver();
		String result = md.queryOrderOrContractDetail(contract_id);
		md.close();
		response.getWriter().print(result);
	}
	/**
	 * 更新订单/合同
	 * @author niyn
	 */
	@RequestMapping(value = "/updateOrderOrContract",method=RequestMethod.POST)
	@ResponseBody
	public void updateOrderOrContract(@RequestBody OrderOrContract orderOrContracts){
		System.out.println(orderOrContracts);
		MongoDirver md = new MongoDirver();
		md.updateOrderOrContract(orderOrContracts);
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
