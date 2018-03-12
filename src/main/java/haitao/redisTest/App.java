package haitao.redisTest;

import redis.clients.jedis.Jedis;

/**
 * Hello world!
 *
 */
public class App 
{
    public static void main( String[] args ) throws Exception
    {
        String msg = "<message><header><action value=\"debug\"/><session value=\"\"/><from value=\"workflow.199\"/><to value=\"\"/><org value=\"cyberobject\"/><app value=\"enrollment_chat\"/><user value=\"\"/></header><body><debug><path><location id=\"cyberobject/httest/Document/Enrollment greeting.rex#s1.88-o4\"/></path></debug></body></message>";
        String msg1 = "<message><header><action value=\"debug\"/><session value=\"\"/><from value=\"workflow.199\"/><to value=\"\"/><org value=\"cyberobject\"/><app value=\"enrollment_chat\"/><user value=\"\"/></header><body><debug><path><location id=\"cyberobject/httest/Document/Enrollment greeting.rex#s1.88-o61\"/></path></debug></body></message>";
        String msg2 = "<message><header><action value=\"debug\"/><session value=\"\"/><from value=\"workflow.199\"/><to value=\"\"/><org value=\"cyberobject\"/><app value=\"enrollment_chat\"/><user value=\"\"/></header><body><debug><path><location id=\"cyberobject/httest/Document/Enrollment greeting.rex#s1.88-o64\"/></path></debug></body></message>";
        String msg3 = "<message><header><action value=\"conversation\"/><sessionid value=\"ssnxiao\"/><userid value=\"nxiao\"/><debugid value=\"off\"/></header><body><debug><path><location id=\"cyberobject/ntelagent/Document/Close_POTS_0225.vsd#s0.9\"/></path></debug></body></message>";
        String msg4 = "<message><header><action value=\"conversation\"/><sessionid value=\"ssnxiao\"/><userid value=\"nxiao\"/><debugid value=\"off\"/></header><body><debug><path><location id=\"cyberobject/ntelagent/Document/Close_POTS_0225.vsd#s4.2\"/></path></debug></body></message>";
        String msg5 = "<message><header><action value=\"conversation\"/><sessionid value=\"ssnxiao\"/><userid value=\"nxiao\"/><debugid value=\"off\"/></header><body><debug><path><location id=\"cyberobject/ntelagent/Document/Close_POTS_0225.vsd#s0.10\"/></path></debug></body></message>";
        String msg6 = "<message><header><action value=\"conversation\"/><sessionid value=\"ssnxiao\"/><userid value=\"nxiao\"/><debugid value=\"off\"/></header><body><debug><path><location id=\"cyberobject/ntelagent/Document/testrex.rex#s1.88-o10\"/></path></debug></body></message>";
        String msg7 = "<message><header><action value=\"conversation\"/><sessionid value=\"ssnxiao\"/><userid value=\"nxiao\"/><debugid value=\"off\"/></header><body><debug><path><location id=\"cyberobject/ntelagent/Document/testrex.rex#s1.88-o11\"/></path></debug></body></message>";

        String msg8 = "<message><header><action value=\"console\"/><session value=\"http://www.cyberobject.com/2012/12/session#2ff30710-23d2-11e7-8d85-cb013b907cba_enrollment_chat\"/><from value=\"workflow.199\"/><to value=\"sdecf76abd8254e409c8c45b9221000aa\"/><org value=\"cyberobject\"/><app value=\"enrollment_chat\"/><user value=\"http://www.cyberobject.com/2012/12/session#2ff30710-23d2-11e7-8d85-cb013b907cba_enrollment_chat\"/></header><body><debug><message type=\"error\" id=\"cyberobject/enrollment_chat/Document/Enrollment greeting.rex#s1.88-o65\">go the sharp</message></debug></body></message>";
//        String msg = "<message><header><action value=\"debug\"/><session value=\"http://www.cyberobject.com/2012/12/session#2ff30710-23d2-11e7-8d85-cb013b907cba_enrollment_chat\"/><from value=\"workflow.199\"/><to value=\"sdecf76abd8254e409c8c45b9221000aa\"/><org value=\"cyberobject\"/><app value=\"enrollment_chat\"/><user value=\"http://www.cyberobject.com/2012/12/session#2ff30710-23d2-11e7-8d85-cb013b907cba_enrollment_chat\"/></header><body><debug><path><location id=\"cyberobject/httest/Document/Enrollment greeting.rex#s1.88-o65\"/></path></debug></body></message>";
//        String msg = "<message><header><action value=\"conversation\"/><sessionid value=\"ssnxiao\"/><userid value=\"nxiao\"/><debugid value=\"off\"/></header><body><debug><message type=\"error\" id=\"cyberobject/ntelagent/Document/Close_POTS_0225.vsd#s0.11\">hi everybody</message></debug></body></message>";
//        String msg = "<message><header><action value=\"conversation\"/><sessionid value=\"ssnxiao\"/><userid value=\"nxiao\"/><debugid value=\"off\"/></header><body><debug><path><location id=\"cyberobject/ntelagent/Document/Close_POTS_0225.vsd#s0.9\"/></path></debug></body></message>";
//        String msg1 = "<message><header><action value=\"conversation\"/><sessionid value=\"ssnxiao\"/><userid value=\"nxiao\"/><debugid value=\"off\"/></header><body><debug><path><location id=\"cyberobject/ntelagent/Document/Close_POTS_0225.vsd#s0.11\"/></path></debug></body></message>";
//        String msg2 = "<message><header><action value=\"conversation\"/><sessionid value=\"ssnxiao\"/><userid value=\"nxiao\"/><debugid value=\"off\"/></header><body><debug><path><location id=\"cyberobject/ntelagent/Document/Close_POTS_0225.vsd#s0.10\"/></path></debug></body></message>";
//        String msg = "<message><header><action value=\"conversation\"/><sessionid value=\"ssnxiao\"/><userid value=\"nxiao\"/><debugid value=\"off\"/></header><body><debug><message type=\"error\" id=\"cyberobject/ntelagent/Document/Close_POTS_0225.vsd#s0.10\">hi everybody</message></debug></body></message>";

//        Jedis jedis = new Jedis("192.168.254.196");
        Jedis jedis = new Jedis("192.168.0.55");
        long sleeptime = 1000;
        String key = "s39626d94828c48f5868dcb4b5295fedd".trim();
        
//        jedis.lpush(key, msg);
//        Thread.sleep(sleeptime);
//        
//        jedis.lpush(key, msg1);
//        Thread.sleep(sleeptime);
//        
//        jedis.lpush(key, msg2);
//        Thread.sleep(sleeptime);
        
        jedis.lpush(key, msg3);
        Thread.sleep(sleeptime);
        
        jedis.lpush(key, msg4);
        Thread.sleep(sleeptime);
        
        jedis.lpush(key, msg5);
        Thread.sleep(sleeptime);
        
        jedis.lpush(key, msg6);
        Thread.sleep(sleeptime);
        
        jedis.lpush(key, msg7);
        Thread.sleep(sleeptime);
        
        jedis.lpush(key, msg8);
        Thread.sleep(sleeptime);
        
        jedis.close();
    }
}
