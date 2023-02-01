package practice;

public class Practice {

  public static void main(String[] args) {

    //    String expression = "1 % 2";
    //
    //    String[] arr = expression.split("/");
    //    System.out.println(arr[1]);
    System.out.println(1.1 / 1 == 1);
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

}
