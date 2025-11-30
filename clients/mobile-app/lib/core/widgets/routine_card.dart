import 'package:flutter/material.dart';

class RoutineCard extends StatelessWidget {
  final String title;
  final IconData icon;
  final VoidCallback? onTap; 
  const RoutineCard({
    super.key,
    required this.title,
    required this.icon,
    this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return Expanded(
      child: GestureDetector(
        onTap: onTap,
        child: Container(
          height: 100,
          decoration: BoxDecoration(
            color: Theme.of(context).colorScheme.onInverseSurface,
            borderRadius: BorderRadius.circular(12),
          ),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Icon(icon, size: 28, color: Theme.of(context).colorScheme.inverseSurface),
              const SizedBox(height: 8),
              Text(
                title,
                style:  TextStyle(
                  fontSize: 14,
                  fontWeight: FontWeight.w500,
                  color: Theme.of(context).colorScheme.inverseSurface
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}