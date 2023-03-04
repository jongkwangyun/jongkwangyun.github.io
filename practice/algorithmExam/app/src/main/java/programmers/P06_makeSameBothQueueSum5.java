package programmers;

public class P06_makeSameBothQueueSum5 {

  // 두 큐 합 같게 만들기
  public static void main(String[] args) {
    int[] arr1 = {3, 2, 7, 2};
    int[] arr2 = {4, 6, 5, 1};
    //    int[] arr1 = {1, 2, 1, 2};
    //    int[] arr2 = {1, 10, 1, 2};
    //    int[] arr1 = {1, 1};
    //    int[] arr2 = {1, 5};

    int answer = Solution.solution(arr1, arr2);

    System.out.println("answer: " + answer);
  }

  static class Solution {
    public static int solution(int[] queue1, int[] queue2) {
      int qLen = queue1.length;
      long halfTotal = 0;
      for (int i = 0; i < qLen; i++) {
        halfTotal += queue1[i] + queue2[i];
      }
      if (halfTotal % 2 == 1) {
        return -1;
      }
      halfTotal = halfTotal >> 1;

      int[] queue = new int[qLen*3];

      for (int i = 0, j = qLen, k = qLen << 1; i < qLen; i++, j++, k++) {
        queue[i] = queue1[i];
        queue[j] = queue2[i];
        queue[k] = queue1[i];
      }

      int caseMaxLen = (qLen << 1) - 1;
      long maxMoveCnt = (qLen - 1) * 3;

      if (qLen == 1) {
        return queue[0] == queue[1] ? 0 : -1;
      }

      for (int moveCnt = 1; moveCnt <= maxMoveCnt; moveCnt++) {  // moveCnt = 1, qLen = 3
        int startI = qLen - 2 >= moveCnt ? moveCnt : (qLen + moveCnt - 1) >> 1;
      int endI = qLen > moveCnt ? qLen - 1 : (qLen + moveCnt) >> 1;

      // moveCnt 첫번째 돌때 합 계산
      long caseSum = 0;
      int tempStartI = startI;
      while (tempStartI <= endI) {
        caseSum += queue[tempStartI++];
      }
      if (halfTotal == caseSum) {
        return moveCnt;
      }

      for (startI--, endI++; endI - startI + 1 <= caseMaxLen && startI >= 0; startI--, endI++) {

        caseSum += queue[startI] + queue[endI];

        // caseSum 이 half 와 같으면 바로 moveCnt 리턴
        if (halfTotal == caseSum) {
          return moveCnt;
        }
      }
      }

      // 다 돌아도 없으면 -1 리턴
      return -1;
    }
  }  // class Solution
}


/*

테스트 1 〉 통과 (0.02ms, 77.4MB)
테스트 2 〉 통과 (0.02ms, 82.9MB)
테스트 3 〉 통과 (0.02ms, 74MB)
테스트 4 〉 통과 (0.02ms, 74.3MB)
테스트 5 〉 통과 (0.14ms, 79.5MB)
테스트 6 〉 통과 (0.22ms, 76.7MB)
테스트 7 〉 통과 (0.46ms, 77.4MB)
테스트 8 〉 통과 (0.31ms, 79.9MB)
테스트 9 〉 통과 (1.27ms, 80.2MB)
테스트 10 〉    통과 (5.36ms, 77MB)
테스트 11 〉    통과 (7871.17ms, 87.8MB)
테스트 12 〉    통과 (991.10ms, 97MB)
테스트 13 〉    통과 (31.49ms, 90.9MB)
테스트 14 〉    통과 (47.25ms, 87.3MB)
테스트 15 〉    통과 (748.88ms, 86.7MB)
테스트 16 〉    통과 (144.95ms, 99.2MB)
테스트 17 〉    통과 (45.21ms, 100MB)
테스트 18 〉    통과 (219.75ms, 139MB)
테스트 19 〉    통과 (2509.28ms, 133MB)
테스트 20 〉    실패 (시간 초과)
테스트 21 〉    통과 (6582.70ms, 131MB)
테스트 22 〉    실패 (시간 초과)
테스트 23 〉    실패 (시간 초과)
테스트 24 〉    실패 (시간 초과)
테스트 25 〉    통과 (0.45ms, 71.5MB)
테스트 26 〉    통과 (0.20ms, 77.2MB)
테스트 27 〉    통과 (0.18ms, 73.5MB)
테스트 28 〉    실패 (시간 초과)
테스트 29 〉    실패 (221.50ms, 97.2MB)
테스트 30 〉    실패 (시간 초과)

 */