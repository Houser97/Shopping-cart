import 'package:flutter/material.dart';

class Search extends StatefulWidget {
  const Search({super.key});

  @override
  State<Search> createState() => _SearchState();
}

class _SearchState extends State<Search> {
  TextEditingController _searchTextController = new TextEditingController();

  @override
  void initState() {
    super.initState();
    _searchTextController.addListener(() {
      print(_searchTextController.text);
      setState(() {});
    });
  }

  @override
  void dispose() {
    _searchTextController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    const fillColor = Color.fromRGBO(240, 242, 241, 1);

    const border = OutlineInputBorder(
      borderSide: BorderSide(color: fillColor),
      borderRadius: BorderRadius.all(Radius.circular(10)),
    );

    return TextField(
      controller: _searchTextController,
      decoration: const InputDecoration(
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
