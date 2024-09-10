const data = {
  code1: `import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return CupertinoApp(
      title: 'IBMI',
      home: CupertinoPageScaffold(
        child: Container(
          color: Colors.blue,
        ),
      ),
    );
  }
}
`,
  code2: `import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:ibmi/pages/main_page.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return CupertinoApp(
      title: 'IBMI',
      initialRoute: '/',
      routes: {
        '/': (BuildContext context) => MainPage(),
      },
    );
  }
}
`,
  code3: `import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

class MainPage extends StatefulWidget {
  @override
  State<StatefulWidget> createState() {
    return _MainPageState();
  }
}

class _MainPageState extends State<MainPage> {
  @override
  Widget build(BuildContext context) {
    return CupertinoPageScaffold(
      navigationBar: CupertinoNavigationBar(
        middle: Text('IBMI'),
      ),
      child: Container(
        color: Colors.blue,
      ),
    );
  }
}
`,
  code4: `import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:ibmi/pages/bmi_page.dart';
import 'package:ibmi/pages/history_page.dart';

class MainPage extends StatefulWidget {
  @override
  State<StatefulWidget> createState() {
    return _MainPageState();
  }
}

class _MainPageState extends State<MainPage> {
  final List<Widget> tabs = [
    BMIPage(),
    HistoryPage(),
  ];

  @override
  Widget build(BuildContext context) {
    return CupertinoPageScaffold(
      navigationBar: const CupertinoNavigationBar(
        middle: Text('IBMI'),
      ),
      child: CupertinoTabScaffold(
        tabBuilder: (context, index) {
          return CupertinoTabView(
            builder: (context) {
              return tabs[index];
            },
          );
        },
        tabBar: CupertinoTabBar(
          items: const [
            BottomNavigationBarItem(
              icon: Icon(CupertinoIcons.home),
              label: "BMI",
            ),
            BottomNavigationBarItem(
              icon: Icon(CupertinoIcons.person),
              label: "Hostory",
            ),
          ],
        ),
      ),
    );
  }
}
`,
  code5: `import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

class BMIPage extends StatefulWidget {
  const BMIPage({super.key});

  @override
  State<StatefulWidget> createState() {
    return _BMIPageState();
  }
}

class _BMIPageState extends State<BMIPage> {
  @override
  Widget build(BuildContext context) {
    return CupertinoPageScaffold(
      child: Container(
        color: Colors.blue,
      ),
    );
  }
}
`,
  code6: `import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

class HistoryPage extends StatelessWidget {
  const HistoryPage({super.key});

  @override
  Widget build(BuildContext context) {
    return CupertinoPageScaffold(
      child: Container(
        color: Colors.green,
      ),
    );
  }
}
`,
  code7: `import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:ibmi/widgets/info_card.dart';

class BMIPage extends StatefulWidget {
  const BMIPage({super.key});

  @override
  State<StatefulWidget> createState() {
    return _BMIPageState();
  }
}

class _BMIPageState extends State<BMIPage> {
  double? _height;
  double? _width;

  @override
  Widget build(BuildContext context) {
    _height = MediaQuery.of(context).size.height;
    _width = MediaQuery.of(context).size.width;
    return CupertinoPageScaffold(
      child: Container(
        child: Center(
          child: InfoCard(
            width: _width! * 0.45,
            height: _height! * 0.2,
            child: Container(),
          ),
        ),
      ),
    );
  }
}
`,
  code8: `import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

class InfoCard extends StatelessWidget {
  final Widget child;
  final double width, height;

  const InfoCard({
    super.key,
    required this.height,
    required this.width,
    required this.child,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(10),
        boxShadow: const [
          BoxShadow(
            color: Colors.black26,
            blurRadius: 5,
            // offset: Offset(5, 7),
          ),
        ],
      ),
      width: width,
      height: height,
      child: child,
    );
  }
}
`,
  code9: `import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:ibmi/widgets/info_card.dart';

class BMIPage extends StatefulWidget {
  const BMIPage({super.key});

  @override
  State<StatefulWidget> createState() {
    return _BMIPageState();
  }
}

class _BMIPageState extends State<BMIPage> {
  double? _height;
  double? _width;

  int age = 25;

  @override
  Widget build(BuildContext context) {
    _height = MediaQuery.of(context).size.height;
    _width = MediaQuery.of(context).size.width;
    return CupertinoPageScaffold(
      child: Container(
        child: Center(
          child: _ageSelectContainer(),
        ),
      ),
    );
  }

  Widget _ageSelectContainer() {
    return InfoCard(
      width: _width! * 0.45,
      height: _height! * 0.2,
      child: Column(
        mainAxisSize: MainAxisSize.max,
        mainAxisAlignment: MainAxisAlignment.spaceEvenly,
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          const Text(
            "Age Yr",
            style: TextStyle(
              fontSize: 15,
              fontWeight: FontWeight.w400,
            ),
          ),
          Text(
            age.toString(),
            style: const TextStyle(
              fontSize: 45,
              fontWeight: FontWeight.w700,
            ),
          ),
          Row(
            mainAxisSize: MainAxisSize.max,
            mainAxisAlignment: MainAxisAlignment.center,
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              SizedBox(
                width: 50,
                child: CupertinoDialogAction(
                  onPressed: () {
                    setState(() {
                      age--;
                    });
                  },
                  child: const Text(
                    '-',
                    style: TextStyle(
                      fontSize: 25,
                      color: Colors.red,
                    ),
                  ),
                ),
              ),
              SizedBox(
                width: 50,
                child: CupertinoDialogAction(
                  onPressed: () {
                    setState(() {
                      age++;
                    });
                  },
                  child: const Text(
                    '+',
                    style: TextStyle(
                      fontSize: 25,
                      color: Colors.blue,
                    ),
                  ),
                ),
              )
            ],
          )
        ],
      ),
    );
  }
}
`,
  code10: `import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:ibmi/widgets/info_card.dart';

class BMIPage extends StatefulWidget {
  const BMIPage({super.key});

  @override
  State<StatefulWidget> createState() {
    return _BMIPageState();
  }
}

class _BMIPageState extends State<BMIPage> {
  double? _height;
  double? _width;

  int age = 25;
  int weight = 25;
  int height = 75;

  @override
  Widget build(BuildContext context) {
    _height = MediaQuery.of(context).size.height;
    _width = MediaQuery.of(context).size.width;
    return CupertinoPageScaffold(
      child: Container(
        height: _height! * 0.85,
        child: Column(
          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
          mainAxisSize: MainAxisSize.max,
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            Row(
              mainAxisSize: MainAxisSize.max,
              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
              crossAxisAlignment: CrossAxisAlignment.center,
              children: [
                _ageSelectContainer(),
                _weightSelectContainer(),
              ],
            ),
            _heightSelectContainer(),
          ],
        ),
      ),
    );
  }

  Widget _heightSelectContainer() {
    return InfoCard(
      height: _height! * 0.15,
      width: _width! * 0.90,
      child: Column(
        mainAxisAlignment: MainAxisAlignment.spaceEvenly,
        mainAxisSize: MainAxisSize.max,
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          const Text(
            "Height in",
            style: TextStyle(
              fontSize: 15,
              fontWeight: FontWeight.w400,
            ),
          ),
          Text(
            height.toString(),
            style: const TextStyle(
              fontSize: 45,
              fontWeight: FontWeight.w700,
            ),
          ),
          SizedBox(
            width: _width! * 0.80,
            child: CupertinoSlider(
              min: 0,
              max: 96,
              divisions: 96,
              value: height.toDouble(),
              onChanged: (value) {
                setState(() {
                  height = value.round();
                });
              },
            ),
          )
        ],
      ),
    );
  }

  Widget _ageSelectContainer() {
    return InfoCard(
      width: _width! * 0.45,
      height: _height! * 0.2,
      child: Column(
        mainAxisSize: MainAxisSize.max,
        mainAxisAlignment: MainAxisAlignment.spaceEvenly,
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          const Text(
            "Age Yr",
            style: TextStyle(
              fontSize: 15,
              fontWeight: FontWeight.w400,
            ),
          ),
          Text(
            age.toString(),
            style: const TextStyle(
              fontSize: 45,
              fontWeight: FontWeight.w700,
            ),
          ),
          Row(
            mainAxisSize: MainAxisSize.max,
            mainAxisAlignment: MainAxisAlignment.center,
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              SizedBox(
                width: 50,
                child: CupertinoDialogAction(
                  onPressed: () {
                    setState(() {
                      age--;
                    });
                  },
                  child: const Text(
                    '-',
                    style: TextStyle(
                      fontSize: 25,
                      color: Colors.red,
                    ),
                  ),
                ),
              ),
              SizedBox(
                width: 50,
                child: CupertinoDialogAction(
                  onPressed: () {
                    setState(() {
                      age++;
                    });
                  },
                  child: const Text(
                    '+',
                    style: TextStyle(
                      fontSize: 25,
                      color: Colors.blue,
                    ),
                  ),
                ),
              )
            ],
          )
        ],
      ),
    );
  }

  Widget _weightSelectContainer() {
    return InfoCard(
      width: _width! * 0.45,
      height: _height! * 0.2,
      child: Column(
        mainAxisSize: MainAxisSize.max,
        mainAxisAlignment: MainAxisAlignment.spaceEvenly,
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          const Text(
            "Weight LBS",
            style: TextStyle(
              fontSize: 15,
              fontWeight: FontWeight.w400,
            ),
          ),
          Text(
            weight.toString(),
            style: const TextStyle(
              fontSize: 45,
              fontWeight: FontWeight.w700,
            ),
          ),
          Row(
            mainAxisSize: MainAxisSize.max,
            mainAxisAlignment: MainAxisAlignment.center,
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              SizedBox(
                width: 50,
                child: CupertinoDialogAction(
                  onPressed: () {
                    setState(() {
                      weight--;
                    });
                  },
                  child: const Text(
                    '-',
                    style: TextStyle(
                      fontSize: 25,
                      color: Colors.red,
                    ),
                  ),
                ),
              ),
              SizedBox(
                width: 50,
                child: CupertinoDialogAction(
                  onPressed: () {
                    setState(() {
                      weight++;
                    });
                  },
                  child: const Text(
                    '+',
                    style: TextStyle(
                      fontSize: 25,
                      color: Colors.blue,
                    ),
                  ),
                ),
              )
            ],
          )
        ],
      ),
    );
  }
}
`,
  code11: `  Widget _genderSelectContainer() {
    return InfoCard(
      height: _height! * 0.11,
      width: _width! * 0.9,
      child: Column(
        mainAxisSize: MainAxisSize.max,
        mainAxisAlignment: MainAxisAlignment.spaceEvenly,
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          const Text(
            "Gender",
            style: TextStyle(
              fontSize: 15,
              fontWeight: FontWeight.w400,
            ),
          ),
          CupertinoSlidingSegmentedControl(
            groupValue: gender,
            children: const {
              0: Text("Male"),
              1: Text("Female"),
            },
            onValueChanged: (index) {
              setState(() {
                gender = index as int;
              });
            },
          ),
        ],
      ),
    );
  }`,
  code12: `  Widget _calculateBMIButton() {
    return Container(
      height: _height! * 0.07,
      child: CupertinoButton(
        child: const Text("Calculate BMI"),
        onPressed: () {
          if (height > 0 && weight > 0 && age > 0) {
            double bmi = (weight / pow(height, 2)) * 703;
            print(bmi);
          }
        },
      ),
    );
  }`,
  code13: `  void _showResult(double bmi) {
    String? status;
    if (bmi < 18.5) {
      status = "Underweight";
    } else if (bmi >= 18.5 && bmi < 25) {
      status = "Normal";
    } else if (bmi >= 25 && bmi < 30) {
      status = "Overweight";
    } else if (bmi >= 30) {
      status = "Obese";
    }
    showCupertinoDialog(
      context: context,
      builder: (_context) {
        return CupertinoAlertDialog(
          title: Text(status!),
          content: Text(bmi.toStringAsFixed(2)),
          actions: [
            CupertinoDialogAction(
              child: const Text('OK'),
              onPressed: () {
                Navigator.pop(_context);
              },
            ),
          ],
        );
      },
    );
  }

  Widget _calculateBMIButton() {
    return Container(
      height: _height! * 0.07,
      child: CupertinoButton(
        child: const Text("Calculate BMI"),
        onPressed: () {
          if (height > 0 && weight > 0 && age > 0) {
            double bmi = (weight / pow(height, 2)) * 703;
            _showResult(bmi);
          }
        },
      ),
    );
  }`,
  code14: `import 'package:shared_preferences/shared_preferences.dart';



  void _showResult(double bmi) {
    String? status;
    if (bmi < 18.5) {
      status = "Underweight";
    } else if (bmi >= 18.5 && bmi < 25) {
      status = "Normal";
    } else if (bmi >= 25 && bmi < 30) {
      status = "Overweight";
    } else if (bmi >= 30) {
      status = "Obese";
    }
    showCupertinoDialog(
      context: context,
      builder: (_context) {
        return CupertinoAlertDialog(
          title: Text(status!),
          content: Text(bmi.toStringAsFixed(2)),
          actions: [
            CupertinoDialogAction(
              child: const Text('OK'),
              onPressed: () {
                _saveResult(bmi.toString(), status!);
                Navigator.pop(_context);
              },
            ),
          ],
        );
      },
    );
  }
    
  void _saveResult(String bmi, String status) async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString('bmi_date', DateTime.now().toString());
    await prefs.setStringList('bmi_data', <String>[bmi, status]);
  }`,
  code15: `import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:ibmi/widgets/info_card.dart';

class HistoryPage extends StatelessWidget {
  double? _width, _height;

  HistoryPage({super.key});

  @override
  Widget build(BuildContext context) {
    _height = MediaQuery.of(context).size.height;
    _width = MediaQuery.of(context).size.width;
    return CupertinoPageScaffold(
      child: _dataCard(),
    );
  }

  Widget _dataCard() {
    return Center(
      child: InfoCard(
        height: _height! * 0.25,
        width: _width! * 0.75,
        child: Column(
          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
          mainAxisSize: MainAxisSize.max,
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            _statusText("Normal"),
            _dateText("date"),
            _bmiText('125'),
          ],
        ),
      ),
    );
  }

  Widget _bmiText(String data) {
    return Text(
      data,
      style: const TextStyle(
        fontSize: 60,
        fontWeight: FontWeight.w400,
      ),
    );
  }

  Widget _statusText(String status) {
    return Text(
      status,
      style: const TextStyle(
        fontSize: 30,
        fontWeight: FontWeight.w400,
      ),
    );
  }

  Widget _dateText(String date) {
    return Text(
      date,
      style: const TextStyle(
        fontSize: 15,
        fontWeight: FontWeight.w300,
      ),
    );
  }
}
`,
  code16: `import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:ibmi/widgets/info_card.dart';
import 'package:shared_preferences/shared_preferences.dart';

class HistoryPage extends StatelessWidget {
  double? _width, _height;

  HistoryPage({super.key});

  @override
  Widget build(BuildContext context) {
    _height = MediaQuery.of(context).size.height;
    _width = MediaQuery.of(context).size.width;
    return CupertinoPageScaffold(
      child: _dataCard(),
    );
  }

  Widget _dataCard() {
    return FutureBuilder(
      future: SharedPreferences.getInstance(),
      builder: (context, snap) {
        if (snap.hasData) {
          final prefs = snap.data as SharedPreferences;
          final date = prefs.getString('bmi_date');
          final data = prefs.getStringList("bmi_data");
          return Center(
            child: InfoCard(
              height: _height! * 0.25,
              width: _width! * 0.75,
              child: Column(
                mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                mainAxisSize: MainAxisSize.max,
                crossAxisAlignment: CrossAxisAlignment.center,
                children: [
                  _statusText(data![1]),
                  _dateText(date!),
                  _bmiText(data[0]),
                ],
              ),
            ),
          );
        } else {
          return const Center(
            child: CupertinoActivityIndicator(
              color: Colors.blue,
            ),
          );
        }
      },
    );
  }

  Widget _bmiText(String data) {
    return Text(
      double.parse(data).toStringAsFixed(2),
      style: const TextStyle(
        fontSize: 60,
        fontWeight: FontWeight.w400,
      ),
    );
  }

  Widget _statusText(String status) {
    return Text(
      status,
      style: const TextStyle(
        fontSize: 30,
        fontWeight: FontWeight.w400,
      ),
    );
  }

  Widget _dateText(String date) {
    DateTime parseDate = DateTime.parse(date);
    return Text(
      '\${parseDate.day}/\${parseDate.month}/\${parseDate.year}',
      style: const TextStyle(
        fontSize: 15,
        fontWeight: FontWeight.w300,
      ),
    );
  }
}
`,
};

function addCode(id) {
  document.getElementById(id).innerHTML = data[id];
}

for (k in data) {
  addCode(k);
}
