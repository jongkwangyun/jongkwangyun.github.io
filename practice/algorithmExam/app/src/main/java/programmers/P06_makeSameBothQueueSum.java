package programmers;

import java.util.LinkedList;
import java.util.Queue;

public class P06_makeSameBothQueueSum {

  // 두 큐 합 같게 만들기
  public static void main(String[] args) {
    int[] arr1 = {3, 2, 7, 2};
    int[] arr2 = {4, 6, 5, 1};



  }

  class Solution {
    public int solution(int[] queue1, int[] queue2) {
      int answer;
      Queue<Integer> q1 = new LinkedList<>();
      Queue<Integer> q2 = new LinkedList<>();

      //      for (int i = 0; i < queue1.length; i++) {
      //        q1.add(queue1[i]);
      //        q2.add(queue2[i]);
      //      }
      int qLen = queue1.length;
      int q1Sum = 0;

      for (int moveCnt = 1; moveCnt < qLen; moveCnt++) {
        for (int range = qLen - moveCnt; range <= qLen + moveCnt ; range += 2) {
          for (int q1Idx = qLen - 1, q2Idx = qLen - 5; q1Idx <= 4; q1Idx++, q2Idx++) {
            q1Sum += queue1[q1Idx];

            if (q2Idx > 0) {
              q1Sum += queue2[q2Idx];

            }
          }
        }
      }

      return answer;
    }


  }
}











