import { Server, Socket } from "socket.io";
import knexConnection from "../knexConnection";
import { logger } from "./utils/logger";
import server from '../src/server'
import UserService from './modules/users/user.service';

function socket({ io }: { io: Server }) {
  logger.info('socket-enabled')

  function getConversationId(userId1: any, userId2: any) {
    const sortedIds = [userId1, userId2].sort();
    return `${sortedIds[0]}-${sortedIds[1]}`;
  }
  io.attach(server.server, {
    cors: {
      origin: "https://travelmate-frontend.vercel.app",
      methods: ["GET", "POST", "PUT", "DELETE"]
    }
  });

  // Socket.IO
  io.on("connection", (socket) => {
    logger.info('connection established');
  
    // When a user joins a conversation
    socket.on("join conversation", async ({ senderId, receiverId }) => {
      const conversationId = getConversationId(senderId, receiverId);
      socket.join(conversationId);

      const messages = await knexConnection[process.env.NODE_ENV || 'local']("chat")
        .where("conversation_id", conversationId)
        .andWhere(function () {
          this.where("user_id", senderId).orWhere("user_id", receiverId);
        })
        .andWhere(function () {
          this.where("recommended_travelers_id", senderId).orWhere("recommended_travelers_id", receiverId);
        })
        .select("id", "user_id", "recommended_travelers_id", "message", "created_at");

      // Send the message history to the client
      socket.emit("message history", messages);
    });
  
    // When a user sends a message
    socket.on("send message", async (data) => {
      const { senderId, receiverId } = data;
      const conversationId = getConversationId(senderId, receiverId);
      data.conversation_id = conversationId;
  
      //const newMessage = await Message.query().insert(data);
      const res = await knexConnection[process.env.NODE_ENV || 'local']("chat").insert({
        conversation_id: conversationId,
        user_id: senderId,
        recommended_travelers_id: receiverId,
        message: data?.message || '',
      }).returning('*');
      console.log(res[0])

      const sender = await UserService.getUserById(senderId)
      const receiver = await UserService.getUserById(receiverId);
      io.to(conversationId).emit("receive message", res[0]);
      io.to(conversationId).emit("notify-message", {
        message: `${sender?.firstName} - ${sender?.lastName} has send message to ${receiver?.firstName} - ${receiver?.lastName}`
      })
      console.log('send message')
    });
  
    socket.on("disconnect", () => {
      socket?.broadcast?.emit("callEnded")
      console.log("a user disconnected");
    });

    // video call
    socket.emit("me", socket.id);

    socket.on("callUser", ({ userToCall, signalData, from, name }) => {
      io.to(userToCall).emit("callUser", { signal: signalData, from, name });
    });
  
    socket.on("answerCall", (data) => {
      io.to(data.to).emit("callAccepted", data.signal)
    });
  });
}

export default socket;
