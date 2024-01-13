import 'package:flutter/material.dart';
import 'package:flutter_version/widgets/constants.dart';
import 'package:flutter_version/widgets/product_cart.dart';

class Cart extends StatelessWidget {
  const Cart({super.key});

  @override
  Widget build(BuildContext context) {
    return Padding(
        padding: const EdgeInsets.all(10.0),
        child: ListView.builder(
            itemCount: products.length,
            itemBuilder: (context, index) {
              final title = products[index]['title'];
              final price = products[index]['price'];
              final image = products[index]['image'];
              return ProductCart(
                image: image as String,
                title: title as String,
                price: price as double,
              );
            }));
  }
}
