import 'package:flutter/material.dart';
import 'package:fr3on_fit_app/core/constants.dart';
import 'package:fr3on_fit_app/features/auth/register_page.dart';
import 'package:fr3on_fit_app/core/widgets/custom_app_bar.dart';
import 'package:fr3on_fit_app/core/widgets/custom_text_field.dart';
import 'package:fr3on_fit_app/core/widgets/primary_button.dart';
import 'package:fr3on_fit_app/core/widgets/social_button.dart';

class LoginPage extends StatelessWidget {
  const LoginPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Theme.of(context).scaffoldBackgroundColor,
      appBar: CustomAppBar(title: 'Login'),

      body: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 10),
        child: SingleChildScrollView(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const CustomTextField(
                label: "Email or username",
                hint: "Enter your email or username",
              ),

              const CustomTextField(
                label: "Password",
                hint: "Enter your password",
                obscure: true,
              ),

              Center(
                child: TextButton(
                  onPressed: () {},
                  child: const Text(
                    "Forgot Password?",
                    style: TextStyle(color: Color(0xFF3A82F7), fontSize: 15),
                  ),
                ),
              ),

              const SizedBox(height: 5),

              PrimaryButton(text: "Login", onPressed: () {}),
              const SizedBox(height: 5),

              Center(
                child: TextButton(
                  onPressed: () {
                    Navigator.push(
                      context,
                      MaterialPageRoute(builder: (context) => RegisterPage()),
                    );
                  },
                  child: const Text(
                    "don't have an account? sign up",
                    style: TextStyle(color: Color(0xFF3A82F7), fontSize: 15),
                  ),
                ),
              ),

              const SizedBox(height: 20),

              Row(
                children: const [
                  Expanded(child: Divider(color: Colors.grey)),
                  Padding(
                    padding: EdgeInsets.symmetric(horizontal: 8),
                    child: Text("or", style: TextStyle(color: Colors.black)),
                  ),
                  Expanded(child: Divider(color: Colors.grey)),
                ],
              ),

              const SizedBox(height: 20),

              SocialButton(
                text: "Sign in with Google",
                iconWidget: Image.asset(
                  "assets/icon/google.png",
                  width: 24,
                ),
                onPressed: () {},
              ),

              const SizedBox(height: 15),

              SocialButton(
                text: "Login with Facebook",
                icon: Icons.facebook,
                iconColor: kPrimaryColor,
                onPressed: () {},
              ),
            ],
          ),
        ),
      ),
    );
  }
}
