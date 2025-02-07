import { Console } from "@woowacourse/mission-utils";

class StringCalculator {
  static add(numbers) {
    const { customDelimiter, input } = this.extractCustomDelimiter(numbers);
    const delimiters = [',', ':', customDelimiter].filter(Boolean); // customDelimiter = null이면 delimiters에 포함되지 않음 

    let numArray = [input];   
    for (const delimiter of delimiters) {
      let tempArray = [];
      for (const number of numArray) {
        tempArray = tempArray.concat(number.split(delimiter));  // 구분자로 분리
      }
      numArray = tempArray;
    }
    numArray = numArray.map(num => {
      const numValue = Number(num);  // 숫자로 변환
      return numValue;
    });

    return numArray.reduce((sum, num) => sum + num, 0);  // 합산하여 반환
  }

  static extractCustomDelimiter(numbers) {
    if (numbers.startsWith('//')) {                     // startsWith : 문자열이 //로 시작하는지 확인 
      const linebreakIndex = numbers.indexOf('\\n');    // indexOf : 찾은 문자 위치 반환, 찾지 못하면 -1 반환 
      if (linebreakIndex !== -1) {                    
        const customDelimiter = numbers.slice(2, linebreakIndex);
        const input = numbers.slice(linebreakIndex + 2); // 커스텀 지정자 뒤부터 자르기
        return { customDelimiter, input };
      }
    }
    return {customDelimiter: null, input: numbers };  // 예외처리 : 커스텀이 없는 경우
  }
}

class App {
  async run() {
    const input = await Console.readLineAsync('입력: ');
    const result = StringCalculator.add(input);
    Console.print(`결과 : ${result}`);
  }
}

export default App;