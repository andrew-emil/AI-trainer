import 'package:flutter/material.dart';
import 'package:fr3on_fit_app/features/auth/login_page.dart';
import 'package:introduction_screen/introduction_screen.dart';

class OnBoardingScreen extends StatelessWidget {
  const OnBoardingScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: IntroductionScreen(
        pages: [
          PageViewModel(
            title: "Welcome",
            body: "Welcome to the best workout app, have fun.",
            image: Center(
              child: Icon(Icons.waving_hand, size: 100.0, color: Colors.blue),
            ),
            decoration: getPageDecoration(context),
          ),
          PageViewModel(
            title: "Track your progress",
            body: "We help you accurately track your weight and calorie intake",
            image: Center(
              child: Icon(Icons.bar_chart, size: 100.0, color: Colors.orange),
            ),
            decoration: getPageDecoration(context),
          ),
          PageViewModel(
            title: "Start now",
            body: "Register your account now and start your journey with us.",
            image: Center(
              child: Icon(Icons.rocket_launch, size: 100.0, color: Colors.red),
            ),
            decoration: getPageDecoration(context),
          ),
        ],

        onDone: () {
          Navigator.of(
            context,
          ).pushReplacement(MaterialPageRoute(builder: (_) => LoginPage()));
          print("Done Clicked");
        },

        onSkip: () {
          Navigator.of(
            context,
          ).pushReplacement(MaterialPageRoute(builder: (_) => LoginPage()));
          print("Skip Clicked");
        },

        showSkipButton: true,
        skip: const Text("Skip", style: TextStyle(fontWeight: FontWeight.w600)),
        next: const Icon(Icons.arrow_forward),
        done: const Text(
          "start",
          style: TextStyle(fontWeight: FontWeight.w700),
        ),

        dotsDecorator: DotsDecorator(
          size: const Size.square(10.0),
          activeSize: const Size(20.0, 10.0),
          activeColor: Colors.blue,
          color: Colors.black26,
          spacing: const EdgeInsets.symmetric(horizontal: 3.0),
          activeShape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(25.0),
          ),
        ),
      ),
    );
  }

  PageDecoration getPageDecoration(BuildContext context) {
    return  PageDecoration(
      titleTextStyle: TextStyle(fontSize: 28, fontWeight: FontWeight.bold),
      bodyTextStyle: TextStyle(fontSize: 18),
      imagePadding: EdgeInsets.only(top: 40),
      pageColor: Theme.of(context).scaffoldBackgroundColor,
    );
  }
}
