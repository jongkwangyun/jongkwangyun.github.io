package baekjoon;

import java.util.Scanner;

class P01 {

  public static void main(String[] args) {
    // 두 수 비교하기

    Scanner sc = new Scanner(System.in);

    String[] strArr = sc.nextLine().split(" ");
    int a = Integer.parseInt(strArr[0]);
    int b = Integer.parseInt(strArr[1]);

    String result = a > b ? ">" : (a < b ? "<" : "==");
    System.out.println(result);
  }
}