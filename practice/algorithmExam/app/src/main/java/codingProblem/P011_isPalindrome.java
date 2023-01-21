package codingProblem;

import java.util.stream.IntStream;

public class P011_isPalindrome {

  public static void main(String[] args) {

  } // main()

  // 방법1
  public static boolean isPalindrome(String str) {
    int left = 0;
    int right = str.length() - 1;

    while (right > left) {
      if (str.charAt(left) != str.charAt(right)) {
        return false;
      }
      left++;
      right--;
    }
    return true;
  }

  // 방법2
  public static boolean isPalindrome2(String str) {
    int n = str.length();

    for (int i = 0; i < n / 2; i++) {
      if (str.charAt(i) != str.charAt(n - i -1)) {
        return false;
      }
    }
    return true;
  }

  // 방법3
  public static boolean isPalindrome3(String str) {
    return str.equals(new StringBuilder(str).reverse().toString());
  }

  // 방법4
  public static boolean isPalindrome4(String str) {
    return IntStream.range(0,  str.length() / 2)
        .noneMatch(p -> str.charAt(p) != str.charAt(str.length() - p - 1));
  }

}

