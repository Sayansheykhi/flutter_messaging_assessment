class Message {
  final String id;
  final String content;
  final DateTime timestamp;
  final bool isFromUser;
  final MessageAttachment? attachment;

  Message({
    required this.id,
    required this.content,
    required this.timestamp,
    required this.isFromUser,
    this.attachment,
  });

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'content': content,
      'timestamp': timestamp.millisecondsSinceEpoch,
      'isFromUser': isFromUser,
      'attachment': attachment?.toJson(),
    };
  }

  factory Message.fromJson(Map<String, dynamic> json) {
    return Message(
      id: json['id'],
      content: json['content'],
      timestamp: DateTime.fromMillisecondsSinceEpoch(json['timestamp']),
      isFromUser: json['isFromUser'],
      attachment: json['attachment'] != null 
          ? MessageAttachment.fromJson(json['attachment'])
          : null,
    );
  }
}

class MessageAttachment {
  final String fileName;
  final String filePath;
  final String fileType;
  final int fileSize;
  final String? thumbnailPath;

  MessageAttachment({
    required this.fileName,
    required this.filePath,
    required this.fileType,
    required this.fileSize,
    this.thumbnailPath,
  });

  Map<String, dynamic> toJson() {
    return {
      'fileName': fileName,
      'filePath': filePath,
      'fileType': fileType,
      'fileSize': fileSize,
      'thumbnailPath': thumbnailPath,
    };
  }

  factory MessageAttachment.fromJson(Map<String, dynamic> json) {
    return MessageAttachment(
      fileName: json['fileName'],
      filePath: json['filePath'],
      fileType: json['fileType'],
      fileSize: json['fileSize'],
      thumbnailPath: json['thumbnailPath'],
    );
  }

  String get fileExtension {
    return fileName.split('.').last.toLowerCase();
  }

  bool get isImage {
    return ['jpg', 'jpeg', 'png', 'gif', 'webp', 'bmp'].contains(fileExtension);
  }

  bool get isVideo {
    return ['mp4', 'avi', 'mov', 'wmv', 'flv', 'webm'].contains(fileExtension);
  }

  bool get isAudio {
    return ['mp3', 'wav', 'aac', 'flac', 'ogg', 'm4a'].contains(fileExtension);
  }

  bool get isDocument {
    return ['pdf', 'doc', 'docx', 'txt', 'rtf', 'odt'].contains(fileExtension);
  }

  String get formattedFileSize {
    if (fileSize < 1024) {
      return '${fileSize}B';
    } else if (fileSize < 1024 * 1024) {
      return '${(fileSize / 1024).toStringAsFixed(1)}KB';
    } else {
      return '${(fileSize / (1024 * 1024)).toStringAsFixed(1)}MB';
    }
  }
}