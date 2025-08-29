import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { X, Share2, Plus, Smartphone } from 'lucide-react';

interface IOSInstallGuideProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function IOSInstallGuide({ isOpen, onClose }: IOSInstallGuideProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md bg-card/95 backdrop-blur-sm border-primary/20">
        <CardHeader className="text-center pb-4">
          <div className="flex justify-between items-center">
            <CardTitle className="text-xl font-futuristic text-glow">
              Install on iOS
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground"
            >
              <X size={20} />
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="text-center">
            <Smartphone className="w-16 h-16 text-primary mx-auto mb-4" />
            <p className="text-muted-foreground mb-6">
              Follow these steps to add Hestia Chatbot to your home screen:
            </p>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-primary font-bold text-sm">1</span>
              </div>
              <div>
                <p className="font-medium">Tap the Share button</p>
                <p className="text-sm text-muted-foreground">
                  Look for the <Share2 className="inline w-4 h-4" /> share icon in your browser
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-primary font-bold text-sm">2</span>
              </div>
              <div>
                <p className="font-medium">Scroll and tap "Add to Home Screen"</p>
                <p className="text-sm text-muted-foreground">
                  This option appears in the share menu
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-primary font-bold text-sm">3</span>
              </div>
              <div>
                <p className="font-medium">Tap "Add" to confirm</p>
                <p className="text-sm text-muted-foreground">
                  The app will appear on your home screen
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
            <p className="text-sm text-primary-foreground">
              <strong>Note:</strong> This creates a shortcut to the web app. The app will work offline and feel like a native app once added to your home screen.
            </p>
          </div>
          
          <Button
            onClick={onClose}
            className="w-full glow-primary"
          >
            Got it!
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
