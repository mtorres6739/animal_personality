'use client';

import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { QrCode, Copy, Check } from 'lucide-react';
import { toast } from 'sonner';

export function QRCodeDialog() {
  const [currentUrl, setCurrentUrl] = useState('');
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setCurrentUrl(window.location.href);
  }, []);

  useEffect(() => {
    if (currentUrl) {
      generateQRCode();
    }
  }, [currentUrl]);

  const generateQRCode = async () => {
    try {
      const QRCode = (await import('qrcode')).default;
      // Use responsive QR code size - smaller on mobile
      const isMobile = window.innerWidth < 768;
      const qrSize = isMobile ? 300 : 500;

      const dataUrl = await QRCode.toDataURL(currentUrl, {
        width: qrSize,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#FFFFFF'
        }
      });
      setQrCodeDataUrl(dataUrl);
    } catch (error) {
      console.error('Error generating QR code:', error);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      toast.success('URL copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error('Failed to copy URL');
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="text-gray-500 hover:text-purple-600 text-sm"
        >
          <QrCode className="w-4 h-4 mr-2" />
          Share via QR Code
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg w-[95vw] mx-auto max-h-[90vh] overflow-y-auto">
        <DialogHeader className="pb-4">
          <DialogTitle className="text-center text-purple-700 text-xl">
            Scan QR Code to Take Quiz
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center space-y-4 p-2">
          <div className="bg-white p-4 rounded-lg shadow-sm border w-full flex justify-center">
            {qrCodeDataUrl && (
              <img
                src={qrCodeDataUrl}
                alt="QR Code"
                className="w-full max-w-[300px] md:max-w-[400px] h-auto"
              />
            )}
          </div>
          <p className="text-sm md:text-base text-gray-700 text-center font-medium px-2">
            📱 Open your phone camera and point it at this QR code
          </p>
          <div className="flex items-center space-x-2 w-full">
            <input
              readOnly
              value={currentUrl}
              className="flex-1 px-3 py-2 text-xs md:text-sm border rounded-md bg-gray-50 min-w-0"
            />
            <Button
              size="sm"
              variant="outline"
              onClick={copyToClipboard}
              className="shrink-0 px-3"
            >
              {copied ? (
                <Check className="w-4 h-4" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}