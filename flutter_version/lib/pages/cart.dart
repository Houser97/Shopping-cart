import 'package:flutter/material.dart';
import 'package:flutter_version/widgets/product_cart.dart';

class Cart extends StatelessWidget {
  const Cart({super.key});

  @override
  Widget build(BuildContext context) {
    return const SingleChildScrollView(
      child: Padding(
        padding: EdgeInsets.all(15.0),
        child: Column(
          children: [
            ProductCart(
              image: 'assets/images/xbox.png',
              title: 'Xbox',
              price: 320.0,
            ),
            ProductCart(
              image: 'assets/images/mouse.png',
              title: 'Xbox',
              price: 320.0,
            ),
            ProductCart(
              image: 'assets/images/mac.png',
              title: 'Xbox',
              price: 320.0,
            ),
            ProductCart(
              image: 'assets/images/headphones.png',
              title: 'Xbox',
              price: 320.0,
            ),
            ProductCart(
              image: 'assets/images/airpods.png',
              title: 'Xbox',
              price: 320.0,
            ),
            ProductCart(
              image: 'assets/images/iPhone.png',
              title: 'Xbox',
              price: 320.0,
            ),
          ],
        ),
      ),
    );
  }
}
