package com.example.restservice;

import java.util.HashMap;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import kr.or.kobis.kobisopenapi.consumer.rest.KobisOpenAPIRestService;

@SpringBootApplication
@RestController
public class RestServiceApplication {

    // 영화진흥원 Open API 서비스 키
    private static final String API_KEY = "f5eef3421c602c6cb7ea224104795888";

    public static void main(String[] args) {
        SpringApplication.run(RestServiceApplication.class, args);
    }

    // http://localhost:8080/search-movie?20230116
    @GetMapping("/search-movie")
    public String searchMovie(
            @RequestParam(value = "targetDt", defaultValue = "20221231") String targetDt) {
        try {
            // 영화진흥원 Open API 서비스 객체 생성
            KobisOpenAPIRestService service = new KobisOpenAPIRestService(API_KEY);

            // Map 형식으로 파라미터 설정
            HashMap<String, String> targetDate = new HashMap<String, String>();
            targetDate.put("targetDt", targetDt);

            // 영화진흥원 Open API 서비스 호출하기
            String dailyResponse = service.getDailyBoxOffice(true, targetDate);

            // 결과 확인하기
            return dailyResponse;
        } catch (Exception e) {
            // 에러 발생시 에러 내용 출력
            e.printStackTrace();
            return null;
        }
    }
}
