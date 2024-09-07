const data = {
  code1: `import 'package:finstagram/services/firebase_service.dart';
import 'package:flutter/material.dart';

import 'package:firebase_core/firebase_core.dart';
import 'package:get_it/get_it.dart';
import 'firebase_options.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp(
    options: DefaultFirebaseOptions.currentPlatform,
  );
  GetIt.instance.registerSingleton<FirebaseService>(
    FirebaseService(),
  );
  runApp(const MyApp());
}`,
  code2: `import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:firebase_storage/firebase_storage.dart';

class FirebaseService {
  FirebaseAuth _auth = FirebaseAuth.instance;
  FirebaseStorage _storage = FirebaseStorage.instance;
  FirebaseFirestore _db = FirebaseFirestore.instance;

  FirebaseService();
}
`,
  code3: `import 'package:firebase_core/firebase_core.dart';
import 'package:get_it/get_it.dart';
import 'firebase_options.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp(
    options: DefaultFirebaseOptions.currentPlatform,
  );
  GetIt.instance.registerSingleton<FirebaseService>(
    FirebaseService(),
  );
  runApp(const MyApp());
}`,
  code4: `import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:firebase_storage/firebase_storage.dart';

const String USER_COLLECTION = 'users';

class FirebaseService {
  FirebaseAuth _auth = FirebaseAuth.instance;
  FirebaseStorage _storage = FirebaseStorage.instance;
  FirebaseFirestore _db = FirebaseFirestore.instance;

  Map? currentUser;

  FirebaseService();

  Future<bool> loginUser({
    required String email,
    required String password,
  }) async {
    try {
      UserCredential _userC = await _auth.signInWithEmailAndPassword(
          email: email, password: password);
      if (_userC.user != null) {
        currentUser = await getUserData(uid: _userC.user!.uid);
        return true;
      } else {
        return false;
      }
    } catch (e) {
      print(e.toString());
      return false;
    }
  }

  Future<Map> getUserData({required String uid}) async {
    DocumentSnapshot _doc =
        await _db.collection(USER_COLLECTION).doc(uid).get();
    return _doc.data() as Map;
  }
}
`,
  code5: `import 'package:finstagram/services/firebase_service.dart';
import 'package:flutter/material.dart';
import 'package:get_it/get_it.dart';

class LoginPage extends StatefulWidget {
  const LoginPage({super.key});

  @override
  State<StatefulWidget> createState() {
    return _LoginPageState();
  }
}

class _LoginPageState extends State<LoginPage> {
  double? _height, _width;

  final GlobalKey<FormState> _loginFormKey = GlobalKey<FormState>();

  //update
  FirebaseService? _firebaseService;

  String? _emailText;
  String? _passwordText;

  //update
  @override
  void initState() {
    super.initState();
    _firebaseService = GetIt.instance.get<FirebaseService>();
  }

  @override
  Widget build(BuildContext context) {
    _height = MediaQuery.of(context).size.height;
    _width = MediaQuery.of(context).size.width;
    return Scaffold(
      body: SafeArea(
        child: Container(
          padding: EdgeInsets.symmetric(
            horizontal: _height! * 0.05,
          ),
          color: Colors.white,
          child: Column(
            mainAxisAlignment: MainAxisAlignment.spaceAround,
            mainAxisSize: MainAxisSize.max,
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              _titleWidget(),
              _loginForm(),
              _loginButton(),
              _registerPageLink(),
            ],
          ),
        ),
      ),
    );
  }

  Widget _loginForm() {
    return Container(
      child: Form(
        key: _loginFormKey,
        child: Column(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          mainAxisSize: MainAxisSize.max,
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            _emailTextField(),
            _passwordTextField(),
          ],
        ),
      ),
    );
  }

  Widget _emailTextField() {
    return TextFormField(
      style: const TextStyle(
        fontSize: 25,
      ),
      decoration: const InputDecoration(
        hintText: "Email....",
      ),
      onSaved: (e) {
        setState(() {
          _emailText = e;
        });
      },
      validator: (value) {
        bool res = value!.contains(
          RegExp(
            r"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$",
          ),
        );
        return res ? null : "Please enter valid email";
      },
    );
  }

  Widget _passwordTextField() {
    return TextFormField(
      obscureText: true,
      decoration: const InputDecoration(
        hintText: "Password....",
      ),
      onSaved: (e) {
        setState(() {
          _passwordText = e;
        });
      },
      validator: (value) {
        if (value!.length > 6) {
          return null;
        }
        return "Please entery password greater then 6 characters";
      },
    );
  }

  Widget _titleWidget() {
    return const Text(
      'Finstagram',
      style: TextStyle(
        color: Colors.black,
        fontSize: 25,
        fontWeight: FontWeight.w600,
      ),
    );
  }

  Widget _loginButton() {
    return MaterialButton(
      onPressed: () {
        _loginUser();
      },
      minWidth: _width! * 0.70,
      height: _height! * 0.06,
      color: Colors.red,
      child: const Text(
        "Login",
        style: TextStyle(
          color: Colors.white,
          fontSize: 25,
          fontWeight: FontWeight.w600,
        ),
      ),
    );
  }

  //update
  void _loginUser() async {
    if (_loginFormKey.currentState!.validate()) {
      _loginFormKey.currentState!.save();
      bool result = await _firebaseService!
          .loginUser(email: _emailText!, password: _passwordText!);
      if (result) {
        Navigator.popAndPushNamed(context, 'home');
      }
    }
  }

  Widget _registerPageLink() {
    return GestureDetector(
      onTap: () => Navigator.pushNamed(context, 'register'),
      child: const Text(
        "Register Now",
        style: TextStyle(
          color: Colors.blue,
          fontSize: 15,
          fontWeight: FontWeight.w200,
        ),
      ),
    );
  }
}
`,
  code6: `  Future<bool> registerUser({
    required String name,
    required String email,
    required String password,
    required File image,
  }) async {
    try {
      UserCredential uc = await _auth.createUserWithEmailAndPassword(
          email: email, password: password);
      String userId = uc.user!.uid;
      String fileName = Timestamp.now().millisecondsSinceEpoch.toString() +
          p.extension(image.path);

      // uploading
      UploadTask task = _storage.ref('images/$userId/$fileName').putFile(image);
      return task.then((snap) async {
        String downloadURL = await snap.ref.getDownloadURL();
        await _db.collection('user').doc(userId).set({
          "name": name,
          "email": email,
          "image": downloadURL,
        });
        return true;
      });
    } catch (e) {
      print(e);
      return false;
    }
  }`,
  code7: `  void _registerUser() async {
    if (_registerFormKey.currentState!.validate() && _file != null) {
      _registerFormKey.currentState!.save();

      bool result = await _firebaseService!.registerUser(
          name: _name!, email: _email!, password: _password!, image: _file!);
      if (result) {
        Navigator.pop(context);
      }
    }
  }`,
  code8: `import 'dart:io';

import 'package:file_picker/file_picker.dart';
import 'package:finstagram/pages/feed_page.dart';
import 'package:finstagram/pages/profile_page.dart';
import 'package:finstagram/services/firebase_service.dart';
import 'package:flutter/material.dart';
import 'package:get_it/get_it.dart';

class HomePage extends StatefulWidget {
  @override
  State<StatefulWidget> createState() {
    return HomePageState();
  }
}

class HomePageState extends State<HomePage> {
  int _currentPage = 0;

  final List<Widget> _pages = [
    FeedPage(),
    ProfilePage(),
  ];

  FirebaseService? _firebaseService;

  @override
  void initState() {
    super.initState();
    _firebaseService = GetIt.instance.get<FirebaseService>();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("Finstagram"),
        actions: [
          GestureDetector(
            onTap: () {
              _postImage();
            },
            child: const Icon(Icons.add_a_photo),
          ),
          Padding(
            padding: const EdgeInsets.only(left: 8.0, right: 8.0),
            child: GestureDetector(
              onTap: () {},
              child: const Icon(Icons.logout),
            ),
          )
        ],
      ),
      bottomNavigationBar: _bottomNavigationBar(),
      body: _pages[_currentPage],
    );
  }

  Widget _bottomNavigationBar() {
    return BottomNavigationBar(
      currentIndex: _currentPage,
      onTap: (index) {
        setState(() {
          _currentPage = index;
        });
      },
      items: const [
        BottomNavigationBarItem(
          label: 'Feed',
          icon: Icon(
            Icons.feed,
          ),
        ),
        BottomNavigationBarItem(
          label: 'Profile',
          icon: Icon(
            Icons.account_balance,
          ),
        )
      ],
    );
  }

  void _postImage() async {
    FilePickerResult? res = await FilePicker.platform.pickFiles(
      type: FileType.image,
    );
    File image = File(res!.files.first.path!);
    await _firebaseService!.postImage(image);
  }
}
`,
  code9: `import 'dart:io';

import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:firebase_storage/firebase_storage.dart';

import 'package:path/path.dart' as p;

const String USER_COLLECTION = 'users';
const String POST_COLLECTION = 'posts';

class FirebaseService {
  FirebaseAuth _auth = FirebaseAuth.instance;
  FirebaseStorage _storage = FirebaseStorage.instance;
  FirebaseFirestore _db = FirebaseFirestore.instance;

  Map? currentUser;

  FirebaseService();

  Future<bool> registerUser({
    required String name,
    required String email,
    required String password,
    required File image,
  }) async {
    try {
      UserCredential uc = await _auth.createUserWithEmailAndPassword(
          email: email, password: password);
      String userId = uc.user!.uid;
      String fileName = Timestamp.now().millisecondsSinceEpoch.toString() +
          p.extension(image.path);

      // uploading
      UploadTask task = _storage.ref('images/$userId/$fileName').putFile(image);
      return task.then((snap) async {
        String downloadURL = await snap.ref.getDownloadURL();
        await _db.collection('user').doc(userId).set({
          "name": name,
          "email": email,
          "image": downloadURL,
        });
        return true;
      });
    } catch (e) {
      print(e);
      return false;
    }
  }

  Future<bool> loginUser({
    required String email,
    required String password,
  }) async {
    try {
      UserCredential _userC = await _auth.signInWithEmailAndPassword(
          email: email, password: password);
      if (_userC.user != null) {
        currentUser = await getUserData(uid: _userC.user!.uid);
        return true;
      } else {
        return false;
      }
    } catch (e) {
      print(e.toString());
      return false;
    }
  }

  Future<Map> getUserData({required String uid}) async {
    DocumentSnapshot doc = await _db.collection(USER_COLLECTION).doc(uid).get();
    return doc.data() as Map;
  }

  Future<bool> postImage(File image) async {
    try {
      String userId = _auth.currentUser!.uid;
      String filename = Timestamp.now().millisecondsSinceEpoch.toString() +
          p.extension(image.path);

      UploadTask task = _storage.ref('images/$userId/$filename').putFile(image);
      return await task.then((snap) async {
        String downloadURL = await snap.ref.getDownloadURL();
        await _db.collection(POST_COLLECTION).add({
          "userId": userId,
          "timestamp": Timestamp.now(),
          "image": downloadURL,
        });
        return true;
      });
    } catch (e) {
      print(e);
      return false;
    }
  }
}
`,
  code10: `  Stream<QuerySnapshot> getLatestPosts() {
    return _db
        .collection(POST_COLLECTION)
        .orderBy('timestamp', descending: true)
        .snapshots();
  }`,
  code11: `import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:finstagram/services/firebase_service.dart';
import 'package:flutter/material.dart';
import 'package:get_it/get_it.dart';

class FeedPage extends StatefulWidget {
  const FeedPage({super.key});

  @override
  State<StatefulWidget> createState() {
    return FeedPageState();
  }
}

class FeedPageState extends State<FeedPage> {
  FirebaseService? _firebaseService;
  double? _height, _width;

  @override
  void initState() {
    super.initState();
    _firebaseService = GetIt.instance.get<FirebaseService>();
  }

  @override
  Widget build(BuildContext context) {
    _height = MediaQuery.of(context).size.height;
    _width = MediaQuery.of(context).size.width;
    return Container(
      height: _height,
      width: _width,
      child: _postListView(),
    );
  }

  Widget _postListView() {
    return StreamBuilder<QuerySnapshot>(
      stream: _firebaseService!.getLatestPosts(),
      builder: (BuildContext context, AsyncSnapshot snap) {
        if (snap.hasData) {
          List posts = snap.data!.docs.map((e) => e.data()).toList();
          return ListView.builder(
            itemCount: posts.length,
            itemBuilder: (
              BuildContext context,
              int index,
            ) {
              Map post = posts[index];
              return Container(
                height: _height! * 0.30,
                margin: EdgeInsets.symmetric(
                  vertical: _height! * 0.01,
                  horizontal: _width! * 0.05,
                ),
                decoration: BoxDecoration(
                  image: DecorationImage(
                    fit: BoxFit.cover,
                    image: NetworkImage(post['image']),
                  ),
                ),
              );
            },
          );
        } else {
          return const Center(
            child: CircularProgressIndicator(),
          );
        }
      },
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
