import 'package:flutter/material.dart';
import 'package:flutter_version/widgets/categories.dart';
import 'package:flutter_version/widgets/constants.dart';
import 'package:flutter_version/widgets/hero_card.dart';
import 'package:flutter_version/widgets/product_card.dart';
import 'package:flutter_version/widgets/search.dart';

class ProductList extends StatefulWidget {
  const ProductList({super.key});

  @override
  State<ProductList> createState() => _ProductListState();
}

class _ProductListState extends State<ProductList> {
  List<Map<String, dynamic>> filteredProducts = products;
  String selectedFilter = 'All';

  void updateProducts(String filter) {
    setState(() {
      selectedFilter = filter;
      if (selectedFilter == 'All') {
        filteredProducts = products;
      } else {
        filteredProducts = products
            .where((product) => (product['categories'] as List<String>)
                .contains(selectedFilter))
            .toList();
      }
    });
  }

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
            const Search(),
            const SizedBox(
              height: 30,
            ),
            const HeroCard(),
            const SizedBox(
              height: 10,
            ),
            Categories(
              updateProducts: updateProducts,
              selectedCategory: selectedFilter,
            ),
            const SizedBox(
              height: 10,
            ),
            GridView.builder(
                shrinkWrap:
                    true, // Le permite ocupar solo el espacio que necesita.
                physics: const NeverScrollableScrollPhysics(),
                itemCount: filteredProducts.length,
                gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
                  crossAxisCount: 2,
                  mainAxisSpacing: 2,
                  crossAxisSpacing: 15,
                  childAspectRatio: MediaQuery.of(context).size.width /
                      (MediaQuery.of(context).size.height / 1.3),
                ),
                itemBuilder: (context, index) {
                  final title = filteredProducts[index]['title'];
                  final price = filteredProducts[index]['price'];
                  final rating = filteredProducts[index]['rating'];
                  final image = filteredProducts[index]['image'];
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
