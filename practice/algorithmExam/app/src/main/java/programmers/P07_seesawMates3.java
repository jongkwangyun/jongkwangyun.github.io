package programmers;

public class P07_seesawMates3 {

  // 시소 짝꿍
  public static void main(String[] args) {
    int[] weights = {100,180,360,100,270};
    long answer = Solution.solution(weights);
    System.out.println(answer);
  }

  static int total;
  static int[] weights;
  static long answer;

  class Solution {
    public static long solution(int[] weightsArgs) {
      long t1 = System.nanoTime();
      total = weightsArgs.length;
      weights = weightsArgs;

      try {
        Thread thread1 = new Thread1();
        Thread thread2 = new Thread2();
        thread1.start();
        thread2.start();

        thread1.join();
        thread2.join();
      } catch (InterruptedException e) {
        e.printStackTrace();
      }
      long t2 = System.nanoTime();
      return answer;
    }
  }

  static class Thread1 extends Thread {
    @Override
    public void run() {
      int half = total >> 1;
      for (int p1Idx = 0; p1Idx < half; p1Idx++) {
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
    }
  }

  static class Thread2 extends Thread {
    @Override
    public void run() {
      int half = total >> 1;

        for (int p1Idx = half; p1Idx < total; p1Idx++) {
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
    }
  }

}
