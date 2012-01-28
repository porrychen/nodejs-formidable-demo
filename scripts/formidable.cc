check host formidable with address 127.0.0.1
  start program = "/etc/init.d/formidable start"
  stop program  = "/etc/init.d/formidable stop"
  if failed port 5000 protocol HTTP
    request /
    with timeout 10 seconds
    then restart
