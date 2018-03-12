package haitao.redisTest;

public class TestO implements TestInterface {
	private String name;
	private String addr;
	
	public TestO(String name, String addr) {
		this.name = name;
		this.addr = addr;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getAddr() {
		return addr;
	}
	public void setAddr(String addr) {
		this.addr = addr;
	}
	public String showInfo() {
		// TODO Auto-generated method stub
		System.out.println(TestO.VERSION);
		return null;
	}
	
}
