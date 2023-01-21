package programmers;

import java.util.Arrays;
import java.util.LinkedHashSet;

public class P03_GetReportResults3 {

  public static void main(String[] args) {
    String[] id_list = {"muzi", "frodo", "apeach", "neo"};
    String[] report = {"muzi frodo","apeach frodo","frodo neo","muzi neo","apeach muzi"};
    int k = 2;

    //    String[] id_list = {"con", "ryan"};
    //    String[] report = {"ryan con", "ryan con", "ryan con", "ryan con"};
    //    int k = 3;

    int[] answer = solution(id_list, report, k);
    String answerStr = Arrays.toString(answer);

    System.out.println(answerStr);

  }

  // 배열 대신 String 사용
  public static int[] solution(String[] id_list, String[] report, int k) {

    int ID_LIST_LENGTH = id_list.length;

    int[] answer = new int[ID_LIST_LENGTH];
    int[] reportedCount = new int[ID_LIST_LENGTH];  // 신고 당한 횟수 배열
    StringBuilder[] reporterList = new StringBuilder[ID_LIST_LENGTH];  // 신고자 목록 배열

    // id 순서에 맞게 중복 제거한 신고자 배열 생성
    LinkedHashSet<String> reportLinkedHashSet = new LinkedHashSet<>(Arrays.asList(report));
    // {"ryan con", "ryan con", "ryan con", "ryan con"} -> {"ryan con"}

    // 불량자 키를 이용해 idx 찾아서 신고자를 넣기
    for (String e : reportLinkedHashSet) {
      int badIdx = Arrays.asList(id_list).indexOf(e.split(" ")[1]);  // 불량자 인덱스

      // reporterArr에 추가, reportedCount + 1
      if (reportedCount[badIdx] == 0) {
        reporterList[badIdx] = new StringBuilder(e.split(" ")[0]);
      } else {
        reporterList[badIdx] = reporterList[badIdx].append(" ").append(e.split(" ")[0]);
      }
      reportedCount[badIdx]++;
    }
    // 결과값: reporterList = ["apeach", "muzi apeach", "", "muzi frodo"];

    // reportedCount >= k 인 경우 reporterList의 모든 신고자 answer +1
    for (int i = 0; i < ID_LIST_LENGTH; i++) {
      if (reportedCount[i] >= k) {

        // 신고당한 횟수 = 1 일때
        if (reportedCount[i] == 1) {
          answer[Arrays.asList(id_list).indexOf(reporterList[i].toString())]++; // answer[신고자 인덱스]++

        } else { // 신고당한 횟수 >= 2 일때
          for(String element : reporterList[i].toString().split(" ")) {
            answer[Arrays.asList(id_list).indexOf(element)]++;
          }
        }
      }
    }

    return answer;

  }  // solution()

}
