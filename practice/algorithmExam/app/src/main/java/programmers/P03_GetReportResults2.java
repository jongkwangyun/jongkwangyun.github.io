package programmers;

import java.util.Arrays;

public class P03_GetReportResults2 {

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

  // String 사용하자
  public static int[] solution(String[] id_list, String[] report, int k) {
    int ID_LIST_LENGTH = id_list.length;
    
    int[] answer = new int[ID_LIST_LENGTH];
    int[] reporterCount = new int[ID_LIST_LENGTH];
    
    // id_list 순서에 맞게 신고한 자 목록 배열 생성 [[신고자 목록], [신고자 목록], ...]
    String[] reporterListArr = new String[ID_LIST_LENGTH];
    Arrays.fill(reporterListArr, "");
    
    // 불량자 키를 이용해 신고자 idx 찾아서 reporter의 문자열 중 같은게 있는지 검사해서 없으면 추가   
    for(String e: report) {
      String reporterName = e.split(" ")[0];
      int badIdx = Arrays.asList(id_list).indexOf(e.split(" ")[1]);
      
      // reporterArr에 신고자 이름이 없으면 추가, count++
      if (!reporterListArr[badIdx].contains(reporterName)) {
        reporterListArr[badIdx] = new StringBuilder(reporterListArr[badIdx]).append(" ").append(reporterName).toString();
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
          String[] reporterArr = reporterListArr[i].substring(1).split(" ");
          
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

/*
테스트 1 〉  실패 (런타임 에러)
테스트 2 〉 통과 (0.31ms, 82.2MB)
테스트 3 〉 실패 (870.30ms, 350MB)
테스트 4 〉 실패 (0.85ms, 82.3MB)
테스트 5 〉 통과 (0.61ms, 76.4MB)
테스트 6 〉 실패 (9.85ms, 84.6MB)
테스트 7 〉 실패 (15.23ms, 91.1MB)
테스트 8 〉 실패 (26.31ms, 110MB)
테스트 9 〉 실패 (266.55ms, 171MB)
테스트 10 〉    실패 (197.13ms, 162MB)
테스트 11 〉    실패 (737.80ms, 364MB)
테스트 12 〉    실패 (런타임 에러)
테스트 13 〉    통과 (3.58ms, 82.5MB)
테스트 14 〉    실패 (391.72ms, 158MB)
테스트 15 〉    실패 (495.88ms, 184MB)
테스트 16 〉    실패 (5.00ms, 85.2MB)
테스트 17 〉    실패 (2.44ms, 80.6MB)
테스트 18 〉    실패 (5.53ms, 75.1MB)
테스트 19 〉    실패 (6.50ms, 72.7MB)
테스트 20 〉    실패 (263.08ms, 135MB)
테스트 21 〉    실패 (573.39ms, 198MB)
테스트 22 〉    실패 (런타임 에러)
테스트 23 〉    실패 (런타임 에러)
테스트 24 〉    통과 (0.21ms, 76.2MB)
*/
