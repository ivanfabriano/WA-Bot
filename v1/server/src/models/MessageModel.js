const MessageModel = (Schema) => {
    const MessageSchema = new Schema({
      request: {
        type: String,
        required: true,
      },
      response: {
        type: String,
        required: true,
      },
      isActive: {
        type:Boolean, 
        required: true
      },
    });
  
    return MessageSchema;
  };
  
  export default MessageModel;
  