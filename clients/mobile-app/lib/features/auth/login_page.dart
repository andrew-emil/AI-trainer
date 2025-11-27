import 'package:flutter/material.dart';
import 'package:fr3on_fit_app/core/constants/constants.dart';
import 'package:fr3on_fit_app/widgets/custom_text_field.dart';
import 'package:fr3on_fit_app/widgets/primary_button.dart';
import 'package:fr3on_fit_app/widgets/social_button.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';

class LoginPage extends StatelessWidget {
  const LoginPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Theme.of(context).scaffoldBackgroundColor,
      appBar: AppBar(
        backgroundColor: Theme.of(context).appBarTheme.backgroundColor,
        elevation: 0,
        leading: BackButton(color: Theme.of(context).iconTheme.color),
        title: Text(
          "Login",
          style: TextStyle(
            color: Theme.of(context).textTheme.titleLarge?.color,
          ),
        ),
        centerTitle: true,
      ),

      body: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 10),
        child: SingleChildScrollView(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const CustomTextField(
                label: "Email or username",
                hint: "example@gmail.com",
              ),

              const CustomTextField(
                label: "Password",
                hint: "minimum 6 characters",
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
                icon: FontAwesomeIcons.google,
                iconColor: kPrimaryColor,
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
