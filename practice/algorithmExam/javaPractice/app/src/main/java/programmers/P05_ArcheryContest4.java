package programmers;

import java.util.Arrays;

public class P05_ArcheryContest4 {

  class Solution {
    static int[] ryanShot = new int[11];
    static int ryanScore;
    static int apeachScore;
    static int maxScoreDifRyanWin;
    static int[] ryanShotBest = new int[11];

    public static int[] solution(int n, int[] info) {
      int[] answer = {};

      setN(ryanShot, n, n, info);

      if (maxScoreDifRyanWin == 0) {
        return answer = new int[] {-1};
      }

      answer = ryanShotBest;

      return answer;
    }

    public static void setN(int[] inputRyanShot, int maxArrowAtATarget, int inputN, int[] info) {
      int[] nowRyanShot = Arrays.copyOf(inputRyanShot, 11);
      maxArrowAtATarget = maxArrowAtATarget > inputN ? inputN : maxArrowAtATarget;

      // maxArrowAtATarget = 1, inputN = 1
      for (int restN = inputN; maxArrowAtATarget > 0; maxArrowAtATarget--) {

        // [0,0,0,0,0,0,0,0,0,0,scoreIdx]   // scoreIdx = 10, restN = 5
        for (int scoreIdx = 10; scoreIdx >= 0; scoreIdx--, nowRyanShot = Arrays.copyOf(inputRyanShot, 11), restN = inputN) {

          // 자리 비었는지?
          if(nowRyanShot[scoreIdx] == 0) {

            if(restN >= maxArrowAtATarget) {  // 5 >= 4
              nowRyanShot[scoreIdx] = maxArrowAtATarget;  // {1,0,0,0,0,0,0,0,0,0,4}
              restN -= maxArrowAtATarget;  // restN = 1

              // 남은 화살이 없으면 다음 인덱스로
              if (restN == 0) {

                // 0~10 인덱스 값 비교
                scoreCheck(info, nowRyanShot);

                continue;

                // 남은 화살이 있으면 재귀 함수 실행
              } else {
                setN(nowRyanShot, maxArrowAtATarget, restN, info);  //  {1,0,0,0,0,0,0,0,0,0,4} 4 1
              }

            } else {
              nowRyanShot[scoreIdx] = restN;  // restN = 1  {1,0,0,0,0,0,0,0,0,0,4}

              // 0~10 인덱스 값 비교
              scoreCheck(info, nowRyanShot);

              continue;
            }

          } else {
            continue;
          }
        }
      }
    }

    static void scoreCheck(int[] info, int[] nowRyanShot) {
      for (int i = 0; i <= 10; i++) {
        if (info[i] == 0 && nowRyanShot[i] == 0) {
          continue;
        }
        if (info[i] < nowRyanShot[i]) {
          ryanScore += 10 - i;
        } else {
          apeachScore += 10 - i;
        }
      }

      // Ryan 최대 점수와 비교
      if (maxScoreDifRyanWin < (ryanScore - apeachScore)) {

        ryanShotBest = nowRyanShot;
        maxScoreDifRyanWin = ryanScore - apeachScore;  // 49

        // 동점일 때
      } else if (maxScoreDifRyanWin == (ryanScore - apeachScore)) {

        // 낮은 점수 더 많이 맞힌게 어떤건지 비교
        for (int i = 10; i >= 0; i--) {

          if (ryanShotBest[i] < nowRyanShot[i]) {
            ryanShotBest = nowRyanShot;
            maxScoreDifRyanWin = ryanScore - apeachScore;
            break;
          } else if (ryanShotBest[i] > nowRyanShot[i]) {
            break;
          }
        }
      }

      //    System.out.println(Arrays.toString(nowRyanShot) + " Ryan: " + ryanScore + " | Apeach: " + apeachScore + " | maxScoreDif " + maxScoreDifRyanWin + " " + Arrays.toString(ryanShotBest));
      ryanScore = 0; apeachScore = 0;
    }

  }
}


