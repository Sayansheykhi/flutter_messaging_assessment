import 'package:flutter/material.dart';
import 'messages_screen.dart';
import 'dashboard_screen.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  int _selectedIndex = 0;
  int _messageCount = 0;

  final List<Widget> _screens = [
    const MessagesScreen(),
    const DashboardScreen(),
  ];

  void _onItemTapped(int index) {
    setState(() {
      _selectedIndex = index;
      if (index == 0) {
        _messageCount = 0; // Reset badge when viewing messages
      }
    });
  }

  void _updateMessageCount(int count) {
    if (_selectedIndex != 0) {
      setState(() {
        _messageCount = count;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: IndexedStack(
        index: _selectedIndex,
        children: _screens.map((screen) {
          if (screen is MessagesScreen) {
            return MessagesScreen(onNewMessage: _updateMessageCount);
          }
          return screen;
        }).toList(),
      ),
      bottomNavigationBar: Container(
        decoration: BoxDecoration(
          gradient: const LinearGradient(
            colors: [Color(0xFF1A1A2E), Color(0xFF0A0A0A)],
            begin: Alignment.topCenter,
            end: Alignment.bottomCenter,
          ),
          border: Border(
            top: BorderSide(
              color: Colors.grey[800]!,
              width: 0.5,
            ),
          ),
        ),
        child: BottomNavigationBar(
          backgroundColor: Colors.transparent,
          elevation: 0,
          selectedItemColor: Colors.purple[400],
          unselectedItemColor: Colors.grey[400],
          type: BottomNavigationBarType.fixed,
          items: [
            BottomNavigationBarItem(
              icon: _messageCount > 0
                  ? Badge(
                      label: Text('$_messageCount'),
                      child: const Icon(Icons.chat),
                    )
                  : const Icon(Icons.chat),
              label: 'Chat',
            ),
            const BottomNavigationBarItem(
              icon: Icon(Icons.dashboard),
              label: 'Dashboard',
            ),
          ],
          currentIndex: _selectedIndex,
          onTap: _onItemTapped,
        ),
      ),
    );
  }
}