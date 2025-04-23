import { Html5Qrcode } from "html5-qrcode";
import { useEffect } from "react";

export default function BarcodeScanner({ onScan, cameraId }) {
  useEffect(() => {
    if (!cameraId) return;
    const html5Qr = new Html5Qrcode("reader");

    html5Qr.start(
      cameraId,
      { fps: 10, qrbox: { width: 250, height: 250 } },
      (decodedText) => {
        onScan(decodedText);
        html5Qr.stop().then(() => html5Qr.clear());
      },
      (errorMessage) => {
        // ignore errors
      }
    );

    return () => {
      html5Qr.stop().then(() => html5Qr.clear()).catch(() => {});
    };
  }, [cameraId, onScan]);

  return <div id="reader" className="my-4" />;
}