package javahomework;

import java.io.PrintStream;
import java.net.Socket;
import java.util.Scanner;

public class CalcClientJoSeungHyun {

  public static void main(String[] args) throws Exception {
    Socket socket = new Socket("192.168.0.7", 8888);
    Scanner scan = new Scanner(System.in);

    Scanner in = new Scanner(socket.getInputStream());
    PrintStream out = new PrintStream(socket.getOutputStream());

    double first = -252525626;
    String middle = null;
    double secont = -252525626;

    while (true) {
      String sfirst = "";
      String ssecont = "";
      if (isint(first)) {
        sfirst = String.valueOf((long) first);
      } else {
        sfirst = String.valueOf(first);
      }
      if (isint(secont)) {
        ssecont = String.valueOf((long) secont);
      } else {
        ssecont = String.valueOf(secont);
      }

      if (first != -252525626 && middle != null && secont != -252525626) {
        System.out.printf("［%s %s %s］\n", sfirst, middle, ssecont);
      } else if (first != -252525626 && middle != null) {
        System.out.printf("［%s %s ］\n", sfirst, middle);
      } else if (first != -252525626) {
        System.out.printf("［%s］\n", sfirst);
      } else {
        System.out.printf("［］\n");
      }

      System.out.print("계산기(r:초기화 e:종료) => ");
      String ip = scan.nextLine();

      if (isInteger(ip) || isFloat(ip)) {
        if (middle == null) {
          first = Double.parseDouble(ip);
        } else {
          secont = Double.parseDouble(ip);
          out.println(first);
          out.println(middle);
          out.println(secont);
          first = Double.parseDouble(in.nextLine());
          middle = null;
          secont = -252525626;
        }
      } else if (ip.equals("r")) {
        first = -252525626;
        middle = null;
        secont = -252525626;
      } else if (ip.equals("e")) {
        out.println(-252525626);
        break;
      } else {
        if (first != -252525626) {
          if (ip.equals("*")) {
            middle = "*";
          } else if (ip.equals("/")) {
            middle = "/";
          } else if (ip.equals("%")) {
            middle = "%";
          } else if (ip.equals("+")) {
            middle = "+";
          } else if (ip.equals("-")) {
            middle = "-";
          } else {
            System.out.println("잘못된 입력");
          }
        } else {
          System.out.println("정수 입력 필요");
        }
      }
      System.out.println("\n");

    }

    out.close();
    in.close();
    socket.close();
  }

  public static boolean isInteger(String strValue) {
    try {
      Integer.parseInt(strValue);
      return true;
    } catch (NumberFormatException ex) {
      return false;
    }
  }

  public static boolean isLong(String strValue) {
    try {
      Long.parseLong(strValue);
      return true;
    } catch (NumberFormatException ex) {
      return false;
    }
  }

  public static boolean isFloat(String strValue) {
    try {
      Float.parseFloat(strValue);
      return true;
    } catch (NumberFormatException ex) {
      return false;
    }
  }

  public static boolean isDouble(String strValue) {
    try {
      Double.parseDouble(strValue);
      return true;
    } catch (NumberFormatException ex) {
      return false;
    }
  }

  public static boolean isint(double num) {
    return num % 1 == 0.0;
  }
}
