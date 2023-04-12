package practice;

public class Practice {

  public static void main(String[] args) {

    Boolean flag = isValidNickname("abc.-_가");
    System.out.println(flag);

  }
  public static boolean isValidNickname(String str) {
    boolean hasInvalidChar = str.matches(".*[^a-zA-Z0-9가-힣-_.].*");
    return !hasInvalidChar;
  }
}