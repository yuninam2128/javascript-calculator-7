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

    numArray = numArray
      .filter(num => num.trim() !== "")  // 구분자와 숫자 사이에 공백이 있는 경우 처리
      .map(num => {
        const numValue = Number(num);
        if (isNaN(numValue) || numValue < 0) {
          throw new Error ("[ERROR] IllegalArgumentException"); //양수만 입력 가능 
        }
        return numValue;
      });

    return numArray.reduce((sum, num) => sum + num, 0);  // 합산하여 반환, 초기값 0이므로 빈 문자열이 들어가면 0 반환 
  }

  static extractCustomDelimiter(numbers) {
    if (numbers.startsWith('//')) {                     // startsWith : 문자열이 //로 시작하는지 확인 
      const linebreakIndex = numbers.indexOf('\\n');    // indexOf : 찾은 문자 위치 반환, 찾지 못하면 -1 반환 
      if (linebreakIndex !== -1) {                    
        const customDelimiter = numbers.slice(2, linebreakIndex); // 구분자가 두 번 연속으로 들어있는 경우 처리
        const input = numbers.slice(linebreakIndex + 2); // 커스텀 지정자 뒤부터 자르기
        return { customDelimiter, input };
      }
    }
    return {customDelimiter: null, input: numbers };  // 예외처리 : 커스텀이 없는 경우
  }
}

class App {
  async run() {
    try {
      const input = await Console.readLineAsync('입력: ');
      const result = StringCalculator.add(input);
      Console.print(`결과 : ${result}`);
    } catch(error) {
      Console.print(error.message);
      return Promise.reject(error);
    }
  }
}

export default App;