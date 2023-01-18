package programmers;

import java.util.Arrays;

public class P05_ArcheryContest2 {

  static int n = 5;
  static int[] RyanShot = new int[11];
  static int RyanScore;
  static int apeachScore;

  public static void main(String[] args) {
    int[] info = {2,1,1,1,0,0,0,0,0,0,0};

    setN(RyanShot, 5, 5, info);

    //    int[] answer = solution(n, info);

    //    System.out.println(answer);
  }


  public static void setN(int[] inputRyanShot, int maxArrowAtATarget, int inputN, int[] info) {
    int[] nowRyanShot = Arrays.copyOf(inputRyanShot, 11);
    maxArrowAtATarget = maxArrowAtATarget > inputN ? inputN : maxArrowAtATarget;

    for (int restN = inputN; maxArrowAtATarget > 0; maxArrowAtATarget--) {
      // maxArrowAtATarget = 1, inputN = 1

      for (int scoreIdx = 10; scoreIdx >= 0; scoreIdx--, nowRyanShot = Arrays.copyOf(inputRyanShot, 11), restN = inputN) {
        // [0,0,0,0,0,0,0,0,0,0,scoreIdx]   // scoreIdx = 10, restN = 5

        if(nowRyanShot[scoreIdx] == 0) {
          // 자리 비었는지?

          if(restN >= maxArrowAtATarget) {  // 5 >= 4
            nowRyanShot[scoreIdx] = maxArrowAtATarget;  // {1,0,0,0,0,0,0,0,0,0,4}
            restN -= maxArrowAtATarget;  // restN = 1

            if (restN == 0) {
              // 남은 화살이 없으면 다음 인덱스로

              // 값 비교
              System.out.println(Arrays.toString(nowRyanShot));
              continue;

            } else {
              // 남은 화살이 있으면 재귀 함수 실행
              setN(nowRyanShot, maxArrowAtATarget, restN, info);  //  {1,0,0,0,0,0,0,0,0,0,4} 4 1
            }

          } else {
            nowRyanShot[scoreIdx] = restN;  // restN = 1  {1,0,0,0,0,0,0,0,0,0,4}

            // 값 비교
            System.out.println(Arrays.toString(nowRyanShot));

            continue;
          }

        } else {
          continue;
        }
      }
    }
  }


  public static int[] solution(int n, int[] info) {
    int[] answer = {};


    setN(RyanShot, n, n, info);


    return answer;
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

