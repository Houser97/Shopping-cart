import 'package:flutter/material.dart';
import 'package:flutter_version/pages/product_details.dart';

class ProductCard extends StatelessWidget {
  final String title;
  final double price;
  final double rating;
  final String image;
  const ProductCard({
    super.key,
    required this.title,
    required this.price,
    required this.image,
    required this.rating,
  });

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: 140,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          GestureDetector(
            onTap: () {
              Navigator.of(context).push(MaterialPageRoute(builder: (context) {
                return ProductDetails(
                    image: image, price: price, rating: rating, title: title);
              }));
            },
            child: Container(
              width: double.infinity,
              decoration: const BoxDecoration(
                  color: Color.fromRGBO(240, 242, 241, 1),
                  borderRadius: BorderRadius.all(Radius.circular(16))),
              child: Image.asset(
                image,
                height: 150,
              ),
            ),
          ),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                title,
                style: const TextStyle(
                  fontWeight: FontWeight.w400,
                  color: Color.fromARGB(255, 140, 150, 155),
                ),
              ),
              Row(
                children: [
                  const Icon(
                    Icons.star,
                    size: 18.0,
                    color: Colors.orangeAccent,
                  ),
                  const SizedBox(
                    width: 3.0,
                  ),
                  Text(
                    '$rating',
                    style: const TextStyle(
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ],
              )
            ],
          ),
          Text(
            '\$$price',
            style: const TextStyle(
              fontWeight: FontWeight.bold,
              fontSize: 16.0,
            ),
          )
        ],
      ),
    );
  }
}
