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
    const double buttonsSize = 32;
    return Row(
      children: [
        ClipOval(
          child: Material(
            shape: const CircleBorder(),
            color: Colors.white, // Button color
            child: InkWell(
              customBorder: const CircleBorder(),
              splashColor: Colors.grey, // Splash color
              onTap: () {
                if (currentQty > 1) {
                  Provider.of<CartProvider>(context, listen: false)
                      .decreaseProductQuantity(productId);
                }
              },
              child: Ink(
                decoration: BoxDecoration(
                  shape: BoxShape.circle,
                  border: Border.all(color: Colors.grey, width: 2),
                ),
                width: buttonsSize,
                height: buttonsSize,
                child: const Icon(Icons.remove_outlined),
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
        ClipOval(
          child: Material(
            shape: const CircleBorder(),
            color: Colors.white, // Button color
            child: InkWell(
              customBorder: const CircleBorder(),
              splashColor: Colors.grey, // Splash color
              onTap: () {
                Provider.of<CartProvider>(context, listen: false)
                    .increaseProductQuantity(productId);
              },
              child: Ink(
                decoration: BoxDecoration(
                  shape: BoxShape.circle,
                  border: Border.all(
                    color: Theme.of(context).colorScheme.primary,
                    width: 2,
                  ),
                ),
                width: buttonsSize,
                height: buttonsSize,
                child: Icon(Icons.add,
                    size: 20, color: Theme.of(context).colorScheme.primary),
              ),
            ),
          ),
        ),
      ],
    );
  }
}
