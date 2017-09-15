package haitao.redisTest;

import java.io.File;

public class OtherTest {
	public static void main(String[] args){
//		String testStr = "&lt;div style=&quot;text-align: left&quot;&gt;Display a ask box &quot;All boxes displayed properly?&quot;&amp;nbsp;&lt;br&gt;&lt;/div&gt;";
////		testStr ="&lt;span&gt;What &lt;/span&gt;event is it that&amp;nbsp;&lt;span&gt;qualifies you for this enrollment at this time?&lt;/span&gt;";
//		
//		testStr = testStr.replace("&amp;", "&").replace("&lt;", "<").replace("&gt;", ">").replace("&nbsp;", " ").replace("&quot;", "\"");
//		System.out.println(testStr);
//		testStr = testStr.replaceAll("<(div|span|p)[^>]*>", "");
//		System.out.println(testStr);
//		testStr = testStr.replaceAll("</(div|span|p)>", "");
//		System.out.println(testStr);
//		testStr = testStr.replaceAll("<br>", "");
//		System.out.println(testStr);
//		
//		System.out.println(12/5);
//		System.out.println(11%5);
		String cPath = "cyberobject\\haitao33\\data\\(){}[]$^.xlsx\\detail_text_info0-1-0";
		String path = "cyberobject\\haitao33\\data\\(){}[]$^.xlsx\\";
		String[] specials = {"(", ")", "{", "}", "[", "]", "$", "^", ":", "|"};
		path = path.replace("\\", "-ue8901ue-");
		for(String special: specials){
			path = path.replace(special, "\\" + special);
		}
		path = path.replace("-ue8901ue-", "\\\\");
		String result = cPath.replaceFirst(path, "");
		System.out.print(result);
	}
}
