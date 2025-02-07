import { Console } from "@woowacourse/mission-utils";

class StringCalculator {
  static add(numbers) {
    const delimiters = [',', ':'];  // 기본 구분자 설정

    let numArray = [numbers];   
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
}

class App {
  async run() {
    const input = await Console.readLineAsync('입력: ');
    const result = StringCalculator.add(input);
    Console.print(`결과 : ${result}`);
  }
}

export default App;