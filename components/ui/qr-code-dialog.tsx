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
      const dataUrl = await QRCode.toDataURL(currentUrl, {
        width: 600,
        margin: 3,
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
          variant="outline" 
          size="lg"
          className="bg-white/80 backdrop-blur-sm border-purple-200 hover:bg-purple-50 text-purple-700 font-medium shadow-lg"
        >
          <QrCode className="w-5 h-5 mr-2" />
          Share via QR Code
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl w-full mx-4">
        <DialogHeader>
          <DialogTitle className="text-center text-purple-700 text-2xl">
            Scan QR Code to Take Quiz
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center space-y-6 p-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            {qrCodeDataUrl && (
              <img 
                src={qrCodeDataUrl} 
                alt="QR Code" 
                className="w-[600px] h-[600px] max-w-full"
              />
            )}
          </div>
          <p className="text-lg text-gray-700 text-center max-w-md font-medium">
            📱 Open your phone camera and point it at this QR code
          </p>
          <div className="flex items-center space-x-2 w-full">
            <input
              readOnly
              value={currentUrl}
              className="flex-1 px-3 py-2 text-sm border rounded-md bg-gray-50"
            />
            <Button
              size="sm"
              variant="outline"
              onClick={copyToClipboard}
              className="shrink-0"
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