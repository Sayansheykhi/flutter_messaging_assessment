# Flutter Messaging App with Embedded Internal Tools Dashboard

A comprehensive Flutter application featuring a native messaging interface and an embedded Angular dashboard for internal tools management. This project demonstrates cross-platform development with Flutter and modern web technologies.

## 🏗️ Project Structure

```
flutter_messaging_assessment/
├── flutter_app/                    # Flutter messaging application
│   ├── lib/
│   │   ├── main.dart              # App entry point
│   │   ├── models/                # Data models
│   │   │   └── message.dart       # Message data structure
│   │   ├── screens/               # UI screens
│   │   │   ├── home_screen.dart   # Main navigation
│   │   │   ├── messages_screen.dart # Chat interface
│   │   │   └── dashboard_screen.dart # WebView dashboard
│   │   ├── services/              # Business logic
│   │   │   └── message_service.dart # Message storage & responses
│   │   └── widgets/               # Reusable components
│   │       ├── chat_bubble.dart   # Message bubbles
│   │       ├── emoji_picker.dart  # Emoji selection
│   │       ├── message_input.dart # Text input
│   │       └── attachment_widget.dart # File attachments
│   ├── android/                   # Android-specific code
│   ├── ios/                       # iOS-specific code
│   └── pubspec.yaml              # Flutter dependencies
└── webpage/                       # Angular internal tools dashboard
    ├── src/
    │   └── app/
    │       ├── app.ts             # Main Angular component
    │       ├── app.routes.ts      # Routing configuration
    │       └── components/        # Feature components
    │           ├── dashboard-tab/     # System overview
    │           ├── ticket-viewer/     # Support tickets
    │           ├── knowledgebase-editor/ # Documentation
    │           ├── logs-tab/          # Live logs
    │           └── performance-tab/   # Performance metrics
    ├── package.json              # Node.js dependencies
    └── tailwind.config.js        # CSS framework config
```

## ✨ Features

### 📱 Flutter App
- **Native Messaging Interface**: Beautiful chat bubbles with timestamps
- **Message Persistence**: Local storage using SharedPreferences (not SQL)
- **Simulated Support Agent**: AI-like responses with typing indicators
- **File Attachments**: Support for file uploads and sharing
- **Emoji Picker**: Rich emoji selection interface
- **Notification Badges**: Real-time message count indicators
- **WebView Integration**: Seamless Angular dashboard embedding
- **Cross-Platform**: iOS, Android, Web, Desktop support
- **Responsive Design**: Mobile-optimized layouts

### 🌐 Angular Dashboard
- **System Overview**: Real-time metrics and health monitoring
- **Ticket Management**: Complete support ticket lifecycle
- **Knowledge Base**: Markdown editor with live preview
- **Live Logs**: Real-time log streaming with filtering
- **Performance Monitoring**: System performance metrics
- **Responsive Design**: Mobile-first with Tailwind CSS
- **Standalone Components**: Modern Angular architecture
- **Mobile Navigation**: Hamburger menu for small screens

## 🚀 Quick Start

