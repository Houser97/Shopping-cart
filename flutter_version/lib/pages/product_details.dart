import 'package:flutter/material.dart';

class ProductDetails extends StatelessWidget {
  final String image;
  final String title;
  final double price;
  final double rating;
  const ProductDetails({
    super.key,
    required this.image,
    required this.price,
    required this.rating,
    required this.title,
  });

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(),
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.all(8.0),
          child: Column(
            children: [
              SizedBox(
                width: double.infinity,
                child: Image.asset(image),
              ),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceAround,
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
