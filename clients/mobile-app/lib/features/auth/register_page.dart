import 'package:flutter/material.dart';
import 'package:fr3on_fit_app/widgets/custom_text_field.dart';
import 'package:fr3on_fit_app/widgets/primary_button.dart';


class RegisterPage extends StatelessWidget {
  const RegisterPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Theme.of(context).scaffoldBackgroundColor,
      appBar: AppBar(
        backgroundColor: Theme.of(context).appBarTheme.backgroundColor,
        elevation: 0,
        leading: BackButton(color: Theme.of(context).iconTheme.color),
        title: Text(
          "Sign Up",
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
              const CustomTextField(label: "Email", hint: "example@gmail.com"),

              const CustomTextField(
                label: "Password",
                hint: "minimum 6 characters",
                obscure: true,
              ),

              const CustomTextField(label: "Username", hint: "username"),

              const SizedBox(height: 5),

              PrimaryButton(text: "Continue", onPressed: () {}),

              const SizedBox(height: 20),
            ],
          ),
        ),
      ),
    );
  }
}
