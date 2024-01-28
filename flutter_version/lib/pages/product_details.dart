import 'package:flutter/material.dart';
import 'package:flutter_version/provider/cart_provider.dart';
import 'package:provider/provider.dart';

class ProductDetails extends StatelessWidget {
  final Map<String, dynamic> product;
  const ProductDetails({
    super.key,
    required this.product,
  });

  @override
  Widget build(BuildContext context) {
    final String title = product['title'];
    final double price = product['price'];
    final double rating = product['rating'];
    final String image = product['image'];
    final int id = product['id'];

    void addProduct() {
      Provider.of<CartProvider>(context, listen: false).addProduct({
        'id': id,
        'title': title,
        'price': price,
        'image': image,
        'rating': rating,
        'quantity': 1
      });
    }

    void productMessage(String message) {
      ScaffoldMessenger.of(context)
          .showSnackBar(SnackBar(content: Text(message)));
    }

    const space = SizedBox(
      height: 10,
    );

    return Scaffold(
      appBar: AppBar(),
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.all(8.0),
          child: Column(
            children: [
              Expanded(
                child: Image.asset(
                  image,
                ),
              ),
              space,
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text(
                    title,
                    style: const TextStyle(
                      fontSize: 18,
                      color: Colors.black,
                      fontWeight: FontWeight.w500,
                    ),
                  ),
                  Container(
                    padding: const EdgeInsets.symmetric(
                      horizontal: 10,
                      vertical: 5,
                    ),
                    decoration: BoxDecoration(
                      borderRadius: BorderRadius.circular(10),
                      color: const Color.fromARGB(255, 255, 100, 121),
                    ),
                    child: const Text(
                      '% On sale',
                      style: TextStyle(fontSize: 12, color: Colors.white),
                    ),
                  ),
                ],
              ),
              space,
              Row(
                children: [
                  Container(
                    padding:
                        const EdgeInsets.symmetric(horizontal: 5, vertical: 2),
                    decoration: BoxDecoration(
                      borderRadius: BorderRadius.circular(20),
                      border: Border.all(width: 1, color: Colors.grey),
                    ),
                    child: Row(children: [
                      const Icon(
                        Icons.star,
                        size: 18.0,
                        color: Colors.orangeAccent,
                      ),
                      Text('$rating')
                    ]),
                  ),
                  const SizedBox(
                    width: 10,
                  ),
                  const Text('117 Reviews')
                ],
              ),
              space,
              const Text(
                  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec non lorem id massa iaculis vestibulum. Vivamus nunc velit, pretium ac consequat eget, tempus laoreet lacus.'),
              space,
              Row(
                children: [
                  Text(
                    '\$$price',
                    style: const TextStyle(
                      fontWeight: FontWeight.w600,
                      fontSize: 20,
                    ),
                  ),
                  const SizedBox(
                    width: 30,
                  ),
                  Expanded(
                    child: ElevatedButton(
                      onPressed: () {
                        addProduct();
                        productMessage("Product added.");
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
                        'Add to Cart',
                        style: TextStyle(
                          color: Colors.white,
                        ),
                      ),
                    ),
                  )
                ],
              )
            ],
          ),
        ),
      ),
    );
  }
}
