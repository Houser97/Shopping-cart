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
          height: 140, // Altura de la carta
          width: double.infinity,
          alignment: Alignment.centerLeft,
          padding: const EdgeInsets.only(left: 15),
          decoration: BoxDecoration(
            color: greenColor,
            borderRadius: BorderRadius.circular(12),
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              const Text(
                'Clearance \nSales',
                style: TextStyle(
                  color: Colors.white,
                  fontSize: 22,
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
                  horizontal: 12,
                ),
                child: const Text(
                  '% Up to 50%',
                  style: TextStyle(
                    color: greenColor,
                    fontSize: 13,
                    fontWeight: FontWeight.w400,
                  ),
                ),
              )
            ],
          ),
        ),
        Positioned(
          bottom: 0,
          right: 5,
          child: Image.asset(
            'assets/images/iPhoneHero.png',
            fit: BoxFit.fitWidth,
            height: 153,
          ),
        ),
      ],
    );
  }
}
