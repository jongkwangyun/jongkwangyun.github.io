from bs4 import BeautifulSoup
import csv

# HTML 파일 경로
input_file = "input_data.html"
# CSV 파일 경로
output_file = "output_data.csv"

# 함수: 가격을 숫자로 변환
def convert_price_to_number(price_string):
    price = price_string.replace("억", "").replace(",", "").replace(" ", "")
    if '.' in price:
        price_list = price.split('.')
        price = int(price_list[0]) * 10000 + int(price_list[1])
    else:
        price = int(price) * 10000
    return price

# HTML 파일을 읽어들임
with open(input_file, 'r', encoding='utf-8') as f:
    html_content = f.read()

# BeautifulSoup를 사용하여 HTML 파싱
soup = BeautifulSoup(html_content, 'html.parser')

# 행 데이터를 저장할 리스트
rows = []

# HTML에서 데이터 추출
for row in soup.find_all('tr', class_='css-14ppf9h ebmi0c710'):
    # 날짜 정보 추출
    date = row.find('td', class_='css-1nn608t ebmi0c78').get_text(strip=True)
    year, month, day = date.split('.')  # 년, 월, 일로 분리
    # 가격 정보 추출 및 숫자로 변환
    price_text = row.find('span', class_='css-158icaa ebmi0c75').get_text(strip=True)
    price = convert_price_to_number(price_text)
    # 동/층 정보 추출 및 "동"과 "층" 제거
    try:
        dong_floor = row.find('span', class_='css-1dgr7tw ebmi0c71').get_text(strip=True).split('/')
        dong = dong_floor[0].strip().replace("동", "")
        floor = dong_floor[1].strip().replace("층", "")
    except IndexError:
        # "동/층" 형식이 아닌 경우 예외처리
        dong = None
        floor = row.find('span', class_='css-1dgr7tw ebmi0c71').get_text(strip=True).replace("층", "")
    # 행 데이터를 리스트에 추가
    rows.append([year, month, day, date, price, dong, floor])

# CSV 파일에 데이터를 쓰기
with open(output_file, 'w', newline='', encoding='utf-8') as f:
    writer = csv.writer(f)
    # 헤더 추가
    writer.writerow(["년", "월", "일", "날짜", "가격", "동", "층"])
    # 행을 CSV 파일에 쓰기
    writer.writerows(rows)

print("CSV 파일이 성공적으로 생성되었습니다.")
