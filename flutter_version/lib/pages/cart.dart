import 'package:flutter/material.dart';
import 'package:flutter_version/provider/cart_provider.dart';
import 'package:flutter_version/widgets/product_cart.dart';
import 'package:provider/provider.dart';

class Cart extends StatelessWidget {
  const Cart({super.key});

  @override
  Widget build(BuildContext context) {
    final cart = context.watch<CartProvider>().cart;
    final List<int> cartKeys = cart.keys.toList();

    double totalPrice = 0;

    for (final product in cart.values) {
      double price = product['price'];
      int quantity = product['quantity'];

      totalPrice += price * quantity;
    }

    return Padding(
        padding: const EdgeInsets.all(10.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Expanded(
              child: ListView.builder(
                  itemCount: cartKeys.length,
                  itemBuilder: (context, index) {
                    final product = cart[cartKeys[index]]!;
                    final id = product['id'];
                    final title = product['title'];
                    final price = product['price'];
                    final image = product['image'];
                    final currentQty = product['quantity'];
                    return ProductCart(
                      id: id as int,
                      image: image as String,
                      title: title as String,
                      price: price as double,
                      currentQty: currentQty,
                    );
                  }),
            ),
            const SizedBox(
              height: 10,
            ),
            Text(
              'Total: \$$totalPrice',
              style: const TextStyle(
                fontWeight: FontWeight.bold,
                fontSize: 17,
              ),
            ),
            const SizedBox(
              height: 10,
            ),
            SizedBox(
              width: double.infinity,
              child: ElevatedButton(
                onPressed: () {
                  Provider.of<CartProvider>(context, listen: false).checkout();
                },
                style: ElevatedButton.styleFrom(
                  backgroundColor: Theme.of(context).colorScheme.primary,
                  padding: const EdgeInsets.symmetric(
                    vertical: 25,
                  ),
                  shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(15)),
                ),
                child: const Text(
                  'Checkout',
                  style: TextStyle(
                    color: Colors.white,
                  ),
                ),
              ),
            )
          ],
        ));
  }
}
