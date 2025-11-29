import 'package:flutter/material.dart';
import 'package:fr3on_fit_app/main.dart';

class DarkModeButton extends StatelessWidget {
  const DarkModeButton({
    super.key,
    required this.isLight,
  });

  final bool isLight;

  @override
  Widget build(BuildContext context) {
    return IconButton(
      icon: Icon(isLight ? Icons.dark_mode : Icons.light_mode),
      onPressed: () {
        themeModeNotifier.value = isLight
            ? ThemeMode.dark
            : ThemeMode.light;
      },
    );
  }
}
