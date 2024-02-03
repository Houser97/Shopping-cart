import 'package:flutter/material.dart';
import 'package:flutter_version/provider/cart_provider.dart';
import 'package:flutter_version/widgets/clip_oval_button.dart';
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
    void decreaseProduct() {
      Provider.of<CartProvider>(context, listen: false)
          .decreaseProductQuantity(productId);
    }

    void increaseProduct() {
      Provider.of<CartProvider>(context, listen: false)
          .increaseProductQuantity(productId);
    }

    const double buttonsSize = 32;
    return Row(
      children: [
        ClipOvalButton(
          icon: Icons.remove_outlined,
          buttonSize: buttonsSize,
          buttonColor: Colors.grey,
          onTapFunction: decreaseProduct,
        ),
        const SizedBox(
          width: 6,
        ),
        Text('$currentQty'),
        const SizedBox(
          width: 6,
        ),
        ClipOvalButton(
          icon: Icons.add,
          buttonSize: buttonsSize,
          buttonColor: Theme.of(context).colorScheme.primary,
          onTapFunction: increaseProduct,
        ),
      ],
    );
  }
}
