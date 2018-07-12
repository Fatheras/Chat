$(function() {
  const socket = io.connect('http://localhost:3000')
  const message = $("#message")
  const username = $("#username")
  const send_message = $("#send_message")
  const send_username = $("#send_username")
  const chatroom = $("#chatroom")
  const feedback = $("#feedback")
  const input = document.getElementById("message")

  send_message.click(function() {
    socket.emit('new_message', {
      message: message.val()
    })
  })

  socket.on("new_message", (data) => {
    if (!data.message) {
      return;
    }
    feedback.html('');
    chatroom.append("<p class='message'>" + data.username + ": " + data.message + "</p>")
  })

  send_username.click(function() {
    socket.emit('change_username', {
      username: username.val()
    })
  })

  message.bind("keypress", () => {
    socket.emit('typing')
  })

  socket.on('typing', (data) => {
    feedback.html("<p><i>" + data.username + " is typing a message..." + "</i></p>")
  })

  input.addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
      socket.emit('new_message', {
        message: message.val()
      })
    }
  });

});
