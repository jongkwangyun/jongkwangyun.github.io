package practice;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.io.PrintWriter;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLConnection;

// Object Detection API 예제
public class naverObjectDetection {

  public static void main(String[] args) {

    StringBuffer reqStr = new StringBuffer();
    String clientId = "w96u0zvsst";//애플리케이션 클라이언트 아이디값";
    String clientSecret = "TH4k8f7dIqk4SHz0cWF1LCUFRHawHdlVplUgKUbn";//애플리케이션 클라이언트 시크릿값";
    String apiURL = "https://naveropenapi.apigw.ntruss.com/vision-obj/v1/detect"; // 객체 인식

    try {
      String paramName = "image"; // 파라미터명은 image로 지정
      String imgFile = "C:\\Users\\bitcamp\\git\\bitcamp-finalproject\\total\\back-end\\src\\main\\pythonapp\\results\\b95e734d-a60f-4510-af25-b2d19f9f3393.png";
      File uploadFile = new File(imgFile);
      URL url = new URL(apiURL);
      HttpURLConnection con = (HttpURLConnection)url.openConnection();
      con.setUseCaches(false);
      con.setDoOutput(true);
      con.setDoInput(true);
      // multipart request
      String boundary = "---" + System.currentTimeMillis() + "---";
      con.setRequestProperty("Content-Type", "multipart/form-data; boundary=" + boundary);
      con.setRequestProperty("X-NCP-APIGW-API-KEY-ID", clientId);
      con.setRequestProperty("X-NCP-APIGW-API-KEY", clientSecret);
      OutputStream outputStream = con.getOutputStream();
      PrintWriter writer = new PrintWriter(new OutputStreamWriter(outputStream, "UTF-8"), true);
      String LINE_FEED = "\r\n";
      // file 추가
      String fileName = uploadFile.getName();
      writer.append("--" + boundary).append(LINE_FEED);
      writer.append("Content-Disposition: form-data; name=\"" + paramName + "\"; filename=\"" + fileName + "\"").append(LINE_FEED);
      writer.append("Content-Type: "  + URLConnection.guessContentTypeFromName(fileName)).append(LINE_FEED);
      writer.append(LINE_FEED);
      writer.flush();
      FileInputStream inputStream = new FileInputStream(uploadFile);
      byte[] buffer = new byte[4096];
      int bytesRead = -1;
      while ((bytesRead = inputStream.read(buffer)) != -1) {
        outputStream.write(buffer, 0, bytesRead);
      }
      outputStream.flush();
      inputStream.close();
      writer.append(LINE_FEED).flush();
      writer.append("--" + boundary + "--").append(LINE_FEED);
      writer.close();
      BufferedReader br = null;
      int responseCode = con.getResponseCode();
      if(responseCode==200) { // 정상 호출
        br = new BufferedReader(new InputStreamReader(con.getInputStream()));
      } else {  // 오류 발생
        System.out.println("error!!!!!!! responseCode= " + responseCode);
        br = new BufferedReader(new InputStreamReader(con.getInputStream()));
      }
      String inputLine;
      if(br != null) {
        StringBuffer response = new StringBuffer();
        while ((inputLine = br.readLine()) != null) {
          response.append(inputLine);
        }
        br.close();
        System.out.println(response.toString()); //{"predictions": [{"num_detections": 14, "detection_classes": [67.0, 44.0, 47.0, 67.0, 67.0, 67.0, 67.0, 47.0, 50.0, 48.0, 48.0, 51.0, 67.0, 75.0], "detection_names": ["dining table", "bottle", "cup", "dining table", "dining table", "dining table", "dining table", "cup", "spoon", "fork", "fork", "bowl", "dining table", "remote"], "detection_scores": [0.971952, 0.966111, 0.910652, 0.87296, 0.818478, 0.773194, 0.751534, 0.583253, 0.401272, 0.381128, 0.366881, 0.365596, 0.328182, 0.3248], "detection_boxes": [[0.0327222, 0.0, 1.0, 1.0], [0.0, 0.596444, 0.468236, 0.82184], [0.0545722, 0.413312, 0.299955, 0.578691], [0.0411461, 0.0138441, 0.664926, 1.0], [0.357724, 0.0, 1.0, 0.84759], [0.0343315, 0.00496859, 0.952846, 0.675056], [0.11162, 0.223333, 0.972845, 0.946219], [0.537832, 0.306142, 0.867129, 0.698735], [0.733977, 0.262334, 0.897995, 0.564753], [0.73401, 0.260392, 0.903823, 0.571652], [0.784486, 0.291675, 0.906092, 0.556392], [0.539265, 0.307882, 0.872676, 0.689565], [0.562527, 0.0842213, 0.993928, 0.986315], [0.637892, 0.0, 0.935032, 0.260052]]}]}
      } else {
        System.out.println("error !!!");
      }
    } catch (Exception e) {
      System.out.println(e);
    }
  }
}
