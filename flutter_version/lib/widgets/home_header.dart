import 'package:flutter/material.dart';

class HomeHeader extends StatelessWidget {
  const HomeHeader({super.key});

  @override
  Widget build(BuildContext context) {
    return const Row(
      children: [
        Text(
          'Discover',
          style: TextStyle(
            fontSize: 50,
            fontWeight: FontWeight.bold,
          ),
        ),
        const Expanded(
          child: TextField(
            decoration: InputDecoration(
                hintText: 'Search', suffixIcon: Icon(Icons.search)),
          ),
        ),
      ],
    );
  }
}
