import {
  Button,
  HStack,
  Image,
  Menu,
  MenuButton,
  MenuGroup,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';
import Avatar from 'boring-avatars';
import { BoxArrowRight, ChevronDown } from 'react-bootstrap-icons';

const avatar = 'https://i.pravatar.cc/150?img=68';
const fallbackColors = ['#234d20', '#36802d', '#77ab59', '#c9df8a', '#f0f7da'];

export const AccountMenu: React.FC = () => {
  const name = 'User name';

  return (
    <Menu>
      <MenuButton
        as={Button}
        rightIcon={<ChevronDown />}
        aria-label='Account menu'
        p={1}
        minW='max'
        borderRadius='20px'
      >
        <Image
          src={avatar}
          alt='Avatar'
          boxSize={8}
          borderRadius='full'
          fallback={
            <Avatar
              name={name}
              variant='sunset'
              size={32}
              colors={fallbackColors}
            />
          }
        />
      </MenuButton>
      <MenuList minW='10rem' maxW='16rem'>
        <MenuGroup title={name}>
          <MenuItem>
            <HStack gap={2}>
              <BoxArrowRight size={20} />
              <span>Sign out</span>
            </HStack>
          </MenuItem>
        </MenuGroup>
      </MenuList>
    </Menu>
  );
};
