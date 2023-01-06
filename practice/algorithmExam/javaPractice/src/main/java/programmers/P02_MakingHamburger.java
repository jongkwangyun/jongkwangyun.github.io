package programmers;

import java.util.ArrayList;

public class P02_MakingHamburger {

  public static void main(String[] args) {
    // 햄버거 만들기

    int[] arr = {2, 1, 1, 2, 3, 1, 2, 3, 1/**/};
    // arrList = 2 1 2 3 1
    // i=8, j=4
    int answer = solution(arr);

    ArrayList<Integer> arrList = new ArrayList<>();

    for (int item : arr) {
      arrList.add(item);
    }

    System.out.println(answer);

  }

  public static int solution(int[] ingredient) {
    int answer = 0;

    ArrayList<Integer> arrList = new ArrayList<>();

    // i: ingredient 배열의 인덱스
    // j: arrList 배열의 인덱스
    for (int i = 0, j = 0; i<ingredient.length; i++, j++) {
      arrList.add(ingredient[i]);

      if(arrList.size() >= 4) {
        if(arrList.get(i-3) == 1 && arrList.get(i-2) == 2 && arrList.get(i-1) == 3 && arrList.get(i) == 1) {
          System.out.println("size: " + arrList.get(j));
          System.out.println(arrList.get(j));
          arrList.remove(j--);
          System.out.println("size: " + arrList.get(j));
          System.out.println(arrList.get(j));
          arrList.remove(j--);
          System.out.println("size: " + arrList.get(j));
          System.out.println(arrList.get(j));
          arrList.remove(j--);
          System.out.println("size: " + arrList.get(j));
          System.out.println(arrList.get(j));
          arrList.remove(j--);
          System.out.println("size: " + arrList.get(j));
          answer++;
        }
      }
    }

    return answer;
  }

}
