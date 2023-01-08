package programmers;

import java.util.Arrays;
import java.util.HashSet;
import java.util.Iterator;

public class P03_GetReportResults {

  public static void main(String[] args) {
     String[] id_list = {"muzi", "frodo", "apeach", "neo"};
     String[] report = {"muzi frodo","apeach frodo","frodo neo","muzi neo","apeach muzi"};
     int k = 2;
     
     int[] answer = solution(id_list, report, 2);
     String answerStr = answer.toString();
    
    System.out.println(answerStr);
    
  }

  public static int[] solution(String[] id_list, String[] report, int k) {
    int[] answer = new int[id_list.length];
    
    Arrays.fill(answer, 0);
    
    // id_list 순서에 맞게 신고한 자 목록 배열 생성 [HashSet, HashSet, ...]
    HashSet<String>[] reporter = null;
    
    for(int i = 0; i<id_list.length; i++) {
      reporter[i] = new HashSet<String>();
    }
    
    // 키를 찾아서 인덱스 가져와서 LinkedHashSet에 원소에 add하기
    // report, ["muzi frodo","apeach frodo","frodo neo","muzi neo","apeach muzi"]
    for(String e: report) {
      int reporterIdx = Arrays.asList(id_list).indexOf(e.split(" ")[1]);
      reporter[reporterIdx].add(e.split(" ")[0]);
    }
    
    // reporter = [{apeach}, {muzi, apeach}, {}, {muzi, frodo} ];
    
    // reporter 순회하여 element(HashSet형) 크기 >= k 면 element 각 항목의 인덱스 찾아서 answer에 값의 길이 주기
    for(HashSet<String> e: reporter) {
      if (e.size() >= k) {
        Iterator iter = e.iterator();
        while (iter.hasNext()) {
          int reporterIdx = Arrays.asList(id_list).indexOf(iter.next());
          answer[reporterIdx] += 1;
        }
      }
    }
    
    return answer;
    
  }

}
