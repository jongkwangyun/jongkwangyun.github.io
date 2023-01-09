package programmers;

import java.util.Arrays;

public class P04_InspectPersonality {

  public static void main(String[] args) {
    String[] survey = {"AN", "CF", "MJ", "RT", "NA"};
    int[] choices = {5, 3, 2, 7, 5};

    //    String[] survey = {"TR", "RT", "TR"};
    //    int[] choices = {7, 1, 3};

    String answer = solution(survey, choices);

    System.out.println(answer);

  }

  public static String solution(String[] survey, int[] choices) {
    String answer = "";

    char[] typeArr = {'R', 'T', 'C', 'F', 'J', 'M', 'A', 'N'};

    // AAA|NNN : 321|123
    int[] typesScore = {0, 0, 0, 0, 0, 0, 0, 0};

    //
    int[] point = {3, 2, 1, 0, 1, 2, 3};

    // choices의 점수가 1~3이면 앞에 글자에 점수, 5~6이면 뒤에 글자에 점수, 4이면 아무것도 안함
    for(int i = 0; i<choices.length; i++) {
      if(choices[i] < 4) {

        // typeArr에서 앞 글자 index 얻어서 거기에 점수 넣기
        typesScore[Arrays.asList(typeArr).indexOf(survey[i].charAt(0))] += point[choices[i]];
      } else if (choices[i] > 4) {

        // typeArr에서 뒤 글자 index 얻어서 거기에 점수 넣기
        typesScore[Arrays.asList(typeArr).indexOf(survey[i].charAt(1))] += point[choices[i]];
      }
    }

    char[] answerArr = new char[4];
    answerArr[0] = typesScore[0] >= typesScore[1] ? 'R' : 'T';
    answerArr[1] = typesScore[2] >= typesScore[3] ? 'C' : 'F';
    answerArr[2] = typesScore[4] >= typesScore[5] ? 'J' : 'M';
    answerArr[3] = typesScore[6] >= typesScore[7] ? 'A' : 'N';

    return answer;
  }

}
