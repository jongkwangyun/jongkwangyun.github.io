package practice;

import java.util.Arrays;

public class Practice {

  public static void main(String[] args) {

    int[] arr = new int[5];
    Arrays.setAll(arr, (operand) -> {
      if (operand > 0) {
        return arr[operand] = arr[operand - 1] + 1;
      }
      return 0;
    });

    System.out.println(Arrays.toString(arr));
  }
}
