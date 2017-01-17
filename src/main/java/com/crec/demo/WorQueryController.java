package com.crec.demo;

import java.io.IOException;
import java.net.URLDecoder;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.StringUtils;
import org.bson.Document;
import org.springframework.http.converter.json.MappingJacksonValue;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.platform.bean.Data;
import com.platform.index.MeanSearch;
import com.platform.index.WordSearch;
import com.platform.io.bean.Mean;
import com.platform.io.bean.NonstandardValue;
import com.platform.io.bean.StandardValue;
import com.platform.mongo.s2.MongoDirver;
import com.platform.test.WordSplit;
import com.platform.wordvec.WordVec;

@Controller
public class WorQueryController {
	public static Map<String, Set<String>> means;
	static {
		means = new HashMap<String, Set<String>>();
	}

	@RequestMapping("/query_word")
	public void queryWord(@RequestParam(required = true) String word,
			HttpServletResponse response) throws IOException {
		// System.out.println("-----------------<"+word+">-----------------");
		String result = WordSearch.search(word);
		if (result == null || result.equals(""))
			result = "无结果";
		response.getWriter().print(result);
	}

	@RequestMapping("/near_word")
	public void nearWord(@RequestParam(required = true) String word,
			HttpServletResponse response) throws IOException {
		// System.out.println("-----------------["+word+"]-----------------");
		String result = WordVec.find(word, 5);
		response.getWriter().print(result);
	}

	@RequestMapping("/query_word_detail")
	@ResponseBody
	public Object queryWordDetail(@RequestParam(required = true) String word,
			@RequestParam(required = false) Integer page,
			@RequestParam(required = false) Integer size,
			@RequestParam(required = false) String callback,
			HttpServletResponse response) throws IOException {
		word = URLDecoder.decode(word, "utf-8");
		Document detail = new Document();
		String[] split = WordSplit.analysis(word, "");
		List<String> splits = new ArrayList<String>();
		for (String str : split)
			splits.add(str);
		detail.put("words", splits);
		List<String> nears = new ArrayList<String>();
		Set<String> s = new HashSet<String>();
		for (int i = 0; i < split.length; i++) {
			Collection<String> r = WordVec.findCol(split[i], 5);
			for (String str : r)
				s.add(str);
		}
		for (Iterator<String> iterator = s.iterator(); iterator.hasNext();) {
			String n = iterator.next();
			nears.add(n);
		}
		detail.put("near", nears);

		List<String> result = null;
		if (page != null && size != null && page.intValue() > 0
				&& page.intValue() > 0) {
			result = WordSearch.searchCol(word, page.intValue(),
					size.intValue());
			int count = 0;
			if (result != null & result.size() > 0) {
				count = Integer.parseInt(result.remove(0));
			}
			detail.put("count", count);
			detail.put("result", result);
		} else {
			result = WordSearch.searchCol(word);
			detail.put("result", result);
		}

		System.out.println(word);
		// Set<String> ms = means.get(word);
		// if (ms == null) {
		// detail.put("means", new ArrayList<String>());
		// } else {
		// for (String mm : ms)
		// System.out.println(mm);
		// detail.put("means", ms);
		// }

		Document total = new Document();
		total.append("msg", detail);

		// response.getWriter().print(total.toJson());
		if (StringUtils.isBlank(callback)) {
			return total.toJson();
		} else {
			MappingJacksonValue mv = new MappingJacksonValue(total.toJson());
			mv.setJsonpFunction(callback);
			return mv;
		}
	}

	@RequestMapping("/put_means")
	public void putMeans(@RequestParam(required = true) String word,
			@RequestParam(required = true) String m,
			@RequestParam(required = true) String operator,
			HttpServletResponse response) throws IOException {
		// System.out.println(word + "|" + m);
		// Set<String> mean = means.get(word);
		// if (mean == null) {
		// mean = new HashSet<String>();
		// mean.add(m);
		// means.put(word, mean);
		// } else {
		// mean.add(m);
		// }
		MongoDirver md = new MongoDirver();
		md.addMean(m.replaceAll("<br>", ""), word, operator, 0);

		response.getWriter().print(1);
	}

