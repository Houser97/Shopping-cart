import 'package:flutter/material.dart';

class QuantityButtons extends StatelessWidget {
  const QuantityButtons({super.key});

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        SizedBox(
          height: 40,
          width: 40,
          child: AspectRatio(
            aspectRatio: 1,
            child: TextButton(
              onPressed: () {},
              style: TextButton.styleFrom(
                backgroundColor: const Color.fromARGB(255, 255, 255, 255),
                shape: const RoundedRectangleBorder(
                  side: BorderSide(
                    color: Color.fromARGB(255, 209, 209, 209),
                    width: 1.4,
                  ),
                  borderRadius: BorderRadius.all(
                    Radius.circular(13),
                  ),
                ),
              ),
              child: const Text(
                '-',
                textAlign: TextAlign.center,
                style: TextStyle(
                    fontSize: 20,
                    fontWeight: FontWeight.w300,
                    color: Colors.black),
              ),
            ),
          ),
        ),
        const SizedBox(
          width: 5,
        ),
        Text('1'),
        const SizedBox(
          width: 5,
        ),
        SizedBox(
          height: 40,
          width: 40,
          child: AspectRatio(
            aspectRatio: 1,
            child: TextButton(
              onPressed: () {},
              style: TextButton.styleFrom(
                backgroundColor: const Color.fromARGB(255, 255, 255, 255),
                shape: RoundedRectangleBorder(
                  side: BorderSide(
                      color: Theme.of(context).colorScheme.primary, width: 1.4),
                  borderRadius: const BorderRadius.all(
                    Radius.circular(13),
                  ),
                ),
              ),
              child: const Text(
                '+',
                style: TextStyle(fontSize: 18, fontWeight: FontWeight.w300),
              ),
            ),
          ),
        )
      ],
    );
  }
}
