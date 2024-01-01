import 'package:flutter/material.dart';

class Categories extends StatefulWidget {
  const Categories({super.key});

  @override
  State<Categories> createState() => _CategoriesState();
}

class _CategoriesState extends State<Categories> {
  final categories = ['All', 'Smartphones', 'Laptops', 'Headphones'];
  late String selectedCategory;

  @override
  void initState() {
    super.initState();
    selectedCategory = categories[0];
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const Text(
          'Categories',
          style: TextStyle(
            fontSize: 18,
            fontWeight: FontWeight.w600,
          ),
        ),
        SizedBox(
          height: 50,
          child: ListView.builder(
              scrollDirection: Axis.horizontal,
              itemCount: categories.length,
              itemBuilder: (context, index) {
                final category = categories[index];
                return GestureDetector(
                  onTap: () {
                    setState(() {
                      selectedCategory = category;
                    });
                  },
                  child: Padding(
                    padding:
                        const EdgeInsets.symmetric(horizontal: 10, vertical: 5),
                    child: Chip(
                      label: Text(
                        category,
                        style: TextStyle(
                            color: selectedCategory == category
                                ? Colors.white
                                : Colors.black),
                      ),
                      backgroundColor: selectedCategory == category
                          ? Theme.of(context).colorScheme.primary
                          : Colors.transparent,
                      side: BorderSide(
                        width: 1.5,
                        color: selectedCategory == category
                            ? Theme.of(context).colorScheme.primary
                            : Colors.black,
                      ),
                      shape: const RoundedRectangleBorder(
                        borderRadius: BorderRadius.all(
                          Radius.circular(9),
                        ),
                      ),
                    ),
                  ),
                );
              }),
        )
      ],
    );
  }
}
