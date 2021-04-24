const socket = io()

socket.on("admin_list_all_users",connections => {  
  let template = document.getElementById("template").innerHTML
  

  document.getElementById("list_users").innerHTML = ""
  
  connections.forEach(connection => {
    const rendered = Mustache.render(template,{
      email: connection.user.email,
      id: connection.socket_id
    })

    document.getElementById("list_users").innerHTML += rendered
    
  });

  

  
})