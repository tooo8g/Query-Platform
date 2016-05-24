package com.crec.util;

import java.io.ByteArrayOutputStream;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.EncodeHintType;
import com.google.zxing.MultiFormatWriter;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.platform.io.bean.Code;
import com.platform.mongo.util.Format;
import com.platform.mongo.util.TimeUtil;

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
		/*
		 * 重要物资编码:铁路产品标识代码+生产年份+生产月份+月生产序号
		 */
		String product_identify = code.getProduct_identify();// 产品标示代码
		Date now = new Date();
		String year = TimeUtil.YY(now);// 生产年份
		String month = TimeUtil.MM(now);// 生产月份
		// 月生产序列号暂时使用内排序
		List<Code> codes = new ArrayList<Code>();
		for (int i = 0; i < num; i++) {
			Code c = (Code) code.clone();
			c.setCode(product_identify + year + month + Format.format5(i));
			c.setInner_id(i);
			codes.add(c);
		}

		return codes;
	}

	/**
	 * 生成一维码
	 * 
	 * @auth zhanglei
	 * @param contents
	 * @param imgPath
	 * @return
	 */
	public static byte[] barcode(String contents) {
		try {
			BitMatrix bitMatrix = new MultiFormatWriter().encode(contents,
					BarcodeFormat.CODE_128, 200, 50);
			ByteArrayOutputStream byteOutputStream = new ByteArrayOutputStream();
			MatrixToImageWriter.writeToStream(bitMatrix, "png",
					byteOutputStream);
			return byteOutputStream.toByteArray();
		} catch (Exception e) {
			e.printStackTrace();
		}

		return null;
	}

	/**
	 * 生成二维码
	 * 
	 * @auth zhanglei
	 * @param contents
	 * @return
	 */
	public static byte[] qrcode(String contents) {
		try {
			Map<EncodeHintType, Object> hints = new HashMap<EncodeHintType, Object>();
			hints.put(EncodeHintType.CHARACTER_SET, "UTF-8");
			BitMatrix bitMatrix = new MultiFormatWriter().encode(contents,
					BarcodeFormat.QR_CODE, 200, 200, hints);
			ByteArrayOutputStream byteOutputStream = new ByteArrayOutputStream();
			MatrixToImageWriter.writeToStream(bitMatrix, "png",
					byteOutputStream);
			return byteOutputStream.toByteArray();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

}
