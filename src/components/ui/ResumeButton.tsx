import { Download } from 'lucide-react';
import React from 'react';
import { resume } from '../../data/resume';
import { ButtonLink } from './Button';

type ResumeButtonProps = Omit<React.ComponentProps<typeof ButtonLink>, 'href' | 'download' | 'icon'>;

/** "Download Resume", rendered only when a resume PDF has been added (see src/data/resume.ts). */
export const ResumeButton: React.FC<ResumeButtonProps> = ({ variant = 'secondary', children = 'Download Resume', ...props }) =>
  resume.url ? (
    <ButtonLink href={resume.url} download={resume.fileName} variant={variant} icon={<Download size={15} />} {...props}>
      {children}
    </ButtonLink>
  ) : null;
