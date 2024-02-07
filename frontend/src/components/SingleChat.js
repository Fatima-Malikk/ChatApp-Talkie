import { Box, Text } from "@chakra-ui/layout";
import React from "react";
import { ChatState } from './../Context/ChatProvider';

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
    const { user, selectedChat, setselectedChat } = ChatState();

    return (
        <>
            {selectedChat ? (
                <></>
            ) : (
                    <Box d="flex" alignItems="center" justifyContent="center" h="100%">
                        <Text fontSize="3xl" pb={3} fontFamily="Work sans">
                            likh kch
                        </Text>
                    </Box>
            )}
        </>
    )
}
export default SingleChat;