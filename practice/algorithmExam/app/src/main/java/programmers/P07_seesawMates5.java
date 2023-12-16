package programmers;

import java.util.Arrays;

public class P07_seesawMates5 {  // 실패

  // 시소 짝꿍
  public static void main(String[] args) {
    int[] weights = {100,180,360,100,270};
    long answer = Solution.solution(weights);
    System.out.println(answer);
  }

  class Solution {
    
    public static long solution(int[] weights) {
      int total = weights.length - 1;
      long answer = 0;
      Arrays.sort(weights);

      for (int p1Idx = 0; p1Idx < total; p1Idx++) {

        for (int p2Idx = findMidIdx(p1Idx, total, weights); p1Idx < p2Idx; p2Idx--) {

          if (weights[p1Idx] == weights[p2Idx]
              || weights[p1Idx] << 1 == weights[p2Idx]
                  || weights[p1Idx] * 3 == weights[p2Idx] << 1
                  || weights[p1Idx] << 2 == weights[p2Idx] * 3) {
            answer++;
          }
        }
      }
      return answer;
    }

    public static int findMidIdx(int p1Idx, int total, int[] weights) {
      if (total - p1Idx == 1) {
        return p1Idx + 1;
      }
      
      int p2Idx = p1Idx + ((total - p1Idx) >> 1);
      int halfMoveLen = (total - p2Idx) >> 1;

      while(true) {
        
        if (weights[p1Idx] << 1 >= weights[p2Idx]) {  // p1 * 2 보다 작거나 같으면 오른쪽으로

          if (weights[p1Idx] << 1 < weights[p2Idx + 1]) {  // p2 다음 숫자가 같거나 크면 그 숫자 리턴
            return p2Idx + 1;
          } 

          p2Idx += halfMoveLen;
          if (p2Idx == total) {
            return p2Idx;
          }

        } else {  // p1 * 2 < p2 면 왼쪽으로
          if (weights[p1Idx] << 1 <= weights[p2Idx - 1]) {
            return p2Idx - 1;
          }

          p2Idx -= halfMoveLen;
        }


        halfMoveLen = (halfMoveLen >> 1) == 0 ? 1 : (halfMoveLen >> 1);
      }
    }
    
  }
}

/*
테스트 1 〉 통과 (0.52ms, 73.5MB)
테스트 2 〉 통과 (0.50ms, 77.1MB)
테스트 3 〉 통과 (0.51ms, 74.3MB)
테스트 4 〉 통과 (123.47ms, 103MB)
테스트 5 〉 통과 (343.38ms, 90.8MB)
테스트 6 〉 통과 (1040.05ms, 82.3MB)
테스트 7 〉 통과 (1339.67ms, 109MB)
테스트 8 〉 통과 (2921.66ms, 86.4MB)
테스트 9 〉 통과 (5703.36ms, 98.2MB)
테스트 10 〉    통과 (9752.74ms, 94.8MB)
테스트 11 〉    통과 (9860.63ms, 86.8MB)
테스트 12 〉    통과 (1970.40ms, 80.2MB)
테스트 13 〉    통과 (7279.86ms, 90.2MB)
테스트 14 〉    통과 (7967.27ms, 82.5MB)
테스트 15 〉    통과 (9854.95ms, 100MB)
테스트 16 〉    통과 (0.50ms, 70.5MB)
테스트 17 〉    통과 (0.39ms, 74.1MB)
 */