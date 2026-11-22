"use client";

import React, { useEffect, useState } from "react";
import { X, QrCode, Download, ExternalLink, Printer } from "lucide-react";
import QRCode from "qrcode";

interface QRCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetUrl: string;
  storeName: string;
}

export default function QRCodeModal({
  isOpen,
  onClose,
  targetUrl,
  storeName,
}: QRCodeModalProps) {
  const [qrDataUrl, setQrDataUrl] = useState<string>("");

  useEffect(() => {
    if (isOpen && targetUrl) {
      QRCode.toDataURL(targetUrl, {
        width: 320,
        margin: 2,
        color: {
          dark: "#0f172a",
          light: "#ffffff",
        },
      })
        .then((url) => setQrDataUrl(url))
        .catch((err) => console.error("Error generating QR code:", err));
    }
  }, [isOpen, targetUrl]);

  if (!isOpen) return null;

  const handleDownload = () => {
    if (!qrDataUrl) return;
    const link = document.createElement("a");
    link.download = `${storeName.replace(/\s+/g, "-").toLowerCase()}-google-review-qr.png`;
    link.href = qrDataUrl;
    link.click();
  };

  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Scan to Review - ${storeName}</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              text-align: center;
              padding: 40px;
              color: #0f172a;
            }
            .card {
              border: 3px solid #1a73e8;
              border-radius: 24px;
              padding: 40px 30px;
              max-width: 450px;
              margin: 0 auto;
            }
            h1 { font-size: 28px; margin-bottom: 6px; }
            p { font-size: 16px; color: #475569; margin-top: 0; }
            .stars { font-size: 24px; color: #f59e0b; margin: 15px 0; }
            img { width: 280px; height: 280px; margin: 10px 0; }
            .hint { font-size: 14px; font-weight: bold; color: #1a73e8; margin-top: 15px; }
          </style>
        </head>
        <body>
          <div class="card">
            <h1>${storeName}</h1>
            <p>Panchkuva, Ahmedabad</p>
            <div class="stars">★★★★★</div>
            <h3>Scan & Leave a 5-Star Google Review</h3>
            <img src="${qrDataUrl}" />
            <p class="hint">Open your camera to scan & post your review in 10 seconds!</p>
          </div>
          <script>
            window.onload = function() { window.print(); window.close(); }
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-sm bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden text-center">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl mb-2">
            <QrCode className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-slate-900">
            Counter QR Code
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Display this QR at your checkout counter or billing desk for customers to scan!
          </p>

          <div className="my-5 p-4 bg-slate-50 rounded-2xl border border-slate-200 inline-block">
            {qrDataUrl ? (
              <img
                src={qrDataUrl}
                alt={`QR code to review ${storeName}`}
                className="w-56 h-56 mx-auto rounded-xl shadow-sm"
              />
            ) : (
              <div className="w-56 h-56 flex items-center justify-center text-slate-400 text-sm">
                Generating QR...
              </div>
            )}
          </div>

          <div className="flex items-center justify-center gap-2">
            <button
              onClick={handleDownload}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold text-xs transition-colors shadow-sm"
            >
              <Download className="w-4 h-4" />
              Download PNG
            </button>
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-semibold text-xs transition-colors"
            >
              <Printer className="w-4 h-4" />
              Print Standee
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
