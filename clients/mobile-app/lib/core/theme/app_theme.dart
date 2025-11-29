import 'package:flutter/material.dart';
import 'package:flex_color_scheme/flex_color_scheme.dart';

class AppTheme {
  static ThemeData get lightTheme {
    return FlexThemeData.light(
      scheme: FlexScheme.blueWhale,
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
    );
  }

  static ThemeData get darkTheme {
    return FlexThemeData.dark(
      scheme: FlexScheme.blueWhale,
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
    );
  }
}
