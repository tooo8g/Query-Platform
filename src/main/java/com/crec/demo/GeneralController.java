package com.crec.demo;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.platform.mongo.s1.MongoDirver;

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
	public void QueryStandard(@RequestParam String standard_group,
			@RequestParam String standard_id,
			@RequestParam String standard_name,
			@RequestParam String standard_status,
			@RequestParam String special_subject, @RequestParam int start,
			@RequestParam int limit, HttpServletRequest request,
			HttpServletResponse response) throws IOException {
		System.out.println("Standard HERE!");
		MongoDirver md = new MongoDirver();
		String result = md.queryStandards(standard_group, standard_id,
				standard_name, standard_status, special_subject, start, limit);
		md.close();
		response.getWriter().print(result);
	}
}
