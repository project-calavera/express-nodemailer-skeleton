const mailUtils = {
  getMailBody: content => {
    const details = {
      name: content.name
    };

    return `Hi there!\n
        Someone did something. Here is what they did:
        Name: ${details.name}\n
        --\n
        Salutation`;
  },
  getUserMailBody: () => {
    return `Hi there!\r\n
        Thank you for doing the thing.\r\n
        --\n
        All the best\n
        www.yoursite.coffee`;
  }
};

module.exports = mailUtils;
