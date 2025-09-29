import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'package:file_picker/file_picker.dart';
import '../models/message.dart';
import '../services/message_service.dart';
import '../widgets/chat_bubble.dart';
import '../widgets/emoji_picker.dart';

class MessagesScreen extends StatefulWidget {
  final Function(int)? onNewMessage;
  
  const MessagesScreen({super.key, this.onNewMessage});

  @override
  State<MessagesScreen> createState() => _MessagesScreenState();
}

class _MessagesScreenState extends State<MessagesScreen> with TickerProviderStateMixin {
  final List<Message> _messages = [];
  final ScrollController _scrollController = ScrollController();
  final MessageService _messageService = MessageService();
  bool _isLoading = true;
  bool _isTyping = false;
  bool _showEmojiPicker = false;
  late AnimationController _typingController;
  late Animation<double> _typingAnimation;
  final TextEditingController _messageController = TextEditingController();

  @override
  void initState() {
    super.initState();
    _typingController = AnimationController(
      duration: const Duration(milliseconds: 1500),
      vsync: this,
    );
    _typingAnimation = Tween<double>(
      begin: 0.0,
      end: 1.0,
    ).animate(CurvedAnimation(
      parent: _typingController,
      curve: Curves.easeInOut,
    ));
    _loadMessages();
  }

  Future<void> _loadMessages() async {
    final messages = await _messageService.loadMessages();
    setState(() {
      _messages.addAll(messages);
      _isLoading = false;
    });
    _scrollToBottom();
  }

  void _scrollToBottom({bool animated = true}) {
    WidgetsBinding.instance.addPostFrameCallback((_) {
      if (_scrollController.hasClients) {
        if (animated) {
          _scrollController.animateTo(
            _scrollController.position.maxScrollExtent,
            duration: const Duration(milliseconds: 300),
            curve: Curves.easeOut,
          );
        } else {
          _scrollController.jumpTo(_scrollController.position.maxScrollExtent);
        }
      }
    });
  }

  Future<void> _sendMessage(String content) async {
    if (content.trim().isEmpty) return;

    final userMessage = Message(
      id: DateTime.now().millisecondsSinceEpoch.toString(),
      content: content,
      timestamp: DateTime.now(),
      isFromUser: true,
    );

    setState(() {
      _messages.add(userMessage);
      _messageController.clear();
      _showEmojiPicker = false;
    });

    _scrollToBottom();
    await _messageService.saveMessages(_messages);

    // Show typing indicator
    setState(() {
      _isTyping = true;
    });
    _typingController.repeat();

    // Generate support response
    final supportResponse = await _messageService.generateSupportResponse();
    
    setState(() {
      _isTyping = false;
      _messages.add(supportResponse);
    });
    _typingController.stop();

    _scrollToBottom();
    await _messageService.saveMessages(_messages);
    
    // Notify parent about new message
    widget.onNewMessage?.call(_messages.length);
  }

  void _onEmojiSelected(String emoji) {
    final currentText = _messageController.text;
    final newText = currentText + emoji;
    _messageController.text = newText;
    _messageController.selection = TextSelection.fromPosition(
      TextPosition(offset: newText.length),
    );
  }

