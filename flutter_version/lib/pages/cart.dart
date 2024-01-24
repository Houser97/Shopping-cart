import 'package:flutter/material.dart';
import 'package:flutter_version/provider/cart_provider.dart';
import 'package:flutter_version/widgets/product_cart.dart';
import 'package:provider/provider.dart';

class Cart extends StatelessWidget {
  const Cart({super.key});

  @override
  Widget build(BuildContext context) {
    final cart = context.watch<CartProvider>().cart;

    return Padding(
        padding: const EdgeInsets.all(10.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Expanded(
              child: ListView.builder(
                  itemCount: cart.length,
                  itemBuilder: (context, index) {
                    final id = cart[index]['id'];
                    final title = cart[index]['title'];
                    final price = cart[index]['price'];
                    final image = cart[index]['image'];
                    final currentQty = cart[index]['quantity'];
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
            const Text(
              'Total: \$100',
              style: TextStyle(
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
                onPressed: () {},
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
