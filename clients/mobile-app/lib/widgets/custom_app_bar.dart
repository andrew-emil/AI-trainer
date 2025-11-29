import 'package:flutter/material.dart';
import 'package:fr3on_fit_app/main.dart';

class CustomAppBar extends StatelessWidget implements PreferredSizeWidget {
  const CustomAppBar({super.key, required this.title});

  final String title;

  @override
  Widget build(BuildContext context) {
    final bool isLight = Theme.of(context).brightness == Brightness.light;

    return AppBar(
      backgroundColor: Theme.of(context).appBarTheme.backgroundColor,
      elevation: 0,
      leading: BackButton(color: Theme.of(context).iconTheme.color),
      title: Text(
        title,
        style: TextStyle(color: Theme.of(context).textTheme.titleLarge?.color),
      ),
      centerTitle: true,
      actions: [
        IconButton(
          icon: Icon(isLight ? Icons.dark_mode : Icons.light_mode),
          onPressed: () {
            themeModeNotifier.value = isLight
                ? ThemeMode.dark
                : ThemeMode.light;
          },
        ),
      ],
    );
  }

  @override
  Size get preferredSize => const Size.fromHeight(kToolbarHeight);
}
