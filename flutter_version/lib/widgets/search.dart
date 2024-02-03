import 'package:flutter/material.dart';

class Search extends StatefulWidget {
  final void Function(String) updateSearchFilter;
  const Search({super.key, required this.updateSearchFilter});

  @override
  State<Search> createState() => _SearchState();
}

class _SearchState extends State<Search> {
  final TextEditingController _searchTextController = TextEditingController();

  void _search() {
    setState(() {
      widget.updateSearchFilter(_searchTextController.text);
    });
  }

  @override
  void initState() {
    super.initState();
    _searchTextController.addListener(() {
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
      decoration: InputDecoration(
        hintText: 'Search',
        suffixIcon: IconButton(
          onPressed: _search,
          icon: const Icon(Icons.search),
        ),
        border: border,
        enabledBorder: border,
        focusedBorder: border,
        filled: true,
        fillColor: fillColor,
      ),
    );
  }
}
