package javahomework;

import java.io.PrintStream;
import java.net.ServerSocket;
import java.net.Socket;
import java.util.Scanner;

public class CalcServerJoSeungHyun {

  public static void main(String[] args) throws Exception {
    Scanner scan = new Scanner(System.in);
    ServerSocket serverSocket = new ServerSocket(8888);
    Socket socket = serverSocket.accept();
    Scanner in = new Scanner(socket.getInputStream());
    PrintStream out = new PrintStream(socket.getOutputStream());

    while (true) {
      double first = Double.parseDouble(in.nextLine());
      if (first == -252525626) {
        System.out.println("종료");
        break;
      }
      String middle = in.nextLine();
      double second = Double.parseDouble(in.nextLine());
      double answer = -252525626;

      if (middle.equals("*")) {
        answer = first * second;
      } else if (middle.equals("/")) {
        answer = first / second;
      } else if (middle.equals("%")) {
        answer = first % second;
      } else if (middle.equals("+")) {
        answer = first + second;
      } else if (middle.equals("-")) {
        answer = first - second;
      }
      System.out.printf("결과값 => %s\n", answer);
      out.println(answer);
      if (false) {
        break;
      }
    }

    out.close();
    in.close();
    socket.close();
    serverSocket.close();
  }

}