  Future<void> _pickFile() async {
    try {
      FilePickerResult? result = await FilePicker.platform.pickFiles(
        type: FileType.any,
        allowMultiple: false,
      );

      if (result != null && result.files.isNotEmpty) {
        final file = result.files.first;
        
        if (file.path != null) {
          final attachment = MessageAttachment(
            fileName: file.name,
            filePath: file.path!,
            fileType: file.extension ?? 'unknown',
            fileSize: file.size,
          );

          final message = Message(
            id: DateTime.now().millisecondsSinceEpoch.toString(),
            content: _messageController.text.trim(),
            timestamp: DateTime.now(),
            isFromUser: true,
            attachment: attachment,
          );

          setState(() {
            _messages.add(message);
            _messageController.clear();
            _showEmojiPicker = false;
          });

          _scrollToBottom();
          await _messageService.saveMessages(_messages);

          // Show typing indicator
          setState(() {
            _isTyping = true;
          });
          _typingController.repeat();

          // Generate support response
          final supportResponse = await _messageService.generateSupportResponse();
          
          setState(() {
            _isTyping = false;
            _messages.add(supportResponse);
          });
          _typingController.stop();

          _scrollToBottom();
          await _messageService.saveMessages(_messages);
          
          // Notify parent about new message
          widget.onNewMessage?.call(_messages.length);
        }
      }
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text('Error picking file: $e'),
            backgroundColor: Colors.red,
          ),
        );
      }
    }
  }

  Widget _buildTypingIndicator() {
    return Container(
      margin: const EdgeInsets.symmetric(vertical: 2, horizontal: 16),
      child: Row(
        children: [
          Container(
            width: 32,
            height: 32,
            decoration: BoxDecoration(
              color: Colors.blue[100],
              shape: BoxShape.circle,
            ),
            child: Icon(
              Icons.support_agent,
              size: 18,
              color: Colors.blue[700],
            ),
          ),
          const SizedBox(width: 8),
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
            decoration: BoxDecoration(
              color: Colors.grey[100],
              borderRadius: BorderRadius.circular(20).copyWith(
                bottomLeft: const Radius.circular(6),
              ),
              boxShadow: [
                BoxShadow(
                  color: Colors.black.withValues(alpha: 0.05),
                  blurRadius: 4,
                  offset: const Offset(0, 2),
                ),
              ],
            ),
            child: AnimatedBuilder(
              animation: _typingAnimation,
              builder: (context, child) {
                return Row(
                  mainAxisSize: MainAxisSize.min,
                  children: List.generate(3, (index) {
                    final delay = index * 0.2;
                    final animationValue = (_typingAnimation.value - delay).clamp(0.0, 1.0);
                    final opacity = (animationValue * 2).clamp(0.0, 1.0);
                    if (animationValue > 0.5) {
                      final reverseValue = (1.0 - animationValue) * 2;
                      return Opacity(
                        opacity: reverseValue.clamp(0.0, 1.0),
                        child: Container(
                          width: 8,
                          height: 8,
                          margin: const EdgeInsets.symmetric(horizontal: 2),
                          decoration: BoxDecoration(
                            color: Colors.grey[600]!,
                            shape: BoxShape.circle,
                          ),
                        ),
                      );
                    }
                    return Container(
                      width: 8,
                      height: 8,
                      margin: const EdgeInsets.symmetric(horizontal: 2),
                      decoration: BoxDecoration(
                        color: Colors.grey[600]?.withValues(alpha: opacity),
                        shape: BoxShape.circle,
                      ),
                    );
                  }),
                );
              },
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildDateSeparator(DateTime date) {
    final now = DateTime.now();
    final today = DateTime(now.year, now.month, now.day);
    final messageDate = DateTime(date.year, date.month, date.day);
    
    String dateText;
    if (messageDate == today) {
      dateText = 'Today';
    } else if (messageDate == today.subtract(const Duration(days: 1))) {
      dateText = 'Yesterday';
    } else {
      dateText = DateFormat('MMM dd, yyyy').format(date);
    }

    return Container(
      margin: const EdgeInsets.symmetric(vertical: 16),
      child: Row(
        children: [
          Expanded(child: Divider(color: Colors.grey[300])),
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 16),
            child: Text(
              dateText,
              style: TextStyle(
                color: Colors.grey[600],
                fontSize: 12,
                fontWeight: FontWeight.w500,
              ),
            ),
          ),
          Expanded(child: Divider(color: Colors.grey[300])),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        decoration: const BoxDecoration(
          gradient: LinearGradient(
            colors: [Color(0xFF0A0A0A), Color(0xFF1A1A2E), Color(0xFF16213E)],
            begin: Alignment.topCenter,
            end: Alignment.bottomCenter,
          ),
        ),
        child: SafeArea(
          child: Column(
            children: [
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 16),
                child: Row(
                  children: [
                    IconButton(
                      icon: const Icon(Icons.arrow_back, color: Colors.white),
                      onPressed: () => Navigator.pop(context),
                    ),
                    const SizedBox(width: 12),
                    const Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            'TurboVets',
                            style: TextStyle(
                              color: Colors.white,
                              fontSize: 20,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                          Text(
                            'AI Assistant',
                            style: TextStyle(
                              color: Colors.grey,
                              fontSize: 14,
                            ),
                          ),
                        ],
                      ),
                    ),
                    IconButton(
                      icon: const Icon(Icons.more_vert, color: Colors.white),
                      onPressed: () {},
                    ),
                  ],
                ),
              ),
              Expanded(
                child: _buildMessagesList(),
              ),
              _buildMessageInput(),
              if (_showEmojiPicker)
                EmojiPicker(onEmojiSelected: _onEmojiSelected),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildMessagesList() {
    if (_isLoading) {
      return Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            CircularProgressIndicator(
              color: Colors.purple[400],
            ),
            const SizedBox(height: 16),
            const Text(
              'Loading messages...',
              style: TextStyle(
                color: Colors.grey,
                fontSize: 16,
              ),
            ),
          ],
        ),
      );
    }

    if (_messages.isEmpty) {
      return Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(
              Icons.chat_bubble_outline,
              size: 64,
              color: Colors.grey[400],
            ),
            const SizedBox(height: 16),
            const Text(
              'Start a conversation',
              style: TextStyle(
                color: Colors.white,
                fontSize: 18,
                fontWeight: FontWeight.w500,
              ),
            ),
            const SizedBox(height: 8),
            Text(
              'Send a message to get started',
              style: TextStyle(
                color: Colors.grey[400],
                fontSize: 14,
              ),
            ),
            const SizedBox(height: 32),
            _buildSupportChoices(),
          ],
        ),
      );
    }

    return ListView.builder(
      controller: _scrollController,
      padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 8),
      itemCount: _messages.length + (_isTyping ? 1 : 0) + (_shouldShowSupportChoices() ? 1 : 0),
      itemBuilder: (context, index) {
        if (index == _messages.length && _isTyping) {
          return _buildTypingIndicator();
        }
        
        if (index == _messages.length + (_isTyping ? 1 : 0) && _shouldShowSupportChoices()) {
          return _buildSupportChoices();
        }
        
        final message = _messages[index];
        final showDateSeparator = index == 0 || 
            _messages[index - 1].timestamp.day != message.timestamp.day ||
            _messages[index - 1].timestamp.month != message.timestamp.month ||
            _messages[index - 1].timestamp.year != message.timestamp.year;

        return Column(
          children: [
            if (showDateSeparator) _buildDateSeparator(message.timestamp),
            ChatBubble(message: message),
          ],
        );
      },
    );
  }

  bool _shouldShowSupportChoices() {
    return _messages.isNotEmpty && 
           _messages.last.isFromUser && 
           !_isTyping &&
           _messages.length % 2 == 1;
  }

  Widget _buildSupportChoices() {
    final supportOptions = [
      {
        'icon': Icons.bug_report,
        'title': 'Report Bug',
        'description': 'Report a technical issue',
        'message': 'I need to report a bug or technical issue'
      },
      {
        'icon': Icons.help_outline,
        'title': 'Get Help',
        'description': 'Need assistance with features',
        'message': 'I need help with using the application'
      },
      {
        'icon': Icons.account_circle,
        'title': 'Account Support',
        'description': 'Account related questions',
        'message': 'I have questions about my account'
      },
      {
        'icon': Icons.lightbulb_outline,
        'title': 'Feature Request',
        'description': 'Suggest new features',
        'message': 'I would like to request a new feature'
      },
    ];

    return Container(
      margin: const EdgeInsets.symmetric(horizontal: 20, vertical: 16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text(
            'Quick Support Options',
            style: TextStyle(
              color: Colors.white,
              fontSize: 16,
              fontWeight: FontWeight.w600,
            ),
          ),
          const SizedBox(height: 12),
          Wrap(
            spacing: 12,
            runSpacing: 12,
            children: supportOptions.map((option) {
              return GestureDetector(
                onTap: () => _sendMessage(option['message'] as String),
                child: Container(
                  padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
                  decoration: BoxDecoration(
                    color: Colors.grey[800]?.withValues(alpha: 0.6),
                    borderRadius: BorderRadius.circular(12),
                    border: Border.all(
                      color: Colors.grey[600]?.withValues(alpha: 0.3) ?? Colors.transparent,
                      width: 1,
                    ),
                  ),
                  child: Row(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      Icon(
                        option['icon'] as IconData,
                        color: Colors.purple[400],
                        size: 18,
                      ),
                      const SizedBox(width: 8),
                      Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        mainAxisSize: MainAxisSize.min,
                        children: [
                          Text(
                            option['title'] as String,
                            style: const TextStyle(
                              color: Colors.white,
                              fontSize: 14,
                              fontWeight: FontWeight.w500,
                            ),
                          ),
                          Text(
                            option['description'] as String,
                            style: TextStyle(
                              color: Colors.grey[400],
                              fontSize: 12,
                            ),
                          ),
                        ],
                      ),
                    ],
                  ),
                ),
              );
            }).toList(),
          ),
        ],
      ),
    );
  }

  Widget _buildMessageInput() {
    return Container(
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        color: const Color(0xFF1A1A2E).withValues(alpha: 0.8),
        border: Border(
          top: BorderSide(
            color: Colors.grey[800]!,
            width: 0.5,
          ),
        ),
      ),
      child: SafeArea(
        child: Row(
          children: [
            IconButton(
              icon: Icon(Icons.attach_file, color: Colors.grey[400]),
              onPressed: _pickFile,
            ),
            IconButton(
              icon: Icon(
                _showEmojiPicker ? Icons.keyboard : Icons.emoji_emotions,
                color: _showEmojiPicker ? Colors.purple[400] : Colors.grey[400],
              ),
              onPressed: () {
                setState(() {
                  _showEmojiPicker = !_showEmojiPicker;
                });
              },
            ),
            Expanded(
              child: Container(
                decoration: BoxDecoration(
                  color: Colors.grey[900],
                  borderRadius: BorderRadius.circular(25),
                ),
                child: TextField(
                  controller: _messageController,
                  style: const TextStyle(color: Colors.white),
                  decoration: InputDecoration(
                    hintText: 'Type a message...',
                    hintStyle: TextStyle(color: Colors.grey[500]),
                    border: InputBorder.none,
                    contentPadding: const EdgeInsets.symmetric(
                      horizontal: 20,
                      vertical: 12,
                    ),
                  ),
                  onSubmitted: (text) {
                    if (text.trim().isNotEmpty) {
                      _sendMessage(text);
                    }
                  },
                ),
              ),
            ),
            const SizedBox(width: 12),
            Container(
              width: 48,
              height: 48,
              decoration: BoxDecoration(
                gradient: const LinearGradient(
                  colors: [Color(0xFF8B5CF6), Color(0xFF6366F1)],
                  begin: Alignment.topLeft,
                  end: Alignment.bottomRight,
                ),
                borderRadius: BorderRadius.circular(24),
                boxShadow: [
                  BoxShadow(
                    color: Colors.purple.withValues(alpha: 0.3),
                    blurRadius: 8,
                    offset: const Offset(0, 2),
                  ),
                ],
              ),
              child: Material(
                color: Colors.transparent,
                child: InkWell(
                  borderRadius: BorderRadius.circular(24),
                  onTap: () {
                    if (_messageController.text.trim().isNotEmpty) {
                      _sendMessage(_messageController.text);
                    }
                  },
                  child: const Icon(
                    Icons.send_rounded,
                    color: Colors.white,
                    size: 20,
                  ),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  @override
  void dispose() {
    _scrollController.dispose();
    _typingController.dispose();
    _messageController.dispose();
    super.dispose();
  }
}