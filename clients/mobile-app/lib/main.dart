import 'package:flex_color_scheme/flex_color_scheme.dart';
import 'package:flutter/material.dart';
import 'package:fr3on_fit_app/features/auth/login_page.dart';
import 'package:fr3on_fit_app/features/auth/on_boarding_screen.dart';
import 'package:fr3on_fit_app/features/auth/register_page.dart';

void main() {
  runApp(const MyApp());
}

ValueNotifier<ThemeMode> themeModeNotifier = ValueNotifier(ThemeMode.system);

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return ValueListenableBuilder<ThemeMode>(
      valueListenable: themeModeNotifier,
      builder: (context, currentMode, child) {
        return MaterialApp(
          theme: FlexThemeData.light(
            scheme: FlexScheme.blue,
            surfaceMode: FlexSurfaceMode.levelSurfacesLowScaffold,
            blendLevel: 7,
            subThemesData: const FlexSubThemesData(
              blendOnLevel: 10,
              blendOnColors: false,
              useTextTheme: true,
              useM2StyleDividerInM3: true,
              defaultRadius: 12.0,
              inputDecoratorBorderType: FlexInputBorderType.outline,
              fabUseShape: true,
            ),
            useMaterial3: true,
            swapLegacyOnMaterial3: true,
          ),

          darkTheme: FlexThemeData.dark(
            scheme: FlexScheme.blue,
            surfaceMode: FlexSurfaceMode.levelSurfacesLowScaffold,
            blendLevel: 13,
            subThemesData: const FlexSubThemesData(
              blendOnLevel: 20,
              useTextTheme: true,
              useM2StyleDividerInM3: true,
              defaultRadius: 12.0,
              inputDecoratorBorderType: FlexInputBorderType.outline,
              fabUseShape: true,
            ),
            useMaterial3: true,
            swapLegacyOnMaterial3: true,
          ),

          themeMode: currentMode,
          debugShowCheckedModeBanner: false,
          home: OnBoardingScreen(),
        );
      },
    );
  }
}
