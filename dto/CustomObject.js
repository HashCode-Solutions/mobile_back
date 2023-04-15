class CustomObject {
    constructor(message) {
      this.message = message;
    }
  
    set Message(message){
      this.message = message;
    }

    getMessage() {
      return this.message;
    }

  }
  
  module.exports = CustomObject;
  