package javahomework;

public class CalcServer {

  public static void main(String[] args) throws Exception {

    //    ServerSocket serverSocket = new ServerSocket(8888);
    //    Socket socket = serverSocket.accept();
    //
    //    System.out.println("┌───────────────────────────────────┐");
    //    System.out.println("│      계        산       기        │");
    //    System.out.println("├───────────────────────────────────│");
    //    System.out.println("│ 1. 연산자 1개만 가능합니다.       │");
    //    System.out.println("│ 2. +, -, *, /, % 연산 가능합니다. │");
    //    System.out.println("│ 3. 종료는 Q(q) 입력 바랍니다.     │");
    //    System.out.println("└───────────────────────────────────┘");
    //
    //    Scanner in = new Scanner(socket.getInputStream());
    //    PrintStream out = new PrintStream(socket.getOutputStream());
    //
    //    String expression = in.nextLine();

    String unstripExpression = "  2  /2";
    String expression = unstripExpression.strip();
    String message = "";

    if (CalcServer.countOperator(expression) != 1) {
      //      System.out.println(countOperator(expression));
      message = "연산자를 1개만 입력하세요";
    }
    if (!CalcServer.isFirstAndLastNumber(expression)) {
      //      System.out.println(isFirstAndLastNumber(expression));
      message = "처음 또는 마지막 문자가 숫자가 아닙니다.";
    }
    if (CalcServer.hasWrongChar(expression)) {
      //      System.out.println(hasWrongChar(expression));
      message = "잘못된 문자가 입력 되었습니다.";
    }

    double answer = CalcServer.getAnswer(expression);
    System.out.println(CalcServer.getAnswer(expression));

    if (Double.isInfinite(answer)) {
      message = "0으로 나눌 수 없습니다.";
    } else if (Double.isNaN(answer)) {
      message = "결과가 숫자가 아닙니다.";
    }

    //    if (containsDot(expression)) {
    //
    //    } else {
    //      int answer;
    //    }
    //
    //  }

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
          .filter(e -> !CalcServer.isOperator(e))
          .filter(e -> e < 48 || e > 57)
          .count() > 0 ? true : false;
    }

    static String getOperator(String expression) {
      if (expression.contains("+")) {
        return "+";

      } else if (expression.contains("-")) {
        return "-";

      } else if (expression.contains("*")) {
        return "*";

      } else if (expression.contains("/")) {
        return "/";

      } else if (expression.contains("%")) {
        return "%";
      }

      return null;
    }

    static String[] getDividedStringArray(String expression) {
      if (expression.contains("+")) {
        return expression.split("\\+");

      } else if (expression.contains("-")) {
        return expression.split("-");

      } else if (expression.contains("*")) {
        return expression.split("\\*");

      } else if (expression.contains("/")) {
        return expression.split("/");

      } else if (expression.contains("%")) {
        return expression.split("%");
      }

      return null;
    }

    static Double getAnswer(String expression) {
      String[] arrayDividedByOperator = new String[3];
      String[] numbersArray;

      if (expression.contains("+")) {
        numbersArray = expression.split("\\+");
        return Double.parseDouble(numbersArray[0]) + Double.parseDouble(numbersArray[1]);

      } else if (expression.contains("-")) {
        numbersArray = expression.split("-");
        return Double.parseDouble(numbersArray[0]) - Double.parseDouble(numbersArray[1]);

      } else if (expression.contains("*")) {
        numbersArray = expression.split("\\*");
        return Double.parseDouble(numbersArray[0]) * Double.parseDouble(numbersArray[1]);

      } else if (expression.contains("/")) {
        numbersArray = expression.split("/");
        return Double.parseDouble(numbersArray[0]) / Double.parseDouble(numbersArray[1]);

      } else if (expression.contains("%")) {
        numbersArray = expression.split("%");
        return Double.parseDouble(numbersArray[0]) % Double.parseDouble(numbersArray[1]);
      }

      return null;
    }

    static boolean containDot (String expression) {
      expression.contains(".");
    }

  }




























