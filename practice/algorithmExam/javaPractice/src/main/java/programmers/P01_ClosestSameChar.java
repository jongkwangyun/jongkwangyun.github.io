package programmers;

import java.util.Arrays;

public class P01_ClosestSameChar {

  public static void main(String[] args) {
    // 가장 가까운 글자

  }

  public int[] solution(String s) {
    int[] answer = new int[s.length()];
    Arrays.fill(answer, -1);

    for (int i = 0; i < s.length(); i++) {
      for (int j = i - 1; j >= 0; j--) {
        if (s.charAt(i) == s.charAt(j)) {
          answer[i] = i - j;
          break;
        }
      }
    }

    return answer;
  }

}