	@RequestMapping("/queryWord")
	public void queryWord(@RequestParam(required = true) String word,
			@RequestParam(required = true) String m,
			HttpServletResponse response) throws IOException {
		List<String> result = WordSearch.searchCol(word);
		Document detail = new Document();
		detail.put("result", result);

		Document total = new Document();
		total.append("msg", detail);

		response.getWriter().print(total.toJson());
	}

	@RequestMapping("/remove_means")
	public void removeMeans(@RequestParam(required = true) String word,
			@RequestParam(required = true) String m,
			HttpServletResponse response) throws IOException {
		// Set<String> mean = means.get(word);
		// if (mean != null)
		// mean.remove(m);
		MongoDirver md = new MongoDirver();
		int stats = md.deleteMean(m, word);
		md.close();
		response.getWriter().print(stats);
	}

	@RequestMapping("/find")
	@ResponseBody
	public Object find(@RequestParam(required = true) String word,
			@RequestParam(required = true) Integer size,
			@RequestParam(required = true) String callback,
			HttpServletResponse response) throws IOException {
		word = URLDecoder.decode(word, "utf-8");
		Document detail = new Document();
		String[] split = WordSplit.analysis(word, "");
		List<String> splits = new ArrayList<String>();
		for (String str : split)
			splits.add(str);
		detail.put("words", splits);
		List<String> nears = new ArrayList<String>();
		Set<String> s = new HashSet<String>();
		for (int i = 0; i < split.length; i++) {
			Collection<String> r = WordVec.findCol(split[i], 5);
			for (String str : r)
				s.add(str);
		}
		for (Iterator<String> iterator = s.iterator(); iterator.hasNext();) {
			String n = iterator.next();
			nears.add(n);
		}
		detail.put("near", nears);

		MeanSearch ms = new MeanSearch();
		Data d = ms.searchAll(word, size);

		detail.put("result", d.getHits());

		detail.put("means", d.getMeans());

		Document total = new Document();
		total.append("msg", detail);

		MappingJacksonValue mv = new MappingJacksonValue(total.toJson());
		mv.setJsonpFunction(callback);
		return mv;
	}

	@RequestMapping("/query_standard_name")
	public void queryStandardName(@RequestParam String value,
			@RequestParam String importer, @RequestParam int batch_id,
			@RequestParam int source, @RequestParam int mean,
			@RequestParam String imp_time_start,
			@RequestParam String imp_time_end, @RequestParam int start,
			@RequestParam int limit, HttpServletResponse response)
			throws IOException {
		MongoDirver md = new MongoDirver();
		String result = md.queryStandardName(value, importer, batch_id, source,
				mean, imp_time_start, imp_time_end, start, limit);
		md.close();
		response.getWriter().print(result);
	}

	@RequestMapping("/add_standard_name")
	@ResponseBody
	public String addStandardName(@RequestBody List<StandardValue> standardValue) {
		MongoDirver md = new MongoDirver();
		try {
			md.addStandardName(standardValue);
		} catch (Exception e) {
			e.printStackTrace();
		}
		md.close();
		return "success";
	}

	@RequestMapping("/remove_standard_name")
	public void removeStandardName(@RequestParam String id,
			@RequestParam String batch_id, HttpServletResponse response)
			throws IOException {
		MongoDirver md = new MongoDirver();
		List<Integer> id_int = new ArrayList<Integer>();
		List<Integer> batch_id_int = new ArrayList<Integer>();
		if (id != null && !id.equals("")) {
			String[] _id = id.split(",");
			for (String s : _id) {
				id_int.add(Integer.parseInt(s));
			}
		}
		if (batch_id != null && !batch_id.equals("")) {
			String[] _batch_id = batch_id.split(",");
			for (String s : _batch_id) {
				batch_id_int.add(Integer.parseInt(s));
			}
		}
		md.deleteStandardName(id_int, batch_id_int);
		md.close();
		response.getWriter().print("sucess");
	}

	@RequestMapping("/query_nonstandard_name")
	public void queryNonStandardName(@RequestParam String value,
			@RequestParam String importer, @RequestParam int batch_id,
			@RequestParam int source, @RequestParam int mean,
			@RequestParam String imp_time_start,
			@RequestParam String imp_time_end, @RequestParam int start,
			@RequestParam int limit, HttpServletResponse response)
			throws IOException {
		MongoDirver md = new MongoDirver();
		System.out.println(value);
		String result = md.queryNonstandardName(value, importer, batch_id,
				source, mean, imp_time_start, imp_time_end, start, limit);
		md.close();
		response.getWriter().print(result);
	}

