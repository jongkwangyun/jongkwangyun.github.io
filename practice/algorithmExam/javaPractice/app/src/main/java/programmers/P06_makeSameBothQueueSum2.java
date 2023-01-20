package programmers;

import java.util.LinkedList;
import java.util.Queue;

public class P06_makeSameBothQueueSum2 {

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

      for (int i = 0; i < queue1.length; i++) {
        q1.add(queue1[i]);
        q2.add(queue2[i]);
      }


      return answer;
    }


  }
}











