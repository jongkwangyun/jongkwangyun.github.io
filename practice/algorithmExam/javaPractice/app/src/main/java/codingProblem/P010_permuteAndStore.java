package codingProblem;

import java.util.HashSet;
import java.util.Set;
import java.util.stream.IntStream;

public class P010_permuteAndStore {

  public static void main(String[] args) {

  } // main()

  // 결과 출력
  public static void permuteAndStore(String str) {
    permuteAndPrint("", str);
  }

  private static void permuteAndPrint(String prefix, String str) {
    int n = str.length();

    if (n == 0) {
      System.out.print(prefix + " ");
    } else {
      for (int i = 0; i < n; i++) {
        permuteAndPrint(prefix + str.charAt(i),
            str.substring(i + 1, n) + str.substring(0, i));
      }
    }
  }

  // 결과 저장
  public static Set<String> permuteAndStore2(String str) {
    return permuteAndStore2("", str);
  }

  private static Set<String> permuteAndStore2(String prefix, String str) {
    Set<String> permutations = new HashSet<>();
    int n = str.length();

    if (n == 0) {
      permutations.add(prefix);
    } else {
      for (int i = 0; i < n; i++) {
        permutations.addAll(permuteAndStore2(prefix + str.charAt(i),
            str.substring(i + 1, n) + str.substring(0, i)));
      }
    }

    return permutations;
  }

  // 자바8 함수형
  private static void permuteAndPrintStream(String prefix, String str) {
    int n = str.length();

    if (n == 0) {
      System.out.print(prefix + " ");
    } else {
      IntStream.range(0, n)
      .parallel()
      .forEach(i -> permuteAndPrintStream(prefix + str.charAt(i), str.substring(i + 1, n) + str.substring(0, i)));

    }
  }

}

