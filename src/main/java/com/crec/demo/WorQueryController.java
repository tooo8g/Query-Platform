package com.crec.demo;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.servlet.http.HttpServletResponse;

import org.bson.Document;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.platform.index.WordSearch;
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
	public void queryWordDetail(@RequestParam(required = true) String word,
			HttpServletResponse response) throws IOException {
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

		List<String> result = WordSearch.searchCol(word);
		detail.put("result", result);

		Set<String> ms = means.get(word);
		if (ms == null) {
			detail.put("means", new ArrayList<String>());
		} else {
			detail.put("means", ms);
		}

		Document total = new Document();
		total.append("msg", detail);

		response.getWriter().print(total.toJson());
	}

	@RequestMapping("/put_means")
	public void putMeans(@RequestParam(required = true) String word,
			@RequestParam(required = true) String m,
			HttpServletResponse response) throws IOException {
		Set<String> mean = means.get(word);
		if (mean == null) {
			mean = new HashSet<String>();
			mean.add(m);
			means.put(word, mean);
		} else {
			mean.add(m);
		}
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
		Set<String> mean = means.get(word);
		if (mean != null)
			mean.remove(m);
		response.getWriter().print(1);
	}

	public static void main(String[] args) {
		String word = "聚氯乙烯绝缘无护套电线电缆";
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

	public static void main1(String[] args) {
		Document d = new Document();
		String[] a = { "1", "2" };
		List<String> b = new ArrayList<String>();
		b.add("1");
		b.add("2");
		d.put("a", b);
		System.out.println(d.toJson());
	}
}
