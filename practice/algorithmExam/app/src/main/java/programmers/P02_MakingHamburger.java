package programmers;

import java.util.ArrayList;

public class P02_MakingHamburger {

  public static void main(String[] args) {

  }

  public static int solution(int[] ingredient) {
   int answer = 0;
    ArrayList<Integer> arrList = new ArrayList<>();

    // i: ingredient 배열의 인덱스
    // j: arrList 의 인덱스
    for (int i = 0, j = 0; i<ingredient.length; i++, j++) {
      arrList.add(ingredient[i]);

      if(j >= 3) {
        if(arrList.get(j-3) == 1 && arrList.get(j-2) == 2 && arrList.get(j-1) == 3 && arrList.get(j) == 1) {
          arrList.remove(j--);
          arrList.remove(j--);
          arrList.remove(j--);
          arrList.remove(j--);
          answer++;
        }
      }
    }

    return answer;
  }

}
