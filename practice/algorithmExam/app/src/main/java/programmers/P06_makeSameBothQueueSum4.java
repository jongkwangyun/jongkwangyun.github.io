package programmers;

public class P06_makeSameBothQueueSum4 {

  // 두 큐 합 같게 만들기
  public static void main(String[] args) {
    int[] arr1 = {3, 2, 7, 2};
    int[] arr2 = {4, 6, 5, 1};

    int answer = Solution.solution(arr1, arr2);

    System.out.println("answer: " + answer);
  }

  static class Solution {
    public static int solution(int[] queue1, int[] queue2) {
      int qLen = queue1.length;
      long half = 0;
      for (int i = 0; i < queue1.length; i++) {
        half += queue1[i] + queue2[i];
      }
      half = half >> 1;

      int[] queue = new int[qLen*3];

      for (int i = 0, j = qLen, k = qLen * 2; i < qLen; i++, j++, k++) {
        queue[i] = queue1[i];
        queue[j] = queue2[i];
        queue[k] = queue1[i];
      }

      int caseMaxLen = qLen * 2 - 1;
      long maxMoveCnt = (qLen - 1) * 3;

      // qLen = 1 일때
      if (qLen == 1) {
        return queue[0] == queue[1] ? 0 : -1;
      }

      for (int moveCnt = 1; moveCnt <= maxMoveCnt; moveCnt++) {  // moveCnt = 1, qLen = 3
        int startI = qLen - 2 >= moveCnt ? moveCnt : (qLen + moveCnt - 1) >> 1;
      int endI = qLen > moveCnt ? qLen - 1 : (qLen + moveCnt) >> 1;

      for (; endI - startI + 1 <= caseMaxLen && startI >= 0; startI--, endI++) {
        long caseSum = 0;
        int tempStartI = startI;
        while (tempStartI <= endI) {
          caseSum += queue[tempStartI++];
        }

        // caseSum 이 half 와 같으면 바로 moveCnt 리턴
        if (half == caseSum) {
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
테스트 1 〉 통과 (0.02ms, 73MB)
테스트 2 〉 통과 (0.02ms, 75.2MB)
테스트 3 〉 통과 (0.02ms, 81MB)
테스트 4 〉 통과 (0.04ms, 66.4MB)
테스트 5 〉 통과 (2.84ms, 78.3MB)
테스트 6 〉 통과 (3.01ms, 77.7MB)
테스트 7 〉 통과 (3.62ms, 75.5MB)
테스트 8 〉 통과 (1.57ms, 84MB)
테스트 9 〉 통과 (6.99ms, 81.9MB)
테스트 10 〉    통과 (55.18ms, 85.6MB)
테스트 11 〉    실패 (시간 초과)
테스트 12 〉    실패 (시간 초과)
테스트 13 〉    통과 (3903.24ms, 85.3MB)
테스트 14 〉    통과 (2745.26ms, 84.5MB)
테스트 15 〉    실패 (시간 초과)
테스트 16 〉    실패 (시간 초과)
테스트 17 〉    통과 (2250.04ms, 90.9MB)
테스트 18 〉    실패 (시간 초과)
테스트 19 〉    실패 (시간 초과)
테스트 20 〉    실패 (시간 초과)
테스트 21 〉    실패 (시간 초과)
테스트 22 〉    실패 (시간 초과)
테스트 23 〉    실패 (시간 초과)
테스트 24 〉    실패 (시간 초과)
테스트 25 〉    통과 (13.70ms, 78.2MB)
테스트 26 〉    통과 (2.67ms, 77.8MB)
테스트 27 〉    통과 (5.09ms, 68.1MB)
테스트 28 〉    실패 (시간 초과)
테스트 29 〉    실패 (시간 초과)
테스트 30 〉    실패 (시간 초과)
 */










