package com.louis.kitty.admin.util;

import java.text.SimpleDateFormat;

public class Test {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		//String str1="2019-11-30";
		String str2="2019-12-31";
		//System.out.println(check(str1));
		System.out.println(check(str2));
	}

	static boolean check (String str) {
		SimpleDateFormat sd=new SimpleDateFormat("yyyy-MM-dd");//括号内为日期格式，y代表年份，M代表年份中的月份（为避免与小时中的分钟数m冲突，此处用M），d代表月份中的天数
		try {
			sd.setLenient(false);//此处指定日期/时间解析是否不严格，在true是不严格，false时为严格
			sd.parse(str);//从给定字符串的开始解析文本，以生成一个日期
		}
		catch (Exception e) {
			return false;
		}
		return true;
	}

}
