import { Server, Socket } from "socket.io";
import { logger } from "./utils/logger";

const rooms: Record<string, { name: string }> = {};

function socket({ io }: { io: Server }) {
  logger.info('socket-enabled')

  // function getConversationId(userId1, userId2) {
  //   const sortedIds = [userId1, userId2].sort();
  //   return `${sortedIds[0]}-${sortedIds[1]}`;
  // }
  
  // Socket.IO
  io.on("connection", (socket) => {
    logger.info('connection established');
  
    // When a user joins a conversation
    socket.on("join conversation", async ({ senderId, receiverId }) => {
      // const conversationId = getConversationId(senderId, receiverId);
      // socket.join(conversationId);
  
      // const messages = await Message.query().where('conversation_id', conversationId);
      // socket.emit("message history", messages);
      console.log('two joined conversation')
    });
  
    // When a user sends a message
    socket.on("send message", async (data) => {
      // const { senderId, receiverId } = data;
      // const conversationId = getConversationId(senderId, receiverId);
      // data.conversation_id = conversationId;
  
      // const newMessage = await Message.query().insert(data);
      // io.to(conversationId).emit("receive message", newMessage);
      console.log('send message')
    });
  
    socket.on("disconnect", () => {
      console.log("a user disconnected");
    });
  });
}

export default socket;
