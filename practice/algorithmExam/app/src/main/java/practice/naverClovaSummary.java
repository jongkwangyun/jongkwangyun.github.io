package practice;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.URL;

public class naverClovaSummary {
  private static String clientID = "jwr193c3gy";
  private static String clientSecret = "GByFPLxpEZowCFWz0e9JLQYN4vqbbAEoKLarfe4F";
  private static String language = "ko";
  private static String model = "general";
  private static String tone = "0";
  private static String summaryCount = "2";
  private static String url = "https://naveropenapi.apigw.ntruss.com/text-summary/v1/summarize";
  private static String content = "오늘은 아침부터 날씨가 매우 좋았다. 태양은 밝게 비추고, 바람은 부드럽게 불어와 시원한 느낌을 주었다. 그래서 나는 산책을 하기로 결심했다. 바깥은 새록새록한 봄의 향기가 가득하고, 사람들도 웃으며 산책을 하고 있어서 분위기가 좋았다. 산책을 하면서 기분이 상쾌해졌고, 맑은 하늘을 보며 스트레스도 해소할 수 있었다. 이렇게 좋은 날씨와 함께 건강한 습관을 유지하는 것은 참으로 좋은 일이다.";

  public static void main(String[] args) {
    try {
      URL apiURL = new URL(url);
      HttpURLConnection con = (HttpURLConnection) apiURL.openConnection();
      con.setRequestMethod("POST");

      con.setRequestProperty("X-NCP-APIGW-API-KEY-ID", clientID);
      con.setRequestProperty("X-NCP-APIGW-API-KEY", clientSecret);
      con.setRequestProperty("Content-Type", "application/json");

      con.setDoOutput(true);
      OutputStreamWriter wr = new OutputStreamWriter(con.getOutputStream());
      String jsonRequest = "{\"document\": "
          + "{\"content\": \"" + content + "\"}, \"option\": {\"language\": \"" + language + "\", \"model\": \"" + model + "\", \"tone\": \"" + tone + "\", \"summaryCount\": \"" + summaryCount + "\"}}";
      wr.write(jsonRequest);
      wr.flush();

      int responseCode = con.getResponseCode();
      BufferedReader br;
      if (responseCode == 200) { // Success
        br = new BufferedReader(new InputStreamReader(con.getInputStream()));
      } else { // Error
        br = new BufferedReader(new InputStreamReader(con.getErrorStream()));
      }

      String inputLine;
      StringBuffer response = new StringBuffer();
      while ((inputLine = br.readLine()) != null) {
        response.append(inputLine);
      }
      br.close();
      System.out.println(response.toString());
      //{"summary":"바깥은 새록새록한 봄의 향기가 가득하고, 사람들도 웃으며 산책을 하고 있어서 분위기가 좋았다.\n산책을 하면서 기분이 상쾌해졌고, 맑은 하늘을 보며 스트레스도 해소할 수 있었다."}
      //바깥은 새록새록한 봄의 향기가 가득하고, 사람들도 웃으며 산책을 하고 있어서 분위기가 좋았다.\n산책을 하면서 기분이 상쾌해졌고, 맑은 하늘을 보며 스트레스도 해소할 수 있었다.
    } catch (Exception e) {
      System.out.println(e);
    }
  }
}
