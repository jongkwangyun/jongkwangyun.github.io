package practice;

public class Practice {

  static int total = 0;

  public static void main(String[] args) {


  }

  public static int swi(String inText, int num) {
    int a = switch (inText) {
      case "plus" -> 1;
      default -> 0;

    };

    return a;
  }

}
