package haitao.redisTest;

import java.io.File;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import com.csvreader.CsvReader;


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
//		String cPath = "cyberobject\\haitao33\\data\\(){}[]$^.xlsx\\detail_text_info0-1-0";
//		String path = "cyberobject\\haitao33\\data\\(){}[]$^.xlsx\\";
//		String[] specials = {"(", ")", "{", "}", "[", "]", "$", "^", ":", "|"};
//		path = path.replace("\\", "-ue8901ue-");
//		for(String special: specials){
//			path = path.replace(special, "\\" + special);
//		}
//		path = path.replace("-ue8901ue-", "\\\\");
//		String result = cPath.replaceFirst(path, "");
//		System.out.print(result);
//		
//		Pattern pa = Pattern.compile("^.*(\\.[^\\.]*$)");
//		Matcher ma = pa.matcher("a.b.c.xlsx|||aafadf");
//		if(ma.matches()){
//			System.out.println(ma.group(1));
//		}
//		System.out.println("a.b.c.xlsx|||aafadf".replaceAll("^.*(\\.[^\\.]*$)", "$1"));
//		String testStr0 = "<audio_card typeof=\"AUDIO\" xmlns=\"http://www.cyberobject.com/2012/12/term/ui#\" xmlns:s=\"http://www.cyberobject.com/2012/12/session#/ui\" xmlns:term=\"http://www.cyberobject.com/2012/12/term#\"></audio_car>";
//		String testStr1 = "<audio_card typeof=\"AUDIO\" xmlns=\"http://www.cyberobject.com/2012/12/term/ui#\" xmlns:s=\"http://www.cyberobject.com/2012/12/session#/ui\" xmlns:term=\"http://www.cyberobject.com/2012/12/term#\">"
//				+ "<audio id=\"s:x424203559\" src=\"https://www.cyberobject.com:4000/app_mm_audio/gqezjjhz7bnyxgruspbz5469mh2017-09-26T18:38:19.629Z.mp3\">I need to move the phone plugged to a different room</audio></audio_car>";
//		System.out.println(testStr0.replaceAll("<audio [^>]*>(.*)<\\/audio>", "$1"));
//		System.out.println(testStr1.replaceAll("<audio [^>]*>(.*)<\\/audio>", ""));
//
//		Pattern pa = Pattern.compile("<audio [^>]*>(.*)<\\/audio>");
//		Matcher ma = pa.matcher(testStr1);
//		if(ma.find()){
//			System.out.println(ma.group(1));
//		}
//		}
//		Map<String, String> maps = new HashMap<String, String>();
//		maps.put("cyberobject/haitao33/data/aaaa.db", "abcdeddddd");
//		maps.put("cyberobject/haitao33/data/dddd.db", "abcddwwwwwwwwwwd");
//		System.out.println(maps.get("cyberobject/haitao33/data/aaaa.db"));
		
//		List<Test> list = new ArrayList<Test>();
//		list.add(new Test("aa", "aa"));
//		list.add(new Test("ad", "ad"));
//		list.add(new Test("bb", "bb"));
//		list.add(new Test("ab", "ab"));
//		list.add(new Test("cc", "cc"));
//		list.add(new Test("dd", "dd"));
//		list.add(new Test("cb", "cb"));
//		list.add(new Test("ca", "ca"));
//		list.add(new Test("bd", "bd"));
//		list.add(new Test("ba", "ba"));
//		list.add(new Test("bv", "bv"));
//		System.out.println(list);
//		sortList(list);
//		System.out.println(list);
//		sortcList(list);
//		System.out.println(list);+
//		readeCsv();
		String a = "bbb";
		String b = a;
		String c = "bbbb";
		String d = a + "b";
		System.out.println(a==b);
		System.out.println(a.equals(b));
		System.out.println(c==d);
		System.out.println(c.equals(d));
		}
	
    public static void  readeCsv(){  
        try {      
               
            ArrayList<String[]> csvList = new ArrayList<String[]>(); //用来保存数据  
            String csvFilePath = "e:/Book11.csv";  
             CsvReader reader = new CsvReader(csvFilePath,',');    //一般用这编码读就可以了      
               
             reader.readHeaders(); // 跳过表头   如果需要表头的话，不要写这句。  
               
             while(reader.readRecord()){ //逐行读入除表头的数据      
                 csvList.add(reader.getValues());  
             }              
             reader.close();  
               
             for(int row=0;row<csvList.size();row++){  
                   
                 String[]  cell = csvList.get(row); //取得第row行第0列的数据  
                 System.out.println(Arrays.toString(cell));  
                   
             }  
               
               
        }catch(Exception ex){  
            System.out.println(ex);  
        }  
    }
    
	public static void sortcList(List<Test> list){
		Collections.sort(list, new Comparator<Test>(){

			public int compare(Test before, Test after) {
				String btext = before.getText().toLowerCase();
				String atext = after.getText().toLowerCase();
				if(btext.equals("bb")){
					return -1;
				}
				if(atext.equals("bb")){
					return -1;
				}
				
				if(btext.compareTo(atext) >= 0){
					return 1;
				}
				return 0;
			}
			
		});
	}
	public static void sortList(List<Test> list){
		Test temp = null;
		for(int i = list.size() - 1; i > 0; --i){
			for(int j =0; j < i; j++){
				Test before = list.get(j);
				Test after = list.get(j+1);
				String btext = before.getText().toLowerCase();
				String atext = after.getText().toLowerCase();
				
				//make orgaization first case sensitive
				if(btext.equals("bb")){
					continue;
				}
				if(atext.equals("bb")){
					temp = before;
					list.set(j, after);
					list.set(j+1, temp);
					temp = null;
				}else if(btext.compareTo(atext) >= 0){
					temp = before;
					list.set(j, after);
					list.set(j+1, temp);
					temp = null;
				}
			}
		}
	}
	public static class Test{
		String text;
		String name;
		public Test(String text, String name){
			this.text = text;
			this.name = name;
		}
		public String getText() {
			return text;
		}
		public void setText(String text) {
			this.text = text;
		}
		public String getName() {
			return name;
		}
		public void setName(String name) {
			this.name = name;
		}
		public String toString(){
			return name;
		}
	}
}

