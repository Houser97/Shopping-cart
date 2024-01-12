import 'package:flutter/material.dart';
import 'package:flutter_version/widgets/categories.dart';
import 'package:flutter_version/widgets/constants.dart';
import 'package:flutter_version/widgets/hero_card.dart';
import 'package:flutter_version/widgets/product_card.dart';
import 'package:flutter_version/widgets/search.dart';

class ProductList extends StatelessWidget {
  const ProductList({super.key});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 10, horizontal: 10),
      child: SingleChildScrollView(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text(
              'Discover',
              style: TextStyle(
                fontSize: 20,
                fontWeight: FontWeight.bold,
              ),
            ),
            const SizedBox(
              height: 10,
            ),
            Search(),
            const SizedBox(
              height: 30,
            ),
            const HeroCard(),
            const SizedBox(
              height: 10,
            ),
            Categories(),
            const SizedBox(
              height: 10,
            ),
            GridView.builder(
                shrinkWrap:
                    true, // Le permite ocupar solo el espacio que necesita.
                physics: const NeverScrollableScrollPhysics(),
                itemCount: products.length,
                gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
                  crossAxisCount: 2,
                  mainAxisSpacing: 2,
                  crossAxisSpacing: 15,
                  childAspectRatio: MediaQuery.of(context).size.width /
                      (MediaQuery.of(context).size.height / 1.5),
                ),
                itemBuilder: (context, index) {
                  final title = products[index]['title'];
                  final price = products[index]['price'];
                  final rating = products[index]['rating'];
                  final image = products[index]['image'];
                  return ProductCard(
                    title: title as String,
                    price: price as double,
                    image: image as String,
                    rating: rating as double,
                  );
                })
          ],
        ),
      ),
    );
  }
}
