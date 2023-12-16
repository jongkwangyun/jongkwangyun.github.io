package practice;

<<<<<<< HEAD
import java.util.UUID;

=======
>>>>>>> d638dc5e6e4025f04b65652608920bb37f988a8d
public class Practice {
  public static void main(String[] args) {

<<<<<<< HEAD
//    System.out.println(UUID.randomUUID().toString());
    System.out.println(1);
=======
    Boolean flag = isValidNickname("abc.-_가");
    System.out.println(flag);

>>>>>>> d638dc5e6e4025f04b65652608920bb37f988a8d
  }
  public static boolean isValidNickname(String str) {
    boolean hasInvalidChar = str.matches(".*[^a-zA-Z0-9가-힣-_.].*");
    return !hasInvalidChar;
  }
}