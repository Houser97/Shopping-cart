import 'package:flutter/material.dart';
import 'package:flutter_version/provider/cart_provider.dart';
import 'package:provider/provider.dart';

class QuantityButtons extends StatelessWidget {
  final int currentQty;
  final int productId;
  const QuantityButtons({
    super.key,
    required this.currentQty,
    required this.productId,
  });

  @override
  Widget build(BuildContext context) {
    const double buttonsSize = 35;
    return Row(
      children: [
        SizedBox(
          height: buttonsSize,
          width: buttonsSize,
          child: AspectRatio(
            aspectRatio: 1,
            child: TextButton(
              onPressed: () {
                if (currentQty > 1) {
                  Provider.of<CartProvider>(context, listen: false)
                      .decreaseProductQuantity(productId);
                }
              },
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
          width: 6,
        ),
        Text('$currentQty'),
        const SizedBox(
          width: 6,
        ),
        SizedBox(
          height: buttonsSize,
          width: buttonsSize,
          child: AspectRatio(
            aspectRatio: 1,
            child: TextButton(
              onPressed: () {
                Provider.of<CartProvider>(context, listen: false)
                    .increaseProductQuantity(productId);
              },
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
