package programmers;

import java.util.HashSet;
import java.util.Set;

public class P07_seesawMates {

  // 시소 짝꿍
  public static void main(String[] args) {
    int[] weights = {100,180,360,100,270};
    long answer = Solution.solution(weights);
    System.out.println(answer);
  }

  class Solution {
    public static long solution(int[] weights) {
      int total = weights.length;
      long answer = 0;
      Set<String> matesSet = new HashSet<>();

      for (int p1Idx = 0; p1Idx < total; p1Idx++) {
        for (int p2Idx = p1Idx + 1; p2Idx < total; p2Idx++) {

          if (weights[p1Idx] == weights[p2Idx]) {
            String mates = String.format("%d %d", weights[p1Idx], weights[p2Idx]);
            matesSet.add(mates);
          } else if (weights[p1Idx] * 3 == weights[p2Idx] << 1) {
            String mates = String.format("%d %d", weights[p2Idx], weights[p1Idx]);
            matesSet.add(mates);
          } else if (weights[p1Idx] == weights[p2Idx] << 1) {
            String mates = String.format("%d %d", weights[p1Idx], weights[p2Idx]);
            matesSet.add(mates);
          } else if (weights[p1Idx] << 2 == weights[p2Idx] * 3) {
            String mates = String.format("%d %d", weights[p2Idx], weights[p1Idx]);
            matesSet.add(mates);
          } else if (weights[p1Idx] << 1 == weights[p2Idx] * 3) {
            String mates = String.format("%d %d", weights[p1Idx], weights[p2Idx]);
            matesSet.add(mates);
          } else if (weights[p1Idx] << 1 == weights[p2Idx]) {
            String mates = String.format("%d %d", weights[p2Idx], weights[p1Idx]);
            matesSet.add(mates);
          } else /*if (weights[p1Idx] * 3 == weights[p2Idx] << 2)*/ {
            String mates = String.format("%d %d", weights[p1Idx], weights[p2Idx]);
            matesSet.add(mates);
          }
          //                System.out.printf("%s\n", mates);
        }
      }
      answer = matesSet.size();
      return answer;
    }
  }
}