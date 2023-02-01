package javahomework;

import java.io.PrintStream;
import java.net.Socket;
import java.util.Scanner;
import java.util.stream.IntStream;

public class CalcClient {

  public static void main(String[] args) throws Exception {

    System.out.println("클라이언트 실행!");
    
    Scanner keyScan = new Scanner(System.in);
    
    Socket socket = new Socket("localhost", 8888);
    
    PrintStream out = new PrintStream(socket.getOutputStream());
    Scanner in = new Scanner(socket.getInputStream());
    
    int endExclusive = Integer.parseInt(in.nextLine());
    
    IntStream.range(0, endExclusive).forEach(e -> System.out.println(in.nextLine()));
    Thread.sleep(500);
    
    while (true) {
      System.out.print("? ");
      String keyIn = keyScan.nextLine();
      out.println(keyIn);
      
      String inputStr = in.nextLine();
      System.out.println("= " + inputStr);
      if (keyIn.equalsIgnoreCase("q")) {
        break;
      }
    }
    
    in.close();
    out.close();
    socket.close();
    keyScan.close();
    
  }

}