	@RequestMapping("/add_nonstandard_name")
	@ResponseBody
	public String addNonStandardName(
			@RequestBody List<NonstandardValue> nonstandardValue) {
		MongoDirver md = new MongoDirver();
		try {
			md.addNonstandardName(nonstandardValue);
		} catch (Exception e) {
			e.printStackTrace();
		}
		md.close();

		return "success";
	}

	@RequestMapping("/remove_nonstandard_name")
	public void removeNonStandardName(@RequestParam String id,
			@RequestParam String batch_id, HttpServletResponse response)
			throws IOException {
		MongoDirver md = new MongoDirver();
		List<Integer> id_int = new ArrayList<Integer>();
		List<Integer> batch_id_int = new ArrayList<Integer>();
		if (id != null && !id.equals("")) {
			String[] _id = id.split(",");
			for (String s : _id) {
				id_int.add(Integer.parseInt(s));
			}
		}
		if (batch_id != null && !batch_id.equals("")) {
			String[] _batch_id = batch_id.split(",");
			for (String s : _batch_id) {
				batch_id_int.add(Integer.parseInt(s));
			}
		}
		md.deleteNonstandardName(id_int, batch_id_int);
		md.close();
		response.getWriter().print("sucess");
	}

	@RequestMapping("/query_mean")
	public void queryMean(@RequestParam String standard_v,
			@RequestParam String nonstandard_v, @RequestParam int type,
			@RequestParam int check, @RequestParam String operator,
			@RequestParam String mean_time_start,
			@RequestParam String mean_time_end, @RequestParam int start,
			@RequestParam int limit, HttpServletResponse response)
			throws IOException {
		MongoDirver md = new MongoDirver();
		String result = md.queryMean(standard_v, nonstandard_v, type, check,
				operator, mean_time_start, mean_time_end, start, limit);
		md.close();
		response.getWriter().print(result);
	}

	@RequestMapping("/query_standard_name_by_non")
	public void queryStandardName(@RequestParam String nonstandard_v,
			HttpServletResponse response) throws IOException {
		MongoDirver md = new MongoDirver();
		Document result = new Document("data",
				md.queryMeanByNonstandard(nonstandard_v));
		md.close();
		response.getWriter().print(result.toJson());
	}

	@RequestMapping("/query_nonstandard_name_by_std")
	public void queryNonstandardName(@RequestParam String standard_v,
			HttpServletResponse response) throws IOException {
		MongoDirver md = new MongoDirver();
		Document result = new Document("data",
				md.queryMeanByStandard(standard_v));
		md.close();
		response.getWriter().print(result.toJson());
	}

	@RequestMapping("/check_mean")
	@ResponseBody
	public String updateMean(@RequestBody List<Mean> mean,
			HttpServletResponse response) throws IOException {
		MongoDirver md = new MongoDirver();
		md.updateMean(mean);
		return "sucess";
	}

	public static void main(String[] args) {
		String word = "线缆,kv,35";
		Document detail = new Document();
		String[] split = WordSplit.analysis(word, "");
		List<String> splits = new ArrayList<String>();
		for (String str : split)
			splits.add(str);
		detail.put("words", splits);
		List<String> nears = new ArrayList<String>();
		for (int i = 0; i < split.length; i++) {
			Collection<String> r = WordVec.findCol(split[i], 5);
			for (String str : r)
				nears.add(str);
		}
		detail.put("near", nears);
		List<String> result = WordSearch.searchCol(word);
		detail.put("result", result);

		detail.put("means", new ArrayList<String>());

		Document total = new Document();
		total.append("msg", detail);

		System.out.println(total.toJson());
	}

	// public static void main1(String[] args) {
	// Document d = new Document();
	// String[] a = { "1", "2" };
	// List<String> b = new ArrayList<String>();
	// b.add("1");
	// b.add("2");
	// d.put("a", b);
	// System.out.println(d.toJson());
	// }
}
