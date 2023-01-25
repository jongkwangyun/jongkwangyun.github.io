package programmers;

import java.util.Arrays;
import java.util.LinkedList;
import java.util.Queue;

public class P06_makeSameBothQueueSum3 {

  // 두 큐 합 같게 만들기
  public static void main(String[] args) {
    int[] arr1 = {3, 2, 7, 2};
    int[] arr2 = {4, 6, 5, 1};

    int answer = Solution.solution(arr1, arr2);
    
    System.out.println("answer: " + answer);
  }

  class Solution {
    public int solution(int[] queue1, int[] queue2) {
      int answer = -1;
      int qLen = queue1.length;
      long half = getHalfOfTotal(queue1, queue2) / 2;
      
      int[] queue = new int[qLen*3];
      System.arraycopy(queue1, 0, queue, 0, qLen);
      System.arraycopy(queue2, 0, queue, qLen, qLen);
      System.arraycopy(queue1, 0, queue, qLen*2, qLen);
//      System.out.println(Arrays.toString(queue));
      
      int caseMaxLen = qLen * 2 - 1;
      long maxMoveCnt = (qLen - 1) * 3;
      
      for (int moveCnt = 1; moveCnt <= maxMoveCnt; moveCnt++) {  // moveCnt = 1, qLen = 3
        int startI = qLen - 2 >= moveCnt ? moveCnt : (qLen + moveCnt - 1) / 2;
        int endI = qLen > moveCnt ? qLen - 1 : (qLen + moveCnt) / 2;
        
        for (; endI - startI + 1 <= caseMaxLen && startI >= 0; startI--, endI++) {
          long caseSum = 0;
          caseSum = getSumOfCase(queue, startI, endI);    		      
          
          // caseSum 이 half 와 같으면 바로 moveCnt 리턴
          if (half == caseSum) {
            return moveCnt;
          }
        }
      }
      
      // 다 돌아도 없으면 그대로 -1 리턴
      return answer;
    }
    
    public static int getHalfOfTotal(int[] queue1, int[] queue2) {
      int half = 0;
      for (int i = 0; i < queue1.length; i++) {
        half += queue1[i] + queue2[i];
      }
      return half;
    }
    
    // 경우의 수 1줄 계산 메서드
    public static long getSumOfCase(int[] queue, int startI, int endI) {
      long sum = 0;
      while (startI <= endI) {
//        System.out.print(startI + " ");
        sum += queue[startI++];
      }
//      System.out.println();
      return sum;
    }
    
  }  // class Solution
  
}











