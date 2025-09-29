import 'dart:html' as html;
import 'dart:ui' as ui;

void registerDashboardIframe() {
  ui.platformViewRegistry.registerViewFactory(
    'dashboard-iframe',
    (int viewId) {
      final iframe = html.IFrameElement()
        ..src = 'http://localhost:4200'
        ..style.border = 'none'
        ..style.width = '100%'
        ..style.height = '100%'
        ..allowFullscreen = true;
      return iframe;
    },
  );
}
