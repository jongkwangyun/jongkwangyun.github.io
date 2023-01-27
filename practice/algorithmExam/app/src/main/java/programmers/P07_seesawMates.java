package programmers;

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

      for (int p1Idx = 0; p1Idx < total; p1Idx++) {
        for (int p2Idx = p1Idx + 1; p2Idx < total; p2Idx++) {
          if (weights[p1Idx] == weights[p2Idx]
              || weights[p1Idx] == weights[p2Idx] << 1 || weights[p1Idx] << 1 == weights[p2Idx]
                  || weights[p1Idx] * 3 == weights[p2Idx] << 1 || weights[p1Idx] << 1 == weights[p2Idx] * 3
                  || weights[p1Idx] << 2 == weights[p2Idx] * 3 || weights[p1Idx] * 3 == weights[p2Idx] << 2) {
            answer++;
          }
        }
      }
      return answer;
    }
  }
}

/*
테스트 1 〉 통과 (0.06ms, 73.5MB)
테스트 2 〉 통과 (0.07ms, 76.5MB)
테스트 3 〉 통과 (0.07ms, 74.9MB)
테스트 4 〉 통과 (229.70ms, 102MB)
테스트 5 〉 통과 (722.22ms, 92.9MB)
테스트 6 〉 통과 (1941.48ms, 79.4MB)
테스트 7 〉 통과 (2774.61ms, 95.9MB)
테스트 8 〉 통과 (5275.16ms, 86.7MB)
테스트 9 〉 실패 (시간 초과)
테스트 10 〉    실패 (시간 초과)
테스트 11 〉    실패 (시간 초과)
테스트 12 〉    통과 (1586.82ms, 82.9MB)
테스트 13 〉    실패 (시간 초과)
테스트 14 〉    실패 (시간 초과)
테스트 15 〉    실패 (시간 초과)
테스트 16 〉    통과 (0.07ms, 75.6MB)
테스트 17 〉    통과 (0.07ms, 79.7MB)
 */