import 'dart:convert';
import 'dart:math';
import 'package:shared_preferences/shared_preferences.dart';
import '../models/message.dart';

class MessageService {
  static const String _messagesKey = 'messages';
  static const List<String> _supportResponses = [
    "Hi! How can I help you today?",
    "Thanks for reaching out. Let me look into that for you.",
    "I understand your concern. Let me assist you with that.",
    "Great question! Here's what I can tell you...",
    "I'm here to help! Can you provide more details?",
    "That's a common issue. Here's how to resolve it:",
    "Let me check our records and get back to you.",
    "I appreciate your patience. Here's the solution:",
  ];

  Future<List<Message>> loadMessages() async {
    final prefs = await SharedPreferences.getInstance();
    final messagesJson = prefs.getStringList(_messagesKey) ?? [];
    return messagesJson
        .map((json) => Message.fromJson(jsonDecode(json)))
        .toList();
  }

  Future<void> saveMessages(List<Message> messages) async {
    final prefs = await SharedPreferences.getInstance();
    final messagesJson = messages
        .map((message) => jsonEncode(message.toJson()))
        .toList();
    await prefs.setStringList(_messagesKey, messagesJson);
  }

  Future<Message> generateSupportResponse() async {
    await Future.delayed(const Duration(seconds: 1, milliseconds: 500));
    final random = Random();
    final response = _supportResponses[random.nextInt(_supportResponses.length)];
    
    return Message(
      id: DateTime.now().millisecondsSinceEpoch.toString(),
      content: response,
      timestamp: DateTime.now(),
      isFromUser: false,
    );
  }
}