import 'package:flutter/material.dart';

class HeroCard extends StatelessWidget {
  const HeroCard({super.key});

  @override
  Widget build(BuildContext context) {
    //const greenColor = Color.fromRGBO(25, 197, 99, 1);
    //const greenColor = Color.fromARGB(255, 58, 190, 115);
    const greenColor = Color.fromARGB(255, 72, 200, 127);

    return Stack(
      alignment: Alignment.centerRight,
      clipBehavior: Clip.none,
      children: [
        Container(
          height: 200, // Altura de la carta
          width: double.infinity,
          decoration: BoxDecoration(
            color: greenColor,
            borderRadius: BorderRadius.circular(25),
          ),
          child: Padding(
            padding: const EdgeInsets.all(24.0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Text(
                  'Clearance \nSales',
                  style: TextStyle(
                    color: Colors.white,
                    fontSize: 30,
                    fontWeight: FontWeight.bold,
                  ),
                ),
                const SizedBox(
                  height: 10,
                ),
                Container(
                  decoration: const BoxDecoration(
                    borderRadius: BorderRadius.all(
                      Radius.circular(50),
                    ),
                    color: Colors.white,
                  ),
                  padding: const EdgeInsets.symmetric(
                    vertical: 5,
                    horizontal: 40,
                  ),
                  child: const Text(
                    '% Up to 50%',
                    style: TextStyle(
                      color: greenColor,
                      fontSize: 20,
                      fontWeight: FontWeight.w400,
                    ),
                  ),
                )
              ],
            ),
          ),
        ),
        Positioned(
          bottom: -20,
          right: 0,
          child: Image.asset(
            'assets/images/iPhone.png',
            fit: BoxFit.fitWidth,
            height: 260,
          ),
        ),
      ],
    );
  }
}
