var timer = new Date();
function web_send_msg()
{
    // Получение значений из элементов ввода.
    var text = $("#WebChatTextID").val();
    var name = $("#WebChatNameID").val();
    
    // Очистка формы
    $("#WebChatTextID").val("");  
    
    // Зпишем время в момент отправки сообщения
    timer = new Date();
    
    // Добавление отправленного сообщения к списку сообщений.
    //$("#WebChatFormForm").append("<p><b>"+HtmlEncode(name)+": </b>"+HtmlEncode(text)+"</p>");
    
    // Отправка сообщения в канал чата
    CometServer().web_pipe_send("web_chat_pipe", {"text":text, "name":name});
    
    // Уведомим остальные вкладки о том что мы добавили сообщение в чат
    comet_server_signal().send_emit("AddToChat", {"text":text, "name":name})
}

   
// Функция выполнится в после загрузки страницы
$(document).ready(function()
{
    // Создание формы для чата. Вёрстка.
    var html =  "<div style=\"border: 1px solid #ccc;padding:10px;\" >"
	          + "<div id=\"WebChatFormForm\" style=\"max-width: 600px;overflow: auto;max-height: 900px;\"></div>"
		  + "<input type=\"text\" id=\"WebChatNameID\" style=\"margin-top:10px;\" placeholder=\"Укажите ваше имя...\" > <div id=\"answer_div\" style=\"float:right;\" ></div>"
	          + "<textarea id = \"WebChatTextID\" placeholder = \"Отправьте сообщение в online чат...\" style=\"max-width: 600px;max-height: 100px;width: 600px;margin-top:10px;\" ></textarea>"

                  + "<div style=\"margin-bottom: 0px;margin-top: 10px;\">"
                  +    "<input type=\"button\" style=\"width: 220px;\" onclick=\"web_send_msg();\" value=\"Отправить\" >"
                  +    " <div id=\"answer_error\"  style=\"float:right;\" ></div>"
                  + "</div>"
             +  "</div>";
    $("#web_chat_holder").html(html);

    // Подписываемся на канал в который и будут отпавлятся сообщения чата. 
    CometServer().subscription("web_chat_pipe", function(msg){
        console.log(["msg", msg]);
        // Добавление полученого сообщения к списку сообщений.
        $("#WebChatFormForm").append("<p><b>"+HtmlEncode(msg.data.name)+": </b>"+HtmlEncode(msg.data.text)+"</p>");
    });

    // Подписываемся на событие добавления сообщения в чат нами, для того чтобы если чат открыт в нескольких вкладках
    // наше сообщение добавленое на одной вкладке отобразилось на всех остальных без перезагрузки страницы
    comet_server_signal().connect("AddToChat", function(msg){
        console.log(["msg", msg]);
        // Добавление полученого сообщения к списку сообщений.
        $("#WebChatFormForm").append("<p><b>"+HtmlEncode(msg.name)+": </b>"+HtmlEncode(msg.text)+"</p>");
    });
    
    // Подписываемся на канал в который и будут отпавлятся уведомления о доставке отправленых сообщений.
    CometServer().subscription("#web_chat_pipe", function(p)
    {
        // Зпишем время в момент получения отчёта о доставке сообщения
        var etime = new Date();
        
        console.log(["answer_to_web_chat_pipe", p]);
        $("#answer_div").html("Сообщение доставлено "+p.data.number_messages+" получателям за "+ (etime.getTime() - timer.getTime() )+"ms");
        $("#answer_error").html(" "+p.data.error);
    });

   // Загружаем историю сообщений
   CometServer().get_pipe_log("web_chat_pipe");
});


function HtmlEncode(s)
{
  var el = document.createElement("div");
  el.innerText = el.textContent = s;
  s = el.innerHTML;
  return s;
}