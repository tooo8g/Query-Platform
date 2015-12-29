package com.crec.demo;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

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

}
