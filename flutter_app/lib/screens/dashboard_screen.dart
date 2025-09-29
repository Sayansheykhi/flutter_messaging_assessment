import 'package:flutter/material.dart';
import 'package:flutter/foundation.dart';
import 'package:webview_flutter/webview_flutter.dart';

class DashboardScreen extends StatefulWidget {
  const DashboardScreen({super.key});

  @override
  State<DashboardScreen> createState() => _DashboardScreenState();
}

class _DashboardScreenState extends State<DashboardScreen> {
  WebViewController? _controller;
  bool _isLoading = true;
  String? _error;

  @override
  void initState() {
    super.initState();
    _initializeWebView();
  }


  void _initializeWebView() {
    try {
      _controller = WebViewController();
      
      // Only set JavaScript mode on non-web platforms
      if (!kIsWeb) {
        _controller!.setJavaScriptMode(JavaScriptMode.unrestricted);
      }
      
      // Only set navigation delegate on non-web platforms
      if (!kIsWeb) {
        _controller!.setNavigationDelegate(
          NavigationDelegate(
            onPageStarted: (String url) {
              print('Page started loading: $url');
              setState(() {
                _isLoading = true;
                _error = null;
              });
            },
            onPageFinished: (String url) {
              print('Page finished loading: $url');
              setState(() {
                _isLoading = false;
                _error = null;
              });
            },
            onWebResourceError: (WebResourceError error) {
              print('WebView error: ${error.description}');
              setState(() {
                _error = 'Failed to load dashboard: ${error.description}';
                _isLoading = false;
              });
            },
          ),
        );
      } else {
        // For web platform, just set loading to false after a delay
        Future.delayed(const Duration(seconds: 2), () {
          if (mounted) {
            setState(() {
              _isLoading = false;
              _error = null;
            });
          }
        });
      }
      
      // Use different URLs based on platform
      final url = kIsWeb ? 'http://localhost:4200' : 'http://10.0.2.2:4200';
      _controller!.loadRequest(Uri.parse(url));
    } catch (e) {
      setState(() {
        _error = 'Failed to initialize WebView: $e';
        _isLoading = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Stack(
        children: [
          if (_error != null)
            Center(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  const Icon(
                    Icons.error_outline,
                    size: 64,
                    color: Colors.red,
                  ),
                  const SizedBox(height: 16),
                  Padding(
                    padding: const EdgeInsets.all(16),
                    child: Text(
                      _error!,
                      textAlign: TextAlign.center,
                      style: Theme.of(context).textTheme.titleMedium,
                    ),
                  ),
                  const SizedBox(height: 16),
                  ElevatedButton(
                    onPressed: _initializeWebView,
                    child: const Text('Retry'),
                  ),
                ],
              ),
            )
          else if (_controller != null)
            WebViewWidget(controller: _controller!),
          if (_isLoading && _error == null)
            const Center(
              child: CircularProgressIndicator(),
            ),
        ],
      ),
    );
  }
}