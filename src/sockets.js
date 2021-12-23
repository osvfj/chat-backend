const { client } = require('./helpers');

const users = getUsers();

async function getUsers() {
  try {
    const users = await client.get('socket:users');
    return JSON.parse(users);
  } catch (error) {
    console.log(error);
  }
}

const addUser = async (userId, socketId) => {
  try {
    await client.set(
      'socket:users',
      JSON.stringify([...users, { userId, socketId }])
    );
  } catch (error) {
    console.log(error);
  }
};

const removeUser = async (socketId) => {
  try {
    await client.set(
      'socket:users',
      JSON.stringify(users.filter((user) => user.socketId !== socketId))
    );
  } catch (error) {
    console.log(error);
  }
};

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

module.exports = function (sockets) {
  sockets.on('connection', (socket) => {
    socket.on('client:addUsers', (userId) => {
      addUser(userId, socket.id);
      socket.emit('server:getUsers', users);
    });

    socket.on('client:sendMessage', ({ senderId, reciverId, message }) => {
      const reciver = getUser(reciverId);
      sockets.to(reciver.socketId).emit('server:getMessage', {
        senderId,
        message,
      });
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected');
      removeUser(socket.id);
      socket.emit('server:getUsers', users);
    });
  });
};
