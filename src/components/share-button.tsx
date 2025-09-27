'use client'
import { useState, useEffect } from 'react';
import { Share2, Link as LinkLogo } from 'lucide-react';
import Icons from '@/components/socialIcon';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';
import { Button } from './ui/button';

type SocialPlatform = 'copy' | 'twitter' | 'facebook' | 'linkedin' | 'whatsapp' | 'native';

interface ShareButtonProps {
  label?: string;
  className?: string;
  shareText?: string;
  notOnTop?: boolean;
}

const ShareButton: React.FC<ShareButtonProps> = ({
  label,
  className,
  shareText = 'Check this out!',
  notOnTop = false
}) => {
  const { toast } = useToast()
  const [shareUrl, setShareUrl] = useState('');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  // Get URL safely after mount
  useEffect(() => {
    setShareUrl(window.location.href);
  }, []);

  const handleShare = async (platform: SocialPlatform) => {
    try {
      switch (platform) {
        case 'copy':
          await navigator.clipboard.writeText(shareUrl);
          toast({
            title: "Success",
            description: (
              <span className="flex items-center">
                <LinkLogo className="mr-2 h-4 w-4" />
              Link copied to clipboard!
              </span>),
            duration: 2000
          })
          break;

        case 'twitter':
          window.open(
            `https://x.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
            '_blank',
            'noopener,noreferrer'
          );
          break;

        case 'facebook':
          window.open(
            `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
            '_blank',
            'noopener,noreferrer'
          );
          break;

        case 'linkedin':
          window.open(
            `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
            '_blank',
            'noopener,noreferrer'
          );
          break;

        case 'whatsapp':
          window.open(
            `https://api.whatsapp.com/send?text=${encodeURIComponent(`${shareText}\n${shareUrl}`)}`,
            '_blank',
            'noopener,noreferrer'
          );
          break;

        case 'native':
          if (navigator.share) {
            try {
              await navigator.share({
                title: document.title,
                text: shareText,
                url: shareUrl,
              });
            } catch (err) {
              console.error('Error sharing:', err);
            }
          }
          break;
      }
    } catch (err) {
      console.error(`Sharing failed for ${platform}:`, err);
    }
  };

  return (
    <DropdownMenu key={label} modal={false}>
      <DropdownMenuTrigger className='cursor-pointer' asChild>
        {notOnTop ? (<Share2 className="h-4 w-4" />) : (
        <Button 
          style={{ padding: '0.6em 1.2em' }}
          className={`outline hover:scale-95 hover:outline-white/30 hover:text-white
          focus:outline-none focus:ring-2 focus:ring-blue-400/50 transition-all duration-800
          bg-gradient-to-b from-gold-vibrant via-rendang-400 to-red-dark
          hover:translate-y-0.5 hover:shadow-lg transform-gpu linear
          h-10 items-base relative rounded-full group ${className}`}>
          <div className="absolute w-full h-full inset-0 opacity-0 rounded-full bg-gradient-to-b from-red-dark via-rendang-500 to-gold-vibrant transition-opacity duration-800 group-hover:opacity-100"></div>
          <span className='inline-flex align-middle space-x-0.5'><span className='transition-transform text-sm duration-800 group-hover:-translate-y-1'>Share</span><Share2 className="h-4 w-4 z-20 group-hover:text-yellow-400/80 transition-colors duration-150 ease-in" /></span>
        </Button>)}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {isClient && 'share' in navigator && (
          <DropdownMenuItem 
            onClick={() => handleShare('native')}
            className="cursor-pointer"
          >
            <Share2 className="mr-2 h-4 w-4" />
            Native
          </DropdownMenuItem>
        )}
        
        <DropdownMenuItem 
          onClick={() => handleShare('copy')}
          className="cursor-pointer"
        >
          <LinkLogo className="mr-2 h-4 w-4" />
          Copy Link
        </DropdownMenuItem>

        <DropdownMenuItem 
          onClick={() => handleShare('whatsapp')}
          className="cursor-pointer"
        >
          <Icons.Whatsapp className="mr-2 h-4 w-4" />
          WhatsApp
        </DropdownMenuItem>

        <DropdownMenuItem 
          onClick={() => handleShare('twitter')}
          className="cursor-pointer"
        >
          <Icons.Twitter className="mr-2 h-4 w-4" />
          Twitter
        </DropdownMenuItem>

        <DropdownMenuItem 
          onClick={() => handleShare('facebook')}
          className="cursor-pointer"
        >
          <Icons.Facebook2 className="mr-2 h-4 w-4" />
          Facebook
        </DropdownMenuItem>

        <DropdownMenuItem 
          onClick={() => handleShare('linkedin')}
          className="cursor-pointer"
        >
          <Icons.Linkedin2 className="mr-2 h-4 w-4" />
          LinkedIn
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ShareButton;