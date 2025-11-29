import 'package:flutter/material.dart';
import 'package:fr3on_fit_app/core/theme/app_theme.dart';
import 'package:fr3on_fit_app/features/auth/login_page.dart';
import 'package:fr3on_fit_app/features/auth/on_boarding_screen.dart';
import 'package:fr3on_fit_app/features/auth/register_page.dart';

void main() {
  runApp(const MyApp());
}

ValueNotifier<ThemeMode> themeModeNotifier = ValueNotifier(ThemeMode.system);

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return ValueListenableBuilder<ThemeMode>(
      valueListenable: themeModeNotifier,
      builder: (context, currentMode, child) {
        return MaterialApp(
          theme: AppTheme.lightTheme, 
          darkTheme: AppTheme.darkTheme,

          themeMode: currentMode,
          debugShowCheckedModeBanner: false,
          home: OnBoardingScreen(),
        );
      },
    );
  }
}
