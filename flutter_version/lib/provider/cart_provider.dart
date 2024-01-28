import 'package:flutter/material.dart';

class CartProvider extends ChangeNotifier {
  final List<Map<String, dynamic>> cart = [];

  void addProduct(Map<String, dynamic> product) {
    cart.add(product);
    notifyListeners();
  }

  void removeProductById(int productId) {
    cart.removeWhere((product) => product['id'] == productId);
    notifyListeners();
  }

  void increaseProductQuantity(int productId) {
    Map<String, dynamic> product =
        cart.firstWhere((element) => element['id'] == productId);

    product['quantity'] += 1;
    notifyListeners();
  }

  void decreaseProductQuantity(int productId) {
    Map<String, dynamic> product =
        cart.firstWhere((element) => element['id'] == productId);

    product['quantity'] -= 1;
    notifyListeners();
  }
}
