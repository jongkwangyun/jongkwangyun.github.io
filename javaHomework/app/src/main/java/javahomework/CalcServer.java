package javahomework;

import java.io.PrintStream;
import java.net.ServerSocket;
import java.net.Socket;
import java.util.Scanner;

public class CalcServer {

  static String[] numbersArray = new String[2];
  static String operator;

  public static void main(String[] args) throws Exception {

    System.out.println("서버 실행!");

    ServerSocket serverSocket = new ServerSocket(8888);
    Socket socket = serverSocket.accept();

    System.out.println("클라이언트께서 접속 하셨습니다.");

    Scanner in = new Scanner(socket.getInputStream());
    PrintStream out = new PrintStream(socket.getOutputStream());

    out.println("7");
    out.println("┌───────────────────────────────────┐");
    Thread.sleep(500);
    out.println("│       계        산       기       │");
    Thread.sleep(500);
    out.println("├───────────────────────────────────│");
    Thread.sleep(500);
    out.println("│ 1. 연산자 1개만 가능합니다.       │");
    Thread.sleep(500);
    out.println("│ 2. +, -, *, /, % 연산 가능합니다. │");
    Thread.sleep(500);
    out.println("│ 3. 종료는 Q(q) 입력 바랍니다.     │");
    Thread.sleep(500);
    out.println("└───────────────────────────────────┘");

    while (true) {
      String unstripExpression = in.nextLine();
      System.out.println("? " + unstripExpression);

      if (unstripExpression.equalsIgnoreCase("q")) {
        break;
      }

      String expression = unstripExpression.strip();
      String message = "";

      try {
        if (countOperator(expression) != 1) {
          message = "연산자를 1개만 입력하세요";
        } else if (hasWrongChar(expression)) {
          message = "잘못된 문자가 입력 되었습니다.";
        } else if (!isFirstAndLastNumber(expression)) {
          message = "처음 또는 마지막 문자가 숫자가 아닙니다.";
        } else {

          double answer = CalcServer.getAnswer(expression);

          if (Double.isInfinite(answer)) {
            message = "0으로 나눌 수 없습니다.";
          } else if (Double.isNaN(answer)) {
            message = "결과가 숫자가 아닙니다.";
          } else if (isBothNumberInt(numbersArray) && isAnswerInt(numbersArray, operator)) {
            answer = Math.floor(answer);
            message = Integer.toString((int) answer);
          } else {
            message = Double.toString(answer);
          }
        }

        System.out.println(message);

        out.println(message);
      } catch (Exception e) {
        e.printStackTrace();
        out.println("올바로 입력하세요.");
      }

    }

    out.println("계산기 종료! Bye~ Bye~");

    in.close();
    out.close();

    socket.close();
    serverSocket.close();
  }

  static boolean isOperator(int codePoint) {
    final int PLUS = 43;
    final int MINUS = 45;
    final int MULTIPLICATION = 42;
    final int DIVISION = 47;
    final int MODULO = 37;

    if (codePoint == PLUS || codePoint == MINUS || codePoint == MULTIPLICATION
        || codePoint == DIVISION || codePoint == MODULO) {
      return true;
    }

    return false;
  }

  static int countOperator(String expression) {
    return (int) expression.codePoints()
        .filter(CalcServer::isOperator)
        .count();
  }

  static boolean isFirstAndLastNumber(String expression) {
    if (expression.charAt(0) >= 48 &&
        expression.charAt(expression.length() - 1) <= 57) {
      return true;
    }
    return false;
  }

  static boolean hasWrongChar(String expression) {
    return expression.codePoints()
        .filter(e -> !isOperator(e))
        .filter(e -> e < 48 || e > 57)
        .filter(e -> e != 46)
        .count() > 0 ? true : false;
  }

  static Double getAnswer(String expression) {
    if (expression.contains("+")) {
      numbersArray = expression.split("\\+");
      operator = "+";
      return Double.parseDouble(numbersArray[0]) + Double.parseDouble(numbersArray[1]);

    } else if (expression.contains("-")) {
      numbersArray = expression.split("-");
      operator = "-";
      return Double.parseDouble(numbersArray[0]) - Double.parseDouble(numbersArray[1]);

    } else if (expression.contains("*")) {
      numbersArray = expression.split("\\*");
      operator = "*";
      return Double.parseDouble(numbersArray[0]) * Double.parseDouble(numbersArray[1]);

    } else if (expression.contains("/")) {
      numbersArray = expression.split("/");
      operator = "/";
      return Double.parseDouble(numbersArray[0]) / Double.parseDouble(numbersArray[1]);

    } else if (expression.contains("%")) {
      numbersArray = expression.split("%");
      operator = "%";
      return Double.parseDouble(numbersArray[0]) % Double.parseDouble(numbersArray[1]);
    }

    return null;
  }

  static boolean isBothNumberInt (String[] numbersArray) {
    return !numbersArray[0].contains(".") && !numbersArray[1].contains(".");
  }

  static boolean isAnswerInt (String[] numbersArray, String operator) {
    if (operator.equals("+")) {
      return Math.floor(Double.parseDouble(numbersArray[0])) + Math.floor(Double.parseDouble(numbersArray[1]))
      == Math.floor(Double.parseDouble(numbersArray[0]) + Double.parseDouble(numbersArray[1]));
    } else if (operator.equals("-")) {
      return Math.floor(Double.parseDouble(numbersArray[0])) - Math.floor(Double.parseDouble(numbersArray[1]))
          == Math.floor(Double.parseDouble(numbersArray[0]) - Double.parseDouble(numbersArray[1]));
    } else if (operator.equals("*")) {
      return Math.floor(Double.parseDouble(numbersArray[0])) * Math.floor(Double.parseDouble(numbersArray[1]))
          == Math.floor(Double.parseDouble(numbersArray[0]) * Double.parseDouble(numbersArray[1]));
    } else if (operator.equals("/")) {
      return Math.floor(Double.parseDouble(numbersArray[0])) / Math.floor(Double.parseDouble(numbersArray[1]))
          == Math.floor(Double.parseDouble(numbersArray[0]) / Double.parseDouble(numbersArray[1]));
    } else if (operator.equals("%")) {
      return Math.floor(Double.parseDouble(numbersArray[0])) % Math.floor(Double.parseDouble(numbersArray[1]))
          == Math.floor(Double.parseDouble(numbersArray[0]) % Double.parseDouble(numbersArray[1]));
    }

    return false;
  }

}
