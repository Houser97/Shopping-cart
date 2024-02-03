import 'package:flutter/material.dart';
import 'package:flutter_version/widgets/quantity_buttons.dart';
import 'package:flutter_version/provider/cart_provider.dart';
import 'package:provider/provider.dart';

class ProductCart extends StatelessWidget {
  final String image;
  final int id;
  final String title;
  final double price;
  final int currentQty;
  const ProductCart({
    super.key,
    required this.image,
    required this.id,
    required this.title,
    required this.price,
    required this.currentQty,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 105,
      margin: const EdgeInsets.symmetric(vertical: 8),
      decoration: const BoxDecoration(
        border: Border(
          bottom: BorderSide(width: 1, color: Colors.white),
        ),
      ),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Container(
            padding: const EdgeInsets.all(4),
            decoration: BoxDecoration(
              color: Theme.of(context).colorScheme.secondary,
              borderRadius: BorderRadius.circular(10),
            ),
            child: Image.asset(
              image,
              height: 90,
            ),
          ),
          const SizedBox(
            width: 10,
          ),
          Expanded(
            child: Padding(
              padding: const EdgeInsets.symmetric(vertical: 5.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Expanded(
                        child: Text(
                          title,
                          style: const TextStyle(
                            fontWeight: FontWeight.w800,
                            fontSize: 18,
                          ),
                          overflow: TextOverflow.ellipsis,
                          maxLines: 1,
                        ),
                      ),
                      RawMaterialButton(
                        onPressed: () {
                          Provider.of<CartProvider>(context, listen: false)
                              .removeProductById(id);
                        },
                        constraints: const BoxConstraints.expand(
                          width: 30,
                          height: 30,
                        ),
                        elevation: 1.0,
                        fillColor: Colors.white,
                        shape: const CircleBorder(),
                        child: const Icon(
                          Icons.remove_shopping_cart,
                          size: 15.0,
                        ),
                      )
                    ],
                  ),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text(
                        '\$$price',
                        style: const TextStyle(
                          fontWeight: FontWeight.w500,
                          fontSize: 16,
                        ),
                      ),
                      QuantityButtons(
                        productId: id,
                        currentQty: currentQty,
                      ),
                    ],
                  )
                ],
              ),
            ),
          )
        ],
      ),
    );
  }
}
