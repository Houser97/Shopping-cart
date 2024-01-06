import 'package:flutter/material.dart';

class Search extends StatelessWidget {
  const Search({super.key});

  @override
  Widget build(BuildContext context) {
    const fillColor = Color.fromRGBO(240, 242, 241, 1);

    const border = OutlineInputBorder(
      borderSide: BorderSide(color: fillColor),
      borderRadius: BorderRadius.all(Radius.circular(10)),
    );

    return const TextField(
      decoration: InputDecoration(
        hintText: 'Search',
        suffixIcon: Icon(Icons.search),
        border: border,
        enabledBorder: border,
        focusedBorder: border,
        filled: true,
        fillColor: fillColor,
      ),
    );
  }
}
