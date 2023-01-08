package codingProblem;

import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

public class P001_countingChar {

  public static void main(String[] args) {
    // 문자 개수 세기

  } // main()

  public Map<Character, Integer> countDuplicateCharacters(String str) {
    Map<Character, Integer> result = new HashMap<>();

    // for(char ch: str.toCharArray()) 가능
    for (int i = 0; i<str.length(); i++) {
      char ch = str.charAt(i);

      result.compute(ch, (k, v) -> (v == null) ? 1 : ++v);
    }

    return result;
  }

  public Map<Character, Long> countDuplicateCharacters2(String str) {
    Map<Character, Long> result = str.chars()
        .mapToObj(c -> (char) c)
        .collect(Collectors.groupingBy(c -> c, Collectors.counting()));

    return result;
  }

  public static Map<String, Integer> countDuplicateCharacters3(String str) {
    Map<String, Integer> result = new HashMap<>();

    for (int i = 0; i<str.length(); i++) {
      int cp = str.codePointAt(i);
      String ch = String.valueOf(Character.toChars(cp));
      if(Character.charCount(cp)==2) {
        i++;
      }

      result.compute(ch,  (k, v) -> (v == null) ? 1 : ++v);
    }

    return result;
  }

}
