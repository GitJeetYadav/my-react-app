import React from 'react';
import {
  Box,
  useColorModeValue,
  Drawer,
  DrawerContent,
  useDisclosure,
} from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';
import PropTypes from "prop-types";
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import userImage from '../../../assets/user.jpg';
import "./Sidebar.css";
import data from "../data.json";
import { StyledH1, StyledH2, SpanText } from "./SidebarStyle";
import { getLoggedInData, getUserRole } from '../../../store/hooks';

export default function Sidebar() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <Box minH="100vh" w="250px" bg={useColorModeValue('gray.100', 'gray.900')}>
      <SidebarContent onClose={() => onClose} display={{ base: 'none', md: 'block' }} />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full">
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* <MobileNav display={{ base: 'flex', md: 'none' }} onOpen={onOpen} /> */}
      <Box ml={{ base: 0, md: 60 }} p="4">
      </Box>
    </Box>
  )
} 

const SidebarContent = ({ onClose, ...rest }) => {
  const { t } = useTranslation();
  const userData = useSelector(getLoggedInData)
  const userRole = useSelector(getUserRole);
  const menuList = data.menuList.filter((element) => {
    if (data[userRole]?.includes(element.name)) {
      return element;
    }
  });

  return (
    <Box
      bg={useColorModeValue('#F2EAE1', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      padding={'10px'}
      h="full"
      {...rest}>
      <div>
        <StyledH1>
          <SpanText>|</SpanText>
          {t("login.crudOperations")}
        </StyledH1>
        <img height={150} width={150}
          src={userImage}
          alt="logo"
          className='user-image'
        />
        <StyledH2>{userData?.userName}</StyledH2> {/* hardcoded for now  */}
        <p className='user-role'>{userRole?.toUpperCase()}</p>
      </div>
      <div className='link-list'>
      {menuList.map((link) => (
        <NavLink key={link.name} to={link.link} 
        end className={({ isActive }) =>
           isActive ? "link active" : "link"
        }
          title={link.name} >
          {link.name}
        </NavLink>
      ))}
      </div>
    </Box>
  )
}

SidebarContent.propTypes = {
  onClose: PropTypes.any,
};
