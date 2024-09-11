const data = {
  code1: `import 'package:flutter_test/flutter_test.dart';
import 'package:ibmi/utils/calculator.dart';

void main() {
  test(
    'Given height and weight When CalculateBMI button pressed Then correct BMI return',
    () {
      //Arrange
      const double height = 70, weight = 160;
      //Act
      double bmi = CalculateBMI(height, weight);
      //Assert
      expect(bmi, 20);
    },
  );
}
`,
  code2: `import 'dart:math';

double CalculateBMI(double height, double weight) {
  return 703 * (weight / pow(height, 2));
}
`,
};

function addCode(id) {
  document.getElementById(id).innerHTML = data[id];
}

for (k in data) {
  addCode(k);
}
