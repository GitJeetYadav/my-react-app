import React from "react";
import { Box, Text, HStack, Stack } from "@chakra-ui/react";
import { FiBookOpen, FiDollarSign, FiBookmark } from "react-icons/fi";
import { useTranslation } from "react-i18next";
import "./Card.css";
import { hasPermission, getUserRoleFromToken} from "../ui-components/authUtils";

const DashboardCards = () => {
  const { t } = useTranslation();
  const userRole = getUserRoleFromToken();

  const cardData = [
    {
      label: t("common.admin"),
      value: "243",
      icon: <FiBookOpen size={24} color="#7FB3FF" />,
      bgColor: "#EAF3FF",
      permission: "viewAdminCard"
    },
    {
      label: t("common.dealer"),
      value: "13",
      icon: <FiBookmark size={24} color="#FFB6C1" />,
      bgColor: "#FFEFF6",
      permission: "viewDealerCard"
    },
    {
      label: t("common.supplier"),
      value: "INR 556,000",
      icon: <FiDollarSign size={24} color="#FFD700" />,
      bgColor: "#FFF8E6",
      permission: "viewSupplierCard"
    },
  ];

  return (
    <div>
      <HStack spacing={4} p={4} wrap="wrap">
        {cardData.map((card, index) => (
         hasPermission(userRole, card.permission) &&  (  <Box
            key={index}
            w={{ base: "100%", lg: "32%" }}
            h="160px"
            bg={card.bgColor}
            borderRadius="lg"
            boxShadow="md"
            p={4}
          >
            <div className="">
              <div>
              <Stack spacing={3}>
                {card.icon}
                <Text fontSize="2xl" color="gray.600">
                  {card.label}
                </Text>
                <Text fontSize="2xl" fontWeight="bold" color="black" style={{textAlign:"right"}}>
                  {card.value}
                </Text>
              </Stack>
              </div>
            </div>
          </Box>)
        ))}
      </HStack>
    </div>
  );
};

export default DashboardCards;
