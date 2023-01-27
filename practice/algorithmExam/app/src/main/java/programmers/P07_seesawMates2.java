package programmers;

public class P07_seesawMates2 {

  // 시소 짝꿍
  public static void main(String[] args) {
    int[] weights = {100,180,360,100,270};
    long answer = Solution.solution(weights);
    System.out.println(answer);
  }

  class Solution {
    public static long solution(int[] weights) {
      //      long t1 = System.nanoTime();
      int total = weights.length;
      long answer = 0;

      for (int p1Idx = 0; p1Idx < total; p1Idx++) {
        int p1 = weights[p1Idx];

        for (int p2Idx = p1Idx + 1; p2Idx < total; p2Idx++) {
          int p2 = weights[p2Idx];

          if (p1 == p2 || p1 == p2 * 2 || p1 * 2 == p2
              || p1 * 3 == p2 * 2 || p1 * 2 == p2 * 3
              || p1 * 4 == p2 * 3 || p1 * 3 == p2 * 4) {
            answer++;
          }
        }
      }
      //      long t2 = System.nanoTime();
      //      System.out.println(t2 - t1);
      return answer;
    }
  }
}
