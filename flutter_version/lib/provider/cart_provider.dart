import 'package:flutter/material.dart';

class CartProvider extends ChangeNotifier {
  final Map<int, Map<String, dynamic>> cart = {};

  void addProduct(Map<String, dynamic> product) {
    final int productId = product['id'];
    if (cart.containsKey(productId)) {
      cart[productId]!['quantity'] += 1;
    } else {
      cart[productId] = Map.from(product);
      cart[productId]!['quantity'] = 1;
    }
    notifyListeners();
  }

  void removeProductById(int productId) {
    cart.remove(productId);
    notifyListeners();
  }

  void increaseProductQuantity(int productId) {
    if (cart.containsKey(productId)) {
      cart[productId]!['quantity'] += 1;
      notifyListeners();
    }
  }

  void decreaseProductQuantity(int productId) {
    int currentQty = cart[productId]!['quantity'];
    if (currentQty > 1) {
      cart[productId]!['quantity'] -= 1;
      notifyListeners();
    }
  }

  void checkout() {
    cart.clear();
    notifyListeners();
  }
}
