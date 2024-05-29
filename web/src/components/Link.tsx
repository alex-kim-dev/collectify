import UILink from '@mui/material/Link';
import { ComponentProps } from 'react';
import { Link as RouterLink } from 'react-router-dom';

type LinkProps = ComponentProps<typeof UILink> &
  ComponentProps<typeof RouterLink>;

export const Link: React.FC<LinkProps> = ({ children, ...props }) => {
  return (
    <UILink component={RouterLink} {...props}>
      {children}
    </UILink>
  );
};