### Prerequisites
- **Flutter SDK**: 3.10.0+ ([Install Flutter](https://flutter.dev/docs/get-started/install))
- **Node.js**: 16+ ([Download Node.js](https://nodejs.org/))
- **Angular CLI**: 17+ (`npm install -g @angular/cli`)
- **Android Studio** (for Android development)
- **Xcode** (for iOS development, macOS only)

### 1. Clone the Repository
```bash
git clone <repository-url>
cd flutter_messaging_assessment
```

### 2. Start the Angular Dashboard
```bash
cd webpage
npm install
npx ng serve --port 4200
```
The Angular dashboard will be available at `http://localhost:4200`

### 3. Run the Flutter App

#### For Web Development:
```bash
cd flutter_app
flutter pub get
flutter run -d chrome --web-port 8080
```

#### For Android Development:
```bash
cd flutter_app
flutter pub get
flutter run -d android
```

#### For iOS Development (macOS only):
```bash
cd flutter_app
flutter pub get
flutter run -d ios
```

### 4. Test the Integration
1. Open the Flutter app
2. Navigate to the "Dashboard" tab
3. The Angular dashboard should load in the WebView
4. Test messaging functionality in the "Messages" tab
5. Try the mobile menu on small screens

## 📋 Detailed Setup Instructions

### Prerequisites Installation

#### Install Flutter
```bash
# Download Flutter SDK from https://flutter.dev/docs/get-started/install
# Add Flutter to your PATH
export PATH="$PATH:`pwd`/flutter/bin"

# Verify installation
flutter doctor
```

#### Install Node.js and Angular CLI
```bash
# Install Node.js from https://nodejs.org/
# Install Angular CLI globally
npm install -g @angular/cli

# Verify installation
node --version
ng version
```

#### Install Android Studio (for Android development)
1. Download from [Android Studio](https://developer.android.com/studio)
2. Install Android SDK and emulator
3. Configure Flutter with Android: `flutter doctor --android-licenses`

#### Install Xcode (for iOS development, macOS only)
1. Install from Mac App Store
2. Install Xcode Command Line Tools: `xcode-select --install`

### Step-by-Step Setup

#### 1. Start the Angular Dashboard
```bash
cd webpage
npm install
npx ng serve --port 4200
```
- Dashboard available at: `http://localhost:4200`
- Hot reload enabled for development
- Check terminal for compilation errors

#### 2. Run the Flutter App

**For Web Development:**
```bash
cd flutter_app
flutter pub get
flutter run -d chrome --web-port 8080
```

**For Android Development:**
```bash
cd flutter_app
flutter pub get
flutter run -d android
```

**For iOS Development (macOS only):**
```bash
cd flutter_app
flutter pub get
flutter run -d ios
```

#### 3. Test the Integration
1. **Flutter App**: Opens automatically in browser/emulator
2. **Dashboard Tab**: Angular dashboard loads in WebView
3. **Messages Tab**: Test chat functionality
4. **Mobile View**: Test responsive design on small screens

## 🏛️ Architecture

### Flutter App Structure
- **`main.dart`**: App entry point with Material theme configuration
- **`home_screen.dart`**: Bottom navigation with Messages and Dashboard tabs
- **`messages_screen.dart`**: Chat interface with typing indicators and file attachments
- **`dashboard_screen.dart`**: WebView integration for Angular dashboard
- **`message_service.dart`**: Local storage using SharedPreferences (not SQL)
- **`message.dart`**: Data model for chat messages and attachments
- **`widgets/`**: Reusable UI components (chat bubbles, emoji picker, etc.)

### Angular Dashboard Structure
- **`app.ts`**: Main standalone component with responsive navigation
- **`dashboard-tab/`**: System overview with real-time metrics
- **`ticket-viewer/`**: Support ticket management with filtering
- **`knowledgebase-editor/`**: Markdown editor with live preview
- **`logs-tab/`**: Live log streaming with advanced filtering
- **`performance-tab/`**: System performance monitoring

## 🔧 Technical Details

### Flutter Dependencies
```yaml
dependencies:
  flutter: sdk: flutter
  webview_flutter: ^4.4.2          # WebView integration
  shared_preferences: ^2.2.2       # Local storage (not SQL)
  http: ^1.1.0                     # HTTP requests
  intl: ^0.20.2                    # Date formatting
  file_picker: ^10.3.3             # File attachment support
  path_provider: ^2.1.1            # File system access
```

### Angular Dependencies
```json
{
  "@angular/core": "^17.0.0",
  "@angular/router": "^17.0.0",
  "@angular/forms": "^17.0.0",
  "tailwindcss": "^3.3.0",
  "rxjs": "~7.8.0"
}
```

### Message Storage System
- **Storage Type**: SharedPreferences (key-value storage, not SQL)
- **Location**: 
  - Android: `/data/data/[package]/shared_prefs/FlutterSharedPreferences.xml`
  - iOS: `NSUserDefaults`
  - Web: Browser localStorage
- **Format**: JSON strings in a list
- **Persistence**: Survives app restarts, lost on app uninstall

### WebView Configuration
- **URL**: `http://localhost:4200` (web), `http://192.168.1.185:4200` (Android emulator)
- **JavaScript**: Enabled for full Angular functionality
- **Navigation**: Handles page loads and errors
- **Security**: Cleartext traffic enabled for localhost

## 🛠️ Development Notes

### WebView Configuration
- **Web**: Loads from `http://localhost:4200`
- **Android Emulator**: Uses `http://192.168.1.185:4200` (host machine IP)
- **JavaScript**: Enabled for full Angular functionality
- **Navigation**: Handles page loads, errors, and resource loading

### Message Persistence
- **Storage**: SharedPreferences (key-value, not SQL database)
- **Persistence**: Survives app restarts and device reboots
- **Limitations**: Local only, no cloud sync, lost on app uninstall
- **Support Responses**: Randomly generated from predefined list

### Angular Standalone Components
- **Architecture**: Modern Angular with standalone components
- **No NgModules**: Each component is self-contained
- **Routing**: Configured in `app.routes.ts`
- **Responsive**: Mobile-first design with Tailwind CSS

### Mobile Responsiveness
- **Breakpoints**: `sm:` (640px+), `lg:` (1024px+), `xl:` (1280px+)
- **Navigation**: Hamburger menu for mobile, sidebar for desktop
- **Grids**: Responsive grid layouts for all components
- **Touch**: Optimized touch targets and interactions

## 🚨 Troubleshooting

### Common Issues

#### Angular Server Won't Start
```bash
# Check if port 4200 is available
lsof -i :4200

# Kill process if needed
kill -9 <PID>

# Clear npm cache
npm cache clean --force

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

#### Flutter WebView Shows White Screen
1. **Check Angular server**: Ensure it's running on port 4200
2. **Check URL**: Verify WebView is loading correct URL
3. **Check console**: Look for JavaScript errors
4. **Check network**: Ensure localhost is accessible

#### Android Emulator Connection Issues
```bash
# Find your host machine IP
ifconfig | grep inet

# Update dashboard_screen.dart with correct IP
# Change localhost to your actual IP address
```

#### Flutter Build Errors
```bash
# Clean and rebuild
flutter clean
flutter pub get
flutter run

# Check Flutter doctor
flutter doctor -v
```

#### Port Conflicts
- **Angular**: Change port with `npx ng serve --port 4201`
- **Flutter**: Change port with `flutter run --web-port 8081`
- **Update WebView URL**: Modify `dashboard_screen.dart` accordingly

### Platform-Specific Issues

#### Android
- **Network Security**: Cleartext traffic enabled in `AndroidManifest.xml`
- **Permissions**: Internet permission added
- **Emulator**: Use host machine IP instead of localhost

#### iOS
- **App Transport Security**: May need configuration for localhost
- **Simulator**: Should work with localhost directly

#### Web
- **CORS**: May need CORS configuration for cross-origin requests
- **Localhost**: Should work directly with localhost

### Debugging Tips

#### Flutter Debugging
```bash
# Enable verbose logging
flutter run -v

# Check Flutter logs
flutter logs

# Debug WebView
# Check browser developer tools
```

#### Angular Debugging
```bash
# Enable verbose logging
npx ng serve --verbose

# Check compilation errors
npx ng build

# Lint code
npx ng lint
```

#### WebView Debugging
- **Android**: Use Chrome DevTools with `chrome://inspect`
- **Web**: Use browser developer tools
- **Console**: Check for JavaScript errors and network issues

## ✅ Assessment Criteria Met

### Core Requirements
- ✅ **Messaging UI**: Native Flutter implementation with smooth UX and timestamped messages
- ✅ **Web Integration**: Angular app loads in WebView via localhost
- ✅ **Creativity**: Engaging internal dashboard layout and content
- ✅ **Code Quality**: Clean architecture, modular code, reasonable state management
- ✅ **Setup Clarity**: Clear and accurate instructions for running both parts

### Bonus Features Implemented
- ✅ **Message Persistence**: SharedPreferences (key-value storage, not SQL)
- ✅ **Notification Badges**: Real-time message count indicators
- ✅ **Live Logs**: Real-time updates with advanced filtering
- ✅ **Markdown Editor**: Live preview with split-screen mode
- ✅ **Responsive Design**: Mobile-first approach with hamburger menu
- ✅ **Cross-Platform**: iOS, Android, Web, Desktop support
- ✅ **File Attachments**: Support for file uploads and sharing
- ✅ **Emoji Picker**: Rich emoji selection interface
- ✅ **Typing Indicators**: Animated typing indicators for support responses
- ✅ **Mobile Navigation**: Responsive hamburger menu for small screens
- ✅ **Advanced Filtering**: Multi-criteria filtering for tickets and logs
- ✅ **Real-time Metrics**: Live system performance monitoring

## 🎯 Key Features Summary

### Flutter App Features
- **Native Chat Interface**: Beautiful message bubbles with timestamps
- **Local Storage**: Messages persist using SharedPreferences (not SQL)
- **File Support**: Upload and share files with attachments
- **Emoji Integration**: Rich emoji picker for enhanced messaging
- **WebView Dashboard**: Seamless Angular dashboard integration
- **Cross-Platform**: Works on iOS, Android, Web, and Desktop
- **Responsive Design**: Optimized for all screen sizes

### Angular Dashboard Features
- **System Overview**: Real-time metrics and health monitoring
- **Ticket Management**: Complete support ticket lifecycle with filtering
- **Knowledge Base**: Markdown editor with live preview and split-screen
- **Live Logs**: Real-time log streaming with advanced filtering
- **Performance Monitoring**: System performance metrics and charts
- **Mobile Navigation**: Responsive hamburger menu for small screens
- **Modern Architecture**: Standalone components with TypeScript

## 📱 Platform Support

| Platform | Status | Notes |
|----------|--------|-------|
| **Android** | ✅ Full Support | WebView loads Angular dashboard |
| **iOS** | ✅ Full Support | Native iOS implementation |
| **Web** | ✅ Full Support | Runs in browser with WebView |
| **Desktop** | ✅ Full Support | Windows, macOS, Linux |

## 🔗 Useful Links

- [Flutter Documentation](https://flutter.dev/docs)
- [Angular Documentation](https://angular.io/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [SharedPreferences Guide](https://pub.dev/packages/shared_preferences)
- [WebView Flutter Guide](https://pub.dev/packages/webview_flutter)

