package codingProblem;

public class P007_parseString {

  public static void main(String[] args) {
    // 문자열을 int, long, float, double로 변환
    final String TO_INT = "453";
    final String TO_LONG = "";
    final String TO_FLOAT = "";
    final String TO_DOUBLE = "";

    // 방법 1
    //    int toInt = Integer.parseInt(TO_INT);
    //    long toLong = Long.parseLong(TO_LONG);
    //    float toFloat = Float.parseFloat(TO_FLOAT);
    //    double toDouble = Double.parseDouble(TO_DOUBLE);

    // 방법 2
    Integer toInt = Integer.valueOf(TO_INT);
    Long toLong = Long.valueOf(TO_LONG);
    Float tofloat = Float.valueOf(TO_FLOAT);
    Double toDouble = Double.valueOf(TO_DOUBLE);

  } // main()



}