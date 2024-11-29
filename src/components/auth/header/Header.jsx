import React from "react";
import {
  Box,
  Flex,
  Avatar,
  HStack,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useColorModeValue,
  Select,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";
import { useDispatch, useSelector } from "react-redux";
import { getIsLoggedIn, setIsLoggedIn } from "../../../store/hooks";
import { useMsal } from "@azure/msal-react";

const HeaderComponent = () => {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [showProfile, setShowProfile] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  // const isLogin = useSelector(getIsLoggedIn);
  const isLogin = localStorage.getItem("isLoggegIn") === "true";

  const { instance } = useMsal();

  useEffect(() => {
    if (isLogin) {
      setShowProfile(true);
    }
  }, [showProfile]);
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const logout = () => {
    const token = localStorage.getItem("isAzureLoggedIn") ? true : false;

    if (token) {
      localStorage.removeItem("isAzureLoggedIn");
      instance.logoutPopup({
        postLogoutRedirectUri: "https://localhost:3000/",
      });
    }
    navigate("/");
    // dispatch(setIsLoggedIn(false));
    localStorage.setItem("isLoggegIn", false);
    localStorage.removeItem("role");
  };
  return (
    <>
      <div
        className={showProfile ? "header-container" : "header-container-auth"}
        data-testid="header-container"
      >
        <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
          <Flex
            h={16}
            alignItems={"center"}
            justifyContent={"end"}
            gap={"10px"}
          >
            <HStack spacing={8} alignItems={"right"}>
              <Select
                data-testid="select-language"
                placeholder="Languages"
                defaultValue="en"
                onChange={(e) => changeLanguage(e.target.value)}
              >
                <option value="en">English</option>
                <option value="fr">French</option>
              </Select>
            </HStack>
            {showProfile ? (
              <Flex alignItems={"center"}>
                <Menu>
                  <MenuButton
                    as={Button}
                    rounded={"full"}
                    variant={"link"}
                    cursor={"pointer"}
                    minW={0}
                  >
                    <Avatar
                      size={"sm"}
                      src={
                        "https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
                      }
                    />
                  </MenuButton>
                  <MenuList>
                    <MenuItem onClick={() => logout()}>
                      {t("common.logout")}
                    </MenuItem>
                  </MenuList>
                </Menu>
              </Flex>
            ) : (
              ""
            )}
          </Flex>
        </Box>
      </div>
    </>
  );
};
export default HeaderComponent;
