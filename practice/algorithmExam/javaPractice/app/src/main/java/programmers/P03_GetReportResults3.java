package programmers;

import java.util.Arrays;

public class P03_GetReportResults3 {

  public static void main(String[] args) {
    //     String[] id_list = {"muzi", "frodo", "apeach", "neo"};
    //     String[] report = {"muzi frodo","apeach frodo","frodo neo","muzi neo","apeach muzi"};
    //     int k = 2;

    String[] id_list = {"con", "ryan"};
    String[] report = {"ryan con", "ryan con", "ryan con", "ryan con"};
    int k = 3;

    int[] answer = solution(id_list, report, 2);
    String answerStr = Arrays.toString(answer);

    System.out.println(answerStr);

  }

  // 배열 대신 String 사용
  public static int[] solution(String[] id_list, String[] report, int k) {
    int ID_LIST_LENGTH = id_list.length;

    int[] answer = new int[ID_LIST_LENGTH];
    int[] reporterCount = new int[ID_LIST_LENGTH];

    // id_list 순서에 맞게 신고한 자 목록 배열 생성 [[신고자 목록], [신고자 목록], ...]
    String[] reporterListArr = new String[ID_LIST_LENGTH];
    Arrays.fill(reporterListArr, "");

    // 불량자 키를 이용해 신고자 idx 찾아서 reporter의 문자열 중 같은게 있는지 검사해서 없으면 추가
    for(String e: report) {
      int badIdx = Arrays.asList(id_list).indexOf(e.split(" ")[1]);

      // reporterArr에 신고자 이름이 없으면 추가, count++
      if (!reporterListArr[badIdx].contains(e.split(" ")[0])) {
        reporterListArr[badIdx] = new StringBuilder(reporterListArr[badIdx]).append(" ").append(e.split(" ")[0]).toString();
        reporterCount[badIdx]++;
      }
    }
    // 결과값: reporterArr = ["apeach", "muzi apeach", "", "muzi frodo"];

    // reporterCount가 k보다 클 경우 각 name의 idx 찾아서 값 1 증가
    for(int i=0; i<reporterCount.length; i++) {

      if (reporterCount[i] >= k && reporterCount[i] > 0) {

        if (reporterCount[i] == 1) {
          String reporter = reporterListArr[i];
          int reporterIdx = Arrays.asList(id_list).indexOf(reporter);
          answer[reporterIdx]++;

        } else {
          String[] reporterArr = reporterListArr[i].trim().split(" ");

          for(int j=0; j<reporterArr.length; j++) {
            int reporterIdx = Arrays.asList(id_list).indexOf(reporterArr[j]);
            answer[reporterIdx]++;
          }
        }
      }
    }

    return answer;

  }  // solution()

}
