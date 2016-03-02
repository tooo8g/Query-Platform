package com.crec.util;

import java.util.ArrayList;
import java.util.List;

import com.platform.io.bean.Code;



public class CodeUtil {

	/**
	 * 
	 * @auth zhanglei
	 * @param code
	 *            编码原始数据
	 * @param num
	 *            生成数量
	 * @return
	 */
	public static List<Code> codec(Code code, int num) {
		List<Code> codes = new ArrayList<Code>();
		for (int i = 0; i < num; i++) {
			Code c = (Code) code.clone();
			c.setCode(i + "");
			c.setInner_id(i + "");
			codes.add(c);
		}

		return codes;
	}
}
