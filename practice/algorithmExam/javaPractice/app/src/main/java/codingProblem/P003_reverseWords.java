package codingProblem;

import java.util.regex.Pattern;
import java.util.stream.Collectors;

public class P003_reverseWords {

  public static void main(String[] args) {
    // 글자와 단어 뒤집기
	  
  } // main()
  
  private static final String WHITESPACE = " ";
  
  public static String reverseWords(String str) {
	  String[] words = str.split(WHITESPACE);
	  StringBuilder reversedString = new StringBuilder();
	  
	  for (String word: words) {
		  StringBuilder reverseWord = new StringBuilder();
		  
		  for (int i = word.length() - 1; i >= 0; i--) {
			  reverseWord.append(word.charAt(i));
		  }
		  
		  reversedString.append(reverseWord).append(WHITESPACE);
		  
	  }
	  
	  return reversedString.toString();
  }
  
  private static final Pattern PATTERN = Pattern.compile(" +");
  
  public static String reverseWords2(String str) {
	  return PATTERN.splitAsStream(str)
			  .map(w -> new StringBuilder(w).reverse())
			  .collect(Collectors.joining(" "));
  }
  
  public String reverse(String str) {
	  return new StringBuilder(str).reverse().toString();
  }
  

}
