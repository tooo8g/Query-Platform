package com.crec.work;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;



@Controller
public class GotoController {
	@RequestMapping("/login")
    public ModelAndView login(){
         return new ModelAndView("/queryLogin");
    }
	
	@RequestMapping("/code/queryCodeSearch")
    public ModelAndView queryCodeSearch(){
         return new ModelAndView("queryCodeSearch");
    }
	
	@RequestMapping("/contract/queryContractCreat")
	public ModelAndView queryContractCreat(){
		return new ModelAndView("queryContractCreat");
	}
	
	@RequestMapping("/contract/queryContractInformation")
	public ModelAndView queryContractInformation(){
		return new ModelAndView("queryContractInformation");
	}
	
	@RequestMapping("/contract/queryContractSearch")
	public ModelAndView queryContractSearch(){
		return new ModelAndView("queryContractSearch");
	}
	
	@RequestMapping("/serial/querySerialCreatec")
	public ModelAndView querySerialCreatec(){
		return new ModelAndView("querySerialCreatec");
	}
	
	@RequestMapping("/serial/querySerialCreatep")
	public ModelAndView querySerialCreatep(){
		return new ModelAndView("querySerialCreatep");
	}
	
	@RequestMapping("/serial/querySerialNumSearch")
	public ModelAndView querySerialNumSearch(){
		return new ModelAndView("querySerialNumSearch");
	}
	
	@RequestMapping("/waybill/queryWaybillOz")
	public ModelAndView queryWaybillOz(){
		return new ModelAndView("queryWaybillOz");
	}
	
	@RequestMapping("/waybill/queryWaybillSearch")
	public ModelAndView queryWaybillSearch(){
		return new ModelAndView("queryWaybillSearch");
	}
}
