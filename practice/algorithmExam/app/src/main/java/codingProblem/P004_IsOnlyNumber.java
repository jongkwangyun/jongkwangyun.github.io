package codingProblem;

public class P004_IsOnlyNumber {

  public static void main(String[] args) {
    // 숫자만 포함하는 문자열인지 검사

  } // main()

  // 방법 1
  private static boolean containsOnlyDigits(String str) {
    for (int i = 0; i < str.length(); i++) {
      if (!Character.isDigit(str.charAt(i))) {
        return false;
      }
    }

    return true;
  }

  // 방법 2
  private static boolean containsOnlyDigits2(String str) {
    return !str.chars()
        .anyMatch(n -> !Character.isDigit(n));
  }

  private static boolean containsOnlyDigits3(String str) {
    return str.matches("[0-9]+");
  }

}