/*

n = 5
5
41
32
311
221
2111
11111





n   info    result
5   [2,1,1,1,0,0,0,0,0,0,0] [0,2,2,0,1,0,0,0,0,0,0]
1   [1,0,0,0,0,0,0,0,0,0,0] [-1]
9   [0,0,1,2,0,1,1,1,1,1,1] [1,1,2,0,1,2,2,0,0,0,0]
10  [0,0,0,0,0,0,0,0,3,4,3] [1,1,1,1,1,1,1,1,0,0,2]

최종 우승 점수 : 라이언 > 어피치

가장 큰 점수차로 이겨야 함

가장 큰 점수차로 이기는 경우가 2개 이상이면 가장 낮은 점수를 더 많이 맞춘걸 선택
- 가장 낮은 점수를 맞힌 개수가 같으면 그 다음 낮은 점수를 더 많이 맞춘걸 선택

라이언이 우승할 방법이 없으면 [-1] 리턴



경우의 수 예시
n = 5
어피치
[2,1,1,1,0,0,0,0,0,0,0] : 15

방법1. n 으로 할 수 있는 모든 경우의 수
[5,0,0,0,0,0,0,0,0,0,0]
[0,5,0,0,0,0,0,0,0,0,0]
...

[4,1,0,0,0,0,0,0,0,0,0]
[4,0,1,0,0,0,0,0,0,0,0]
...
[0,4,1,0,0,0,0,0,0,0,0]
...





방법2. 한 자리마다 선택가능한 수 둘 중 하나 // 정답 못찾는 경우 있어 미사용
라이언
[3,2,2,2,1,1,1,1,1,1,1] 승리
[0,0,0,0,0,0,0,0,0,0,0] 패배
합이 5가 되어야 함
1개 선택 : 없음

2개 선택 :
[3,2,0,0,0,0,0,0,0,0,0]

3개 선택 :
[3,0,0,0,1,1,0,0,0,0,0]
[3,0,0,0,0,1,1,0,0,0,0]
[3,0,0,0,0,0,1,1,0,0,0]
[3,0,0,0,0,0,0,1,1,0,0]
[3,0,0,0,0,0,0,0,1,1,0]
[3,0,0,0,0,0,0,0,0,1,1]

4개 선택 :
[0,2,0,0,1,1,1,0,0,0,0]
[0,2,0,0,0,1,1,1,0,0,0]
[0,2,0,0,0,0,1,1,1,0,0]
[0,2,0,0,0,0,0,1,1,1,0]
[0,2,0,0,0,0,0,0,1,1,1]
[0,0,2,0,1,1,1,0,0,0,0]
....

5개 선택 :
[0,0,0,0,1,1,1,1,1,0,0]
[0,0,0,0,0,1,1,1,1,1,0]
[0,0,0,0,0,0,1,1,1,1,1]



[3,2,0,0,0,0,0,0,0,0,0] : 19
[0,2,2,0,1,0,0,0,0,0,0] : 23 = 9 8 6
[0,0,2,2,1,0,0,0,0,0,0] : 21
[0,0,0,2,1,1,1,0,0,0,0] : 22 = 7 6 5 4
[0,0,0,0,1,1,1,1,1,0,0] : 20 = 6 5 4 3 2

방법1: 15 초과하는 점수 배열 생성
방법2: 10부터 승리 위치 지정
[3,2,0,0,0,0,0,0,0,0,0] : 19
[/,/, , , , , , , , , ]





n = 9
어피치
[0,0,1,2,0,1,1,1,1,1,1]

라이언
[1,1,2,3,1,1,0,0,0,0,0]
[1,1,2,3,1,0,1,0,0,0,0]



n = 1
[1,0,0,0,0,0,0,0,0,0,0]
...
[0,0,0,0,0,0,0,0,0,0,1]

n = 2
[1,1,0,0,0,0,0,0,0,0,0]
[1,0,1,0,0,0,0,0,0,0,0]
...



 */

