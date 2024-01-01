import 'package:flutter/material.dart';
import 'package:flutter_version/widgets/HeroCard.dart';
import 'package:flutter_version/widgets/Search.dart';

class HomePage extends StatelessWidget {
  const HomePage({super.key});

  @override
  Widget build(BuildContext context) {
    return const Scaffold(
      body: SafeArea(
        child: Padding(
          padding: EdgeInsets.symmetric(vertical: 10, horizontal: 20),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                'Discover',
                style: TextStyle(
                  fontSize: 20,
                  fontWeight: FontWeight.bold,
                ),
              ),
              SizedBox(
                height: 10,
              ),
              Search(),
              SizedBox(
                height: 30,
              ),
              HeroCard()
            ],
          ),
        ),
      ),
    );
  }
}
