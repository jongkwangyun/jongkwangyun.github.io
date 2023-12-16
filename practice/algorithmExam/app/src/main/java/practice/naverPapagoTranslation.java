package practice;

import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;

//네이버 Papago Text Translation API 예제
public class naverPapagoTranslation {
  private static String clientId = "gpic0fhuug"; //애플리케이션 클라이언트 아이디값";
  private static String clientSecret = "JEPi5MMr30nyF4uLLMOmwUk6LIpM9ne0BAgOyKcH";//애플리케이션 클라이언트 시크릿값";

  public static void main(String[] args) {

    try {
      String text = URLEncoder.encode("바깥은 새록새록한 봄의 향기가 가득하고, 사람들도 웃으며 산책을 하고 있어서 분위기가 좋았다.\\n산책을 하면서 기분이 상쾌해졌고, 맑은 하늘을 보며 스트레스도 해소할 수 있었다.", "UTF-8");
      String apiURL = "https://naveropenapi.apigw.ntruss.com/nmt/v1/translation";
      URL url = new URL(apiURL);

      HttpURLConnection con = (HttpURLConnection)url.openConnection();
      con.setRequestMethod("POST");
      con.setRequestProperty("X-NCP-APIGW-API-KEY-ID", clientId);
      con.setRequestProperty("X-NCP-APIGW-API-KEY", clientSecret);
      // post request
      String postParams = "source=ko&target=en&text=" + text;
      con.setDoOutput(true);
      DataOutputStream wr = new DataOutputStream(con.getOutputStream());
      wr.writeBytes(postParams);
      wr.flush();
      wr.close();
      int responseCode = con.getResponseCode();
      BufferedReader br;
      if(responseCode==200) { // 정상 호출
        br = new BufferedReader(new InputStreamReader(con.getInputStream()));
      } else {  // 오류 발생
        br = new BufferedReader(new InputStreamReader(con.getErrorStream()));
      }
      String inputLine;
      StringBuffer response = new StringBuffer();
      while ((inputLine = br.readLine()) != null) {
        response.append(inputLine);
      }
      br.close();
      System.out.println(response.toString());
      //{"message":{"result":{"srcLangType":"ko","tarLangType":"en","translatedText":"The outside was full of the fresh scent of spring, and the atmosphere was good because people were taking a walk with a smile.\\nI felt refreshed while taking a walk, and I was able to relieve my stress by looking at the clear sky.","engineType":null,"pivot":null,"dict":null,"tarDict":null},"@type":"response","@service":"naverservice.nmt.proxy","@version":"1.0.0"}}
      //The outside was full of the fresh scent of spring, and the atmosphere was good because people were taking a walk with a smile.\\nI felt refreshed while taking a walk, and I was able to relieve my stress by looking at the clear sky.

    } catch (Exception e) {
      System.out.println(e);
    }
  }
}
