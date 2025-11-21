import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Share2, Copy, Facebook, Twitter, Mail, MessageCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SharePropertyProps {
  propertyTitle: string;
  propertyUrl: string;
}

const ShareProperty = ({ propertyTitle, propertyUrl }: SharePropertyProps) => {
  const { toast } = useToast();
  const fullUrl = `${window.location.origin}${propertyUrl}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(fullUrl);
    toast({
      title: "Link copied!",
      description: "Property link copied to clipboard",
    });
  };

  const shareVia = (platform: string) => {
    const text = `Check out this property: ${propertyTitle}`;
    let url = '';

    switch (platform) {
      case 'facebook':
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(fullUrl)}`;
        break;
      case 'twitter':
        url = `https://twitter.com/intent/tweet?url=${encodeURIComponent(fullUrl)}&text=${encodeURIComponent(text)}`;
        break;
      case 'whatsapp':
        url = `https://wa.me/?text=${encodeURIComponent(text + ' ' + fullUrl)}`;
        break;
      case 'email':
        url = `mailto:?subject=${encodeURIComponent(propertyTitle)}&body=${encodeURIComponent(text + '\n\n' + fullUrl)}`;
        break;
    }

    window.open(url, '_blank');
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Share2 className="h-4 w-4" />
          Share
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share this property</DialogTitle>
          <DialogDescription>
            Share {propertyTitle} with your friends and family
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Input value={fullUrl} readOnly className="flex-1" />
            <Button size="sm" onClick={copyToClipboard}>
              <Copy className="h-4 w-4" />
            </Button>
          </div>
          <div className="grid grid-cols-4 gap-2">
            <Button variant="outline" size="sm" onClick={() => shareVia('facebook')} className="flex-col h-auto py-3">
              <Facebook className="h-5 w-5 mb-1" />
              <span className="text-xs">Facebook</span>
            </Button>
            <Button variant="outline" size="sm" onClick={() => shareVia('twitter')} className="flex-col h-auto py-3">
              <Twitter className="h-5 w-5 mb-1" />
              <span className="text-xs">Twitter</span>
            </Button>
            <Button variant="outline" size="sm" onClick={() => shareVia('whatsapp')} className="flex-col h-auto py-3">
              <MessageCircle className="h-5 w-5 mb-1" />
              <span className="text-xs">WhatsApp</span>
            </Button>
            <Button variant="outline" size="sm" onClick={() => shareVia('email')} className="flex-col h-auto py-3">
              <Mail className="h-5 w-5 mb-1" />
              <span className="text-xs">Email</span>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ShareProperty;
