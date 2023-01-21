package codingProblem;

public class P006_countOccurrencesOfACertainCharacter {

  public static void main(String[] args) {
    // 문자 빈도수 세기

  } // main()

  // 방법 1
  public static int countOccurrencesOfACertainCharater(String str, char ch) {
    return str.length() - str.replace(String.valueOf(ch), "").length();
  }

  // 방법 2
  public static int countOccurrencesOfACertainCharater2(String str, String ch) {
    if (ch.codePointCount(0, ch.length()) > 1) {
      // 주어진 문자열에 유니코드 문자가 둘 이상이면
      return -1;
    }

    int result = str.length() - str.replace(ch, "").length();

    // ch.length()가 2를 반환하면 유니코드 대리 쌍이라는 뜻이다.
    return ch.length() == 2 ? result / 2 : result;
  }

  // 방법 3
  public static int countOccurrencesOfACertainCharater3(String str, char ch) {
    int count = 0;

    for (int i = 0; i < str.length(); i++) {
      if (str.charAt(i) == ch) {
        count++;
      }
    }

    return count;
  }

  // 방법 4
  public static int countOccurrencesOfACertainCharater4(String str, char ch) {
    return (int) str.chars()
        .filter(c -> c == ch)
        .count();
  }

}