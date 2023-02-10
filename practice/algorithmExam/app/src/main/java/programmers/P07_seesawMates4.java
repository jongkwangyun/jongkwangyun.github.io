package programmers;

import java.util.Arrays;

public class P07_seesawMates4 {  // 실패

  // 시소 짝꿍
  public static void main(String[] args) {
    int[] weights = {100,180,360,100,270};
    long answer = Solution.solution(weights);
    System.out.println(answer);
  }

  class Solution {
    public static long solution(int[] weights) {
      int totalIdx = weights.length - 1;
      Arrays.sort(weights);
      long answer = 0;

      for (int p1Idx = 0, p2Idx = totalIdx; p1Idx <= p2Idx; p1Idx++, p2Idx = totalIdx) {
        while (true) {
          if ((weights[p1Idx] << 1) > weights[p2Idx]) {  // p1 * 2 >= p2
            if (p2Idx == p2Idx + ((totalIdx - p2Idx) >> 1)) {
              break;
            }
            p2Idx += ((totalIdx - p2Idx) >> 1);  // p2 와 total 사이 인덱스를 p2 에 넣는다.
            /**/continue;
          } else if ((weights[p1Idx] << 1) <= weights[p2Idx]) {  // p1 * 2 <= p2
            if ((weights[p1Idx] << 1) > weights[p2Idx - 1]) {  // p1 *2 > p2 이전 값
              break;
            }
            p2Idx -= ((p2Idx - p1Idx) >> 1);  // p1Idx 와 p2Idx 사이에 새 p2Idx 를 넣는다.
          }
        }

        for (; p1Idx < p2Idx; p2Idx--){
          if (weights[p1Idx] == weights[p2Idx] || weights[p1Idx] * 2 == weights[p2Idx]
              || weights[p1Idx] * 3 == weights[p2Idx] * 2 || weights[p1Idx] * 4 == weights[p2Idx] * 3) {
            answer++;
          }
        }
      }

      return answer;
    }
  }
}
