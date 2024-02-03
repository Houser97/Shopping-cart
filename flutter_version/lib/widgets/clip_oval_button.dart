import 'package:flutter/material.dart';

class ClipOvalButton extends StatelessWidget {
  final IconData icon;
  final double buttonSize;
  final Color buttonColor;
  final void Function() onTapFunction;
  const ClipOvalButton({
    super.key,
    required this.icon,
    required this.buttonSize,
    required this.buttonColor,
    required this.onTapFunction,
  });

  @override
  Widget build(BuildContext context) {
    return ClipOval(
      child: Material(
        shape: const CircleBorder(),
        color: Colors.white, // Button color
        child: InkWell(
          customBorder: const CircleBorder(),
          splashColor: buttonColor.withOpacity(0.4), // Splash color
          onTap: onTapFunction,
          child: Ink(
            decoration: BoxDecoration(
              shape: BoxShape.circle,
              border: Border.all(color: buttonColor, width: 2),
            ),
            width: buttonSize,
            height: buttonSize,
            child: Icon(
              icon,
              color: buttonColor,
            ),
          ),
        ),
      ),
    );
  }
}
