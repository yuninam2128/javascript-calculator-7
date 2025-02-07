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

    return numArray;
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