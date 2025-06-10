import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SectionHeaderProps {
  title: string;
  actionText?: string;
  onActionClick?: () => void;
  className?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  actionText,
  onActionClick,
  className,
}) => {
  return (
    <div className={cn('flex items-center justify-between px-4 py-2', className)}>
      <h2 className="text-xl font-bold text-foreground">{title}</h2>
      {onActionClick && (
        <Button
          variant="ghost"
          size={actionText ? 'default' : 'icon'}
          onClick={onActionClick}
          className="text-primary hover:text-primary/80"
        >
          {actionText ? actionText : <ArrowRight className="h-5 w-5" />}
        </Button>
      )}
    </div>
  );
};

export default SectionHeader;
